"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { dbblSwoosh } from "@/lib/dbbl-mark";
import { Button, easeOut, useReduce } from "./ui";
import { swooshTones } from "./BrandSwooshes";

// Unsplash photography (free licence), chosen as stand-ins for DBBL's own lifestyle shoots.
// Every slide has a prominent colour field. Photo slides sit under an indigo wash; the Rocket slide is a magenta
// field with a screenshot of the real Rocket app in a phone frame; the NexusPay slide is NexusPay red with its
// zigzag line pattern and a NexusPay login screen in a phone frame.
// The "Rise & Run" slide is DBBL's campaign look: a drifting sky with the logo swooshes and dark text. The Agent Banking
// slide is light too: a sky-blue field with DBBL's own Agent Banking badge.
type Slide = { tint: "indigo" | "rocket" | "nexus" | "sky" | "agent"; art?: "atm"; src: string; alt: string; position: string; cta: string; cta2: string };
const slides: Slide[] = [
  {
    tint: "sky",
    src: "https://images.unsplash.com/photo-1599768793949-2da217e9f093",
    alt: "White clouds in a bright blue sky",
    position: "30% 70%",
    cta: links.personalAccounts,
    cta2: links.history,
  },
  {
    tint: "rocket",
    src: "/rocket-app.webp",
    alt: "The Rocket mobile banking app home screen",
    position: "50% 50%",
    cta: links.rocketPlay,
    cta2: links.rocketCharges,
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
    art: "atm",
    src: "https://images.unsplash.com/photo-1780345493576-ed325a2dd2d6",
    alt: "An elevated highway interchange crossing green Dhaka at dawn",
    position: "50% 60%",
    cta: links.atmLocator,
    cta2: links.personalAccounts,
  },
  {
    tint: "agent",
    src: "/agent-banking.webp",
    alt: "",
    position: "50% 50%",
    cta: links.agentRegistration,
    cta2: links.agentBanking,
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

  // Swipe sideways on touch screens to change slide
  const touch = useRef<{ x: number; y: number } | null>(null);

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

  const brand = usePathname()?.startsWith("/new-design") ?? false; // /new-design uses its own cloud photo
  // /new-design: the copy follows the pointer (a small step, so it stays readable) and the cloud photo moves further the other way
  const textX = useTransform(sx, (v) => (brand ? v * 34 : 0));
  const textY = useTransform(sy, (v) => (brand ? v * 20 : 0));
  const cloudX = useTransform(sx, (v) => v * -70);
  const cloudY = useTransform(sy, (v) => v * -40);
  const slide = slides[index];
  const copy = d.hero.slides[index];
  const sky = slide.tint === "sky";
  const light = sky || slide.tint === "agent"; // dark text and controls

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Highlights"
      className={`relative isolate flex min-h-[100svh] touch-pan-y flex-col overflow-hidden bg-indigo-950 text-white ${light ? "" : "on-dark"}`}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const t = touch.current;
        touch.current = null;
        if (!t) return;
        const dx = e.changedTouches[0].clientX - t.x;
        const dy = e.changedTouches[0].clientY - t.y;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(index + (dx < 0 ? 1 : -1));
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
                <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgb(255_255_255/0.22),transparent_55%),linear-gradient(90deg,color-mix(in_srgb,var(--color-rocket-700)_80%,transparent),transparent_60%)]" />
              </div>
            ) : slide.tint === "agent" ? (
              <div className="absolute inset-0 bg-[linear-gradient(180deg,#6f9fd3_0%,#a9c6e6_45%,#e4edf8_100%)]">
                <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgb(255_255_255/0.45),transparent_60%),linear-gradient(90deg,rgb(255_255_255/0.4),transparent_55%)]" />
              </div>
            ) : slide.tint === "sky" && brand ? (
              /* /new-design: the supplied sky shown whole (never cropped); a blurred copy fills any spare width */
              <div className="absolute inset-0 overflow-hidden">
                {/* The clouds drift slowly on their own and shift with the pointer; the photo is oversized so its edges never show */}
                <motion.div className="absolute inset-[-6%]" style={{ x: cloudX, y: cloudY }}>
                  <motion.div
                    className="absolute inset-0"
                    animate={reduce ? undefined : { x: ["-2.5%", "2.5%"], y: ["-0.8%", "0.8%"] }}
                    transition={{ duration: 28, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                  >
                    <Image src="/hero-sky-3.webp" alt={slide.alt} fill sizes="115vw" quality={85} preload={index === 0} className="object-cover" />
                  </motion.div>
                </motion.div>
              </div>
            ) : slide.tint === "sky" ? (
              /* The clouds drift slowly sideways: the photo is wider than the hero and pans back and forth */
              <motion.div
                className="absolute inset-y-0 left-0 w-[125%]"
                animate={reduce ? undefined : { x: ["0%", "-18%"] }}
                transition={{ duration: 45, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
              >
                <Image src={slide.src} alt={slide.alt} fill sizes="125vw" quality={80} preload={index === 0} className="object-cover" style={{ objectPosition: slide.position }} />
              </motion.div>
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
            {/* Sky: a soft white haze over the photo, brightest behind the text, as in DBBL's campaign artwork */}
            {slide.tint === "sky" && (
              <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.62)_0%,rgb(255_255_255/0.35)_45%,rgb(255_255_255/0.1)_75%),linear-gradient(180deg,rgb(120_190_235/0.25)_0%,rgb(255_255_255/0)_40%,rgb(255_255_255/0.5)_100%)]" />
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
        className={`absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-rocket-700)_92%,transparent)_0%,color-mix(in_srgb,var(--color-rocket)_70%,transparent)_42%,color-mix(in_srgb,var(--color-rocket)_20%,transparent)_78%),linear-gradient(0deg,color-mix(in_srgb,var(--color-rocket-ink)_85%,transparent)_0%,color-mix(in_srgb,var(--color-rocket-ink)_0%,transparent)_45%),linear-gradient(180deg,color-mix(in_srgb,var(--color-rocket-ink)_50%,transparent)_0%,color-mix(in_srgb,var(--color-rocket-ink)_0%,transparent)_22%)] transition-opacity duration-1000 ${
          slide.tint === "rocket" ? "opacity-100" : "opacity-0"
        }`}
      />


      {/* The real Rocket app, in a phone (large screens) */}
      <AnimatePresence>{slide.tint === "rocket" && <RocketPhone key="rocket-phone" src={slide.src} alt={slide.alt} reduce={!!reduce} />}</AnimatePresence>
      <AnimatePresence>{slide.tint === "nexus" && <NexusPhone key="nexus-phone" reduce={!!reduce} />}</AnimatePresence>
      <AnimatePresence>{slide.art === "atm" && <AtmArt key="atm-art" reduce={!!reduce} />}</AnimatePresence>
      <AnimatePresence>{sky && <SkyArt key="sky-art" reduce={!!reduce} />}</AnimatePresence>
      <AnimatePresence>{!sky && <HeroSwooshes key={`swooshes-${slide.tint}`} tint={slide.tint} reduce={!!reduce} />}</AnimatePresence>
      <AnimatePresence>{slide.tint === "agent" && <AgentArt key="agent-art" reduce={!!reduce} />}</AnimatePresence>

      <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col justify-end px-5 pb-36 pt-[calc(var(--header-h)+4rem)] sm:px-6 sm:pb-40 xl:px-10">
        <motion.div className="max-w-[44rem]" style={brand ? { x: textX, y: textY } : undefined} aria-live={playing ? "off" : "polite"}>
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
              {sky ? (
                <>
                  {/* Campaign lockup: the red panel with the Bangla line, then "from Good to Great" */}
                  <h1 className="font-display">
                    <motion.span
                      variants={lineVariants(reduce)}
                      className="inline-flex flex-col rounded-2xl bg-red-600 px-7 pb-4 pt-3 text-white shadow-[0_24px_48px_-20px_color-mix(in_srgb,var(--color-red-600)_70%,transparent)] sm:px-9"
                    >
                      <span className="text-[clamp(2.9rem,7.2vw,6rem)] font-semibold leading-[1] tracking-[-0.035em]">{copy.title}</span>
                      <span lang="bn" className="font-bangla mt-1 text-[clamp(1.05rem,1.8vw,1.5rem)] font-semibold leading-snug">
                        জেগে উঠুন, নতুন ভাবে
                      </span>
                    </motion.span>
                  </h1>
                  <motion.p variants={lineVariants(reduce)} className="font-display mt-6 flex items-baseline gap-3 leading-none tracking-[-0.03em]">
                    <span className="text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-green-600">from</span>
                    <span className="text-[clamp(2rem,4.4vw,3.75rem)] font-bold text-indigo-600">Good to Great</span>
                  </motion.p>
                </>
              ) : (
                <>
                  {/* /new-design, phones: the product's own logo above the headline */}
                  {brand && slide.tint === "rocket" && (
                    <motion.div variants={lineVariants(reduce)} className="mb-5 lg:hidden">
                      <Image src="/rocket-logo.png" alt="Rocket" width={96} height={96} className="size-20" />
                    </motion.div>
                  )}
                  {brand && slide.tint === "nexus" && (
                    <motion.div variants={lineVariants(reduce)} className="mb-5 lg:hidden">
                      <span className="inline-block rounded-2xl bg-white p-2.5 shadow-[0_18px_36px_-18px_rgb(0_0_0/0.55)]">
                        {/* eslint-disable-next-line @next/next/no-img-element -- supplied static SVG */}
                        <img src="/nexuspay-logo.svg" alt="NexusPay" width={164} height={180} className="h-20 w-auto" />
                      </span>
                    </motion.div>
                  )}
                  <h1 className={`font-display text-balance text-[clamp(2.9rem,7.2vw,6rem)] font-semibold leading-[0.98] tracking-[-0.035em] ${light ? "text-indigo-950" : ""}`}>
                    <motion.span variants={lineVariants(reduce)} className="block">
                      {copy.title}
                    </motion.span>
                  </h1>
                  <motion.p
                    variants={lineVariants(reduce)}
                    className={`mt-6 max-w-[34rem] text-pretty text-lg sm:text-xl ${light ? "text-indigo-900" : slide.tint === "indigo" ? "text-indigo-100" : "text-white/95"}`}
                  >
                    {copy.body}
                  </motion.p>
                </>
              )}
              <motion.div variants={lineVariants(reduce)} className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={slide.cta} tone={light ? "primary" : slide.tint === "indigo" ? "lime" : "white"} size="lg">
                  {copy.cta}
                </Button>
                <Button href={slide.cta2} tone={light ? "ghost-light" : "ghost-dark"} size="lg" className={index === 0 ? "btn-arrow-green" : ""}>
                  {copy.cta2}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Slide controls: dots only (the active one is a pill that fills with the slide's progress), plus pause */}
      <div className="absolute inset-x-0 bottom-24 z-10 md:bottom-0">
        <div className="mx-auto flex max-w-[1360px] items-center justify-start gap-3 px-5 sm:px-6 md:justify-end md:pb-28 xl:px-10">
          <ul className="flex items-center gap-1" role="tablist" aria-label="Choose slide">
            {d.hero.slides.map((s, i) => (
              <li key={s.tag} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${d.hero.slide} ${i + 1}: ${s.tag}`}
                  onClick={() => go(i)}
                  className="group grid h-11 min-w-6 place-items-center px-1"
                >
                  <span
                    className={`relative block h-2 overflow-hidden rounded-full transition-all duration-500 ${
                      i === index ? "w-10" : "w-2 group-hover:scale-125"
                    } ${light ? "bg-indigo-950/25" : "bg-white/45"}`}
                  >
                    {i === index && (
                      <span
                        className={`absolute inset-y-0 left-0 rounded-full ${light ? "bg-indigo-600" : "bg-lime"}`}
                        style={{ width: `${(reduce || !playing ? 1 : progress) * 100}%` }}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? d.hero.pause : d.hero.play}
            className={`hidden size-11 place-items-center rounded-full ring-1 ring-inset backdrop-blur-md transition-colors duration-700 md:grid ${
              light ? "bg-white/50 text-indigo-950 ring-indigo-950/20 hover:bg-white/80" : "bg-white/12 text-white ring-white/30 hover:bg-white/20"
            }`}
          >
            {playing ? <Pause className="size-4" fill="currentColor" aria-hidden /> : <Play className="size-4" fill="currentColor" aria-hidden />}
          </button>
        </div>
      </div>
    </section>
  );
}

/** NexusPay red with its signature zigzag lines (steep up, shallow down), deeper red toward the text. */
function NexusField() {
  const rows = Array.from({ length: 11 }, (_, k) => (k - 5) * 14);
  return (
    <div className="absolute inset-0 bg-[var(--k-nexus)]">
      <svg aria-hidden className="absolute inset-0 size-full">
        <defs>
          <pattern id="nexus-zig" width="140" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            {rows.map((y) => (
              <path key={y} className="nexus-zig-line" d={`M0 ${y + 30} L40 ${y - 30} L140 ${y + 30}`} fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
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
                <span className="rounded-full bg-white px-[1.6cqw] text-[var(--k-nexus-ink)]">ENG</span>
                <span>বাং</span>
              </span>
              <span className="mt-[10cqw] grid size-[19cqw] place-items-center rounded-[5cqw] bg-[#ececee]">
                <Image src="/dbbl-mark.svg" alt="" width={80} height={53} className="w-[12cqw]" />
              </span>
              <span className="mt-[4cqw] text-[4.4cqw] font-medium">{bn ? "স্বাগতম" : "Welcome To"}</span>
              <span className="font-display text-[10cqw] font-bold leading-none text-[var(--k-nexus-ink)]">NexusPay</span>
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
              <span className="mt-[7cqw] grid h-[12cqw] w-full place-items-center rounded-[1.6cqw] bg-[var(--k-nexus-ink)] text-[4.2cqw] font-semibold text-white">
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

/** DBBL's ATMs and a location pin on the right of the "Largest ATM network" slide; the photo behind is untouched. */
function AtmArt({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="relative mx-auto h-full max-w-[1360px]">
        <motion.div
          initial={reduce ? false : { y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.25 }}
          className="absolute right-[8%] top-[46%] aspect-[1400/1220] h-[min(26rem,48vh)] -translate-y-1/2 [mask-image:linear-gradient(180deg,#000_62%,transparent_100%)]"
        >
          <Image src="/atm-network.webp" alt="" fill sizes="40rem" quality={90} className="object-contain opacity-[0.86] saturate-[0.9] brightness-[0.94]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/** The first slide's logo swooshes, in the same place, for the other slides (Rocket, NexusPay, ATM, Agent Banking).
 *  Drawn under the phones and ATM art. */
function HeroSwooshes({ tint, reduce }: { tint: Slide["tint"]; reduce: boolean }) {
  // Rocket and NexusPay get tones of their own field so the swooshes sit inside it; the rest use the logo colours.
  const tonal: Partial<Record<Slide["tint"], readonly string[]>> = {
    rocket: swooshTones.rocket,
    nexus: ["color-mix(in srgb, var(--k-nexus) 65%, white)", "rgb(150 14 24)", "color-mix(in srgb, var(--k-nexus) 45%, white)"],
  };
  const fills = tonal[tint] ?? ["var(--color-indigo-600)", "var(--color-red-600)", "var(--color-green-600)"];
  const strength = tonal[tint] ? 0.4 : 0.32;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -right-[70%] top-0 -z-10 aspect-[205/172] h-[125%] sm:-right-[40%] lg:-right-[26%]"
      initial={reduce ? { opacity: 0 } : { x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <svg className="size-full overflow-visible" viewBox="76 94 205 172">
        {[dbblSwoosh.blue, dbblSwoosh.red, dbblSwoosh.green].map((d, i) => (
          <path key={i} className="hero-swoosh-path" d={d} style={{ fill: fills[i], fillOpacity: strength }} />
        ))}
      </svg>
    </motion.div>
  );
}

/** DBBL Agent Banking: the programme's own badge (supplied by DBBL) on the right of the slide. */
function AgentArt({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="relative mx-auto h-full max-w-[1360px]">
        <motion.div
          initial={reduce ? false : { y: 90, rotate: 8, opacity: 0 }}
          animate={{ y: 0, rotate: 4, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
          className="absolute right-[8%] top-[48%] aspect-[427/416] h-[min(27rem,50vh)] -translate-y-1/2 overflow-hidden rounded-[11%] shadow-[0_50px_90px_-30px_rgb(15_17_69/0.55)] ring-4 ring-white"
        >
          <Image src="/agent-banking.webp" alt="" fill sizes="28rem" quality={92} className="scale-[1.02] object-cover" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/** DBBL campaign artwork for the sky slide: the swooshes of DBBL's own mark, oversized and faint on the right, and
 *  white wind lines low left. */
function SkyArt({ reduce }: { reduce: boolean }) {
  const swooshes = [
    { d: dbblSwoosh.blue, c: "var(--color-indigo-600)" },
    { d: dbblSwoosh.red, c: "var(--color-red-600)" },
    { d: dbblSwoosh.green, c: "var(--color-green-600)" },
  ];
  const winds = [0, 18, 36, 54];
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* The logo's blue, red and green swooshes only (no oval), oversized and sweeping up on the right */}
      <motion.div
        className="absolute -right-[70%] top-0 aspect-[205/172] h-[125%] sm:-right-[40%] lg:-right-[26%]"
        initial={reduce ? false : { x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <svg className="size-full overflow-visible" viewBox="76 94 205 172">
          {swooshes.map((s) => (
            <path key={s.c} className="sky-swoosh-path" d={s.d} style={{ fill: s.c, fillOpacity: 0.38 }} />
          ))}
        </svg>
      </motion.div>
      <svg className="absolute inset-0 size-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {/* Wind lines */}
        {winds.map((dy, i) => (
          <motion.path
            key={dy}
            className="sky-wind-line"
            d={`M-40 ${780 + dy} C 120 ${650 + dy}, 230 ${900 + dy}, 400 ${760 + dy} S 640 ${640 + dy}, 820 ${790 + dy}`}
            fill="none"
            stroke="#fff"
            strokeWidth={1.6}
            strokeOpacity={0.85 - i * 0.15}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 + i * 0.1 }}
          />
        ))}
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
          <div className="size-full rounded-[2.6rem] bg-rocket-ink p-[0.6rem] shadow-[0_50px_90px_-30px_color-mix(in_srgb,var(--color-rocket-ink)_80%,transparent)] ring-1 ring-white/15">
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
