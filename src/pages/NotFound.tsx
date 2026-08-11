import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16 text-center">
      <Link to="/" className="mb-10">
        <Logo />
      </Link>

      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">
        Erro 404
      </p>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
        Essa página não existe
      </h1>
      <p className="max-w-md text-muted-foreground leading-relaxed mb-8">
        O endereço pode ter mudado de lugar ou ter vindo com um erro de
        digitação. Nada se perdeu, é só voltar por aqui.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:w-auto">
        <Button asChild variant="hero" size="lg">
          <Link to="/">Ir para o site</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/ferramentas">Ver as ferramentas gratuitas</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
