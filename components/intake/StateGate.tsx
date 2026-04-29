"use client";

import { useState } from "react";
import Link from "next/link";
import { STATES, isLicensed, getStateByCode, LICENSED_COUNT } from "@/lib/states";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

type Phase = "ask" | "out-of-state";

export default function StateGate({
  children,
  intakeName,
}: {
  children: React.ReactNode;
  intakeName: string;
}) {
  const [phase, setPhase] = useState<Phase>("ask");
  const [code, setCode] = useState<string>("");
  const [confirmedState, setConfirmedState] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code) return;
    if (isLicensed(code)) {
      setConfirmedState(code);
    } else {
      setPhase("out-of-state");
    }
  }

  if (confirmedState) {
    return <>{children}</>;
  }

  if (phase === "out-of-state") {
    const entry = getStateByCode(code);
    return (
      <section className="bg-[var(--color-bg-cream)] pt-16 pb-24">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-warm)] mb-4 font-[var(--font-body)]">
            Not yet available in your state
          </p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.03em] mb-6">
            We&rsquo;re not yet licensed in {entry?.name ?? "your state"}.
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
            MetaOrtho is a physician-led telemedicine practice. Care is
            provided only by clinicians licensed in your state, and we
            haven&rsquo;t yet completed licensing in {entry?.name ?? "your area"}.
            Join the waitlist and we&rsquo;ll let you know the moment we open
            here.
          </p>
          <div className="flex flex-col items-center gap-4">
            <WaitlistCTA
              variant="dark"
              size="md"
              source="state-gate"
              eyebrow={`Waitlist · ${entry?.name ?? code}`}
              headline={
                <>
                  Tell me when MetaOrtho
                  <br />
                  opens in {entry?.name ?? "my state"}.
                </>
              }
              subcopy="One short email when we go live where you live. No spam."
            >
              Join the waitlist
            </WaitlistCTA>
            <button
              type="button"
              onClick={() => {
                setPhase("ask");
                setCode("");
              }}
              className="text-sm text-[var(--color-text-tertiary)] underline hover:text-[var(--color-accent-primary)]"
            >
              Choose a different state
            </button>
          </div>
          <p className="mt-10 text-xs text-[var(--color-text-tertiary)]">
            Currently licensed in {LICENSED_COUNT} U.S. states. See the full
            list on our{" "}
            <Link
              href="/legal/licensed-states"
              className="underline hover:text-[var(--color-accent-primary)]"
            >
              licensed states
            </Link>{" "}
            page.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--color-bg-cream)] pt-16 pb-24">
      <div className="max-w-xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
          Step 1 · {intakeName}
        </p>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-normal tracking-[-0.03em] mb-4">
          What state do you live in?
        </h1>
        <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-8">
          MetaOrtho is a physician-led telemedicine practice. To make sure we
          can deliver care to you, we need to confirm we&rsquo;re licensed in
          your state before we ask anything else.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label htmlFor="state-gate-select" className="sr-only">
            Select your state
          </label>
          <select
            id="state-gate-select"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-text-heading)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]"
          >
            <option value="">Choose your state…</option>
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={!code}
            className="rounded-[var(--radius-md)] bg-[var(--color-accent-primary)] px-5 py-3 text-white font-semibold disabled:opacity-50 hover:opacity-90"
          >
            Continue
          </button>
        </form>
        <p className="mt-6 text-xs text-[var(--color-text-tertiary)]">
          Currently licensed in {LICENSED_COUNT} U.S. states. We never ask
          health questions before confirming we serve you.
        </p>
      </div>
    </section>
  );
}
