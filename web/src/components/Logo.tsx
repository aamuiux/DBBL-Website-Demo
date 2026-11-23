"use client";

import { usePathname } from "next/navigation";

/**
 * DBBL's mark with the wordmark set beside it (client-supplied SVGs in /public).
 * On /new-design the full horizontal logo file is used; on a dark bar it sits on a white plate so its blue wordmark reads.
 */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const brand = usePathname()?.startsWith("/new-design") ?? false;
  if (brand) {
    return (
      <span className={`inline-flex items-center leading-none ${light ? "rounded-xl bg-white px-3 py-2" : ""} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a static SVG; no optimisation needed */}
        <img src="/dbbl-logo.svg" alt="Dutch-Bangla Bank" width={676} height={87} className="h-7 w-auto shrink-0 sm:h-8" />
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a small static SVG; no optimisation needed */}
      <img src="/dbbl-mark.svg" alt="" width={58} height={36} className="h-9 w-auto shrink-0" />
      <span className={`flex flex-col leading-none ${light ? "text-white" : "text-indigo-700"}`}>
        <span className="font-display text-[1.05rem] font-bold tracking-[-0.02em]">Dutch-Bangla Bank</span>
        <span className={`mt-1 text-[0.68rem] font-medium tracking-[0.02em] ${light ? "text-indigo-200" : "text-ink-3"}`}>
          Your Trusted Partner
        </span>
      </span>
    </span>
  );
}
