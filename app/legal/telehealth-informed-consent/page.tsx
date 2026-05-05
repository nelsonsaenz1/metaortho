import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Telehealth Informed Consent",
  description:
    "MetaOrtho&rsquo;s telehealth informed consent. What telemedicine is, what it isn&rsquo;t, and your rights as a patient.",
};

const headingClass =
  "text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4";
const paraClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]";
const listClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px] list-disc pl-5 space-y-1.5";

export default function TelehealthInformedConsentPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Informed consent
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Telehealth informed consent
          </h1>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Effective date: 2026-04-29
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <p className={paraClass}>
            Before MetaOrtho can deliver care to you, we&rsquo;re required
            to make sure you understand what telehealth is, how it works,
            and your rights as a patient. Please read the following
            carefully. You will be asked to acknowledge this consent before
            your first visit.
          </p>

          <h2 className={headingClass}>What telehealth is</h2>
          <p className={paraClass}>
            Telehealth (also called telemedicine) is the delivery of
            healthcare services using interactive audio, video, or other
            electronic communications technology by a clinician at a
            different location than you. At MetaOrtho, your visit takes
            place over a secure video connection from a location of your
            choosing. Your clinician completes the visit, documents it in
            your medical record, and orders any labs, imaging, or
            prescriptions that are clinically appropriate.
          </p>

          <h2 className={headingClass}>What care MetaOrtho provides</h2>
          <p className={paraClass}>
            MetaOrtho is a physician-led telemedicine practice focused on
            musculoskeletal care for adults on GLP-1 weight-loss
            medications. We may:
          </p>
          <ul className={listClass}>
            <li>Conduct comprehensive musculoskeletal risk assessments</li>
            <li>Order labs and DEXA scans through accredited laboratories you select</li>
            <li>Build personalized monitoring and protection protocols</li>
            <li>Prescribe FDA-approved branded GLP-1 medications and other medications when clinically appropriate, transmitted to the licensed U.S. pharmacy you choose &mdash; see our <a href="/legal/pharmacy-selection" className="text-[var(--color-accent-primary)] underline hover:no-underline">pharmacy selection</a> page. We do not prescribe compounded GLP-1 medications or controlled substances.</li>
            <li>Manage gout, fracture risk, and related musculoskeletal conditions associated with rapid weight loss</li>
          </ul>

          <h2 className={headingClass}>Risks and limitations of telehealth</h2>
          <p className={paraClass}>
            Telehealth has real benefits but also real limitations. You
            should understand the following before consenting:
          </p>
          <ul className={listClass}>
            <li>Your clinician cannot perform a hands-on physical examination over video. Some conditions cannot be fully evaluated remotely and may require an in-person visit elsewhere.</li>
            <li>Technical problems &mdash; internet outages, audio or video failures &mdash; can interrupt or end a visit. We will reschedule if a visit is interrupted.</li>
            <li>Although we use industry-standard encryption and HIPAA-compliant infrastructure, no electronic communication can be guaranteed to be 100% secure.</li>
            <li>If your clinical situation requires an evaluation we can&rsquo;t do safely via telehealth, we will tell you and refer you to an in-person provider.</li>
          </ul>

          <h2 className={headingClass}>Benefits of telehealth</h2>
          <ul className={listClass}>
            <li>You can see a board-certified specialist without travel.</li>
            <li>Care is more convenient to fit into your schedule.</li>
            <li>Care can be delivered consistently no matter where you are within your licensed state.</li>
          </ul>

          <h2 className={headingClass}>Your alternatives</h2>
          <p className={paraClass}>
            You always have the right to choose in-person care instead of
            telehealth. If you would prefer to see a clinician in person,
            we recommend asking your primary care physician or seeing an
            in-person orthopedic specialist. You can decline telehealth
            care from MetaOrtho at any time without penalty.
          </p>

          <h2 className={headingClass}>Your rights</h2>
          <ul className={listClass}>
            <li>You have the right to withdraw your consent for telehealth at any time, and to switch to in-person care without affecting your right to future treatment.</li>
            <li>You have the right to a copy of your medical records on request.</li>
            <li>You have the right to ask questions about your care, including what telehealth involves and how your information is protected.</li>
            <li>You have the right to be told if your visit is being recorded. MetaOrtho does not record video visits except in extraordinary circumstances and only with your specific written consent.</li>
          </ul>

          <h2 className={headingClass}>Privacy and security</h2>
          <p className={paraClass}>
            MetaOrtho follows HIPAA Privacy and Security Rules. See our{" "}
            <a
              href="/legal/notice-of-privacy-practices"
              className="text-[var(--color-accent-primary)] underline hover:no-underline"
            >
              Notice of Privacy Practices
            </a>{" "}
            for details. We use a secure, HIPAA-compliant video platform and
            store medical records in a HIPAA-compliant electronic system.
          </p>

          <h2 className={headingClass}>Emergency limitation</h2>
          <p className={paraClass}>
            <strong>
              Telehealth is not for medical emergencies.
            </strong>{" "}
            If you are experiencing a medical emergency &mdash; including
            chest pain, difficulty breathing, severe abdominal pain, signs
            of stroke, suicidal thoughts, or any other condition you
            consider an emergency &mdash; call 911 or go to your nearest
            emergency room. Do not use the MetaOrtho portal or wait for a
            telehealth visit.
          </p>

          <h2 className={headingClass}>State-specific notices</h2>
          <h3 className="text-base font-semibold text-[var(--color-text-heading)] mt-4 mb-2">California residents</h3>
          <p className={paraClass}>
            Your MetaOrtho clinician will obtain your verbal or written
            consent for telehealth before your first telehealth visit, in
            addition to this acknowledgment. You have the right to in-person
            care if you choose, including assistance identifying nearby
            in-person providers.
          </p>
          <h3 className="text-base font-semibold text-[var(--color-text-heading)] mt-4 mb-2">Texas residents</h3>
          <p className={paraClass}>
            Texas requires written consent for telemedicine services. By
            acknowledging this consent electronically, you provide written
            consent under Texas law. You have the right to decline
            telemedicine in favor of in-person care without penalty.
          </p>
          <h3 className="text-base font-semibold text-[var(--color-text-heading)] mt-4 mb-2">New York residents</h3>
          <p className={paraClass}>
            New York requires that consent for telehealth be documented
            before each telehealth encounter. MetaOrtho will confirm your
            consent at the start of every telehealth visit.
          </p>

          <h2 className={headingClass}>Acknowledgment</h2>
          <p className={paraClass}>
            By proceeding with intake or scheduling a visit with MetaOrtho,
            you acknowledge that you have read this consent, that you
            understand it, and that you agree to receive telehealth care
            from MetaOrtho on the terms described.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-04-29. If we make material changes to this consent,
            we will ask you to acknowledge the new version before your next
            visit.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
