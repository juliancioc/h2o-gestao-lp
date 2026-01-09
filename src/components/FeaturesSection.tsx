import { 
  Truck, 
  Package, 
  CreditCard, 
  Users, 
  BarChart3, 
  MapPin, 
  Bell, 
  Smartphone 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Package,
    title: "Gestão de Pedidos",
    description: "Receba pedidos por WhatsApp, app ou site. Acompanhe em tempo real do recebimento à entrega.",
  },
  {
    icon: Truck,
    title: "Roteirização Inteligente",
    description: "Otimize rotas de entrega automaticamente. Reduza custos com combustível e tempo.",
  },
  {
    icon: CreditCard,
    title: "Financeiro Completo",
    description: "Controle contas a pagar e receber, fluxo de caixa, cobranças e relatórios detalhados.",
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "Cadastro completo, histórico de compras, crédito e relacionamento com o cliente.",
  },
  {
    icon: BarChart3,
    title: "Relatórios e Dashboards",
    description: "Visualize métricas importantes em tempo real. Tome decisões baseadas em dados.",
  },
  {
    icon: MapPin,
    title: "Rastreamento GPS",
    description: "Acompanhe seus entregadores em tempo real. Ofereça transparência aos clientes.",
  },
  {
    icon: Bell,
    title: "Notificações Automáticas",
    description: "Avise clientes sobre status do pedido via SMS, WhatsApp ou push notification.",
  },
  {
    icon: Smartphone,
    title: "App para Entregadores",
    description: "Aplicativo mobile completo para sua equipe de entrega gerenciar pedidos.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Tudo que você precisa para{" "}
            <span className="text-gradient">gerenciar sua distribuidora</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Uma plataforma completa com todas as ferramentas necessárias para 
            automatizar e escalar seu negócio de distribuição de água.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="feature"
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
