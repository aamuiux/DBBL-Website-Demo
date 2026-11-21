"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";

import { ArrowUpRight, Hand } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Button, Reveal, SectionHeading, useReduce } from "./ui";

// Three.js is only fetched when the card stage scrolls near the viewport.
const Card3D = dynamic(() => import("./Card3D"), { ssr: false, loading: () => <CardFallback /> });

export function Cards() {
  const { d } = useLang();
  const reduce = useReduce();
  const id = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        let ok = false;
        try {
          const c = document.createElement("canvas");
          ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
        } catch {}
        setWebgl(ok);
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby={`${id}-h`} className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.1fr_1fr] xl:px-10">
        <div ref={stageRef} className="relative order-2 lg:order-1">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[40rem] rounded-2xl bg-[radial-gradient(circle_at_50%_55%,var(--color-indigo-100),transparent_68%)]">
            {near && webgl ? <Card3D reduce={!!reduce} /> : <CardFallback />}
          </div>
          {webgl && (
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-ink-3">
              <Hand className="size-4" aria-hidden /> {d.cards.drag}
            </p>
          )}
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading id={`${id}-h`} title={d.cards.title} lede={d.cards.lede} />
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {d.cards.list.map((c, i) => (
              <Reveal as="li" key={c.name} delay={i * 0.06}>
                <a
                  href={links[c.href as keyof typeof links]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-6 py-6"
                >
                  <span>
                    <span className="font-display block text-2xl font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-indigo-600">
                      {c.name}
                    </span>
                    <span className="mt-1.5 block max-w-[46ch] text-ink-2">{c.body}</span>
                  </span>
                  <ArrowUpRight className="mt-1 size-6 shrink-0 text-indigo-400 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-indigo-600" aria-hidden />
                </a>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-10">
            <Button href={links.creditCards} tone="primary" size="lg">
              {d.cards.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CardFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <div className="relative aspect-[1.586/1] w-[62%] -rotate-6 overflow-hidden rounded-[1.1rem] bg-[linear-gradient(135deg,#3a40a8,#252a86_55%,#0e1150)] p-[5%] text-white shadow-[var(--shadow-lift)]">
        <span className="absolute -right-[12%] -top-[30%] aspect-square w-[60%] rounded-full border-[14px] border-white/10" />
        <span className="font-display block text-[clamp(0.9rem,2vw,1.3rem)] font-bold">Dutch-Bangla Bank</span>
        <span className="mt-1 block text-[0.7rem] font-semibold text-white/70">NEXUS DEBIT</span>
        <span className="mt-[9%] block h-[18%] w-[15%] rounded-md bg-[linear-gradient(135deg,#f3dc8a,#c9a443)]" />
        <span className="tabular mt-[8%] block text-[clamp(0.8rem,1.8vw,1.2rem)] font-semibold tracking-[0.12em]">•••• •••• •••• 7730</span>
      </div>
    </div>
  );
}
