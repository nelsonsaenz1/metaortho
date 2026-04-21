"use client";

import type { ReactNode } from "react";
import { useWaitlist } from "./WaitlistModal";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark" | "onDark";
type Size = "sm" | "md" | "lg";

type Props = {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Label for analytics. */
  source?: string;
  sourcePage?: string;
  /** Override modal copy. */
  eyebrow?: string;
  headline?: ReactNode;
  subcopy?: ReactNode;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-hover)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]",
  secondary:
    "bg-[var(--color-bg-cream)] text-[var(--color-text-heading)] hover:bg-[var(--color-bg-warm)] border border-[var(--color-border)]",
  outline:
    "border-2 border-[var(--color-text-heading)] text-[var(--color-text-heading)] hover:bg-[var(--color-text-heading)] hover:text-white",
  ghost:
    "text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-light)]",
  dark: "bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)]",
  onDark:
    "bg-white text-[var(--color-bg-dark)] hover:bg-white/90 shadow-[var(--shadow-xl)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[15px]",
  lg: "px-9 py-4 text-base",
};

/**
 * Primary waitlist CTA. Triggers the shared modal on click.
 * Replaces "Book Assessment" buttons during the MVP / pre-launch phase.
 */
export default function WaitlistCTA({
  children = "Join the waitlist",
  variant = "dark",
  size = "md",
  className = "",
  source,
  sourcePage,
  eyebrow,
  headline,
  subcopy,
}: Props) {
  const { open } = useWaitlist();
  return (
    <button
      type="button"
      onClick={() => open({ source, sourcePage, eyebrow, headline, subcopy })}
      className={`inline-flex items-center justify-center font-semibold rounded-[var(--radius-pill)] cursor-pointer tracking-[-0.01em] transition-[background-color,color,box-shadow,transform,border-color] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:scale-[0.97] active:duration-[var(--dur-press)] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
