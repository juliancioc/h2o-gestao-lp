import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StartTrialButton } from "@/components/analytics/StartTrialButton";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Loja Online", href: "#loja-online" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Planos", href: "#planos" },
    { label: "Ferramentas", to: "/ferramentas" },
    // Secundários: só cabem na barra a partir de 1280px, mas seguem no menu
    // do celular.
    { label: "Depoimentos", href: "#depoimentos", secondary: true },
    { label: "FAQ", href: "#faq", secondary: true },
  ];

  const handleSignIn = () => {
    window.open(
      "https://app.h2ogestao.com.br/login",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-6 h-16 md:h-20">
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const className = cn(
                "text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap",
                link.secondary && "hidden xl:inline-block",
              );
              return link.to ? (
                <Link key={link.label} to={link.to} className={className}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className={className}>
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Button variant="ghost" size="sm" onClick={handleSignIn}>
              Entrar
            </Button>
            <StartTrialButton variant="default" size="sm" source="navbar">
              Testar grátis
            </StartTrialButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ),
              )}
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={handleSignIn}
                >
                  Entrar
                </Button>
                <StartTrialButton
                  variant="default"
                  className="w-full"
                  source="navbar_mobile"
                >
                  Testar grátis
                </StartTrialButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
