"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Button, easeOut, useReduce } from "./ui";

// Unsplash photography (free licence), chosen as stand-ins for DBBL's own lifestyle shoots.
// Every slide has a prominent colour field. Photo slides sit under an indigo wash; the Rocket slide is a magenta
// field with a screenshot of the real Rocket app in a phone frame; the NexusPay slide is NexusPay red with its
// zigzag line pattern and a NexusPay login screen in a phone frame.
type Slide = { tint: "indigo" | "rocket" | "nexus"; src: string; alt: string; position: string; cta: string; cta2: string };
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
    tint: "nexus",
    src: "",
    alt: "",
    position: "50% 50%",
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
            {slide.tint === "nexus" ? (
              <NexusField />
            ) : slide.tint === "rocket" ? (
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
          slide.tint === "indigo" ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(109_31_114/0.92)_0%,rgb(138_40_143/0.7)_42%,rgb(138_40_143/0.2)_78%),linear-gradient(0deg,rgb(29_10_32/0.85)_0%,rgb(29_10_32/0)_45%),linear-gradient(180deg,rgb(29_10_32/0.5)_0%,rgb(29_10_32/0)_22%)] transition-opacity duration-1000 ${
          slide.tint === "rocket" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* The Rocket logo behind the phone, above the colour wash */}
      <AnimatePresence>{slide.tint === "rocket" && <RocketLogoArt key="rocket-logo" reduce={!!reduce} />}</AnimatePresence>

      {/* The real Rocket app, in a phone (large screens) */}
      <AnimatePresence>{slide.tint === "rocket" && <RocketPhone key="rocket-phone" src={slide.src} alt={slide.alt} reduce={!!reduce} />}</AnimatePresence>
      <AnimatePresence>{slide.tint === "nexus" && <NexusPhone key="nexus-phone" reduce={!!reduce} />}</AnimatePresence>

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
                className={`mt-6 max-w-[34rem] text-pretty text-lg sm:text-xl ${slide.tint === "indigo" ? "text-indigo-100" : "text-white/95"}`}
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

/** The Rocket logo, large and glowing, behind the phone. */
function RocketLogoArt({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="pointer-events-none absolute inset-y-0 right-[-12%] hidden items-center sm:flex lg:right-[22%]"
    >
      <motion.div
        initial={reduce ? false : { scale: 0.8, rotate: 8, opacity: 0 }}
        animate={{ scale: 1, rotate: -6, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.2 }}
        className="relative size-[min(28rem,48vh)]"
      >
        <span className="absolute -inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.28),transparent_62%)]" />
        <span className="absolute -inset-[7%] rounded-[30%] ring-1 ring-white/25" />
        <span className="absolute -inset-[16%] rounded-[34%] ring-1 ring-white/12" />
        <span className="relative block size-full overflow-hidden rounded-[22%] shadow-[0_40px_90px_-30px_rgb(20_0_25/0.8)] ring-4 ring-white/20">
          <Image src={links.rocketLogo} alt="" fill sizes="28rem" quality={90} preload className="object-cover" />
        </span>
      </motion.div>
    </motion.div>
  );
}

/** NexusPay red with its signature zigzag lines (steep up, shallow down), deeper red toward the text. */
function NexusField() {
  const rows = Array.from({ length: 11 }, (_, k) => (k - 5) * 14);
  return (
    <div className="absolute inset-0 bg-[#ea3e44]">
      <svg aria-hidden className="absolute inset-0 size-full">
        <defs>
          <pattern id="nexus-zig" width="140" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            {rows.map((y) => (
              <path key={y} d={`M0 ${y + 30} L40 ${y - 30} L140 ${y + 30}`} fill="none" stroke="white" strokeOpacity="0.28" strokeWidth="1" />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nexus-zig)" />
      </svg>
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_74%_45%,rgb(255_255_255/0.14),transparent_55%),linear-gradient(90deg,rgb(150_18_28/0.62),transparent_62%),linear-gradient(0deg,rgb(120_10_20/0.45),transparent_40%)]" />
    </div>
  );
}

