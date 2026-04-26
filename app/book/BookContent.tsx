"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import MagneticButton from "@/components/ui/motion/MagneticButton";

const ease = [0.23, 1, 0.32, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function BookContent() {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source_component: "book-page",
          source_page: "/book",
          consent_marketing: true,
        }),
      });
      const data: { success: boolean; message?: string } = await res
        .json()
        .catch(() => ({ success: false }));
      if (!res.ok || !data.success) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage(data.message || "You're in. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-bg-darkest)] text-white pt-24 pb-24 md:pb-32">
        <MeshBackground variant="dark" />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 px-3 py-1.5 glass-dark rounded-[var(--radius-pill)] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-breath" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/75">
              Coming soon · Early access
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-normal tracking-[-0.035em] leading-[1.02] mb-6"
            style={{ color: "white", fontFamily: "var(--font-heading)" }}
          >
            We&apos;re launching soon.
            <br />
            <span className="text-[var(--color-accent-primary)]">
              Be first in line.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed mb-12"
          >
            MetaOrtho is finishing setup now. Join the waitlist and
            we&apos;ll email you the moment we open to new patients in your
            state.
          </motion.p>

          {/* Inline capture */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="max-w-md mx-auto"
          >
            {status === "success" ? (
              <div className="glass-dark rounded-[var(--radius-lg)] p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-5 h-5 text-[var(--color-success)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-white font-medium mb-1">You&apos;re in.</p>
                <p className="text-white/80 text-[13px]">{message}</p>
              </div>
            ) : (
              <>
                <form onSubmit={submit} noValidate>
                  <div className="glass-dark rounded-[var(--radius-pill)] p-1.5 flex items-center">
                    <label htmlFor={emailId} className="sr-only">
                      Email
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 min-w-0 bg-transparent px-5 py-3 text-[15px] text-white placeholder:text-white/70 focus:outline-none"
                    />
                    <MagneticButton strength={4}>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-6 py-3 text-[14px] font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:active:scale-100 disabled:opacity-60 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-darkest)]"
                      >
                        {status === "loading" ? "…" : "Join waitlist"}
                      </button>
                    </MagneticButton>
                  </div>
                  {status === "error" && message && (
                    <p
                      role="alert"
                      className="mt-3 text-[12px] font-medium text-red-300"
                    >
                      {message}
                    </p>
                  )}
                </form>
                <p className="mt-4 text-[12px] text-white/70">
                  Free · Unsubscribe anytime · No spam
                </p>
                <p className="mt-2 text-[12px] text-white/70 leading-relaxed max-w-sm mx-auto">
                  Includes our weekly newsletter on GLP-1 side effects, new
                  research, and counteraction protocols.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <SectionWrapper bg="cream">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4">
              When we launch
            </p>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-normal tracking-[-0.02em] mb-4">
              Here&apos;s what booking will look like
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              The moment we open, you&apos;ll be able to book in minutes.
            </p>
          </div>
          <div className="space-y-5">
            {[
              {
                step: "1",
                title: "Complete intake form",
                description:
                  "A secure intake covering your GLP-1 history, medications, weight loss timeline, and symptoms.",
              },
              {
                step: "2",
                title: "30-minute video assessment",
                description:
                  "Meet with our clinical team via secure video. Review your history and discuss your concerns.",
              },
              {
                step: "3",
                title: "Lab & imaging orders",
                description:
                  "Baseline labs (vitamin D, metabolic panel, uric acid) and DEXA scan ordered through Quest/Labcorp near you.",
              },
              {
                step: "4",
                title: "Personalized plan within 48 hours",
                description:
                  "Dr. Saenz reviews your assessment and builds a comprehensive protocol: nutrition, supplements, exercise.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="glass-cream rounded-[var(--radius-lg)] p-6 flex gap-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-bg-dark)] text-white flex items-center justify-center font-semibold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3
                    className="font-normal text-[var(--color-text-heading)] mb-1.5 tracking-[-0.01em] text-lg"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-[14px]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
