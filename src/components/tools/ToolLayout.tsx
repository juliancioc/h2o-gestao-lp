import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { StartTrialButton } from "@/components/analytics/StartTrialButton";

interface ToolLayoutProps {
  badge: string;
  title: ReactNode;
  subtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  /** Texto do botão do convite. */
  ctaLabel?: string;
  /** `source` do click_start_trial. Padrão: o caminho da página. */
  ctaSource?: string;
  /** Para onde volta o link do cabeçalho. Padrão: a lista de ferramentas. */
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
}

/**
 * Casca das ferramentas gratuitas da LP: cabeçalho enxuto, título, conteúdo
 * e o convite para o sistema. Cada calculadora nova só preenche as props.
 */
const ToolLayout = ({
  badge,
  title,
  subtitle,
  ctaTitle,
  ctaDescription,
  ctaLabel = "Começar agora",
  ctaSource,
  backTo = "/ferramentas",
  backLabel = "Todas as ferramentas",
  children,
}: ToolLayoutProps) => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-8 md:pt-16 md:pb-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl -z-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                {badge}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>
        </section>

        {children}

        <section className="py-20 bg-gradient-to-br from-primary via-water-deep to-secondary relative overflow-hidden mt-16">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-water-light/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
                {ctaTitle}
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                {ctaDescription}
              </p>
              {/* Link de verdade, e não window.open: é o que deixa o GA4
                  levar a sessão para o app.h2ogestao.com.br. */}
              <StartTrialButton
                variant="heroOutline"
                size="lg"
                className="w-full sm:w-auto"
                source={ctaSource ?? pathname}
              >
                {ctaLabel} <ArrowRight className="ml-2" />
              </StartTrialButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ToolLayout;
