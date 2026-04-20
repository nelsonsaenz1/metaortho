"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

// ============================================================
// BOOKING INTEGRATION
// Fill in ONE of these to activate the live booking embed.
// Leave all empty to show the "coming soon" placeholder.
// ============================================================
const ACUITY_OWNER_ID = ""; // e.g. "12345678"
const SIMPLEPRACTICE_URL = ""; // e.g. "https://metaortho.clientsecure.me"
const HEALTHIE_URL = ""; // e.g. "https://metaortho.gethealthie.com/appointments"

export default function BookContent() {
  const hasAcuity = ACUITY_OWNER_ID.length > 0;
  const hasSimplePractice = SIMPLEPRACTICE_URL.length > 0;
  const hasHealthie = HEALTHIE_URL.length > 0;
  const hasBooking = hasAcuity || hasSimplePractice || hasHealthie;

  return (
    <>
      {/* Header */}
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Get started
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Book your MSK assessment
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Your comprehensive musculoskeletal evaluation starts here. 30 minutes. Secure video. Board-certified orthopedic surgeon review.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <SectionWrapper bg="primary">
        <div className="max-w-4xl mx-auto">
          {hasBooking ? (
            <div className="bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border border-[var(--color-border)] overflow-hidden">
              {hasAcuity && (
                <iframe src={`https://app.acuityscheduling.com/schedule.php?owner=${ACUITY_OWNER_ID}`} title="Schedule" width="100%" height="800" className="border-0" />
              )}
              {hasSimplePractice && (
                <iframe src={SIMPLEPRACTICE_URL} title="Schedule" width="100%" height="800" className="border-0" />
              )}
              {hasHealthie && (
                <iframe src={HEALTHIE_URL} title="Schedule" width="100%" height="800" className="border-0" />
              )}
            </div>
          ) : (
            <div className="text-center bg-[var(--color-bg-cream)] rounded-[var(--radius-xl)] p-16 border border-[var(--color-border)]">
              <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--color-accent-light)] flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--color-accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h2 className="text-2xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)] mb-4">
                Online booking coming soon
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
                We&apos;re setting up our scheduling system. In the meantime, reach out directly and we&apos;ll get you booked.
              </p>
              <Button href="mailto:info@metaortho.com" size="lg" variant="dark">
                Email Us — info@metaortho.com
              </Button>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* What to Expect */}
      <SectionWrapper bg="cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.02em] text-center mb-14">What to expect</h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "Complete intake form", description: "After booking, you'll receive a secure intake form covering your GLP-1 history, current medications, weight loss timeline, and symptoms." },
              { step: "2", title: "30-minute video assessment", description: "Meet with our clinical team via secure video. We'll review your history, assess musculoskeletal risk factors, and discuss your concerns." },
              { step: "3", title: "Lab & imaging orders", description: "We'll order baseline labs (vitamin D, metabolic panel, uric acid, CBC) and a DEXA scan through Quest/Labcorp/imaging centers near you." },
              { step: "4", title: "Personalized plan within 48 hours", description: "Dr. Saenz reviews your assessment and results, then creates a comprehensive plan: nutrition, supplements, exercise, and prescriptions." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-bg-dark)] text-white flex items-center justify-center font-semibold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-heading)] mb-1.5 font-[var(--font-body)] tracking-[-0.01em] text-lg">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
