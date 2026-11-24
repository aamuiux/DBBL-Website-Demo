"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QRCode from "qrcode";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Phone } from "./PhoneScreens";
import { NexusPillarCols } from "./NexusPillars";
import { Reveal, useReduce } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const MQ = "(min-width: 1024px) and (min-height: 640px) and (pointer: fine)";
function subscribeMq(cb: () => void) {
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Signature moment, choreographed like City Bank's Citytouch reveal:
 *  1. An inset, rounded indigo card carries a centred headline and store buttons; a large phone rises
 *     from the card's lower half and spills past its edge.
 *  2. Scrolling (pinned) lifts the headline away, grows the card to full bleed while its corners square
 *     off, and the phone shrinks into the left column as the copy arrives on the right.
 *  3. Still pinned, the phone walks through four NexusPay jobs, then the page releases.
 * On touch screens, narrow viewports and with reduced motion the end state renders statically.
 */
export function AppStory() {
  const { d } = useLang();
  const reduce = useReduce();
  const id = useId();
  const [step, setStep] = useState(0);
  const [qr, setQr] = useState("");
  const brand = usePathname()?.startsWith("/new-design") ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  // Where in the scroll (0 to 1) the four steps play; /new-design shortens it to make room for the pillars reveal
  const spanRef = useRef<[number, number]>([0.5, 1]);

  useEffect(() => {
    QRCode.toString(links.nexusPayPlay, { type: "svg", margin: 0, color: { dark: "#0e1150", light: "#ffffff" } }).then(setQr);
  }, []);

  // The pinned choreography applies on large, fine-pointer screens only (server renders the static layout).
  const wide = useSyncExternalStore(subscribeMq, () => window.matchMedia(MQ).matches, () => false);
  const pinned = wide && !reduce;

  useIsoLayoutEffect(() => {
    const el = sectionRef.current;
    if (!pinned || !el) return;
    const q = gsap.utils.selector(el);
    const card = q("[data-card]")[0];
    const intro = q("[data-intro]");
    const phone = q("[data-phone]")[0];
    const copy = q("[data-copy]");
    const glow = q("[data-glow]");

    // Phone's intro position, measured from its untransformed slot (the parent box): centred horizontally,
    // top at half the stage height, so at 1.3x it rises from the card's lower half and spills past the edge.
    const slot = phone.parentElement!;
    const toCentreX = () => {
      const r = slot.getBoundingClientRect();
      const s = el.getBoundingClientRect();
      return s.left + s.width / 2 - (r.left + r.width / 2);
    };
    const toLowerY = () => {
      const r = slot.getBoundingClientRect();
      const s = el.getBoundingClientRect();
      return s.top + s.height * 0.5 - (r.top + (r.height - phone.offsetHeight) / 2);
    };

    const ctx = gsap.context(() => {
      gsap.set(phone, { transformOrigin: "50% 0%" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * (brand ? 6.2 : 3.4)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Second half of the scroll walks the four NexusPay jobs.
            const p = self.progress;
            const [a, b] = spanRef.current;
            setStep(p < a ? 0 : Math.min(3, Math.floor(((p - a) / (b - a)) * 4)));
          },
        },
      });

      // Phase 1 (0 → 1): the reveal
      tl.fromTo(intro, { y: 0, autoAlpha: 1 }, { y: -100, autoAlpha: 0, duration: 0.45, ease: "power1.in" }, 0)
        // Indigo spreads from behind the phone like a signal leaving the device, until it owns the screen.
        .fromTo(card, { clipPath: "circle(31% at 50% 78%)" }, { clipPath: "circle(125% at 50% 78%)", duration: 1, ease: "power2.inOut" }, 0)
        .fromTo(q("[data-ring]"), { scale: 0.6, autoAlpha: 0.8 }, { scale: 3.2, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power1.out" }, 0)
        .to(glow, { scale: 1.35, opacity: 0.9, duration: 1 }, 0)
        .fromTo(phone, { x: toCentreX, y: toLowerY, scale: 1.3 }, { x: 0, y: 0, scale: 1, duration: 1, ease: "power2.inOut" }, 0.05)
        .fromTo(copy, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }, 0.55)
        // Phase 2: hold while the steps play (driven by onUpdate)
        .to({}, { duration: 1 });

      if (brand) {
        // Phase 3 (/new-design): the steps give way and the phone steps aside for three columns: security, trust, bills
        const t1 = tl.duration() - 1;
        const t2 = tl.duration();
        const pillars = q("[data-pillars]")[0];
        tl.to(copy, { autoAlpha: 0, y: -30, duration: 0.4, stagger: 0.04, ease: "power2.in" }, t2)
          .to(phone, { x: () => -Math.min(60, window.innerWidth * 0.035), scale: 0.82, duration: 0.8, ease: "power2.inOut" }, t2 + 0.1)
          .fromTo(pillars, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, t2 + 0.35)
          .fromTo(q("[data-pillar-head]"), { y: 30 }, { y: 0, duration: 0.5, ease: "power2.out" }, t2 + 0.35)
          .fromTo(q("[data-pillar]"), { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.12, ease: "power2.out" }, t2 + 0.5)
          .to({}, { duration: 0.6 });
        const total = tl.duration();
        spanRef.current = [t1 / total, t2 / total];
      } else spanRef.current = [0.5, 1];

      stRef.current = tl.scrollTrigger ?? null;
    }, el);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [pinned, brand]);

  const choose = (i: number) => {
    const st = stRef.current;
    if (st) {
      const [a, b] = spanRef.current;
      const y = st.start + (st.end - st.start) * (a + ((i + 0.5) / 4) * (b - a));
      const lenis = (window as unknown as { __lenis?: { scrollTo(y: number, o?: object): void } }).__lenis;
      if (lenis) lenis.scrollTo(y, { duration: 1.1 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    } else setStep(i);
  };

  const steps = (
    <ol className="space-y-1.5" aria-label="NexusPay features">
      {d.app.steps.map((s, i) => {
        const active = i === step;
        return (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => choose(i)}
              aria-current={active ? "step" : undefined}
              className={`w-full rounded-2xl px-4 py-3 text-left transition-[background-color,opacity] duration-500 ${
                active ? "bg-white/10 opacity-100" : "opacity-60 hover:opacity-90"
              }`}
            >
              <span className="flex items-start gap-3.5">
                <span
                  className={`tabular mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors duration-500 ${
                    active ? "step-num-active bg-lime text-indigo-950" : "bg-white/12 text-white"
                  }`}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="font-display block text-lg font-semibold tracking-[-0.015em]">{s.title}</span>
                  <span className="mt-0.5 block text-[0.95rem] text-indigo-200">{s.body}</span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  /* ───────────── Pinned, choreographed layout (desktop, fine pointer) ───────────── */
  if (pinned) {
    return (
      <section id="app" ref={sectionRef} aria-labelledby={`${id}-h`} className={`on-dark relative h-[100svh] overflow-hidden bg-paper ${brand ? "nexus-red" : ""}`}>
        {/* The card: clip-path grows it from an inset rounded panel to full bleed */}
        <div data-card className="absolute inset-0 overflow-hidden bg-indigo-700 will-change-[clip-path]">
          <div
            data-glow
            aria-hidden
            className={`absolute left-1/2 top-[38%] size-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full ${brand ? "bg-[radial-gradient(circle,rgb(255_96_104/0.85),rgb(237_27_36/0)_62%)]" : "bg-[radial-gradient(circle,rgb(58_64_168/0.9),rgb(30_35_120/0)_62%)]"} opacity-70`}
          />
          <NetworkCorners />
        </div>

        {/* Signal rings around the phone, ahead of the spreading colour */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[78%] z-0">
          {[0, 1, 2].map((i) => (
            <span key={i} data-ring className="absolute left-0 top-0 size-[34vh] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-400/60" />
          ))}
        </div>

        {/* Intro: headline in ink on the light page, store buttons below */}
        <div className={`pointer-events-none absolute inset-x-0 z-10 flex flex-col items-center px-6 text-center text-ink ${brand ? "top-[11.5%]" : "top-[13%]"}`}>
          {brand && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img data-intro src="/nexuspay/logo.webp" alt="NexusPay, মানেই সবকিছু" width={2000} height={621} className="mb-3 h-[clamp(2.75rem,6vh,4.25rem)] w-auto" />
          )}
          <h2 data-intro id={`${id}-h`} className="font-display max-w-[24ch] text-balance text-[clamp(2.4rem,3.9vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
            {d.app.intro}
          </h2>
          <div data-intro className="pointer-events-auto mt-7 flex gap-3">
            <StoreBadges light small />
          </div>
        </div>

        {/* End layout: phone slot left, copy right */}
        <div className="pointer-events-none relative z-20 mx-auto grid h-full max-w-[1360px] grid-cols-[1fr_1.05fr] items-center gap-12 px-6 xl:px-10">
          <div className="flex justify-center">
            <div data-phone className="will-change-transform">
              {/* phone is decorative to the pointer; its content is mirrored by the step list */}
              <div className="origin-center scale-[1.12] [@media(max-height:760px)]:scale-100">
                {brand ? <NexusShot step={step} /> : <Phone step={step} />}
              </div>
            </div>
          </div>

          <div className="pointer-events-auto text-white">
            <h3 data-copy className="font-display text-balance text-[clamp(2.1rem,3.4vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
              {d.app.title}
            </h3>
            <p data-copy className="mt-4 max-w-[46ch] text-pretty text-lg text-indigo-100">
              {d.app.lede}
            </p>
            <div data-copy className="mt-7">
              {steps}
            </div>
            {brand ? (
              /* /new-design: the store badges in place of the QR code */
              <div data-copy className="mt-7 flex flex-wrap items-center gap-3">
                <StoreBadges small />
              </div>
            ) : (
              <div data-copy className="mt-7 flex items-center gap-5">
                <div className="size-[4.5rem] shrink-0 rounded-lg bg-white p-1.5" aria-hidden dangerouslySetInnerHTML={{ __html: qr }} />
                <div>
                  <p className="text-sm font-semibold">{d.app.scan}</p>
                  <p className="mt-0.5 text-xs text-indigo-300">{d.app.illustrative}</p>
                </div>
              </div>
            )}
          </div>

          {/* /new-design: revealed after the four steps, to the right of the (smaller) phone */}
          <div className="pointer-events-auto absolute right-6 top-1/2 w-[57%] -translate-y-1/2 xl:right-10">
            <NexusPillarCols pinned />
          </div>
        </div>
      </section>
    );
  }

  /* ───────────── Static end state (touch, narrow, reduced motion, first paint) ───────────── */
  return (
    <section id="app" ref={sectionRef} aria-labelledby={`${id}-h`} className={`on-dark relative overflow-hidden bg-indigo-700 text-white ${brand ? "nexus-red" : ""}`}>
      <div aria-hidden className={`absolute left-1/2 top-0 size-[48rem] -translate-x-1/2 -translate-y-1/3 rounded-full ${brand ? "bg-[radial-gradient(circle,rgb(255_96_104/0.85),rgb(237_27_36/0)_62%)]" : "bg-[radial-gradient(circle,rgb(58_64_168/0.9),rgb(30_35_120/0)_62%)]"}`} />
      <NetworkCorners />
      <div className="relative mx-auto max-w-[1360px] px-5 py-20 sm:px-6 md:py-28">
        <div className="flex flex-col items-center text-center">
          {brand && (
            <Reveal>
              {/* The red wordmark, turned white for the red page */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nexuspay/logo.webp" alt="NexusPay, মানেই সবকিছু" width={2000} height={621} className="mb-6 h-16 w-auto brightness-0 invert" />
            </Reveal>
          )}
          <Reveal>
            <h2 id={`${id}-h`} className="font-display max-w-[18ch] text-balance text-[clamp(2.1rem,6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
              {d.app.intro}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-7 flex flex-wrap justify-center gap-3">
            <StoreBadges outline small />
          </Reveal>
        </div>

        {brand && (
          /* /new-design, phones: step buttons directly above the phone, the chosen step's text below it */
          <div className="mt-12 md:hidden">
            <h3 className="font-display text-balance text-[clamp(1.8rem,7vw,2.4rem)] font-semibold leading-[1.06] tracking-[-0.025em]">{d.app.title}</h3>
            <p className="mt-3 text-pretty text-base text-indigo-100">{d.app.lede}</p>
            <div role="tablist" aria-label="NexusPay features" className="mt-6 grid grid-cols-2 gap-2">
              {d.app.steps.map((st, i) => {
                const active = i === step;
                return (
                  <button
                    key={st.title}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setStep(i)}
                    className={`flex items-center gap-2.5 rounded-2xl px-3 py-3 text-left text-sm font-semibold leading-tight transition-colors duration-300 ${active ? "bg-white text-indigo-950" : "bg-white/10 text-white"}`}
                  >
                    <span className={`tabular grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "step-num-active bg-lime text-indigo-950" : "bg-white/15 text-white"}`}>{i + 1}</span>
                    {st.title}
                  </button>
                );
              })}
            </div>
            <div className="mt-8">
              {brand ? <NexusShot step={step} /> : <Phone step={step} />}
              <p className="mt-4 text-center text-xs text-indigo-300">{d.app.illustrative}</p>
            </div>
            <div className="mt-6 min-h-[9.5rem] rounded-2xl bg-white/10 p-5">
              <p className="font-display text-lg font-semibold tracking-[-0.015em]">{d.app.steps[step].title}</p>
              <p className="mt-1.5 text-indigo-100">{d.app.steps[step].body}</p>
            </div>
          </div>
        )}

        <div className={`mt-14 grid items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16 ${brand ? "hidden md:grid" : ""}`}>
          <div className="mx-auto">
            {brand ? <NexusShot step={step} /> : <Phone step={step} />}
            <p className="mt-4 text-center text-xs text-indigo-300">{d.app.illustrative}</p>
          </div>
          <div>
            <h3 className="font-display text-balance text-[clamp(1.8rem,4.5vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.025em]">{d.app.title}</h3>
            <p className="mt-4 max-w-[46ch] text-pretty text-lg text-indigo-100">{d.app.lede}</p>
            <div className="mt-7">{steps}</div>
          </div>
        </div>
        {brand && <NexusPillarCols />}
      </div>
    </section>
  );
}

/* The supplied NexusPay screens, split into the phone and its floating cards (all 560x640 artwork; card boxes are in that space). */
const VBW = 560;
const VBH = 640;
const shots: { alt: string; cards: { src: string; box: [number, number, number, number]; depth: [number, number]; float: string }[] }[] = [
  {
    alt: "NexusPay Fund Transfer screen: sending 2,500 taka to a mobile number with a 0.00 transfer fee",
    cards: [{ src: "card-1-1", box: [336, 394, 240, 142], depth: [16, 10], float: "6s" }],
  },
  {
    alt: "NexusPay Scan & Pay screen: a QR code in the frame, with a Payment Successful note for Karim Store",
    cards: [{ src: "card-2-1", box: [-22, 134, 256, 168], depth: [-16, 8], float: "6.5s" }],
  },
  {
    alt: "NexusPay Cardless Cash Out screen: a six-digit cash out code, and an ATM asking for it",
    cards: [{ src: "card-3-1", box: [-18, 264, 222, 276], depth: [-18, 12], float: "7s" }],
  },
  {
    alt: "NexusPay Virtual Card screen: a one-time card that expires in 10 minutes",
    cards: [
      { src: "card-4-1", box: [-28, 256, 218, 176], depth: [-16, 8], float: "6.2s" },
      { src: "card-4-2", box: [344, 396, 232, 128], depth: [16, -8], float: "7.2s" },
    ],
  },
];

/**
 * /new-design: the supplied NexusPay screens as light SVGs. The phone cross-fades (opacity only, so scrolling stays smooth);
 * the floating cards are separate layers that pop in on each step, drift gently, follow the pointer and lift on hover.
 */
function NexusShot({ step }: { step: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    el.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--px", "0");
    ref.current?.style.setProperty("--py", "0");
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="pointer-events-auto relative mx-auto aspect-[7/8] h-[min(74svh,44rem)] w-auto max-w-[100%] max-md:h-auto max-md:w-[min(30rem,100%)]"
    >
      {shots.map((sh, i) => {
        const on = i === step;
        return (
          <div key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element -- light vector artwork */}
            <img
              src={`/nexuspay/phone-${i + 1}.svg`}
              alt={on ? sh.alt : ""}
              aria-hidden={!on}
              width={640}
              height={720}
              decoding="async"
              draggable={false}
              style={{ left: `${(-40 / VBW) * 100}%`, top: `${(-10 / VBH) * 100}%`, width: `${(640 / VBW) * 100}%`, height: `${(720 / VBH) * 100}%` }}
              className={`absolute max-w-none select-none transition-opacity duration-500 ease-out ${on ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
            {sh.cards.map((c, k) => {
              const [x, y, w, h] = c.box;
              return (
                <div
                  key={c.src}
                  aria-hidden
                  className="nx-depth absolute"
                  style={{
                    left: `${(x / VBW) * 100}%`,
                    top: `${(y / VBH) * 100}%`,
                    width: `${(w / VBW) * 100}%`,
                    height: `${(h / VBH) * 100}%`,
                    ["--dx" as string]: `${c.depth[0]}px`,
                    ["--dy" as string]: `${c.depth[1]}px`,
                  }}
                >
                  <div className={`nx-pop h-full w-full ${on ? "nx-pop-on" : ""}`} style={{ transitionDelay: on ? `${260 + k * 140}ms` : "0ms" }}>
                    <div className="nx-float h-full w-full" style={{ animationDuration: c.float, animationDelay: `${k * -2}s` }}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- light vector artwork */}
                      <img src={`/nexuspay/${c.src}.svg`} alt="" width={w} height={h} decoding="async" draggable={false} className={`nx-card h-full w-full select-none ${on ? "" : "pointer-events-none"}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const netNodes: [number, number][] = [
  [40, 60], [120, 30], [200, 90], [90, 150], [260, 40], [170, 190], [300, 140], [30, 230],
];
const netLinks = [[0, 1], [1, 2], [0, 3], [2, 3], [1, 4], [2, 4], [3, 5], [2, 6], [4, 6], [5, 6], [3, 7], [5, 7]];

/** One copy of the network. When `animate` is on, the big dot hops from node to node along the links. */
function NetworkArt({ animate, delay = 0 }: { animate: boolean; delay?: number }) {
  const dot = useRef<SVGCircleElement>(null);
  const halo = useRef<SVGCircleElement>(null);
  const trail = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!animate) return;
    const MOVE = 1250;
    const REST = 500;
    const neighbours = (n: number) => netLinks.flatMap(([a, b]) => (a === n ? [b] : b === n ? [a] : []));
    let cur = 2;
    let prev = -1;
    let next = -1;
    let start = 0;
    let raf = 0;
    let phase: "rest" | "move" = "rest";
    let phaseStart = performance.now() + delay;

    const pick = () => {
      const all = neighbours(cur);
      const pool = all.filter((n) => n !== prev);
      const from = pool.length ? pool : all;
      return from[Math.floor(Math.random() * from.length)];
    };
    const place = (x: number, y: number) => {
      dot.current?.setAttribute("cx", String(x));
      dot.current?.setAttribute("cy", String(y));
      halo.current?.setAttribute("cx", String(x));
      halo.current?.setAttribute("cy", String(y));
    };
    const tick = (now: number) => {
      if (phase === "rest") {
        if (now - phaseStart >= REST) {
          next = pick();
          start = now;
          phase = "move";
        }
      } else {
        const k = Math.min(1, (now - start) / MOVE);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        const [x0, y0] = netNodes[cur];
        const [x1, y1] = netNodes[next];
        const x = x0 + (x1 - x0) * e;
        const y = y0 + (y1 - y0) * e;
        place(x, y);
        const t = trail.current;
        if (t) {
          t.setAttribute("x1", String(x0));
          t.setAttribute("y1", String(y0));
          t.setAttribute("x2", String(x));
          t.setAttribute("y2", String(y));
          t.setAttribute("stroke-opacity", String(0.7 * (1 - k * k)));
        }
        if (k >= 1) {
          prev = cur;
          cur = next;
          phase = "rest";
          phaseStart = now;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, delay]);

  const [sx, sy] = netNodes[2];
  return (
    <svg viewBox="0 0 340 260" className="h-full w-full" aria-hidden>
      {netLinks.map(([a, b], i) => (
        <line key={i} x1={netNodes[a][0]} y1={netNodes[a][1]} x2={netNodes[b][0]} y2={netNodes[b][1]} stroke="rgb(255 255 255 / 0.1)" strokeWidth="1.2" />
      ))}
      {animate && <line ref={trail} x1={sx} y1={sy} x2={sx} y2={sy} strokeWidth="2" strokeLinecap="round" strokeOpacity="0" style={{ stroke: "var(--color-lime)" }} />}
      {netNodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 && !animate ? 5 : 3.2} style={{ fill: i === 2 && !animate ? "var(--color-lime)" : "rgb(255 255 255 / 0.28)" }} />
      ))}
      {animate && (
        <>
          <circle ref={halo} cx={sx} cy={sy} r="11" style={{ fill: "var(--color-lime)" }} fillOpacity="0.22" />
          <circle ref={dot} cx={sx} cy={sy} r="5" style={{ fill: "var(--color-lime)" }} />
        </>
      )}
    </svg>
  );
}

/** Corner motif: DBBL's ATM network as nodes and links, kept faint so it reads as texture. */
function NetworkCorners() {
  const reduce = useReduce();
  const brand = usePathname()?.startsWith("/new-design") ?? false;
  const animate = brand && !reduce;
  return (
    <>
      <div className="pointer-events-none absolute right-0 top-0 h-[34%] w-[34%] max-w-[30rem]">
        <NetworkArt animate={animate} />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-[34%] w-[34%] max-w-[30rem] rotate-180">
        <NetworkArt animate={animate} delay={900} />
      </div>
    </>
  );
}

export function StoreBadges({
  light = false,
  outline = false,
  small = false,
  play = links.nexusPayPlay,
  appStore = links.nexusPayAppStore,
  app,
}: {
  light?: boolean;
  outline?: boolean;
  /** Official badges at a compact height (/new-design only) */
  small?: boolean;
  play?: string;
  appStore?: string;
  /** App name for screen readers, e.g. "Rocket". */
  app?: string;
}) {
  const brand = usePathname()?.startsWith("/new-design") ?? false;
  const base = `group inline-flex h-14 items-center gap-3 rounded-2xl pl-4 pr-5 transition-colors ${
    outline
      ? "rounded-full text-white ring-1 ring-inset ring-white/70 hover:bg-white hover:text-indigo-950"
      : light
        ? "bg-indigo-950 text-white hover:bg-indigo-800"
        : "bg-white text-indigo-950 hover:bg-indigo-50"
  }`;
  // /new-design: the official store badges, unaltered, at the size the guidelines ask for
  if (brand) {
    return (
      <>
        <a href={play} target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg transition-transform hover:-translate-y-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- official badge SVG */}
          <img src="/badge-google-play.svg" alt={`Get it on Google Play${app ? `: ${app}` : ""}`} className={small ? "h-10 w-auto" : "h-14 w-auto"} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a href={appStore} target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg transition-transform hover:-translate-y-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- official badge SVG */}
          <img src="/badge-app-store.svg" alt={`Download on the App Store${app ? `: ${app}` : ""}`} className={small ? "h-10 w-auto" : "h-14 w-auto"} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </>
    );
  }
  return (
    <>
      <a href={play} target="_blank" rel="noopener noreferrer" className={base}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
          <path d="M3.6 2.3 13.4 12l-9.8 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1Z" fill="#00904a" />
          <path d="m16.8 8.6-3.4 3.4-9.8-9.7c.3-.2.8-.2 1.2 0l12 6.3Z" fill="#3a40a8" />
          <path d="m16.8 15.4-12 6.3c-.4.2-.9.2-1.2 0l9.8-9.7 3.4 3.4Z" fill="#e31b23" />
          <path d="m20.4 13.3-3.6 2.1-3.4-3.4 3.4-3.4 3.6 2.1c.9.6.9 2 0 2.6Z" fill="#c8a500" />
        </svg>
        <span className="leading-tight">
          <span className="block text-[11px] opacity-70">Get it on</span>
          <span className="block font-semibold">Google Play</span>
        </span>
        <span className="sr-only">{app ? ` (${app})` : ""} (opens in a new tab)</span>
      </a>
      <a href={appStore} target="_blank" rel="noopener noreferrer" className={base}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden fill="currentColor">
          <path d="M16.4 12.6c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.8-1-2.8-4.2ZM14 5.2c.7-.8 1.2-2 1-3.2-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.5 2.9-1.3Z" />
        </svg>
        <span className="leading-tight">
          <span className="block text-[11px] opacity-70">Download on the</span>
          <span className="block font-semibold">App Store</span>
        </span>
        <span className="sr-only">{app ? ` (${app})` : ""} (opens in a new tab)</span>
      </a>
    </>
  );
}
