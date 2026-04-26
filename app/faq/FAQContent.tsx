"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";

const clinicalFAQs = [
  {
    question: "Why do GLP-1 medications cause muscle and bone loss?",
    answer:
      "GLP-1 receptor agonists like Ozempic, Wegovy, Mounjaro, and Zepbound cause rapid weight loss — but the body doesn't just lose fat. Research presented at the 2026 AAOS Annual Meeting found that 15-40% of total weight lost on GLP-1s is lean mass: muscle, bone, and connective tissue. This happens because rapid calorie restriction triggers the body to break down both fat and lean tissue for energy. Without proper nutritional support and resistance training, patients lose structural integrity along with their weight.",
  },
  {
    question: "What is sarcopenia and why should I be worried about it?",
    answer:
      "Sarcopenia is the progressive loss of muscle mass and function. On GLP-1 medications, the rapid weight loss can dramatically accelerate this process. Sarcopenia increases your risk of falls, fractures, metabolic dysfunction, and reduced quality of life. The dangerous part is that it's silent — you feel lighter on the scale but your muscles are wasting. MetaOrtho monitors muscle composition and provides evidence-based prevention protocols including resistance training prescriptions and protein/supplement optimization.",
  },
  {
    question: "How does GLP-1 weight loss affect bone density?",
    answer:
      "GLP-1 users face a 30% increased risk of osteoporosis over 5 years and an over 150% increased risk of osteomalacia (bone softening) versus matched controls. Rapid weight loss reduces mechanical loading on bones, and nutritional deficiencies common on GLP-1s (vitamin D, calcium, protein) further compromise bone health. MetaOrtho orders and monitors DEXA scans, optimizes bone-protective nutrition, and prescribes bisphosphonates when indicated.",
  },
  {
    question: "Can GLP-1 drugs cause gout?",
    answer:
      "Yes. Rapid weight loss on GLP-1 medications causes uric acid spikes that can trigger acute gout attacks. The 2026 AAOS data showed a 12% increased risk of gout in GLP-1 users. When you lose weight quickly, your body breaks down cells that release purines, which convert to uric acid. MetaOrtho can diagnose gout, treat acute flares (colchicine, NSAIDs), and provide ongoing prevention through diet and medication management.",
  },
  {
    question: "What labs and imaging does MetaOrtho order?",
    answer:
      "Our standard panel includes: DEXA scan (bone density and body composition), serum vitamin D, comprehensive metabolic panel, uric acid levels, CBC, and additional markers as clinically indicated. All labs are ordered through Quest Diagnostics or Labcorp — you visit a location near you. DEXA scans are performed at local imaging centers. MetaOrtho orders, reviews, and acts on all results.",
  },
  {
    question: "Do I need MetaOrtho if I already exercise and eat well?",
    answer:
      "Exercise and nutrition are critical — but most patients don't know the specific protocols that protect against GLP-1-related lean mass loss. You need targeted resistance training prescriptions, specific protein and caloric targets, and baseline lab work and DEXA scans to track what's actually happening. MetaOrtho provides the data-driven, physician-supervised monitoring that ensures your healthy habits are working.",
  },
];

const logisticalFAQs = [
  {
    question: "How does a MetaOrtho virtual visit work?",
    answer:
      "After booking, you'll complete an intake form about your GLP-1 history, current symptoms, and health background. Your visit is conducted via secure, HIPAA-compliant video. The initial assessment takes about 30 minutes. Follow-up monitoring visits are typically 15-20 minutes. Lab and imaging orders are placed electronically — you visit a Quest, Labcorp, or imaging center near you.",
  },
  {
    question: "What states does MetaOrtho serve?",
    answer:
      "MetaOrtho is rolling out telehealth services state by state. Join the waitlist with your email and we'll notify you the moment we begin accepting patients in your state.",
  },
  {
    question: "Does MetaOrtho accept insurance?",
    answer:
      "MetaOrtho currently operates on a direct-pay model with transparent, flat-rate pricing. We provide detailed superbills for potential out-of-network reimbursement. Many HSA and FSA accounts can be used. Lab work and DEXA scans ordered through Quest/Labcorp may be covered by your insurance.",
  },
  {
    question: "Can MetaOrtho prescribe medications?",
    answer:
      "Yes. MetaOrtho prescribes all non-controlled medications relevant to musculoskeletal health: high-dose prescription vitamin D, bisphosphonates, colchicine, NSAIDs, and other supportive medications. We do not prescribe controlled substances. Prescriptions are sent electronically to your preferred pharmacy.",
  },
  {
    question: "How is MetaOrtho different from my primary care doctor?",
    answer:
      "Your PCP manages your general health and may not have specialized training to identify GLP-1-specific musculoskeletal risks. MetaOrtho is led by a board-certified orthopedic surgeon with dedicated protocols for sarcopenia prevention, bone density monitoring, gout management, and nutritional optimization. We complement your existing care team.",
  },
  {
    question: "What if I'm not on a GLP-1 yet but planning to start?",
    answer:
      "A baseline assessment before starting GLP-1 therapy is ideal. We can establish your baseline bone density, muscle composition, and lab values — then monitor changes as your weight loss progresses. This gives us the clearest picture and allows for early intervention if needed.",
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
            Everything you need to know about GLP-1 musculoskeletal risks and how MetaOrtho protects you.
          </p>
        </div>
      </section>

      {/* Clinical FAQs */}
      <SectionWrapper bg="primary" size="sm">
        <h2 className="text-2xl font-normal tracking-[-0.02em] mb-2 text-center">Clinical questions</h2>
        <p className="text-[var(--color-text-tertiary)] text-center mb-10 text-sm">About GLP-1 musculoskeletal risks</p>
        <Accordion items={clinicalFAQs} />
      </SectionWrapper>

      {/* Logistical FAQs */}
      <SectionWrapper bg="cream" size="sm">
        <h2 className="text-2xl font-normal tracking-[-0.02em] mb-2 text-center">About your visit</h2>
        <p className="text-[var(--color-text-tertiary)] text-center mb-10 text-sm">Logistics, insurance, and what to expect</p>
        <Accordion items={logisticalFAQs} />
      </SectionWrapper>
    </>
  );
}
