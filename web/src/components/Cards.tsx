"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { cardGroups, type CardSpec } from "@/lib/content";
import { Button, useReduce } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const MQ = "(min-width: 1024px) and (min-height: 700px) and (pointer: fine)";
function subscribeMq(cb: () => void) {
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Fan geometry: cards pivot around a point far below the deck, so rotation alone draws an arc. */
const PIVOT = "50% 230%";
const fanAngle = (i: number, n: number) => (n === 1 ? 0 : -18 + (36 * i) / (n - 1));
const jitter = [-3, 2, -1.5, 3, -2.5, 1.5];

/**
 * "A card for every way you pay". On large screens the section pins and the scroll deals each card
 * family in turn: the deck rises, fans out to show every card in it, then flies off for the next family.
 * Elsewhere the families are tabs, and the chosen deck fans out on its own.
 */
export function Cards() {
  const { d, lang } = useLang();
  const reduce = useReduce();
  const id = useId();
  const bn = lang === "bn";
  const sectionRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [step, setStep] = useState(0);

  const wide = useSyncExternalStore(subscribeMq, () => window.matchMedia(MQ).matches, () => false);
  const pinned = wide && !reduce;

  useIsoLayoutEffect(() => {
    const el = sectionRef.current;
    if (!pinned || !el) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      const groups = q("[data-deck]");
      // Every deck starts below the stage, stacked; the first is dealt in as the section arrives.
      groups.forEach((g) => {
        gsap.set(g.querySelectorAll("[data-card]"), { transformOrigin: PIVOT, y: 260, autoAlpha: 0, rotate: 0 });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.2}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => setStep(Math.min(cardGroups.length - 1, Math.floor(self.progress * cardGroups.length))),
        },
      });

      groups.forEach((g, gi) => {
        const cards = gsap.utils.toArray<HTMLElement>(g.querySelectorAll("[data-card]"));
        const n = cards.length;
        const t = gi; // each family owns one unit of the timeline
        // Deal: the deck rises into place, slightly askew.
        tl.to(cards, { y: (i) => -i * 3, autoAlpha: 1, rotate: (i) => jitter[i % jitter.length], duration: 0.22, stagger: 0.025, ease: "power3.out" }, t + (gi === 0 ? 0 : 0.02))
          // Fan: spread into an arc so every card in the family shows.
          .to(cards, { rotate: (i) => fanAngle(i, n), y: (i) => -Math.abs(fanAngle(i, n)) * 0.6, duration: 0.33, stagger: 0.015 }, t + 0.28);
        // Exit (all but the last family): the fan sweeps up and away.
        if (gi < groups.length - 1) {
          tl.to(cards, { y: -420, autoAlpha: 0, rotate: (i) => fanAngle(i, n) * 1.6, duration: 0.22, stagger: 0.015, ease: "power2.in" }, t + 0.78);
        }
      });
      tl.set({}, {}, cardGroups.length);
      stRef.current = tl.scrollTrigger ?? null;
    }, el);
    return () => {
      ctx.revert();
      stRef.current = null;
    };
  }, [pinned]);

  const choose = (i: number) => {
    const st = stRef.current;
    if (pinned && st) {
      const y = st.start + ((i + 0.6) / cardGroups.length) * (st.end - st.start);
      const lenis = (window as unknown as { __lenis?: { scrollTo(y: number, o?: object): void } }).__lenis;
      if (lenis) lenis.scrollTo(y, { duration: 1.1 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    } else setStep(i);
  };

  const list = (
    <ol className="mt-8 space-y-2" aria-label={bn ? "কার্ডের ধরন" : "Card families"}>
      {d.cards.list.map((c, i) => {
        const active = i === step;
        const group = cardGroups[i];
        return (
          <li key={c.name}>
            <button
              type="button"
              onClick={() => choose(i)}
              aria-current={active ? "step" : undefined}
              className={`w-full rounded-2xl px-5 py-4 text-left transition-[background-color,box-shadow] duration-500 ${
                active ? "bg-white shadow-[var(--shadow-card)] ring-1 ring-inset ring-line" : "hover:bg-white/60"
              }`}
            >
              <span className="flex items-center justify-between gap-4">
                <span className={`font-display text-2xl font-semibold tracking-[-0.02em] transition-colors ${active ? "text-indigo-700" : "text-ink-2"}`}>{c.name}</span>
                <span className={`tabular rounded-full px-2.5 py-0.5 text-sm font-semibold transition-colors ${active ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-700"}`}>
                  {group.cards.length} {bn ? "টি কার্ড" : "cards"}
                </span>
              </span>
              <span
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <span className="overflow-hidden">
                  <span className="mt-2 block max-w-[46ch] text-ink-2">{c.body}</span>
                  <span className="mt-3 block text-sm text-ink-3">{group.cards.map((x) => x.name).join(" · ")}</span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  const heading = (
    <>
      <h2 id={`${id}-h`} className="font-display text-balance text-[clamp(2.4rem,4.4vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
        {d.cards.title}
      </h2>
      <p className="mt-5 max-w-[48ch] text-pretty text-lg text-ink-2">{d.cards.lede}</p>
    </>
  );

  const group = cardGroups[step];
  const footer = (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <Button href={links.creditCards} tone="primary" size="lg">
        {d.cards.cta}
      </Button>
      <a
        href={links[group.href]}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-semibold text-indigo-700 underline decoration-indigo-200 underline-offset-4 hover:decoration-indigo-600"
      >
        {bn ? `সব ${d.cards.list[step].name} কার্ড` : `All ${d.cards.list[step].name} cards`}
        <ArrowUpRight className="size-4" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );

  /* ───────── Pinned: decks dealt by the scroll ───────── */
  if (pinned) {
    return (
      <section ref={sectionRef} aria-labelledby={`${id}-h`} className="cards-bg relative h-svh overflow-hidden bg-[linear-gradient(180deg,var(--color-indigo-50)_0%,var(--color-indigo-100)_100%)]">
        <div className="mx-auto grid h-full max-w-[1360px] grid-cols-[1fr_1.15fr] items-center gap-12 px-6 pt-[var(--header-h)] xl:px-10">
          <div>
            {heading}
            {list}
            {footer}
          </div>
          <div className="relative h-full max-h-[44rem]">
            <span aria-hidden className="absolute left-1/2 top-[58%] size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-indigo-100),transparent_68%)]" />
            {cardGroups.map((g, gi) => (
              <div key={g.key} data-deck className="absolute inset-0" aria-hidden={gi !== step}>
                {g.cards.map((c, i) => (
                  <div key={c.name} data-card className="absolute left-[46%] top-[44%] w-[min(21rem,26vw)] -translate-x-1/2" style={{ zIndex: i }}>
                    <CardFace spec={c} />
                  </div>
                ))}
              </div>
            ))}
            <p className="absolute inset-x-0 bottom-6 text-center text-sm text-ink-3">{bn ? "চিত্রণমূলক কার্ড ডিজাইন, আসল কার্ড নয়" : "Illustrative card designs, not actual DBBL cards"}</p>
          </div>
        </div>
      </section>
    );
  }

  /* ───────── Static: tabs, and the chosen deck fans out ───────── */
  return (
    <section ref={sectionRef} aria-labelledby={`${id}-h`} className="cards-bg relative overflow-hidden bg-[linear-gradient(180deg,var(--color-indigo-50)_0%,var(--color-indigo-100)_100%)] py-24 md:py-32">
      <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr] xl:px-10">
        <div>
          {heading}
          {list}
          {footer}
        </div>
        <div className="relative mx-auto h-[24rem] w-full max-w-[34rem] sm:h-[28rem]">
          <span aria-hidden className="absolute left-1/2 top-[58%] size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-indigo-100),transparent_68%)]" />
          {group.cards.map((c, i) => {
            const n = group.cards.length;
            return (
              <motion.div
                key={`${group.key}-${c.name}`}
                initial={reduce ? false : { y: 200, opacity: 0, rotate: 0 }}
                animate={{ y: -Math.abs(fanAngle(i, n)) * 0.4, opacity: 1, rotate: fanAngle(i, n) * 0.55 }}
                transition={{ type: "spring", stiffness: 140, damping: 18, delay: i * 0.05 }}
                className="absolute left-1/2 top-[40%] w-[min(17rem,54vw)] -translate-x-1/2"
                style={{ zIndex: i, transformOrigin: PIVOT }}
              >
                <CardFace spec={c} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** An illustrative card design (not a real DBBL card face). Hover lifts it and names it. */
function CardFace({ spec }: { spec: CardSpec }) {
  const light = spec.ink === "light";
  const text = light ? "text-white" : "text-[#1d1a10]";
  return (
    <div className="group relative transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-6">
      <div
        role="img"
        aria-label={spec.name}
        className={`card-face @container relative aspect-[1.586/1] overflow-hidden rounded-[0.9rem] shadow-[0_24px_50px_-22px_rgb(9_11_58/0.55)] ring-1 ring-black/10 ${text}`}
        style={{ "--cbg": spec.bg, "--cbg2": spec.bg2 } as CSSProperties}
      >
        {/* Decorative arcs and a soft sheen */}
        <span aria-hidden className="card-arc absolute -right-[18%] -top-[45%] size-[85%] rounded-full border-[2.2cqw] opacity-25" style={{ "--cac": spec.accent, "--cac2": spec.accent2 } as CSSProperties} />
        <span aria-hidden className="card-arc absolute -right-[4%] -top-[30%] size-[85%] rounded-full border-[1cqw] opacity-20" style={{ "--cac": spec.accent, "--cac2": spec.accent2 } as CSSProperties} />
        <span aria-hidden className="absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.22),transparent_38%,transparent_70%,rgb(255_255_255/0.08))]" />

        {/* Top row: DBBL mark and the tier */}
        <div className="absolute inset-x-[6%] top-[8%] flex items-start justify-between">
          <span className="flex items-center gap-[2cqw]">
            <span className="grid h-[11cqw] w-[15cqw] place-items-center rounded-[1.6cqw] bg-white/90">
              <Image src="/dbbl-mark.svg" alt="" width={80} height={53} className="w-[10.5cqw]" />
            </span>
            <span className="font-display text-[4.4cqw] font-bold leading-none tracking-[-0.01em]">Dutch-Bangla Bank</span>
          </span>
          <span className="rounded-full px-[2.6cqw] py-[1cqw] text-[3.2cqw] font-semibold" style={{ background: light ? "rgb(255 255 255 / 0.16)" : "rgb(0 0 0 / 0.1)" }}>
            {spec.tier}
          </span>
        </div>

        {/* Chip and contactless */}
        <div className="absolute left-[6%] top-[38%] flex items-center gap-[4cqw]">
          <span className="relative block h-[12cqw] w-[16.5cqw] overflow-hidden rounded-[2cqw] bg-[linear-gradient(135deg,var(--k-gold-a),var(--k-gold-b))] shadow-sm">
            <span className="absolute inset-x-0 top-1/2 h-px bg-black/25" />
            <span className="absolute inset-y-0 left-1/3 w-px bg-black/25" />
            <span className="absolute inset-y-0 left-2/3 w-px bg-black/25" />
          </span>
          <svg viewBox="0 0 24 24" className="size-[7cqw] opacity-80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M8 6a8 8 0 0 1 0 12M12 3.5a12 12 0 0 1 0 17M16 1a16 16 0 0 1 0 22" transform="scale(.9) translate(1 1)" />
          </svg>
        </div>

        {/* Number, name, network */}
        <div className="absolute inset-x-[6%] bottom-[8%]">
          <p className="tabular text-[5.6cqw] font-semibold tracking-[0.12em] opacity-90">•••• •••• •••• 0000</p>
          <div className="mt-[2.4cqw] flex items-end justify-between">
            <span className="text-[3.2cqw] font-medium uppercase tracking-[0.14em] opacity-80">Your Name</span>
            {spec.network === "visa" && <span className="font-display text-[8cqw] font-extrabold italic leading-none tracking-[-0.04em]">VISA</span>}
            {spec.network === "mastercard" && <span className="text-[4.6cqw] font-bold leading-none tracking-[-0.02em]">mastercard</span>}
          </div>
        </div>
      </div>
      <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-indigo-950 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {spec.name}
      </span>
    </div>
  );
}
