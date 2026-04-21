"use client";

import { useState, useEffect } from "react";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-mobile-cta
      aria-hidden={!visible}
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-light border-t border-[var(--color-border)] px-5 py-3 transition-[opacity,transform] duration-[var(--dur-panel)] ease-[var(--ease-out)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <WaitlistCTA
        variant="dark"
        size="md"
        source="mobile-cta"
        className="w-full"
      >
        Join the waitlist
      </WaitlistCTA>
    </div>
  );
}
