"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const headingClass =
  "text-[clamp(1.25rem,2vw,1.5rem)] font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-4";
const subheadingClass =
  "text-base font-semibold text-[var(--color-text-heading)] mt-6 mb-2 tracking-[-0.005em]";
const paraClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]";
const listClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px] list-disc pl-5 space-y-1.5";

export default function HIPAAContent() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            HIPAA
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Notice of Privacy Practices
          </h1>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Effective date: April 27, 2026
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <p className={`${paraClass} font-semibold uppercase tracking-[0.05em] text-[var(--color-text-heading)]`}>
            This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.
          </p>

          <p className={paraClass}>
            MetaOrthopedics, PLLC (&ldquo;MetaOrtho&rdquo;) is required by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) to maintain the privacy of your protected health information (PHI), provide you with this Notice of our legal duties and privacy practices, and follow the terms of the Notice currently in effect.
          </p>

          <h2 className={headingClass}>What is protected health information (PHI)?</h2>
          <p className={paraClass}>
            PHI is individually identifiable health information that relates to your past, present, or future physical or mental health condition, the provision of healthcare to you, or payment for healthcare services. This includes information created or received by MetaOrtho, such as medical records, lab results, DEXA scan data, treatment plans, and billing records.
          </p>

          <h2 className={headingClass}>How we may use and disclose your PHI</h2>
          <p className={paraClass}>
            We may use and disclose your PHI for the following purposes without your written authorization:
          </p>

          <h3 className={subheadingClass}>Treatment</h3>
          <p className={paraClass}>
            To provide, coordinate, or manage your healthcare. For example, sharing your DEXA results with your referring physician or coordinating lab orders with Quest Diagnostics.
          </p>

          <h3 className={subheadingClass}>Payment</h3>
          <p className={paraClass}>
            To bill and collect payment for services. For example, sending invoices or processing credit card payments through our payment processor.
          </p>

          <h3 className={subheadingClass}>Healthcare operations</h3>
          <p className={paraClass}>
            To support our business activities, including quality improvement, staff training, compliance audits, and business planning.
          </p>

          <h3 className={subheadingClass}>As required by law</h3>
          <p className={paraClass}>
            When required by federal, state, or local law, including public health reporting, abuse/neglect reporting, and responses to court orders.
          </p>

          <h3 className={subheadingClass}>Health and safety</h3>
          <p className={paraClass}>
            To prevent or lessen a serious and imminent threat to your health or safety or the health or safety of the public.
          </p>

          <h2 className={headingClass}>Uses and disclosures requiring your authorization</h2>
          <p className={paraClass}>
            We will obtain your written authorization before using or disclosing your PHI for:
          </p>
          <ul className={listClass}>
            <li>Marketing purposes (except for face-to-face communications and promotional gifts of nominal value)</li>
            <li>Sale of your PHI</li>
            <li>Most uses of psychotherapy notes (if applicable)</li>
            <li>Other uses and disclosures not described in this Notice</li>
          </ul>
          <p className={paraClass}>
            You may revoke your authorization at any time in writing, except to the extent we have already acted on it.
          </p>

          <h2 className={headingClass}>Your rights regarding your PHI</h2>

          <h3 className={subheadingClass}>Right to access</h3>
          <p className={paraClass}>
            You have the right to inspect and obtain a copy of your PHI maintained in our records. We may charge a reasonable fee for copies. Requests must be in writing to{" "}
            <a
              href="mailto:info@metaortho.com"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              info@metaortho.com
            </a>
            .
          </p>

          <h3 className={subheadingClass}>Right to amend</h3>
          <p className={paraClass}>
            You have the right to request an amendment to your PHI if you believe it is incorrect or incomplete. We may deny the request under certain circumstances and will provide a written explanation.
          </p>

          <h3 className={subheadingClass}>Right to an accounting of disclosures</h3>
          <p className={paraClass}>
            You have the right to receive a list of certain disclosures we have made of your PHI in the six years prior to the date of your request.
          </p>

          <h3 className={subheadingClass}>Right to request restrictions</h3>
          <p className={paraClass}>
            You have the right to request that we limit how we use or disclose your PHI for treatment, payment, or healthcare operations. We are not required to agree to your request, except that we must agree to restrict disclosures to a health plan for services you paid for in full out of pocket.
          </p>

          <h3 className={subheadingClass}>Right to request confidential communications</h3>
          <p className={paraClass}>
            You have the right to request that we communicate with you about medical matters in a certain way or at a certain location (e.g., only by email, only at a specific phone number).
          </p>

          <h3 className={subheadingClass}>Right to a paper copy of this notice</h3>
          <p className={paraClass}>
            You have the right to obtain a paper copy of this Notice, even if you agreed to receive it electronically.
          </p>

          <h3 className={subheadingClass}>Right to be notified of a breach</h3>
          <p className={paraClass}>
            You have the right to be notified if there is a breach of your unsecured PHI.
          </p>

          <h2 className={headingClass}>Our responsibilities</h2>
          <p className={paraClass}>We are required to:</p>
          <ul className={listClass}>
            <li>Maintain the privacy and security of your PHI</li>
            <li>Provide you with this Notice of our legal duties and privacy practices</li>
            <li>Follow the terms of the Notice currently in effect</li>
            <li>Notify you if we cannot accommodate a requested restriction or amendment</li>
          </ul>
          <p className={paraClass}>
            We will not use or disclose your PHI without your authorization except as described in this Notice.
          </p>

          <h2 className={headingClass}>Complaints</h2>
          <p className={paraClass}>
            If you believe your privacy rights have been violated, you may file a complaint with:
          </p>
          <p className={paraClass}>
            MetaOrthopedics, PLLC
            <br />
            3096 Chapel Woods Cove
            <br />
            Germantown, TN 38139
            <br />
            Email:{" "}
            <a
              href="mailto:info@metaortho.com"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              info@metaortho.com
            </a>
          </p>
          <p className={paraClass}>
            You may also file a complaint with the U.S. Department of Health and Human Services Office for Civil Rights:
          </p>
          <ul className={listClass}>
            <li>
              Online:{" "}
              <a
                href="https://www.hhs.gov/hipaa/filing-a-complaint/"
                className="text-[var(--color-accent-primary)] underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                hhs.gov/hipaa/filing-a-complaint
              </a>
            </li>
            <li>Phone: 1-800-368-1019</li>
          </ul>
          <p className={paraClass}>You will not be retaliated against for filing a complaint.</p>

          <h2 className={headingClass}>Changes to this notice</h2>
          <p className={paraClass}>
            We reserve the right to change this Notice and make the new provisions effective for all PHI we maintain. If we make material changes, we will post the revised Notice on our website and make copies available upon request.
          </p>

          <h2 className={headingClass}>Contact information</h2>
          <p className={paraClass}>
            Privacy Officer: Dr. Jay M. Saenz, MD
            <br />
            MetaOrthopedics, PLLC
            <br />
            3096 Chapel Woods Cove
            <br />
            Germantown, TN 38139
            <br />
            Email:{" "}
            <a
              href="mailto:info@metaortho.com"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              info@metaortho.com
            </a>
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
