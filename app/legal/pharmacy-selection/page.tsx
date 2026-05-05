import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Pharmacy Selection",
  description:
    "MetaOrtho patients choose their own pharmacy. Prescriptions are transmitted to the licensed U.S. pharmacy you select. We do not have preferred or partner pharmacies.",
};

export default function PharmacySelectionPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Pharmacy selection
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            You choose your pharmacy.
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            MetaOrtho transmits your prescription to the licensed U.S.
            pharmacy you select. We do not maintain preferred, partner, or
            recommended pharmacies, and we do not receive any financial
            benefit from your choice of pharmacy.
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-6">
            How it works
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            At intake, and again before each prescription is written, you
            tell us where you would like your medication filled. Your
            options include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-secondary)] text-[15px] leading-relaxed mb-6">
            <li>Your local retail pharmacy (for example, CVS or Walgreens)</li>
            <li>A specialty pharmacy your insurance plan prefers (for example, CVS Specialty, Walgreens Specialty, Accredo, Optum Specialty)</li>
            <li>A mail-order pharmacy your plan offers</li>
            <li>Any other licensed U.S. pharmacy you choose</li>
          </ul>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            Your prescription is transmitted electronically to the pharmacy
            you select using a HIPAA-compliant e-prescribing service. The
            pharmacy then dispenses the medication and bills you or your
            insurance directly. MetaOrtho does not own or operate any
            pharmacy and does not add a markup to your medication.
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            What MetaOrtho does not do
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-secondary)] text-[15px] leading-relaxed mb-6">
            <li>We do not maintain preferred, partner, or recommended pharmacies.</li>
            <li>We do not receive payment, rebates, or referral fees from any pharmacy.</li>
            <li>We do not prescribe compounded GLP-1 medications.</li>
            <li>We do not prescribe controlled substances.</li>
            <li>We do not influence drug pricing, availability, or insurance coverage.</li>
          </ul>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            Branded GLP-1 medications only
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            MetaOrtho prescribes FDA-approved branded GLP-1 medications
            (for example, Wegovy and Zepbound) when clinically appropriate.
            We do not prescribe compounded GLP-1 formulations.
          </p>
          <p className="text-[11px] text-[var(--color-text-tertiary)] leading-relaxed mb-4 italic">
            Wegovy, Ozempic, Mounjaro, and Zepbound are registered trademarks
            of their respective manufacturers. MetaOrtho is not affiliated
            with, endorsed by, or sponsored by the manufacturers of these
            medications.
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            Lab fulfillment
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            Labs and DEXA scans ordered through MetaOrtho can be fulfilled
            at the laboratory of your choice. Quest Diagnostics and Labcorp
            are common options that most patients find convenient, but you
            may use any in-network or accredited laboratory. Coverage and
            out-of-pocket cost vary by plan; we recommend confirming with
            your insurer.
          </p>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-6">
            Supplements
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            MetaOrtho-curated supplement bundles are not yet generally
            available. When this product launches, the manufacturer and
            fulfillment vendor for each supplement will be disclosed on the
            supplement product page along with required FDA-related
            statements.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-05-05.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
