"use client";

import { motion } from "motion/react";
import { MapPin, Phone, Rocket, Smartphone, UserPlus, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links, phone } from "@/lib/links";
import { easeOut, useReduce } from "./ui";

type Key = keyof ReturnType<typeof useLang>["d"]["dock"]["items"];

const items: { key: Key; href: string; icon: LucideIcon; accent: string }[] = [
  { key: "atm", href: links.atmLocator, icon: MapPin, accent: "bg-indigo-50 text-indigo-600" },
  { key: "open", href: links.personalAccounts, icon: UserPlus, accent: "bg-green-100 text-green-700" },
  { key: "nexus", href: links.nexusPay, icon: Smartphone, accent: "bg-indigo-50 text-indigo-600" },
  { key: "rocket", href: links.rocket, icon: Rocket, accent: "bg-rocket-100 text-rocket" },
  { key: "call", href: `tel:${phone.hotline}`, icon: Phone, accent: "bg-green-100 text-green-700" },
];

/** The quick-action dock overlaps the hero's bottom edge so the five most common jobs are one tap away. */
export function QuickDock() {
  const { d } = useLang();
  const reduce = useReduce();
  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-[1360px] px-5 sm:px-6 xl:px-10">
      <motion.nav
        aria-label={d.dock.label}
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easeOut, delay: 0.5 }}
        className="rounded-2xl bg-white p-2 shadow-[var(--shadow-float)]"
      >
        <ul className="no-scrollbar flex snap-x gap-1 overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible">
          {items.map(({ key, href, icon: Icon, accent }) => {
            const external = href.startsWith("http");
            return (
              <li key={key} className="min-w-[9.5rem] shrink-0 snap-start md:min-w-0">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex min-h-16 items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-paper md:px-4"
                >
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 ${accent}`}>
                    <Icon className="size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="text-[0.95rem] font-semibold leading-snug text-ink">{d.dock.items[key]}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </div>
  );
}
