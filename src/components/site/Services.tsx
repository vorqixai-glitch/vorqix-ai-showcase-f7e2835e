import { Brain, Workflow, Bot, Code2, Globe, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI SaaS Development",
    desc: "End-to-end intelligent SaaS products — from concept to production, with native AI workflows baked in.",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    desc: "Replace manual processes with autonomous systems that work 24/7 across sales, ops, and support.",
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Custom multi-step agents that research, decide, and execute — integrated with the tools your team already uses.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    desc: "Bespoke platforms engineered for performance, security, and the way your business actually operates.",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    desc: "High-conversion websites and native-feel apps built on modern, scalable stacks.",
  },
  {
    icon: TrendingUp,
    title: "Growth Systems",
    desc: "Data-driven engines for acquisition, activation, and retention — instrumented from day one.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">What we build</p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            A full stack for the <span className="text-gradient-primary">AI-native</span> business.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            One studio, six disciplines. Everything you need to launch, scale, and compound with AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative glass glow-border rounded-2xl p-7 hover:bg-secondary/40 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow mb-5 group-hover:scale-110 transition-transform">
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
