"use client";

import { useId } from "react";
import { ArrowRight, Headset, ShieldAlert } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links, phone } from "@/lib/links";
import { Reveal } from "./ui";

/**
 * "We're here, any hour." A dark stage with glowing red ribbons, the headline on the left and a frosted
 * Helpdesk card on the right: the two phone numbers, then the ways to get help, each with a round arrow.
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
      <div className="on-dark relative isolate mx-auto max-w-[1520px] overflow-hidden rounded-[2rem] bg-black text-white">
        <Ribbons />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_16%_46%,rgb(0_0_0/0.92),transparent_62%)]" />

        <div className="grid gap-12 px-6 py-16 sm:px-10 md:py-24 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:px-16">
          <Reveal>
            <h2 id={`${id}-h`} className="font-display text-balance text-[clamp(2.8rem,6.2vw,5.75rem)] font-semibold leading-[1] tracking-[-0.04em]">
              {d.help.title}
            </h2>
            <p className="mt-6 max-w-[34ch] text-pretty text-lg text-white/75">{d.help.lede}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[1.75rem] bg-[linear-gradient(145deg,rgb(120_28_32/0.62),rgb(18_8_9/0.82)_60%)] p-6 shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)] ring-1 ring-inset ring-white/12 backdrop-blur-xl sm:p-9">
              <div className="flex flex-col items-center text-center">
                <span className="grid size-14 place-items-center rounded-full bg-black/45 ring-1 ring-white/10">
                  <Headset className="size-6" aria-hidden />
                </span>
                <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.02em]">{d.help.card}</h3>
                <p className="mt-1 text-white/75">{d.help.lede}</p>

                <div className="mt-7 flex flex-wrap items-start justify-center gap-x-12 gap-y-5">
                  <a href={`tel:${phone.hotline}`} className="group block">
                    <span className="font-display tabular block text-3xl font-semibold tracking-[-0.02em] group-hover:text-lime">{num(16216).replace(/,/g, "")}</span>
                    <span className="mt-0.5 block text-sm text-white/65">{d.help.local}</span>
                  </a>
                  <a href={`tel:${phone.international}`} className="group block">
                    <span className="font-display tabular block text-3xl font-semibold tracking-[-0.02em] group-hover:text-lime">+880 9666 716216</span>
                    <span className="mt-0.5 block text-sm text-white/65">{d.help.intl}</span>
                  </a>
                </div>
              </div>

              <ul className="mt-8 divide-y divide-white/12 border-t border-white/12">
                {rows.map((r) => (
                  <li key={r.name}>
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-5">
                      <span className="min-w-0 flex-1">
                        <span className="font-display block text-2xl font-semibold tracking-[-0.02em]">{r.name}</span>
                        <span className="mt-1 block text-pretty text-white/70">{r.body}</span>
                      </span>
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-red-600 text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:bg-red-500">
                        <ArrowRight className="size-5" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex items-start gap-3 rounded-2xl bg-black/35 p-4 ring-1 ring-inset ring-white/10">
                <ShieldAlert className="mt-0.5 size-5 shrink-0 text-red-400" aria-hidden />
                <p className="text-sm text-white/80">
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

/** Glowing red ribbons: a blurred copy underneath for the glow, a crisp one on top. */
function Ribbons() {
  const paths = [
    { d: "M-140 860 C 140 560 360 430 700 480 C 1000 525 1110 300 1190 -80", w: 78, o: 0.95 },
    { d: "M-60 980 C 200 700 420 600 760 640", w: 34, o: 0.7 },
    { d: "M780 -80 C 840 150 1010 330 1200 540", w: 44, o: 0.8 },
    { d: "M1300 -60 C 1360 120 1490 210 1720 240", w: 62, o: 0.9 },
    { d: "M1080 980 C 1160 780 1380 700 1700 760", w: 40, o: 0.55 },
  ];
  return (
    <svg aria-hidden viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-20 size-full">
      <defs>
        <linearGradient id="rib" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#a30f18" />
          <stop offset="0.55" stopColor="#ff2a35" />
          <stop offset="1" stopColor="#c8141d" />
        </linearGradient>
        <filter id="rib-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>
      <g fill="none" strokeLinecap="round">
        {paths.map((p, i) => (
          <path key={`g${i}`} d={p.d} stroke="#e31b23" strokeWidth={p.w * 1.8} opacity={p.o * 0.55} filter="url(#rib-blur)" />
        ))}
        {paths.map((p, i) => (
          <path key={i} d={p.d} stroke="url(#rib)" strokeWidth={p.w} opacity={p.o} />
        ))}
      </g>
    </svg>
  );
}
