"use client";

import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "primary" | "cream" | "warm" | "dark" | "darkest" | "sand";
  size?: "sm" | "md" | "lg" | "full";
}

const bgColors = {
  primary: "bg-white",
  cream: "bg-[var(--color-bg-cream)]",
  warm: "bg-[var(--color-bg-warm)]",
  sand: "bg-[var(--color-bg-sand)]",
  dark: "bg-[var(--color-bg-dark)] text-white",
  darkest: "bg-[var(--color-bg-darkest)] text-white",
};

const maxWidths = {
  sm: "max-w-4xl",
  md: "max-w-6xl",
  lg: "max-w-7xl",
  full: "max-w-none",
};

export default function SectionWrapper({
  children,
  className = "",
  id,
  bg = "primary",
  size = "lg",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className={`py-24 md:py-32 lg:py-40 ${bgColors[bg]} ${className}`}
    >
      <div className={`${maxWidths[size]} mx-auto px-5 sm:px-8 lg:px-12`}>
        {children}
      </div>
    </motion.section>
  );
}
