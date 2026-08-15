import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  tag: string | null;
  category: string;
  published_at: string | null;
};

export const Insights = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("posts")
      .select("id, slug, title, excerpt, tag, category, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setPosts((data ?? []) as Post[]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="insights" className="py-24 lg:py-32">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Latest insights</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">From the lab.</h2>
          </div>
          <Link
            to="/blog"
            className="text-sm font-medium text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            View all articles <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass rounded-2xl p-7 h-52 animate-pulse" />
            ))}
          </div>
        ) : posts.length ? (
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((p) => (
              <Link
                key={p.id}
                to={`${p.category === "case_study" ? "/case-studies" : "/blog"}/${p.slug}`}
                className="group glass glow-border rounded-2xl p-7 flex flex-col hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
                  {p.tag && <span className="text-primary font-medium">{p.tag}</span>}
                  {p.tag && p.published_at && <span>·</span>}
                  {p.published_at && <span>{new Date(p.published_at).toLocaleDateString()}</span>}
                </div>
                <h3 className="text-xl font-semibold leading-snug mb-4 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{p.excerpt}</p>
                )}
                <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{p.category === "case_study" ? "Case study" : "Article"}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
            New articles and case studies land monthly — check back soon.
          </div>
        )}
      </div>
    </section>
  );
};
