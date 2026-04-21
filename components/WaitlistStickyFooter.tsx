"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import WaitlistForm from "./WaitlistForm";

const STORAGE_KEY = "metaortho-waitlist-sticky-dismissed";
// Show again N days after dismissal — set to 0 to dismiss forever.
const REMIND_AFTER_DAYS = 30;

// Paths where the sticky footer should never appear.
const HIDDEN_PREFIXES = ["/portal", "/login"];

export default function WaitlistStickyFooter() {
  const pathname = usePathname() ?? "/";
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [successHidden, setSuccessHidden] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const hidden = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));
    if (hidden) {
      setVisible(false);
      return;
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setVisible(true);
      return;
    }

    const dismissedAt = Number(raw) || 0;
    if (REMIND_AFTER_DAYS <= 0) {
      setVisible(false);
      return;
    }

    const msSince = Date.now() - dismissedAt;
    const msWindow = REMIND_AFTER_DAYS * 24 * 60 * 60 * 1000;
    setVisible(msSince > msWindow);
  }, [mounted, pathname]);

  if (!mounted || !visible || successHidden) return null;

  return (
    <div
      data-waitlist-sticky
      className="fixed bottom-0 left-0 right-0 z-30 animate-[slide-up_0.35s_ease-out]"
    >
      <WaitlistForm
        variant="sticky_footer"
        onDismiss={() => {
          try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
          } catch {
            /* ignore storage errors (private mode, etc) */
          }
          setVisible(false);
        }}
        onSuccess={() => {
          // Dismiss after success; auto-hide after a short delay so the
          // success message is visible first.
          try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
          } catch {}
          setTimeout(() => setSuccessHidden(true), 2500);
        }}
      />
    </div>
  );
}
