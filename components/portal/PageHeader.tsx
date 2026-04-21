"use client";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="px-6 md:px-10 pt-8 md:pt-12 pb-6 md:pb-8 bg-white border-b border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-3">
              {eyebrow}
            </p>
          )}
          <h1
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal tracking-[-0.03em] text-[var(--color-text-heading)] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {right && <div className="flex-shrink-0">{right}</div>}
      </div>
    </div>
  );
}
