"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Pause on hover. Default true. */
  pauseOnHover?: boolean;
  /** Fade mask both sides. Default true. */
  fadeEdges?: boolean;
};

/**
 * Infinite horizontal marquee. Render your list ONCE as children; the
 * component duplicates it for seamless looping via CSS animation.
 */
export default function Marquee({
  children,
  className = "",
  pauseOnHover = true,
  fadeEdges = true,
}: MarqueeProps) {
  return (
    <div
      className={`relative overflow-hidden ${pauseOnHover ? "marquee-paused" : ""} ${className}`}
      style={
        fadeEdges
          ? {
              maskImage:
                "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
            }
          : undefined
      }
    >
      <div className="marquee-track flex gap-6" aria-hidden="false">
        <div className="flex gap-6 shrink-0">{children}</div>
        <div className="flex gap-6 shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
