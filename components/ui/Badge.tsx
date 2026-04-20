interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "highlight" | "success" | "warning" | "dark";
  className?: string;
}

const variants = {
  default: "bg-[var(--color-bg-cream)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
  highlight: "bg-[var(--color-accent-light)] text-[var(--color-accent-primary)]",
  success: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  dark: "bg-[var(--color-bg-dark)] text-white",
};

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3.5 py-1.5 rounded-[var(--radius-pill)] text-xs font-semibold tracking-wide uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
