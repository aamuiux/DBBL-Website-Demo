"use client";

import { useId } from "react";
import { ArrowUpRight, Crown, Flower2, MoonStar } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Reveal, SectionHeading } from "./ui";
import { Pattern } from "./Patterns";

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
    bg: "linear-gradient(135deg,#3a0f2e 0%,#7a1f55 55%,#d1568f 100%)",
    accent: "#ffd1e3",
    name: s("Female Banking", "নারী ব্যাংকিং"),
    tag: s("Made for women", "নারীদের জন্য"),
    body: s("Savings, loans and support built around women: FeminaPlus savings, and Uthsaho and Shofolota for women entrepreneurs.", "নারীদের জন্য সাজানো সঞ্চয়, ঋণ ও সহায়তা: ফেমিনাপ্লাস সেভিংস এবং নারী উদ্যোক্তাদের জন্য উৎসাহ ও সফলতা।"),
    points: [s("FeminaPlus savings", "ফেমিনাপ্লাস সেভিংস"), s("Uthsaho women's loan", "উৎসাহ নারী ঋণ"), s("Shofolota cash credit", "সফলতা ক্যাশ ক্রেডিট")],
    cta: s("Explore Female Banking", "নারী ব্যাংকিং দেখুন"),
  },
  {
    key: "islamic",
    href: links.islamic,
    icon: MoonStar,
    bg: "linear-gradient(135deg,#03231a 0%,#06503a 55%,#0b8a5c 100%)",
    accent: "#e8c875",
    name: s("Islamic Banking", "ইসলামিক ব্যাংকিং"),
    tag: s("Shariah-compliant", "শরিয়াহ-সম্মত"),
    body: s("Banking that follows Shariah principles, for deposits, financing and everyday needs.", "শরিয়াহ নীতি অনুসরণ করা ব্যাংকিং: আমানত, বিনিয়োগ ও দৈনন্দিন প্রয়োজনে।"),
    points: [s("Shariah-compliant deposits", "শরিয়াহ-সম্মত আমানত"), s("Islamic financing", "ইসলামিক বিনিয়োগ"), s("Guided by Shariah principles", "শরিয়াহ নীতিতে পরিচালিত")],
    cta: s("Explore Islamic Banking", "ইসলামিক ব্যাংকিং দেখুন"),
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
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {areas.map((a, i) => (
          <Reveal key={a.key} delay={i * 0.07}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${a.name[lang]} (${bn ? "নতুন ট্যাবে খুলবে" : "opens in a new tab"})`}
              style={{ background: a.bg }}
              className="group relative isolate flex h-full min-h-[27rem] flex-col overflow-hidden rounded-[1.75rem] p-7 text-white transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] sm:p-8"
            >
              <Pattern variant={i === 2 ? "rings" : "waves"} className="text-white/[0.09]" />
              <span aria-hidden className="absolute -right-16 -top-16 -z-10 size-64 rounded-full opacity-40 blur-2xl transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-125" style={{ background: a.accent }} />
              <span className="grid size-14 place-items-center rounded-2xl ring-1 ring-inset ring-white/25" style={{ background: "rgb(255 255 255 / 0.1)", color: a.accent }}>
                <a.icon className="size-7 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-12" aria-hidden />
              </span>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: a.accent }}>
                {a.tag[lang]}
              </p>
              <h3 className="font-display mt-2 text-[clamp(2rem,3vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">{a.name[lang]}</h3>
              <p className="mt-4 max-w-[38ch] text-pretty text-white/80">{a.body[lang]}</p>
              <ul className="mt-6 space-y-2 text-sm font-semibold">
                {a.points.map((p) => (
                  <li key={p.en} className="flex items-center gap-2.5">
                    <span aria-hidden className="size-1.5 rounded-full" style={{ background: a.accent }} />
                    {p[lang]}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold">
                {a.cta[lang]}
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
