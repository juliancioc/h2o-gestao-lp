import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "A loja online está inclusa nos planos?",
    answer:
      "A loja online própria faz parte do plano Operação, sem taxa por pedido e sem comissão de marketplace. Sua distribuidora ganha um link exclusivo para compartilhar com os clientes, e cada pedido feito na loja cai direto no sistema e no painel de entregas.",
  },
  {
    question: "O H2O Gestão emite nota fiscal?",
    answer:
      "Sim! A emissão de nota fiscal está disponível no plano Operação, direto pela plataforma. Você emite suas notas sem precisar de outro sistema e mantém sua distribuidora em dia com o fisco.",
  },
  {
    question: "Preciso instalar algum programa?",
    answer:
      "Não. O H2O Gestão funciona 100% online, pelo celular ou computador. Basta acessar com seu login e começar a usar.",
  },
  {
    question: "Tem fidelidade ou taxa de adesão?",
    answer:
      "Não há fidelidade nem taxa de adesão. Você paga a mensalidade e pode cancelar quando quiser.",
  },
  {
    question: "Qual a diferença entre os planos?",
    answer:
      "O Essencial (R$ 59/mês, até 2 usuários) inclui toda a gestão da distribuidora: vendas, caixa, estoque, clientes, fiado e relatórios. O Operação (R$ 99/mês, até 5 usuários) inclui tudo do Essencial mais a loja online própria, o painel de entregas do dia e a emissão de nota fiscal. O Gestão (R$ 249/mês, até 8 usuários) inclui tudo do Operação mais entregadores ilimitados no aplicativo, até 100 notas fiscais por mês, onboarding assistido, importação dos seus dados e suporte prioritário. Usuários extras custam R$ 19/mês cada. Os três planos têm opção anual com 2 meses grátis, 12 meses pelo preço de 10.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim. Seus dados são criptografados, com backup diário automático e em total conformidade com a LGPD.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Perguntas Frequentes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Ainda com <span className="text-gradient">dúvidas?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            As respostas para as perguntas que mais recebemos de donos de
            distribuidoras.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-heading">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
