"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QRCode from "qrcode";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Phone } from "./PhoneScreens";
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
  const sectionRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

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
          end: () => `+=${window.innerHeight * 3.4}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Second half of the scroll walks the four NexusPay jobs.
            const p = self.progress;
            setStep(p < 0.5 ? 0 : Math.min(3, Math.floor(((p - 0.5) / 0.5) * 4)));
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
        // Phase 2 (1 → 2): hold while the steps play (driven by onUpdate)
        .to({}, { duration: 1 });

      stRef.current = tl.scrollTrigger ?? null;
    }, el);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [pinned]);

  const choose = (i: number) => {
    const st = stRef.current;
    if (st) {
      const y = st.start + (st.end - st.start) * (0.5 + ((i + 0.5) / 4) * 0.5);
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
                    active ? "bg-lime text-indigo-950" : "bg-white/12 text-white"
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
      <section id="app" ref={sectionRef} aria-labelledby={`${id}-h`} className="on-dark relative h-[100svh] overflow-hidden bg-paper">
        {/* The card: clip-path grows it from an inset rounded panel to full bleed */}
        <div data-card className="absolute inset-0 overflow-hidden bg-indigo-700 will-change-[clip-path]">
          <div
            data-glow
            aria-hidden
            className="absolute left-1/2 top-[38%] size-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(58_64_168/0.9),rgb(30_35_120/0)_62%)] opacity-70"
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
        <div className="pointer-events-none absolute inset-x-0 top-[13%] z-10 flex flex-col items-center px-6 text-center text-ink">
          <h2 data-intro id={`${id}-h`} className="font-display max-w-[24ch] text-balance text-[clamp(2.4rem,3.9vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
            {d.app.intro}
          </h2>
          <div data-intro className="pointer-events-auto mt-7 flex gap-3">
            <StoreBadges light />
          </div>
        </div>

        {/* End layout: phone slot left, copy right */}
        <div className="pointer-events-none relative z-20 mx-auto grid h-full max-w-[1360px] grid-cols-[1fr_1.05fr] items-center gap-12 px-6 xl:px-10">
          <div className="flex justify-center">
            <div data-phone className="will-change-transform">
              {/* phone is decorative to the pointer; its content is mirrored by the step list */}
              <div className="origin-center scale-[1.12] [@media(max-height:760px)]:scale-100">
                <Phone step={step} />
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
            <div data-copy className="mt-7 flex items-center gap-5">
              <div className="size-[4.5rem] shrink-0 rounded-lg bg-white p-1.5" aria-hidden dangerouslySetInnerHTML={{ __html: qr }} />
              <div>
                <p className="text-sm font-semibold">{d.app.scan}</p>
                <p className="mt-0.5 text-xs text-indigo-300">{d.app.illustrative}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ───────────── Static end state (touch, narrow, reduced motion, first paint) ───────────── */
  return (
    <section id="app" ref={sectionRef} aria-labelledby={`${id}-h`} className="on-dark relative overflow-hidden bg-indigo-700 text-white">
      <div aria-hidden className="absolute left-1/2 top-0 size-[48rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgb(58_64_168/0.9),rgb(30_35_120/0)_62%)]" />
      <NetworkCorners />
      <div className="relative mx-auto max-w-[1360px] px-5 py-20 sm:px-6 md:py-28">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <h2 id={`${id}-h`} className="font-display max-w-[18ch] text-balance text-[clamp(2.1rem,6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
              {d.app.intro}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-7 flex flex-wrap justify-center gap-3">
            <StoreBadges outline />
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
          <div className="mx-auto">
            <Phone step={step} />
            <p className="mt-4 text-center text-xs text-indigo-300">{d.app.illustrative}</p>
          </div>
          <div>
            <h3 className="font-display text-balance text-[clamp(1.8rem,4.5vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.025em]">{d.app.title}</h3>
            <p className="mt-4 max-w-[46ch] text-pretty text-lg text-indigo-100">{d.app.lede}</p>
            <div className="mt-7">{steps}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Corner motif: DBBL's ATM network as nodes and links, kept faint so it reads as texture. */
function NetworkCorners() {
  const nodes = [
    [40, 60], [120, 30], [200, 90], [90, 150], [260, 40], [170, 190], [300, 140], [30, 230],
  ];
  const linksIdx = [[0, 1], [1, 2], [0, 3], [2, 3], [1, 4], [2, 4], [3, 5], [2, 6], [4, 6], [5, 6], [3, 7], [5, 7]];
  const art = (
    <svg viewBox="0 0 340 260" className="h-full w-full" aria-hidden>
      {linksIdx.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgb(255 255 255 / 0.1)" strokeWidth="1.2" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 ? 5 : 3.2} style={{ fill: i === 2 ? "var(--color-lime)" : "rgb(255 255 255 / 0.28)" }} />
      ))}
    </svg>
  );
  return (
    <>
      <div className="pointer-events-none absolute right-0 top-0 h-[34%] w-[34%] max-w-[30rem]">{art}</div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-[34%] w-[34%] max-w-[30rem] rotate-180">{art}</div>
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
