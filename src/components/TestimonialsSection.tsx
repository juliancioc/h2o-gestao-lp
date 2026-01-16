import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Proprietário",
    company: "Água Pura Distribuidora",
    content: "Depois de implementar o H2O Gestão, conseguimos aumentar nossas entregas em 40% sem contratar mais entregadores. A roteirização inteligente fez toda a diferença.",
    rating: 5,
  },
  {
    name: "Maria Santos",
    role: "Gerente Operacional",
    company: "HidroTop",
    content: "A integração com WhatsApp revolucionou nosso atendimento. Nossos clientes adoram fazer pedidos de forma rápida e receber atualizações em tempo real.",
    rating: 5,
  },
  {
    name: "João Oliveira",
    role: "CEO",
    company: "Água & Cia",
    content: "Com o H2O Gestão conseguimos organizar toda nossa rede de franquias. Agora gerenciamos todas as unidades de forma centralizada e eficiente.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            O que nossos{" "}
            <span className="text-gradient">clientes dizem</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Centenas de distribuidoras já transformaram seus negócios com o H2O Gestão.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} variant="glass" className="group">
              <CardContent className="p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-water-medium text-water-medium" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-heading font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
