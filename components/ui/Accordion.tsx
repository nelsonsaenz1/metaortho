"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-0 divide-y divide-[var(--color-border)]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-6 text-left group cursor-pointer active:opacity-70 motion-reduce:active:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 rounded-[var(--radius-sm)]"
            >
              <span className="font-medium text-lg text-[var(--color-text-heading)] pr-8 group-hover:text-[var(--color-accent-primary)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)] tracking-[-0.01em]">
                {item.question}
              </span>
              <span
                className={`text-[var(--color-text-tertiary)] transition-transform duration-[var(--dur-panel)] ease-[var(--ease-out)] flex-shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
