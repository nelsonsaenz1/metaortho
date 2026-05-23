"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";

const practiceFAQs = [
  {
    question: "Is MetaOrtho a weight-loss clinic?",
    answer:
      "MetaOrtho is a specialty GLP-1 management practice. We help patients evaluate candidacy, medication fit, side-effect concerns, and monitoring needs. Depending on clinical scope and state availability, care may include prescribing, prescription-transfer support, monitoring recommendations, or coordination with your existing clinicians.",
  },
  {
    question: "Do I need to already be on a GLP-1?",
    answer:
      "No. The GLP-1 Management Profile supports current users, former users, and people considering treatment for the first time. The consult is built to meet you wherever you are in your GLP-1 journey.",
  },
  {
    question: "Does the Profile tell me which drug to take?",
    answer:
      "No. The Profile is educational and helps organize the clinical considerations a specialist would want to review. Specific medication decisions require a consultation with a licensed clinician.",
  },
  {
    question: "What does the $400 consult include?",
    answer:
      "The initial consult includes a specialty review of your GLP-1 status, goals, relevant history, medication and dose context, side-effect concerns, monitoring needs, and recommended next steps. Follow-up consults are $200 and cover progress, side effects, medication-management considerations, monitoring, and plan refinement.",
  },
  {
    question: "Is this covered by insurance?",
    answer:
      "Phase 1 consults are cash-pay. Initial consults are $400 and follow-up consults are $200. Some labs, imaging, nutrition services, or third-party services may have separate costs or insurance options depending on provider and location. Many HSA and FSA accounts can be used — confirm with your plan.",
  },
  {
    question: "Can MetaOrtho order labs or DEXA?",
    answer:
      "When clinically appropriate and available in your state, the care team may recommend or coordinate labs, DEXA, or other monitoring. Availability depends on licensure, clinical eligibility, and partner workflows.",
  },
  {
    question: "Will you replace my current doctor?",
    answer:
      "No. MetaOrtho can serve as a specialty management layer and may coordinate with your existing clinician when appropriate. We complement your existing care team rather than replace it.",
  },
  {
    question: "Can you guarantee I won't lose muscle or bone?",
    answer:
      "No. MetaOrtho does not guarantee outcomes. The goal is to help patients identify relevant risk factors, monitor what may matter, and make more informed clinical decisions with licensed professionals.",
  },
];

const clinicalFAQs = [
  {
    question: "Why do GLP-1 medications affect muscle and bone?",
    answer:
      "Rapid weight loss doesn't only reduce fat. Research presented at the 2026 AAOS Annual Meeting suggests a meaningful share of weight lost on GLP-1 medications may be lean mass — muscle, bone, and connective tissue — particularly without adequate protein intake and resistance training. A specialty consult helps you understand what's worth monitoring and plan for it.",
  },
  {
    question: "What is sarcopenia, and why does it matter on a GLP-1?",
    answer:
      "Sarcopenia is the loss of muscle mass and function. Because GLP-1 weight loss can be rapid, it's worth paying attention to muscle and strength along the way. A consult can review your body composition, protein and nutrition, and resistance training, and discuss whether monitoring makes sense for your situation.",
  },
  {
    question: "What labs and imaging might a consult involve?",
    answer:
      "When clinically appropriate, a clinician may discuss a DEXA scan (bone density and body composition), vitamin D, a metabolic panel, uric acid, and other markers — typically ordered through Quest Diagnostics or Labcorp near you. What's ordered depends on your individual situation and state availability.",
  },
  {
    question: "How does a MetaOrtho consult work?",
    answer:
      "You start with the GLP-1 Management Profile, then meet a licensed clinician via secure, HIPAA-compliant video for a specialty review. Initial consults are about 30 minutes; follow-ups are shorter. Any lab or imaging orders are placed electronically — you visit a location near you.",
  },
  {
    question: "What states does MetaOrtho serve?",
    answer:
      "MetaOrtho is a telemedicine practice, so consults are available only where our clinicians are licensed, and we're expanding state by state. Your GLP-1 Management Profile is yours regardless of where you live; if we're not yet licensed in your state, you can ask to be notified when we open there.",
  },
];

export default function FAQContent() {
  return (
    <>
      {/* Header */}
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            FAQ
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Frequently asked questions
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Everything you need to know about MetaOrtho&apos;s specialty GLP-1
            management and how the consult works.
          </p>
        </div>
      </section>

      {/* Practice & consult FAQs */}
      <SectionWrapper bg="primary" size="sm">
        <h2 className="text-2xl font-normal tracking-[-0.02em] mb-2 text-center">
          About MetaOrtho &amp; your consult
        </h2>
        <p className="text-[var(--color-text-tertiary)] text-center mb-10 text-sm">
          The practice, the Profile, and what the consult includes
        </p>
        <Accordion items={practiceFAQs} />
      </SectionWrapper>

      {/* Clinical FAQs */}
      <SectionWrapper bg="cream" size="sm">
        <h2 className="text-2xl font-normal tracking-[-0.02em] mb-2 text-center">
          Clinical &amp; monitoring
        </h2>
        <p className="text-[var(--color-text-tertiary)] text-center mb-10 text-sm">
          GLP-1 therapy, body composition, and what may be worth monitoring
        </p>
        <Accordion items={clinicalFAQs} />
      </SectionWrapper>
    </>
  );
}
