import { Smartphone, Route, PackageCheck, MapPin, LineChart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartTrialButton } from "@/components/analytics/StartTrialButton";
import { DownloadAppLink } from "@/components/analytics/DownloadAppLink";
import { APP_PLATFORM_NOTE } from "@/lib/app";
import { trialCopy } from "@/lib/trial";
import appEntregador from "@/assets/app-entregador.png";

const benefits = [
  {
    icon: Route,
    title: "A fila do dia na ordem da rua",
    description:
      "Cada parada com o que vai ser entregue e quanto o cliente tem a pagar. O entregador monta a viagem com o que coube na moto.",
  },
  {
    icon: MapPin,
    title: "Endereço, telefone e recado do cliente",
    description:
      "Um toque abre o mapa ou liga. A observação (portão azul, chamar no interfone) vai junto na tela.",
  },
  {
    icon: PackageCheck,
    title: "Baixa na entrega, na hora",
    description:
      "Entregou, marcou no aparelho: a entrega fecha e o vasilhame que voltou já fica registrado, sem papel no fim do dia.",
  },
  {
    icon: LineChart,
    title: "O dono acompanha pelo mesmo app",
    description:
      "Quem é dono entra e vê o resumo do dia (vendas, entregas e fiado) sem precisar abrir o computador.",
  },
];

/**
 * O aplicativo na landing page.
 *
 * Cuidado de posicionamento: o app não é para o consumidor final (esse pede
 * pela loja online, no navegador, sem instalar nada), é para a equipe da
 * distribuidora. Por isso o botão de baixar é secundário e o CTA principal
 * continua sendo criar a conta: quem baixa sem conta cai numa tela de login
 * que não tem como passar. O link direto da loja serve mais ao cliente que já
 * assina e precisa instalar no celular do entregador.
 */
const AppSection = () => {
  return (
    <section id="aplicativo" className="py-24 bg-muted/50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/*
            Mockup à esquerda no desktop (a StoreSection põe à direita, e as
            duas seguidas na mesma posição ficariam repetitivas), mas depois da
            copy no celular: numa coluna só, a foto antes do título deixa o
            visitante olhando uma tela de app sem saber do que se trata.
          */}
          <div className="flex justify-center lg:justify-start order-last lg:order-first">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl scale-90" />

              <div className="relative w-[300px] sm:w-[330px] rounded-[2.5rem] border-8 border-foreground/90 bg-white shadow-2xl overflow-hidden">
                <img
                  src={appEntregador}
                  alt="Aplicativo H2O Gestão no celular do entregador, com as entregas do dia e a próxima parada em destaque"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating delivery confirmation badge */}
              <div className="absolute -right-6 sm:-right-12 bottom-16 bg-card border border-border rounded-2xl shadow-medium px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-heading font-semibold text-foreground">
                    Entrega concluída
                  </div>
                  <div className="text-xs text-muted-foreground">
                    você vê no painel na hora
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-semibold mb-4 shadow-medium">
              <Smartphone className="w-4 h-4" />
              Aplicativo
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              A rota do dia no{" "}
              <span className="text-gradient">celular do entregador</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              O que sai do seu painel chega no aparelho de quem está na rua. O
              entregador vê a fila, entrega e dá baixa na hora, e você
              acompanha do balcão sem ficar ligando para perguntar.
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
              <StartTrialButton size="lg" source="secao_app">
                {trialCopy.finalCta}
              </StartTrialButton>
              <Button variant="outline" size="lg" asChild>
                <DownloadAppLink source="secao_app">
                  <Smartphone className="w-5 h-5" />
                  Baixar o app
                </DownloadAppLink>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              {APP_PLATFORM_NOTE} Para entrar no app é preciso ter uma conta H2O
              Gestão. As entregas no aplicativo entram a partir do plano
              Operação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
