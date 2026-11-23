"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Calculator, Briefcase, Car, FileText, Home, Sparkles, Wallet, type LucideIcon } from "lucide-react";
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

/**
 * /new-design: a light, airy section. Soft brand-tinted cards with their own illustrations, solid brand-colour
 * Details pills, and the business loans as a row of chips in a white bar. The logo swooshes sweep in behind on the right.
 */
const softTile = {
  personal: { bg: "bg-[linear-gradient(150deg,#e9eafa_0%,#c9cbf0_100%)]", pill: "bg-indigo-600", blob: "bg-indigo-400/30", Art: CoinsIcon3D },
  home: { bg: "bg-[linear-gradient(150deg,#e6f6ec_0%,#b9e5cc_100%)]", pill: "bg-green-700", blob: "bg-green-500/25", Art: HouseIcon3D },
  car: { bg: "bg-[linear-gradient(150deg,#fde9ea_0%,#f8bcc0_100%)]", pill: "bg-red-600", blob: "bg-red-600/20", Art: CarIcon3D },
} as const;

function LoansBrand() {
  const { lang } = useLang();
  const reduce = useReduce();
  const id = useId();
  const bn = lang === "bn";

  return (
    <section id="loans" aria-labelledby={`${id}-h`} className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f1f2fb_0%,#ffffff_100%)] py-24 text-ink md:py-32">
      <BrandSwooshes colors={["var(--color-indigo-600)", "var(--color-red-600)", "var(--color-green-600)"]} opacity={0.22} className="top-0 h-[120%] min-h-[48rem] -right-[75%] sm:-right-[50%] lg:-right-[30%]" />
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <h2 id={`${id}-h`} className="font-display text-balance text-[clamp(2.6rem,5.6vw,5rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-indigo-950">
              {bn ? (
                <>
                  ঋণ, <span className="text-indigo-600">কোনো গোলকধাঁধা ছাড়াই।</span>
                </>
              ) : (
                <>
                  Loans, <span className="block text-indigo-600">minus the maze.</span>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-[40ch] text-lg text-ink-2 lg:text-right">
              {bn ? "অনলাইনে আবেদন করুন, আগে কিস্তি হিসাব করে নিন।" : "Apply online, and work out your monthly instalment before you do."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={links.loanApply}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-red-600 pl-6 pr-2 font-semibold text-white shadow-[0_14px_28px_-14px_rgb(237_27_36/0.8)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {bn ? "অনলাইনে আবেদন" : "Apply online"}
                <span className="grid size-10 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-5" aria-hidden />
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <Button href={links.emiCalc} tone="ghost-light" size="lg" icon={Calculator}>
                {bn ? "ইএমআই ক্যালকুলেটর" : "EMI calculator"}
              </Button>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {retailLoans.map((l, i) => {
            const t = softTile[l.key];
            const Art = t.Art;
            return (
              <motion.li
                key={l.key}
                initial={reduce ? false : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 140, damping: 18, delay: i * 0.08 }}
              >
                <div className={`loan-soft group relative isolate flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2rem] p-7 text-indigo-950 ${t.bg}`}>
                  <span aria-hidden className={`absolute -right-16 top-1/3 -z-10 size-72 rounded-full blur-2xl ${t.blob}`} />
                  <Art className="pointer-events-none absolute -bottom-6 -right-4 size-52 drop-shadow-[0_18px_22px_rgba(13,13,16,0.22)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-3 group-hover:scale-105" />
                  <span className="relative grid size-14 place-items-center rounded-2xl bg-white shadow-sm">
                    {l.key === "personal" ? <Wallet className="size-6 text-indigo-600" aria-hidden /> : l.key === "home" ? <Home className="size-6 text-green-700" aria-hidden /> : <Car className="size-6 text-red-600" aria-hidden />}
                  </span>
                  <div className="relative mt-16">
                    <h3 className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.035em]">{l.name[lang]}</h3>
                    <p className="mt-3 max-w-[22ch] text-lg text-ink-2">{l.body[lang]}</p>
                    <a
                      href={l.faq}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-7 inline-flex h-11 items-center gap-2 rounded-full pl-5 pr-1.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 ${t.pill}`}
                    >
                      {bn ? "বিস্তারিত" : "Details"}
                      <span className="grid size-8 place-items-center rounded-full bg-white/20">
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* Business loans: a white bar with a chip for each */}
        <div className="mt-8 flex flex-col gap-5 rounded-[2rem] bg-white p-6 shadow-[0_24px_50px_-30px_rgb(45_49_146/0.4)] ring-1 ring-inset ring-indigo-100 sm:p-7 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex items-center gap-4 lg:w-80 lg:shrink-0 lg:border-r lg:border-indigo-100 lg:pr-6">
            <Briefcase className="size-8 shrink-0 text-indigo-600" aria-hidden />
            <div>
              <p className="font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-indigo-950">{bn ? "ব্যবসার জন্য সাতটি ঋণ" : "Seven loans for your business"}</p>
              <p className="mt-1 text-sm text-ink-2">{bn ? "দুটি তৈরি নারীদের জন্য।" : "Two of them made for women."}</p>
            </div>
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
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 ring-1 ring-inset transition-colors duration-300 ${
                      women ? "bg-red-50 text-red-700 ring-red-200 hover:bg-red-600 hover:text-white" : "bg-indigo-50 text-indigo-950 ring-indigo-100 hover:bg-indigo-600 hover:text-white"
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
