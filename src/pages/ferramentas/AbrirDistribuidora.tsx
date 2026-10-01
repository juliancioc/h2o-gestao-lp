import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import Seo from "@/components/Seo";
import ToolLayout from "@/components/tools/ToolLayout";
import NumberField from "@/components/tools/NumberField";
import GraficoLucro from "@/components/tools/GraficoLucro";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { pushDataLayer } from "@/lib/analytics";
import { trialCopy } from "@/lib/trial";
import { cn } from "@/lib/utils";
import {
  PREMISSAS_PADRAO,
  formatDecimal1,
  formatInteiro,
  formatMoeda,
  formatPercentual,
  investimento,
  lerNumero,
  margemBruta,
  markup,
  modelo,
  payback,
  peDia,
  peMes,
  veredito,
  type CampoPremissa,
  type Premissas,
  type Tom,
} from "@/lib/simuladorDistribuidora";

const PATH = "/ferramentas/abrir-distribuidora";
// Suba a versão ao mudar PREMISSAS_PADRAO: o que ficou salvo vence o padrão, e
// quem já abriu a página continuaria vendo os números antigos.
const STORAGE_PREMISSAS = "h2o:simulador-distribuidora:v2";
const STORAGE_CHECKLIST = "h2o:simulador-distribuidora:checklist:v1";

type Modo = "contratado" | "proprio";

type Valores = Record<CampoPremissa, string>;

const VALORES_PADRAO = Object.fromEntries(
  Object.entries(PREMISSAS_PADRAO).map(([campo, valor]) => [campo, String(valor)]),
) as Valores;

const CAMPOS = Object.keys(PREMISSAS_PADRAO) as CampoPremissa[];

interface Campo {
  id: CampoPremissa;
  label: string;
  prefix?: string;
  suffix?: string;
  step: number;
  max?: number;
}

const GRUPO_GALAO: Campo[] = [
  { id: "custo", label: "Custo do galão", prefix: "R$", step: 0.1 },
  { id: "preco", label: "Preço de venda", prefix: "R$", step: 0.1 },
  { id: "imposto", label: "Simples Nacional", suffix: "%", step: 0.1 },
  { id: "cartao", label: "Taxa média de pagamento", suffix: "%", step: 0.1 },
  { id: "perdas", label: "Perdas e fiado", suffix: "%", step: 0.1 },
  { id: "entrega", label: "Custo variável de entrega", prefix: "R$", step: 0.1 },
];

const GRUPO_FIXOS: Campo[] = [
  { id: "aluguel", label: "Aluguel do ponto", prefix: "R$", step: 50 },
  { id: "salario", label: "Entregador + encargos", prefix: "R$", step: 50 },
  { id: "contador", label: "Contador", prefix: "R$", step: 50 },
  { id: "utilidades", label: "Energia, internet, telefone", prefix: "R$", step: 50 },
  { id: "outros", label: "Outros", prefix: "R$", step: 50 },
];

const GRUPO_VOLUME: Campo[] = [
  { id: "dia", label: "Galões vendidos por dia", suffix: "/dia", step: 5 },
  { id: "dias", label: "Dias de operação no mês", suffix: "dias", step: 1, max: 31 },
  { id: "cascos", label: "Vasilhames em estoque", suffix: "un", step: 10 },
  { id: "pcasco", label: "Preço por vasilhame", prefix: "R$", step: 1 },
  { id: "invest", label: "Outros investimentos", prefix: "R$", step: 100 },
];

const CHECKLIST = [
  {
    titulo: "Pesquisar o preço da praça.",
    texto:
      "Ligar para 4 ou 5 distribuidoras da sua cidade e anotar o preço do galão 20L entregue.",
  },
  {
    titulo: "Abrir o CNPJ com o CNAE certo.",
    texto:
      "Comércio varejista de bebidas (4723-7/00) e, se for vender gás, 4784-9/00.",
  },
  {
    titulo: "Alvará e vigilância sanitária.",
    texto:
      "Alvará de funcionamento da prefeitura e licença sanitária para armazenar água.",
  },
  {
    titulo: "Fechar com o fornecedor.",
    texto:
      "Confirmar o preço por escrito, prazo de pagamento, pedido mínimo e frequência de entrega.",
  },
  {
    titulo: "Comprar os vasilhames.",
    texto:
      "Estoque para girar com o fornecedor e para vender a cliente novo. Conferir a data de validade gravada.",
  },
  {
    titulo: "Definir o contador.",
    texto: "Enquadramento no Simples Nacional, Anexo I.",
  },
  {
    titulo: "Configurar o sistema.",
    texto:
      "Cadastro de clientes, pedidos por WhatsApp e controle de vasilhames no H2O Gestão desde o primeiro dia.",
  },
];

