"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const headingClass =
  "text-[clamp(1.25rem,2vw,1.5rem)] font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-12 mb-4";
const paraClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]";
const listClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px] list-disc pl-5 space-y-1.5";

export default function TermsContent() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Legal
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Last updated: April 27, 2026
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <p className={paraClass}>
            Welcome to MetaOrtho. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the MetaOrtho website (metaortho.com) and telehealth services operated by MetaOrthopedics, PLLC (&ldquo;MetaOrtho,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
          </p>
          <p className={paraClass}>
            By accessing our website or using our services, you agree to these Terms. If you do not agree, do not use our services.
          </p>

          <h2 className={headingClass}>1. About our services</h2>
          <p className={paraClass}>
            MetaOrtho provides physician-led telehealth consultations focused on musculoskeletal health monitoring for patients using GLP-1 receptor agonist medications. Our services include virtual consultations, lab and imaging orders, nutritional guidance, exercise prescriptions, and supplement recommendations.
          </p>
          <p className={paraClass}>
            MetaOrtho does not prescribe GLP-1 medications. We monitor and manage the musculoskeletal effects of GLP-1 therapy prescribed by your existing provider.
          </p>

          <h2 className={headingClass}>2. Eligibility</h2>
          <p className={paraClass}>
            You must be at least 18 years old and located in a state where our physicians are licensed to practice to use our telehealth services. Our services are currently available only to residents of the United States.
          </p>

          <h2 className={headingClass}>3. Not emergency services</h2>
          <p className={paraClass}>
            MetaOrtho is NOT an emergency medical service. If you are experiencing a medical emergency, call 911 or go to your nearest emergency room immediately. Our telehealth services are designed for non-emergency musculoskeletal monitoring and care.
          </p>

          <h2 className={headingClass}>4. Telehealth consent</h2>
          <p className={paraClass}>By using our telehealth services, you acknowledge and agree that:</p>
          <ul className={listClass}>
            <li>Telehealth involves the delivery of healthcare services using electronic communications</li>
            <li>Telehealth is not the same as an in-person visit and has inherent limitations</li>
            <li>Technical difficulties may occur that interrupt or prevent your consultation</li>
            <li>Information transmitted may not be sufficient to allow for appropriate medical decision-making in all cases</li>
            <li>You have the right to withdraw consent for telehealth services at any time</li>
          </ul>

          <h2 className={headingClass}>5. Physician–patient relationship</h2>
          <p className={paraClass}>
            A physician–patient relationship is established only when you complete an intake assessment and have a consultation with one of our providers. Browsing our website, joining our waitlist, or taking our risk assessment quiz does NOT establish a physician–patient relationship.
          </p>

          <h2 className={headingClass}>6. Medical disclaimer</h2>
          <p className={paraClass}>
            The information on our website, including blog posts, risk assessment tools, and educational content, is provided for informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider before making decisions about your health or treatment.
          </p>
          <p className={paraClass}>
            Research statistics cited on our website (including data from the AAOS 2026 Annual Meeting and other published studies) represent population-level findings and may not apply to your individual situation.
          </p>

          <h2 className={headingClass}>7. Waitlist</h2>
          <p className={paraClass}>
            By joining our waitlist, you provide your email address and consent to receive:
          </p>
          <ul className={listClass}>
            <li>Updates about our launch and service availability</li>
            <li>Our weekly newsletter on GLP-1 musculoskeletal health</li>
            <li>Occasional marketing communications</li>
          </ul>
          <p className={paraClass}>
            You may unsubscribe from marketing emails at any time using the unsubscribe link in any email. Unsubscribing from marketing emails does not affect transactional communications related to your care if you are an active patient.
          </p>

          <h2 className={headingClass}>8. Pricing and payment</h2>
          <p className={paraClass}>
            Service prices listed on our website as &ldquo;(planned)&rdquo; are estimates and may change before launch. Final pricing will be confirmed when services become available. All fees are due at the time of service unless otherwise arranged. We do not currently accept insurance.
          </p>

          <h2 className={headingClass}>9. Intellectual property</h2>
          <p className={paraClass}>
            All content on our website — including text, graphics, logos, images, and software — is the property of MetaOrthopedics, PLLC and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>

          <h2 className={headingClass}>10. User conduct</h2>
          <p className={paraClass}>You agree not to:</p>
          <ul className={listClass}>
            <li>Use our services for any unlawful purpose</li>
            <li>Provide false or misleading information</li>
            <li>Attempt to access other users&rsquo; information</li>
            <li>Interfere with the security or functionality of our website</li>
            <li>Use automated tools to scrape or collect data from our website</li>
          </ul>

          <h2 className={headingClass}>11. Limitation of liability</h2>
          <p className={paraClass}>
            To the maximum extent permitted by law, MetaOrtho&rsquo;s total liability for any claims arising from your use of our website or services shall not exceed the amount you paid to MetaOrtho in the 12 months preceding the claim. MetaOrtho shall not be liable for any indirect, incidental, consequential, or punitive damages.
          </p>

          <h2 className={headingClass}>12. Indemnification</h2>
          <p className={paraClass}>
            You agree to indemnify and hold harmless MetaOrthopedics, PLLC, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of our services or violation of these Terms.
          </p>

          <h2 className={headingClass}>13. Governing law</h2>
          <p className={paraClass}>
            These Terms are governed by the laws of the State of Tennessee, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Shelby County, Tennessee.
          </p>

          <h2 className={headingClass}>14. Changes to these terms</h2>
          <p className={paraClass}>
            We may update these Terms from time to time. Material changes will be posted on our website with a new &ldquo;Last updated&rdquo; date. Your continued use of our services after changes constitutes acceptance.
          </p>

          <h2 className={headingClass}>15. Contact us</h2>
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
