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

export default function PrivacyContent() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Legal
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Last updated: April 27, 2026
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <p className={paraClass}>
            MetaOrthopedics, PLLC (&ldquo;MetaOrtho,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website metaortho.com and related telehealth services. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you visit our website, use our services, or interact with us.
          </p>
          <p className={paraClass}>
            By using our website or services, you agree to the collection and use of information as described in this policy.
          </p>

          <h2 className={headingClass}>Information we collect</h2>
          <h3 className={subheadingClass}>Personal information you provide</h3>
          <ul className={listClass}>
            <li>Contact information: name, email address, phone number, mailing address</li>
            <li>Health information: medical history, current medications (including GLP-1 prescriptions), symptoms, lab results, DEXA scan data, and other health-related information you share during consultations</li>
            <li>Account information: login credentials, communication preferences</li>
            <li>Payment information: credit card or other payment details (processed by our third-party payment processor, Stripe; we do not store full payment card numbers)</li>
            <li>Waitlist information: email address and marketing consent when you join our waitlist</li>
          </ul>

          <h3 className={subheadingClass}>Information collected automatically</h3>
          <ul className={listClass}>
            <li>Device and browser information (type, operating system, browser version)</li>
            <li>IP address and approximate geographic location</li>
            <li>Pages visited, time spent on pages, referring URLs</li>
            <li>Cookies and similar tracking technologies (see &ldquo;Cookies&rdquo; section below)</li>
          </ul>

          <h3 className={subheadingClass}>Information from third parties</h3>
          <ul className={listClass}>
            <li>Analytics data from Google Analytics (GA4) and Google Tag Manager</li>
            <li>Advertising platform data from Google Ads and Meta (Facebook/Instagram) for campaign measurement</li>
          </ul>

          <h2 className={headingClass}>How we use your information</h2>
          <p className={paraClass}>We use your information to:</p>
          <ul className={listClass}>
            <li>Provide telehealth consultations and musculoskeletal care services</li>
            <li>Process waitlist signups and send you updates about our launch</li>
            <li>Send transactional emails (appointment confirmations, lab results, care plan updates)</li>
            <li>Send marketing communications (newsletter, health education content) — only with your consent, and you may unsubscribe at any time</li>
            <li>Process payments for services rendered</li>
            <li>Improve our website and services through analytics</li>
            <li>Comply with legal obligations, including HIPAA requirements</li>
            <li>Respond to your inquiries and provide customer support</li>
          </ul>

          <h2 className={headingClass}>Health information (HIPAA)</h2>
          <p className={paraClass}>
            MetaOrtho is a HIPAA-covered entity. Your protected health information (PHI) is subject to our Notice of Privacy Practices (available at{" "}
            <a
              href="/hipaa"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              metaortho.com/hipaa
            </a>
            ), which describes in detail how we may use and disclose your health information. In the event of any conflict between this Privacy Policy and our HIPAA Notice, the HIPAA Notice governs with respect to PHI.
          </p>

          <h2 className={headingClass}>Information sharing and disclosure</h2>
          <p className={paraClass}>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className={listClass}>
            <li>Healthcare providers involved in your care (e.g., referring physicians, lab partners like Quest Diagnostics or Labcorp, DEXA imaging centers)</li>
            <li>Service providers who assist our operations: Supabase (database), Resend (transactional email), Customer.io (marketing email), Vercel (website hosting), Stripe (payments), Healthie (EHR platform)</li>
            <li>As required by law, regulation, or legal process</li>
            <li>To protect our rights, privacy, safety, or property</li>
          </ul>
          <p className={paraClass}>
            All service providers who handle PHI have signed Business Associate Agreements (BAAs) as required by HIPAA.
          </p>

          <h2 className={headingClass}>Cookies and tracking</h2>
          <p className={paraClass}>We use:</p>
          <ul className={listClass}>
            <li>Essential cookies: site authentication, session management</li>
            <li>Analytics cookies: Google Analytics (GA4) to understand site usage</li>
            <li>Advertising cookies: Google Ads and Meta Pixel for ad campaign measurement and optimization</li>
          </ul>
          <p className={paraClass}>
            You can control cookies through your browser settings. Disabling cookies may affect site functionality.
          </p>
          <p className={paraClass}>
            We use Google Tag Manager to manage analytics and advertising tags. For information on Google&rsquo;s data practices, visit{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/privacy
            </a>
            .
          </p>

          <h2 className={headingClass}>Data retention</h2>
          <ul className={listClass}>
            <li>Waitlist data: retained until you unsubscribe or request deletion</li>
            <li>Health records: retained for a minimum of 7 years after last date of service (or longer as required by state law)</li>
            <li>Website analytics: retained per Google Analytics default retention periods</li>
            <li>Marketing data: retained until you unsubscribe</li>
          </ul>

          <h2 className={headingClass}>Your rights</h2>
          <p className={paraClass}>Depending on your jurisdiction, you may have the right to:</p>
          <ul className={listClass}>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information (subject to legal retention requirements)</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Request a copy of your health records</li>
          </ul>
          <p className={paraClass}>
            To exercise these rights, contact us at{" "}
            <a
              href="mailto:info@metaortho.com"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              info@metaortho.com
            </a>
            .
          </p>

          <h2 className={headingClass}>California residents</h2>
          <p className={paraClass}>
            If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete, and the right to opt out of the sale of personal information. We do not sell personal information.
          </p>

          <h2 className={headingClass}>Data security</h2>
          <p className={paraClass}>
            We implement administrative, technical, and physical safeguards to protect your information, including:
          </p>
          <ul className={listClass}>
            <li>Encryption in transit (TLS/SSL) and at rest</li>
            <li>Access controls and authentication</li>
            <li>Regular security assessments</li>
            <li>HIPAA-compliant infrastructure and vendor agreements</li>
          </ul>
          <p className={paraClass}>
            No method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>

          <h2 className={headingClass}>Children&rsquo;s privacy</h2>
          <p className={paraClass}>
            Our services are not directed to individuals under 18. We do not knowingly collect information from children under 18. If we learn we have collected information from a child under 18, we will delete it promptly.
          </p>

          <h2 className={headingClass}>Changes to this policy</h2>
          <p className={paraClass}>
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website with a new &ldquo;Last updated&rdquo; date. Your continued use of our services after changes constitutes acceptance.
          </p>

          <h2 className={headingClass}>Contact us</h2>
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
        </div>
      </SectionWrapper>
    </>
  );
}
