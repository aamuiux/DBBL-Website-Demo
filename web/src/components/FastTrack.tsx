"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check, Clock3, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { fastTrack } from "@/lib/content";
import { Network } from "./Proof";
import { Button, Reveal, useReduce } from "./ui";

/** Fast Track (branchless banking hubs) and the ATM network: where DBBL physically meets people. */
export function FastTrack() {
  const { lang, num } = useLang();
  const reduce = useReduce();
  const id = useId();
  const bn = lang === "bn";
  // The photo eases from a slight zoom to rest while it crosses the viewport.
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1.02]);
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);

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
                  src="https://images.unsplash.com/photo-1682344059600-a869f15f3ace?w=1600&q=80&auto=format"
                  alt={bn ? "পাশাপাশি দুটি আধুনিক এটিএম, উজ্জ্বল নীল স্ক্রিন" : "Two modern ATMs side by side with glowing blue screens"}
                  fill
                  sizes="(min-width:1024px) 60vw, 100vw"
                  quality={80}
                  className="object-cover"
                />
              </motion.div>
            </div>
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(200deg,transparent_45%,rgb(9_11_58/0.55))]" />
            <motion.p
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.35 }}
              className="absolute right-5 top-5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 backdrop-blur-md sm:right-7 sm:top-7"
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
              <p className="font-display tabular text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-[0.85] tracking-[-0.05em]">{num(4100)}+</p>
              <p className="mt-4 text-lg font-semibold">{bn ? "এটিএম সারা দেশে, দেশের সবচেয়ে বড় নেটওয়ার্ক" : "ATMs nationwide, the country's largest network"}</p>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col justify-between rounded-[1.75rem] bg-indigo-950 p-7 text-white">
              <p className="font-display tabular text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-lime">{num(fastTrack.count)}</p>
              <div className="mt-4">
                <p className="text-lg font-semibold">{bn ? "ফাস্ট ট্র্যাক" : "Fast Tracks"}</p>
                <p className="text-indigo-200">
                  {fastTrack.launched[lang]}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

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
              <div className="flex flex-col gap-3 rounded-3xl bg-lime p-6 text-indigo-950 sm:flex-row sm:items-end sm:gap-4">
                <p className="font-display text-[clamp(3.5rem,6vw,5rem)] font-bold leading-[0.8] tracking-[-0.05em]">24/7</p>
                <p className="pb-1 text-lg font-semibold leading-snug">{bn ? "প্রতিটি ফাস্ট ট্র্যাক এটিএমে টাকা তোলা, ইউপিএস ব্যাকআপসহ" : "cash withdrawal at every Fast Track ATM, with UPS power backup"}</p>
              </div>
              <p className="mt-4 text-sm text-ink-3">{bn ? "সংখ্যাগুলো dutchbanglabank.com-এ প্রকাশিত।" : "Figures as published on dutchbanglabank.com."}</p>
            </div>
          </Reveal>
          <Network />
        </div>
      </div>
    </section>
  );
}
