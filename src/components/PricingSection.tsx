import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const plans = [
  {
    name: "Essencial",
    description: "Perfeito para pequenas distribuidoras",
    price: "297",
    popular: false,
    features: [
      "Até 500 pedidos/mês",
      "3 usuários inclusos",
      "App para entregadores",
      "Gestão de clientes",
      "Relatórios básicos",
      "Suporte por email",
    ],
  },
  {
    name: "Profissional",
    description: "Ideal para distribuidoras em crescimento",
    price: "597",
    popular: true,
    features: [
      "Pedidos ilimitados",
      "10 usuários inclusos",
      "App para entregadores",
      "Roteirização inteligente",
      "Integração WhatsApp",
      "Relatórios avançados",
      "API de integração",
      "Suporte prioritário",
    ],
  },
  {
    name: "Enterprise",
    description: "Para grandes operações",
    price: "997",
    popular: false,
    features: [
      "Tudo do plano Profissional",
      "Usuários ilimitados",
      "Múltiplas filiais",
      "Integrações customizadas",
      "Gerente de conta dedicado",
      "SLA garantido",
      "Treinamento incluso",
      "Suporte 24/7",
    ],
  },
];

const PricingSection = () => {
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
            Planos flexíveis que crescem junto com o seu negócio. 
            Comece pequeno e escale quando precisar.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              variant="pricing"
              className={`relative ${plan.popular ? 'border-primary shadow-glow scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium rounded-full shadow-medium">
                  Mais Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-0">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="text-center mb-8">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="text-5xl font-heading font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  size="lg" 
                  className="w-full"
                >
                  Começar Agora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
