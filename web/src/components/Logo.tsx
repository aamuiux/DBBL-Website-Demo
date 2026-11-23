"use client";

import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

/**
 * DBBL's mark with the wordmark set beside it (client-supplied SVGs in /public).
 * On /new-design the full horizontal logo file is used; on a dark bar it sits on a white plate so its blue wordmark reads.
 */
export function Logo({ light = false, large = false, className = "" }: { light?: boolean; large?: boolean; className?: string }) {
  const { lang } = useLang();
  const brand = usePathname()?.startsWith("/new-design") ?? false;
  if (brand) {
    return (
      <span className={`inline-flex items-center leading-none ${light ? "rounded-xl bg-white px-3 py-2" : ""} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a static SVG; no optimisation needed */}
        <img src={lang === "bn" ? "/dbbl-logo-bn.svg" : "/dbbl-logo.svg"} alt={lang === "bn" ? "ডাচ্-বাংলা ব্যাংক" : "Dutch-Bangla Bank"} width={676} height={lang === "bn" ? 102 : 104} className={`w-auto max-w-full shrink-0 ${large ? "h-11 sm:h-12" : "h-8 sm:h-9"}`} />
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a small static SVG; no optimisation needed */}
      <img src="/dbbl-mark.svg" alt="" width={58} height={39} className="h-9 w-auto shrink-0" />
      <span className={`flex flex-col leading-none ${light ? "text-white" : "text-indigo-700"}`}>
        <span className="font-display text-[1.05rem] font-bold tracking-[-0.02em]">Dutch-Bangla Bank</span>
        <span className={`mt-1 text-[0.68rem] font-medium tracking-[0.02em] ${light ? "text-indigo-200" : "text-ink-3"}`}>
          Your Trusted Partner
        </span>
      </span>
    </span>
  );
}
