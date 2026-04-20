"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark" | "accent";

interface ButtonBaseProps {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-hover)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]",
  secondary:
    "bg-[var(--color-bg-cream)] text-[var(--color-text-heading)] hover:bg-[var(--color-bg-warm)] border border-[var(--color-border)]",
  outline:
    "border-2 border-[var(--color-text-heading)] text-[var(--color-text-heading)] hover:bg-[var(--color-text-heading)] hover:text-white",
  ghost:
    "text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-light)]",
  dark:
    "bg-[var(--color-bg-dark)] text-white hover:bg-[var(--color-bg-darkest)] shadow-[var(--shadow-md)]",
  accent:
    "bg-[var(--color-accent-warm)] text-white hover:bg-[var(--color-accent-warm-hover)] shadow-[var(--shadow-md)]",
};

const sizeStyles = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[15px]",
  lg: "px-9 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-[var(--radius-pill)] transition-all duration-300 cursor-pointer tracking-[-0.01em]";
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
