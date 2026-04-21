import type { Metadata } from "next";
import Link from "next/link";
import { allPosts } from "@/content/blog";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Blog — GLP-1 Musculoskeletal Health",
  description:
    "Expert articles on GLP-1 side effects, muscle loss, bone density, gout, and musculoskeletal health from Dr. Jay M. Saenz, MD, board-certified orthopedic surgeon.",
};

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            MetaOrtho Blog
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            GLP-1 musculoskeletal health
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Evidence-based articles from a board-certified orthopedic surgeon on protecting your bones, muscles, and joints during GLP-1 weight loss.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="space-y-6">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)] p-8 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 transition-[box-shadow,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] motion-reduce:hover:translate-y-0 group-active:scale-[0.995] motion-reduce:group-active:scale-100">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)] group-hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    {post.title}
                  </h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text-tertiary)]">
                    <span className="font-medium text-[var(--color-text-primary)]">{post.author}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]" />
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]" />
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