const ATENCAO = [
  {
    marcador: "↑",
    titulo: "Volume decide tudo.",
    texto:
      "Com poucos reais de sobra por galão, a diferença entre prejuízo e lucro está em algumas dezenas de galões por dia.",
  },
  {
    marcador: "↓",
    titulo: "Entregar você mesmo no início",
    texto:
      "derruba o custo fixo e o ponto de equilíbrio. Contrate quando o volume pagar o entregador.",
  },
  {
    marcador: "$",
    titulo: "Vasilhames imobilizam dinheiro.",
    texto:
      "Saiba quais clientes estão com os seus vasilhames e cobre o vasilhame de quem compra pela primeira vez.",
  },
  {
    marcador: "+",
    titulo: "Gás aproveita a mesma entrega.",
    texto: "O botijão tem ticket maior e o mesmo cliente compra os dois.",
  },
  {
    marcador: "!",
    titulo: "Fiado vira prejuízo rápido.",
    texto: "Prefira PIX na entrega e limite o fiado a clientes antigos.",
  },
];

/** Cores da faixa de veredito, todas de token. */
const ESTILO_TOM: Record<Tom, { faixa: string; titulo: string; icone: typeof XCircle }> = {
  erro: {
    faixa: "bg-destructive/10 border-destructive/30",
    titulo: "text-destructive-text",
    icone: XCircle,
  },
  alerta: {
    faixa: "bg-warning/10 border-warning/30",
    titulo: "text-warning",
    icone: AlertTriangle,
  },
  sucesso: {
    faixa: "bg-success/10 border-success/30",
    titulo: "text-success",
    icone: CheckCircle2,
  },
};

/** localStorage pode não existir ou lançar (aba anônima, cookies bloqueados). */
const lerStorage = <T,>(chave: string): T | null => {
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : null;
  } catch {
    return null;
  }
};

const gravarStorage = (chave: string, valor: unknown) => {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // Sem storage a página funciona igual, só não lembra na próxima visita.
  }
};

interface Salvo {
  valores: Partial<Valores>;
  modo: Modo;
  salarioGuardado: string;
}

const Subtitulo = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
    {children}
  </h3>
);

