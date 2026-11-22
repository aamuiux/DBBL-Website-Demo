"use client";

import { useId } from "react";
import { ArrowUpRight, Building2, Crown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Reveal, SectionHeading } from "./ui";

export function Segments() {
  const { d } = useLang();
  const id = useId();
  const it = d.segments.items;

  return (
    <section aria-labelledby={`${id}-h`} className="mx-auto max-w-[1360px] px-5 py-24 sm:px-6 md:py-32 xl:px-10">
      <SectionHeading id={`${id}-h`} title={d.segments.title} />

      <div className="mt-12 grid auto-rows-[minmax(15rem,auto)] gap-4 md:grid-cols-6 lg:grid-cols-12">
        {/* Personal: photographic, the widest tile */}
        <Reveal className="md:col-span-6 lg:col-span-7 lg:row-span-2">
          <Tile href={links.personalAccounts} label={it.personal.name} className="min-h-[24rem] text-white lg:min-h-full">
            <FinanceArt />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(9_11_58/0.85),rgb(9_11_58/0)_60%)]" />
            <TileCopy name={it.personal.name} body={it.personal.body} cta={d.segments.cta} big />
          </Tile>
        </Reveal>

        {/* VIP */}
        <Reveal delay={0.06} className="md:col-span-3 lg:col-span-5">
          <Tile href={links.vip} label={it.vip.name} className="bg-indigo-950 text-white">
            <Crown className="relative size-8 text-lime transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-12" aria-hidden />
            <TileCopy name={it.vip.name} body={it.vip.body} cta={d.segments.cta} />
          </Tile>
        </Reveal>

        {/* SME */}
        <Reveal delay={0.1} className="md:col-span-3 lg:col-span-5">
          <Tile href={links.smeLenden} label={it.sme.name} className="text-white">
            <StoreArt />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(0_80_41/0.96)_0%,rgb(0_80_41/0.82)_48%,rgb(0_80_41/0)_85%),linear-gradient(0deg,rgb(0_80_41/0.6),transparent_45%)]" />
            <TileCopy name={it.sme.name} body={it.sme.body} cta={d.segments.cta} narrow />
          </Tile>
        </Reveal>

        {/* Corporate */}
        <Reveal delay={0.06} className="md:col-span-3 lg:col-span-6">
          <Tile href={links.corporate} label={it.corporate.name} className="bg-indigo-600 text-white">
            <Building2 className="relative size-8 text-lime transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1" aria-hidden />
            <TileCopy name={it.corporate.name} body={it.corporate.body} cta={d.segments.cta} />
          </Tile>
        </Reveal>

        {/* NRB & Offshore */}
        <Reveal delay={0.1} className="md:col-span-3 lg:col-span-6">
          <Tile href={links.offshore} label={it.nrb.name} className="bg-lime text-indigo-950">
            <ul className="relative flex flex-wrap gap-2" aria-label="Offshore currencies">
              {["USD", "EUR", "GBP", "CAD", "AUD"].map((c, i) => (
                <li
                  key={c}
                  className="tabular rounded-full bg-indigo-950/8 px-3.5 py-1.5 text-sm font-bold ring-1 ring-inset ring-indigo-950/15 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {c}
                </li>
              ))}
            </ul>
            <TileCopy name={it.nrb.name} body={it.nrb.body} cta={d.segments.cta} dark />
          </Tile>
        </Reveal>
      </div>
    </section>
  );
}

