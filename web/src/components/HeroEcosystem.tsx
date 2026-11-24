"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Briefcase, CreditCard, HandCoins, Landmark, MapPin, Rocket, Smartphone, Store, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";

/**
 * The first /new-design slide's ecosystem showcase: everything DBBL offers in one view.
 * Three creative directions, picked with ?hero=orbit | bento | trail (orbit is the default):
 *   orbit: the DBBL mark with products orbiting it
 *   bento: a tidy grid of product tiles around a hero tile
 *   trail: a customer's path through the bank, chips along a curve with a travelling pulse
 */
export type EcoDirection = "orbit" | "bento" | "trail";
export const ecoDirections: EcoDirection[] = ["orbit", "bento", "trail"];

type Item = { key: string; en: string; bn: string; stat?: { en: string; bn: string }; icon: LucideIcon; tone: string; href: string };

const items: Item[] = [
  { key: "accounts", en: "Accounts", bn: "অ্যাকাউন্ট", icon: Landmark, tone: "bg-indigo-600", href: links.personalAccounts, stat: { en: "Savings to term deposits", bn: "সঞ্চয় থেকে মেয়াদি আমানত" } },
  { key: "cards", en: "Cards", bn: "কার্ড", icon: CreditCard, tone: "bg-green-600", href: links.creditCards, stat: { en: "Debit, credit, prepaid", bn: "ডেবিট, ক্রেডিট, প্রিপেইড" } },
  { key: "loans", en: "Loans", bn: "ঋণ", icon: HandCoins, tone: "bg-red-600", href: links.retailLoan, stat: { en: "Personal, home, car", bn: "ব্যক্তিগত, বাড়ি, গাড়ি" } },
  { key: "nexuspay", en: "NexusPay", bn: "নেক্সাসপে", icon: Smartphone, tone: "bg-red-600", href: links.nexusPay, stat: { en: "Banking in your pocket", bn: "পকেটেই ব্যাংকিং" } },
  { key: "rocket", en: "Rocket", bn: "রকেট", icon: Rocket, tone: "bg-rocket", href: links.rocket, stat: { en: "First MFS in Bangladesh", bn: "দেশের প্রথম এমএফএস" } },
  { key: "atm", en: "ATMs", bn: "এটিএম", icon: MapPin, tone: "bg-indigo-600", href: links.atmLocator, stat: { en: "9,083 ATMs, CRMs & Fast Tracks", bn: "৯,০৮৩ এটিএম, সিআরএম ও ফাস্ট ট্র্যাক" } },
  { key: "agent", en: "Agent Banking", bn: "এজেন্ট ব্যাংকিং", icon: Store, tone: "bg-green-600", href: links.agentBanking, stat: { en: "The shop next door", bn: "পাশের দোকানেই" } },
  { key: "business", en: "Business", bn: "ব্যবসা", icon: Briefcase, tone: "bg-indigo-600", href: links.corporate, stat: { en: "SME and corporate", bn: "এসএমই ও কর্পোরেট" } },
];

const noop = () => () => {};
const readDirection = (): EcoDirection => {
  const q = new URLSearchParams(window.location.search).get("hero");
  return q && (ecoDirections as string[]).includes(q) ? (q as EcoDirection) : "orbit";
};

export function useEcoDirection(): EcoDirection {
  return useSyncExternalStore(noop, readDirection, () => "orbit");
}

function Chip({ item, size = "md" }: { item: Item; size?: "sm" | "md" }) {
  const { lang } = useLang();
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`pointer-events-auto inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white font-semibold text-ink shadow-[0_14px_30px_-12px_rgb(15_17_69/0.45)] ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 ${
        size === "sm" ? "py-1.5 pl-1.5 pr-3.5 text-[0.8rem]" : "py-2 pl-2 pr-4 text-sm"
      }`}
    >
      <span className={`grid place-items-center rounded-full text-white ${item.tone} ${size === "sm" ? "size-7" : "size-8"}`}>
        <Icon className={size === "sm" ? "size-3.5" : "size-4"} aria-hidden />
      </span>
      {lang === "bn" ? item.bn : item.en}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/* ───────────── A: orbit ───────────── */
const outer = items.slice(0, 5);
const inner = items.slice(5);

