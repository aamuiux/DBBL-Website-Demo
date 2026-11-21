"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, Briefcase, CreditCard, HandCoins, PiggyBank, Send, type LucideIcon } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { SectionHeading, easeOut, useReduce } from "./ui";

type L = Record<Lang, string>;
type Product = { name: L; body: L; href: string };
type TabKey = "save" | "spend" | "borrow" | "send" | "business";

const s = (en: string, bn: string): L => ({ en, bn });

const tabs: { key: TabKey; icon: LucideIcon; tone: string; feature: Product; rows: Product[] }[] = [
  {
    key: "save",
    icon: PiggyBank,
    tone: "green",
    feature: {
      name: s("Savings Deposit Plus", "সেভিংস ডিপোজিট প্লাস"),
      body: s("A savings account with a free Nexus debit card for the first year, free internet and SMS banking, and tiered interest.", "প্রথম বছর বিনামূল্যে নেক্সাস ডেবিট কার্ড, বিনামূল্যে ইন্টারনেট ও এসএমএস ব্যাংকিং, আর ধাপে ধাপে সুদ।"),
      href: links.personalAccounts,
    },
    rows: [
      { name: s("Term Deposits", "মেয়াদি আমানত"), body: s("Lock in a fixed term and rate.", "নির্দিষ্ট মেয়াদ ও হারে জমা রাখুন।"), href: links.termDeposits },
      { name: s("DBBL Future Line", "ডিবিবিএল ফিউচার লাইন"), body: s("Plan ahead with regular deposits.", "নিয়মিত জমা দিয়ে ভবিষ্যতের পরিকল্পনা।"), href: links.futureLine },
      { name: s("School Savers", "স্কুল সেভার্স"), body: s("A first account for students.", "শিক্ষার্থীদের প্রথম অ্যাকাউন্ট।"), href: links.personalAccounts },
      { name: s("FeminaPlus Savings", "ফেমিনাপ্লাস সেভিংস"), body: s("A savings account for women.", "নারীদের জন্য সঞ্চয়ী হিসাব।"), href: links.personalAccounts },
    ],
  },
  {
    key: "spend",
    icon: CreditCard,
    tone: "indigo",
    feature: {
      name: s("Nexus Debit Card", "নেক্সাস ডেবিট কার্ড"),
      body: s("Withdraw free at more than 4,100 DBBL ATMs and pay at shops across the country.", "৪,১০০-এরও বেশি ডিবিবিএল এটিএমে বিনামূল্যে টাকা তুলুন, সারা দেশের দোকানে পেমেন্ট করুন।"),
      href: links.debitCards,
    },
    rows: [
      { name: s("Credit Cards", "ক্রেডিট কার্ড"), body: s("Visa and Mastercard, local and international.", "ভিসা ও মাস্টারকার্ড, লোকাল ও ইন্টারন্যাশনাল।"), href: links.creditCards },
      { name: s("Prepaid Cards", "প্রিপেইড কার্ড"), body: s("Load and spend, nothing more.", "লোড করুন, খরচ করুন।"), href: links.prepaidCards },
      { name: s("Pay by QR with NexusPay", "নেক্সাসপে দিয়ে কিউআর পেমেন্ট"), body: s("10,000+ shops accept it.", "১০,০০০+ দোকানে চলে।"), href: links.nexusPay },
      { name: s("SMS Alert Banking", "এসএমএস অ্যালার্ট"), body: s("Know every time your card is used.", "প্রতিটি লেনদেনের খবর পান।"), href: links.smsAlert },
    ],
  },
  {
    key: "borrow",
    icon: HandCoins,
    tone: "lime",
    feature: {
      name: s("Retail Loans", "রিটেইল ঋণ"),
      body: s("Personal financing from DBBL. See the products, eligibility and current lending rates before you apply.", "ডিবিবিএলের ব্যক্তিগত ঋণ। আবেদনের আগে পণ্য, যোগ্যতা ও বর্তমান সুদের হার দেখুন।"),
      href: links.retailLoan,
    },
    rows: [
      { name: s("Loans & Advances", "ঋণ ও অগ্রিম"), body: s("The full range of DBBL credit.", "ডিবিবিএলের সব ধরনের ঋণ।"), href: links.loansAdvances },
      { name: s("SME Loans", "এসএমই ঋণ"), body: s("Seven products for small businesses.", "ছোট ব্যবসার জন্য সাতটি ঋণ।"), href: links.smeLenden },
      { name: s("Lending interest rates", "ঋণের সুদের হার"), body: s("Published rates, in one PDF.", "প্রকাশিত হার, একটি পিডিএফে।"), href: links.lendingRate },
    ],
  },
  {
    key: "send",
    icon: Send,
    tone: "rocket",
    feature: {
      name: s("Send money free with NexusPay", "নেক্সাসপে দিয়ে বিনা খরচে টাকা পাঠান"),
      body: s("Send to any mobile number for free, or receive by QR, NFC, phone number, Rocket or card number.", "যেকোনো মোবাইল নম্বরে বিনা খরচে পাঠান, অথবা কিউআর, এনএফসি, ফোন নম্বর, রকেট বা কার্ড নম্বরে টাকা নিন।"),
      href: links.nexusPay,
    },
    rows: [
      { name: s("Rocket", "রকেট"), body: s("Person-to-person transfers from any phone.", "যেকোনো ফোন থেকে টাকা পাঠান।"), href: links.rocket },
      { name: s("Remittance status", "রেমিট্যান্স স্ট্যাটাস"), body: s("Track money sent from abroad.", "বিদেশ থেকে পাঠানো টাকার খোঁজ নিন।"), href: links.remittanceStatus },
      { name: s("Offshore Banking", "অফশোর ব্যাংকিং"), body: s("FC accounts and FDRs for non-residents.", "প্রবাসীদের জন্য এফসি অ্যাকাউন্ট ও এফডিআর।"), href: links.offshore },
    ],
  },
  {
    key: "business",
    icon: Briefcase,
    tone: "indigo",
    feature: {
      name: s("SME Banking", "এসএমই ব্যাংকিং"),
      body: s("Cash credit, term, property, festival and distributor financing, plus two loans made for women.", "ক্যাশ ক্রেডিট, মেয়াদি, সম্পত্তি, উৎসব ও পরিবেশক অর্থায়ন, আর নারীদের জন্য দুটি ঋণ।"),
      href: links.smeLenden,
    },
    rows: [
      { name: s("Corporate Banking", "কর্পোরেট ব্যাংকিং"), body: s("Financing for large enterprises.", "বড় প্রতিষ্ঠানের অর্থায়ন।"), href: links.corporate },
      { name: s("LC & Trade", "এলসি ও ট্রেড"), body: s("Import and export services.", "আমদানি ও রপ্তানি সেবা।"), href: links.lcTrade },
      { name: s("Payment Gateway & POS", "পেমেন্ট গেটওয়ে ও পিওএস"), body: s("Take card payments online and in store.", "অনলাইনে ও দোকানে কার্ড পেমেন্ট নিন।"), href: links.ipg },
    ],
  },
];

