"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Button, easeOut, useReduce } from "./ui";

// Unsplash photography (free licence), chosen as stand-ins for DBBL's own lifestyle shoots.
// The Rocket slide is a campaign banner: brand field, big type and an authored phone instead of a photo.
type Slide = { kind: "photo" | "rocket"; src: string; alt: string; position: string; cta: string; cta2: string };
const slides: Slide[] = [
  {
    kind: "rocket",
    // A young man photographed in Bangladesh (Unsplash, @priogaming), shown inside the banner's circle
    src: "https://images.unsplash.com/photo-1625012612550-622fe6a78a05",
    alt: "",
    position: "50% 22%",
    cta: links.rocketPlay,
    cta2: links.rocketCharges,
  },
  {
    kind: "photo",
    src: "https://images.unsplash.com/photo-1667655861998-46fe4c29a4cf",
    alt: "A young man in Dhaka holding his phone and smiling",
    position: "62% 30%",
    cta: links.udyogForm,
    cta2: "#offers",
  },
  {
    kind: "photo",
    src: "https://images.unsplash.com/photo-1772215228995-85b163d768ed",
    alt: "A young woman smiling in front of a bright pink door",
    position: "60% 35%",
    cta: links.nexusPay,
    cta2: "#app",
  },
  {
    kind: "photo",
    src: "https://images.unsplash.com/photo-1780345493576-ed325a2dd2d6",
    alt: "An elevated highway interchange crossing green Dhaka at dawn",
    position: "50% 60%",
    cta: links.atmLocator,
    cta2: links.personalAccounts,
  },
];

const DURATION = 7000;

