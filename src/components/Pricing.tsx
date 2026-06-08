import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingHighlight = () => {
  const handleContract = () => {
    window.open("https://app.h2ogestao.com.br/register", "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
      <div className="bg-card border rounded-3xl shadow-xl p-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">
              Plano Único e Simples
            </span>

            <h3 className="text-3xl font-bold mt-4">
              Tudo que você precisa
              <br />
              por apenas
            </h3>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-3xl font-bold text-primary">R$</span>
              <span className="text-6xl font-bold text-primary">29</span>
              <span className="text-3xl font-bold text-primary">,00</span>
              <span className="text-muted-foreground mb-2">/mês</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              "Acesso completo a todas as funcionalidades",
              "Atualizações constantes e melhorias",
              "Suporte dedicado",
              "Sem taxa de adesão ou fidelidade",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button size="lg" className="w-full" onClick={handleContract}>
              Quero contratar
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Cancele quando quiser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingHighlight;
