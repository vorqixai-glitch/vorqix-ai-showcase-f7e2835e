import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import { Sparkles, ArrowLeft } from "lucide-react";

const signupSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
  full_name: z.string().trim().min(1, "Name required").max(100),
  company: z.string().trim().max(100).optional(),
});

const signinSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1, "Password required").max(72),
});

export default function Auth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to="/app" replace />;

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signupSchema.safeParse({
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
      full_name: String(fd.get("full_name") || ""),
      company: String(fd.get("company") || ""),
    });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: { full_name: parsed.data.full_name, company: parsed.data.company },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome to VORQIX. Check your inbox to confirm.");
    navigate("/app");
  };

  const onSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signinSchema.safeParse({
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
    });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back.");
    navigate("/app");
  };

  const onGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/app`,
    });
    if (result.error) {
      setBusy(false);
      return toast.error("Google sign-in failed.");
    }
    if (result.redirected) return;
    navigate("/app");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg z-10">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </span>
          VORQIX<span className="text-primary">.AI</span>
        </Link>
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-display font-bold leading-tight mb-4">
            The operating system for <span className="text-gradient-primary">AI-native teams.</span>
          </h2>
          <p className="text-muted-foreground">
            Manage your products, automations, and AI agents from a single command center.
          </p>
        </div>
        <div className="grid-bg absolute inset-0 opacity-50" />
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>

          <Tabs defaultValue="signin">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-8 space-y-4">
              <h1 className="text-2xl font-display font-bold">Welcome back</h1>
              <Button variant="glass" className="w-full" onClick={onGoogle} disabled={busy}>
                Continue with Google
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-background px-3 text-muted-foreground">or</span></div>
              </div>
              <form onSubmit={onSignin} className="space-y-4">
                <div>
                  <Label htmlFor="si-email">Email</Label>
                  <Input id="si-email" name="email" type="email" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="si-password">Password</Label>
                  <Input id="si-password" name="password" type="password" required className="mt-1.5" />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                  {busy ? "Signing in…" : "Sign in"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-8 space-y-4">
              <h1 className="text-2xl font-display font-bold">Create your VORQIX account</h1>
              <Button variant="glass" className="w-full" onClick={onGoogle} disabled={busy}>
                Continue with Google
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-background px-3 text-muted-foreground">or</span></div>
              </div>
              <form onSubmit={onSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="su-name">Full name</Label>
                    <Input id="su-name" name="full_name" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="su-company">Company</Label>
                    <Input id="su-company" name="company" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="su-email">Email</Label>
                  <Input id="su-email" name="email" type="email" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="su-password">Password</Label>
                  <Input id="su-password" name="password" type="password" required minLength={8} className="mt-1.5" />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                  {busy ? "Creating…" : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
