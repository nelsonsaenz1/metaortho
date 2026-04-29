import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Medical Team",
  description:
    "Meet the licensed clinicians who provide care at MetaOrtho. Physician-led, board-certified, and credentialed in every state we serve.",
};

export default function MedicalTeamPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Medical team
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            The licensed clinicians who care for you
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            MetaOrtho is a physician-led telemedicine practice. Every patient
            is cared for by a clinician licensed in their state of residence.
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-6">
            Medical Director
          </h2>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-8 mb-8">
            <h3 className="text-xl font-semibold text-[var(--color-text-heading)] mb-1">
              Jay M. Saenz, MD
            </h3>
            <p className="text-[var(--color-text-tertiary)] text-sm mb-4">
              Founder &amp; Medical Director · Board-Certified Orthopedic Surgeon
            </p>
            <dl className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed space-y-2 mb-4">
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <dt className="font-semibold text-[var(--color-text-heading)] sm:w-44">
                  Board certification
                </dt>
                <dd>American Board of Orthopaedic Surgery</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <dt className="font-semibold text-[var(--color-text-heading)] sm:w-44">
                  NPI
                </dt>
                <dd>
                  <span className="font-mono text-[13px]">1235140211</span>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <dt className="font-semibold text-[var(--color-text-heading)] sm:w-44">
                  State licenses
                </dt>
                <dd>
                  <ul className="space-y-1">
                    <li>
                      Tennessee &mdash; License No.{" "}
                      <span className="font-mono text-[13px]">39775</span>{" "}
                      (Orthopaedic Surgery; valid through July 31, 2027)
                    </li>
                    <li className="text-[var(--color-text-tertiary)] text-[13px]">
                      Additional state licenses will be listed here as each is
                      verified by operations.
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">
              Dr. Saenz founded MetaOrtho after years of treating patients
              whose musculoskeletal health was deteriorating during rapid
              weight loss on GLP-1 medications &mdash; without anyone
              monitoring it. MetaOrtho is the practice he wished existed for
              his own patients.
            </p>
          </div>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            Additional clinicians
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px] mb-4">
            As MetaOrtho expands across additional licensed states,
            additional MDs, nurse practitioners, and physician assistants
            will join the practice. Every new clinician will be listed on
            this page with their credentials, board certifications, NPI, and
            the state(s) they cover, before they see any patient.
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            How we match you with a clinician
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px] mb-4">
            At intake, MetaOrtho verifies the state in which you live. You
            are then matched with a clinician who is licensed to deliver
            care in that state. If your clinician changes &mdash; for
            example, when you move &mdash; we will tell you and document the
            change in your patient record.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-10">
            Updated 2026-04-29.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
