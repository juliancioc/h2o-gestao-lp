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

/**
 * Fonte única das ferramentas gratuitas. A listagem, o rodapé e a navegação
 * leem daqui, então publicar uma ferramenta nova é virar o `available` e criar
 * a rota. Lembre de incluir o caminho em `public/sitemap.xml`.
 */
export const tools: Tool[] = [
  {
    path: "/ferramentas/custo-do-galao",
    title: "Calculadora de custo do galão",
    shortTitle: "Custo do galão",
    description:
      "Descubra quanto cada galão custa de verdade, somando frete da compra, bonificação, avaria e o desgaste dos seus vasilhames.",
    icon: Calculator,
    available: true,
  },
  {
    path: "/ferramentas/abrir-distribuidora",
    title: "Quanto custa abrir uma distribuidora",
    shortTitle: "Abrir distribuidora",
    description:
      "Simule o investimento inicial, o custo fixo mensal e quantas entregas por dia você precisa fazer para o negócio se pagar.",
    icon: Rocket,
    available: false,
  },
  {
    path: "/ferramentas/taxa-de-entrega",
    title: "Quanto cobrar de taxa de entrega",
    shortTitle: "Taxa de entrega",
    description:
      "Calcule o custo real de cada entrega com combustível, distância e entregador, e chegue no frete justo por faixa de distância.",
    icon: Truck,
    available: false,
  },
  {
    path: "/ferramentas/comissao-de-entregador",
    title: "Comissão de entregador",
    shortTitle: "Comissão de entregador",
    description:
      "Compare fixo por entrega, porcentagem da venda e modelo híbrido, e veja quanto cada um custa por mês no seu volume.",
    icon: Percent,
    available: false,
  },
  {
    path: "/ferramentas/taxa-da-maquininha",
    title: "Taxa da maquininha",
    shortTitle: "Taxa da maquininha",
    description:
      "Veja quanto sobra em débito, crédito e parcelado, e compare repassar a taxa ao cliente ou absorver na sua margem.",
    icon: CreditCard,
    available: false,
  },
  {
    path: "/ferramentas/perda-de-vasilhame",
    title: "Perda de vasilhame",
    shortTitle: "Perda de vasilhame",
    description:
      "Estime quantos galões estão na rua sem voltar e quanto essa perda custa para a sua distribuidora ao longo do ano.",
    icon: Package,
    available: false,
  },
  {
    path: "/ferramentas/capital-preso-no-fiado",
    title: "Capital preso no fiado",
    shortTitle: "Capital no fiado",
    description:
      "Descubra quanto do seu dinheiro está parado na mão dos clientes e o que esse valor deixa de render todo mês.",
    icon: Wallet,
    available: false,
  },
];

export const availableTools = tools.filter((tool) => tool.available);
export const upcomingTools = tools.filter((tool) => !tool.available);
