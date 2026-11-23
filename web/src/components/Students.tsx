"use client";

import { useId, useRef } from "react";
import { motion } from "motion/react";
import { MoveHorizontal, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { schoolSavers } from "@/lib/content";
import { StudentSlider } from "./StudentSlider";
import { Button, Reveal, useReduce } from "./ui";

const stickerTones = ["bg-indigo-950 text-lime", "bg-rocket text-white", "bg-white text-indigo-950", "bg-red-600 text-white"];
const stickerTilt = [-6, 5, -3, 7];

export function Students() {
  const { lang } = useLang();
  const reduce = useReduce();
  const id = useId();
  const ref = useRef<HTMLElement>(null);
  const bn = lang === "bn";

  return (
    <section ref={ref} id="students" aria-labelledby={`${id}-h`} className="relative overflow-hidden bg-lime py-24 text-indigo-950 md:py-32">
      {/* oversized outline word as texture */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -right-8 top-6 select-none text-[clamp(8rem,22vw,20rem)] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_rgb(9_11_58/0.12)]"
      >
        {bn ? "শিক্ষার্থী" : "student"}
      </span>

      {/* Top row: the pitch on the left, the account's key facts and actions on the right */}
      <div className="relative mx-auto grid max-w-[1360px] items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 xl:px-10">
        <div>
          <Reveal>
            <h2 id={`${id}-h`} className="font-display text-balance text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              {bn ? "তোমার প্রথম ব্যাংক অ্যাকাউন্ট। ১৮-র আগেই।" : "Your first bank account. Before you turn 18."}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[44ch] text-pretty text-lg text-indigo-900/85">
              {bn
                ? "ডিবিবিএল স্কুল সেভার্স অ্যাকাউন্ট, ৬ থেকে ১৮ বছরের কম বয়সী বাংলাদেশি শিক্ষার্থীদের জন্য। সেভিংস ডিপোজিট প্লাসের হারে সুদ।"
                : "The DBBL School Savers Account, for Bangladeshi students aged 6 to under 18. It earns interest at the Savings Deposit Plus rate."}
            </p>
          </Reveal>
        </div>

        <div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4">
            {schoolSavers.map((f, i) => (
              <motion.li
                key={f.small.en}
                initial={reduce ? false : { scale: 0.4, opacity: 0, rotate: stickerTilt[i] * 3 }}
                whileInView={{ scale: 1, opacity: 1, rotate: stickerTilt[i] }}
                whileHover={reduce ? undefined : { rotate: 0, scale: 1.04 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: i * 0.08 }}
                className={`rounded-3xl p-5 shadow-[var(--shadow-card)] sm:p-6 ${stickerTones[i]} saver-tone-${i % 4} saver-card`}
              >
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-[-0.04em]">{f.big[lang]}</p>
                <p className="mt-2 text-[0.95rem] font-semibold leading-snug opacity-85">{f.small[lang]}</p>
              </motion.li>
            ))}
          </ul>

          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            <Button href={links.personalAccounts} tone="ink" size="lg">
              {bn ? "অ্যাকাউন্টের বিস্তারিত" : "See account details"}
            </Button>
            <Button href={links.scholarship} tone="ghost-light" size="lg" icon={Sparkles} className="btn-arrow-green">
              {bn ? "ডিবিবিএল বৃত্তি" : "DBBL Scholarship"}
            </Button>
          </Reveal>
        </div>
      </div>

      {/* Parallax photo strip, full width under both columns: drag, swipe or arrow through student life */}
      <div className="relative mt-16 md:mt-20">
        <StudentSlider sectionRef={ref} />
        {/* Hint and age sticker sit under the strip, clear of the moving frames */}
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-6 xl:px-10">
          <p className="flex items-center gap-2 text-sm font-semibold text-indigo-900/75">
            <MoveHorizontal className="size-4" aria-hidden />
            {bn ? "টেনে দেখো" : "Drag to explore"}
          </p>
          <motion.span
            aria-hidden
            initial={reduce ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.3 }}
            className="font-display -mt-1 grid size-24 shrink-0 rotate-[10deg] place-items-center whitespace-pre-line rounded-full bg-indigo-950 text-center text-sm font-bold leading-tight text-lime shadow-[var(--shadow-lift)]"
          >
            {bn ? "বয়স\n৬–১৭" : "Ages\n6–17"}
          </motion.span>
        </div>
      </div>
    </section>
  );
}
