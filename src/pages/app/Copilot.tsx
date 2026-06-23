import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Sparkles, Plus, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

type Msg = { id?: string; role: "user" | "assistant"; content: string };
type Convo = { id: string; title: string; created_at: string };

export default function Copilot() {
  const { user } = useAuth();
  const [convos, setConvos] = useState<Convo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("conversations").select("*").eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      setConvos((data ?? []) as Convo[]);
      if (data && data.length && !activeId) setActiveId(data[0].id);
    })();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!activeId) { setMessages([]); return; }
    (async () => {
      const { data } = await supabase
        .from("messages").select("*").eq("conversation_id", activeId)
        .order("created_at", { ascending: true });
      setMessages((data ?? []).map((m: any) => ({ id: m.id, role: m.role, content: m.content })));
    })();
  }, [activeId]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, busy]);

  const newChat = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("conversations").insert({ user_id: user.id, title: "New conversation" })
      .select().single();
    if (error) return toast.error(error.message);
    setConvos((c) => [data as Convo, ...c]);
    setActiveId(data.id);
    setMessages([]);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || !user) return;
    setBusy(true);
    let convoId = activeId;
    if (!convoId) {
      const { data, error } = await supabase
        .from("conversations").insert({ user_id: user.id, title: text.slice(0, 60) })
        .select().single();
      if (error) { setBusy(false); return toast.error(error.message); }
      convoId = data.id; setActiveId(convoId);
      setConvos((c) => [data as Convo, ...c]);
    }
    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    await supabase.from("messages").insert({
      conversation_id: convoId, user_id: user.id, role: "user", content: text,
    });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/copilot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token ?? ""}`,
          },
          body: JSON.stringify({
            conversation_id: convoId,
            messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          }),
        }
      );
      if (res.status === 429) throw new Error("Rate limit reached. Try again shortly.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please top up.");
      if (!res.ok || !res.body) throw new Error("Copilot failed to respond.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              setMessages((m) => {
                const next = [...m];
                next[next.length - 1] = { role: "assistant", content: assistant };
                return next;
              });
            }
          } catch { /* ignore */ }
        }
      }
      if (assistant) {
        await supabase.from("messages").insert({
          conversation_id: convoId, user_id: user.id, role: "assistant", content: assistant,
        });
      }
    } catch (e: any) {
      toast.error(e.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-screen lg:h-[100dvh]">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/20">
        <div className="p-4 border-b border-border">
          <Button variant="hero" size="sm" className="w-full" onClick={newChat}>
            <Plus className="w-4 h-4" /> New chat
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {convos.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${
                activeId === c.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              {c.title}
            </button>
          ))}
          {!convos.length && (
            <p className="text-xs text-muted-foreground p-3">No chats yet. Start a new one.</p>
          )}
        </div>
      </aside>

      <section className="flex-1 flex flex-col min-w-0">
        <header className="px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-semibold">VORQIX Copilot</h1>
            <p className="text-xs text-muted-foreground">Powered by Lovable AI · Gemini</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary grid place-items-center shadow-glow mb-4">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">How can I help?</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Ask about VORQIX products, generate strategy docs, draft outreach, or plan your AI roadmap.
                </p>
                <div className="grid sm:grid-cols-2 gap-2 max-w-lg mx-auto mt-8">
                  {[
                    "Draft a GTM plan for an AI SaaS launch",
                    "Summarize the latest in agentic workflows",
                    "Suggest automations for a 10-person agency",
                    "Compare RAG architectures for a support bot",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="glass rounded-xl p-3 text-sm text-left hover:border-primary/40 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${
                  m.role === "user" ? "bg-secondary" : "bg-gradient-primary shadow-glow"
                }`}>
                  {m.role === "user" ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary-foreground" />}
                </div>
                <div className={`max-w-[85%] glass rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user" ? "bg-primary/10 border-primary/20" : ""
                }`}>
                  {m.content || (busy && i === messages.length - 1 ? "…" : "")}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </div>

        <div className="border-t border-border p-4">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Message VORQIX Copilot…"
              rows={1}
              className="resize-none bg-background/50 min-h-[44px]"
              disabled={busy}
            />
            <Button variant="hero" onClick={send} disabled={busy || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
