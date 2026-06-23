import { Sparkles, Twitter, Linkedin, Github, Youtube } from "lucide-react";

const cols = [
  {
    title: "Services",
    links: ["AI SaaS", "Automation", "AI Agents", "Custom Software", "Web & App", "Growth"],
  },
  {
    title: "Products",
    links: ["SaaS Factory AI", "Nexus Dispatch Pro", "Compliance Scan AI", "RecruitIQ AI", "ContentForge AI"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Insights", "Contact", "Press kit"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA", "Cookies"],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border pt-20 pb-10">
      <div className="container">
        <div className="grid lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 font-display font-bold text-lg mb-4">
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-primary shadow-glow">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </span>
              <span>VORQIX<span className="text-primary">.AI</span></span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Intelligent software, automation, and AI agents engineered for ambitious teams.
            </p>
            <div className="flex items-center gap-2">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-9 h-9 grid place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold mb-4">{c.title}</div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VORQIX.AI · All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with intention in 13 cities. Powered by humans + AI.
          </p>
        </div>
      </div>
    </footer>
  );
};
