import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const handleOpenWhatsApp = () => {
    const whatsappUrl =
      "https://wa.me/5574999215010?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20H2O%20Gest%C3%A3o.";
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Água fluindo com elementos digitais"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-water-deep/90 via-primary/80 to-background" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-water-light/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-up">
            <span className="w-2 h-2 bg-water-light rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">
              Gestão completa para sua distribuidora
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 animate-fade-up leading-tight">
            O ERP completo para{" "}
            <span className="relative">
              <span className="relative z-10">Distribuidoras de Água</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-water-light/30 -z-0 rounded" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up-delayed leading-relaxed">
            Gerencie pedidos, estoque e financeiro em uma única plataforma.
            Simplifique sua operação e ofereça aos seus clientes uma experiência
            única.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delayed">
            <Button variant="hero" size="xl" onClick={handleOpenWhatsApp}>
              Começar Gratuitamente
              <ArrowRight className="w-5 h-5" />
            </Button>
            {/* <Button variant="heroOutline" size="xl">
              <Play className="w-5 h-5" />
              Ver Demonstração
            </Button> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
                500+
              </div>
              <div className="text-sm text-primary-foreground/70">
                Distribuidoras
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
                2M+
              </div>
              <div className="text-sm text-primary-foreground/70">
                Pedidos/mês
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
                99.9%
              </div>
              <div className="text-sm text-primary-foreground/70">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
