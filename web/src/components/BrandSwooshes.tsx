"use client";

import { motion } from "motion/react";
import { dbblSwoosh } from "@/lib/dbbl-mark";
import { useReduce } from "./ui";

const shapes = [dbblSwoosh.blue, dbblSwoosh.red, dbblSwoosh.green];

/** Tonal palettes so the swooshes sit inside a section's own colour rather than on top of it. */
export const swooshTones = {
  indigo: ["var(--color-indigo-700)", "var(--color-indigo-800)", "var(--color-indigo-600)"],
  rocket: [
    "color-mix(in srgb, var(--color-rocket) 80%, white)",
    "var(--color-rocket-700)",
    "color-mix(in srgb, var(--k-rocket-a) 85%, white)",
  ],
} as const;

/**
 * The three swooshes of DBBL's mark (no oval), oversized as background artwork, anchored right. Colours default to
 * the logo's blue, red and green; pass `colors` to blend with a section. `brandOnly` shows it only on the
 * brand-colour page (/new-design). The parent needs `isolate` so this sits above its background and below its content.
 */
export function BrandSwooshes({
  colors,
  opacity = 0.38,
  brandOnly = false,
  className = "",
}: {
  colors?: readonly string[];
  opacity?: number;
  brandOnly?: boolean;
  className?: string;
}) {
  const reduce = useReduce();
  const fills = colors ?? ["var(--color-indigo-600)", "var(--color-red-600)", "var(--color-green-600)"];
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute -z-10 aspect-[205/172] ${brandOnly ? "brand-only" : ""} ${className}`}
      initial={reduce ? false : { x: 80, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <svg className="size-full overflow-visible" viewBox="76 94 205 172" preserveAspectRatio="xMaxYMin meet">
        {shapes.map((d, i) => (
          <path key={i} d={d} style={{ fill: fills[i], fillOpacity: opacity }} />
        ))}
      </svg>
    </motion.div>
  );
}
