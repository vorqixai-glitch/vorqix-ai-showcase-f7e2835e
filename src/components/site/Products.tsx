import { Button } from "@/components/ui/button";
import { ArrowUpRight, Factory, Truck, ShieldCheck, Users, PenTool } from "lucide-react";

const products = [
  {
    icon: Factory,
    name: "SaaS Factory AI",
    tag: "Platform",
    desc: "Generate, deploy, and scale production-ready SaaS products with AI-driven scaffolding and automated DevOps.",
    accent: "from-primary/20 to-primary-glow/10",
  },
  {
    icon: Truck,
    name: "Nexus Dispatch Pro",
    tag: "Logistics",
    desc: "End-to-end dispatch intelligence for fleets — real-time routing, driver telematics, and predictive ETA.",
    accent: "from-primary-glow/20 to-primary/10",
  },
  {
    icon: ShieldCheck,
    name: "Compliance Scan AI",
    tag: "RegTech",
    desc: "Continuous compliance monitoring across SOC 2, GDPR, and HIPAA — automated evidence and gap analysis.",
    accent: "from-primary/20 to-primary-glow/10",
  },
  {
    icon: Users,
    name: "RecruitIQ AI",
    tag: "Talent",
    desc: "Source, screen, and shortlist top candidates with conversational AI interviewers and bias-aware scoring.",
    accent: "from-primary-glow/20 to-primary/10",
  },
  {
    icon: PenTool,
    name: "ContentForge AI",
    tag: "Marketing",
    desc: "On-brand content engine that researches, writes, and publishes across every channel your team owns.",
    accent: "from-primary/20 to-primary-glow/10",
  },
];

export const Products = () => {
  return (
    <section id="products" className="py-24 lg:py-32 relative">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Featured products</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Five flagship platforms. <span className="text-gradient-primary">Infinite leverage.</span>
            </h2>
          </div>
          <Button asChild variant="glass">
            <a href="#contact">Request access <ArrowUpRight className="w-4 h-4" /></a>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <article
              key={p.name}
              className={`group relative overflow-hidden rounded-2xl glass glow-border p-7 hover:-translate-y-1 transition-all duration-300 ${
                i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary border border-border grid place-items-center group-hover:bg-gradient-primary group-hover:shadow-glow transition-all">
                    <p.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-1">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.desc}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                >
                  Learn more <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
