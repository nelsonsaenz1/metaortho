"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-5",
  md: "p-7",
  lg: "p-9",
};

export default function Card({
  children,
  className = "",
  hover = true,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] ${paddings[padding]} ${
        hover
          ? "transition-[box-shadow,transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
