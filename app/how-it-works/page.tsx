import type { Metadata } from "next";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import JourneyTimeline from "./JourneyTimeline";
import {
  CONSULT_PRICE_SUMMARY,
  INITIAL_CONSULT_PRICE_LABEL,
  FOLLOW_UP_PRICE_LABEL,
  BOOK_CONSULT_SPECIALTY_LABEL,
} from "@/lib/site-config";
import { licensedStatesCopy } from "@/lib/states";

export const metadata: Metadata = {
  title: "What Happens Next",
  description: `How MetaOrtho works, step by step: start with a free GLP-1 Management Profile, then a cash-pay specialty consult (${CONSULT_PRICE_SUMMARY}) where a clinician is licensed. Physician-led telehealth.`,
};

const steps = [
  {
    title: "Complete your free GLP-1 Management Profile",
    body: "Answer structured questions about your GLP-1 status, goals, medication and dose history, side effects, weight-loss pace, nutrition, strength, labs, and body-composition concerns. It takes about five minutes and is free.",
    meta: "Free · ~5 minutes · educational, not a diagnosis",
  },
  {
    title: "Review your profile preview",
    body: "Right away you'll see a summary of your management complexity — Standard, Enhanced, or High-Risk — and a preview of what a specialty consult would focus on for you. This is educational information to help you decide on next steps.",
    meta: "Instant",
  },
  {
    title: "Book an initial specialty consult where available",
    body: `If a clinician is licensed in your state, you can book a cash-pay specialty consult. If we're not yet live in your state, you can join the notify list and we'll reach out as we expand. We're currently licensed in ${licensedStatesCopy()}.`,
    meta: `${INITIAL_CONSULT_PRICE_LABEL} initial consult`,
  },
  {
    title: "Complete secure intake and consents",
    body: "Before your visit you'll finish your intake forms, medical history, and consents in your MetaOrtho patient portal — secure and HIPAA-compliant, powered by Healthie. Your personal health information is kept in that protected portal.",
    meta: "In the patient portal",
  },
  {
    title: "Meet your physician by video",
    body: "On a private telehealth visit, a board-certified physician reviews your GLP-1 plan, side effects, labs, monitoring needs, and goals — and, when clinically appropriate, starts, adjusts, or prescribes treatment. You leave with clear, individualized next steps.",
    meta: "Secure video telehealth",
  },
  {
    title: "Receive your written treatment plan in the portal",
    body: "After the visit, your physician documents your individualized treatment plan and next steps in your MetaOrtho patient portal, so you have everything in writing and can revisit it any time.",
    meta: "In the patient portal",
  },
  {
    title: "Complete labs, DEXA, or body-composition testing if recommended",
    body: "When it's clinically appropriate, your clinician may recommend bloodwork or a DEXA / body-composition scan to monitor muscle and bone over time. These are ordered only when they add value to your care.",
    meta: "Only when clinically appropriate",
  },
  {
    title: "Follow up and monitor over time",
    body: "Follow-up consults let your clinician adjust your plan as your treatment, labs, body composition, and goals evolve. You stay in the driver's seat, with specialty guidance along the way.",
    meta: `${FOLLOW_UP_PRICE_LABEL} follow-up consult`,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            What happens next
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            From free profile to a focused consult
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            MetaOrtho is physician-led specialty care for people starting,
            taking, or questioning GLP-1 treatment. Here&rsquo;s exactly what
            the path looks like — from your first free profile to ongoing
            monitoring — all from home, via secure telehealth.
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-4xl mx-auto">
          <JourneyTimeline steps={steps} />

          {/* CTAs */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-3">
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
          <p className="mt-8 text-center text-[12px] text-[var(--color-text-tertiary)] leading-relaxed max-w-xl mx-auto">
            MetaOrtho specialty telehealth isn&rsquo;t a substitute for
            emergency care — if you&rsquo;re having an emergency, call 911.
            Clinical claims are sourced on our{" "}
            <Link
              href="/legal/sources"
              className="text-[var(--color-accent-primary)] font-semibold underline underline-offset-2"
            >
              Sources &amp; citations
            </Link>{" "}
            page.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
