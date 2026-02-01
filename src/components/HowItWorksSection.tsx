import { ClipboardList, Zap, Truck, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Cadastre seus Clientes e Preços",
    description:
      "Cadastre clientes, valores do galão, fiado e formas de pagamento em poucos minutos.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Registre as Vendas do Dia",
    description:
      "Anote cada venda pelo celular ou computador, com Pix, dinheiro ou fiado, sem bagunça.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Controle as Entregas e Galões",
    description:
      "Saiba quem entregou, quantos galões saíram, voltaram vazios e ficaram com o cliente.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Feche o Caixa e Veja o Lucro",
    description:
      "Fechamento diário automático com lucro real, despesas e resultado do dia.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-24 bg-muted/50 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Simples e Rápido
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Como funciona o <span className="text-gradient">H2O Gestão</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Em poucos passos você organiza toda a operação da sua distribuidora
            e começa a economizar tempo e dinheiro.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}

              <div className="relative z-10">
                {/* Number Badge */}
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-medium">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>

                <span className="text-5xl font-heading font-bold text-muted-foreground/20 absolute top-0 right-0">
                  {step.number}
                </span>

                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
