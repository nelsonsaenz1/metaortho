"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TiltCard from "@/components/ui/motion/TiltCard";
import Spotlight from "@/components/ui/motion/Spotlight";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

const ease = [0.23, 1, 0.32, 1] as const;

type Physician = {
  href: string;
  image: string;
  name: string;
  role: string;
  specialty: string;
  shortBio: string;
};

const physicians: Physician[] = [
  {
    href: "/about/jay-saenz",
    image: "/images/dr-saenz.jpg",
    name: "Jay M. Saenz, MD",
    role: "Founder & Medical Director",
    specialty: "Board-Certified Orthopedic Surgeon",
    shortBio:
      "UT–Campbell Clinic-trained orthopedic surgeon. Memphis, TN. Leads MetaOrtho's musculoskeletal protocol.",
  },
  {
    href: "/about/kashif-latif",
    image: "/images/dr-latif.jpg",
    name: "Kashif Latif, MD",
    role: "Endocrine Director & Chief Science Officer",
    specialty: "Board-Certified Endocrinologist",
    shortBio:
      "AM Diabetes & Endocrinology Center, Bartlett, TN. 24+ years in clinical endocrinology and DEXA-scan research.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-bg-cream)] pt-16 pb-12">
        <MeshBackground variant="light" className="opacity-40" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Our Medical Team
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-normal tracking-[-0.03em] mb-6">
            The physicians who lead your care.
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            GLP-1 therapy doesn&rsquo;t just change your weight &mdash; it
            reshapes metabolism, muscle, bone, and nutrient balance all at
            once. MetaOrtho is led by two board-certified physicians, an
            orthopedic surgeon and an endocrinologist, who co-design every
            protocol so the systems most affected are each watched by the
            specialist trained for them.
          </p>
        </div>
      </section>

      {/* Physician grid */}
      <section className="bg-[var(--color-bg-cream)] pb-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {physicians.map((doc, i) => (
              <motion.div
                key={doc.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <Link
                  href={doc.href}
                  aria-label={`Read full bio for ${doc.name}`}
                  className="group block rounded-[var(--radius-xl)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg-cream)]"
                >
                  <TiltCard max={4} glare="rgba(255,255,255,0.18)">
                    <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-md)] group-hover:shadow-[var(--shadow-xl)] transition-shadow duration-[var(--dur-panel)] ease-[var(--ease-out)]">
                      <div className="aspect-[4/3] relative overflow-hidden bg-[var(--color-bg-cream-deep)]">
                        <Image
                          src={doc.image}
                          alt={doc.name}
                          width={640}
                          height={480}
                          className="object-cover w-full h-full transition-transform duration-[var(--dur-panel)] ease-[var(--ease-out)] group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-darkest)]/30 via-transparent to-transparent pointer-events-none"
                        />
                      </div>
                      <div className="p-7">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-2">
                          {doc.role}
                        </p>
                        <h2 className="text-2xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)] mb-1">
                          {doc.name}
                        </h2>
                        <p className="text-[15px] text-[var(--color-text-secondary)] mb-4">
                          {doc.specialty}
                        </p>
                        <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-5">
                          {doc.shortBio}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text-heading)] group-hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--dur-hover)]">
                          Read full bio
                          <svg
                            className="w-3.5 h-3.5 transition-transform duration-[var(--dur-hover)] group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-[var(--color-text-tertiary)]">
            For credentials, NPI numbers, and state licenses, see the{" "}
            <Link
              href="/about/medical-team"
              className="underline underline-offset-2 hover:text-[var(--color-text-heading)]"
            >
              full medical team page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Why a multi-specialty team */}
      <SectionWrapper bg="dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl font-normal tracking-[-0.02em] mb-6"
            style={{ color: "white" }}
          >
            Why a multi-specialty team for GLP-1 care?
          </h2>
          <p className="text-lg text-white/70 mb-16 max-w-2xl mx-auto">
            GLP-1 medications reach further than the scale shows. They
            reshape metabolism, muscle, bone, and nutrient balance at the
            same time &mdash; and most weight-loss programs only watch one
            of those. MetaOrtho pairs a board-certified orthopedic surgeon
            with a board-certified endocrinologist so the systems most
            affected are each watched by the specialist trained for them.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Bone & joint expertise",
                description:
                  "Our orthopedic surgeon brings deep expertise in bone biology, density, joint mechanics, and the structural changes rapid weight loss can cause.",
              },
              {
                title: "Endocrine & metabolic oversight",
                description:
                  "Our endocrinologist directs the metabolic side of care — GLP-1 dosing context, lab interpretation, and the hormonal drivers of bone and muscle change.",
              },
              {
                title: "Protocol co-designed",
                description:
                  "Both specialties co-design the standard of care so patients receive coordinated oversight across muscle, bone, joint, and nutrition — not handoffs between siloed clinicians.",
              },
            ].map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
              >
                <Spotlight
                  color="rgba(255,255,255,0.4)"
                  glow="rgba(42,111,151,0.08)"
                  className="glass-dark text-left rounded-[var(--radius-lg)] p-7 h-full transition-[transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                >
                  <h3
                    className="text-lg font-normal mb-3 tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-heading)", color: "white" }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {reason.description}
                  </p>
                </Spotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Telehealth + CTA */}
      <SectionWrapper bg="cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-6">
            Care that comes to you.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed">
            MetaOrtho is fully telehealth &mdash; every visit, every protocol
            update, every follow-up happens from wherever you are. No travel,
            no waiting rooms, no compromises on the depth of care.
          </p>
          <WaitlistCTA
            variant="dark"
            size="lg"
            source="about-bottom"
            eyebrow="Early access · MetaOrtho"
          >
            Join the waitlist
          </WaitlistCTA>
        </div>
      </SectionWrapper>
    </>
  );
}
