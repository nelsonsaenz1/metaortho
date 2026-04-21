"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type DrawnPathProps = {
  /** SVG viewBox content. */
  d: string;
  width: number;
  height: number;
  className?: string;
  strokeClassName?: string;
  strokeWidth?: number;
  /** ms */
  duration?: number;
  /** px between dashes for dotted style. Leave 0 for solid stroke. */
  dash?: number;
};

/**
 * SVG path that draws itself when it enters the viewport.
 * Uses stroke-dasharray/offset trick — pure CSS paint, no layout thrash.
 */
export default function DrawnPath({
  d,
  width,
  height,
  className = "",
  strokeClassName = "stroke-[var(--color-accent-primary)]",
  strokeWidth = 2,
  duration = 1400,
  dash = 0,
}: DrawnPathProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      const l = pathRef.current.getTotalLength();
      setLen(l);
    }
  }, [d]);

  const strokeDasharray = dash > 0 ? `${dash} ${dash}` : len || 1;
  const strokeDashoffset = reduce ? 0 : inView ? 0 : len || 1;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      className={className}
    >
      <path
        ref={pathRef}
        d={d}
        className={strokeClassName}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray,
          strokeDashoffset,
          transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`,
        }}
      />
    </svg>
  );
}
