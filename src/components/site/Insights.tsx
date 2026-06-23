import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    tag: "AI Strategy",
    date: "Jun 18, 2026",
    title: "The end of SaaS as we know it: building for the agent era",
    read: "8 min read",
  },
  {
    tag: "Case Study",
    date: "Jun 04, 2026",
    title: "How Nexus Dispatch cut routing costs by 31% in 90 days",
    read: "6 min read",
  },
  {
    tag: "Engineering",
    date: "May 22, 2026",
    title: "Production-grade RAG: lessons from shipping 40+ AI products",
    read: "12 min read",
  },
];

export const Insights = () => {
  return (
    <section id="insights" className="py-24 lg:py-32">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Latest insights</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">From the lab.</h2>
          </div>
          <a href="#" className="text-sm font-medium text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
            View all articles <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((p) => (
            <a
              key={p.title}
              href="#"
              className="group glass glow-border rounded-2xl p-7 flex flex-col hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
                <span className="text-primary font-medium">{p.tag}</span>
                <span>·</span>
                <span>{p.date}</span>
              </div>
              <h3 className="text-xl font-semibold leading-snug mb-6 group-hover:text-primary transition-colors flex-1">
                {p.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{p.read}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-primary transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
