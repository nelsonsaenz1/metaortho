import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "What MetaOrtho refunds, what isn&rsquo;t refundable, and how to request a refund.",
};

const headingClass =
  "text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4";
const paraClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]";

export default function RefundPolicyPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Refund policy
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Refund policy
          </h1>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <h2 className={headingClass}>Telehealth visit fees</h2>
          <p className={paraClass}>
            <strong>Before your visit:</strong> If you cancel a scheduled
            visit at least 24 hours in advance, you receive a full refund
            of the visit fee. Cancellations within 24 hours are
            non-refundable.
          </p>
          <p className={paraClass}>
            <strong>If we cancel:</strong> If MetaOrtho cancels or
            reschedules a visit for any reason &mdash; including clinician
            unavailability or technical problems &mdash; you receive a
            full refund or a rescheduled visit at your choice.
          </p>
          <p className={paraClass}>
            <strong>After your visit:</strong> Completed visits are
            generally non-refundable. If you believe a visit was billed in
            error, contact us within 30 days and we&rsquo;ll review it.
          </p>

          <h2 className={headingClass}>Subscription / monitoring plans</h2>
          <p className={paraClass}>
            Monthly monitoring subscriptions can be canceled at any time
            from your patient portal or by emailing us. When you cancel:
          </p>
          <ul className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px] list-disc pl-5 space-y-1.5">
            <li>You will not be charged for the next billing cycle.</li>
            <li>Your subscription remains active through the end of the cycle you have already paid for.</li>
            <li>The current cycle&rsquo;s payment is not pro-rated. We do not refund partial months.</li>
          </ul>

          <h2 className={headingClass}>Supplement bundles</h2>
          <p className={paraClass}>
            <strong>Unopened products:</strong> Unopened, sealed supplement
            products may be returned within 30 days of delivery for a full
            refund (less return shipping). Contact us to start a return.
          </p>
          <p className={paraClass}>
            <strong>Opened or used products:</strong> For health and safety
            reasons, opened supplement products are non-refundable.
          </p>

          <h2 className={headingClass}>Lab and imaging fees</h2>
          <p className={paraClass}>
            Labs and DEXA scans are billed by the lab partner (Quest
            Diagnostics, Labcorp, or the imaging center) directly or by
            your insurer. MetaOrtho does not collect lab fees and cannot
            issue refunds for them. Lab refund or billing questions should
            go to the lab or your insurer.
          </p>

          <h2 className={headingClass}>Compounded medications</h2>
          <p className={paraClass}>
            Compounded medications are prepared per-patient and cannot be
            returned for safety reasons. If a compounded medication is
            damaged in shipping or arrives spoiled, contact us within 24
            hours of receipt and we will work with the compounding
            pharmacy to resolve the issue.
          </p>

          <h2 className={headingClass}>How to request a refund</h2>
          <p className={paraClass}>
            Email{" "}
            <a
              href="mailto:info@metaortho.com"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              info@metaortho.com
            </a>{" "}
            with your order or visit confirmation, the reason for the
            refund request, and the date of the transaction. We respond
            within 3 business days. Approved refunds are processed back to
            the original payment method within 5-10 business days.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-04-29.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