/** Illustrative personal-finance scene (not a photo): a phone with a savings goal, a growth chart and coins. */
function FinanceArt() {
  return (
    <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden bg-[linear-gradient(135deg,#252a86,#090b3a)]">
      <span className="absolute -right-24 -top-28 size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(200_241_105/0.28),transparent_65%)]" />
      <span className="absolute -left-20 bottom-0 size-[26rem] rounded-full bg-[radial-gradient(circle,rgb(106_112_201/0.35),transparent_65%)]" />
      <svg viewBox="0 0 760 520" preserveAspectRatio="xMaxYMin slice" className="absolute inset-0 size-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
        <defs>
          <linearGradient id="fa-coin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffe08a" />
            <stop offset="1" stopColor="#e0a21c" />
          </linearGradient>
          <linearGradient id="fa-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c8f169" stopOpacity="0.5" />
            <stop offset="1" stopColor="#c8f169" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* growth chart card, behind the phone */}
        <g transform="translate(482 60) rotate(6)">
          <rect width="270" height="170" rx="20" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.25" />
          <path d="M20 135 L65 112 L105 122 L150 82 L195 92 L250 40 L250 150 L20 150 Z" fill="url(#fa-area)" />
          <path d="M20 135 L65 112 L105 122 L150 82 L195 92 L250 40" fill="none" stroke="#c8f169" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="250" cy="40" r="7" fill="#c8f169" stroke="#090b3a" strokeWidth="3" />
          <rect x="22" y="18" width="70" height="8" rx="4" fill="white" fillOpacity="0.55" />
        </g>
        {/* phone */}
        <g transform="translate(452 105) rotate(-8)">
          <rect width="190" height="370" rx="32" fill="#0d0f2b" stroke="white" strokeOpacity="0.25" strokeWidth="2" />
          <rect x="9" y="9" width="172" height="352" rx="25" fill="#f5f6fa" />
          <rect x="68" y="18" width="54" height="12" rx="6" fill="#0d0f2b" />
          <rect x="24" y="52" width="80" height="9" rx="4.5" fill="#6b6f8e" fillOpacity="0.5" />
          <rect x="24" y="68" width="120" height="16" rx="6" fill="#0d0f2b" />
          {/* savings goal ring */}
          <circle cx="95" cy="168" r="46" fill="none" stroke="#e7e8f7" strokeWidth="14" />
          <circle cx="95" cy="168" r="46" fill="none" stroke="#252a86" strokeWidth="14" strokeLinecap="round" strokeDasharray="208 289" transform="rotate(-90 95 168)" />
          <text x="95" y="177" textAnchor="middle" fontSize="26" fontWeight="700" fill="#0d0f2b">৳</text>
          <rect x="52" y="232" width="86" height="9" rx="4.5" fill="#6b6f8e" fillOpacity="0.5" />
          {/* list rows */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(22 ${258 + i * 30})`}>
              <rect width="146" height="24" rx="8" fill="white" />
              <circle cx="14" cy="12" r="6" fill={["#00904a", "#252a86", "#e31b23"][i]} />
              <rect x="28" y="8" width={[54, 44, 62][i]} height="8" rx="4" fill="#0d0f2b" fillOpacity="0.7" />
              <rect x="112" y="8" width="24" height="8" rx="4" fill="#6b6f8e" fillOpacity="0.45" />
            </g>
          ))}
        </g>
        {/* coins */}
        {[
          [440, 130, 38],
          [706, 330, 32],
          [640, 452, 26],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="url(#fa-coin)" stroke="#b67a0a" strokeOpacity="0.5" strokeWidth="3" />
            <circle cx={x} cy={y} r={r * 0.72} fill="none" stroke="#b67a0a" strokeOpacity="0.35" strokeWidth="2" />
            <text x={x} y={y + r * 0.32} textAnchor="middle" fontSize={r * 0.95} fontWeight="700" fill="#8a5a05">৳</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Illustrative storefront (not a photo): a striped awning, lit windows full of goods, an open sign and planters. */
function StoreArt() {
  const stripes = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden bg-[linear-gradient(180deg,#0b7a47,#00502a)]">
      <svg viewBox="0 0 520 420" preserveAspectRatio="xMaxYMid meet" className="absolute inset-0 size-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
        <defs>
          <linearGradient id="sa-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff2c2" />
            <stop offset="1" stopColor="#ffd37a" />
          </linearGradient>
        </defs>
        {/* string lights */}
        <path d="M60 24 Q 290 70 520 20" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
        {[100, 170, 240, 310, 380, 450].map((x, i) => (
          <circle key={x} cx={x} cy={24 + Math.sin((x - 60) / 460 * Math.PI) * 30 + 6} r="5" fill="#ffe08a" opacity={i % 2 ? 0.9 : 0.6} />
        ))}
        {/* building */}
        <rect x="70" y="92" width="410" height="330" rx="10" fill="#f6efe2" />
        <rect x="70" y="92" width="410" height="26" fill="#e7dcc6" />
        <rect x="205" y="102" width="140" height="30" rx="8" fill="#0d0f2b" />
        <text x="275" y="123" textAnchor="middle" fontSize="19" fontWeight="700" fill="#ffd37a" letterSpacing="3">BAZAAR</text>
        {/* awning */}
        <g transform="translate(60 140)">
          {stripes.map((i) => (
            <path key={i} d={`M${i * 42} 0 h42 v34 a21 21 0 0 1 -42 0 z`} fill={i % 2 ? "#ffffff" : "#c8f169"} />
          ))}
          <rect y="-8" width="420" height="10" fill="#0b7a47" opacity="0.35" />
        </g>
        {/* windows full of goods */}
        {[
          { x: 92, w: 168 },
          { x: 372, w: 90 },
        ].map((w, k) => (
          <g key={k}>
            <rect x={w.x} y="216" width={w.w} height="150" rx="8" fill="url(#sa-glow)" />
            <rect x={w.x} y="216" width={w.w} height="150" rx="8" fill="none" stroke="#c9b98f" strokeWidth="4" />
            <rect x={w.x + 6} y="290" width={w.w - 12} height="5" fill="#b9a273" />
            <rect x={w.x + 6} y="338" width={w.w - 12} height="5" fill="#b9a273" />
          </g>
        ))}
        {/* goods: jars, bags, a plant */}
        <g>
          <rect x="106" y="256" width="26" height="34" rx="5" fill="#e31b23" />
          <rect x="138" y="262" width="24" height="28" rx="5" fill="#252a86" />
          <rect x="168" y="250" width="30" height="40" rx="6" fill="#ffcf3d" />
          <path d="M205 290 q4 -34 22 -34 q18 0 22 34 z" fill="#00904a" />
          <rect x="108" y="304" width="40" height="34" rx="6" fill="#8a288f" />
          <rect x="156" y="310" width="44" height="28" rx="6" fill="#f08a24" />
          <circle cx="226" cy="324" r="16" fill="#e0568f" />
          <rect x="384" y="262" width="22" height="28" rx="5" fill="#e31b23" />
          <rect x="412" y="256" width="26" height="34" rx="5" fill="#252a86" />
          <rect x="388" y="306" width="50" height="32" rx="6" fill="#00a38a" />
        </g>
        {/* door */}
        <rect x="280" y="216" width="80" height="206" rx="6" fill="#0d6b3f" />
        <rect x="290" y="228" width="60" height="120" rx="4" fill="url(#sa-glow)" opacity="0.9" />
        <circle cx="346" cy="330" r="4" fill="#ffe08a" />
        <g transform="translate(298 262) rotate(-4)">
          <rect width="44" height="22" rx="5" fill="#e31b23" />
          <text x="22" y="15" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" letterSpacing="1">OPEN</text>
        </g>
        {/* planters */}
        {[84, 430].map((x) => (
          <g key={x}>
            <rect x={x} y="392" width="36" height="30" rx="5" fill="#b9582f" />
            <circle cx={x + 18} cy="380" r="18" fill="#12a65b" />
            <circle cx={x + 8} cy="372" r="11" fill="#00904a" />
            <circle cx={x + 28} cy="374" r="12" fill="#00a85a" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function Tile({ href, label, className = "", children }: { href: string; label: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className={`group relative isolate flex h-full min-h-60 flex-col justify-between overflow-hidden rounded-2xl p-7 transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] sm:p-8 ${className}`}
    >
      {children}
    </a>
  );
}

function TileCopy({ name, body, cta, big, dark, narrow }: { name: string; body: string; cta: string; big?: boolean; dark?: boolean; narrow?: boolean }) {
  return (
    <div className="relative mt-auto pt-10">
      <h3 className={`font-display font-semibold tracking-[-0.03em] ${big ? "text-[clamp(2.2rem,4vw,3.5rem)] leading-none" : "text-3xl leading-tight"}`}>{name}</h3>
      <p className={`mt-3 text-pretty ${narrow ? "max-w-[27ch] lg:max-w-[24ch] xl:max-w-[30ch]" : "max-w-[40ch]"} ${dark ? "text-indigo-900/80" : "text-white/80"} ${big ? "text-lg" : ""}`}>{body}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-semibold">
        {cta}
        <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </div>
  );
}
