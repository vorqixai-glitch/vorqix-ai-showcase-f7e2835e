const steps = [
  {
    n: "01",
    title: "Discovery & Strategy",
    desc: "We align on outcomes, map your tech and data landscape, and define the smallest end-to-end slice that delivers value.",
  },
  {
    n: "02",
    title: "Design & Architecture",
    desc: "Product design, system architecture, and AI workflow blueprints — all reviewed with you before a single line of code.",
  },
  {
    n: "03",
    title: "Build & Ship",
    desc: "Weekly demos, async updates, and production releases on a predictable cadence. You see progress every Friday.",
  },
  {
    n: "04",
    title: "Scale & Optimize",
    desc: "Ongoing measurement, model tuning, and growth engineering — turning your launch into compounding leverage.",
  },
];

export const Process = () => {
  return (
    <section id="process" className="py-24 lg:py-32">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">How it works</p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            From concept to production in <span className="text-gradient-primary">weeks, not quarters.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="glass glow-border rounded-2xl p-7 h-full hover:-translate-y-1 transition-transform">
                <div className="font-mono text-sm text-primary mb-6">{s.n}</div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
