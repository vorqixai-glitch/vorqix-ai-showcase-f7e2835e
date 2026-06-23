import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type Post = { id: string; slug: string; title: string; excerpt: string | null; tag: string | null; published_at: string | null; content: string; category: string };

export function PostList({ category, title, subtitle, basePath }: { category: "blog" | "case_study"; title: string; subtitle: string; basePath: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    supabase.from("posts").select("*").eq("category", category).eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => setPosts((data ?? []) as Post[]));
  }, [category]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container max-w-5xl">
          <p className="text-sm text-primary font-medium tracking-wide uppercase mb-3">{title}</p>
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">{subtitle}</h1>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {posts.map((p) => (
              <Link key={p.id} to={`${basePath}/${p.slug}`} className="group glass glow-border rounded-2xl p-7 hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  {p.tag && <span className="text-primary font-medium">{p.tag}</span>}
                  {p.published_at && <span>· {new Date(p.published_at).toLocaleDateString()}</span>}
                </div>
                <h2 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">{p.title}</h2>
                {p.excerpt && <p className="text-sm text-muted-foreground">{p.excerpt}</p>}
                <div className="mt-5 flex items-center text-sm text-primary"><ArrowUpRight className="w-4 h-4 ml-auto" /></div>
              </Link>
            ))}
            {!posts.length && (
              <div className="md:col-span-2 glass rounded-2xl p-12 text-center text-muted-foreground">
                Coming soon. New {category === "case_study" ? "case studies" : "articles"} land monthly.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function PostDetail({ basePath, category }: { basePath: string; category: "blog" | "case_study" }) {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    supabase.from("posts").select("*").eq("slug", slug).eq("category", category).eq("published", true)
      .maybeSingle()
      .then(({ data }) => { data ? setPost(data as Post) : setNotFound(true); });
  }, [slug, category]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <article className="container max-w-3xl">
          <Link to={basePath} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          {notFound && <p className="text-muted-foreground">Post not found.</p>}
          {post && (
            <>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                {post.tag && <span className="text-primary font-medium">{post.tag}</span>}
                {post.published_at && <span>· {new Date(post.published_at).toLocaleDateString()}</span>}
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">{post.title}</h1>
              {post.excerpt && <p className="text-lg text-muted-foreground mb-10">{post.excerpt}</p>}
              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed">
                {post.content}
              </div>
            </>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}

export const BlogList = () => <PostList category="blog" title="Insights" subtitle="From the VORQIX lab." basePath="/blog" />;
export const BlogDetail = () => <PostDetail basePath="/blog" category="blog" />;
export const CaseStudyList = () => <PostList category="case_study" title="Case studies" subtitle="Outcomes we've shipped." basePath="/case-studies" />;
export const CaseStudyDetail = () => <PostDetail basePath="/case-studies" category="case_study" />;
