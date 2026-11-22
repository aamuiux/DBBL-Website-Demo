"use client";

import { useId } from "react";
import { ArrowRight, Headset, ShieldAlert } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links, phone } from "@/lib/links";
import { Reveal } from "./ui";

/**
 * "We're here, any hour." A deep-indigo stage with flowing brand-colour bands, a frosted Helpdesk card on
 * the left and the headline on the right: the two phone numbers, then the ways to get help, each with a round arrow.
 */
export function Help() {
  const { d, num } = useLang();
  const id = useId();
  const rows = [
    { name: d.help.links.complaint, body: d.help.rows.complaint, href: links.complaint },
    { name: d.help.links.faq, body: d.help.rows.faq, href: links.faq },
    { name: d.help.links.charges, body: d.help.rows.charges, href: links.charges },
  ];

  return (
    <section id="help" aria-labelledby={`${id}-h`} className="px-3 py-6 sm:px-5 md:py-10">
      <div className="on-dark relative isolate mx-auto max-w-[1520px] overflow-hidden rounded-[2rem] bg-indigo-950 text-white">
        <Ribbons />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_46%,rgb(9_11_58/0.9),transparent_60%)]" />

        <div className="grid gap-12 px-6 py-16 sm:px-10 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:px-16">
          <Reveal className="lg:order-2 lg:text-right">
            <h2 id={`${id}-h`} className="font-display text-balance text-[clamp(2.8rem,6.2vw,5.75rem)] font-semibold leading-[1] tracking-[-0.04em]">
              {d.help.title}
            </h2>
            <p className="mt-6 max-w-[34ch] text-pretty text-lg text-indigo-100 lg:ml-auto">{d.help.lede}</p>
          </Reveal>

          <Reveal delay={0.08} className="lg:order-1">
            <div className="rounded-[1.75rem] bg-[linear-gradient(145deg,rgb(58_64_168/0.55),rgb(9_11_58/0.85)_62%)] p-6 shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)] ring-1 ring-inset ring-white/15 backdrop-blur-xl sm:p-9">
              <div className="flex flex-col items-center text-center">
                <span className="grid size-14 place-items-center rounded-full bg-lime text-indigo-950">
                  <Headset className="size-6" aria-hidden />
                </span>
                <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.02em]">{d.help.card}</h3>
                <p className="mt-1 text-indigo-100">{d.help.lede}</p>

                <div className="mt-7 flex flex-wrap items-start justify-center gap-x-12 gap-y-5">
                  <a href={`tel:${phone.hotline}`} className="group block">
                    <span className="font-display tabular block text-3xl font-semibold tracking-[-0.02em] group-hover:text-lime">{num(16216).replace(/,/g, "")}</span>
                    <span className="mt-0.5 block text-sm text-indigo-200">{d.help.local}</span>
                  </a>
                  <a href={`tel:${phone.international}`} className="group block">
                    <span className="font-display tabular block text-3xl font-semibold tracking-[-0.02em] group-hover:text-lime">+880 9666 716216</span>
                    <span className="mt-0.5 block text-sm text-indigo-200">{d.help.intl}</span>
                  </a>
                </div>
              </div>

              <ul className="mt-8 divide-y divide-white/15 border-t border-white/15">
                {rows.map((r) => (
                  <li key={r.name}>
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-5">
                      <span className="min-w-0 flex-1">
                        <span className="font-display block text-2xl font-semibold tracking-[-0.02em]">{r.name}</span>
                        <span className="mt-1 block text-pretty text-indigo-200">{r.body}</span>
                      </span>
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-lime text-indigo-950 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:bg-white">
                        <ArrowRight className="size-5" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex items-start gap-3 rounded-2xl bg-indigo-950/60 p-4 ring-1 ring-inset ring-white/12">
                <ShieldAlert className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden />
                <p className="text-sm text-indigo-100">
                  <span className="font-semibold text-white">{d.help.lost}</span> {d.help.lostBody}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Flowing brand-colour bands (indigo, lime, green): a blurred copy underneath for the glow, a crisp one on top. */
function Ribbons() {
  const paths = [
    { d: "M-120 640 C 220 760 520 560 820 600 C 1120 640 1300 460 1740 520", w: 96, o: 0.9, c: "url(#rib-indigo)", g: "#3a40a8" },
    { d: "M-100 760 C 260 860 560 700 880 730 C 1160 756 1360 620 1740 660", w: 28, o: 0.85, c: "url(#rib-lime)", g: "#c8f169" },
    { d: "M-140 300 C 180 120 480 220 760 140 C 1040 60 1300 160 1740 40", w: 70, o: 0.75, c: "url(#rib-indigo)", g: "#252a86" },
    { d: "M-120 410 C 220 250 520 340 800 270 C 1080 200 1320 280 1740 170", w: 20, o: 0.7, c: "url(#rib-green)", g: "#12a65b" },
  ];
  return (
    <svg aria-hidden viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-20 size-full">
      <defs>
        <linearGradient id="rib-indigo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#252a86" />
          <stop offset="0.5" stopColor="#4a51c4" />
          <stop offset="1" stopColor="#252a86" />
        </linearGradient>
        <linearGradient id="rib-lime" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b4e04f" />
          <stop offset="1" stopColor="#c8f169" />
        </linearGradient>
        <linearGradient id="rib-green" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00904a" />
          <stop offset="1" stopColor="#12a65b" />
        </linearGradient>
        <filter id="rib-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>
      <g fill="none" strokeLinecap="round">
        {paths.map((p, i) => (
          <path key={`g${i}`} d={p.d} stroke={p.g} strokeWidth={p.w * 1.8} opacity={p.o * 0.28} filter="url(#rib-blur)" />
        ))}
        {paths.map((p, i) => (
          <path key={i} d={p.d} stroke={p.c} strokeWidth={p.w} opacity={p.o * 0.5} />
        ))}
      </g>
    </svg>
  );
}
