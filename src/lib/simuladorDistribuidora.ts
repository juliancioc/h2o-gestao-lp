/**
 * Conta do simulador de viabilidade de distribuidora (galão 20L).
 *
 * Sem JSX e sem React, para poder ser testada sozinha (com `node --test`,
 * que já entende TypeScript no Node 24) depois que a tela for validada.
 */

export interface Premissas {
  /** Custo do galão cheio comprado do fornecedor. */
  custo: number;
  preco: number;
  /** Simples Nacional, em % do preço. */
  imposto: number;
  /** Taxa média de cartão/PIX, em % do preço. */
  cartao: number;
  /** Perdas e fiado que não volta, em % do preço. */
  perdas: number;
  /** Combustível, manutenção e comissão por galão entregue. */
  entrega: number;
  aluguel: number;
  salario: number;
  contador: number;
  utilidades: number;
  outros: number;
  /** Galões vendidos por dia. */
  dia: number;
  /** Dias de operação no mês. */
  dias: number;
  cascos: number;
  pcasco: number;
  /** Moto, reforma, bebedouros, alvará e capital de giro. */
  invest: number;
}

export type CampoPremissa = keyof Premissas;

export const PREMISSAS_PADRAO: Premissas = {
  custo: 5,
  preco: 12,
  imposto: 4,
  cartao: 1.5,
  perdas: 2,
  entrega: 1,
  aluguel: 800,
  salario: 2000,
  contador: 300,
  utilidades: 200,
  outros: 300,
  dia: 60,
  dias: 26,
  cascos: 100,
  pcasco: 30,
  invest: 8000,
};

export interface Modelo {
  imp: number;
  tx: number;
  per: number;
  ent: number;
  /** Sobra por galão depois dos custos variáveis. */
  contrib: number;
  fixos: number;
  /** Galões no mês. */
  volume: number;
  lucro: number;
}

export const modelo = (p: Premissas, galoesPorDia = p.dia): Modelo => {
  const imp = (p.preco * p.imposto) / 100;
  const tx = (p.preco * p.cartao) / 100;
  const per = (p.preco * p.perdas) / 100;
  const ent = p.entrega;
  const contrib = p.preco - p.custo - imp - tx - per - ent;
  const fixos = p.aluguel + p.salario + p.contador + p.utilidades + p.outros;
  const volume = galoesPorDia * p.dias;
  const lucro = contrib * volume - fixos;
  return { imp, tx, per, ent, contrib, fixos, volume, lucro };
};

export const margemBruta = (p: Premissas) =>
  p.preco ? (p.preco - p.custo) / p.preco : 0;

export const markup = (p: Premissas) =>
  p.custo ? (p.preco - p.custo) / p.custo : 0;

/** Ponto de equilíbrio em galões por mês. Infinito se a sobra não é positiva. */
export const peMes = (m: Modelo) => (m.contrib > 0 ? m.fixos / m.contrib : Infinity);

/** Ponto de equilíbrio por dia. Exibir com Math.ceil. */
export const peDia = (pe: number, dias: number) => pe / (dias || 1);

export const investimento = (p: Premissas) => p.cascos * p.pcasco + p.invest;

/** Meses para o lucro pagar o investimento. Nulo sem lucro. */
export const payback = (inv: number, lucro: number) =>
  lucro > 0 ? inv / lucro : null;

export type Tom = "erro" | "alerta" | "sucesso";

export interface Veredito {
  tom: Tom;
  /** Título grande. Nulo quando é o lucro mensal formatado. */
  titulo: string | null;
  texto: string;
}

/**
 * A faixa do topo do resultado. A ordem das condições importa: sobra negativa
 * vence prejuízo, que vence lucro apertado.
 */