/** An illustrative NexusPay login screen in a tilted phone. Synthetic demo data only. */
function NexusPhone({ reduce }: { reduce: boolean }) {
  const { lang } = useLang();
  const bn = lang === "bn";
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 hidden lg:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="relative mx-auto h-full max-w-[1360px]">
        <motion.div
          aria-hidden
          initial={reduce ? false : { y: 120, rotate: 8, opacity: 0 }}
          animate={{ y: 0, rotate: -9, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
          className="@container absolute right-[9%] top-[46%] aspect-[9/18.5] h-[min(36rem,62vh)] -translate-y-1/2"
        >
          <div className="size-full rounded-[13cqw] bg-[#2a2a2e] p-[2.6cqw] shadow-[0_50px_90px_-30px_rgb(90_0_10/0.8)] ring-1 ring-white/20">
            <div className="relative flex size-full flex-col items-center overflow-hidden rounded-[10.6cqw] bg-white px-[8cqw] pt-[24cqw] text-ink">
              <span className="absolute left-1/2 top-[3.2cqw] h-[6cqw] w-[26cqw] -translate-x-1/2 rounded-full bg-[#111]" />
              <span className="absolute right-[6cqw] top-[10cqw] flex items-center gap-[1cqw] rounded-full bg-black/5 px-[2cqw] py-[1cqw] text-[3cqw] font-semibold">
                <span className="rounded-full bg-white px-[1.6cqw] text-[#e8272f]">ENG</span>
                <span>বাং</span>
              </span>
              <span className="mt-[10cqw] grid size-[19cqw] place-items-center rounded-[5cqw] bg-[#ececee]">
                <Image src="/dbbl-mark.svg" alt="" width={80} height={50} className="w-[12cqw]" />
              </span>
              <span className="mt-[4cqw] text-[4.4cqw] font-medium">{bn ? "স্বাগতম" : "Welcome To"}</span>
              <span className="font-display text-[10cqw] font-bold leading-none text-[#e8272f]">NexusPay</span>
              <span className="mt-[5cqw] text-[3.6cqw] text-ink-3">{bn ? "আপনার নেক্সাসপে অ্যাকাউন্টে লগইন করুন" : "Please login to your NexusPay account"}</span>
              <span className="tabular mt-[3cqw] text-[5.4cqw] font-semibold">0100 000 0000</span>
              <span className="mt-[7cqw] w-full text-[3.4cqw] text-ink-2">{bn ? "নেক্সাসপে পিন দিন" : "Enter NexusPay PIN"}</span>
              <span className="mt-[1.5cqw] flex h-[13cqw] w-full items-center gap-[3cqw] rounded-[2.5cqw] bg-[#f4f4f6] px-[3cqw]">
                <span className="size-[5cqw] rounded-[1.2cqw] border-2 border-ink-2" />
                <span className="flex gap-[2.4cqw]">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="size-[2.6cqw] rounded-full bg-ink" />
                  ))}
                </span>
              </span>
              <span className="mt-[7cqw] grid h-[12cqw] w-full place-items-center rounded-[1.6cqw] bg-[#e8272f] text-[4.2cqw] font-semibold text-white">
                {bn ? "লগইন" : "Login"}
              </span>
              <span className="absolute inset-x-0 bottom-0 flex justify-around px-[6cqw] pb-[6cqw] text-[2.8cqw] text-ink-3">
                {(bn ? ["এটিএম লোকেশন", "সহায়তা", "নেক্সাসপে তথ্য"] : ["ATM Location", "Help & Support", "NexusPay Info"]).map((t) => (
                  <span key={t} className="flex flex-col items-center gap-[1.5cqw]">
                    <span className="size-[6cqw] rounded-[1.4cqw] bg-ink-3/25" />
                    {t}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
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
