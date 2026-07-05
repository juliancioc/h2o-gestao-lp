import {
  Store,
  Link2,
  ShoppingCart,
  BadgePercent,
  UserCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import storeDemo from "@/assets/exemplo-loja-demo.png";

const benefits = [
  {
    icon: Link2,
    title: "Link exclusivo da sua distribuidora",
    description:
      "Compartilhe no WhatsApp, Instagram e onde quiser. O cliente acessa e pede na hora, sem instalar nada.",
  },
  {
    icon: ShoppingCart,
    title: "Pedidos caem direto no sistema",
    description:
      "O pedido feito na loja já entra na sua gestão: venda, entrega e caixa, sem digitar nada de novo.",
  },
  {
    icon: BadgePercent,
    title: "Promoções em destaque",
    description:
      "Crie ofertas da semana, taxa de entrega e frete grátis acima de um valor — tudo configurável.",
  },
  {
    icon: UserCheck,
    title: "Reconhece o cliente pelo telefone",
    description:
      "Cliente que já comprou é identificado pelo número e não precisa preencher endereço de novo.",
  },
];

const StoreSection = () => {
  return (
    <section id="loja-online" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-semibold mb-4 shadow-medium">
              <Store className="w-4 h-4" />
              Novidade
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Sua distribuidora com{" "}
              <span className="text-gradient">loja online própria</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Uma vitrine digital com a sua marca, seus produtos e seus preços.
              O cliente escolhe, monta o carrinho e finaliza o pedido em
              segundos — e você recebe tudo organizado no H2O Gestão.
            </p>

            <div className="space-y-6 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-medium">
                    <benefit.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() =>
                  window.open(
                    "https://app.h2ogestao.com.br/register",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Quero minha loja online
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open(
                    "https://app.h2ogestao.com.br/loja/blue-distribuidora",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <Store className="w-5 h-5" />
                Ver loja de demonstração
              </Button>
            </div>
          </div>

          {/* Phone mockup of the storefront */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl scale-90" />

              <div className="relative w-[300px] sm:w-[330px] rounded-[2.5rem] border-8 border-foreground/90 bg-white shadow-2xl overflow-hidden">
                <img
                  src={storeDemo}
                  alt="Loja online da Blue Distribuidora no celular, com promoções da semana e lista de produtos"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating order confirmation badge */}
              <div className="absolute -left-6 sm:-left-12 bottom-16 bg-card border border-border rounded-2xl shadow-medium px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-heading font-semibold text-foreground">
                    Pedido #128 recebido
                  </div>
                  <div className="text-xs text-muted-foreground">
                    caiu direto no seu painel
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