const toneClass: Record<string, { panel: string; ink: string; sub: string; btn: string }> = {
  green: { panel: "bg-green-600", ink: "text-white", sub: "text-green-100", btn: "bg-white text-green-700" },
  indigo: { panel: "bg-indigo-600", ink: "text-white", sub: "text-indigo-100", btn: "bg-lime text-indigo-950" },
  lime: { panel: "bg-lime", ink: "text-indigo-950", sub: "text-indigo-900/80", btn: "bg-indigo-950 text-white" },
  rocket: { panel: "bg-rocket", ink: "text-white", sub: "text-rocket-100", btn: "bg-white text-rocket" },
};

export function Needs() {
  const { d, lang } = useLang();
  const reduce = useReduce();
  const [active, setActive] = useState<TabKey>("save");
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs.find((t) => t.key === active)!;
  const tone = toneClass[tab.tone];

  const onKey = (e: KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(tabs[next].key);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section aria-labelledby={`${id}-h`} className="mx-auto max-w-[1360px] px-5 pb-24 pt-24 sm:px-6 md:pt-32 xl:px-10">
      <div className="flex flex-col gap-10">
        <SectionHeading id={`${id}-h`} title={d.needs.title} lede={d.needs.lede} />

        <LayoutGroup id={id}>
          <div
            role="tablist"
            aria-label={d.needs.title}
            className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:w-fit lg:rounded-full lg:bg-white lg:p-1.5 lg:shadow-[var(--shadow-card)]"
          >
            {tabs.map((t, i) => {
              const selected = t.key === active;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`${id}-tab-${t.key}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(t.key)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`relative inline-flex h-12 shrink-0 items-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold transition-colors ${
                    selected ? "text-white" : "bg-white text-ink-2 hover:text-indigo-700 lg:bg-transparent"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="needs-pill"
                      className="absolute inset-0 rounded-full bg-indigo-600"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <Icon className="relative size-4" strokeWidth={2.25} aria-hidden />
                  <span className="relative whitespace-nowrap">{d.needs.tabs[t.key]}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="mt-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="grid gap-5 lg:grid-cols-[1.15fr_1fr]"
          >
            {/* Feature product */}
            <a
              href={tab.feature.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-2xl p-7 sm:p-10 ${tone.panel}`}
            >
              <NeedArt kind={tab.key} dark={tab.tone !== "lime"} />
              <div className="relative max-w-md">
                <h3 className={`font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] ${tone.ink}`}>
                  {tab.feature.name[lang]}
                </h3>
                <p className={`mt-4 text-pretty text-lg ${tone.sub}`}>{tab.feature.body[lang]}</p>
              </div>
              <span className={`relative mt-10 inline-flex w-fit items-center gap-2 rounded-full py-3 pl-5 pr-4 font-semibold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 ${tone.btn}`}>
                {d.needs.more}
                <ArrowUpRight className="size-4" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>

            {/* Related products */}
            <ul className="flex flex-col divide-y divide-line rounded-2xl bg-white px-2 shadow-[var(--shadow-card)]">
              {tab.rows.map((p, i) => (
                <motion.li
                  key={p.name.en}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: 0.08 + i * 0.06 }}
                  className="flex-1"
                >
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full min-h-24 items-center justify-between gap-6 rounded-xl px-5 py-5 transition-colors hover:bg-paper"
                  >
                    <span>
                      <span className="font-display block text-xl font-semibold tracking-[-0.015em] text-ink group-hover:text-indigo-700">
                        {p.name[lang]}
                      </span>
                      <span className="mt-1 block text-ink-2">{p.body[lang]}</span>
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-600 transition-[background-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-indigo-600 group-hover:text-white">
                      <ArrowUpRight className="size-[1.1rem]" aria-hidden />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/** Crisp geometric artwork per need; animated on the hover of its panel. */
function NeedArt({ kind, dark }: { kind: TabKey; dark: boolean }) {
  const a = dark ? "rgb(255 255 255 / 0.16)" : "rgb(9 11 58 / 0.12)";
  const b = dark ? "rgb(255 255 255 / 0.9)" : "#0e1150";
  const lime = "#c8f169";
  const common = "pointer-events-none absolute -bottom-6 -right-6 h-[70%] max-h-[22rem] w-auto sm:bottom-0 sm:right-0";
  const hover = "transition-transform duration-700 ease-[var(--ease-out-expo)]";

  if (kind === "save")
    return (
      <svg viewBox="0 0 320 320" className={common} aria-hidden>
        {/* A stack of coins; the top coin lifts on hover */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} className={i === 4 ? `${hover} group-hover:-translate-y-6` : undefined}>
            <rect x="110" y={238 - i * 26} width="150" height="26" fill={i === 4 ? lime : a} />
            <ellipse cx="185" cy={264 - i * 26} rx="75" ry="20" fill={i === 4 ? lime : a} />
            <ellipse cx="185" cy={238 - i * 26} rx="75" ry="20" fill={i === 4 ? lime : a} stroke={i === 4 ? "#0e1150" : b} strokeOpacity={i === 4 ? 0.25 : 0.35} strokeWidth="2" />
          </g>
        ))}
      </svg>
    );
  if (kind === "spend")
    return (
      <svg viewBox="0 0 320 320" className={common} aria-hidden>
        <g transform="translate(150 170)">
          {[-14, 0, 14].map((r, i) => (
            <g key={r} className={`${hover}`} style={{ transformOrigin: "0 60px" }}>
              <rect
                x="-80"
                y="-50"
                width="170"
                height="108"
                rx="14"
                transform={`rotate(${r})`}
                fill={i === 2 ? lime : a}
                className={`${hover} ${i === 2 ? "group-hover:rotate-[22deg]" : i === 0 ? "group-hover:-rotate-[22deg]" : ""}`}
                style={{ transformOrigin: "0 60px" }}
              />
            </g>
          ))}
          <rect x="-42" y="-26" width="26" height="20" rx="4" fill="#0e1150" opacity="0.55" transform="rotate(14)" />
        </g>
      </svg>
    );
  if (kind === "borrow")
    return (
      <svg viewBox="0 0 320 320" className={common} aria-hidden>
        {/* A home and its key: what a loan unlocks */}
        <path d="M60 280V160l100-80 100 80v120Z" fill={a} />
        <path d="M40 172 160 76l120 96" fill="none" stroke="#0e1150" strokeOpacity="0.55" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="132" y="200" width="56" height="80" rx="6" fill="#0e1150" fillOpacity="0.35" />
        <g className={`${hover} group-hover:rotate-[-18deg]`} style={{ transformOrigin: "236px 236px" }}>
          <circle cx="236" cy="236" r="26" fill="none" stroke="#0e1150" strokeWidth="10" />
          <path d="M254 254l46 46M282 282l-12 12M292 292l-10 10" stroke="#0e1150" strokeWidth="10" strokeLinecap="round" />
        </g>
      </svg>
    );
  if (kind === "send")
    return (
      <svg viewBox="0 0 320 320" className={common} aria-hidden>
        <rect x="40" y="70" width="110" height="200" rx="22" fill={a} />
        <rect x="200" y="40" width="96" height="176" rx="20" fill={a} />
        <path
          d="M150 150 C 180 150, 190 120, 220 120"
          fill="none"
          stroke={lime}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="8 12"
          className="[animation:dash_1.6s_linear_infinite]"
        />
        <circle cx="222" cy="120" r="10" fill={lime} className={`${hover} group-hover:scale-150`} style={{ transformOrigin: "222px 120px" }} />
        <style>{`@keyframes dash{to{stroke-dashoffset:-40}}`}</style>
      </svg>
    );
  return (
    <svg viewBox="0 0 320 320" className={common} aria-hidden>
      {/* A shopfront with its awning: the business the loan backs */}
      <rect x="60" y="150" width="220" height="130" rx="6" fill={a} />
      <g className={`${hover} group-hover:-translate-y-2`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${50 + i * 48} 110h48v34a24 24 0 0 1-48 0Z`} fill={i % 2 ? a : lime} />
        ))}
        <rect x="44" y="96" width="252" height="16" rx="4" fill={b} />
      </g>
      <rect x="92" y="196" width="70" height="84" rx="4" fill="#0e1150" fillOpacity="0.4" />
      <rect x="186" y="196" width="66" height="48" rx="4" fill={b} fillOpacity="0.5" />
    </svg>
  );
}
