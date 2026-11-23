"use client";

import { useEffect, useId, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Reveal, SectionHeading, TextLink, easeOut, rise, stagger, useReduce } from "./ui";

function Count({ to, suffix }: { to: number; suffix: string }) {
  const { num } = useLang();
  const reduce = useReduce();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular">
      <span aria-hidden>
        {num(reduce ? to : v)}
        {suffix}
      </span>
      <span className="sr-only">
        {num(to)}
        {suffix}
      </span>
    </span>
  );
}

export function Proof() {
  const { d, lang } = useLang();
  const id = useId();
  const reduce = useReduce();
  const [big, ...rest] = d.proof.stats;

  return (
    <section aria-labelledby={`${id}-h`} className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <SectionHeading id={`${id}-h`} title={d.proof.title} lede={d.proof.lede} />

        {/* Numbers: one oversized, two in support */}
        <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-12">
          <Reveal>
            <p className="font-display text-[clamp(3.2rem,8.4vw,6rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-indigo-600">
              <Count to={big.value} suffix={big.suffix} />
            </p>
            <p className="mt-4 max-w-xs text-lg text-ink-2">{big.label}</p>
          </Reveal>
          {rest.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * (i + 1)}>
              <p className="font-display text-[clamp(2.6rem,5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.035em] text-ink">
                <Count to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-4 max-w-[22ch] text-lg text-ink-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-3">
          <a href={links.eBankingIntro} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-indigo-600">
            {d.proof.source}
          </a>
        </p>

        {/* Firsts: four bold tiles */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.025em] text-ink">{d.proof.firstsTitle}</h3>
            <TextLink href={links.history}>{lang === "bn" ? "আমাদের ইতিহাস পড়ুন" : "Read our history"}</TextLink>
          </div>
          <motion.ol
            variants={stagger}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {d.proof.firsts.map((f, i) => (
              <motion.li
                key={f.title}
                variants={rise}
                className={`flex min-h-72 flex-col rounded-3xl p-6 ${["bg-indigo-600 text-white", "bg-green-600 text-white", "bg-rocket text-white", "bg-lime text-indigo-950"][i]}`}
              >
                {/* The year (or "First") is part of the title, not a label above it */}
                <p className="font-display text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.03em]">
                  {/^\D+$/.test(f.year) ? `${f.year} ${lang === "bn" ? f.title : f.title.charAt(0).toLowerCase() + f.title.slice(1)}` : `${f.year}: ${f.title}`}
                </p>
                <p className="mt-auto pt-6 opacity-85">{f.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

/** 23 partner banks + Bangladesh Bank around DBBL's network. Partner positions are schematic, not geographic. */
export function Network() {
  const { d } = useLang();
  const reduce = useReduce();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const N = 23;
  const cx = 250;
  const cy = 250;
  const nodes = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2 + 0.14;
    const r = i % 2 ? 196 : 168;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, i };
  });
  const bb = { x: cx, y: cy + 104 };

  return (
    <div ref={ref} className="on-dark network-card relative overflow-hidden rounded-2xl bg-indigo-950 p-7 text-white sm:p-10">
      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{d.proof.networkTitle}</h3>
      <p className="mt-3 max-w-[44ch] text-indigo-200">{d.proof.networkBody}</p>

      <svg viewBox="0 0 500 500" className="mx-auto mt-6 w-full max-w-[30rem]" role="img" aria-label={`${d.proof.networkCenter}: ${d.proof.networkBB} + 23 ${d.proof.networkPartner}`}>
        {nodes.map((n) => (
          <line key={`l${n.i}`} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="rgb(255 255 255 / 0.14)" strokeWidth="1" />
        ))}
        <line x1={cx} y1={cy} x2={bb.x} y2={bb.y} className="stroke-lime" strokeWidth="2" />
        {/* pulses: motion only where money moves */}
        {!reduce &&
          inView &&
          nodes
            .filter((n) => n.i % 3 === 0)
            .map((n, k) => (
              <motion.circle
                key={`p${n.i}`}
                r="3.5"
                className="fill-lime"
                initial={{ cx, cy, opacity: 0 }}
                animate={{ cx: [cx, n.x], cy: [cy, n.y], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2 + (k % 3) * 0.5, delay: k * 0.35, ease: "easeInOut" }}
              />
            ))}
        {nodes.map((n) => (
          <motion.circle
            key={`n${n.i}`}
            cx={n.x}
            cy={n.y}
            r="9"
            className="fill-indigo-600"
            stroke="rgb(255 255 255 / 0.55)"
            strokeWidth="1.5"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.2 + n.i * 0.03 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
        <g>
          <circle cx={bb.x} cy={bb.y} r="20" className="fill-green-600" />
        </g>
        <circle cx={cx} cy={cy} r="58" className="fill-lime" />
        <text x={cx} y={cy + 9} textAnchor="middle" className="fill-indigo-950" fontSize="26" fontWeight="700">
          DBBL
        </text>
      </svg>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-indigo-200">
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-lime" aria-hidden /> {d.proof.networkCenter}
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-green-600" aria-hidden /> {d.proof.networkBB}
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-indigo-600 ring-1 ring-white/55" aria-hidden /> {d.proof.networkPartner} × 23
        </li>
      </ul>
    </div>
  );
}
