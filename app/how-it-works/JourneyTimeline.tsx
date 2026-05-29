"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

export type JourneyStep = {
  title: string;
  body: string;
  meta: string;
};

export default function JourneyTimeline({ steps }: { steps: JourneyStep[] }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the timeline so the spine fills as the
  // reader advances. Springing it keeps the fill smooth rather than jittery.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const fillScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const itemInitial = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 };
  const itemInView = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <div ref={containerRef} className="relative">
      {/* Connecting spine — left rail on mobile, centered on desktop.
          A faint static track with an accent fill that tracks scroll. */}
      <div
        aria-hidden="true"
        className="absolute top-4 bottom-4 w-[2px] left-[23px] md:left-1/2 md:-translate-x-1/2"
      >
        <div className="absolute inset-0 rounded-full bg-[var(--color-border-strong)]/55" />
        <motion.div
          style={{ scaleY: reduceMotion ? 1 : fillScaleY }}
          className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[var(--color-accent-primary)] to-[var(--color-accent-warm)]"
        />
      </div>

      <ol className="space-y-5 md:space-y-1">
        {steps.map((s, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.li
              key={i}
              initial={itemInitial}
              whileInView={itemInView}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease }}
              className="relative md:grid md:grid-cols-2 md:gap-x-12 md:items-center"
            >
              {/* Numbered node sitting on the spine */}
              <div className="absolute z-10 left-0 top-5 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[var(--color-border)] shadow-[var(--shadow-md)]">
                  <span
                    className="text-[var(--color-accent-primary)] text-[20px] leading-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                </div>
              </div>

              {/* Step card */}
              <div
                className={`pl-[68px] md:pl-0 md:py-5 ${
                  isLeft ? "md:col-start-1 md:pr-9" : "md:col-start-2 md:pl-9"
                }`}
              >
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] motion-reduce:hover:translate-y-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-primary)] mb-2.5">
                    {s.meta}
                  </p>
                  <h2
                    className="text-[19px] text-[var(--color-text-heading)] mb-2.5 leading-snug tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.title}
                  </h2>
                  <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
