import {
  Calculator,
  CreditCard,
  Package,
  Percent,
  Rocket,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import toolsData from "./tools.json";

export interface Tool {
  /** Caminho da rota. Também é o que entra no sitemap. */
  path: string;
  /** Nome completo, usado no card da listagem. */
  title: string;
  /** Nome curto, usado no rodapé. */
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  /** Ferramenta ainda não publicada aparece como "em breve", sem link. */
  available: boolean;
}

/** Os textos ficam no JSON para o prerender também conseguir ler; o ícone,
 *  que é um componente, só existe aqui. */
const ICON_BY_PATH: Record<string, LucideIcon> = {
  "/ferramentas/custo-do-galao": Calculator,
  "/ferramentas/abrir-distribuidora": Rocket,
  "/ferramentas/taxa-de-entrega": Truck,
  "/ferramentas/comissao-de-entregador": Percent,
  "/ferramentas/taxa-da-maquininha": CreditCard,
  "/ferramentas/perda-de-vasilhame": Package,
  "/ferramentas/capital-preso-no-fiado": Wallet,
};

/**
 * Fonte única das ferramentas gratuitas. A listagem, o rodapé e a navegação
 * leem daqui, então publicar uma ferramenta nova é virar o `available` e criar
 * a rota. Lembre de incluir o caminho em `src/lib/seo-routes.json`: o sitemap
 * sai de lá, e sem a entrada o build falha avisando.
 */
export const tools: Tool[] = toolsData.map((tool) => ({
  ...tool,
  icon: ICON_BY_PATH[tool.path],
}));

export const availableTools = tools.filter((tool) => tool.available);
export const upcomingTools = tools.filter((tool) => !tool.available);
