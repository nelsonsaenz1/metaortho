import type { Metadata } from "next";
import Link from "next/link";
import { allResources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources — GLP-1 Education",
  description:
    "Plain-language, source-backed guides on GLP-1 treatment: what to expect, safety warning signs, DEXA and body composition, protein and strength, and lab monitoring.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Resources
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            GLP-1 education, in plain language
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Short, source-backed guides to help you understand GLP-1 treatment
            and protect your muscle and bone along the way. These are
            educational &mdash; not medical advice, a diagnosis, or a treatment
            plan.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 gap-6">
            {allResources.map((r) => (
              <Link
                key={r.slug}
                href={`/resources/${r.slug}`}
                className="block group h-full"
              >
                <article className="h-full bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)] p-7 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 transition-[box-shadow,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] motion-reduce:hover:translate-y-0 group-active:scale-[0.995] motion-reduce:group-active:scale-100 flex flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-primary)] mb-3">
                    {r.eyebrow}
                  </p>
                  <h2
                    className="text-xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)] group-hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)] mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {r.title}
                  </h2>
                  <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-5 flex-1">
                    {r.summary}
                  </p>
                  <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-text-tertiary)]">
                    {r.readingTime}
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
