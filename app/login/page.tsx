"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Logo from "@/components/ui/Logo";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(redirect);
      router.refresh();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-cream)]">
      <div className="max-w-sm w-full mx-4">
        <div className="bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border border-[var(--color-border)] p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2.5 mb-4 text-[var(--color-bg-dark)]">
              <Logo size={34} />
              <span className="text-lg font-semibold text-[var(--color-text-heading)] tracking-[-0.02em]">
                MetaOrtho
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              This site is currently in preview. Enter the password to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-cream)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-light)] transition-all mb-4"
              autoFocus
            />
            {error && (
              <p className="text-sm text-[var(--color-danger)] mb-4">
                Incorrect password. Please try again.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[var(--color-bg-dark)] text-white font-semibold rounded-[var(--radius-pill)] hover:bg-[var(--color-bg-darkest)] transition-all cursor-pointer"
            >
              Enter Site
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
