import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-water-deep to-secondary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-water-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      
      {/* Ripple Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[200px] h-[200px] rounded-full border border-primary-foreground/10 animate-ripple" />
        <div className="w-[200px] h-[200px] rounded-full border border-primary-foreground/10 animate-ripple" style={{ animationDelay: '1s' }} />
        <div className="w-[200px] h-[200px] rounded-full border border-primary-foreground/10 animate-ripple" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            Pronto para transformar sua distribuidora?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Comece gratuitamente e veja como o H2O Gestão pode aumentar sua 
            eficiência e reduzir custos operacionais.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Começar Teste Grátis
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Agendar Demonstração
            </Button>
          </div>
          
          <p className="text-sm text-primary-foreground/60 mt-6">
            Não precisa de cartão de crédito · Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
