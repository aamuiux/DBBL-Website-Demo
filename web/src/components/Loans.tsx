"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowUpRight, Calculator, Car, FileText, Home, Sparkles, Wallet, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { retailLoans, smeLoans } from "@/lib/content";
import { Button, Reveal, useReduce, type Tone } from "./ui";
import { BrandSwooshes, swooshTones } from "./BrandSwooshes";
import { CarIcon3D, CoinsIcon3D, HouseIcon3D } from "./Icons3D";
import { Pattern } from "./Patterns";

const loanLook: Record<
  (typeof retailLoans)[number]["key"],
  { Art: (p: { className?: string }) => React.ReactElement; icon: LucideIcon; chip: string; tone: string; pattern: string; apply: Tone; faq: Tone }
> = {
  personal: { Art: CoinsIcon3D, icon: Wallet, chip: "bg-lime text-indigo-950", tone: "bg-indigo-600 text-white", pattern: "text-white/[0.035]", apply: "lime", faq: "ghost-dark" },
  home: { Art: HouseIcon3D, icon: Home, chip: "bg-white text-green-700", tone: "bg-green-600 text-white", pattern: "text-white/[0.04]", apply: "white", faq: "ghost-dark" },
  car: { Art: CarIcon3D, icon: Car, chip: "bg-indigo-950 text-white", tone: "bg-sun text-indigo-950", pattern: "text-indigo-950/[0.035]", apply: "ink", faq: "ghost-light" },
};

