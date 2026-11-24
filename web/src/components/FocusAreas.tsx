"use client";

import { useId } from "react";
import { ArrowUpRight, Clock3, Crown, Flower2, MoonStar } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Reveal, SectionHeading } from "./ui";

type L = { en: string; bn: string };
const s = (en: string, bn: string): L => ({ en, bn });

const areas = [
  {
    key: "vip",
    href: links.vip,
    icon: Crown,
    bg: "linear-gradient(135deg,#050505 0%,#14110b 45%,#5a4420 80%,#c9a24d 100%)",
    accent: "#e8c875",
    name: s("VIP Banking", "ভিআইপি ব্যাংকিং"),
    tag: s("Priority, always", "সবসময় অগ্রাধিকার"),
    body: s("A dedicated relationship manager, priority service and premium cards for customers who expect more.", "নিবেদিত রিলেশনশিপ ম্যানেজার, অগ্রাধিকার সেবা ও প্রিমিয়াম কার্ড, যাঁরা আরও বেশি প্রত্যাশা করেন তাঁদের জন্য।"),
    points: [s("Dedicated relationship manager", "নিবেদিত রিলেশনশিপ ম্যানেজার"), s("Priority service", "অগ্রাধিকার সেবা"), s("Premium cards", "প্রিমিয়াম কার্ড")],
    cta: s("Explore VIP Banking", "ভিআইপি ব্যাংকিং দেখুন"),
  },
  {
    key: "female",
    href: links.personalAccounts,
    icon: Flower2,
    bg: "linear-gradient(120deg,#7a1f55 0%,#c94d86 40%,#4fb594 60%,#2b8a6d 100%)",
    accent: "#ffffff",
    name: s("Female Banking", "নারী ব্যাংকিং"),
    tag: s("Made for women", "নারীদের জন্য"),
    body: s("Savings, loans and support built around women: FeminaPlus savings, and Uthsaho and Shofolota for women entrepreneurs.", "নারীদের জন্য সাজানো সঞ্চয়, ঋণ ও সহায়তা: ফেমিনাপ্লাস সেভিংস এবং নারী উদ্যোক্তাদের জন্য উৎসাহ ও সফলতা।"),
    points: [s("FeminaPlus savings", "ফেমিনাপ্লাস সেভিংস"), s("Uthsaho women's loan", "উৎসাহ নারী ঋণ"), s("Shofolota cash credit", "সফলতা ক্যাশ ক্রেডিট")],
    cta: s("Explore Female Banking", "নারী ব্যাংকিং দেখুন"),
  },
  {
    key: "islamic",
    href: "",
    soon: true,
    icon: MoonStar,
    bg: "linear-gradient(135deg,#03231a 0%,#06503a 55%,#0b8a5c 100%)",
    accent: "#e8c875",
    name: s("Islamic Banking", "ইসলামিক ব্যাংকিং"),
    tag: s("Coming soon", "খুব শীঘ্রই আসছে"),
    body: s("Banking that follows Shariah principles, for deposits, financing and everyday needs.", "শরিয়াহ নীতি অনুসরণ করা ব্যাংকিং: আমানত, বিনিয়োগ ও দৈনন্দিন প্রয়োজনে।"),
    points: [s("Shariah-compliant deposits", "শরিয়াহ-সম্মত আমানত"), s("Islamic financing", "ইসলামিক বিনিয়োগ"), s("Guided by Shariah principles", "শরিয়াহ নীতিতে পরিচালিত")],
    cta: s("Launching soon", "শীঘ্রই আসছে"),
  },
];

/** Dedicated focus area: VIP, Female and Islamic Banking. Used on /new-design. */
export function FocusAreas() {
  const { lang } = useLang();
  const id = useId();
  const bn = lang === "bn";
  return (
    <section aria-labelledby={`${id}-h`} className="mx-auto max-w-[1360px] px-5 py-24 sm:px-6 md:py-32 xl:px-10">
      <SectionHeading
        id={`${id}-h`}
        title={bn ? "বিশেষ ব্যাংকিং, আপনার জন্য।" : "Specialised banking, made for you."}
        lede={bn ? "ভিআইপি, নারী ও ইসলামিক ব্যাংকিং: তিনটি বিশেষ সেবা, প্রত্যেকটি নির্দিষ্ট প্রয়োজন মাথায় রেখে।" : "VIP, Female and Islamic Banking: three focused services, each built around a specific need."}
      />
      {/* Bento: VIP is the wide hero tile on top; Female and Islamic sit side by side below */}
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {areas.map((a, i) => {
          const big = i === 0;
          const Wrap = (a.soon ? "div" : "a") as "a";
          return (
            <Reveal key={a.key} delay={i * 0.07} className={big ? "md:col-span-2" : ""}>
              <Wrap
                {...(a.soon ? {} : { href: a.href, target: "_blank", rel: "noopener noreferrer", "aria-label": `${a.name[lang]} (${bn ? "নতুন ট্যাবে খুলবে" : "opens in a new tab"})` })}
                style={{ background: a.bg }}
                className={`group relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 text-white transition-shadow duration-500 sm:p-8 ${a.soon ? "" : "hover:shadow-[var(--shadow-lift)]"} ${big ? "min-h-[26rem] lg:p-12" : "min-h-[22rem]"}`}
              >
                <span aria-hidden className="absolute -right-16 -top-16 -z-10 size-64 rounded-full opacity-40 blur-2xl transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-125" style={{ background: a.accent }} />
                <div className={`flex items-start gap-4 ${big ? "" : "justify-between"}`}>
                  <span className="grid size-14 place-items-center rounded-2xl ring-1 ring-inset ring-white/25" style={{ background: "rgb(255 255 255 / 0.1)", color: a.accent }}>
                    <a.icon className="size-7 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-12" aria-hidden />
                  </span>
                  <span className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ring-1 ring-inset ring-white/25 ${big ? "self-center" : ""}`} style={{ color: a.accent }}>
                    {a.tag[lang]}
                  </span>
                </div>
                {big && (
                  <div aria-hidden className="pointer-events-none absolute -bottom-6 right-6 hidden w-[19rem] rotate-[-6deg] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:rotate-[-2deg] group-hover:scale-105 sm:block md:right-10 md:top-1/2 md:bottom-auto md:w-[24rem] md:-translate-y-1/2 lg:right-16 lg:w-[28rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/nexus-signature-card.png" alt="" width={459} height={292} className="h-auto w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)]" />
                  </div>
                )}
                <div className={`mt-auto pt-10 ${big ? "md:max-w-[48%]" : ""}`}>
                  <h3 className={`font-display font-semibold leading-[1.02] tracking-[-0.03em] ${big ? "text-[clamp(2.6rem,5vw,4.5rem)]" : "text-3xl"}`}>{a.name[lang]}</h3>
                  <p className={`mt-3 text-pretty text-white/80 ${big ? "max-w-[44ch] text-lg" : "max-w-[40ch]"}`}>{a.body[lang]}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
                    {a.points.map((p) => (
                      <li key={p.en} className="rounded-full bg-white/10 px-3.5 py-1.5 ring-1 ring-inset ring-white/20">
                        {p[lang]}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                    {a.cta[lang]}
                    {a.soon ? <Clock3 className="size-4" aria-hidden /> : <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />}
                  </span>
                </div>
              </Wrap>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
