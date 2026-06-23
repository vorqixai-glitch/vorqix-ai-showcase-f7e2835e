const stats = [
  { value: "10×", label: "Faster time to market" },
  { value: "97%", label: "Client retention rate" },
  { value: "$48M+", label: "Pipeline generated" },
  { value: "120+", label: "Products shipped" },
];

const benefits = [
  "Senior AI engineers, not outsourced juniors",
  "Production-grade code from day one",
  "Transparent weekly demos and async updates",
  "SOC 2-ready security baked into every build",
  "Fixed-scope sprints with measurable outcomes",
  "Lifetime ownership of code and IP",
];

export const Benefits = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container">
        <div className="glass glow-border rounded-3xl p-8 lg:p-16 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-hero opacity-50 pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
                Why teams choose VORQIX
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Outcomes you can <span className="text-gradient-primary">measure.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're not an agency. We're a product studio operating like your in-house AI team —
                with the speed of a startup and the rigor of an enterprise partner.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shadow-glow shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-6 lg:p-8 text-center hover:border-primary/40 transition-colors"
                >
                  <div className="font-display text-4xl lg:text-5xl font-bold text-gradient-primary mb-2">
                    {s.value}
                  </div>
                  <div className="text-xs lg:text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
