"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TiltCard from "@/components/ui/motion/TiltCard";

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
      "UT–Campbell Clinic-trained orthopedic surgeon. Leads MetaOrtho's musculoskeletal protocol — bone, muscle, and joint health on GLP-1 therapy.",
  },
  {
    href: "/about/kashif-latif",
    image: "/images/dr-latif.jpg",
    name: "Kashif Latif, MD",
    role: "Endocrine Director & Chief Science Officer",
    specialty: "Board-Certified Endocrinologist",
    shortBio:
      "24+ years in clinical endocrinology and multi-year DEXA-scan research on GLP-1 effects. Directs the metabolic side of MetaOrtho's protocol.",
  },
];

export default function DoctorPreview() {
  return (
    <SectionWrapper bg="cream">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
          Your physician team
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.02em] mb-5">
          Two physicians. Two specialties. One protocol.
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          GLP-1 therapy reshapes more than the scale &mdash; metabolism,
          muscle, bone, and nutrient balance shift together. MetaOrtho is
          led by a board-certified orthopedic surgeon and a board-certified
          endocrinologist, co-designing every protocol so each system is
          watched by the specialist trained for it.
        </p>
      </div>

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
                    <h3 className="text-2xl font-normal tracking-[-0.02em] text-[var(--color-text-heading)] mb-1">
                      {doc.name}
                    </h3>
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

      <div className="mt-12 text-center">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold rounded-[var(--radius-pill)] border-2 border-[var(--color-text-heading)] text-[var(--color-text-heading)] hover:bg-[var(--color-text-heading)] hover:text-white transition-[background-color,color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 tracking-[-0.01em]"
        >
          Meet the medical team
          <svg
            className="w-3.5 h-3.5"
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
        </Link>
      </div>
    </SectionWrapper>
  );
}
