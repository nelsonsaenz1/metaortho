"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-2 relative">
              <div className="aspect-[3/4] max-w-md mx-auto rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-xl)]">
                <Image
                  src="/images/dr-saenz.jpg"
                  alt="Dr. Jay M. Saenz, MD"
                  width={400}
                  height={533}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
                Medical Director &amp; Founder
              </p>
              <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-2">
                Dr. Jay M. Saenz, MD
              </h1>
              <p className="text-xl text-[var(--color-accent-primary)] mb-8 tracking-[-0.01em]">
                Board-Certified Orthopedic Surgeon
              </p>
              <div className="space-y-5 text-[var(--color-text-secondary)] leading-relaxed text-lg">
                <p>
                  Dr. Saenz is a fellowship-trained orthopedic surgeon who founded MetaOrthopedics to address one of the most significant unmet needs in modern medicine: the musculoskeletal consequences of GLP-1 weight loss medications.
                </p>
                <p>
                  With millions of Americans on Ozempic, Wegovy, Mounjaro, and Zepbound, patients are losing weight rapidly — but up to 40% of that loss is lean mass. Their prescribing physicians focus on metabolic markers. Nobody is monitoring what the weight loss is doing to their bodies structurally.
                </p>
                <p>
                  <strong className="text-[var(--color-text-heading)]">MetaOrtho was created to fill that gap.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Training */}
      <SectionWrapper bg="primary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-12 text-center">Education &amp; Training</h2>
          <div className="space-y-4">
            {[
              { institution: "University of Arkansas", detail: "Bachelor of Science", icon: "🎓" },
              { institution: "University of Arkansas for Medical Sciences (UAMS)", detail: "Doctor of Medicine", icon: "⚕️" },
              { institution: "Campbell Clinic", detail: "Orthopedic Surgery Residency — Memphis, TN", icon: "🏥" },
            ].map((edu) => (
              <div key={edu.institution} className="flex items-start gap-5 bg-[var(--color-bg-cream)] rounded-[var(--radius-lg)] p-7">
                <span className="text-2xl mt-0.5">{edu.icon}</span>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-heading)] text-lg font-[var(--font-body)] tracking-[-0.01em]">
                    {edu.institution}
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">{edu.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Professional Memberships */}
      <SectionWrapper bg="cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-12 text-center">Professional Memberships</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "American Academy of Orthopaedic Surgeons (AAOS)",
              "Tennessee Orthopaedic Society",
              "Memphis Medical Society",
              "American Medical Association (AMA)",
            ].map((membership) => (
              <div key={membership} className="flex items-center gap-3 bg-white rounded-[var(--radius-md)] px-5 py-4 border border-[var(--color-border)]">
                <svg className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[var(--color-text-primary)] font-medium tracking-[-0.01em]">{membership}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Why an Orthopedic Surgeon */}
      <SectionWrapper bg="dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-6" style={{ color: 'white' }}>
            Why an orthopedic surgeon for GLP-1 care?
          </h2>
          <p className="text-lg text-white/70 mb-16 max-w-2xl mx-auto">
            GLP-1 weight loss medications affect your entire musculoskeletal system. Here&apos;s why an orthopedic surgeon is the right specialist.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Bone Health Expert", description: "Orthopedic surgeons understand bone biology, density, metabolism, and fracture risk at a depth no other specialty matches." },
              { title: "Muscle & Tendon Authority", description: "From sarcopenia to tendon weakening, orthopedic surgeons manage the full spectrum of soft tissue health." },
              { title: "Joint Protection", description: "Weight loss changes joint mechanics. An orthopedic perspective ensures joints are protected as body composition shifts." },
            ].map((reason) => (
              <div key={reason.title} className="text-left bg-white/[0.06] rounded-[var(--radius-lg)] p-7 border border-white/[0.08]">
                <h3 className="text-lg font-normal mb-3 tracking-[-0.01em]" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
                  {reason.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Licensure + CTA */}
      <SectionWrapper bg="cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-6">Licensed in 43 states</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed">
            MetaOrtho provides telehealth services across nearly the entire United States. Dr. Saenz holds active medical licenses in 43 states, ensuring you can receive care wherever you are.
          </p>
          <Button href="/book" size="lg" variant="dark">
            Check Your State &amp; Book
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
