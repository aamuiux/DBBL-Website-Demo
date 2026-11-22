"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { BD_DOTS, BD_PATH, BD_VIEWBOX } from "@/lib/bangladeshMap";
import { Button, easeOut, useReduce } from "./ui";

// Unsplash photography (free licence), chosen as stand-ins for DBBL's own lifestyle shoots.
// Every slide has a prominent colour field. Photo slides sit under an indigo wash; the Rocket slide is a magenta
// field with a screenshot of the real Rocket app in a phone frame.
type Slide = { tint: "indigo" | "rocket"; src: string; alt: string; position: string; cta: string; cta2: string };
const slides: Slide[] = [
  {
    tint: "rocket",
    src: "/rocket-app.webp",
    alt: "The Rocket mobile banking app home screen",
    position: "50% 50%",
    cta: links.rocketPlay,
    cta2: links.rocketCharges,
  },
  {
    tint: "indigo",
    src: "https://images.unsplash.com/photo-1667655861998-46fe4c29a4cf",
    alt: "A young man in Dhaka holding his phone and smiling",
    position: "62% 30%",
    cta: links.udyogForm,
    cta2: "#offers",
  },
  {
    tint: "indigo",
    src: "https://images.unsplash.com/photo-1772215228995-85b163d768ed",
    alt: "A young woman smiling in front of a bright pink door",
    position: "60% 35%",
    cta: links.nexusPay,
    cta2: "#app",
  },
  {
    tint: "indigo",
    src: "https://images.unsplash.com/photo-1780345493576-ed325a2dd2d6",
    alt: "An elevated highway interchange crossing green Dhaka at dawn",
    position: "50% 60%",
    cta: links.atmLocator,
    cta2: links.personalAccounts,
  },
];

const DURATION = 7000;

export function Hero() {
  const { d } = useLang();
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
            {slide.tint === "rocket" ? (
              <div className="absolute inset-0 bg-rocket">
                {/* depth: a soft light behind the phone, deeper magenta toward the text */}
                <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgb(255_255_255/0.22),transparent_55%),linear-gradient(90deg,rgb(109_31_114/0.8),transparent_60%)]" />
              </div>
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                quality={80}
                preload={index === 0}
                className="object-cover"
                style={{ objectPosition: slide.position }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {/* Colour wash + legibility: brand colour from the left and the bottom, tinted, never grey */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(9_11_58/0.86)_0%,rgb(9_11_58/0.55)_42%,rgb(9_11_58/0.05)_75%),linear-gradient(0deg,rgb(9_11_58/0.9)_0%,rgb(9_11_58/0)_45%),linear-gradient(180deg,rgb(9_11_58/0.55)_0%,rgb(9_11_58/0)_22%)] transition-opacity duration-1000 ${
          slide.tint === "rocket" ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(109_31_114/0.92)_0%,rgb(138_40_143/0.7)_42%,rgb(138_40_143/0.2)_78%),linear-gradient(0deg,rgb(29_10_32/0.85)_0%,rgb(29_10_32/0)_45%),linear-gradient(180deg,rgb(29_10_32/0.5)_0%,rgb(29_10_32/0)_22%)] transition-opacity duration-1000 ${
          slide.tint === "rocket" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* All of Bangladesh behind the Rocket slide, above the colour wash so the ATM points stay bright */}
      <AnimatePresence>{slide.tint === "rocket" && <BangladeshMap key="bd-map" reduce={!!reduce} />}</AnimatePresence>

      {/* The real Rocket app, in a phone (large screens) */}
      <AnimatePresence>{slide.tint === "rocket" && <RocketPhone key="rocket-phone" src={slide.src} alt={slide.alt} reduce={!!reduce} />}</AnimatePresence>

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
              <h1 className="font-display text-balance text-[clamp(2.9rem,7.2vw,6rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
                <motion.span variants={lineVariants(reduce)} className="block">
                  {copy.title}
                </motion.span>
              </h1>
              <motion.p
                variants={lineVariants(reduce)}
                className={`mt-6 max-w-[34rem] text-pretty text-lg sm:text-xl ${slide.tint === "rocket" ? "text-white/90" : "text-indigo-100"}`}
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

/** All of Bangladesh behind the Rocket slide: a dotted country with points pulsing everywhere, because Rocket is used in every corner. */
function BangladeshMap({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="pointer-events-none absolute inset-y-0 right-[-18%] flex items-center pb-24 pt-[calc(var(--header-h)+1rem)] sm:right-[-8%] lg:right-[20%]">
      <svg viewBox={BD_VIEWBOX} className="h-full w-auto overflow-visible">
        <defs>
          <pattern id="bd-dots" width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="4.5" cy="4.5" r="1.7" fill="white" fillOpacity="0.5" />
          </pattern>
          <filter id="bd-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path d={BD_PATH} fill="white" fillOpacity="0.18" filter="url(#bd-glow)" />
        <path d={BD_PATH} fill="url(#bd-dots)" />
        <path d={BD_PATH} fill="white" fillOpacity="0.07" stroke="white" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round" />
        {BD_DOTS.map(([x, y], i) => {
          const delay = `${((i * 0.61) % 3.6).toFixed(2)}s`;
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              {!reduce && (
                <circle r="4" fill="none" stroke="#c8f169" strokeWidth="1.5">
                  <animate attributeName="r" values="3;16" dur="3.6s" begin={delay} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="3.6s" begin={delay} repeatCount="indefinite" />
                </circle>
              )}
              <circle r="3.2" fill="#c8f169" />
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}

function RocketPhone({ src, alt, reduce }: { src: string; alt: string; reduce: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 hidden lg:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="relative mx-auto h-full max-w-[1360px]">
        <motion.div
          initial={reduce ? false : { y: 120, rotate: 6, opacity: 0 }}
          animate={{ y: 0, rotate: -6, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
          className="absolute right-[5%] top-[46%] aspect-[738/1600] h-[min(34rem,60vh)] -translate-y-1/2"
        >
          <div className="size-full rounded-[2.6rem] bg-rocket-ink p-[0.6rem] shadow-[0_50px_90px_-30px_rgb(20_0_25/0.8)] ring-1 ring-white/15">
            <div className="relative size-full overflow-hidden rounded-[2.1rem]">
              <Image src={src} alt={alt} fill sizes="320px" quality={85} preload className="object-cover object-top" />
            </div>
          </div>
        </motion.div>
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
