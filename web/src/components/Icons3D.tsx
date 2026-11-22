import type { ReactElement } from "react";

/**
 * Soft 3D-style icons drawn in SVG (gradients, lit faces, a contact shadow). Decorative: the card carries the label.
 * Each is a 160×160 box.
 */
const shadow = <ellipse cx="80" cy="144" rx="52" ry="9" fill="#000" opacity="0.28" />;

export function CoinsIcon3D({ className = "" }: { className?: string }): ReactElement {
  const coin = (y: number, k: number) => (
    <g key={k}>
      <path d={`M32 ${y} v14 a48 14 0 0 0 96 0 v-14 z`} fill="url(#c3-side)" />
      <ellipse cx="80" cy={y} rx="48" ry="14" fill="url(#c3-top)" />
      <ellipse cx="80" cy={y} rx="35" ry="9.5" fill="none" stroke="#b9780b" strokeOpacity="0.45" strokeWidth="2" />
      <path d={`M42 ${y + 9} a44 12 0 0 0 36 6`} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
  return (
    <svg aria-hidden viewBox="0 0 160 160" className={className}>
      <defs>
        <linearGradient id="c3-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0a8" />
          <stop offset="1" stopColor="#f2b51d" />
        </linearGradient>
        <linearGradient id="c3-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9930f" />
          <stop offset="0.5" stopColor="#f6c638" />
          <stop offset="1" stopColor="#b97a08" />
        </linearGradient>
        <radialGradient id="c3-face" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#fff4b8" />
          <stop offset="1" stopColor="#eea912" />
        </radialGradient>
      </defs>
      {shadow}
      {[124, 106, 88].map((y, i) => coin(y, i))}
      {/* the standing coin */}
      <g transform="rotate(-14 100 56)">
        <circle cx="100" cy="58" r="30" fill="#b97a08" />
        <circle cx="97" cy="55" r="30" fill="url(#c3-face)" />
        <circle cx="97" cy="55" r="23" fill="none" stroke="#b9780b" strokeOpacity="0.45" strokeWidth="2.5" />
        <text x="97" y="66" textAnchor="middle" fontSize="32" fontWeight="800" fill="#a56a06" fontFamily="system-ui, sans-serif">৳</text>
        <path d="M76 40 a26 26 0 0 1 20 -10" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function HouseIcon3D({ className = "" }: { className?: string }): ReactElement {
  return (
    <svg aria-hidden viewBox="0 0 160 160" className={className}>
      <defs>
        <linearGradient id="h3-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6ebe7" />
        </linearGradient>
        <linearGradient id="h3-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9d3cc" />
          <stop offset="1" stopColor="#a9b6ae" />
        </linearGradient>
        <linearGradient id="h3-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6b4a" />
          <stop offset="1" stopColor="#d4302a" />
        </linearGradient>
        <linearGradient id="h3-roof2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c0271f" />
          <stop offset="1" stopColor="#8f1712" />
        </linearGradient>
      </defs>
      {shadow}
      {/* walls: front and right side */}
      <path d="M30 78 L84 78 L84 138 L30 138 Z" fill="url(#h3-front)" />
      <path d="M84 78 L126 62 L126 122 L84 138 Z" fill="url(#h3-side)" />
      {/* roof: front gable and long right face */}
      <path d="M22 80 L57 38 L92 80 Z" fill="url(#h3-roof)" />
      <path d="M57 38 L99 24 L134 64 L92 80 Z" fill="url(#h3-roof2)" />
      <path d="M57 38 L99 24" stroke="#ff9a7c" strokeWidth="2.5" strokeLinecap="round" />
      {/* chimney */}
      <path d="M96 30 v-14 h12 v22 z" fill="#b6433b" />
      <rect x="96" y="14" width="12" height="4" rx="1" fill="#d96a60" />
      {/* door and windows */}
      <rect x="48" y="104" width="20" height="34" rx="3" fill="#0e1150" />
      <circle cx="63" cy="122" r="1.8" fill="#ffd37a" />
      <rect x="36" y="88" width="14" height="12" rx="2" fill="#9fd6f5" />
      <rect x="62" y="88" width="14" height="12" rx="2" fill="#9fd6f5" />
      <path d="M92 96 l24 -9 v18 l-24 9 z" fill="#7cc1ea" />
      <path d="M92 96 l24 -9" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
      {/* a little bush */}
      <circle cx="26" cy="136" r="9" fill="#12a65b" />
      <circle cx="35" cy="138" r="7" fill="#00904a" />
    </svg>
  );
}

export function CarIcon3D({ className = "" }: { className?: string }): ReactElement {
  return (
    <svg aria-hidden viewBox="0 0 160 160" className={className}>
      <defs>
        <linearGradient id="k3-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a63e0" />
          <stop offset="1" stopColor="#252a86" />
        </linearGradient>
        <linearGradient id="k3-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9f1ff" />
          <stop offset="1" stopColor="#7cc1ea" />
        </linearGradient>
        <radialGradient id="k3-rim" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#aeb4c9" />
        </radialGradient>
      </defs>
      {shadow}
      {/* body */}
      <path d="M14 112 C14 98 22 92 34 90 L52 62 C57 54 64 50 74 50 L102 50 C112 50 118 54 124 62 L134 84 C144 88 148 96 148 108 L148 118 C148 122 145 124 141 124 L21 124 C17 124 14 122 14 118 Z" fill="url(#k3-body)" />
      {/* roof highlight and lower sill shade */}
      <path d="M58 66 C62 59 67 56 74 56 L100 56 C108 56 113 59 118 66" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 112 L148 112 L148 118 C148 122 145 124 141 124 L21 124 C17 124 14 122 14 118 Z" fill="#0e1150" opacity="0.45" />
      {/* windows */}
      <path d="M58 88 L68 66 C70 62 73 60 77 60 L92 60 L92 88 Z" fill="url(#k3-glass)" />
      <path d="M98 60 L106 60 C111 60 114 62 117 67 L125 88 L98 88 Z" fill="url(#k3-glass)" />
      <path d="M62 84 L70 68" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
      {/* door line, handle, lights */}
      <path d="M95 62 V112" stroke="#1a1f6b" strokeOpacity="0.6" strokeWidth="2" />
      <rect x="102" y="94" width="12" height="4" rx="2" fill="#c8cdf5" />
      <path d="M140 100 h8 v8 h-8 z" fill="#ffe27a" />
      <rect x="14" y="100" width="7" height="8" rx="2" fill="#ff5d4d" />
      {/* wheels */}
      {[44, 118].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="122" r="17" fill="#10122e" />
          <circle cx={cx} cy="122" r="10.5" fill="url(#k3-rim)" />
          <circle cx={cx} cy="122" r="3.5" fill="#6b6f8e" />
          {[0, 72, 144, 216, 288].map((a) => (
            <rect key={a} x={cx - 1.2} y="113" width="2.4" height="6" rx="1.2" fill="#8d93ad" transform={`rotate(${a} ${cx} 122)`} />
          ))}
        </g>
      ))}
    </svg>
  );
}
