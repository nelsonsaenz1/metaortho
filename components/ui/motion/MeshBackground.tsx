"use client";

type MeshBackgroundProps = {
  /** "light" or "dark" preset. */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Soft animated mesh gradient — three drifting blobs + tiny grain.
 * Pointer-events-none; place behind content.
 */
export default function MeshBackground({
  variant = "light",
  className = "",
}: MeshBackgroundProps) {
  const isDark = variant === "dark";

  const blobs = isDark
    ? [
        {
          className:
            "top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[var(--color-accent-primary)]/14 blur-[160px] mesh-blob",
        },
        {
          className:
            "top-[20%] right-[-15%] w-[50vw] h-[50vw] bg-[var(--color-accent-teal)]/10 blur-[140px] mesh-blob-slow",
        },
        {
          className:
            "bottom-[-25%] left-[15%] w-[55vw] h-[55vw] bg-[var(--color-accent-warm)]/8 blur-[150px] mesh-blob",
        },
      ]
    : [
        {
          className:
            "top-[-25%] left-[-10%] w-[60vw] h-[60vw] bg-[var(--color-accent-primary)]/14 blur-[140px] mesh-blob",
        },
        {
          className:
            "top-[10%] right-[-15%] w-[45vw] h-[45vw] bg-[var(--color-accent-warm)]/14 blur-[120px] mesh-blob-slow",
        },
        {
          className:
            "bottom-[-20%] left-[25%] w-[50vw] h-[50vw] bg-[var(--color-accent-teal)]/10 blur-[130px] mesh-blob",
        },
      ];

  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {blobs.map((b, i) => (
        <div key={i} className={`absolute rounded-full ${b.className}`} />
      ))}
      {/* micro-grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? "rgba(255,255,255,0.5)" : "rgba(10,38,51,0.4)"} 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
