"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ComponentType, CSSProperties, ReactNode } from "react";

export const easeOut = [0.16, 1, 0.3, 1] as const;

/** Reduced motion, plus a `?still` capture mode so review screenshots never catch an entrance mid-flight. */
const still = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("still");
export function useReduce() {
  const r = useReducedMotion();
  return r || still;
}

/** Reveal: content is visible by default (no-JS, reduced motion); motion only lifts it in. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "header" | "p";
}) {
  const reduce = useReduce();
  const M = motion[as];
  if (reduce) return <M className={className}>{children}</M>;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {children}
    </M>
  );
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export type Tone = "primary" | "green" | "ink" | "lime" | "white" | "ghost-dark" | "ghost-light";

/**
 * surface = the pill at rest, fill = the circle that sweeps across on hover, on = icon colour over the fill,
 * over = the label colour once the fill covers it (written out in full so Tailwind generates it).
 */
const tones: Record<Tone, { surface: string; fill: string; on: string; over: string }> = {
  primary: {
    surface: "bg-indigo-50/90 text-indigo-950 ring-indigo-100",
    fill: "bg-indigo-600",
    on: "text-white",
    over: "group-hover:text-white group-focus-visible:text-white",
  },
  green: {
    surface: "bg-green-100 text-indigo-950 ring-green-600/15",
    fill: "bg-green-600",
    on: "text-white",
    over: "group-hover:text-white group-focus-visible:text-white",
  },
  ink: {
    surface: "bg-white/70 text-indigo-950 ring-indigo-950/10",
    fill: "bg-indigo-950",
    on: "text-lime",
    over: "group-hover:text-white group-focus-visible:text-white",
  },
  lime: {
    surface: "bg-white/12 text-white ring-white/25",
    fill: "bg-lime",
    on: "text-indigo-950",
    over: "group-hover:text-indigo-950 group-focus-visible:text-indigo-950",
  },
  white: {
    surface: "bg-white/16 text-white ring-white/30",
    fill: "bg-white",
    on: "text-indigo-950",
    over: "group-hover:text-indigo-950 group-focus-visible:text-indigo-950",
  },
  "ghost-dark": {
    surface: "bg-transparent text-white ring-white/35",
    fill: "bg-white",
    on: "text-indigo-950",
    over: "group-hover:text-indigo-950 group-focus-visible:text-indigo-950",
  },
  "ghost-light": {
    surface: "bg-transparent text-indigo-950 ring-indigo-950/20",
    fill: "bg-indigo-950",
    on: "text-white",
    over: "group-hover:text-white group-focus-visible:text-white",
  },
};

const sizes = {
  sm: { h: "2.75rem", text: "text-sm", pad: "pl-1 pr-5", icon: "size-4" },
  md: { h: "3rem", text: "text-base", pad: "pl-1.5 pr-6", icon: "size-[1.1rem]" },
  lg: { h: "3.5rem", text: "text-[1.0625rem]", pad: "pl-1.5 pr-7", icon: "size-5" },
};

/** The sweep shared by every button: a sharp ease-in-out, as in the reference. */
const sweep = "duration-[480ms] ease-[cubic-bezier(0.65,0,0.076,1)] motion-reduce:transition-none";

/**
 * Pill CTA. An icon sits in a filled circle on the left; on hover or keyboard focus the fill sweeps across
 * the whole pill, the icon nudges forward and the label flips to the fill's text colour.
 * External links open in a new tab and say so.
 */
export function Button({
  href,
  children,
  tone = "primary",
  external,
  size = "md",
  icon,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  external?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children">) {
  const isExternal = external ?? /^https?:/.test(href);
  const Icon = icon ?? (isExternal ? ArrowUpRight : ArrowRight);
  const t = tones[tone];
  const s = sizes[size];
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ "--h": s.h } as CSSProperties}
      className={`btn-${tone} group relative isolate inline-flex h-[var(--h)] items-center overflow-hidden whitespace-nowrap rounded-full font-semibold ring-1 ring-inset backdrop-blur-md transition-transform duration-200 active:scale-[0.97] ${s.text} ${t.surface} ${className}`}
      {...rest}
    >
      <span
        aria-hidden
        className={`btn-fill absolute inset-y-[3px] left-[3px] -z-10 w-[calc(var(--h)-6px)] rounded-full shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)] transition-[width] group-hover:w-[calc(100%-6px)] group-focus-visible:w-[calc(100%-6px)] ${sweep} ${t.fill}`}
      />
      <span aria-hidden className={`btn-on grid size-[var(--h)] shrink-0 place-items-center transition-transform group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 ${sweep} ${t.on}`}>
        <Icon className={s.icon} strokeWidth={2.25} />
      </span>
      <span className={`btn-label ${s.pad} transition-colors duration-300 ${t.over}`}>{children}</span>
      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const isExternal = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-800 ${className}`}
    >
      <span className="underline decoration-indigo-200 underline-offset-4 transition-colors group-hover:decoration-current">{children}</span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.25} aria-hidden />
    </a>
  );
}

export function SectionHeading({
  title,
  lede,
  dark,
  className = "",
  id,
}: {
  title: string;
  lede?: string;
  dark?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal>
        <h2
          id={id}
          className={`font-display text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.08}>
          <p className={`mt-5 max-w-[60ch] text-pretty text-lg ${dark ? "text-indigo-200" : "text-ink-2"}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