function OrbitRing({ list, radius, duration, reverse = false, size }: { list: Item[]; radius: string; duration: number; reverse?: boolean; size: "sm" | "md" }) {
  return (
    <div className={`eco-spin absolute inset-0 ${reverse ? "eco-spin-reverse" : ""}`} style={{ ["--eco-d" as string]: `${duration}s` }}>
      {list.map((item, i) => {
        const angle = (360 / list.length) * i + (reverse ? 40 : 0);
        return (
          <div key={item.key} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${angle}deg) translateY(calc(${radius} * -1)) rotate(${-angle}deg)` }}>
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div className={`eco-spin ${reverse ? "" : "eco-spin-reverse"}`} style={{ ["--eco-d" as string]: `${duration}s` }}>
                <Chip item={item} size={size} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Orbit({ reduce }: { reduce: boolean }) {
  return (
    <div className={`eco-orbit relative aspect-square w-[min(36rem,44vw)] ${reduce ? "eco-still" : ""}`}>
      <span aria-hidden className="absolute inset-[4%] rounded-full border border-dashed border-white/80" />
      <span aria-hidden className="absolute inset-[25%] rounded-full border border-dashed border-white/70" />
      <span aria-hidden className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.9),rgb(255_255_255/0.25)_70%,transparent)]" />
      <div className="absolute left-1/2 top-1/2 grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_24px_50px_-18px_rgb(15_17_69/0.5)]">
        <Image src="/dbbl-mark.svg" alt="" width={120} height={100} className="w-3/5" />
        <span aria-hidden className="eco-pulse absolute inset-0 rounded-full border-2 border-indigo-600/40" />
      </div>
      <OrbitRing list={outer} radius="min(16.5rem,20.3vw)" duration={70} size="md" />
      <OrbitRing list={inner} radius="min(9rem,11vw)" duration={50} reverse size="sm" />
    </div>
  );
}

/* ───────────── B: bento ───────────── */
function Bento({ reduce }: { reduce: boolean }) {
  const { lang } = useLang();
  const bn = lang === "bn";
  const order = [items[3], items[4], items[1], items[0], null, items[2], items[5], items[6], items[7]] as (Item | null)[];
  return (
    <div className="grid w-[min(34rem,42vw)] grid-cols-3 gap-3">
      {order.map((item, i) =>
        item ? (
          <motion.a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.94 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.5 + i * 0.07 }}
            className="pointer-events-auto group relative flex aspect-[1/1.05] flex-col justify-between rounded-3xl bg-white/85 p-4 shadow-[0_18px_36px_-18px_rgb(15_17_69/0.45)] ring-1 ring-white/70 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
          >
            <span className={`grid size-10 place-items-center rounded-2xl text-white ${item.tone}`}>
              <item.icon className="size-5" aria-hidden />
            </span>
            <span>
              <span className="font-display block text-[1.05rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{bn ? item.bn : item.en}</span>
              {item.stat && <span className="mt-0.5 block text-[0.72rem] leading-snug text-ink-2">{bn ? item.stat.bn : item.stat.en}</span>}
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </motion.a>
        ) : (
          <motion.div
            key="mark"
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.4 }}
            className="grid aspect-[1/1.05] place-items-center rounded-3xl bg-indigo-600 p-4 text-center text-white shadow-[0_18px_36px_-18px_rgb(15_17_69/0.6)]"
          >
            <span className="grid place-items-center gap-2">
              <span className="grid size-14 place-items-center rounded-full bg-white">
                <Image src="/dbbl-mark.svg" alt="" width={90} height={75} className="w-8" />
              </span>
              <span className="font-display text-[0.95rem] font-semibold leading-tight">{bn ? "এক ব্যাংক, সব সেবা" : "One bank, every way to bank"}</span>
            </span>
          </motion.div>
        ),
      )}
    </div>
  );
}

/* ───────────── C: trail ───────────── */
const trailPath = "M 30 70 C 330 10, 470 150, 270 250 S 40 400, 300 470 S 470 560, 420 620";

function Trail({ reduce }: { reduce: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    setPts(items.map((_, i) => p.getPointAtLength(len * (0.05 + (i / (items.length - 1)) * 0.9))));
  }, []);
  return (
    <div className="relative aspect-[500/650] h-[min(33rem,66vh)]">
      <svg viewBox="0 0 500 650" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <path ref={pathRef} d={trailPath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" strokeOpacity="0.95" />
        {!reduce && (
          <circle r="9" fill="var(--color-red-600)">
            <animateMotion dur="12s" repeatCount="indefinite" path={trailPath} />
          </circle>
        )}
      </svg>
      {pts.map((pt, i) => (
        <motion.div
          key={items[i].key}
          className="absolute"
          style={{ left: `${(pt.x / 500) * 100}%`, top: `${(pt.y / 650) * 100}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.5 + i * 0.12 }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <Chip item={items[i]} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Desktop showcase, to the right of the campaign lockup. */
export function HeroEcosystem({ direction, reduce }: { direction: EcoDirection; reduce: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[52%] items-center justify-center pb-28 pt-[calc(var(--header-h)+1rem)] lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      transition={{ duration: 0.9, delay: 0.2 }}
    >
      {direction === "orbit" ? <Orbit reduce={reduce} /> : direction === "bento" ? <Bento reduce={reduce} /> : <Trail reduce={reduce} />}
    </motion.div>
  );
}

/** Phones and tablets: the same ecosystem as a swipeable row of chips under the buttons. */
export function EcosystemChips() {
  return (
    <ul className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 lg:hidden [scrollbar-width:none]" aria-label="DBBL products">
      {items.map((item) => (
        <li key={item.key} className="shrink-0">
          <Chip item={item} size="sm" />
        </li>
      ))}
    </ul>
  );
}
