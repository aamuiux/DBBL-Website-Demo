"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

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

type Tone = "primary" | "lime" | "ghost-dark" | "ghost-light" | "white";

const tones: Record<Tone, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 [--chip:var(--color-lime)] [--chip-fg:var(--color-indigo-950)]",
  lime: "bg-lime text-indigo-950 hover:bg-lime-dark [--chip:var(--color-indigo-950)] [--chip-fg:var(--color-lime)]",
  white: "bg-white text-indigo-950 hover:bg-indigo-50 [--chip:var(--color-indigo-600)] [--chip-fg:white]",
  "ghost-dark": "bg-white/10 text-white ring-1 ring-inset ring-white/30 hover:bg-white/18 backdrop-blur-sm [--chip:white] [--chip-fg:var(--color-indigo-950)]",
  "ghost-light": "bg-transparent text-indigo-700 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50 [--chip:var(--color-indigo-600)] [--chip-fg:white]",
};

/** Pill CTA with an arrow chip that slides on hover. External links open in a new tab and say so. */
export function Button({
  href,
  children,
  tone = "primary",
  external,
  size = "md",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  external?: boolean;
  size?: "md" | "lg";
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children">) {
  const isExternal = external ?? /^https?:/.test(href);
  const Icon = isExternal ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-12 items-center gap-3 rounded-full font-semibold transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-quart)] active:scale-[0.98] ${
        size === "lg" ? "pl-6 pr-1.5 py-1.5 text-[1.0625rem]" : "pl-5 pr-1.5 py-1.5 text-base"
      } ${tones[tone]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="relative grid size-9 place-items-center overflow-hidden rounded-full bg-[var(--chip)] text-[var(--chip-fg)]"
      >
        <Icon className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-6 group-hover:-translate-y-0" strokeWidth={2.25} />
        <Icon
          className="absolute size-4 -translate-x-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0"
          strokeWidth={2.25}
        />
      </span>
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
