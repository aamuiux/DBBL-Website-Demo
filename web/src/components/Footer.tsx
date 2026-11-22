"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links, phone } from "@/lib/links";
import { Logo } from "./Logo";
import { StoreBadges } from "./AppStory";
import { FacebookIcon, LinkedinIcon, YoutubeIcon } from "./SocialIcons";

export function Footer() {
  const { d, lang } = useLang();
  const bn = lang === "bn";
  // The same page lives at / (concept colours) and /new-design (brand-guideline colours); link across.
  const brand = usePathname()?.startsWith("/new-design") ?? false;

  const cols: { title: string; items: [string, string][] }[] = [
    {
      title: d.footer.cols.bank,
      items: [
        [bn ? "ব্যক্তিগত অ্যাকাউন্ট" : "Personal accounts", links.personalAccounts],
        [bn ? "মেয়াদি আমানত" : "Term deposits", links.termDeposits],
        [bn ? "কার্ড" : "Cards", links.debitCards],
        [bn ? "রিটেইল ঋণ" : "Retail loans", links.retailLoan],
        [bn ? "এসএমই ব্যাংকিং" : "SME banking", links.smeLenden],
        [bn ? "কর্পোরেট ব্যাংকিং" : "Corporate banking", links.corporate],
        [bn ? "অফশোর ব্যাংকিং" : "Offshore banking", links.offshore],
      ],
    },
    {
      title: d.footer.cols.digital,
      items: [
        [bn ? "নেক্সাসপে" : "NexusPay", links.nexusPay],
        [bn ? "রকেট" : "Rocket", links.rocket],
        [bn ? "ইন্টারনেট ব্যাংকিং" : "Internet banking", links.ibFeatures],
        [bn ? "এজেন্ট ব্যাংকিং" : "Agent banking", links.agentBanking],
        [bn ? "পেমেন্ট গেটওয়ে" : "Payment gateway", links.ipg],
        [bn ? "এসএমএস অ্যালার্ট" : "SMS alert", links.smsAlert],
      ],
    },
    {
      title: d.footer.cols.about,
      items: [
        [bn ? "সংক্ষিপ্ত ইতিহাস" : "Brief history", links.history],
        [bn ? "পরিচালনা পর্ষদ" : "Board of Directors", links.board],
        [bn ? "বিনিয়োগকারী" : "Investor relations", links.financialStatements],
        [bn ? "সামাজিক কার্যক্রম" : "Social causes", links.socialCause],
        [bn ? "ক্যারিয়ার" : "Careers", links.careers],
        [bn ? "নিউজ রুম" : "News room", links.newsroom],
        [bn ? "দরপত্র" : "Tender notices", links.tender],
      ],
    },
    {
      title: d.footer.cols.help,
      items: [
        [bn ? "এটিএম / সিআরএম লোকেশন" : "ATM / CRM locations", links.atmLocator],
        [bn ? "শাখা লোকেশন" : "Branch locations", links.branchLocator],
        [bn ? "উপশাখা" : "Sub-branches", links.subBranch],
        [bn ? "সাধারণ প্রশ্ন" : "FAQ", links.faq],
        [bn ? "অভিযোগ সেল" : "Complaint cell", links.complaint],
        [bn ? "নাগরিক সনদ" : "Citizen's charter", links.citizensCharter],
        [bn ? "চার্জ ও ফি" : "Charges & fees", links.charges],
      ],
    },
  ];

  const legal: [string, string][] = [
    [bn ? "জাতীয় শুদ্ধাচার কৌশল" : "National Integrity Strategy", links.nis],
    [bn ? "আর্থিক সাক্ষরতা" : "Financial literacy", links.financialLiteracy],
    [bn ? "টেকসই অর্থায়ন" : "Sustainable finance", links.sustainableFinance],
    [bn ? "দাবিহীন আমানত" : "Unclaimed deposits", links.unclaimed],
    [bn ? "ঝুঁকিভিত্তিক মূলধন" : "Basel disclosures", links.riskCapital],
  ];

  const social = [
    { href: links.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: links.youtube, icon: YoutubeIcon, label: "YouTube" },
    { href: links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  ];

  return (
    <footer className="rounded-t-[2rem] border-t border-line bg-white text-ink-2 shadow-[0_-12px_40px_-24px_rgb(9_11_58/0.25)] sm:rounded-t-[2.5rem]">
      <div className="mx-auto max-w-[1360px] px-5 pt-20 sm:px-6 xl:px-10">
        <div className="grid gap-12 border-b border-line pb-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo />
            <div className="mt-8 space-y-3 text-[0.95rem]">
              <a href={`tel:${phone.hotline}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 hover:text-indigo-700">
                <Phone className="size-4 text-indigo-600" aria-hidden />
                <span className="tabular font-semibold text-ink">16216</span>
                <span className="tabular text-ink-3">+880 9666 716216</span>
              </a>
              <a href={links.contact} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-indigo-700">
                <MapPin className="mt-1 size-4 shrink-0 text-indigo-600" aria-hidden />
                <span>
                  {d.footer.address}
                  <span className="mt-1 block text-ink-3">{d.footer.swift}</span>
                </span>
              </a>
            </div>
            <p className="mt-10 text-sm font-semibold text-ink">{d.footer.getApp}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <StoreBadges light />
            </div>
            <ul className="mt-6 flex items-center gap-2" aria-label={d.footer.follow}>
              {social.map(({ href, icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="grid size-11 place-items-center rounded-full bg-indigo-50 text-indigo-700 transition-colors hover:bg-indigo-600 hover:text-white"
                  >
                    <Icon className="size-[1.1rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">{c.title}</h2>
                <ul className="mt-4 space-y-0">
                  {c.items.map(([label, href]) => (
                    <li key={href + label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-7 items-center text-[0.92rem] transition-colors hover:text-indigo-700 hover:underline"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {legal.map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700 hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <Link href={brand ? "/" : "/new-design"} className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-600 hover:text-white">
              {brand ? (bn ? "কনসেপ্ট রঙে দেখুন" : "View in concept colours") : bn ? "ব্র্যান্ড রঙে দেখুন" : "View in brand colours"} →
            </Link>
            <p className="text-sm text-ink-3 md:text-right">© {d.footer.legal}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
