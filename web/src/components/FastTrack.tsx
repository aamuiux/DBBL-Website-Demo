"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePathname } from "next/navigation";
import { Check, Clock3, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { fastTrack } from "@/lib/content";
import { Count, Network } from "./Proof";
import { Button, Reveal, useReduce } from "./ui";

/** Fast Track (branchless banking hubs) and the ATM network: where DBBL physically meets people. */
export function FastTrack() {
  const { lang, num } = useLang();
  const reduce = useReduce();
  const id = useId();
  const bn = lang === "bn";
  const brand = usePathname()?.startsWith("/new-design") ?? false;
  // The photo eases from a slight zoom to rest while it crosses the viewport.
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : brand ? [1.06, 1] : [1.18, 1.02]);
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : brand ? ["0%", "0%"] : ["-4%", "4%"]);

  return (
    <section id="fast-track" aria-labelledby={`${id}-h`} className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <h2 id={`${id}-h`} className="font-display text-balance text-[clamp(2.4rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
              {bn ? (
                <>
                  শাখা বন্ধ? <span className="text-green-600">ফাস্ট ট্র্যাক খোলা।</span>
                </>
              ) : (
                <>
                  Branch closed? <span className="text-green-600">Fast Track&apos;s open.</span>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-[42ch] text-lg text-ink-2 lg:text-right">
              {bn
                ? "এটিএম, জমার মেশিন আর সাহায্যের জন্য কর্মকর্তা, সব এক জায়গায়। শাখা থেকে দূরে, সন্ধ্যা পর্যন্ত।"
                : "ATMs, deposit machines and staff to help, under one roof. Away from the branch, open into the evening."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={links.fastTrackLocator} tone="green" size="lg">
                {bn ? "ফাস্ট ট্র্যাক খুঁজুন" : "Find a Fast Track"}
              </Button>
              <Button href={links.atmLocator} tone="ghost-light" size="lg" icon={MapPin}>
                {bn ? "এটিএম খুঁজুন" : "Find an ATM"}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          {/* Self-service banking photo (stand-in) that eases in as it scrolls, with the opening hours pinned on it */}
          <Reveal className="relative min-h-[26rem] overflow-hidden rounded-[1.75rem] bg-indigo-950 lg:min-h-80">
            <div ref={photoRef} className="absolute inset-0">
              <motion.div style={{ scale: photoScale, y: photoY }} className="absolute inset-0">
                <Image
                  src={brand ? "/fast-track.webp" : "https://images.unsplash.com/photo-1682344059600-a869f15f3ace?w=1600&q=80&auto=format"}
                  alt={brand ? (bn ? "ডিবিবিএল ফাস্ট ট্র্যাক: পাশাপাশি দুটি এটিএম" : "A DBBL Fast Track booth with two ATMs side by side") : bn ? "পাশাপাশি দুটি আধুনিক এটিএম, উজ্জ্বল নীল স্ক্রিন" : "Two modern ATMs side by side with glowing blue screens"}
                  fill
                  sizes="(min-width:1024px) 60vw, 100vw"
                  quality={80}
                  className={`object-cover ${brand ? "object-[50%_8%]" : ""}`}
                />
              </motion.div>
            </div>
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(200deg,transparent_45%,rgb(9_11_58/0.55))]" />
            <motion.p
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.35 }}
              className={`absolute right-5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur-md sm:right-7 ${brand ? "bottom-5 bg-indigo-950/55 sm:bottom-7" : "top-5 sm:top-7"}`}
            >
              {fastTrack.perTrack[lang]}
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30, rotate: -6 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.2 }}
              className="absolute bottom-5 left-5 rounded-2xl bg-sun p-5 text-indigo-950 shadow-[var(--shadow-lift)] sm:bottom-7 sm:left-7"
            >
              <p className="flex items-center gap-2 text-sm font-bold">
                <Clock3 className="size-4" aria-hidden /> {bn ? "নগদ ও চেক জমা" : "Cash & cheque deposits"}
              </p>
              <dl className="mt-2 space-y-1">
                {fastTrack.hours.map((h) => (
                  <div key={h.day.en} className="flex gap-4">
                    <dt className="w-24 font-semibold">{h.day[lang]}</dt>
                    <dd className="tabular">{h.time[lang]}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-sm font-semibold">{bn ? "টাকা তোলা ২৪/৭" : "Cash withdrawal 24/7"}</p>
            </motion.div>
          </Reveal>

          {/* The numbers, big */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal className="flex flex-col justify-between rounded-[1.75rem] bg-green-600 p-7 text-white">
              <p className="font-display tabular text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-[0.85] tracking-[-0.05em]">{num(9083)}</p>
              <p className="mt-4 text-lg font-semibold">{bn ? "ডিবিবিএল এটিএম, সিআরএম ও ফাস্ট ট্র্যাক, দেশের সবচেয়ে বড় নেটওয়ার্ক" : "DBBL ATMs, CRMs and Fast Tracks, the country's largest network"}</p>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col justify-between rounded-[1.75rem] bg-indigo-950 p-7 text-white">
              <p className="font-display tabular text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-green-500">{num(fastTrack.count)}</p>
              <div className="mt-4">
                <p className="text-lg font-semibold">{bn ? "ফাস্ট ট্র্যাক" : "Fast Tracks"}</p>
                <p className="text-indigo-200">
                  {fastTrack.launched[lang]}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Footprint />

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="flex flex-col rounded-[1.75rem] bg-paper p-7 sm:p-10">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">{bn ? "ফাস্ট ট্র্যাকে যা করা যায়" : "What you can do at a Fast Track"}</h3>
            <ul className="mt-6 space-y-3">
              {fastTrack.services.map((sv, i) => (
                <motion.li
                  key={sv.en}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 20 }}
                  className="flex items-center gap-3 text-lg text-ink"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-green-600 text-white">
                    <Check className="size-4" strokeWidth={3} aria-hidden />
                  </span>
                  {sv[lang]}
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <div className="fast-247 flex flex-col gap-3 rounded-3xl bg-lime p-6 text-indigo-950 sm:flex-row sm:items-end sm:gap-4">
                <p className="font-display text-[clamp(3.5rem,6vw,5rem)] font-bold leading-[0.8] tracking-[-0.05em]">{bn ? "২৪/৭" : "24/7"}</p>
                <p className="pb-1 text-lg font-semibold leading-snug">{bn ? "প্রতিটি ফাস্ট ট্র্যাক এটিএমে টাকা তোলা, ইউপিএস ব্যাকআপসহ" : "cash withdrawal at every Fast Track ATM, with UPS power backup"}</p>
              </div>
              {!brand && <p className="mt-4 text-sm text-ink-3">{bn ? "সংখ্যাগুলো dutchbanglabank.com-এ প্রকাশিত।" : "Figures as published on dutchbanglabank.com."}</p>}
            </div>
          </Reveal>
          <Network />
        </div>
      </div>
    </section>
  );
}

const s2 = (en: string, bn: string) => ({ en, bn });
const reach: { to: number; suffix: string; text?: { en: string; bn: string }; en: string; bn: string; dot: string; r: number; n: number }[] = [
  { to: 243, suffix: "", en: "Branches", bn: "শাখা", dot: "#c8f169", r: 92, n: 24 },
  { to: 350, suffix: "", en: "Sub-branches", bn: "উপ-শাখা", dot: "#00984b", r: 74, n: 14 },
  { to: 5600, suffix: "", en: "Agent-banking outlets", bn: "এজেন্ট ব্যাংকিং আউটলেট", dot: "#ffc83d", r: 56, n: 8 },
  { to: 0, suffix: "", text: s2("4.7+ lakh", "৪.৭+ লাখ"), en: "Rocket agents", bn: "রকেট এজেন্ট", dot: "#ffffff", r: 38, n: 5 },
];

/** The physical footprint: branches, sub-branches, agent outlets and machines, as rings around DBBL. */
function Footprint() {
  const { lang } = useLang();
  const reduce = useReduce();
  const bn = lang === "bn";
  const brand = usePathname()?.startsWith("/new-design") ?? false;
  /* /new-design: a blue-to-green gradient card with white type */
  const dotOf = (d: string) => (brand ? ({ "#00984b": "#9af0c0" } as Record<string, string>)[d] ?? d : d);
  return (
    <Reveal className={`relative isolate mt-4 overflow-hidden rounded-[1.75rem] p-7 sm:p-10 on-dark text-white ${brand ? "bg-[linear-gradient(120deg,#1a1f8f_0%,#0f5f8a_50%,#00904a_100%)]" : "bg-indigo-950"}`}>
      <span aria-hidden className={`absolute -left-24 top-1/2 -z-10 size-[28rem] -translate-y-1/2 rounded-full ${brand ? "bg-[radial-gradient(circle,rgb(255_255_255/0.14),transparent_68%)]" : "bg-[radial-gradient(circle,rgb(0_152_75/0.3),transparent_68%)]"}`} />
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-[22rem]">
        <svg viewBox="0 0 200 200" role="img" aria-label={bn ? "ডিবিবিএল-এর শাখা, উপ-শাখা, এজেন্ট আউটলেট ও মেশিনের নেটওয়ার্ক" : "DBBL's network of branches, sub-branches, agent outlets and machines"} className="w-full">
            {reach.map((g, i) => (
              <g key={g.en}>
                <circle cx="100" cy="100" r={g.r} fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="0.6" strokeDasharray="1.5 2.5" />
                <motion.g
                  animate={reduce ? undefined : { rotate: i % 2 ? -360 : 360 }}
                  transition={{ duration: 50 + i * 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                >
                  {Array.from({ length: g.n }, (_, k) => {
                    const a = (k / g.n) * Math.PI * 2;
                    return <circle key={k} cx={100 + g.r * Math.cos(a)} cy={100 + g.r * Math.sin(a)} r={i === 0 ? 1.8 : 2.2} fill={dotOf(g.dot)} />;
                  })}
                </motion.g>
              </g>
            ))}
          </svg>
          <span aria-hidden className="absolute left-1/2 top-1/2 grid size-[19%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_0_0_6px_rgb(255_255_255/0.12),0_10px_30px_rgb(0_0_0/0.35)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dbbl-mark.svg" alt="" width={123} height={82} className="w-[68%]" />
          </span>
        </div>

        <div>
          <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{bn ? "সারা দেশে ডিবিবিএল-এর উপস্থিতি" : "DBBL, close to you across the country"}</h3>
          <p className={`mt-3 max-w-[48ch] ${brand ? "text-white/85" : "text-indigo-200"}`}>
            {bn ? "শাখা থেকে এজেন্ট আউটলেট, প্রতিটি স্তরে ব্যাংকিং আপনার কাছাকাছি।" : "From full branches to agent outlets, every layer puts banking a little closer to home."}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
            {reach.map((g) => (
              <div key={g.en} className={`border-t pt-4 border-white/20`}>
                <dt className={`flex items-center gap-2 text-sm font-semibold ${brand ? "text-white/90" : "text-indigo-200"}`}>
                  <span aria-hidden className="size-2.5 rounded-full" style={{ background: dotOf(g.dot) }} />
                  {bn ? g.bn : g.en}
                </dt>
                <dd className="font-display mt-1 text-[clamp(2.4rem,4.4vw,3.5rem)] font-bold leading-none tracking-[-0.04em]">
                  {g.text ? g.text[lang] : <Count to={g.to} suffix={g.suffix} />}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Reveal>
  );
}
