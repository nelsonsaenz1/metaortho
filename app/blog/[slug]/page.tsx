import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/content/blog";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Board-Certified Orthopedic Surgeon",
    },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "MetaOrthopedics",
      url: "https://metaortho.com",
    },
  };

  // Simple markdown-like rendering with premium typography
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-2xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)] mt-12 mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="text-xl font-semibold text-[var(--color-text-heading)] mt-8 mb-3 font-[var(--font-body)] tracking-[-0.01em]"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("- **")) {
        const parts = line.replace("- **", "").split("**");
        return (
          <li key={i} className="ml-4 mb-2 text-[var(--color-text-secondary)] leading-relaxed">
            <strong className="text-[var(--color-text-primary)]">{parts[0]}</strong>
            {parts.slice(1).join("")}
          </li>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="ml-4 mb-2 text-[var(--color-text-secondary)] leading-relaxed">
            {line.replace("- ", "")}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="ml-4 mb-2 text-[var(--color-text-secondary)] list-decimal leading-relaxed">
            {line.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
          </li>
        );
      }
      if (line.startsWith("---")) {
        return <hr key={i} className="my-10 border-[var(--color-border)]" />;
      }
      if (line.startsWith("| ")) {
        return null;
      }
      if (line.trim() === "") {
        return <div key={i} className="h-4" />;
      }
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--color-text-heading)]">$1</strong>')
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
      return (
        <p
          key={i}
          className="text-[var(--color-text-secondary)] leading-relaxed mb-2"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Header */}
        <section className="bg-[var(--color-bg-cream)] pt-12 pb-16">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.03em] leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-tertiary)]">
              <span className="font-medium text-[var(--color-text-primary)]">{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]" />
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
            {renderContent(post.content)}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--color-bg-cream)] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
            <h3 className="text-2xl font-normal tracking-[-0.02em] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Concerned about your musculoskeletal health?
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto leading-relaxed">
              Book a comprehensive MSK assessment with MetaOrtho. Expert orthopedic care, all via telehealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/book" variant="dark" size="lg">
                Book Assessment
              </Button>
              <Button href="/assessment" variant="outline" size="lg">
                Take Free Risk Quiz
              </Button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
