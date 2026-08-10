import { Calculator, ExternalLink, Globe, Store } from "lucide-react";
import logo from "@/assets/logo.png";

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
    <path d="M16.01 3C8.82 3 3 8.82 3 16.01c0 2.53.74 5 2.13 7.11L3 29l6.06-2.08a13 13 0 0 0 6.95 2.01H16c7.19 0 13.01-5.82 13.01-13.01S23.2 3 16.01 3zm0 23.7a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-3.6 1.24 1.17-3.51-.25-.41a10.72 10.72 0 1 1 8.52 4.4zm5.88-8.02c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.36.24-.68.08-.32-.16-1.33-.49-2.53-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.32-.02-.49.14-.65.14-.14.32-.36.48-.54.16-.18.21-.32.32-.54.11-.21.05-.41-.03-.57-.08-.16-.71-1.72-.98-2.35-.26-.63-.52-.54-.71-.55h-.61c-.21 0-.54.08-.82.38-.28.3-1.08 1.06-1.08 2.58s1.11 2.99 1.26 3.2c.16.21 2.18 3.33 5.28 4.67.74.32 1.32.51 1.77.65.74.24 1.41.21 1.94.13.59-.09 1.89-.77 2.16-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.38z" />
  </svg>
);

const links = [
  {
    id: "whatsapp",
    label: "Falar pelo WhatsApp",
    description: "Tire suas dúvidas conosco",
    href: "https://wa.me/5574981132047",
    icon: <WhatsAppIcon />,
    variant: "whatsapp",
  },
  {
    id: "ferramentas",
    label: "Ferramentas gratuitas",
    description: "Calculadoras para a sua distribuidora, sem cadastro",
    href: "https://h2ogestao.com.br/ferramentas",
    icon: <Calculator className="w-5 h-5" />,
    variant: "primary",
  },
  {
    id: "demo-store",
    label: "Ver Loja Online de Demonstração",
    description: "Conheça a loja online que sua distribuidora pode ter",
    href: "https://app.h2ogestao.com.br/loja/blue-distribuidora",
    icon: <Store className="w-5 h-5" />,
    variant: "primary",
  },
  {
    id: "website",
    label: "Acessar o Site",
    description: "Conheça tudo sobre o H2O Gestão",
    href: "https://h2ogestao.com.br",
    icon: <Globe className="w-5 h-5" />,
    variant: "primary",
  },
  {
    id: "platform",
    label: "Acessar a Plataforma",
    description: "Entre no sistema H2O Gestão",
    href: "https://app.h2ogestao.com.br",
    icon: <ExternalLink className="w-5 h-5" />,
    variant: "primary",
  },
];

export default function Instagram() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, hsl(205 85% 18%) 0%, hsl(200 80% 28%) 50%, hsl(195 90% 35%) 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, hsl(195 100% 85%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, hsl(195 100% 85%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, hsl(195 90% 65%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        {/* Logo & Brand */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg"
            style={{
              border: "1px solid hsl(0 0% 100% / 0.25)",
            }}
          >
            <img src={logo} alt="H2O Gestão" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              H2O Gestão
            </h1>
            <p className="text-sm mt-1" style={{ color: "hsl(195 100% 85%)" }}>
              Sistema para distribuidoras de água
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="w-full flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 w-full rounded-2xl px-5 py-4 transition-all duration-200 active:scale-95"
              style={
                link.variant === "whatsapp"
                  ? {
                      background: "hsl(142 70% 45%)",
                      boxShadow: "0 4px 24px hsl(142 70% 45% / 0.4)",
                    }
                  : {
                      background: "hsl(0 0% 100% / 0.12)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid hsl(0 0% 100% / 0.2)",
                    }
              }
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 text-white"
                style={
                  link.variant === "whatsapp"
                    ? { background: "hsl(0 0% 100% / 0.2)" }
                    : { background: "hsl(205 85% 45%)" }
                }
              >
                {link.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">
                  {link.label}
                </p>
                <p
                  className="text-xs mt-0.5 truncate"
                  style={{ color: "hsl(0 0% 100% / 0.65)" }}
                >
                  {link.description}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-40 text-white group-hover:opacity-70 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full flex items-center gap-3">
          <div
            className="flex-1 h-px"
            style={{ background: "hsl(0 0% 100% / 0.12)" }}
          />
          <span className="text-xs" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
            nossa plataforma
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "hsl(0 0% 100% / 0.12)" }}
          />
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Loja online",
            "Emissão de nota fiscal",
            "Dashboard em tempo real",
            "Controle de vendas",
            "Gestão de clientes",
            "Controle de estoque",
            "Despesas",
            "Compras",
            "Fornecedores",
            "Controle de vasilhames",
            "Meta de vendas",
            "Relatórios por período",
          ].map((feat) => (
            <span
              key={feat}
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{
                background: "hsl(0 0% 100% / 0.08)",
                color: "hsl(195 100% 85%)",
                border: "1px solid hsl(0 0% 100% / 0.12)",
              }}
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Footer */}
        <p
          className="text-xs text-center"
          style={{ color: "hsl(0 0% 100% / 0.3)" }}
        >
          © {new Date().getFullYear()} H2O Gestão · Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
