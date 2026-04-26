"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";
import MeshBackground from "@/components/ui/motion/MeshBackground";
import MagneticButton from "@/components/ui/motion/MagneticButton";

type Status = "idle" | "loading" | "success" | "error";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const emailId = useId();

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
          source_component: "final-cta",
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
    <section className="relative py-32 md:py-40 bg-[var(--color-bg-dark)] overflow-hidden">
      <MeshBackground variant="dark" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 glass-dark rounded-[var(--radius-pill)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-breath" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/90">
              Coming soon · Early access
            </span>
          </div>

          <h2
            className="text-[clamp(2.25rem,5vw,3.75rem)] font-normal mb-8 tracking-[-0.035em] leading-[1.05]"
            style={{ color: "white" }}
          >
            Your scale says you lost 40 pounds.
            <br />
            <span className="text-white/85">How much of that was muscle?</span>
          </h2>

          <p className="text-lg text-white/85 max-w-2xl mx-auto mb-12 leading-relaxed tracking-[-0.01em]">
            Don&apos;t wait until a fracture, gout attack, or sarcopenia
            diagnosis reveals the damage. Be first when MetaOrtho opens to new
            patients in your state.
          </p>

          {/* Inline waitlist form */}
          {status === "success" ? (
            <div className="max-w-md mx-auto glass-dark rounded-[var(--radius-lg)] p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-medium mb-1">You&apos;re in.</p>
              <p className="text-white/80 text-[13px]">{message}</p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              noValidate
              className="max-w-md mx-auto mb-6"
            >
              <div className="glass-dark rounded-[var(--radius-pill)] p-1.5 flex items-center">
                <label htmlFor={emailId} className="sr-only">
                  Email address
                </label>
                <input
                  id={emailId}
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 bg-transparent px-4 py-2.5 text-[15px] text-white placeholder:text-white/70 focus:outline-none"
                />
                <MagneticButton strength={4}>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-6 py-2.5 text-[14px] font-semibold rounded-[var(--radius-pill)] bg-white text-[var(--color-bg-dark)] hover:bg-white/90 transition-[background-color,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-dark)]"
                  >
                    {status === "loading" ? "…" : "Join waitlist"}
                  </button>
                </MagneticButton>
              </div>
              {status === "error" && message && (
                <p role="alert" className="mt-3 text-[12px] font-medium text-red-300">
                  {message}
                </p>
              )}
            </form>
          )}

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] text-white/70">
            <span>Free to join</span>
            <span>·</span>
            <span>Unsubscribe anytime</span>
            <span>·</span>
            <span>No spam</span>
          </div>
          <p className="mt-4 text-[12px] text-white/70 max-w-md mx-auto leading-relaxed">
            Plus our weekly newsletter on GLP-1 side effects, new research, and
            how to counteract them.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
