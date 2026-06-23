import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

type Post = { id: string; slug: string; title: string; category: string; published: boolean; excerpt: string | null; content: string; tag: string | null };

export default function AdminPosts() {
  const { user, isAdmin, loading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);

  const load = async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts((data ?? []) as Post[]);
  };
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (loading) return <div className="p-10">Loading…</div>;
  if (!isAdmin) return <Navigate to="/app" replace />;

  const blank = (): Post => ({ id: "", slug: "", title: "", category: "blog", published: false, excerpt: "", content: "", tag: "" });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !user) return;
    const payload = {
      slug: editing.slug.trim().toLowerCase().replace(/\s+/g, "-"),
      title: editing.title,
      category: editing.category,
      published: editing.published,
      published_at: editing.published ? new Date().toISOString() : null,
      excerpt: editing.excerpt,
      content: editing.content,
      tag: editing.tag,
      author_id: user.id,
    };
    const { error } = editing.id
      ? await supabase.from("posts").update(payload).eq("id", editing.id)
      : await supabase.from("posts").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved.");
    setEditing(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-primary font-medium tracking-wide uppercase mb-2">Admin</p>
          <h1 className="text-3xl font-display font-bold">Content</h1>
        </div>
        <Button variant="hero" onClick={() => setEditing(blank())}><Plus className="w-4 h-4" /> New post</Button>
      </div>

      {editing && (
        <form onSubmit={save} className="glass glow-border rounded-2xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>Title</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required className="mt-1.5" /></div>
            <div><Label>Slug</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} required className="mt-1.5" /></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div><Label>Category</Label>
              <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v })}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="case_study">Case study</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Tag</Label><Input value={editing.tag ?? ""} onChange={(e) => setEditing({ ...editing, tag: e.target.value })} className="mt-1.5" /></div>
            <div className="flex items-end gap-3"><Switch checked={editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label>Published</Label></div>
          </div>
          <div><Label>Excerpt</Label><Textarea value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="mt-1.5" /></div>
          <div><Label>Content (Markdown)</Label><Textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={10} className="mt-1.5 font-mono text-sm" /></div>
          <div className="flex gap-2">
            <Button type="submit" variant="hero">Save</Button>
            <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {posts.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-muted-foreground">/{p.category === "case_study" ? "case-studies" : "blog"}/{p.slug} · {p.published ? "Published" : "Draft"}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(p)}>Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => del(p.id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
        {!posts.length && <div className="glass rounded-xl p-8 text-center text-sm text-muted-foreground">No posts yet. Create your first.</div>}
      </div>
    </div>
  );
}
