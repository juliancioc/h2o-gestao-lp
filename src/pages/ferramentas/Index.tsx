import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import ToolLayout from "@/components/tools/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { company } from "@/lib/company";
import { availableTools, tools, upcomingTools } from "@/lib/tools";

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ferramentas gratuitas para distribuidoras de água",
  itemListElement: availableTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.title,
    url: `https://h2ogestao.com.br${tool.path}`,
  })),
};

/**
 * Enquanto existe uma ferramenta só, ela ocupa a largura toda em vez de ficar
 * sozinha numa grade de três colunas. A partir da segunda, a grade assume.
 */
const isFeatured = availableTools.length === 1;

const FerramentasIndex = () => {
  return (
    <>
      <Seo path="/ferramentas" jsonLd={itemListJsonLd} />

      <ToolLayout
        badge="Ferramentas gratuitas"
        title={
          <>
            Ferramentas para a sua{" "}
            <span className="text-gradient">distribuidora</span>
          </>
        }
        subtitle="Calculadoras feitas para as contas que todo dono de distribuidora precisa fazer e quase nunca sobra tempo. São gratuitas, funcionam no celular e não pedem cadastro."
        ctaTitle="As contas prontas, todo dia"
        ctaDescription="O que essas calculadoras fazem uma vez, o H2O Gestão faz sozinho em cada venda, com estoque, fiado, entregas e fechamento de caixa no mesmo lugar."
        backTo="/"
        backLabel="Voltar ao site"
      >
        <section className="container mx-auto px-4">
          <div
            className={
              isFeatured
                ? "space-y-6"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            }
          >
            {availableTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Card variant="feature" className="h-full border-primary/30">
                  {isFeatured ? (
                    <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <tool.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-2">
                          {tool.title}
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary shrink-0">
                        Abrir calculadora
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  ) : (
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <tool.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
                        {tool.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {tool.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                        Abrir calculadora
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>

          {upcomingTools.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                Em breve
              </h2>
              <p className="text-muted-foreground mb-8">
                As próximas da fila. Se alguma resolve um problema seu agora, dá
                um toque que a gente adianta.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingTools.map((tool) => (
                  <Card
                    key={tool.path}
                    className="h-full border-dashed bg-card/50 shadow-none"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                          <tool.icon className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                          Em breve
                        </span>
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-muted-foreground mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Por que essas ferramentas existem
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Quem toca uma distribuidora passa o dia resolvendo entrega, cliente
              e caixa, e as contas de margem acabam ficando na cabeça ou num
              caderno. O problema é que quase todas elas têm alguma pegadinha:
              um frete que ninguém rateia, uma bonificação que ninguém desconta,
              um vasilhame que sai e não volta.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Cada calculadora aqui resolve uma dessas contas por inteiro,
              mostrando não só o resultado, mas de onde saiu cada centavo. Todas
              são gratuitas, abrem direto e não pedem e-mail nem cadastro.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Falta alguma que você faria toda semana?{" "}
              <a
                href={company.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium underline underline-offset-4"
              >
                Manda no WhatsApp
              </a>{" "}
              que entra na fila. {tools.length} ferramentas já estão mapeadas.
            </p>
          </div>
        </section>
      </ToolLayout>
    </>
  );
};

export default FerramentasIndex;
