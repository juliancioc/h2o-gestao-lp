import { Check, ShieldCheck, Lock, DatabaseBackup } from "lucide-react";
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

            <div className="flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/80 text-left">
                <span className="font-semibold text-foreground">
                  Garantia de 7 dias.
                </span>{" "}
                Se não gostar, devolvemos 100% do seu dinheiro.
              </p>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Sem fidelidade · Cancele quando quiser
            </p>
          </div>
        </div>

        {/* Security / Trust Band */}
        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span>Dados criptografados</span>
          </div>
          <div className="flex items-center gap-2">
            <DatabaseBackup className="w-4 h-4 text-primary" />
            <span>Backup diário automático</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>100% em conformidade com a LGPD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingHighlight;
