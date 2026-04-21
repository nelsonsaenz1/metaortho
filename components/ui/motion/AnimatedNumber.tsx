"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  /** Decimal places. */
  decimals?: number;
  /** Prefix rendered before the number (e.g. "+", "$"). */
  prefix?: string;
  /** Suffix rendered after the number (e.g. "%", "k"). */
  suffix?: string;
  /** Duration in ms. Default 1100. */
  duration?: number;
  /** Extra className applied to the span. */
  className?: string;
};

/**
 * Counts up from 0 to `value` once it enters the viewport. Reduced-motion
 * users see the final value immediately.
 */
export default function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1100,
  className = "",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic, matches Emil's strong ease-out feel
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