const AbrirDistribuidora = () => {
  const [valores, setValores] = useState<Valores>(VALORES_PADRAO);
  const [modo, setModo] = useState<Modo>("contratado");
  const [salarioGuardado, setSalarioGuardado] = useState(VALORES_PADRAO.salario);
  const [feitos, setFeitos] = useState<boolean[]>(() => CHECKLIST.map(() => false));
  // O HTML do build sai com os valores de exemplo. O que o visitante salvou
  // só entra depois de montar, senão a hidratação diverge do servidor.
  const [carregado, setCarregado] = useState(false);
  const jaEditou = useRef(false);

  useEffect(() => {
    const salvo = lerStorage<Salvo>(STORAGE_PREMISSAS);
    if (salvo?.valores) {
      setValores((atual) => {
        const proximo = { ...atual };
        CAMPOS.forEach((campo) => {
          const valor = salvo.valores[campo];
          if (typeof valor === "string") proximo[campo] = valor;
        });
        return proximo;
      });
      if (salvo.modo === "contratado" || salvo.modo === "proprio") setModo(salvo.modo);
      if (typeof salvo.salarioGuardado === "string") {
        setSalarioGuardado(salvo.salarioGuardado);
      }
    }

    const checklist = lerStorage<boolean[]>(STORAGE_CHECKLIST);
    if (Array.isArray(checklist)) {
      setFeitos(CHECKLIST.map((_, i) => checklist[i] === true));
    }

    setCarregado(true);
    pushDataLayer({ event: "view_tool", tool: PATH });
  }, []);

  useEffect(() => {
    if (!carregado) return;
    gravarStorage(STORAGE_PREMISSAS, { valores, modo, salarioGuardado } satisfies Salvo);
  }, [carregado, valores, modo, salarioGuardado]);

  useEffect(() => {
    if (carregado) gravarStorage(STORAGE_CHECKLIST, feitos);
  }, [carregado, feitos]);

  const marcarUso = () => {
    if (jaEditou.current) return;
    jaEditou.current = true;
    pushDataLayer({ event: "use_tool", tool: PATH });
  };

  const setCampo = (campo: CampoPremissa) => (valor: string) => {
    marcarUso();
    setValores((atual) => ({ ...atual, [campo]: valor }));
    // Com entregador contratado, o salário digitado é o que volta depois.
    if (campo === "salario" && modo === "contratado") setSalarioGuardado(valor);
  };

  const trocarModo = (novo: Modo) => {
    if (novo === modo) return;
    marcarUso();
    if (novo === "proprio") {
      setSalarioGuardado(valores.salario);
      setValores((atual) => ({ ...atual, salario: "0" }));
    } else {
      setValores((atual) => ({ ...atual, salario: salarioGuardado }));
    }
    setModo(novo);
    pushDataLayer({ event: "change_delivery_mode", tool: PATH, mode: novo });
  };

  const restaurar = () => {
    setValores(VALORES_PADRAO);
    setModo("contratado");
    setSalarioGuardado(VALORES_PADRAO.salario);
  };

  const p = useMemo(
    () =>
      Object.fromEntries(
        CAMPOS.map((campo) => [campo, lerNumero(valores[campo])]),
      ) as unknown as Premissas,
    [valores],
  );

  const m = modelo(p);
  const pe = peMes(m);
  const peDiaValor = peDia(pe, p.dias);
  const inv = investimento(p);
  const meses = payback(inv, m.lucro);
  const v = veredito(p);
  const estilo = ESTILO_TOM[v.tom];
  const IconeVeredito = estilo.icone;
  const sobraValida = m.contrib > 0;

  const indicadores = [
    {
      rotulo: "Margem bruta",
      valor: formatPercentual(margemBruta(p)),
      legenda: `markup ${formatPercentual(markup(p))}`,
    },
    {
      rotulo: "Sobra por galão",
      valor: formatMoeda(m.contrib),
      legenda: "após custos variáveis",
      negativo: m.contrib < 0,
    },
    {
      rotulo: "Ponto de equilíbrio",
      valor: sobraValida ? `${formatInteiro(Math.ceil(peDiaValor))}/dia` : "—",
      legenda: sobraValida
        ? `${formatInteiro(Math.ceil(pe))} galões/mês`
        : "sobra por galão negativa",
    },
    { rotulo: "Volume no mês", valor: formatInteiro(m.volume), legenda: "galões" },
    {
      rotulo: "Investimento inicial",
      valor: formatMoeda(inv),
      legenda: `${formatInteiro(p.cascos)} vasilhames + outros`,
    },
    {
      rotulo: "Retorno do investimento",
      valor: meses === null ? "—" : formatDecimal1(meses),
      legenda: "meses",
    },
  ];

  const porGalao = [
    { rotulo: "Preço de venda", valor: p.preco, sinal: "" },
    { rotulo: "Custo do galão", valor: p.custo, sinal: "− " },
    { rotulo: "Imposto (Simples)", valor: m.imp, sinal: "− " },
    { rotulo: "Taxa de pagamento", valor: m.tx, sinal: "− " },
    { rotulo: "Perdas e fiado", valor: m.per, sinal: "− " },
    { rotulo: "Entrega", valor: m.ent, sinal: "− " },
  ];

  const dre = [
    {
      rotulo: `Receita (${formatInteiro(m.volume)} galões)`,
      valor: p.preco * m.volume,
      sinal: "",
    },
    { rotulo: "Custo dos galões", valor: p.custo * m.volume, sinal: "− " },
    {
      rotulo: "Custos variáveis",
      valor: (m.imp + m.tx + m.per + m.ent) * m.volume,
      sinal: "− ",
    },
    { rotulo: "Custos fixos", valor: m.fixos, sinal: "− " },
  ];

  const renderCampos = (campos: Campo[]) => (
    <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-4">
      {campos.map((campo) => (
        <NumberField
          key={campo.id}
          id={campo.id}
          type="number"
          min={campo.id === "dias" ? 1 : 0}
          max={campo.max}
          step={campo.step}
          label={campo.label}
          prefix={campo.prefix}
          suffix={campo.suffix}
          value={valores[campo.id]}
          onChange={setCampo(campo.id)}
        />
      ))}
    </div>
  );

  const renderTabela = (
    titulo: string,
    linhas: { rotulo: string; valor: number; sinal: string }[],
    total: { rotulo: string; valor: number },
  ) => (
    <div>
      <Subtitulo>{titulo}</Subtitulo>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {linhas.map((linha) => (
              <tr key={linha.rotulo} className="border-b border-border/60">
                <td className="py-2 pr-4 text-foreground">{linha.rotulo}</td>
                <td className="py-2 text-right tabular-nums text-foreground whitespace-nowrap">
                  {linha.sinal}
                  {formatMoeda(linha.valor)}
                </td>
              </tr>
            ))}
            <tr>
              <th scope="row" className="pt-3 pr-4 text-left font-semibold text-foreground">
                {total.rotulo}
              </th>
              <td
                className={cn(
                  "pt-3 text-right tabular-nums font-bold whitespace-nowrap",
                  total.valor < 0 ? "text-destructive-text" : "text-foreground",
                )}
              >
                {formatMoeda(total.valor)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <Seo path={PATH} />

      <ToolLayout
        badge="Estudo de viabilidade"
        title={
          <>
            Quanto custa abrir uma{" "}
            <span className="text-gradient">distribuidora de água</span>
          </>
        }
        subtitle="Informe quanto você paga e cobra pelo galão, seus custos e quanto espera vender. O resultado se recalcula na hora."
        ctaTitle="Controle vasilhames, fiado e entregas desde o primeiro galão"
        ctaDescription="O H2O Gestão foi feito para distribuidoras de água e gás: pedidos, entregadores, estoque de vasilhames e fechamento de caixa em um só lugar."
        ctaLabel={trialCopy.finalCta}
        ctaSource="simulador_distribuidora"
      >
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 min-[860px]:grid-cols-[1fr_1.15fr] lg:gap-8 items-start">
            {/* Premissas */}
            <Card variant="elevated" className="min-w-0">
              <CardContent className="p-5 md:p-6 space-y-6">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Premissas
                </h2>

                <div>
                  <Subtitulo>Preço e custo por galão</Subtitulo>
                  {renderCampos(GRUPO_GALAO)}
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    Entrega por galão = combustível, manutenção da moto e comissão
                    por produção, se houver.
                  </p>
                </div>

                <div className="border-t border-border/60 pt-6">
                  <Subtitulo>Quem entrega</Subtitulo>
                  <div className="grid grid-cols-2 gap-2" role="group" aria-label="Quem entrega">
                    {(
                      [
                        ["contratado", "Entregador contratado"],
                        ["proprio", "Eu mesmo entrego"],
                      ] as const
                    ).map(([valor, rotulo]) => (
                      <Button
                        key={valor}
                        type="button"
                        variant={modo === valor ? "default" : "outline"}
                        aria-pressed={modo === valor}
                        onClick={() => trocarModo(valor)}
                        className="h-auto min-h-11 whitespace-normal py-2 leading-tight motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                      >
                        {rotulo}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border/60 pt-6">
                  <Subtitulo>Custos fixos mensais</Subtitulo>
                  {renderCampos(GRUPO_FIXOS)}
                </div>

                <div className="border-t border-border/60 pt-6">
                  <Subtitulo>Volume e investimento</Subtitulo>
                  {renderCampos(GRUPO_VOLUME)}
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    Outros investimentos: moto, reforma do ponto, bebedouros, alvará
                    e capital de giro.
                  </p>
                </div>

                <div className="border-t border-border/60 pt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full sm:w-auto"
                    onClick={restaurar}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Voltar aos valores de exemplo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resultado */}
            <Card variant="elevated" className="min-w-0 border-2 border-primary/30">
              {/* Fora do CardContent: dentro, o space-y abriria um vão em cima. */}
              <h2 className="sr-only">Resultado</h2>
              <CardContent className="p-5 md:p-6 space-y-8">

                <div
                  aria-live="polite"
                  className={cn("rounded-xl border p-4 md:p-5", estilo.faixa)}
                >
                  <div className="flex items-start gap-3">
                    <IconeVeredito
                      aria-hidden="true"
                      className={cn("w-6 h-6 shrink-0 mt-1", estilo.titulo)}
                    />
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-2xl md:text-3xl font-heading font-bold tabular-nums break-words",
                          estilo.titulo,
                        )}
                      >
                        {v.titulo ?? (
                          <>
                            {formatMoeda(m.lucro)}{" "}
                            <span className="text-base font-medium">/mês</span>
                          </>
                        )}
                      </p>
                      <p className="mt-1 text-sm text-foreground leading-relaxed">
                        {v.texto}
                      </p>
                    </div>
                  </div>
                </div>

                <dl className="grid grid-cols-2 min-[520px]:grid-cols-3 min-[860px]:grid-cols-2 lg:grid-cols-3 gap-3">
                  {indicadores.map((item) => (
                    <div
                      key={item.rotulo}
                      className="rounded-xl border border-border bg-card p-3 min-w-0"
                    >
                      <dt className="text-xs font-medium text-muted-foreground">
                        {item.rotulo}
                      </dt>
                      <dd
                        className={cn(
                          "mt-1 text-xl font-heading font-bold tabular-nums break-words",
                          item.negativo ? "text-destructive-text" : "text-foreground",
                        )}
                      >
                        {item.valor}
                      </dd>
                      <dd className="text-xs text-muted-foreground">{item.legenda}</dd>
                    </div>
                  ))}
                </dl>

                {renderTabela("De onde vêm os R$ por galão", porGalao, {
                  rotulo: "Sobra por galão",
                  valor: m.contrib,
                })}

                {renderTabela("Resultado mensal (DRE simplificado)", dre, {
                  rotulo: "Lucro do mês",
                  valor: m.lucro,
                })}

                <div>
                  <Subtitulo>Lucro mensal por volume diário</Subtitulo>
                  <GraficoLucro premissas={p} peDia={peDiaValor} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 lg:mt-8 grid grid-cols-1 min-[760px]:grid-cols-2 gap-6 lg:gap-8 items-start">
            <Card variant="elevated">
              <CardContent className="p-5 md:p-6">
                <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
                  Antes de abrir
                </h2>
                <ol className="space-y-4">
                  {CHECKLIST.map((item, i) => (
                    <li key={item.titulo} className="flex items-start gap-3">
                      <Checkbox
                        id={`checklist-${i}`}
                        checked={feitos[i]}
                        onCheckedChange={(marcado) =>
                          setFeitos((atual) =>
                            atual.map((feito, j) => (j === i ? marcado === true : feito)),
                          )
                        }
                        className="mt-0.5 h-5 w-5"
                      />
                      <label
                        htmlFor={`checklist-${i}`}
                        className={cn(
                          "text-sm leading-relaxed cursor-pointer",
                          feitos[i] ? "text-muted-foreground" : "text-foreground/80",
                        )}
                      >
                        <strong className="font-semibold text-foreground">
                          {item.titulo}
                        </strong>{" "}
                        {item.texto}
                      </label>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="p-5 md:p-6">
                <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
                  Pontos de atenção
                </h2>
                <ul className="space-y-4">
                  {ATENCAO.map((item) => (
                    <li key={item.titulo} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="w-6 h-6 shrink-0 rounded-md bg-primary/10 text-primary font-heading font-bold text-sm flex items-center justify-center"
                      >
                        {item.marcador}
                      </span>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        <strong className="font-semibold text-foreground">
                          {item.titulo}
                        </strong>{" "}
                        {item.texto}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
            Valores de exemplo para planejamento; ajuste com orçamentos reais e
            confirme impostos e licenças com seu contador.
          </p>
        </section>
      </ToolLayout>
    </>
  );
};

export default AbrirDistribuidora;
