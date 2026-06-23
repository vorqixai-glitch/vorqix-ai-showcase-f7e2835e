import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const logos = ["Stripe", "Linear", "Vercel", "Notion", "OpenAI", "Shopify"];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>
      <div className="absolute inset-0 grid-bg -z-10" aria-hidden="true" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <a
            href="#products"
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Introducing SaaS Factory AI — ship products 10× faster
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Intelligent software.
            <br />
            <span className="text-gradient-primary">Built for scale.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            VORQIX.AI designs and ships AI products, automation systems, and custom software for
            startups, agencies, and enterprises ready to move at the speed of intelligence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <a href="#contact">
                Start your project <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#products">
                <Play className="w-4 h-4" /> See our products
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required · Discovery call in under 24h
          </p>
        </div>

        {/* Trust bar */}
        <div className="mt-20 lg:mt-28">
          <p className="text-center text-xs font-medium tracking-widest uppercase text-muted-foreground mb-8">
            Trusted by ambitious teams worldwide
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-70">
            {logos.map((name) => (
              <div
                key={name}
                className="font-display text-center text-lg lg:text-xl font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
