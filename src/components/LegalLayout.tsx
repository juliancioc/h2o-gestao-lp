import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

interface LegalLayoutProps {
  title: string;
  updatedAt: string;
  children: ReactNode;
}

const LegalLayout = ({ title, updatedAt, children }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <article className="container mx-auto px-4 max-w-3xl py-16">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Última atualização: {updatedAt}
          </p>
          <div className="prose-legal space-y-6 text-foreground/80 leading-relaxed [&_h2]:text-xl [&_h2]:font-heading [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-primary [&_a]:underline">
            {children}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;
