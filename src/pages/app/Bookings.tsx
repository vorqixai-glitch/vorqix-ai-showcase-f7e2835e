import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(100).optional(),
  topic: z.string().trim().min(1).max(120),
  preferred_date: z.string().optional(),
  preferred_time: z.string().max(20).optional(),
  notes: z.string().max(1000).optional(),
});

type Booking = { id: string; topic: string; preferred_date: string | null; preferred_time: string | null; status: string; created_at: string };

export default function Bookings() {
  const { user } = useAuth();
  const [list, setList] = useState<Booking[]>([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setList((data ?? []) as Booking[]);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      topic: String(fd.get("topic") || ""),
      preferred_date: String(fd.get("preferred_date") || ""),
      preferred_time: String(fd.get("preferred_time") || ""),
      notes: String(fd.get("notes") || ""),
    });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.from("bookings").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      topic: parsed.data.topic,
      preferred_time: parsed.data.preferred_time || null,
      notes: parsed.data.notes || null,
      user_id: user.id,
      preferred_date: parsed.data.preferred_date || null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Booking requested. We'll confirm by email.");
    (e.target as HTMLFormElement).reset();
    load();
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl space-y-8">
      <div>
        <p className="text-sm text-primary font-medium tracking-wide uppercase mb-2">Booking engine</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold">Book a session</h1>
        <p className="text-muted-foreground mt-2">Discovery calls, product demos, or strategy reviews with the VORQIX team.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={submit} className="glass glow-border rounded-2xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label htmlFor="b-name">Name</Label><Input id="b-name" name="name" defaultValue="" required className="mt-1.5" /></div>
            <div><Label htmlFor="b-email">Email</Label><Input id="b-email" name="email" type="email" defaultValue={user?.email || ""} required className="mt-1.5" /></div>
          </div>
          <div><Label htmlFor="b-company">Company</Label><Input id="b-company" name="company" className="mt-1.5" /></div>
          <div><Label htmlFor="b-topic">Topic</Label><Input id="b-topic" name="topic" required placeholder="e.g. Discovery call, demo of SaaS Factory…" className="mt-1.5" /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label htmlFor="b-date">Preferred date</Label><Input id="b-date" name="preferred_date" type="date" className="mt-1.5" /></div>
            <div><Label htmlFor="b-time">Preferred time</Label><Input id="b-time" name="preferred_time" placeholder="10:00 AM PST" className="mt-1.5" /></div>
          </div>
          <div><Label htmlFor="b-notes">Notes</Label><Textarea id="b-notes" name="notes" rows={3} className="mt-1.5 resize-none" /></div>
          <Button type="submit" variant="hero" className="w-full" disabled={busy}>
            {busy ? "Requesting…" : "Request booking"}
          </Button>
        </form>

        <div className="space-y-3">
          <h2 className="font-display font-semibold">Your bookings</h2>
          {list.length === 0 && (
            <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
              No bookings yet.
            </div>
          )}
          {list.map((b) => (
            <div key={b.id} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-medium">{b.topic}</div>
                  <div className="text-xs text-muted-foreground">
                    {b.preferred_date || "Date TBD"} · {b.preferred_time || "Time TBD"}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-1 rounded-full border border-primary/30 text-primary">
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
