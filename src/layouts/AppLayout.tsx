import { Navigate, Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Bot, Package, Calendar, CreditCard, Settings,
  Sparkles, LogOut, FileText, ShieldCheck
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const nav = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/app/copilot", label: "Copilot", icon: Bot },
  { to: "/app/products", label: "Products", icon: Package },
  { to: "/app/bookings", label: "Bookings", icon: Calendar },
  { to: "/app/billing", label: "Billing", icon: CreditCard },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export default function AppLayout() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen p-8 space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace state={{ from: location }} />;

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card/30 backdrop-blur">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 font-display font-bold">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </span>
            VORQIX<span className="text-primary">.AI</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }
            >
              <n.icon className="w-4 h-4" />
              {n.label}
            </NavLink>
          ))}
          {isAdmin && (
            <>
              <div className="pt-4 pb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Admin</div>
              <NavLink to="/app/admin/posts" className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }>
                <FileText className="w-4 h-4" /> Content
              </NavLink>
              <NavLink to="/app/admin/bookings" className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }>
                <ShieldCheck className="w-4 h-4" /> All bookings
              </NavLink>
            </>
          )}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">{user.email}</div>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-sm">
            <Sparkles className="w-4 h-4 text-primary" /> VORQIX.AI
          </Link>
          <Button variant="ghost" size="sm" onClick={signOut}>Sign out</Button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
