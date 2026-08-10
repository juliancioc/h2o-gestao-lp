export interface GallonCostInput {
  /** Preço da carga por unidade na nota do fornecedor, na troca pelo vazio. */
  unitPrice: number;
  /** Unidades pagas na compra. */
  quantity: number;
  /** Unidades recebidas de graça (bonificação do tipo "leve 10 pague 9"). */
  bonusUnits: number;
  /** Frete total cobrado nessa compra. */
  freight: number;
  /** Unidades que quebraram no caminho. Levam a carga e o vasilhame junto. */
  lossUnits: number;
  /** Preço de um vasilhame novo. */
  containerPrice: number;
  /** Vida útil do vasilhame em anos. */
  containerLifeYears: number;
  /** Quantas vezes o mesmo vasilhame roda por mês. */
  containerTurnsPerMonth: number;
  /** De cada 100 vasilhames que saem, quantos não voltam. */
  containerLossPercent: number;
  /** Preço de venda ao cliente. Opcional, só para o lucro bruto. */
  salePrice: number;
}

export interface GallonCostResult {
  /** Unidades que sobraram para vender. */
  goodUnits: number;
  /** Mercadoria por unidade, já com a bonificação diluída. */
  merchandisePerUnit: number;
  /** Rateio do frete da compra. */
  freightPerUnit: number;
  /** Carga, frete e vasilhame das unidades perdidas, jogados nas boas. */
  lossPerUnit: number;
  /** Depreciação do vasilhame mais o que some. */
  containerPerUnit: number;
  /** Soma de tudo: o número que vai no cadastro do produto. */
  unitCost: number;
  /** Quanto o custo real passa do preço da nota, em %. */
  extraPercent: number | null;
  /** Preço de venda menos custo unitário. */
  grossProfit: number | null;
  /** Lucro bruto sobre o preço de venda, em %. */
  marginPercent: number | null;
}

const round2 = (value: number) => {
  const rounded = Math.round(value * 100) / 100;
  // Sem isso, um resto de arredondamento minúsculo vira zero negativo e a
  // linha aparece como "-R$ 0,00".
  return rounded === 0 ? 0 : rounded;
};

/**
 * Lê número digitado em português. Com vírgula, o ponto é separador de milhar
 * ("1.200,50"); sem vírgula, o ponto é decimal ("9.50").
 */
export const parseNumber = (value: string): number => {
  if (!value) return 0;
  const trimmed = value.replace(/\s/g, "");
  const normalized = trimmed.includes(",")
    ? trimmed.replace(/\./g, "").replace(",", ".")
    : trimmed;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatPercent = (value: number) =>
  `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;

/**
 * Custo unitário real de um galão.
 *
 * As linhas do detalhamento somam exatamente o custo unitário, então o
 * resultado pode ser lido como um rateio, não como estimativas soltas.
 */
export const calculateGallonCost = (
  input: GallonCostInput,
): GallonCostResult => {
  const paidUnits = Math.max(input.quantity, 0);
  const receivedUnits = paidUnits + Math.max(input.bonusUnits, 0);
  const goodUnits = Math.max(receivedUnits - Math.max(input.lossUnits, 0), 0);

  const merchandiseTotal = paidUnits * Math.max(input.unitPrice, 0);
  const purchaseTotal = merchandiseTotal + Math.max(input.freight, 0);

  if (receivedUnits <= 0 || goodUnits <= 0) {
    return {
      goodUnits: 0,
      merchandisePerUnit: 0,
      freightPerUnit: 0,
      lossPerUnit: 0,
      containerPerUnit: 0,
      unitCost: 0,
      extraPercent: null,
      grossProfit: null,
      marginPercent: null,
    };
  }

  // Rateio sobre o que chegou: é aqui que a bonificação derruba o preço médio.
  const merchandisePerUnit = merchandiseTotal / receivedUnits;
  const freightPerUnit = Math.max(input.freight, 0) / receivedUnits;

  // Quem quebra no caminho leva o vasilhame junto, e o vasilhame é da
  // distribuidora: perde-se a carga, o frete dela e o preço de repor o galão.
  const destroyedContainers =
    Math.min(Math.max(input.lossUnits, 0), receivedUnits) *
    Math.max(input.containerPrice, 0);

  // Rateio sobre o que sobrou: a diferença é o peso da avaria.
  const costBeforeContainer =
    (purchaseTotal + destroyedContainers) / goodUnits;

  // O vasilhame é da distribuidora e roda várias vezes, então entra diluído
  // pelos ciclos de vida, mais a parcela dos que não voltam.
  const cycles =
    Math.max(input.containerLifeYears, 0) *
    12 *
    Math.max(input.containerTurnsPerMonth, 0);
  const depreciation =
    cycles > 0 ? Math.max(input.containerPrice, 0) / cycles : 0;
  const attrition =
    (Math.max(input.containerLossPercent, 0) / 100) *
    Math.max(input.containerPrice, 0);
  const containerPerUnit = depreciation + attrition;

  const unitCost = round2(costBeforeContainer + containerPerUnit);

  // As linhas exibidas precisam somar o custo unitário, senão o detalhamento
  // não fecha com o número grande. A avaria já é um resto na conta, então é
  // ela que absorve a sobra do arredondamento das outras.
  const merchandiseLine = round2(merchandisePerUnit);
  const freightLine = round2(freightPerUnit);
  const containerLine = round2(containerPerUnit);
  const lossLine = round2(
    unitCost - merchandiseLine - freightLine - containerLine,
  );

  const extraPercent =
    input.unitPrice > 0 ? (unitCost / input.unitPrice - 1) * 100 : null;

  const salePrice = Math.max(input.salePrice, 0);
  const grossProfit = salePrice > 0 ? round2(salePrice - unitCost) : null;
  const marginPercent =
    salePrice > 0 && grossProfit !== null ? (grossProfit / salePrice) * 100 : null;

  return {
    goodUnits,
    merchandisePerUnit: merchandiseLine,
    freightPerUnit: freightLine,
    lossPerUnit: lossLine,
    containerPerUnit: containerLine,
    unitCost,
    extraPercent,
    grossProfit,
    marginPercent,
  };
};
