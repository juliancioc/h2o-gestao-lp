import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Planos", href: "#planos" },
    { label: "Depoimentos", href: "#depoimentos" },
  ];

  const handleSignIn = () => {
    window.open("https://app.h2ogestao.com.br/login", "_blank", "noopener,noreferrer");
  }

  const handleSendEmail = () => {
    window.location.href = "mailto:contato@h2ogestao.com.br"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleSignIn}>
              Entrar
            </Button>
            <Button variant="default" size="sm" onClick={handleSendEmail}>
              Começar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" className="w-full" onClick={handleSignIn}>
                  Entrar
                </Button>
                <Button variant="default" className="w-full">
                  Começar Agora
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
