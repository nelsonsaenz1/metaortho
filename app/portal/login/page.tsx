"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    // Prototype: accept any credentials. Real auth would call an API here.
    setTimeout(() => {
      localStorage.setItem("portal-auth", "1");
      localStorage.setItem("portal-user", email.trim());
      router.push("/portal");
    }, 400);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--color-bg-cream)]">
      {/* Top bar */}
      <header className="border-b border-[var(--color-border)] bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2.5 text-[var(--color-bg-dark)]">
            <Logo size={28} />
            <span className="text-[17px] font-semibold tracking-[-0.03em] text-[var(--color-text-heading)]">
              MetaOrtho
            </span>
          </Link>
          <Link
            href="/home"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 flex items-center justify-center px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] overflow-hidden">
            {/* Demo banner */}
            <div className="bg-[var(--color-bg-dark)] text-center py-2.5 px-4 text-xs text-white/80 tracking-[-0.01em]">
              <span className="opacity-90">Prototype · Any email and password will work</span>
            </div>

            <div className="px-8 py-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-3">
                Patient Portal
              </p>
              <h1 className="text-[clamp(1.75rem,3vw,2rem)] font-normal tracking-[-0.03em] text-[var(--color-text-heading)] mb-2">
                Welcome back
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                Sign in to access your protocol, labs, and care team.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[13px] font-medium text-[var(--color-text-heading)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-[15px] bg-[var(--color-bg-cream)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-heading)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:bg-white transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="block text-[13px] font-medium text-[var(--color-text-heading)]"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-[12px] text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-[15px] bg-[var(--color-bg-cream)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-heading)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:bg-white transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="px-4 py-3 bg-[var(--color-danger)]/8 border border-[var(--color-danger)]/20 rounded-[var(--radius-md)] text-[13px] text-[var(--color-danger)]">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3.5 text-[15px] font-semibold rounded-[var(--radius-pill)] bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)] transition-[background-color,box-shadow,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.98] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 tracking-[-0.01em] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>

              <p className="mt-8 text-center text-[13px] text-[var(--color-text-secondary)]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/book"
                  className="text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] font-medium transition-colors"
                >
                  Book an assessment
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-[var(--color-text-tertiary)] leading-relaxed">
            MetaOrtho portal · HIPAA-compliant
          </p>
        </motion.div>
      </main>
    </div>
  );
}
