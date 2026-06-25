import { Check, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const handleContract = () => {
  window.open("https://app.h2ogestao.com.br/register", "_blank");
};

const basicFeatures = [
  "Gestão de Pedidos",
  "Financeiro Completo",
  "Gestão de Clientes",
  "Relatórios e Dashboards",
  "Controle de Galões",
  "Fechamento de Caixa Diário",
  "Gestão de Fiado",
  "Análise de Lucro por Galão",
];

const premiumFeatures = [
  "Tudo do plano Básico",
  "Emissão de nota fiscal",
  "Suporte prioritário",
];

const plans = [
  {
    name: "Básico",
    description: "Tudo que você precisa para gerir sua distribuidora",
    price: "29",
    popular: false,
    features: basicFeatures,
    highlight: false,
  },
  {
    name: "Premium",
    description: "O Básico completo + emissão de nota fiscal",
    price: "59",
    popular: true,
    features: premiumFeatures,
    highlight: true,
  },
];

const PlansSection = () => {
  return (
    <section id="planos" className="py-24 bg-background relative overflow-hidden">
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
            Comece com o essencial e evolua para a emissão de nota fiscal quando
            precisar. Sem fidelidade, cancele quando quiser.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              variant="pricing"
              className={`relative ${
                plan.highlight ? "border-primary shadow-glow md:scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium rounded-full shadow-medium">
                  Mais Completo
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
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => {
                    const isNota = feature === "Emissão de nota fiscal";
                    return (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          {isNota ? (
                            <FileText className="w-3 h-3 text-primary" />
                          ) : (
                            <Check className="w-3 h-3 text-primary" />
                          )}
                        </div>
                        <span
                          className={`text-muted-foreground ${
                            isNota ? "font-semibold text-foreground" : ""
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  variant={plan.highlight ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                  onClick={handleContract}
                >
                  Quero contratar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
