"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links, phone } from "@/lib/links";
import { easeOut, useReduce } from "./ui";

type Key = keyof ReturnType<typeof useLang>["d"]["dock"]["items"];

const items: { key: Key; href: string; tile: string; sub: { en: string; bn: string } }[] = [
  { key: "atm", href: links.atmLocator, tile: "bg-indigo-600 text-white", sub: { en: "9,083 ATMs & CRMs", bn: "৯,০৮৩ এটিএম ও সিআরএম" } },
  { key: "open", href: links.personalAccounts, tile: "bg-green-600 text-white", sub: { en: "Personal accounts", bn: "ব্যক্তিগত অ্যাকাউন্ট" } },
  { key: "nexus", href: links.nexusPay, tile: "dock-nexus bg-indigo-950 text-lime", sub: { en: "Pay by QR or tap", bn: "কিউআর বা ট্যাপে পেমেন্ট" } },
  { key: "rocket", href: links.rocket, tile: "bg-rocket text-white", sub: { en: "Dial *322#", bn: "ডায়াল *৩২২#" } },
  { key: "call", href: `tel:${phone.hotline}`, tile: "dock-call bg-lime text-indigo-950", sub: { en: "24/7 hotline", bn: "২৪/৭ হটলাইন" } },
];

/**
 * The quick-action dock overlaps the hero's bottom edge so the five most common jobs are one tap away.
 * Each tile has its own small animated glyph that plays on hover/focus, and a spotlight follows the pointer.
 */
export function QuickDock() {
  const { d, lang } = useLang();
  const reduce = useReduce();
  const navRef = useRef<HTMLElement>(null);

  // Spotlight: a soft glow that tracks the pointer across the dock (CSS variables, no re-render).
  const onMove = (e: React.PointerEvent) => {
    const el = navRef.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-[1360px] px-5 sm:px-6 xl:px-10">
      <motion.nav
        ref={navRef}
        aria-label={d.dock.label}
        onPointerMove={onMove}
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easeOut, delay: 0.5 }}
        className="group/dock relative overflow-hidden rounded-[1.75rem] bg-white p-2 shadow-[var(--shadow-float)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/dock:opacity-100"
          style={{ background: "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--color-lime) 35%, transparent), transparent 70%)" }}
        />
        <ul className="no-scrollbar relative flex snap-x gap-1 overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible">
          {items.map(({ key, href, tile, sub }, i) => {
            const external = href.startsWith("http");
            return (
              <li key={key} className="min-w-[11.5rem] shrink-0 snap-start md:min-w-0">
                <motion.a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  initial="rest"
                  animate="rest"
                  whileHover={reduce ? undefined : "hover"}
                  whileFocus={reduce ? undefined : "hover"}
                  whileTap={reduce ? undefined : "tap"}
                  variants={{ rest: { y: 0 }, hover: { y: -3 }, tap: { scale: 0.97 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="group relative flex min-h-[4.5rem] items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-paper/80 md:px-3.5"
                >
                  <motion.span
                    variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: i % 2 ? 6 : -6, scale: 1.08 } }}
                    transition={{ type: "spring", stiffness: 380, damping: 16 }}
                    className={`relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl shadow-[0_8px_18px_-10px_rgb(9_11_58/0.6)] ${tile}`}
                  >
                    <Glyph k={key} reduce={reduce} />
                  </motion.span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.95rem] font-semibold leading-snug text-ink">{d.dock.items[key]}</span>
                    <span className="block truncate text-[0.8rem] text-ink-3">{sub[lang]}</span>
                  </span>
                  <motion.span
                    aria-hidden
                    variants={{ rest: { opacity: 0, x: -6 }, hover: { opacity: 1, x: 0 } }}
                    className="hidden text-indigo-500 xl:block"
                  >
                    <ArrowUpRight className="size-4" strokeWidth={2.4} />
                  </motion.span>
                </motion.a>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </div>
  );
}

/* ───────────── Animated glyphs: each acts out its job on hover ───────────── */

const spring = { type: "spring" as const, stiffness: 300, damping: 14 };

function Glyph({ k, reduce }: { k: Key; reduce: boolean }) {
  if (k === "atm") return <PinGlyph reduce={reduce} />;
  if (k === "open") return <OpenGlyph />;
  if (k === "nexus") return <ScanGlyph reduce={reduce} />;
  if (k === "rocket") return <RocketGlyph />;
  return <CallGlyph reduce={reduce} />;
}

/** Map pin hops and drops a ripple where it lands. */
function PinGlyph({ reduce }: { reduce: boolean }) {
  const pin: Variants = { rest: { y: 0 }, hover: { y: [0, -5, 0], transition: { duration: 0.6, repeat: reduce ? 0 : Infinity, repeatDelay: 0.25 } } };
  const ring: Variants = {
    rest: { scale: 0.4, opacity: 0 },
    hover: { scale: [0.4, 1.6], opacity: [0.7, 0], transition: { duration: 0.85, repeat: reduce ? 0 : Infinity, ease: "easeOut" } },
  };
  return (
    <svg viewBox="0 0 24 24" className="size-6 overflow-visible" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <motion.ellipse variants={ring} cx="12" cy="20.5" rx="5" ry="1.6" style={{ originX: "12px", originY: "20.5px" }} />
      <motion.g variants={pin}>
        <path d="M12 21s-6-5.3-6-10.5a6 6 0 1 1 12 0C18 15.7 12 21 12 21Z" fill="currentColor" fillOpacity={0.18} />
        <circle cx="12" cy="10.5" r="2.2" />
      </motion.g>
    </svg>
  );
}

/** A new card slides up out of the pocket, and the plus turns. */
function OpenGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 overflow-visible" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <motion.rect variants={{ rest: { y: 0, rotate: 0 }, hover: { y: -4, rotate: -8 } }} transition={spring} x="5" y="5" width="14" height="9" rx="2" fill="currentColor" fillOpacity={0.25} style={{ originX: "12px", originY: "9px" }} />
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z" fill="currentColor" fillOpacity={0.12} />
      <motion.g variants={{ rest: { rotate: 0 }, hover: { rotate: 90 } }} transition={spring} style={{ originX: "12px", originY: "16px" }}>
        <path d="M12 13.5v5M9.5 16h5" />
      </motion.g>
    </svg>
  );
}

