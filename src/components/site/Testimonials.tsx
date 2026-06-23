import { Star } from "lucide-react";

const items = [
  {
    quote:
      "VORQIX shipped an AI agent that replaced three full-time roles in our ops team. Six-figure savings inside one quarter.",
    name: "Maya Chen",
    role: "COO, Northwind Logistics",
  },
  {
    quote:
      "The team feels like an extension of our own. The product they built became the cornerstone of our Series B pitch.",
    name: "Daniel Okafor",
    role: "Founder, Lumen Health",
  },
  {
    quote:
      "Best decision we made this year. Compliance Scan AI cut our SOC 2 prep from months to two weeks.",
    name: "Priya Raman",
    role: "CTO, FinPath",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Loved by operators</p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            What founders and CTOs say.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t) => (
            <figure
              key={t.name}
              className="glass glow-border rounded-2xl p-7 flex flex-col hover:-translate-y-1 transition-transform"
            >
              <div className="flex gap-0.5 mb-5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary" />
                ))}
              </div>
              <blockquote className="text-base lg:text-lg leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="border-t border-border pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
