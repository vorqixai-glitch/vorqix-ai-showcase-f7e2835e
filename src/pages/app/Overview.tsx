import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Bot, Package, Calendar, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Overview() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string | null; company: string | null } | null>(null);
  const [stats, setStats] = useState({ bookings: 0, conversations: 0 });

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: p }, { count: bk }, { count: cv }] = await Promise.all([
        supabase.from("profiles").select("full_name, company").eq("id", user.id).maybeSingle(),
        supabase.from("bookings").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("conversations").select("*", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setProfile(p ?? null);
      setStats({ bookings: bk ?? 0, conversations: cv ?? 0 });
    })();
  }, [user]);

  const name = profile?.full_name?.split(" ")[0] || "there";

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-6xl">
      <div>
        <p className="text-sm text-primary font-medium tracking-wide uppercase mb-2">Dashboard</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold">Welcome back, {name}.</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening in your VORQIX workspace.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active products", value: "5", icon: Package, sub: "Across your workspace" },
          { label: "Copilot chats", value: stats.conversations, icon: Bot, sub: "All time" },
          { label: "Bookings", value: stats.bookings, icon: Calendar, sub: "Scheduled" },
          { label: "Automations run", value: "1.2k", icon: TrendingUp, sub: "This month" },
        ].map((s) => (
          <div key={s.label} className="glass glow-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-display font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Link to="/app/copilot" className="glass glow-border rounded-2xl p-6 hover:-translate-y-1 transition-transform group lg:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <h3 className="text-2xl font-display font-bold mb-2">Ask VORQIX Copilot</h3>
          <p className="text-muted-foreground text-sm">
            Your in-house AI strategist. Ask about products, generate roadmaps, plan launches, or summarize anything.
          </p>
        </Link>

        <Link to="/app/products" className="glass glow-border rounded-2xl p-6 hover:-translate-y-1 transition-transform group">
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary border border-border grid place-items-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <h3 className="text-xl font-display font-bold mb-2">Browse products</h3>
          <p className="text-muted-foreground text-sm">SaaS Factory, Nexus Dispatch, Compliance Scan and more.</p>
        </Link>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Account</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Email</div>
            <div className="font-medium truncate">{user?.email}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Company</div>
            <div className="font-medium">{profile?.company || "—"}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Plan</div>
            <div className="font-medium">Starter <Button asChild variant="link" size="sm" className="px-1 h-auto"><Link to="/app/billing">Upgrade</Link></Button></div>
          </div>
        </div>
      </div>
    </div>
  );
}
