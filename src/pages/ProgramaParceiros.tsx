import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  CheckCircle2,
  FileText,
  GraduationCap,
  Handshake,
  Link2,
  MessageCircle,
  MonitorPlay,
  Repeat,
  Users,
  UserCheck,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { company } from "@/lib/company";

// TODO: confirmar número. Hoje reaproveita o WhatsApp geral do H2O Gestão
// (company.whatsappLink); trocar aqui se o programa tiver número próprio.
const WHATSAPP_MESSAGE =
  "Olá! Tenho interesse no Programa de Parceiros do H2O Gestão.";
const whatsappLink = `${company.whatsappLink}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Conversa inicial",
    description:
      "Entendemos seu perfil e sua rede de contatos para ver se o programa faz sentido para você.",
  },
  {
    number: "02",
    icon: GraduationCap,
    title: "Treinamento",
    description:
      "Dois encontros de 1 hora: um sobre o produto e outro sobre como conduzir a venda.",
  },
  {
    number: "03",
    icon: MonitorPlay,
    title: "Você apresenta",
    description:
      "Com acesso à conta de demonstração e material pronto para mostrar o sistema funcionando.",
  },
  {
    number: "04",
    icon: Repeat,
    title: "Comissão recorrente",
    description:
      "Você recebe todo mês enquanto o cliente que você trouxe estiver ativo.",
  },
];

const profiles = [
  {
    icon: Calculator,
    title: "Contadores",
    description:
      "Profissionais que já atendem distribuidoras de água e gás na contabilidade.",
  },
  {
    icon: Handshake,
    title: "Representantes comerciais",
    description:
      "Quem já vende para marcas e distribuidoras e conhece a rotina do setor.",
  },
  {
    icon: Wrench,
    title: "Técnicos de campo",
    description:
      "Quem atende revendas e depósitos no dia a dia e tem acesso aos donos.",
  },
  {
    icon: Users,
    title: "Rede de contatos no setor",
    description:
      "Profissionais com relacionamento construído dentro do mercado de água e gás.",
  },
];

const benefits = [
  {
    icon: MonitorPlay,
    title: "Conta de demonstração",
    description:
      "Um ambiente completo do sistema para você mostrar cada funcionalidade ao vivo.",
  },
  {
    icon: FileText,
    title: "Material de apresentação",
    description:
      "Apresentação pronta e vídeos do produto para enviar antes ou depois da reunião.",
  },
  {
    icon: MessageCircle,
    title: "Scripts de abordagem",
    description:
      "Roteiros de primeiro contato e respostas para as objeções mais comuns.",
  },
  {
    icon: Link2,
    title: "Link exclusivo de indicação",
    description:
      "Seu link próprio para rastrear os contatos que você trouxe até o sistema.",
  },
  {
    icon: UserCheck,
    title: "Acompanhamento com o fundador",
    description:
      "Contato direto para tirar dúvidas, treinar a venda e apoiar suas negociações.",
  },
];

const productHighlights = [
  "Controle de vasilhames e cascos",
  "Fiado e cobranças",
  "Fechamento de caixa",
  "Loja online própria",
  "Aplicativo do entregador",
];

const faqs = [
  {
    question: "Preciso ter experiência com vendas de software?",
    answer:
      "Não. O que mais pesa é conhecer o dia a dia das distribuidoras e ter relacionamento com os donos. A parte técnica do produto e o roteiro da venda são cobertos no treinamento, e você conta com acompanhamento direto nas primeiras conversas.",
  },
  {
    question: "Como a comissão é calculada e paga?",
    answer:
      "É um percentual recorrente sobre a mensalidade dos clientes ativos que você trouxe, ou seja, você recebe enquanto o cliente continuar usando o sistema. Os detalhes são apresentados na conversa inicial, para que fiquem claros antes de você começar.",
  },
  {
    question: "Preciso ter CNPJ?",
    answer:
      "Sim. É necessário ter MEI ou CNPJ ativo para participar do programa, porque a comissão é paga contra nota fiscal de serviço.",
  },
  {
    question: "Existe exclusividade por região?",
    answer:
      "Trabalhamos com um número limitado de parceiros por região para que ninguém dispute o mesmo cliente. Como isso depende de quantos parceiros já atuam na sua área, tratamos esse ponto na conversa inicial.",
  },
];

const ProgramaParceiros = () => {
  // Página de acesso por link direto: nunca deve ser indexada.
  // O header X-Robots-Tag está no vercel.json; aqui garantimos a meta tag,
  // sobrescrevendo a robots padrão do index.html enquanto a rota está ativa.
  useEffect(() => {
    const existing = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    const previousContent = existing?.content ?? null;
    const meta = existing ?? document.createElement("meta");

    if (!existing) {
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";

    const previousTitle = document.title;
    document.title = "Programa de Parceiros | H2O Gestão";

    return () => {
      if (previousContent === null) {
        meta.remove();
      } else {
        meta.content = previousContent;
      }
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-24 bg-background relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                <Handshake className="w-4 h-4" />
                Programa de Parceiros
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                Programa de Parceiros{" "}
                <span className="text-gradient">H2O Gestão</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Indique e venda um sistema de gestão feito exclusivamente para
                distribuidoras de água e gás, com comissão recorrente enquanto o
                cliente estiver ativo.
              </p>

              <Button variant="hero" size="xl" className="w-full sm:w-auto" asChild>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero ser parceiro
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-20 md:py-24 bg-muted/50 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                Passo a passo
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Como funciona
              </h2>
              <p className="text-lg text-muted-foreground">
                Do primeiro contato até a comissão caindo todo mês, sem
                burocracia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative group">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                  )}

                  <div className="relative z-10 text-center md:text-left">
                    {/* Número junto do próprio ícone: no grid de 4 colunas, no
                        canto direito ele encostava no passo seguinte */}
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-medium">
                        <step.icon className="w-9 h-9 md:w-10 md:h-10 text-primary-foreground" />
                      </div>

                      <span className="hidden md:block text-5xl leading-none font-heading font-bold text-muted-foreground/20">
                        {step.number}
                      </span>
                    </div>

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

        {/* Para quem é */}
        <section className="py-20 md:py-24 bg-background relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                Perfil ideal
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Para quem é o programa
              </h2>
              <p className="text-lg text-muted-foreground">
                O programa funciona melhor para quem já convive com o mercado de
                água e gás.
              </p>
            </div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
              {profiles.map((profile) => (
                <div key={profile.title} className="flex gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-medium">
                    <profile.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {profile.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {profile.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-10">
              <Card variant="glass">
                <CardContent className="p-6 flex gap-3 items-start">
                  <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Para participar do programa é necessário ter MEI ou CNPJ
                    ativo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* O que você recebe */}
        <section className="py-20 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                Apoio ao parceiro
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                O que você{" "}
                <span className="text-gradient">recebe</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Você não vende sozinho. Todo o material e o acompanhamento fazem
                parte do programa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} variant="feature" className="group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre o produto */}
        <section className="py-20 md:py-24 bg-background relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                Sobre o produto
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Um sistema feito só para{" "}
                <span className="text-gradient">água e gás</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                O H2O Gestão não é um sistema genérico adaptado. Ele foi
                construído para a rotina de distribuidoras de água e gás, com
                controle de vasilhames e cascos, fiado, fechamento de caixa,
                loja online própria e aplicativo para o entregador. Hoje já é
                usado por distribuidoras em várias regiões do Brasil.
              </p>

              <ul className="flex flex-wrap justify-center gap-2">
                {productHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                Perguntas Frequentes
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Dúvidas sobre a{" "}
                <span className="text-gradient">parceria</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible defaultValue="item-0">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-heading">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-primary via-water-deep to-secondary relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-water-light/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6">
                Vamos conversar sobre a parceria
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed">
                Manda uma mensagem no WhatsApp e a gente te explica como
                funciona, sem compromisso.
              </p>

              <Button
                variant="heroOutline"
                size="xl"
                className="w-full sm:w-auto"
                asChild
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Quero ser parceiro
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramaParceiros;
