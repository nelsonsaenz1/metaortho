"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. Default 6. */
  max?: number;
  /** Glare overlay color. Pass empty string to disable. */
  glare?: string;
};

/**
 * Subtle 3D tilt that follows the cursor. Wrapped element becomes the card.
 * Respects prefers-reduced-motion.
 */
export default function TiltCard({
  children,
  className = "",
  max = 6,
  glare = "rgba(255,255,255,0.22)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 22 });
  const sy = useSpring(my, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1200,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {glare && !reduce && (
        <motion.div
          aria-hidden
          style={{
            background: `radial-gradient(400px circle at ${glareX.get?.() ?? "50%"} ${glareY.get?.() ?? "50%"}, ${glare}, transparent 60%)`,
          }}
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
        />
      )}
    </motion.div>
  );
}
