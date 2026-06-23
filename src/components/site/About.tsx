import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">About VORQIX.AI</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              An AI studio for the <span className="text-gradient-primary">next decade of software.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-5 leading-relaxed">
              Founded by engineers, designers, and operators from the world's most ambitious tech companies,
              VORQIX.AI exists for one reason: to help bold teams ship AI-native products that move the
              market.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We work with everyone from pre-seed founders to Fortune 500 leaders. Every engagement is
              outcome-driven, design-led, and built on a foundation of craft.
            </p>
            <Button asChild variant="hero" size="lg">
              <a href="#contact">Work with us <ArrowRight className="w-4 h-4" /></a>
            </Button>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-5">
            {[
              { k: "Founded", v: "2023" },
              { k: "Team", v: "40+ engineers" },
              { k: "HQ", v: "Remote-first" },
              { k: "Mission", v: "AI for builders" },
            ].map((x) => (
              <div key={x.k} className="glass rounded-2xl p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{x.k}</div>
                <div className="text-xl font-semibold">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
