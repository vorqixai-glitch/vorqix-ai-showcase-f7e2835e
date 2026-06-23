import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowRight, Mail } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1000),
});

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

export const CTA = () => {
  const [submitting, setSubmitting] = useState(false);
  const [newsletter, setNewsletter] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      message: String(form.get("message") || ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks! We'll be in touch within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email: newsletter });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    toast.success("You're on the list.");
    setNewsletter("");
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="container">
        <div className="glass glow-border rounded-3xl p-8 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Let's build</p>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Ready to ship something <span className="text-gradient-primary">unforgettable?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Tell us about your project. We'll reply within 24 hours with a tailored plan and a
                no-obligation roadmap.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
                  Free 30-minute discovery call
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
                  Fixed-scope quote within a week
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
                  NDA-ready from first message
                </div>
              </div>

              <div className="glass rounded-2xl p-5 border-primary/20">
                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 text-primary" /> Get the VORQIX brief
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Monthly insights on AI, automation, and growth — no fluff.
                </p>
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    aria-label="Email for newsletter"
                    className="bg-background/50"
                  />
                  <Button type="submit" variant="hero" size="default">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 lg:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required maxLength={100} className="mt-1.5 bg-background/50" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5 bg-background/50" />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" maxLength={100} className="mt-1.5 bg-background/50" />
              </div>
              <div>
                <Label htmlFor="message">What are you building?</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  maxLength={1000}
                  rows={5}
                  className="mt-1.5 bg-background/50 resize-none"
                  placeholder="Project goals, timeline, current stack…"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Sending…" : <>Send message <ArrowRight className="w-4 h-4" /></>}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