export function Hero() {
  const { d, lang } = useLang();
  const bn = lang === "bn";
  const reduce = useReduce();
  const [index, setIndex] = useState(0);
  // Autoplay by default; off for reduced motion until the visitor presses play.
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reduce;
  const setPlaying = (fn: (p: boolean) => boolean) => setChoice(fn(playing));
  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number>(0);
  const elapsedBeforePause = useRef(0);

  const go = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length);
    elapsedBeforePause.current = 0;
    setProgress(0);
  }, []);

  // Timer that survives pause/resume (hover, focus, or the pause button)
  const running = playing && !hovering;
  useEffect(() => {
    if (!running) {
      if (raf.current) cancelAnimationFrame(raf.current);
      return;
    }
    start.current = performance.now() - elapsedBeforePause.current;
    const loop = (now: number) => {
      const elapsed = now - start.current;
      elapsedBeforePause.current = elapsed;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);
      if (p >= 1) {
        go(index + 1);
        return;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [running, index, go]);

  // Pointer parallax on the photograph (desktop only, off for reduced motion)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tx = useTransform(sx, (v) => v * -14);
  const ty = useTransform(sy, (v) => v * -10);

  const slide = slides[index];
  const copy = d.hero.slides[index];

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-indigo-950 text-white"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      {/* Photographs */}
      <motion.div className="absolute inset-[-24px] -z-10" style={{ x: tx, y: ty }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1, ease: "easeInOut" }, scale: { duration: 8, ease: "linear" } }}
          >
            {slide.kind === "rocket" ? (
              <div className="absolute inset-0 bg-rocket">
                {/* depth: deeper magenta at the edges, a soft light behind the art */}
                <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_50%,rgb(255_255_255/0.16),transparent_55%),linear-gradient(90deg,rgb(109_31_114/0.75),transparent_55%)]" />
              </div>
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                quality={80}
                preload={index === 1}
                className="object-cover"
                style={{ objectPosition: slide.position }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {/* Legibility for photo slides: indigo from the left and the bottom, tinted, never grey */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(9_11_58/0.86)_0%,rgb(9_11_58/0.55)_42%,rgb(9_11_58/0.05)_75%),linear-gradient(0deg,rgb(9_11_58/0.9)_0%,rgb(9_11_58/0)_45%),linear-gradient(180deg,rgb(9_11_58/0.55)_0%,rgb(9_11_58/0)_22%)] transition-opacity duration-1000 ${
          slide.kind === "rocket" ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* The Rocket banner's artwork (large screens) */}
      <AnimatePresence>{slide.kind === "rocket" && <RocketArt key="rocket-art" src={slide.src} position={slide.position} reduce={!!reduce} />}</AnimatePresence>

      <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col justify-end px-5 pb-36 pt-[calc(var(--header-h)+4rem)] sm:px-6 sm:pb-40 xl:px-10">
        <div className="max-w-[44rem]" aria-live={playing ? "off" : "polite"}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
                exit: { transition: { staggerChildren: 0.03 } },
              }}
            >
              {slide.kind === "rocket" ? (
                <h1 className="max-w-[36rem]">
                  <span className="sr-only">{copy.title}</span>
                  <span aria-hidden className="block">
                    <motion.span variants={lineVariants(reduce)} className="flex items-center gap-3">
                      <span className="relative size-12 overflow-hidden rounded-[14px] ring-2 ring-white/30">
                        <Image src={links.rocketLogo} alt="" fill sizes="48px" quality={80} className="object-cover" />
                      </span>
                      <span className="font-display text-2xl font-bold tracking-[-0.02em]">Rocket</span>
                    </motion.span>
                    <motion.span variants={lineVariants(reduce)} className="font-display mt-6 block text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-none tracking-[-0.02em] text-sun">
                      {bn ? "বাংলাদেশে সবচেয়ে কম" : "Bangladesh's lowest"}
                    </motion.span>
                    <motion.span
                      variants={lineVariants(reduce)}
                      className={`font-display block font-extrabold uppercase leading-[0.82] ${
                        bn ? "mt-3 whitespace-nowrap text-[clamp(2.8rem,7vw,5.75rem)] tracking-[-0.02em]" : "mt-2 text-[clamp(4.4rem,12vw,10rem)] tracking-[-0.045em]"
                      }`}
                      style={bn ? undefined : { fontStretch: "75%" }}
                    >
                      {bn ? "ক্যাশ আউট" : "Cash out"}
                    </motion.span>
                    <motion.span variants={lineVariants(reduce)} className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-none tracking-[-0.02em]">
                        {bn ? "চার্জ" : "charge"}
                      </span>
                      <span className="tabular rounded-full bg-sun px-4 py-1.5 text-base font-bold text-rocket-ink">
                        {bn ? "যেকোনো ডিবিবিএল এটিএমে ০.৯%" : "0.9% at any DBBL ATM"}
                      </span>
                    </motion.span>
                  </span>
                </h1>
              ) : (
                <h1 className="font-display text-balance text-[clamp(2.9rem,7.2vw,6rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
                  <motion.span variants={lineVariants(reduce)} className="block">
                    {copy.title}
                  </motion.span>
                </h1>
              )}
              <motion.p
                variants={lineVariants(reduce)}
                className={`mt-6 max-w-[34rem] text-pretty text-lg sm:text-xl ${slide.kind === "rocket" ? "text-white/90" : "text-indigo-100"}`}
              >
                {copy.body}
              </motion.p>
              <motion.div variants={lineVariants(reduce)} className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={slide.cta} tone="lime" size="lg">
                  {copy.cta}
                </Button>
                <Button href={slide.cta2} tone="ghost-dark" size="lg">
                  {copy.cta2}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden md:block">
        <div className="mx-auto flex max-w-[1360px] items-end justify-end gap-3 px-6 pb-28 xl:px-10">
          <ul className="flex items-stretch gap-2" role="tablist" aria-label="Choose slide">
            {d.hero.slides.map((s, i) => (
              <li key={s.tag} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${d.hero.slide} ${i + 1}: ${s.tag}`}
                  onClick={() => go(i)}
                  className="group flex w-40 flex-col gap-2.5 rounded-xl px-2 py-2 text-left text-[0.8125rem] font-semibold text-white/70 transition-colors hover:text-white aria-selected:text-white"
                >
                  <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/25">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-lime"
                      style={{ width: i === index ? `${(reduce || !playing ? 1 : progress) * 100}%` : i < index ? "100%" : "0%", opacity: i < index ? 0.5 : 1 }}
                    />
                  </span>
                  <span className="truncate">{s.tag}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? d.hero.pause : d.hero.play}
            className="mb-1 grid size-11 place-items-center rounded-full bg-white/12 text-white ring-1 ring-inset ring-white/30 backdrop-blur-md hover:bg-white/20"
          >
            {playing ? <Pause className="size-4" fill="currentColor" aria-hidden /> : <Play className="size-4" fill="currentColor" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile dots */}
      <div className="absolute inset-x-0 bottom-24 flex justify-start gap-2 px-5 md:hidden" role="tablist" aria-label="Choose slide">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${d.hero.slide} ${i + 1}`}
            onClick={() => go(i)}
            className="grid h-11 place-items-center"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-lime" : "w-1.5 bg-white/50"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}

/**
 * Rocket campaign art: a portrait in a big circle, overlapped by a tilted Rocket phone that shows an ATM
 * cash-out receipt with DBBL's published 0.9% charge (৳9 on ৳1,000), and a few ৳ coins in the air.
 */
function RocketArt({ src, position, reduce }: { src: string; position: string; reduce: boolean }) {
  const { lang } = useLang();
  const bn = lang === "bn";
  const coins = [
    { x: "4%", y: "18%", s: "3.5rem", d: 0 },
    { x: "62%", y: "8%", s: "2.6rem", d: 0.6 },
    { x: "88%", y: "64%", s: "3rem", d: 1.1 },
  ];
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="relative mx-auto h-full max-w-[1360px]">
        <div className="absolute right-[4%] top-1/2 h-[min(36rem,62vh)] w-[min(36rem,62vh)] -translate-y-[54%]">
          {/* Portrait in a ringed circle */}
          <motion.div
            initial={reduce ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
            className="absolute inset-[8%] overflow-hidden rounded-full bg-rocket-700 ring-[1.1rem] ring-white/10"
          >
            <Image src={`${src}?w=1000&q=80&auto=format`} alt="" fill sizes="36rem" quality={80} className="object-cover" style={{ objectPosition: position }} />
            <span className="absolute inset-0 bg-[linear-gradient(200deg,transparent_45%,rgb(109_31_114/0.6))]" />
          </motion.div>

          {/* ৳ coins */}
          {coins.map((c, i) => (
            <motion.span
              key={i}
              className="font-display absolute grid place-items-center rounded-full bg-sun text-[1.4rem] font-bold text-rocket-ink shadow-[0_14px_30px_-12px_rgb(29_10_32/0.6)] ring-4 ring-[#f2b705]/50"
              style={{ left: c.x, top: c.y, width: c.s, height: c.s }}
              initial={reduce ? false : { scale: 0, rotate: -40 }}
              animate={reduce ? { scale: 1 } : { scale: 1, rotate: 0, y: [0, -12, 0] }}
              transition={{
                scale: { type: "spring", stiffness: 260, damping: 14, delay: 0.6 + c.d * 0.3 },
                rotate: { type: "spring", stiffness: 200, damping: 14, delay: 0.6 + c.d * 0.3 },
                y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: c.d },
              }}
            >
              ৳
            </motion.span>
          ))}

          {/* The Rocket phone with the receipt */}
          <motion.div
            initial={reduce ? false : { y: 140, rotate: 6, opacity: 0 }}
            animate={{ y: 0, rotate: -9, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.35 }}
            className="@container absolute -left-[12%] top-[8%] w-[37%]"
          >
            <div className="rounded-[15cqw] bg-rocket-ink p-[3.5cqw] shadow-[0_40px_80px_-24px_rgb(20_0_25/0.75)] ring-1 ring-white/10">
              <div className="relative aspect-[9/18.5] overflow-hidden rounded-[12cqw] bg-paper px-[7cqw] pt-[14cqw] text-rocket-ink">
                <span className="absolute left-1/2 top-[3.5cqw] h-[5cqw] w-[24cqw] -translate-x-1/2 rounded-full bg-rocket-ink" />
                <div className="flex items-center gap-[3cqw]">
                  <span className="relative size-[12cqw] overflow-hidden rounded-[3.5cqw]">
                    <Image src={links.rocketLogo} alt="" fill sizes="40px" quality={70} className="object-cover" />
                  </span>
                  <span className="font-display text-[7cqw] font-bold">Rocket</span>
                </div>
                <div className="mt-[10cqw] flex flex-col items-center text-center">
                  <motion.span
                    initial={reduce ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14, delay: 1.1 }}
                    className="grid size-[18cqw] place-items-center rounded-full bg-green-600 text-white"
                  >
                    <svg viewBox="0 0 24 24" className="size-[10cqw]" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </motion.span>
                  <span className="mt-[4cqw] text-[5.4cqw] font-semibold text-rocket-ink/70">{bn ? "ক্যাশ আউট সফল" : "Cash out successful"}</span>
                  <span className="font-display tabular mt-[1cqw] text-[15cqw] font-bold leading-none tracking-[-0.03em]">{bn ? "৳১,০০০" : "৳1,000"}</span>
                </div>
                <dl className="mt-[8cqw] space-y-[2.5cqw] text-[5cqw]">
                  <div className="flex justify-between rounded-[3cqw] bg-white px-[4cqw] py-[3cqw]">
                    <dt className="text-rocket-ink/65">{bn ? "যেখানে" : "Where"}</dt>
                    <dd className="font-semibold">{bn ? "ডিবিবিএল এটিএম" : "DBBL ATM"}</dd>
                  </div>
                  <div className="flex justify-between rounded-[3cqw] bg-sun px-[4cqw] py-[3cqw]">
                    <dt className="font-semibold">{bn ? "চার্জ (০.৯%)" : "Charge (0.9%)"}</dt>
                    <dd className="tabular font-bold">{bn ? "৳৯.০০" : "৳9.00"}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function lineVariants(reduce: boolean | null) {
  return {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: easeOut } },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.3, ease: "easeIn" as const } },
  };
}
