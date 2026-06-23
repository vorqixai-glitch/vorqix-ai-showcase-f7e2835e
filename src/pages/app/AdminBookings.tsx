import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Booking = { id: string; name: string; email: string; company: string | null; topic: string; preferred_date: string | null; preferred_time: string | null; status: string; created_at: string };

export default function AdminBookings() {
  const { isAdmin, loading } = useAuth();
  const [list, setList] = useState<Booking[]>([]);

  const load = async () => {
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    setList((data ?? []) as Booking[]);
  };
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (loading) return <div className="p-10">Loading…</div>;
  if (!isAdmin) return <Navigate to="/app" replace />;

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl space-y-6">
      <div>
        <p className="text-sm text-primary font-medium tracking-wide uppercase mb-2">Admin</p>
        <h1 className="text-3xl font-display font-bold">All bookings</h1>
      </div>
      <div className="space-y-2">
        {list.map((b) => (
          <div key={b.id} className="glass rounded-xl p-4 flex flex-wrap items-center gap-4 justify-between">
            <div className="min-w-0">
              <div className="font-medium">{b.name} <span className="text-muted-foreground font-normal">· {b.email}</span></div>
              <div className="text-sm text-muted-foreground truncate">{b.topic}{b.company ? ` — ${b.company}` : ""}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {b.preferred_date || "—"} · {b.preferred_time || "—"} · {new Date(b.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-1 rounded-full border border-primary/30 text-primary">{b.status}</span>
              <Button size="sm" variant="outline" onClick={() => setStatus(b.id, "confirmed")}>Confirm</Button>
              <Button size="sm" variant="ghost" onClick={() => setStatus(b.id, "cancelled")}>Cancel</Button>
            </div>
          </div>
        ))}
        {!list.length && <div className="glass rounded-xl p-8 text-center text-sm text-muted-foreground">No bookings yet.</div>}
      </div>
    </div>
  );
}
