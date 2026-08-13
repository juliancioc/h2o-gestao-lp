import { useEffect, useRef, useState } from "react";
import {
  Check,
  CreditCard,
  FileText,
  LifeBuoy,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  Upload,
} from "lucide-react";
import { StartTrialButton } from "@/components/analytics/StartTrialButton";
import { pushDataLayer } from "@/lib/analytics";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const essencialFeatures = [
  "Até 2 usuários",
  "Gestão de vendas e pedidos",
  "Financeiro completo",
  "Fechamento de caixa diário",
  "Gestão de clientes e fiado",
  "Controle de galões",
  "Relatórios e dashboards",
  "Análise de lucro por galão",
  "Aplicativo Android com o resumo do dia",
];

const operacaoFeatures = [
  "Tudo do plano Essencial",
  "Até 5 usuários (R$ 19/mês por usuário extra)",
  "Loja online própria",
  "Pedidos direto no seu WhatsApp",
  "Integração com Mercado Pago",
  "Painel de entregas do dia",
  "Aplicativo Android para os entregadores",
  "Taxas de entrega por bairro",
  "Emissão de nota fiscal",
];

const gestaoFeatures = [
  "Tudo do plano Operação",
  "Até 8 usuários (R$ 19/mês por usuário extra)",
  "Entregadores ilimitados no aplicativo",
  "Até 100 notas fiscais por mês",
  "Onboarding assistido",
  "Importação dos seus dados",
  "Suporte prioritário",
];

// Features destacadas nos cards (ícone próprio + texto em evidência)
const featureIcons: Record<string, typeof Check> = {
  "Emissão de nota fiscal": FileText,
  "Até 100 notas fiscais por mês": FileText,
  "Loja online própria": Store,
  "Painel de entregas do dia": Truck,
  "Aplicativo Android com o resumo do dia": Smartphone,
  "Aplicativo Android para os entregadores": Smartphone,
  "Entregadores ilimitados no aplicativo": Truck,
  "Integração com Mercado Pago": CreditCard,
  "Onboarding assistido": LifeBuoy,
  "Importação dos seus dados": Upload,
};

const plans = [
  {
    name: "Essencial",
    slug: "essencial",
    description: "Controle completo da sua distribuidora no dia a dia",
    monthlyPrice: 59,
    priceNote: null,
    badge: null,
    features: essencialFeatures,
    footnote: null,
    highlight: false,
  },
  {
    name: "Operação",
    slug: "operacao",
    description: "Para vender e entregar mais: loja online + entregas",
    monthlyPrice: 99,
    priceNote: "Assine agora e garanta esse valor",
    badge: "Mais vendido",
    features: operacaoFeatures,
    footnote:
      "A emissão de nota fiscal inclui até 40 notas por mês. Precisando de mais, emissões extras podem ser contratadas por R$ 1,00 cada.",
    highlight: true,
  },
  {
    name: "Gestão",
    slug: "gestao",
    description: "Para equipes maiores: mais usuários, onboarding e suporte",
    monthlyPrice: 249,
    priceNote: null,
    badge: "Mais completo",
    features: gestaoFeatures,
    footnote:
      "Emissões acima de 100 notas no mês podem ser contratadas por R$ 1,00 cada. A importação dos seus dados e o onboarding são feitos pela nossa equipe na contratação.",
    highlight: false,
  },
];

// Anual = 12 meses pelo preço de 10 (2 mensalidades de economia)
const annualPrice = (monthly: number) => monthly * 10;

const PlansSection = () => {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const isAnnual = billing === "annual";

  const sectionRef = useRef<HTMLElement | null>(null);
  const pricingViewed = useRef(false);

  // "Viu os planos" é a etapa entre chegar na página e clicar no CTA, e numa
  // landing de página única não existe URL para marcá-la: só o momento em que a
  // seção entra na tela. Dispara uma vez por visita; rolar de volta não conta
  // de novo.
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (!visible || pricingViewed.current) return;

        pricingViewed.current = true;
        pushDataLayer({
          event: "view_pricing",
          billing: isAnnual ? "anual" : "mensal",
        });
        observer.disconnect();
      },
      // Metade da seção à vista: passar raspando ao rolar rápido não é ter
      // olhado o preço.
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
    // `isAnnual` fora das deps de propósito: o evento sai uma vez, com a
    // periodicidade que estava marcada na hora. Reagir à troca remontaria o
    // observador sem necessidade.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="planos"
      ref={sectionRef}
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Planos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Escolha o plano{" "}
            <span className="text-gradient">ideal para você</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comece pelo Essencial e destrave a loja online e as entregas quando
            quiser vender mais. Sem fidelidade, cancele quando quiser.
          </p>

          {/* Toggle Mensal / Anual */}
          <div className="mt-8 inline-flex items-center rounded-full bg-accent p-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                !isAnnual
                  ? "bg-background text-foreground shadow-medium"
                  : "text-muted-foreground"
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                isAnnual
                  ? "bg-background text-foreground shadow-medium"
                  : "text-muted-foreground"
              }`}
            >
              Anual
              <span className="ml-2 rounded-full bg-gradient-to-r from-primary to-secondary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                2 meses grátis
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              variant="pricing"
              className={`relative ${
                plan.highlight ? "border-primary shadow-glow lg:scale-105" : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium rounded-full shadow-medium">
                  {plan.badge}
                </div>
              )}

              <CardHeader className="text-center pb-0">
                <CardTitle className="text-2xl mb-2 flex items-center justify-center gap-2">
                  {plan.highlight ? (
                    <Sparkles className="w-5 h-5 text-primary" />
                  ) : null}
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="text-center mb-8">
                  <span className="text-sm text-muted-foreground">R$ </span>
                  <span className="text-5xl font-heading font-bold text-foreground">
                    {isAnnual ? annualPrice(plan.monthlyPrice) : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    {isAnnual ? "/ano" : "/mês"}
                  </span>
                  {isAnnual ? (
                    <p className="text-xs text-primary font-medium mt-2">
                      12 meses pelo preço de 10 — economia de R${" "}
                      {plan.monthlyPrice * 2}
                    </p>
                  ) : (
                    plan.priceNote && (
                      <p className="text-xs text-primary font-medium mt-2">
                        {plan.priceNote}
                      </p>
                    )
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => {
                    const FeatureIcon = featureIcons[feature] ?? Check;
                    const isHighlighted = feature in featureIcons;
                    return (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FeatureIcon className="w-3 h-3 text-primary" />
                        </div>
                        <span
                          className={`text-muted-foreground ${
                            isHighlighted ? "font-semibold text-foreground" : ""
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {plan.footnote && (
                  <p className="mt-6 text-[11px] leading-snug text-muted-foreground">
                    {plan.footnote}
                  </p>
                )}
              </CardContent>

              <CardFooter className="pt-4">
                <StartTrialButton
                  variant={plan.highlight ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                  source="planos"
                  plan={plan.slug}
                  billing={isAnnual ? "anual" : "mensal"}
                >
                  Começar teste grátis
                </StartTrialButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
