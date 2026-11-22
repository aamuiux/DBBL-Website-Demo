import type { ReactElement } from "react";

/**
 * Quiet line patterns for solid-colour blocks. They draw in `currentColor`, so the parent sets the colour and
 * strength with a text colour such as `text-white/15`. Decorative only.
 */
export type PatternVariant = "waves" | "rings" | "zigzag" | "ribbons";

const box = "pointer-events-none absolute inset-0 -z-10 size-full";

export function Pattern({ variant, className = "" }: { variant: PatternVariant; className?: string }): ReactElement {
  if (variant === "waves") {
    return (
      <svg aria-hidden viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={`${box} ${className}`}>
        <g fill="none" stroke="currentColor" strokeWidth="1.3">
          {Array.from({ length: 16 }, (_, i) => {
            const y = 20 + i * 38;
            return <path key={i} d={`M-60 ${y + 40} C 140 ${y - 70}, 330 ${y + 120}, 540 ${y + 10} S 820 ${y - 50}, 900 ${y - 10}`} />;
          })}
        </g>
      </svg>
    );
  }
  if (variant === "rings") {
    return (
      <svg aria-hidden viewBox="0 0 800 600" preserveAspectRatio="xMaxYMax slice" className={`${box} ${className}`}>
        <g fill="none" stroke="currentColor" strokeWidth="1.3">
          {Array.from({ length: 13 }, (_, i) => (
            <circle key={i} cx="760" cy="560" r={50 + i * 52} />
          ))}
        </g>
      </svg>
    );
  }
  if (variant === "zigzag") {
    const rows = Array.from({ length: 11 }, (_, k) => (k - 5) * 14);
    return (
      <svg aria-hidden className={`${box} ${className}`}>
        <defs>
          <pattern id="pt-zig" width="140" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            {rows.map((y) => (
              <path key={y} d={`M0 ${y + 30} L40 ${y - 30} L140 ${y + 30}`} fill="none" stroke="currentColor" strokeWidth="1" />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pt-zig)" />
      </svg>
    );
  }
  // ribbons: thick flowing bands, like the Help stage
  return (
    <svg aria-hidden viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={`${box} ${className}`}>
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M-80 470 C 180 560 400 380 640 430 C 760 455 840 400 900 380" strokeWidth="46" />
        <path d="M-80 540 C 200 620 420 470 660 510 C 780 530 850 490 900 470" strokeWidth="12" />
        <path d="M-80 170 C 160 60 380 150 600 80 C 740 38 840 70 900 30" strokeWidth="30" />
      </g>
    </svg>
  );
}
