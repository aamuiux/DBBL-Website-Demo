"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GraduationCap, Leaf, Sprout } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { csrTimeline } from "@/lib/content";
import { Reveal, useReduce } from "./ui";

gsap.registerPlugin(ScrollTrigger);

/** CSR: the bank's social responsibility, shown as what it actually funded. */
export function CSR() {
  const { lang } = useLang();
  const reduce = useReduce();
  const id = useId();
  const bn = lang === "bn";
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  const tiles = [
    {
      icon: GraduationCap,
      title: bn ? "ডিবিবিএল বৃত্তি" : "DBBL Scholarship",
      body: bn ? "মেধাবী শিক্ষার্থীদের পড়াশোনায় সহায়তা।" : "Helping students build a secure future through their studies.",
      href: links.scholarship,
      tone: "bg-lime text-indigo-950",
    },
    {
      icon: Sprout,
      title: "DBBL-CSR-GraTA",
      body: bn ? "কৃষিতে প্রযুক্তি উদ্ভাবনের জন্য অনুদান।" : "Grants for technology incubation in agriculture.",
      href: links.csrGrata,
      tone: "bg-sun text-indigo-950",
    },
    {
      icon: Leaf,
      title: bn ? "টেকসই অর্থায়ন" : "Sustainable finance",
      body: bn ? "পরিবেশবান্ধব অর্থায়নে ডিবিবিএলের নীতি।" : "How DBBL approaches green and sustainable financing.",
      href: links.sustainableFinance,
      tone: "bg-white text-indigo-950",
    },
  ];

  return (
    <section id="csr" aria-labelledby={`${id}-h`}>
      <div ref={ref} className="on-dark relative isolate overflow-hidden bg-green-700 text-white">
        <div ref={imgRef} className="absolute inset-x-0 -inset-y-[12%] -z-20">
          <Image
            src="https://images.unsplash.com/photo-1577624060070-ca1afe89ddad"
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover"
          />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_80_41/0.65)_0%,rgb(0_80_41/0.92)_55%,rgb(0_80_41/0.98)_100%)]" />

        <div className="mx-auto max-w-[1360px] px-5 pb-24 pt-24 sm:px-6 md:pb-32 md:pt-32 xl:px-10">
          <Reveal>
            <h2 id={`${id}-h`} className="font-display max-w-[15ch] text-balance text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              {bn ? "মুনাফাই কখনো একমাত্র লক্ষ্য ছিল না।" : "Profit was never the only point."}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[52ch] text-pretty text-lg text-green-100">
              {bn
                ? "ডাচ-বাংলা ব্যাংক ফাউন্ডেশনের মাধ্যমে ডিবিবিএল বাংলাদেশে সামাজিক কাজে সবচেয়ে বড় ব্যাংক দাতা। শুরু থেকেই এটি ব্যাংকের অগ্রাধিকার।"
                : "Through the Dutch-Bangla Bank Foundation, DBBL is the largest bank donor to social causes in Bangladesh. It has been a priority since the bank began."}
            </p>
          </Reveal>

          {/* Relief timeline */}
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {csrTimeline.map((t, i) => (
              <motion.li
                key={t.year}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 160, damping: 18, delay: i * 0.08 }}
                className="rounded-3xl bg-white/10 p-6 ring-1 ring-inset ring-white/20 backdrop-blur-md"
              >
                <p className="font-display text-[2.75rem] font-bold leading-none tracking-[-0.04em] text-lime">{t.year}</p>
                <p className="mt-3 text-lg">{t.text[lang]}</p>
              </motion.li>
            ))}
          </ol>
          <a href={links.socialCause} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime">
            {bn ? "সব সামাজিক কার্যক্রম" : "See every social cause"} <ArrowUpRight className="size-4" aria-hidden />
          </a>

          {/* Programmes */}
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {tiles.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.li
                  key={t.title}
                  initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: [-3, 2, -2][i] }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16, delay: i * 0.08 }}
                >
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className={`group flex h-full min-h-56 flex-col justify-between rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1 ${t.tone}`}>
                    <span className="flex items-center justify-between">
                      <Icon className="size-8" aria-hidden />
                      <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                    <span>
                      <span className="font-display block text-2xl font-semibold tracking-[-0.02em]">{t.title}</span>
                      <span className="mt-1.5 block opacity-80">{t.body}</span>
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
