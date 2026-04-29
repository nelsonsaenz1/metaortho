import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "MetaOrtho is committed to digital accessibility for all patients. WCAG 2.1 AA conformance is our standard.",
};

const headingClass =
  "text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4";
const paraClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]";

export default function AccessibilityStatementPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Accessibility
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Accessibility statement
          </h1>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <h2 className={headingClass}>Our commitment</h2>
          <p className={paraClass}>
            MetaOrtho is committed to ensuring digital accessibility for
            people with disabilities. We continually work to improve the
            user experience for everyone and we apply the relevant
            accessibility standards to do so.
          </p>

          <h2 className={headingClass}>Conformance status</h2>
          <p className={paraClass}>
            The Web Content Accessibility Guidelines (WCAG) define
            requirements for designers and developers to improve
            accessibility for people with disabilities. WCAG 2.1 defines
            three levels of conformance: A, AA, and AAA. MetaOrtho aims
            for <strong>WCAG 2.1 AA</strong> conformance across the
            patient-facing site and patient portal. We may have areas
            that fall short of full AA conformance &mdash; we work to
            close those gaps in every release.
          </p>

          <h2 className={headingClass}>What we do</h2>
          <p className={paraClass}>
            Our team uses semantic HTML, sufficient color contrast,
            keyboard navigability, descriptive alt text, captioned video
            where applicable, screen-reader-friendly form labels, and
            scalable typography. We test with assistive technology and
            run automated audits as part of our development workflow.
          </p>

          <h2 className={headingClass}>Reporting an accessibility issue</h2>
          <p className={paraClass}>
            If you encounter an accessibility issue on the MetaOrtho site
            or in the patient portal, please tell us. Email{" "}
            <a
              href="mailto:info@metaortho.com"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              info@metaortho.com
            </a>{" "}
            with the URL, a brief description of the issue, and the
            assistive technology you are using if applicable. We respond
            within 5 business days and work to resolve the issue as soon
            as we can.
          </p>

          <h2 className={headingClass}>Telehealth alternatives</h2>
          <p className={paraClass}>
            If a particular interface is not accessible to you, we will
            work with you to deliver the same care through an
            alternative communication channel &mdash; including phone,
            email, or other accessible options &mdash; so that
            accessibility never becomes a barrier to care.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-04-29.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
