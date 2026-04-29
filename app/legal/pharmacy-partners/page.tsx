import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Pharmacy &amp; Fulfillment Partners",
  description:
    "MetaOrtho discloses every pharmacy and fulfillment partner involved in delivering care, including compounding pharmacies and supplement fulfillment.",
};

export default function PharmacyPartnersPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Pharmacy partners
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Pharmacy &amp; fulfillment partners
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            MetaOrtho works with licensed, accredited partner pharmacies for
            any medication we prescribe and any product we fulfill. Below is
            the complete list of partners and their accreditation status.
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-6">
            Compounding pharmacy partners
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            MetaOrtho prescribes compounded GLP-1 medications when clinically
            appropriate. Compounded medications are prepared by licensed
            compounding pharmacies under the supervision of state pharmacy
            boards and, where applicable, FDA oversight. We disclose every
            compounding partner here.
          </p>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 mb-8">
            <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
              <span className="font-mono text-[13px]">
                [PHARMACY PARTNER NAME — TO BE PUBLISHED]
              </span>
              <br />
              State licensure: <span className="font-mono text-[13px]">[TO BE PUBLISHED]</span>
              <br />
              Pharmacy classification: <span className="font-mono text-[13px]">[503A or 503B — TO BE PUBLISHED]</span>
              <br />
              LegitScript / NABP accreditation: <span className="font-mono text-[13px]">[TO BE PUBLISHED — partner has committed to apply for LegitScript certification within 60 days of MetaOrtho&rsquo;s certification]</span>
            </p>
          </div>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            Important context on compounded GLP-1 medications
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            Compounded medications are not FDA-approved drugs. They are
            prepared on a per-patient basis from FDA-approved active
            pharmaceutical ingredients, and are an option that licensed
            clinicians may use in specific clinical situations &mdash; for
            example, when a brand-name medication is on FDA shortage list,
            when a patient requires a customized formulation that is not
            commercially available, or when the prescriber otherwise
            determines a compounded preparation is medically appropriate.
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            Whether you receive a compounded GLP-1 or an FDA-approved
            branded medication is a decision made between you and your
            MetaOrtho clinician based on your individual medical situation,
            insurance, and current availability. MetaOrtho does not promote
            compounded medications as a substitute for FDA-approved drugs in
            general advertising.
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            Retail / branded prescription pharmacy
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            For FDA-approved branded medications, MetaOrtho transmits
            prescriptions electronically to the retail pharmacy of the
            patient&rsquo;s choice using a HIPAA-compliant e-prescribing
            service. MetaOrtho does not own or operate a retail pharmacy and
            does not receive financial benefit from the patient&rsquo;s
            choice of retail pharmacy.
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            Lab fulfillment
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            Labs and DEXA scans ordered through MetaOrtho are fulfilled by
            partner laboratories. Quest Diagnostics and Labcorp are the
            current default partners. Coverage and out-of-pocket cost vary
            by plan; we recommend confirming with your insurer.
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            Supplement fulfillment
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            MetaOrtho-curated supplement bundles are not yet generally
            available. When this product launches, the manufacturer and
            fulfillment partner for each supplement will be disclosed on
            this page and on the supplement product page.
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            Controlled substances
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            MetaOrtho does not prescribe controlled substances.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-04-29. Pharmacy partner details marked
            &ldquo;TO BE PUBLISHED&rdquo; will be filled in once contracts
            are finalized; until then, no medication is being dispensed via
            those channels.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
