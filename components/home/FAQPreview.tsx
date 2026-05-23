"use client";

import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";

const faqs = [
  {
    question: "Is MetaOrtho a weight-loss clinic?",
    answer:
      "MetaOrtho is a specialty GLP-1 management practice. We help patients evaluate candidacy, medication fit, side-effect concerns, and monitoring needs. Depending on clinical scope and state availability, care may include prescribing, prescription-transfer support, monitoring recommendations, or coordination with your existing clinicians.",
  },
  {
    question: "Do I need to already be on a GLP-1?",
    answer:
      "No. The GLP-1 Management Profile is built for current users, former users, and people considering treatment for the first time.",
  },
  {
    question: "Does the Profile tell me which drug to take?",
    answer:
      "No. The Profile is educational and helps organize the clinical considerations a specialist would want to review. Specific medication decisions require a consultation with a licensed clinician.",
  },
  {
    question: "What does the $400 consult include?",
    answer:
      "A specialty review of your GLP-1 status, goals, relevant history, medication and dose context, side-effect concerns, monitoring needs, and recommended next steps. Follow-up consults are $200. Some labs, imaging, or third-party services may have separate costs.",
  },
  {
    question: "Can you guarantee I won't lose muscle or bone?",
    answer:
      "No. MetaOrtho does not guarantee outcomes. The goal is to help you identify relevant risk factors, monitor what may matter, and make more informed decisions with licensed clinicians.",
  },
];

export default function FAQPreview() {
  return (
    <SectionWrapper bg="cream" size="sm" id="faq-preview">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Common questions
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em]">
            Questions patients ask
          </h2>
        </div>

        <Accordion items={faqs} />

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="text-sm text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] font-medium transition-colors"
          >
            View all FAQs &rarr;
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
