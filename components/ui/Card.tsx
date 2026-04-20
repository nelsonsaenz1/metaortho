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
          ? "hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
