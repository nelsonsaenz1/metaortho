import type { Metadata } from "next";
import Link from "next/link";
import {
  STATES,
  LICENSED_STATES,
  PENDING_STATES,
  LICENSED_COUNT,
  licensedStatesCopy,
} from "@/lib/states";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Licensed States",
  description: `MetaOrtho is a physician-led telemedicine practice currently licensed in ${licensedStatesCopy()}. See the full list and our coverage policy.`,
};

export default function LicensedStatesPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Licensed states
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Where MetaOrtho can see you
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            MetaOrtho is a telemedicine practice. Care is provided only by
            clinicians licensed in your state. We are currently licensed in{" "}
            <strong>{licensedStatesCopy()}</strong> with additional states
            pending.
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-6">
            Currently licensed
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6 text-[15px] text-[var(--color-text-secondary)] mb-12">
            {LICENSED_STATES.map((s) => (
              <li key={s.code}>{s.name}</li>
            ))}
          </ul>

          {PENDING_STATES.length > 0 && (
            <>
              <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-6">
                Pending licensure
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
                MetaOrtho is in the process of obtaining licensure in:
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6 text-[15px] text-[var(--color-text-secondary)] mb-12">
                {PENDING_STATES.map((s) => (
                  <li key={s.code}>{s.name}</li>
                ))}
              </ul>
            </>
          )}

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-6">
            If you live in a state we don&rsquo;t yet serve
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            MetaOrtho physicians and nurse practitioners are licensed to
            practice medicine via telehealth in the states listed above. If
            you reside in a state where we are not licensed, we will not
            collect health information from you and we will not deliver
            telehealth care. You can join our waitlist and we&rsquo;ll
            notify you the moment we open in your state. In the meantime, we
            recommend speaking with your primary care doctor about
            musculoskeletal monitoring while you are on a GLP-1 medication.
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            <Link
              href="/book"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              Join the waitlist →
            </Link>
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            How we verify your state
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            Before we ask any health questions, we ask which state you live
            in. If we are not licensed in your state, we offer the waitlist
            and free educational resources, and the intake stops there. At
            scheduling, we additionally verify your residential address
            against your reported state. If you move to a state where we are
            no longer licensed to deliver care, we will help with records
            portability and finding an in-state provider.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-04-29. Total state coverage:{" "}
            {LICENSED_COUNT} licensed, {PENDING_STATES.length} pending,{" "}
            {STATES.length - LICENSED_STATES.length - PENDING_STATES.length}{" "}
            not yet served.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
