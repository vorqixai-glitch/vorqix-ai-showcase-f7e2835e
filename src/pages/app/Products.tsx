import { Link } from "react-router-dom";
import { ArrowUpRight, Factory, Truck, ShieldCheck, Users, PenTool } from "lucide-react";

const products = [
  { icon: Factory, name: "SaaS Factory AI", tag: "Platform", desc: "Generate and ship production-ready SaaS with AI scaffolding.", status: "Active" },
  { icon: Truck, name: "Nexus Dispatch Pro", tag: "Logistics", desc: "Real-time routing and predictive ETAs for fleets.", status: "Beta" },
  { icon: ShieldCheck, name: "Compliance Scan AI", tag: "RegTech", desc: "Continuous SOC 2 / GDPR / HIPAA monitoring.", status: "Active" },
  { icon: Users, name: "RecruitIQ AI", tag: "Talent", desc: "AI sourcing, screening, and shortlisting.", status: "Active" },
  { icon: PenTool, name: "ContentForge AI", tag: "Marketing", desc: "On-brand content engine across every channel.", status: "Active" },
];

export default function ProductsDash() {
  return (
    <div className="p-6 lg:p-10 max-w-6xl space-y-8">
      <div>
        <p className="text-sm text-primary font-medium tracking-wide uppercase mb-2">Marketplace</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold">VORQIX Products</h1>
        <p className="text-muted-foreground mt-2">Launch, monitor, and scale your AI products from one place.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {products.map((p) => (
          <article key={p.name} className="glass glow-border rounded-2xl p-6 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary border border-border grid place-items-center">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary border border-primary/30 rounded-full px-2 py-0.5">
                {p.status}
              </span>
            </div>
            <h3 className="text-xl font-display font-semibold">{p.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{p.tag}</p>
            <p className="text-sm text-muted-foreground mb-5">{p.desc}</p>
            <Link to="/app/copilot" className="text-sm text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
              Open dashboard <ArrowUpRight className="w-4 h-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
