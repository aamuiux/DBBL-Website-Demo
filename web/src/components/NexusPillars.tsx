"use client";

import { useId } from "react";
import { BadgeCheck, Fingerprint, Receipt, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./ui";

type L = { en: string; bn: string };
const s = (en: string, bn: string): L => ({ en, bn });

const security = [
  s("Biometric check to add a beneficiary", "সুবিধাভোগী যোগ করতে বায়োমেট্রিক যাচাই"),
  s("Dynamic keyboard against shoulder-surfing and key-loggers", "ডায়নামিক কিবোর্ড, আড়ি পাতা ও কি-লগারের বিরুদ্ধে"),
  s("Restricted remote access", "সীমাবদ্ধ রিমোট অ্যাক্সেস"),
];

const bills: { label: L }[] = [
  { label: s("Utility bills", "ইউটিলিটি বিল") },
  { label: s("Mobile recharge", "মোবাইল রিচার্জ") },
  { label: s("Bangla QR", "বাংলা কিউআর") },
  { label: s("e-Toll", "ই-টোল") },
  { label: s("Tap & Pay", "ট্যাপ অ্যান্ড পে") },
  { label: s("Fund transfer", "ফান্ড ট্রান্সফার") },
];

/** NexusPay: the three things clients ask about after "what can it do": is it safe, can I trust it, can I pay my bills with it. */
export function NexusPillars() {
  const { lang, num } = useLang();
  const id = useId();
  const bn = lang === "bn";
  return (
    <section aria-labelledby={`${id}-h`} className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <Reveal>
          <h2 id={`${id}-h`} className="font-display max-w-[22ch] text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            {bn ? "নিরাপদ, বিশ্বস্ত, প্রতিদিনের বিলের জন্য তৈরি।" : "Safe, trusted, and ready for your everyday bills."}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {/* Security */}
          <Reveal className="h-full">
            <article className="flex h-full min-h-[26rem] flex-col rounded-[1.75rem] bg-paper p-7 sm:p-9">
              <span className="grid size-14 place-items-center rounded-2xl bg-white text-[#ed1b24] ring-1 ring-inset ring-black/5">
                <ShieldCheck className="size-7" aria-hidden />
              </span>
              <h3 className="font-display mt-8 text-3xl font-semibold tracking-[-0.025em] text-ink">{bn ? "নিরাপত্তা" : "Security"}</h3>
              <p className="mt-3 max-w-[34ch] text-ink-2">{bn ? "প্রতিটি লেনদেনে একাধিক স্তরের সুরক্ষা।" : "Layers of protection on every transaction."}</p>
              <ul className="mt-6 space-y-3">
                {security.map((t) => (
                  <li key={t.en} className="flex items-start gap-3 font-semibold text-ink">
                    <Fingerprint className="mt-0.5 size-5 shrink-0 text-[#ed1b24]" aria-hidden />
                    {t[lang]}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Trust: the red tile */}
          <Reveal delay={0.07} className="h-full">
            <article className="flex h-full min-h-[26rem] flex-col rounded-[1.75rem] bg-[#ed1b24] p-7 text-white sm:p-9">
              <span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-inset ring-white/30">
                <BadgeCheck className="size-7" aria-hidden />
              </span>
              <h3 className="font-display mt-8 text-3xl font-semibold tracking-[-0.025em]">{bn ? "বিশ্বাস" : "Trust"}</h3>
              <p className="mt-3 max-w-[34ch] text-white/90">
                {bn ? "একটি তফসিলি ব্যাংকের নিরাপত্তা ও তদারকিতে চলা সেবা।" : "Run with the security and oversight of a scheduled bank."}
              </p>
              <dl className="mt-auto space-y-5 pt-8">
                <div>
                  <dd className="font-display text-[clamp(2.6rem,4.6vw,3.6rem)] font-bold leading-none tracking-[-0.04em]">{bn ? `${num(1)}+ কোটি` : "1+ crore"}</dd>
                  <dt className="mt-1.5 font-semibold text-white/90">{bn ? "নেক্সাসপে নিবন্ধিত ব্যবহারকারী" : "registered NexusPay users"}</dt>
                </div>
                <div className="border-t border-white/30 pt-5">
                  <dd className="font-display text-[clamp(1.9rem,3.2vw,2.5rem)] font-bold leading-none tracking-[-0.03em]">{bn ? `৳ ${num(27000)} কোটি` : "Tk 27,000 crore"}</dd>
                  <dt className="mt-1.5 font-semibold text-white/90">{bn ? "প্রতি মাসে লেনদেন" : "in transactions every month"}</dt>
                </div>
              </dl>
            </article>
          </Reveal>

          {/* Bills & utilities */}
          <Reveal delay={0.14} className="h-full">
            <article className="flex h-full min-h-[26rem] flex-col rounded-[1.75rem] bg-paper p-7 sm:p-9">
              <span className="grid size-14 place-items-center rounded-2xl bg-white text-[#ed1b24] ring-1 ring-inset ring-black/5">
                <Receipt className="size-7" aria-hidden />
              </span>
              <h3 className="font-display mt-8 text-3xl font-semibold tracking-[-0.025em] text-ink">{bn ? "বিল ও ইউটিলিটি পেমেন্ট" : "Bills & utility payments"}</h3>
              <p className="mt-3 max-w-[34ch] text-ink-2">{bn ? "প্রতিদিনের সব পেমেন্ট এক অ্যাপে, যেকোনো ব্যাংকের গ্রাহকের জন্য।" : "Everyday payments in one app, open to customers of any bank."}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {bills.map((b) => (
                  <li key={b.label.en} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-inset ring-black/10">
                    {b.label[lang]}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
        <p className="mt-6 text-sm text-ink-3">{bn ? "তথ্য ডিবিবিএল-এর প্রদত্ত, নভেম্বর ২০২৬।" : "Figures as provided by DBBL, November 2026."}</p>
      </div>
    </section>
  );
}

/**
 * The same three pillars for the red NexusPay panel: translucent tiles on red, with Trust inverted to white.
 * Used inside the pinned story (revealed after the four steps) and under it on touch screens.
 */
export function NexusPillarCols({ pinned = false }: { pinned?: boolean }) {
  const { lang, num } = useLang();
  const bn = lang === "bn";
  const tile = "flex flex-col rounded-3xl p-5 xl:p-6 [@media(max-height:760px)]:p-4";
  const icon = "grid size-11 place-items-center rounded-xl [@media(max-height:760px)]:size-9";
  return (
    <div data-pillars className={pinned ? "w-full" : "mt-16"}>
      <h3 data-pillar-head className="font-display max-w-[24ch] text-balance text-[clamp(1.6rem,2.4vw,2.2rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
        {bn ? "নিরাপদ, বিশ্বস্ত, প্রতিদিনের বিলের জন্য তৈরি।" : "Safe, trusted, and ready for your everyday bills."}
      </h3>
      <div className={`mt-6 grid gap-3 ${pinned ? "grid-cols-3" : "md:grid-cols-3"}`}>
        <article data-pillar className={`${tile} bg-white/10 text-white ring-1 ring-inset ring-white/25`}>
          <span className={`${icon} bg-white/15`}>
            <ShieldCheck className="size-6" aria-hidden />
          </span>
          <h4 className="font-display mt-4 text-xl font-semibold tracking-[-0.02em] [@media(max-height:760px)]:mt-3">{bn ? "নিরাপত্তা" : "Security"}</h4>
          <ul className="mt-3 space-y-2.5 text-sm font-semibold leading-snug">
            {security.map((t) => (
              <li key={t.en} className="flex items-start gap-2">
                <Fingerprint className="mt-0.5 size-4 shrink-0" aria-hidden />
                {t[lang]}
              </li>
            ))}
          </ul>
        </article>

        <article data-pillar className={`${tile} bg-white text-[#ed1b24]`}>
          <span className={`${icon} bg-[#ed1b24] text-white`}>
            <BadgeCheck className="size-6" aria-hidden />
          </span>
          <h4 className="font-display mt-4 text-xl font-semibold tracking-[-0.02em] [@media(max-height:760px)]:mt-3">{bn ? "বিশ্বাস" : "Trust"}</h4>
          <p className="mt-2 text-sm font-semibold leading-snug text-ink-2">{bn ? "তফসিলি ব্যাংকের নিরাপত্তা ও তদারকিতে।" : "Run with the security and oversight of a scheduled bank."}</p>
          <dl className="mt-auto space-y-3 pt-4">
            <div>
              <dd className="font-display text-[clamp(1.9rem,2.8vw,2.6rem)] font-bold leading-none tracking-[-0.04em]">{bn ? `${num(1)}+ কোটি` : "1+ crore"}</dd>
              <dt className="mt-1 text-sm font-semibold text-ink-2">{bn ? "নিবন্ধিত ব্যবহারকারী" : "registered users"}</dt>
            </div>
            <div className="border-t border-black/10 pt-3">
              <dd className="font-display text-[clamp(1.25rem,1.9vw,1.6rem)] font-bold leading-none tracking-[-0.03em]">{bn ? `৳ ${num(27000)} কোটি` : "Tk 27,000 crore"}</dd>
              <dt className="mt-1 text-sm font-semibold text-ink-2">{bn ? "প্রতি মাসে লেনদেন" : "in transactions a month"}</dt>
            </div>
          </dl>
        </article>

        <article data-pillar className={`${tile} bg-white/10 text-white ring-1 ring-inset ring-white/25`}>
          <span className={`${icon} bg-white/15`}>
            <Receipt className="size-6" aria-hidden />
          </span>
          <h4 className="font-display mt-4 text-xl font-semibold tracking-[-0.02em] [@media(max-height:760px)]:mt-3">{bn ? "বিল ও ইউটিলিটি পেমেন্ট" : "Bills & utility payments"}</h4>
          <p className="mt-2 text-sm leading-snug text-white/90">{bn ? "যেকোনো ব্যাংকের গ্রাহকের জন্য।" : "Open to customers of any bank."}</p>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {bills.map((b) => (
              <li key={b.label.en} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-inset ring-white/25">
                {b.label[lang]}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
