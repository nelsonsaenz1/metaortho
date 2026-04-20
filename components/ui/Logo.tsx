/**
 * MetaOrtho "MO" monogram logo.
 * Renders as an inline SVG so it inherits `color` from the parent
 * via `currentColor`, making it work on both light and dark backgrounds.
 */

interface LogoProps {
  className?: string;
  size?: number;
  /** Show "METAORTHO" wordmark below the monogram */
  wordmark?: boolean;
}

export default function Logo({ className = "", size = 40, wordmark = false }: LogoProps) {
  if (wordmark) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <MOMonogram size={size} />
        <span
          className="font-semibold tracking-[0.18em] uppercase mt-1"
          style={{
            fontSize: size * 0.28,
            color: "currentColor",
            fontFamily: "var(--font-body)",
          }}
        >
          METAORTHO
        </span>
      </div>
    );
  }

  return <MOMonogram size={size} className={className} />;
}

function MOMonogram({ size = 40, className = "" }: { size?: number; className?: string }) {
  // Aspect ratio from the traced logo bounding box: 638 wide × 347 tall ≈ 1.84:1
  const aspectRatio = 638 / 347;
  return (
    <svg
      width={size}
      height={size / aspectRatio}
      viewBox="948 1385 658 367"
      fill="currentColor"
      className={className}
      aria-label="MetaOrtho logo"
    >
      {/* MO monogram — traced from original PDF logo */}
      <g transform="translate(0,3300) scale(0.1,-0.1)">
        <path d="M10325 19040 c-347 -48 -612 -367 -709 -855 -36 -183 -37 -220 -34 -1380 l3 -1140 372 -3 372 -2 4 1087 c5 1307 8 1334 125 1387 90 41 143 -15 312 -324 66 -121 161 -293 217 -390 11 -19 59 -107 108 -195 48 -88 100 -180 115 -205 15 -25 46 -81 70 -125 23 -44 46 -84 50 -90 6 -9 29 -48 68 -121 122 -225 199 -312 332 -377 l85 -41 120 1 c134 0 214 25 311 95 40 28 144 147 144 163 0 4 14 26 30 50 17 24 30 46 30 49 0 6 35 66 127 213 35 56 63 104 63 107 0 3 21 38 47 78 25 40 72 116 103 168 31 52 74 122 96 155 21 33 45 72 54 86 346 599 619 862 995 959 642 165 1172 -217 1254 -905 38 -313 -23 -634 -165 -875 -309 -524 -1090 -532 -1441 -15 -221 327 -260 840 -92 1213 31 70 22 77 -28 22 -42 -46 -60 -69 -143 -180 -66 -89 -424 -674 -537 -878 -37 -68 -38 -63 4 -177 243 -664 910 -1065 1670 -1005 970 77 1615 927 1488 1960 -63 504 -348 989 -710 1207 -11 7 -51 31 -90 55 -528 322 -1324 308 -1888 -34 -329 -199 -513 -412 -945 -1093 -174 -275 -338 -515 -352 -515 -16 0 -67 80 -228 360 -52 91 -119 206 -147 255 -46 79 -73 126 -154 267 -10 18 -35 60 -54 93 -20 33 -57 98 -83 145 -165 295 -242 407 -359 525 -166 167 -402 254 -610 225z" />
      </g>
    </svg>
  );
}
