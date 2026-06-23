import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Settings() {
  const { user, signOut } = useAuth();
  const [full_name, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, company").eq("id", user.id).maybeSingle()
      .then(({ data }) => {
        setFullName(data?.full_name ?? "");
        setCompany(data?.company ?? "");
      });
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("profiles").update({ full_name, company }).eq("id", user.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated.");
  };

  return (
    <div className="p-6 lg:p-10 max-w-3xl space-y-8">
      <div>
        <p className="text-sm text-primary font-medium tracking-wide uppercase mb-2">Settings</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold">Account</h1>
      </div>

      <form onSubmit={save} className="glass rounded-2xl p-6 space-y-4">
        <div><Label htmlFor="s-email">Email</Label><Input id="s-email" value={user?.email ?? ""} disabled className="mt-1.5" /></div>
        <div><Label htmlFor="s-name">Full name</Label><Input id="s-name" value={full_name} onChange={(e) => setFullName(e.target.value)} className="mt-1.5" /></div>
        <div><Label htmlFor="s-company">Company</Label><Input id="s-company" value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1.5" /></div>
        <Button type="submit" variant="hero" disabled={busy}>{busy ? "Saving…" : "Save changes"}</Button>
      </form>

      <div className="glass rounded-2xl p-6 flex items-center justify-between">
        <div>
          <div className="font-medium">Sign out</div>
          <div className="text-sm text-muted-foreground">End your current session on this device.</div>
        </div>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </div>
    </div>
  );
}