/** A phone with a QR code and a scan line sweeping across it. */
function ScanGlyph({ reduce }: { reduce: boolean }) {
  const line: Variants = { rest: { y: 0, opacity: 0 }, hover: { y: [0, 9, 0], opacity: 1, transition: { duration: 1.1, repeat: reduce ? 0 : Infinity, ease: "easeInOut" } } };
  return (
    <svg viewBox="0 0 24 24" className="size-6 overflow-visible" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M9 7h2v2H9zM13 7h2v2h-2zM9 11h2v2H9zM13 13h2v2h-2z" fill="currentColor" stroke="none" />
      <motion.path variants={line} d="M7.5 6.5h9" strokeWidth={1.6} />
    </svg>
  );
}

/** Rocket's own icon; its paper plane takes off on hover. */
function RocketGlyph() {
  return (
    <>
      <Image src={links.rocketLogo} alt="" fill sizes="48px" quality={80} className="object-cover" />
      <motion.svg
        viewBox="0 0 40 40"
        aria-hidden
        className="absolute size-5"
        variants={{ rest: { x: -30, y: 30, opacity: 0, rotate: -20 }, hover: { x: [-30, 0, 34], y: [30, 0, -34], opacity: [0, 1, 0], rotate: -20 } }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        <path d="M3 19 37 5 26 35 19 23Z" fill="#ffffff" />
        <path d="M19 23 37 5 15 30Z" className="fill-sun" />
      </motion.svg>
    </>
  );
}

/** The handset rings, with sound waves. */
function CallGlyph({ reduce }: { reduce: boolean }) {
  const ring: Variants = { rest: { rotate: 0 }, hover: { rotate: [0, -14, 12, -10, 8, 0], transition: { duration: 0.7, repeat: reduce ? 0 : Infinity, repeatDelay: 0.4 } } };
  const wave: Variants = { rest: { opacity: 0, scale: 0.6 }, hover: { opacity: [0, 1, 0], scale: [0.6, 1, 1.15], transition: { duration: 1.1, repeat: reduce ? 0 : Infinity } } };
  return (
    <svg viewBox="0 0 24 24" className="size-6 overflow-visible" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <motion.path
        variants={ring}
        style={{ originX: "10px", originY: "14px" }}
        d="M5.5 3.5h3l1.5 4-2 1.3a11 11 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z"
        fill="currentColor"
        fillOpacity={0.2}
      />
      <motion.path variants={wave} style={{ originX: "15px", originY: "9px" }} d="M15 5.5a4 4 0 0 1 3.5 3.5M15 2a7.5 7.5 0 0 1 7 7" />
    </svg>
  );
}