function LoansConcept() {
  const { lang } = useLang();
  const reduce = useReduce();
  const id = useId();
  const bn = lang === "bn";
  const brand = usePathname()?.startsWith("/new-design") ?? false;

  return (
    <section id="loans" aria-labelledby={`${id}-h`} className="on-dark relative isolate overflow-hidden bg-indigo-950 py-24 text-white md:py-32">
      <BrandSwooshes brandOnly colors={swooshTones.indigo} opacity={0.35} className="top-0 h-[150%] min-h-[54rem] -right-[90%] sm:-right-[60%] lg:-right-[38%]" />
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <h2 id={`${id}-h`} className="font-display text-balance text-[clamp(2.4rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              {bn ? (
                <>
                  ঋণ, <span className="text-lime">কোনো গোলকধাঁধা ছাড়াই।</span>
                </>
              ) : (
                <>
                  Loans, <span className="text-lime">minus the maze.</span>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-[40ch] text-lg text-indigo-200 lg:text-right">
              {bn ? "অনলাইনে আবেদন করুন, আগে কিস্তি হিসাব করে নিন।" : "Apply online, and work out your monthly instalment before you do."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={links.loanApply} tone="lime" size="lg">
                {bn ? "অনলাইনে আবেদন" : "Apply online"}
              </Button>
              <Button href={links.emiCalc} tone="ghost-dark" size="lg" icon={Calculator}>
                {bn ? "ইএমআই ক্যালকুলেটর" : "EMI calculator"}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Retail loans: three bold tiles */}
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {retailLoans.map((l, i) => {
            const look = loanLook[l.key];
            const Art = look.Art;
            const Icon = look.icon;
            return (
              <motion.li
                key={l.key}
                initial={reduce ? false : { opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 140, damping: 18, delay: i * 0.08 }}
              >
                <div className={`group relative isolate flex h-full min-h-80 flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 ${look.tone} loan-glass loan-glass-${l.key}`}>
                  <Pattern variant={l.key === "home" ? "rings" : l.key === "car" ? "zigzag" : "waves"} className={look.pattern} />
                  <Art className="pointer-events-none absolute -bottom-7 -right-7 size-48 opacity-55 drop-shadow-[0_18px_22px_rgba(0,0,0,0.25)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-105" />
                  <span className={`loan-chip relative grid size-14 place-items-center rounded-2xl ${look.chip}`}>
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="relative mt-16">
                    <h3 className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.035em]">{l.name[lang]}</h3>
                    <p className="mt-3 max-w-[23ch] text-lg opacity-85">{l.body[lang]}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {brand ? (
                        /* /new-design: one button per tile, to the loan's details */
                        <Button href={l.faq} tone={look.apply} size="sm">
                          {bn ? "বিস্তারিত" : "Details"}
                        </Button>
                      ) : (
                        <>
                          <Button href={links.loanApply} tone={look.apply} size="sm">
                            {bn ? "আবেদন" : "Apply"}
                          </Button>
                          <Button href={l.faq} tone={look.faq} size="sm" icon={FileText}>
                            FAQ
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* SME loans: chips that pop in */}
        <div className="mt-16 flex flex-col gap-6 rounded-[1.75rem] bg-white/6 p-7 ring-1 ring-inset ring-white/12 sm:p-9 lg:flex-row lg:items-center lg:gap-10">
          <div className="lg:w-80 lg:shrink-0">
            <p className="flex items-center gap-2 font-display text-2xl font-semibold tracking-[-0.02em]">
              <Sparkles className="size-5 text-lime" aria-hidden /> {bn ? "ব্যবসার জন্য সাতটি ঋণ" : "Seven loans for your business"}
            </p>
            <p className="mt-2 text-indigo-200">{bn ? "দুটি তৈরি নারীদের জন্য।" : "Two of them made for women."}</p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {smeLoans.map((l, i) => {
              const women = l.name === "Uthsaho" || l.name === "Shofolota";
              return (
                <motion.li
                  key={l.name}
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 320, damping: 16, delay: i * 0.05 }}
                >
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-12 items-center gap-2 rounded-full px-4 transition-transform duration-300 hover:-translate-y-0.5 ${
                      women ? "brand-red bg-rocket text-white" : "bg-white text-indigo-950"
                    }`}
                  >
                    <span className="font-display font-semibold">{l.name}</span>
                    <span className="text-sm opacity-70">{l.note[lang]}</span>
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

/** /new-design: three big rows on a light field instead of three boxes on navy. Each row floods with its brand colour on hover. */
const rowTone = {
  personal: { hover: "hover:bg-indigo-600", chip: "bg-indigo-600", Art: CoinsIcon3D },
  home: { hover: "hover:bg-green-600", chip: "bg-green-600", Art: HouseIcon3D },
  car: { hover: "hover:bg-red-600", chip: "bg-red-600", Art: CarIcon3D },
} as const;

function LoansBrand() {
  const { lang } = useLang();
  const reduce = useReduce();
  const id = useId();
  const bn = lang === "bn";

  return (
    <section id="loans" aria-labelledby={`${id}-h`} className="relative isolate overflow-hidden bg-white py-24 text-ink md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          {/* Left: the pitch stays in view while the rows scroll past */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">{bn ? "ঋণ" : "Loans"}</p>
              <h2 id={`${id}-h`} className="font-display mt-4 text-balance text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-indigo-950">
                {bn ? (
                  <>
                    ঋণ, <span className="text-red-600">কোনো গোলকধাঁধা ছাড়াই।</span>
                  </>
                ) : (
                  <>
                    Loans, <span className="text-red-600">minus the maze.</span>
                  </>
                )}
              </h2>
              <p className="mt-6 max-w-[38ch] text-lg text-ink-2">
                {bn ? "অনলাইনে আবেদন করুন, আগে কিস্তি হিসাব করে নিন।" : "Apply online, and work out your monthly instalment before you do."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={links.loanApply} tone="primary" size="lg">
                  {bn ? "অনলাইনে আবেদন" : "Apply online"}
                </Button>
                <Button href={links.emiCalc} tone="ghost-light" size="lg" icon={Calculator}>
                  {bn ? "ইএমআই ক্যালকুলেটর" : "EMI calculator"}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right: one big row per loan */}
          <ul className="border-t border-line">
            {retailLoans.map((l, i) => {
              const t = rowTone[l.key];
              const Art = t.Art;
              return (
                <motion.li
                  key={l.key}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 140, damping: 20, delay: i * 0.05 }}
                  className="border-b border-line"
                >
                  <a
                    href={l.faq}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative isolate flex items-center gap-6 overflow-hidden px-3 py-9 transition-colors duration-500 sm:gap-10 sm:px-6 sm:py-11 ${t.hover} hover:text-white focus-visible:text-white`}
                  >
                    <span className="font-display tabular w-10 shrink-0 text-lg font-semibold text-ink-3 transition-colors group-hover:text-white/70">0{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-none tracking-[-0.035em]">{l.name[lang]}</span>
                      <span className="mt-3 block max-w-[34ch] text-lg text-ink-2 transition-colors group-hover:text-white/90">{l.body[lang]}</span>
                    </span>
                    <Art className="pointer-events-none size-24 shrink-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 sm:size-32" />
                    <span className="flex shrink-0 items-center gap-3 font-semibold">
                      <span className="hidden sm:inline">{bn ? "বিস্তারিত" : "Details"}</span>
                      <span className={`grid size-12 place-items-center rounded-full text-white transition-[background-color,color,transform] duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-indigo-950 ${t.chip}`}>
                        <ArrowUpRight className="size-5" aria-hidden />
                      </span>
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* SME loans: a navy band under the rows */}
        <div className="on-dark mt-16 flex flex-col gap-6 rounded-[1.75rem] bg-indigo-950 p-7 text-white sm:p-9 lg:flex-row lg:items-center lg:gap-10">
          <div className="lg:w-80 lg:shrink-0">
            <p className="flex items-center gap-2 font-display text-2xl font-semibold tracking-[-0.02em]">
              <Sparkles className="size-5 text-lime" aria-hidden /> {bn ? "ব্যবসার জন্য সাতটি ঋণ" : "Seven loans for your business"}
            </p>
            <p className="mt-2 text-indigo-200">{bn ? "দুটি তৈরি নারীদের জন্য।" : "Two of them made for women."}</p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {smeLoans.map((l) => {
              const women = l.name === "Uthsaho" || l.name === "Shofolota";
              return (
                <li key={l.name}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-12 items-center gap-2 rounded-full px-4 transition-transform duration-300 hover:-translate-y-0.5 ${
                      women ? "brand-red bg-rocket text-white" : "bg-white text-indigo-950"
                    }`}
                  >
                    <span className="font-display font-semibold">{l.name}</span>
                    <span className="text-sm opacity-70">{l.note[lang]}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Loans() {
  const brand = usePathname()?.startsWith("/new-design") ?? false;
  return brand ? <LoansBrand /> : <LoansConcept />;
}
