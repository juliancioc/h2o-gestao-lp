import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AlertTriangle, Link2, RotateCcw, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import ToolLayout from "@/components/tools/ToolLayout";
import NumberField from "@/components/tools/NumberField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
// O mesmo arquivo alimenta o JSON-LD que o prerender escreve no HTML.
import faqs from "@/lib/faq-custo-do-galao.json";
import {
  calculateGallonCost,
  formatBRL,
  formatPercent,
  parseNumber,
} from "@/lib/gallonCost";

type FieldKey =
  | "unitPrice"
  | "quantity"
  | "bonusUnits"
  | "freight"
  | "lossUnits"
  | "containerPrice"
  | "containerLifeYears"
  | "containerTurnsPerMonth"
  | "containerLossPercent"
  | "salePrice";

const INITIAL_FIELDS: Record<FieldKey, string> = {
  unitPrice: "4,00",
  quantity: "500",
  bonusUnits: "0",
  freight: "900,00",
  lossUnits: "1",
  containerPrice: "32,00",
  containerLifeYears: "3",
  containerTurnsPerMonth: "2",
  containerLossPercent: "1",
  salePrice: "15,00",
};

/** Nomes curtos para o link compartilhável não virar uma URL gigante. */
const PARAM_BY_FIELD: Record<FieldKey, string> = {
  unitPrice: "p",
  quantity: "q",
  bonusUnits: "b",
  freight: "f",
  lossUnits: "a",
  containerPrice: "vp",
  containerLifeYears: "vy",
  containerTurnsPerMonth: "vt",
  containerLossPercent: "vl",
  salePrice: "v",
};

const FIELD_KEYS = Object.keys(PARAM_BY_FIELD) as FieldKey[];

