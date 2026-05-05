import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { licensedStatesCopy } from "@/lib/states";

export const metadata: Metadata = {
  title: "Grievances &amp; Complaints",
  description:
    "How to file a complaint with MetaOrtho or escalate a concern to your state medical board, HHS OCR, or the FTC.",
};

const headingClass =
  "text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4";
const paraClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]";

const stateBoardLookup =
  "https://www.fsmb.org/contact-a-state-medical-board/";

export default function GrievancesPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Grievances
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            How to file a complaint
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            We take patient feedback seriously. If something has gone
            wrong, here are the ways you can let us know &mdash; and
            escalate beyond us if you choose.
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <h2 className={headingClass}>1. Tell MetaOrtho directly</h2>
          <p className={paraClass}>
            The fastest way to resolve a concern is to tell us. Email{" "}
            <a
              href="mailto:info@metaortho.com"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              info@metaortho.com
            </a>{" "}
            with a description of what happened, when it happened, and
            what outcome you would like. We acknowledge complaints within
            3 business days and respond substantively within 30 days. If
            we need longer, we will tell you why and when to expect a
            full response.
          </p>
          <p className={paraClass}>
            We will not retaliate against any patient or member of the
            public for filing a complaint or raising a concern.
          </p>

          <h2 className={headingClass}>
            2. Your state medical board (clinical concerns)
          </h2>
          <p className={paraClass}>
            If your concern is about the conduct of a MetaOrtho clinician
            (the practice of medicine, prescribing, professional behavior),
            you can file a complaint with your state medical board.
          </p>
          <p className={paraClass}>
            Use the Federation of State Medical Boards directory to find
            the medical board in your state:
          </p>
          <p className={paraClass}>
            <a
              href={stateBoardLookup}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              fsmb.org &mdash; Contact a state medical board →
            </a>
          </p>
          <p className={paraClass}>
            MetaOrtho is currently licensed in {licensedStatesCopy()}.
            Your residential state board is the appropriate board for
            clinical complaints involving your care.
          </p>

          <h2 className={headingClass}>
            3. HHS Office for Civil Rights (HIPAA &amp; privacy)
          </h2>
          <p className={paraClass}>
            If your concern is about MetaOrtho&rsquo;s privacy practices,
            handling of your health information, or a possible HIPAA
            violation, you can file a complaint with HHS OCR:
          </p>
          <ul className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px] list-disc pl-5 space-y-1.5">
            <li>
              Online:{" "}
              <a
                href="https://www.hhs.gov/hipaa/filing-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent-primary)] underline hover:no-underline"
              >
                hhs.gov/hipaa/filing-a-complaint
              </a>
            </li>
            <li>Phone: 1-800-368-1019</li>
          </ul>
          <p className={paraClass}>
            HIPAA complaints must generally be filed within 180 days of
            the event.
          </p>

          <h2 className={headingClass}>
            4. Federal Trade Commission (advertising or billing)
          </h2>
          <p className={paraClass}>
            If your concern is about MetaOrtho&rsquo;s advertising,
            testimonials, or billing practices, the Federal Trade
            Commission accepts consumer reports:
          </p>
          <p className={paraClass}>
            <a
              href="https://reportfraud.ftc.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              reportfraud.ftc.gov →
            </a>
          </p>

          <h2 className={headingClass}>
            5. State pharmacy boards (dispensing concerns)
          </h2>
          <p className={paraClass}>
            If your concern is specifically about how a medication was
            dispensed by the pharmacy you selected, the state board of
            pharmacy in that pharmacy&rsquo;s state regulates dispensing
            and pharmacist conduct. See our{" "}
            <a
              href="/legal/pharmacy-selection"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              pharmacy selection
            </a>{" "}
            page for context on how MetaOrtho prescribes (we do not
            prescribe compounded GLP-1 medications or controlled
            substances).
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-05-05.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
