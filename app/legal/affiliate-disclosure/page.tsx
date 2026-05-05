import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Affiliate &amp; Commercial Disclosures",
  description:
    "MetaOrtho discloses every commercial relationship that could influence what we recommend.",
};

const headingClass =
  "text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4";
const paraClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]";

export default function AffiliateDisclosurePage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Affiliate disclosure
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Affiliate &amp; commercial disclosures
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            We disclose every commercial relationship that could influence
            what we recommend, in plain language, in the spirit of FTC
            Endorsement Guides (16 CFR Part 255).
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <h2 className={headingClass}>What this page covers</h2>
          <p className={paraClass}>
            MetaOrtho is a clinical practice. Our primary revenue is from
            patient visit fees and from our supplement bundle product when
            it launches. The relationships listed below are the commercial
            ties that exist outside of those direct patient transactions.
            We update this page when relationships change.
          </p>

          <h2 className={headingClass}>GLP-1 medication manufacturers</h2>
          <p className={paraClass}>
            MetaOrtho has <strong>no</strong> commercial or financial
            relationship with the manufacturers of Ozempic, Wegovy,
            Mounjaro, Zepbound, Saxenda, Rybelsus, or any other branded
            GLP-1 medication. We are not paid by, sponsored by, or
            otherwise affiliated with these companies.
          </p>

          <h2 className={headingClass}>Pharmacies</h2>
          <p className={paraClass}>
            MetaOrtho does <strong>not</strong> maintain preferred,
            partner, or recommended pharmacies. Patients select the
            licensed U.S. pharmacy where their prescription will be filled,
            and MetaOrtho receives no payment, rebate, or referral fee from
            any pharmacy. See our{" "}
            <a
              href="/legal/pharmacy-selection"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              pharmacy selection
            </a>{" "}
            page for details. MetaOrtho does not prescribe compounded GLP-1
            medications or controlled substances.
          </p>

          <h2 className={headingClass}>Laboratories</h2>
          <p className={paraClass}>
            Patients may use any in-network or accredited laboratory for
            labs and DEXA scans ordered through MetaOrtho. Quest Diagnostics
            and Labcorp are commonly chosen options. MetaOrtho receives no
            markup or commission on labs or imaging. Patients are billed
            directly by the lab and/or their insurer.
          </p>

          <h2 className={headingClass}>Supplement product</h2>
          <p className={paraClass}>
            MetaOrtho is developing a physician-curated supplement bundle.
            When that product launches, MetaOrtho will earn revenue from
            sales of the bundle directly to patients. The supplements
            recommended in the bundle will be selected on clinical grounds
            (evidence base, dose, quality), not on margin. Manufacturer and
            fulfillment partner details will be disclosed on the supplement
            product page when launched.
          </p>

          <h2 className={headingClass}>Marketing partners</h2>
          <p className={paraClass}>
            MetaOrtho has no revenue-share or affiliate marketing
            relationships at this time. If we begin using affiliate
            marketing &mdash; for example, sponsored content, paid
            influencer programs, or referral revenue share &mdash; we will
            disclose the relationship here and (where applicable) inline on
            the asset itself.
          </p>

          <h2 className={headingClass}>Patient testimonials and endorsements</h2>
          <p className={paraClass}>
            MetaOrtho is a pre-launch practice and does not yet publish
            patient testimonials. When we do, every testimonial will (a) be
            published only with written authorization from the patient,
            (b) reflect typical experience or include a clear, prominent
            atypical-result disclosure, (c) disclose any compensation or
            other consideration the testifier received.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-04-29.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
