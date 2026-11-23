"use client";

import { useId, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays, Clapperboard, FileText, Globe2, Plane, ShoppingBasket, Sparkles, Trophy, Tv, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { offers, udyog, type Offer } from "@/lib/content";
import { Button, Reveal, useReduce } from "./ui";

const kindIcon: Record<Offer["kind"], LucideIcon> = {
  travel: Plane,
  movie: Clapperboard,
  grocery: ShoppingBasket,
  electronics: Tv,
  online: Globe2,
  win: Trophy,
  card: Sparkles,
};

/** Offers ticker: a strip of live DBBL card campaigns, sliding forever, paused on hover/focus. */
export function OffersTicker() {
  const { lang } = useLang();
  const row = offers.map((o) => `${o.partner} · ${o.title[lang]}`);
  const items = [...row, ...row];
  return (
    <div className="marquee ticker relative z-10 mt-12 -rotate-1 overflow-hidden bg-lime py-3.5 text-indigo-950 shadow-[var(--shadow-card)]" aria-label={lang === "bn" ? "চলমান অফার" : "Live offers"}>
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap [--marquee-duration:55s]">
        {items.map((t, i) => (
          <a
            key={i}
            href="#offers"
            aria-hidden={i >= row.length}
            tabIndex={i >= row.length ? -1 : 0}
            className="ticker-item font-display inline-flex items-center gap-3 text-lg font-semibold tracking-[-0.01em]"
          >
            <span className="size-2 rounded-full bg-indigo-950" aria-hidden />
            {t}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Offers() {
  const { lang } = useLang();
  const reduce = useReduce();
  const id = useId();
  const railRef = useRef<HTMLDivElement>(null);
  const bn = lang === "bn";

  return (
    <section id="offers" aria-labelledby={`${id}-h`} className="relative overflow-hidden bg-paper pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 id={`${id}-h`} className="font-display max-w-[14ch] text-balance text-[clamp(2.4rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
              {bn ? "অফার আর ক্যাম্পেইন, এখনই চলছে।" : "Offers & campaigns, live right now."}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-[38ch] text-lg text-ink-2">
              {bn
                ? "ডিবিবিএল কার্ড আর অ্যাপে চলমান অফার। প্রতিটির শর্তাবলি ডিবিবিএলের পিডিএফে।"
                : "What your DBBL card and app unlock today. Every offer links to its terms on DBBL's site."}
            </p>
          </Reveal>
        </div>

        {/* Featured campaign: UDYOG */}
        <Reveal className="mt-12">
          <div className="on-dark relative grid overflow-hidden rounded-[2rem] bg-red-600 text-white md:grid-cols-[1.3fr_1fr]">
            <div className="relative z-10 p-8 sm:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-red-600">
                <CalendarDays className="size-4" aria-hidden /> {udyog.dates[lang]}
              </span>
              <h3 className="font-display mt-6 max-w-[16ch] text-balance text-[clamp(2.1rem,4vw,3.5rem)] font-semibold leading-[1] tracking-[-0.035em]">{udyog.title[lang]}</h3>
              <p className="mt-5 max-w-[46ch] text-pretty text-lg text-white/85">{udyog.body[lang]}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={links.udyogForm} tone="white" size="lg">
                  {bn ? "আবেদন ফর্ম" : "Get the application form"}
                </Button>
                <Button href={links.udyogCircular} tone="ghost-dark" size="lg">
                  {bn ? "সার্কুলার পড়ুন" : "Read the circular"}
                </Button>
              </div>
            </div>
            {/* 5,000 as the graphic: the number is the campaign */}
            <div aria-hidden className="relative flex min-h-80 items-end justify-end overflow-hidden p-6 md:min-h-0">
              <motion.span
                initial={reduce ? false : { y: 80, rotate: -8, opacity: 0 }}
                whileInView={{ y: 0, rotate: -6, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="font-display tabular block select-none text-[clamp(7rem,17vw,15rem)] font-bold leading-[0.8] tracking-[-0.06em] text-white/95"
              >
                5,000
              </motion.span>
              <motion.span
                initial={reduce ? false : { scale: 0, rotate: 20 }}
                whileInView={{ scale: 1, rotate: 12 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.25 }}
                className="absolute left-6 top-4 grid size-24 place-items-center md:left-auto md:right-8 md:top-8 md:size-28 rounded-full bg-sun text-center text-sm font-bold leading-tight text-indigo-950 shadow-[var(--shadow-lift)]"
              >
                {bn ? "৫৬ জেলা" : "56 districts"}
              </motion.span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Draggable rail of offer tickets */}
      <div className="mt-10">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-5 sm:px-6 xl:px-10">
          <p className="text-sm font-semibold text-ink-3">{bn ? "টেনে দেখুন →" : "Drag to browse →"}</p>
          <a href={links.faq} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-600 underline decoration-indigo-200 underline-offset-4 hover:decoration-current">
            {bn ? "সব অফারের প্রশ্নোত্তর" : "All offer FAQs"}
          </a>
        </div>
        {/* Reduced motion: no drag physics, the rail scrolls natively instead */}
        <div ref={railRef} className={`mt-4 ${reduce ? "no-scrollbar overflow-x-auto" : "overflow-hidden"}`}>
          <motion.ul
            drag={reduce ? false : "x"}
            dragConstraints={railRef}
            dragElastic={0.08}
            className="flex w-max cursor-grab gap-4 px-5 py-4 active:cursor-grabbing sm:px-6 xl:px-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))]"
          >
            {offers.map((o, i) => {
              const Icon = kindIcon[o.kind];
              return (
                <motion.li
                  key={o.href}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={reduce ? undefined : { y: -8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18, delay: Math.min(i * 0.05, 0.4) }}
                  className="shrink-0"
                >
                  <a
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    className={`relative flex h-80 w-64 flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)] ${o.tone} offer-tone-${i % 4}`}
                  >
                    {/* ticket notches */}
                    <span aria-hidden className="absolute -left-3 bottom-[3.75rem] size-6 rounded-full bg-paper" />
                    <span aria-hidden className="absolute -right-3 bottom-[3.75rem] size-6 rounded-full bg-paper" />
                    <span aria-hidden className="absolute inset-x-6 bottom-[calc(3.75rem+11px)] border-t-2 border-dashed border-current opacity-25" />

                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-current/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.04em] ring-1 ring-current/20">{o.tag[lang]}</span>
                      <Icon className="size-6 opacity-90" aria-hidden />
                    </div>
                    <div className="mb-10">
                      <p className="text-sm font-semibold opacity-75">{o.partner}</p>
                      <p className="font-display mt-1 text-[1.65rem] font-semibold leading-[1.05] tracking-[-0.025em]">{o.title[lang]}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                      <FileText className="size-4" aria-hidden /> {bn ? "শর্তাবলি (পিডিএফ)" : "Terms & FAQ (PDF)"}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