/** Cobre quem chega navegando pelo site; quem abre a URL direto já recebe
 *  este mesmo bloco escrito no HTML pelo prerender. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const CustoDoGalao = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fields, setFields] = useState<Record<FieldKey, string>>(INITIAL_FIELDS);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Link compartilhado: os valores vêm na URL e substituem os de exemplo.
  useEffect(() => {
    const shared = { ...INITIAL_FIELDS };
    let hasShared = false;

    FIELD_KEYS.forEach((key) => {
      const value = searchParams.get(PARAM_BY_FIELD[key]);
      if (value !== null) {
        shared[key] = value;
        hasShared = true;
      }
    });

    if (hasShared) setFields(shared);
    // Só na montagem: depois disso quem manda é o formulário.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A barra fixa do celular só aparece enquanto o formulário está na tela.
  useEffect(() => {
    const node = formRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const setField = (key: FieldKey) => (value: string) =>
    setFields((current) => ({ ...current, [key]: value }));

  const result = useMemo(
    () =>
      calculateGallonCost({
        unitPrice: parseNumber(fields.unitPrice),
        quantity: parseNumber(fields.quantity),
        bonusUnits: parseNumber(fields.bonusUnits),
        freight: parseNumber(fields.freight),
        lossUnits: parseNumber(fields.lossUnits),
        containerPrice: parseNumber(fields.containerPrice),
        containerLifeYears: parseNumber(fields.containerLifeYears),
        containerTurnsPerMonth: parseNumber(fields.containerTurnsPerMonth),
        containerLossPercent: parseNumber(fields.containerLossPercent),
        salePrice: parseNumber(fields.salePrice),
      }),
    [fields],
  );

  const handleReset = () => {
    setFields(INITIAL_FIELDS);
    setSearchParams({}, { replace: true });
  };

  const handleShare = async () => {
    const params = new URLSearchParams();
    FIELD_KEYS.forEach((key) => params.set(PARAM_BY_FIELD[key], fields[key]));
    setSearchParams(params, { replace: true });

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado", {
        description: "Quem abrir vê exatamente os números que você preencheu.",
      });
    } catch {
      toast.error("Não foi possível copiar", {
        description: "Copie o endereço da barra do navegador.",
      });
    }
  };

  const breakdown = [
    {
      label: "Mercadoria",
      value: result.merchandisePerUnit,
      hint: "preço da nota já com a bonificação diluída",
    },
    {
      label: "Frete da compra",
      value: result.freightPerUnit,
      hint: "frete rateado por unidade recebida",
    },
    {
      label: "Avaria na chegada",
      value: result.lossPerUnit,
      hint: "carga, frete e vasilhame das unidades quebradas",
    },
    {
      label: "Vasilhame",
      value: result.containerPerUnit,
      hint: "desgaste do galão mais os que não voltam do cliente",
    },
  ];

  const hasResult = result.unitCost > 0;
  const negativeMargin = result.grossProfit !== null && result.grossProfit <= 0;

  return (
    <>
      <Seo path="/ferramentas/custo-do-galao" jsonLd={faqJsonLd} />

      <ToolLayout
        badge="Ferramenta gratuita"
        title={
          <>
            Calculadora de{" "}
            <span className="text-gradient">custo do galão</span>
          </>
        }
        subtitle="O preço da nota não é o seu custo. Preencha os campos abaixo e descubra quanto cada galão custa de verdade, com frete, bonificação, avaria e vasilhame."
        ctaTitle="Pare de refazer essa conta toda semana"
        ctaDescription="No H2O Gestão você cadastra o custo uma vez e o sistema mostra o lucro de cada venda sozinho, com estoque, fiado, entregas e fechamento de caixa no mesmo lugar."
      >
        {/* Calculadora */}
        <section className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8 items-start">
            {/* Formulário */}
            <div ref={formRef} className="space-y-6 order-2 lg:order-1">
              <Card variant="elevated">
                <CardContent className="p-5 md:p-6 space-y-6">
                  <div>
                    <h2 className="font-heading font-semibold text-lg text-foreground mb-1">
                      A compra da carga
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Os dados da última carga que você comprou do fornecedor,
                      na troca pelos vazios.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <NumberField
                        label="Preço da carga por unidade"
                        value={fields.unitPrice}
                        onChange={setField("unitPrice")}
                        prefix="R$"
                        hint="O valor por galão que está na nota do fornecedor."
                      />
                      <NumberField
                        label="Unidades pagas"
                        value={fields.quantity}
                        onChange={setField("quantity")}
                        suffix="un"
                        hint="Quantas unidades você pagou nessa compra."
                      />
                      <NumberField
                        label="Unidades bonificadas"
                        value={fields.bonusUnits}
                        onChange={setField("bonusUnits")}
                        suffix="un"
                        hint='Recebidas de graça, tipo "leve 10 pague 9". Zero se não tiver.'
                      />
                      <NumberField
                        label="Frete da compra"
                        value={fields.freight}
                        onChange={setField("freight")}
                        prefix="R$"
                        hint="Total do frete dessa carga, não por unidade."
                      />
                      <NumberField
                        label="Unidades perdidas"
                        value={fields.lossUnits}
                        onChange={setField("lossUnits")}
                        suffix="un"
                        hint="Quebraram no caminho. Você perde a carga e o vasilhame."
                      />
                    </div>
                  </div>

                  <div className="border-t border-border/60 pt-6">
                    <h2 className="font-heading font-semibold text-lg text-foreground mb-1">
                      Os seus vasilhames
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      O galão é seu e não se gasta em uma venda só, então o
                      custo dele é diluído pelos ciclos que ele aguenta.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <NumberField
                        label="Preço do vasilhame novo"
                        value={fields.containerPrice}
                        onChange={setField("containerPrice")}
                        prefix="R$"
                        hint="Quanto custa repor um galão vazio hoje."
                      />
                      <NumberField
                        label="Vida útil"
                        value={fields.containerLifeYears}
                        onChange={setField("containerLifeYears")}
                        suffix="anos"
                        hint="O garrafão de 20 litros costuma ter 3 anos de validade."
                      />
                      <NumberField
                        label="Giro por mês"
                        value={fields.containerTurnsPerMonth}
                        onChange={setField("containerTurnsPerMonth")}
                        suffix="x"
                        hint="Quantas vezes o mesmo galão sai e volta em um mês."
                      />
                      <NumberField
                        label="Vasilhames que não voltam"
                        value={fields.containerLossPercent}
                        onChange={setField("containerLossPercent")}
                        suffix="%"
                        hint="De cada 100 que saem, quantos você nunca mais vê."
                      />
                    </div>
                  </div>

                  <div className="border-t border-border/60 pt-6">
                    <h2 className="font-heading font-semibold text-lg text-foreground mb-1">
                      Seu preço de venda
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Opcional. Serve para ver o lucro bruto na hora.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <NumberField
                        label="Preço de venda ao cliente"
                        value={fields.salePrice}
                        onChange={setField("salePrice")}
                        prefix="R$"
                        hint="Deixe zerado se quiser só o custo."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 border-t border-border/60 pt-6">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={handleShare}
                    >
                      <Link2 className="w-4 h-4" />
                      Copiar link com esses números
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full sm:w-auto"
                      onClick={handleReset}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Limpar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resultado */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-6">
              <Card variant="elevated" className="border-2 border-primary/30">
                <CardContent className="p-5 md:p-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    Custo unitário do galão
                  </p>
                  <p className="text-4xl md:text-5xl font-heading font-bold text-gradient my-2 break-words">
                    {formatBRL(result.unitCost)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {hasResult
                      ? `Rateado sobre ${result.goodUnits.toLocaleString("pt-BR")} unidades boas`
                      : "Preencha a compra para ver o resultado"}
                  </p>

                  {hasResult && (
                    <>
                      <ul className="mt-6 space-y-3">
                        {breakdown.map((line) => (
                          <li key={line.label}>
                            <div className="flex items-baseline justify-between gap-3">
                              <span className="text-sm text-foreground">
                                {line.label}
                              </span>
                              <span className="text-sm font-medium text-foreground tabular-nums">
                                {formatBRL(line.value)}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {line.hint}
                            </p>
                          </li>
                        ))}
                      </ul>

                      {result.extraPercent !== null && result.extraPercent > 0.5 && (
                        <div className="mt-6 rounded-xl bg-accent/50 p-4">
                          <p className="text-sm text-accent-foreground leading-relaxed">
                            Na nota a carga sai por{" "}
                            <strong>{formatBRL(parseNumber(fields.unitPrice))}</strong>,
                            mas o galão custa{" "}
                            <strong>{formatPercent(result.extraPercent)}</strong> a
                            mais do que isso.
                          </p>
                        </div>
                      )}

                      {result.grossProfit !== null && result.marginPercent !== null && (
                        <div
                          className={cn(
                            "mt-4 rounded-xl p-4 border",
                            negativeMargin
                              ? "bg-destructive/10 border-destructive/30"
                              : "bg-card border-border",
                          )}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {negativeMargin ? (
                              <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                            )}
                            <span className="text-sm font-medium text-foreground">
                              {negativeMargin
                                ? "Você está vendendo no prejuízo"
                                : "Lucro bruto por galão"}
                            </span>
                          </div>
                          <p className="text-2xl font-heading font-bold text-foreground tabular-nums">
                            {formatBRL(result.grossProfit)}{" "}
                            <span className="text-base font-medium text-muted-foreground">
                              ({formatPercent(result.marginPercent)})
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            Ainda sem descontar entrega, comissão do entregador e
                            taxa da maquininha.
                          </p>
                        </div>
                      )}

                      <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
                        Esse é o número que vai no campo <strong>Custo</strong> do
                        cadastro do produto.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Barra fixa do celular */}
        <div
          className={cn(
            "lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl transition-transform duration-300",
            showStickyBar ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">Custo unitário</span>
            <span className="text-xl font-heading font-bold text-gradient tabular-nums">
              {formatBRL(result.unitCost)}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <section className="container mx-auto px-4 mt-20">
          <article className="max-w-3xl mx-auto space-y-12 text-foreground/80 leading-relaxed">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                Por que o preço da nota não é o seu custo
              </h2>
              <p className="mb-4">
                Pergunte a qualquer dono de distribuidora quanto custa o galão
                dele e a resposta quase sempre é o preço que aparece na nota do
                fornecedor. É o número mais fácil de lembrar, e é o errado.
              </p>
              <p className="mb-4">
                O que está na nota é o preço da carga, a água que você comprou na
                troca pelos vazios. Entre essa nota e a venda acontecem outras
                coisas que mexem no custo de cada unidade: o frete daquela carga
                precisa ser dividido entre os galões, a bonificação derruba o
                preço médio, as unidades que chegam quebradas empurram o próprio
                custo para as que sobraram e o vasilhame, que é seu, se gasta um
                pouco a cada volta e às vezes não volta nunca mais.
              </p>
              <p>
                Quem trabalha com o preço da nota costuma achar que tem uma
                margem que não tem. A diferença raramente é grande em uma venda,
                mas em mil galões por mês ela decide se o mês fechou no azul.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                O que entra no custo de um galão
              </h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    1. O preço da carga
                  </h3>
                  <p>
                    A base da conta. Use o valor por unidade que está na nota do
                    fornecedor, sem arredondar para cima nem para baixo.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    2. O frete da compra
                  </h3>
                  <p>
                    O que você pagou para a carga chegar até você. Divida pelo
                    total de unidades recebidas, incluindo as bonificadas. Um
                    frete de R$ 900 em 500 galões são R$ 1,80 por unidade, quase
                    metade do que você pagou pela própria carga.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    3. A bonificação recebida
                  </h3>
                  <p>
                    Se você pagou 100 e recebeu 110, o mesmo dinheiro se divide
                    por mais galões e o custo médio cai. É o único item da lista
                    que joga a seu favor, e é justamente o que mais gente esquece
                    de considerar.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    4. A avaria no caminho
                  </h3>
                  <p>
                    Um galão que quebra na volta da fonte custa muito mais do
                    que a carga. Você perde a água que pagou, o frete que ela já
                    consumiu e o vasilhame, que era seu e vai ter que ser
                    reposto. Um galão de R$ 32 que quebra com R$ 4 de água
                    dentro é um prejuízo de R$ 36, não de R$ 4, e ele se
                    transfere todo para as unidades que chegaram boas.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    5. O desgaste e a perda dos vasilhames
                  </h3>
                  <p>
                    Aqui mora o erro mais caro, porque o parque de galões é da
                    distribuidora. O galão vazio não é despesa da venda nem
                    investimento eterno: é um ativo que roda e se desgasta.
                    Divida o preço dele pelo número de ciclos que ele aguenta na
                    vida útil e some a parte dos que não voltam. Um vasilhame de
                    R$ 32 que roda 2 vezes por mês durante 3 anos custa cerca de
                    R$ 0,44 por ciclo, e cada 1% de sumiço acrescenta mais
                    R$ 0,32.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                Como calcular, passo a passo
              </h2>
              <p className="mb-4">Um exemplo com números redondos:</p>
              <Card variant="glass">
                <CardContent className="p-5 md:p-6">
                  <ol className="space-y-3 list-decimal pl-5">
                    <li>
                      Você comprou <strong>500 cargas a R$ 4,00</strong>, o que
                      dá R$ 2.000,00 de mercadoria.
                    </li>
                    <li>
                      Pagou <strong>R$ 900,00 de frete</strong>, então a compra
                      saiu por R$ 2.900,00 no total.
                    </li>
                    <li>
                      Recebeu <strong>nenhuma bonificação</strong> e{" "}
                      <strong>1 galão quebrou no caminho</strong>, sobrando 499
                      unidades para vender. Junto com ele foi embora um
                      vasilhame de <strong>R$ 32,00</strong>.
                    </li>
                    <li>
                      Divida R$ 2.932,00 (a compra mais o vasilhame quebrado)
                      por 499 e chega em <strong>R$ 5,88</strong>, e não nos
                      R$ 4,00 da nota.
                    </li>
                    <li>
                      Some o desgaste do vasilhame: um galão de R$ 32,00 que
                      roda 2 vezes por mês durante 3 anos são 72 ciclos, ou
                      R$ 0,44 por venda, mais R$ 0,32 do 1% que o cliente não
                      devolve.
                    </li>
                    <li>
                      Custo unitário real: <strong>R$ 6,64</strong>.
                    </li>
                    <li>
                      Vendendo a R$ 15,00, o lucro bruto é de R$ 8,36 por galão,
                      e não os R$ 11,00 que a conta de cabeça sugeria.
                    </li>
                  </ol>
                </CardContent>
              </Card>
              <p className="mt-4">
                São R$ 2,64 de diferença por galão. Em 1.500 galões no mês, são
                R$ 3.960 que você achava que tinha e não tem.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                O que não entra no custo unitário
              </h2>
              <p className="mb-4">
                Custo unitário é o custo de ter o produto no estoque. Por isso
                fica de fora tudo que só acontece na hora de vender:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>gasolina e manutenção da moto ou do carro da entrega</li>
                <li>comissão do entregador</li>
                <li>taxa da maquininha de cartão</li>
                <li>aluguel, energia, água e salários fixos</li>
              </ul>
              <p>
                Isso não significa que esses custos não importam, muito pelo
                contrário. Eles é que separam o lucro bruto do lucro real. Só que
                eles variam por entrega e por forma de pagamento, então precisam
                ser calculados por venda, e não empurrados para dentro do preço
                do galão.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                Três erros que aparecem toda hora
              </h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    Tratar o vasilhame como despesa do mês
                  </h3>
                  <p>
                    Comprar 200 galões vazios não é uma despesa de um mês, é a
                    compra de um ativo que vai rodar por anos. Lançar tudo de uma
                    vez faz o mês parecer péssimo e todos os seguintes parecerem
                    ótimos.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    Congelar o custo e nunca mais revisar
                  </h3>
                  <p>
                    O fornecedor reajusta, a bonificação muda, o frete sobe. Um
                    custo cadastrado há oito meses faz todo relatório de lucro
                    mentir, e você só descobre quando o caixa não fecha.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    Definir preço de venda por multiplicação fixa
                  </h3>
                  <p>
                    Multiplicar o preço da nota por dois é rápido, mas ignora
                    frete, avaria e vasilhame. O resultado costuma ser uma margem
                    menor do que a que você imaginava, e ela encolhe justamente
                    quando o frete aumenta.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                Perguntas frequentes
              </h2>
              <Accordion type="single" collapsible defaultValue="faq-0">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-base md:text-lg font-heading">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="rounded-2xl bg-accent/40 p-6">
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">
                Já sabe o custo. E agora?
              </h2>
              <p className="mb-4">
                Cadastre esse valor no custo do produto e mantenha atualizado a
                cada compra. É a partir dele que todo relatório de lucro da sua
                distribuidora passa a fazer sentido.
              </p>
              <Link
                to="/"
                className="text-primary font-medium underline underline-offset-4"
              >
                Conheça o H2O Gestão
              </Link>
            </div>
          </article>
        </section>
      </ToolLayout>
    </>
  );
};

export default CustoDoGalao;
