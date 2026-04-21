"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Max pixel pull. Default 10. */
  strength?: number;
  /** Inner stiffness of the pull. */
  stiffness?: number;
};

/**
 * Magnetic hover: element drifts toward the cursor with spring physics.
 * Content stays static; outer wrapper translates. Disabled by reduced-motion.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 10,
  stiffness = 180,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness, damping: 14, mass: 0.2 });
  const sy = useSpring(y, { stiffness, damping: 14, mass: 0.2 });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    x.set(relX * strength * 2);
    y.set(relY * strength * 2);
  }
  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  const wrapperClasses = `inline-flex ${className}`;

  const content = (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: sx, y: sy }}
      className={wrapperClasses}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-flex">
        {content}
      </a>
    );
  }
  return content;
}
