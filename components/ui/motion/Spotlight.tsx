"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Color of the glowing border arc. CSS color. */
  color?: string;
  /** Color of the soft halo behind content. CSS color. */
  glow?: string;
  style?: CSSProperties;
};

/**
 * Spotlight: cursor-tracked gradient border + soft halo.
 * Sets CSS vars --mx, --my on pointer move so .spotlight rules in globals.css paint.
 */
export default function Spotlight({
  children,
  className = "",
  color = "rgba(42, 111, 151, 0.5)",
  glow = "rgba(42, 111, 151, 0.08)",
  style,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handle(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handle}
      className={`spotlight ${className}`}
      style={{
        // @ts-expect-error — custom CSS props
        "--spotlight-color": color,
        "--spotlight-glow": glow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
