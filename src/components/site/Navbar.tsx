import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Insights" },
  { href: "/case-studies", label: "Case studies" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="container">
        <nav className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all ${scrolled ? "glass shadow-card" : ""}`} aria-label="Primary">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </span>
            <span>VORQIX<span className="text-primary">.AI</span></span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Button asChild variant="hero" size="sm">
                <Link to="/app"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm"><Link to="/auth">Sign in</Link></Button>
                <Button asChild variant="hero" size="sm"><Link to="/auth">Get started</Link></Button>
              </>
            )}
          </div>

          <button className="lg:hidden p-2 -mr-2" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-2xl p-4 animate-fade-in">
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} onClick={() => setOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-secondary text-sm">{l.label}</Link>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild variant="hero" className="w-full">
                  <Link to={user ? "/app" : "/auth"} onClick={() => setOpen(false)}>
                    {user ? "Go to dashboard" : "Get started"}
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
