"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type ShimmerBarProps = {
  /** Target fill percent (0-100). */
  percent: number;
  /** Base track color. */
  trackClassName?: string;
  /** Fill color class. */
  fillClassName?: string;
  /** Height tailwind class, e.g. "h-2". */
  heightClassName?: string;
  /** Shimmer overlay on fill. Default true. */
  shimmer?: boolean;
  /** ms. */
  duration?: number;
  className?: string;
};

export default function ShimmerBar({
  percent,
  trackClassName = "bg-white/8",
  fillClassName = "bg-[var(--color-accent-primary)]",
  heightClassName = "h-2",
  shimmer = true,
  duration = 900,
  className = "",
}: ShimmerBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [w, setW] = useState(reduce ? percent : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setW(percent);
      return;
    }
    const t = setTimeout(() => setW(percent), 40);
    return () => clearTimeout(t);
  }, [inView, percent, reduce]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-full ${heightClassName} ${trackClassName} ${className}`}
    >
      <div
        className={`${shimmer ? "shimmer-overlay " : ""}relative h-full rounded-full transition-[width] ${fillClassName}`}
        style={{
          width: `${w}%`,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />
    </div>
  );
}