export const veredito = (p: Premissas): Veredito => {
  const m = modelo(p);

  if (m.contrib <= 0) {
    return {
      tom: "erro",
      titulo: "Preço não cobre os custos",
      texto:
        "Cada galão vendido dá prejuízo antes mesmo dos custos fixos. Revise preço ou custo.",
    };
  }

  if (m.lucro < 0) {
    const faltam = Math.ceil(peDia(peMes(m), p.dias)) - p.dia;
    return {
      tom: "erro",
      titulo: null,
      texto: `Faltam ${formatInteiro(faltam)} galões por dia para empatar.`,
    };
  }

  if (m.lucro < 0.3 * m.fixos) {
    return {
      tom: "alerta",
      titulo: null,
      texto: "Lucro apertado. Uma semana fraca ou um calote já levam ao vermelho.",
    };
  }

  const meses = payback(investimento(p), m.lucro);
  return {
    tom: "sucesso",
    titulo: null,
    texto:
      meses === null
        ? `Lucro estimado com ${formatInteiro(p.dia)} galões por dia.`
        : `Lucro estimado com ${formatInteiro(p.dia)} galões por dia. O investimento volta em ${formatDecimal1(meses)} meses.`,
  };
};

/* ---------------------------- Gráfico ---------------------------- */

/** Passo "bonito" (1, 2 ou 5 × 10ⁿ) mais próximo acima de `bruto`. */
export const passoBonito = (bruto: number) => {
  if (!(bruto > 0) || !Number.isFinite(bruto)) return 1;
  const potencia = 10 ** Math.floor(Math.log10(bruto));
  const fracao = bruto / potencia;
  const base = fracao <= 1 ? 1 : fracao <= 2 ? 2 : fracao <= 5 ? 5 : 10;
  return base * potencia;
};

export interface Escala {
  min: number;
  max: number;
  passo: number;
  ticks: number[];
}

/** Domínio que sempre inclui o zero, com ~4 intervalos bonitos. */
export const escalaY = (valores: number[]): Escala => {
  const menor = Math.min(0, ...valores);
  const maior = Math.max(0, ...valores);
  const passo = passoBonito((maior - menor) / 4);
  const min = Math.floor(menor / passo) * passo;
  const max = Math.max(Math.ceil(maior / passo) * passo, min + passo);
  const ticks: number[] = [];
  for (let v = min; v <= max + passo / 2; v += passo) ticks.push(v);
  return { min, max, passo, ticks };
};

/** Fim do eixo X em galões por dia. */
export const maxXGrafico = (diaAtual: number, peDiaValor: number) => {
  const referencia = Number.isFinite(peDiaValor)
    ? Math.max(diaAtual, peDiaValor)
    : diaAtual;
  return Math.max(120, Math.ceil((referencia * 1.4) / 20) * 20);
};

/** Lucro mensal em 41 volumes diários, de 0 a `maxX`. */
export const curvaLucro = (p: Premissas, maxX: number, pontos = 41) =>
  Array.from({ length: pontos }, (_, i) => {
    const x = (i * maxX) / (pontos - 1);
    return { x, y: modelo(p, x).lucro };
  });

/* --------------------------- Formatação -------------------------- */

const semZeroNegativo = (v: number) => (Object.is(v, -0) || Math.abs(v) < 1e-9 ? 0 : v);

/** Moeda: centavos só abaixo de R$ 100, para os números grandes lerem rápido. */
export const formatMoeda = (valor: number) => {
  const v = semZeroNegativo(valor);
  const casas = Math.abs(v) < 100 ? 2 : 0;
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
};

/** Recebe a fração (0,333) e devolve "33,3%". */
export const formatPercentual = (fracao: number) =>
  `${semZeroNegativo(fracao * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;

export const formatInteiro = (valor: number) =>
  Math.round(valor).toLocaleString("pt-BR");

export const formatDecimal1 = (valor: number) =>
  valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Rótulo do eixo Y: "2,5 mil" a partir de mil. */
export const formatEixo = (valor: number) => {
  const v = semZeroNegativo(valor);
  if (Math.abs(v) >= 1000) {
    return `${(v / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`;
  }
  return v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
};

/** Campo vazio, negativo ou inválido conta como zero. */
export const lerNumero = (texto: string) => {
  if (!texto) return 0;
  const n = Number(texto.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
