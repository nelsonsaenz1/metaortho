import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import {
  getResourceBySlug,
  getAllResourceSlugs,
} from "@/content/resources";
import {
  CONSULT_PRICE_SUMMARY,
  BOOK_CONSULT_SPECIALTY_LABEL,
} from "@/lib/site-config";

export async function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.summary,
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            {resource.eyebrow}
          </p>
          <h1 className="text-[clamp(2.25rem,5vw,3.25rem)] font-normal tracking-[-0.03em] mb-6 leading-tight">
            {resource.title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {resource.intro}
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          {resource.emergencyBanner && (
            <div className="rounded-[var(--radius-md)] border border-red-500/40 bg-red-50 p-5 mb-10 text-[14px] leading-relaxed text-red-900">
              <strong className="font-semibold">
                This is not for medical emergencies.
              </strong>{" "}
              If you think you&rsquo;re having an emergency, call 911 or go to
              the nearest emergency department.
            </div>
          )}

          {resource.emergencyBlock && (
            <div className="rounded-[var(--radius-lg)] border border-red-500/40 bg-red-50 p-7 mb-8">
              <h2 className="text-xl font-semibold text-red-900 mb-3 tracking-[-0.01em]">
                {resource.emergencyBlock.heading}
              </h2>
              {resource.emergencyBlock.intro && (
                <p className="text-[15px] text-red-900/90 leading-relaxed mb-4">
                  {resource.emergencyBlock.intro}
                </p>
              )}
              <ul className="space-y-2.5">
                {resource.emergencyBlock.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-[15px] text-red-900/90 leading-relaxed"
                  >
                    <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {resource.emergencyBlock.footer && (
                <p className="text-[14px] text-red-900 font-medium leading-relaxed mt-4">
                  {resource.emergencyBlock.footer}
                </p>
              )}
            </div>
          )}

          {resource.promptCareBlock && (
            <div className="rounded-[var(--radius-lg)] border border-amber-400/50 bg-amber-50 p-7 mb-10">
              <h2 className="text-lg font-semibold text-amber-900 mb-3 tracking-[-0.01em]">
                {resource.promptCareBlock.heading}
              </h2>
              {resource.promptCareBlock.intro && (
                <p className="text-[15px] text-amber-900/90 leading-relaxed mb-4">
                  {resource.promptCareBlock.intro}
                </p>
              )}
              <ul className="space-y-2.5">
                {resource.promptCareBlock.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-[15px] text-amber-900/90 leading-relaxed"
                  >
                    <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-10">
            {resource.sections.map((section, i) => (
              <div key={i}>
                <h2
                  className="text-2xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)] mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p, j) => (
                  <p
                    key={j}
                    className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-3"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2.5 mt-3">
                    {section.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-2.5 text-[15px] text-[var(--color-text-secondary)] leading-relaxed"
                      >
                        <svg
                          className="w-4 h-4 text-[var(--color-success)] flex-shrink-0 mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>
                          {b.term && (
                            <strong className="text-[var(--color-text-heading)] font-semibold">
                              {b.term}{" "}
                            </strong>
                          )}
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {resource.keyTakeaways && (
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-cream)] p-7 mt-12">
              <h2 className="text-lg font-semibold text-[var(--color-text-heading)] mb-4 tracking-[-0.01em]">
                Key takeaways
              </h2>
              <ul className="space-y-2.5">
                {resource.keyTakeaways.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-[15px] text-[var(--color-text-secondary)] leading-relaxed"
                  >
                    <svg
                      className="w-4 h-4 text-[var(--color-accent-primary)] flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer + sources */}
          <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
            <p className="text-[13px] text-[var(--color-text-tertiary)] leading-relaxed">
              This page is for general education and is not medical advice, a
              diagnosis, or a treatment plan. It doesn&rsquo;t replace care from
              your own clinician. Always consult a licensed clinician before
              starting, stopping, or changing any medication.
              {resource.citesSources && (
                <>
                  {" "}
                  The clinical claims referenced across this site are sourced on
                  our{" "}
                  <Link
                    href="/legal/sources"
                    className="text-[var(--color-accent-primary)] font-semibold underline underline-offset-2"
                  >
                    Sources &amp; citations
                  </Link>{" "}
                  page.
                </>
              )}
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/assessment" variant="dark" size="lg">
              Get my free GLP-1 profile
            </Button>
            <Button href="/book" variant="outline" size="lg">
              {BOOK_CONSULT_SPECIALTY_LABEL}
            </Button>
          </div>
          <p className="mt-4 text-center text-[13px] text-[var(--color-text-tertiary)]">
            The profile is free. Consults are cash-pay: {CONSULT_PRICE_SUMMARY}.
          </p>

          <p className="mt-10 text-center">
            <Link
              href="/resources"
              className="text-[14px] font-semibold text-[var(--color-accent-primary)] underline underline-offset-2 hover:opacity-80 transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-out)]"
            >
              ← All resources
            </Link>
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
