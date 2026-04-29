import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MetaOrtho. Practice address, email, and how to reach our Privacy Officer or compliance contact.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Contact
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            How to reach MetaOrtho
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            For clinical care questions, please log into your patient portal
            and message your care team. For everything else, the contacts
            below are the right starting points.
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-[var(--radius-lg)] border border-red-200 bg-red-50 p-6 mb-10">
            <p className="text-sm font-semibold text-red-900 mb-1">
              Not for medical emergencies
            </p>
            <p className="text-[14px] text-red-900 leading-relaxed">
              MetaOrtho is not for medical emergencies. If you are
              experiencing a medical emergency, call 911 or go to your
              nearest emergency room.
            </p>
          </div>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4">
            Practice address
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 text-[15px]">
            MetaOrthopedics, PLLC
            <br />
            3096 Chapel Woods Cove
            <br />
            Germantown, TN 38139
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4">
            General inquiries
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 text-[15px]">
            <a
              href="mailto:info@metaortho.com"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              info@metaortho.com
            </a>
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4">
            Phone
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 text-[15px]">
            <span className="font-mono text-[13px]">
              [TO BE PUBLISHED — staffed phone line pending setup]
            </span>
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4">
            Privacy Officer
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-2 text-[15px]">
            For HIPAA privacy questions, requests to access or amend your
            records, or to report a privacy concern:
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 text-[15px]">
            Dr. Jay M. Saenz, MD &mdash; Privacy Officer
            <br />
            <a
              href="mailto:info@metaortho.com"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              info@metaortho.com
            </a>{" "}
            (dedicated <span className="font-mono text-[13px]">privacy@metaortho.com</span> mailbox pending)
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4">
            Compliance and grievances
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-2 text-[15px]">
            To file a complaint about MetaOrtho&rsquo;s services or
            advertising, see our{" "}
            <a
              href="/legal/grievances"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              grievance process
            </a>
            .
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
