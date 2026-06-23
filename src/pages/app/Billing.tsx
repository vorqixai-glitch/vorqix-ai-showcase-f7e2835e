import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    desc: "For solo founders exploring AI.",
    features: ["VORQIX Copilot (200 msgs/mo)", "1 product workspace", "Community support", "Booking engine"],
    cta: "Get started", variant: "glass" as const,
  },
  {
    name: "Pro", price: "$199", popular: true,
    desc: "For startups and agencies shipping fast.",
    features: ["Unlimited Copilot", "5 product workspaces", "Priority support", "Custom integrations", "Analytics dashboard"],
    cta: "Upgrade to Pro", variant: "hero" as const,
  },
  {
    name: "Enterprise", price: "Custom",
    desc: "For organizations going all-in on AI.",
    features: ["SSO + SAML", "Dedicated engineer", "SOC 2 / HIPAA support", "On-prem deployment", "99.99% SLA"],
    cta: "Contact sales", variant: "glass" as const,
  },
];

export default function Billing({ embedded = false }: { embedded?: boolean }) {
  return (
    <div className={embedded ? "p-6 lg:p-10 max-w-6xl space-y-8" : "min-h-screen pt-32 pb-20"}>
      <div className={embedded ? "" : "container"}>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm text-primary font-medium tracking-wide uppercase mb-3">Pricing</p>
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Plans that scale with your <span className="text-gradient-primary">ambition.</span>
          </h1>
          <p className="text-muted-foreground">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`glass glow-border rounded-2xl p-7 flex flex-col relative ${
                p.popular ? "border-primary/40 shadow-glow" : ""
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <div className="my-6">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                {p.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={p.variant} className="w-full">{p.cta}</Button>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto glass rounded-2xl p-6 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Stripe checkout coming online.</strong>{" "}
            Subscriptions and the customer portal will activate once payments are enabled.{" "}
            {embedded && <Link to="/app" className="text-primary hover:underline">Back to dashboard</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}
