"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownToLine, ArrowUpFromLine, Check, Lock, Receipt, Send, Smartphone, Wallet, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { rocketFeatures } from "@/lib/content";
import { Button, Reveal, useReduce } from "./ui";
import { BrandSwooshes, swooshTones } from "./BrandSwooshes";
import { StoreBadges } from "./AppStory";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const MQ = "(min-width: 1024px) and (min-height: 760px) and (pointer: fine)";
function subscribeMq(cb: () => void) {
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

const featureIcons: LucideIcon[] = [ArrowDownToLine, ArrowUpFromLine, Send, Smartphone, Receipt, Wallet];
const CODE = "*322#";
const keys = [
  ["1", ""],
  ["2", "abc"],
  ["3", "def"],
  ["4", "ghi"],
  ["5", "jkl"],
  ["6", "mno"],
  ["7", "pqrs"],
  ["8", "tuv"],
  ["9", "wxyz"],
  ["*", ""],
  ["0", "+"],
  ["#", ""],
] as const;
const bnDigits = "০১২৩৪৫৬৭৮৯";
const bd = (s: string, bn: boolean) => (bn ? s.replace(/\d/g, (c) => bnDigits[+c]) : s);

/** Illustrative USSD menu (the real *322# menu wording may differ). */
const menu = [
  { en: "Send Money", bn: "টাকা পাঠান" },
  { en: "Mobile Recharge", bn: "মোবাইল রিচার্জ" },
  { en: "Merchant Pay", bn: "মার্চেন্ট পে" },
  { en: "Cash Out", bn: "ক্যাশ আউট" },
  { en: "Bill Pay", bn: "বিল পে" },
  { en: "My Account", bn: "আমার অ্যাকাউন্ট" },
];

const services = [
  {
    key: "send",
    chip: { en: "Send money", bn: "টাকা পাঠান" },
    amount: 500,
    field: { en: "Receiver", bn: "প্রাপক" },
    no: "01•••• ••678",
    to: { en: "Rafi's phone", bn: "রাফির ফোন" },
    done: { en: "Sent", bn: "পাঠানো হয়েছে" },
    notif: { en: "You received", bn: "আপনি পেয়েছেন" },
  },
  {
    key: "topup",
    chip: { en: "Mobile top-up", bn: "মোবাইল রিচার্জ" },
    amount: 50,
    field: { en: "Mobile no", bn: "মোবাইল নম্বর" },
    no: "01•••• ••245",
    to: { en: "Mum's phone", bn: "মায়ের ফোন" },
    done: { en: "Recharged", bn: "রিচার্জ হয়েছে" },
    notif: { en: "Recharge received", bn: "রিচার্জ পেয়েছেন" },
  },
  {
    key: "shop",
    chip: { en: "Pay a shop", bn: "দোকানে পেমেন্ট" },
    amount: 350,
    field: { en: "Merchant no", bn: "মার্চেন্ট নম্বর" },
    no: "01•••• ••910",
    to: { en: "The corner shop", bn: "পাড়ার দোকান" },
    done: { en: "Paid", bn: "পরিশোধ হয়েছে" },
    notif: { en: "Payment received", bn: "পেমেন্ট এসেছে" },
  },
] as const;

const steps = [
  { en: "Dial *322# on any phone", bn: "যেকোনো ফোনে *৩২২# ডায়াল করুন" },
  { en: "Choose a service", bn: "সেবা বেছে নিন" },
  { en: "Enter the number and amount", bn: "নম্বর আর টাকার পরিমাণ দিন" },
  { en: "Confirm with your PIN", bn: "পিন দিয়ে নিশ্চিত করুন" },
];

/* The paper plane's flight, sampled from one quadratic curve (percent of the flight box). */
const P0 = [0, 100];
const P1 = [42, -95];
const P2 = [100, 8];
const flight = Array.from({ length: 13 }, (_, i) => {
  const t = i / 12;
  const u = 1 - t;
  const x = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0];
  const y = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1];
  const dx = 2 * u * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * u * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  return { x, y, r: (Math.atan2(dy * 0.45, dx) * 180) / Math.PI };
});

/**
 * Rocket: "any phone is a bank", told as one transaction.
 * Pinned on large screens: the scroll zooms into Rocket's own icon, then a keypad phone dials *322#,
 * picks a service, enters the details and confirms; a paper plane carries the money to a second phone.
 * Elsewhere (touch, narrow, reduced motion) the same story plays from tappable steps.
 */
export function RocketBand() {
  const { lang } = useLang();
  const bn = lang === "bn";
  const reduce = useReduce();
  const id = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const wide = useSyncExternalStore(subscribeMq, () => window.matchMedia(MQ).matches, () => false);
  const pinned = wide && !reduce;

  // phase 0 dial · 1 choose · 2 details · 3 PIN · 4 sent
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState(CODE.length);
  const [svc, setSvc] = useState(0);
  const [touched, setTouched] = useState(false);
  const inView = useInView(stageRef, { amount: 0.45 });

  // The flight box's pixel size, so the trail is drawn undistorted.
  const flightRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 100, h: 100 });
  useEffect(() => {
    const el = flightRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: Math.round(e.contentRect.width) || 100, h: Math.round(e.contentRect.height) || 100 }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduce]);

  const step = Math.min(phase, 3);
  const sent = phase === 4;
  const service = services[svc];
  const shownTyped = pinned ? typed : CODE.length;

  // Pinned scroll story (desktop, fine pointer, motion allowed).
  useIsoLayoutEffect(() => {
    const el = stageRef.current;
    if (!pinned || !el) return;
    const q = gsap.utils.selector(el);
    const tile = q("[data-tile]")[0] as HTMLElement;
    const cover = () => (Math.hypot(window.innerWidth, window.innerHeight) / tile.offsetWidth) * 1.3;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const span = 0.7 / 4;
            const s = p < 0.3 ? 0 : Math.min(3, Math.floor((p - 0.3) / span));
            setPhase(p > 0.88 ? 4 : s);
            setTyped(p < 0.3 ? 0 : s > 0 ? CODE.length : Math.min(CODE.length, Math.floor(((p - 0.3) / span) * 7)));
          },
        },
      });
      stRef.current = tl.scrollTrigger ?? null;

      // 1. Into the icon: the headline lifts away, the tile grows until its magenta is the whole section.
      tl.to(q("[data-introtext]"), { y: -90, autoAlpha: 0, duration: 0.08 }, 0)
        .to(q("[data-hint]"), { autoAlpha: 0, duration: 0.03 }, 0)
        .to(q("[data-logo]"), { autoAlpha: 0, duration: 0.05 }, 0.07)
        .to(tile, { scale: cover, borderRadius: 0, rotate: 0, duration: 0.15, ease: "power2.in" }, 0.03)
        .to(q("[data-intro]"), { autoAlpha: 0, duration: 0.02 }, 0.19)
        // 2. The story arrives.
        .from(q("[data-copy]"), { y: 40, autoAlpha: 0, stagger: 0.012, duration: 0.08 }, 0.18)
        .from(q("[data-phone]"), { y: 180, autoAlpha: 0, rotate: (i) => (i ? 8 : -8), stagger: 0.03, duration: 0.1 }, 0.19)
        .set({}, {}, 1);
    }, el);
    return () => {
      ctx.revert();
      stRef.current = null;
    };
  }, [pinned]);

  // Unpinned: the story plays itself while visible, until the visitor takes over.
  useEffect(() => {
    if (pinned || reduce || touched || !inView) return;
    timer.current = window.setTimeout(() => setPhase((p) => (p + 1) % 5), [2200, 1800, 1800, 1100, 2800][phase]);
    return () => window.clearTimeout(timer.current);
  }, [pinned, reduce, touched, inView, phase]);

  const goStep = (i: number) => {
    const st = stRef.current;
    if (pinned && st) {
      const y = st.start + (0.3 + (i + 0.6) * (0.7 / 4)) * (st.end - st.start);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
      if (lenis) lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    setTouched(true);
    window.clearTimeout(timer.current);
    setPhase(i);
    if (i === 3) timer.current = window.setTimeout(() => setPhase(4), reduce ? 0 : 900);
  };

  const pickService = (i: number) => {
    setSvc(i);
    if (!pinned) {
      setTouched(true);
      window.clearTimeout(timer.current);
      setPhase(1);
    }
  };

  // Which key is "pressed" on the keypad right now.
  const pressed = phase === 0 && shownTyped > 0 && shownTyped <= CODE.length && pinned ? CODE[shownTyped - 1] : phase === 1 ? String(svc + 1) : null;
  const amount = bd(`৳${service.amount}`, bn);

  return (
    <section id="rocket" aria-labelledby={`${id}-h`} className="on-dark relative bg-[linear-gradient(135deg,var(--k-rocket-a)_0%,var(--color-rocket)_40%,var(--k-rocket-b)_100%)] text-white">
      <div ref={stageRef} className={`relative isolate overflow-hidden ${pinned ? "h-svh" : ""}`}>
        <BrandSwooshes brandOnly colors={swooshTones.rocket} opacity={0.22} className="top-0 h-[150%] min-h-[54rem] -right-[90%] sm:-right-[60%] lg:-right-[38%]" />
        {/* Intro (pinned only): Rocket's own icon, then a zoom through it */}
        {pinned && (
          <div data-intro aria-hidden className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-10 bg-rocket-ink">
            <div data-tile className="relative size-[min(15rem,30vh)] rotate-[-6deg] overflow-hidden rounded-[22%] bg-rocket shadow-[0_40px_90px_-30px_rgb(0_0_0/0.7)]">
              <Image data-logo src={links.rocketLogo} alt="" fill sizes="15rem" quality={80} className="object-cover" />
            </div>
            <p data-introtext className="font-display text-center text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
              {bn ? "বাংলাদেশের" : "Bangladesh's"} <span className="text-sun">{bn ? "১ নম্বর নিরাপদ এমএফএস" : "#1 secure MFS"}</span>
            </p>
            <p data-hint className="absolute bottom-8 text-sm font-semibold text-white/60">
              {bn ? "স্ক্রল করে দেখুন" : "Scroll to send money"}
            </p>
          </div>
        )}

        <span aria-hidden className="pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.2),transparent_65%)]" />
        <span aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 size-[40rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-sun)_22%,transparent),transparent_62%)]" />

        <div
          className={`relative mx-auto grid max-w-[1360px] gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center xl:px-10 ${
            pinned ? "h-full pb-6 pt-[calc(var(--header-h)+0.75rem)]" : "py-24 md:py-28"
          }`}
        >
          {/* Story copy */}
          <div>
            <div data-copy className="flex items-center gap-3">
              <span className="relative size-14 overflow-hidden rounded-2xl ring-2 ring-white/25">
                <Image src={links.rocketLogo} alt="" fill sizes="56px" quality={80} className="object-cover" />
              </span>
              <span>
                <span className="font-display block text-2xl font-bold leading-none tracking-[-0.02em]">Rocket</span>
                <span className="mt-1 block text-sm text-white/75">{bn ? "ডাচ্-বাংলা ব্যাংক মোবাইল ব্যাংকিং" : "Dutch-Bangla Bank Mobile Banking"}</span>
              </span>
            </div>

            <h2 data-copy id={`${id}-h`} className="font-display mt-5 text-balance text-[clamp(2.5rem,4.2vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              {bn ? "বাংলাদেশের" : "Bangladesh's"} <span className="text-sun">{bn ? "১ নম্বর নিরাপদ এমএফএস" : "#1 secure MFS"}</span>
            </h2>
            <p data-copy className="mt-4 max-w-[46ch] text-pretty text-lg text-white/85">
              {bn
                ? "রকেট দেশের প্রথম মোবাইল আর্থিক সেবা। অ্যাপ লাগে না, স্মার্টফোনও না: *৩২২# ডায়াল করলেই চলে।"
                : "Rocket was Bangladesh's first mobile financial service. No app, no smartphone needed: dial *322# and you're banking."}
            </p>
            <div data-copy className="mt-6 flex flex-wrap gap-3">
              <StoreBadges outline play={links.rocketPlay} appStore={links.rocketAppStore} app="Rocket" />
            </div>

            {/* What to do: pick a service */}
            <div data-copy className="mt-6 flex flex-wrap gap-2" role="group" aria-label={bn ? "একটি সেবা বেছে নিন" : "Pick a service"}>
              {services.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => pickService(i)}
                  aria-pressed={svc === i}
                  className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${
                    svc === i ? "bg-sun text-rocket-ink" : "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20"
                  }`}
                >
                  {s.chip[lang]}
                </button>
              ))}
            </div>

            {/* The four steps; the active one tracks the scroll (or the tap) */}
            <ol data-copy className="mt-4 space-y-1">
              {steps.map((s, i) => {
                const active = step === i;
                const done = i < step || sent;
                return (
                  <li key={s.en}>
                    <button
                      type="button"
                      onClick={() => goStep(i)}
                      aria-current={active ? "step" : undefined}
                      className={`flex min-h-11 w-full max-w-md items-center gap-3 rounded-2xl px-3 text-left font-semibold transition-colors duration-300 ${
                        active ? "bg-white text-rocket-ink" : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <span
                        className={`tabular grid size-7 shrink-0 place-items-center rounded-full text-sm transition-colors duration-300 ${
                          active && !sent ? "bg-rocket text-white" : done ? "bg-sun text-rocket-ink" : "ring-1 ring-inset ring-white/40"
                        }`}
                      >
                        {done && (!active || sent) ? <Check className="size-4" strokeWidth={3} aria-hidden /> : bd(String(i + 1), bn)}
                      </span>
                      {s[lang]}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Two phones: a keypad phone sends, a second phone receives */}
          <div className="relative flex items-end justify-center gap-[6%]">
            <figure data-phone className="flex flex-col items-center">
              <KeypadPhone
                keypad={<Keys pressed={pressed} bn={bn} />}
                screen={
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${phase === 4 ? 4 : step}-${svc}`}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="flex h-full flex-col"
                  >
                    {phase === 0 && (
                      <div className="flex h-full flex-col items-center justify-center">
                        <p className="font-display tabular text-[15cqw] font-semibold tracking-[0.04em]">
                          {bd(CODE.slice(0, shownTyped), bn)}
                          {shownTyped < CODE.length && <span className="ml-0.5 inline-block h-[12cqw] w-[1.2cqw] translate-y-[1.5cqw] animate-pulse bg-rocket" />}
                        </p>
                        <p className="mt-[3cqw] text-[6cqw] font-semibold text-rocket">
                          {shownTyped >= CODE.length ? (bn ? "কল করা হচ্ছে…" : "Calling…") : " "}
                        </p>
                      </div>
                    )}
                    {phase === 1 && (
                      <div className="text-[6.4cqw] leading-tight">
                        <p className="font-bold text-rocket">Rocket</p>
                        <ol className="mt-[2cqw] space-y-[0.8cqw]">
                          {menu.map((m, i) => (
                            <li key={m.en} className={`rounded-[1.5cqw] px-[2cqw] py-[0.4cqw] ${i === svc ? "bg-rocket font-semibold text-white" : ""}`}>
                              {bd(String(i + 1), bn)}. {m[lang]}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {phase === 2 && (
                      <div className="flex h-full flex-col justify-center gap-[4cqw] text-[7cqw]">
                        <div>
                          <p className="text-[5.6cqw] font-semibold text-rocket">{service.field[lang]}</p>
                          <p className="tabular font-semibold">{bd(service.no, bn)}</p>
                        </div>
                        <div>
                          <p className="text-[5.6cqw] font-semibold text-rocket">{bn ? "পরিমাণ" : "Amount"}</p>
                          <p className="font-display tabular text-[12cqw] font-semibold leading-none">{amount}</p>
                        </div>
                      </div>
                    )}
                    {phase === 3 && (
                      <div className="flex h-full flex-col items-center justify-center">
                        <p className="text-[6.4cqw] font-semibold text-rocket">{bn ? "পিন দিন" : "Enter PIN"}</p>
                        <p className="mt-[3cqw] flex gap-[3cqw]">
                          {[0, 1, 2, 3].map((d) => (
                            <motion.span
                              key={d}
                              initial={reduce ? false : { scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.15 + d * 0.14, type: "spring", stiffness: 500, damping: 18 }}
                              className="size-[6cqw] rounded-full bg-rocket-ink"
                            />
                          ))}
                        </p>
                      </div>
                    )}
                    {phase === 4 && (
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <span className="grid size-[17cqw] place-items-center rounded-full bg-green-600 text-white">
                          <Check className="size-[10cqw]" strokeWidth={3} aria-hidden />
                        </span>
                        <p className="mt-[3cqw] text-[6.4cqw] font-semibold">{service.done[lang]}</p>
                        <p className="font-display tabular text-[12cqw] font-semibold leading-none">{amount}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                }
              />
              <figcaption className="mt-4 text-center text-sm font-semibold text-white/85">
                {bn ? "যেকোনো বাটন ফোন" : "Any keypad phone"} · <span className="text-sun">{bd(CODE, bn)}</span>
              </figcaption>
            </figure>

            <figure data-phone className="flex flex-col items-center">
              <SmartPhone>
                <div className="flex items-center gap-[3cqw]">
                  <span className="relative size-[13cqw] overflow-hidden rounded-[3.5cqw]">
                    <Image src={links.rocketLogo} alt="" fill sizes="40px" quality={70} className="object-cover" />
                  </span>
                  <span className="font-display text-[7.5cqw] font-bold tracking-[-0.02em]">Rocket</span>
                </div>
                <motion.p
                  animate={sent && !reduce ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className={`mt-[6cqw] rounded-full px-[4cqw] py-[2.4cqw] text-center text-[5.4cqw] font-semibold transition-colors duration-500 ${
                    sent ? "bg-green-600 text-white" : "bg-white text-rocket"
                  }`}
                >
                  {sent ? `+ ${amount}` : bn ? "ব্যালেন্স দেখতে ট্যাপ করুন" : "Tap for balance"}
                </motion.p>
                <ul className="mt-[7cqw] grid grid-cols-3 gap-x-[3cqw] gap-y-[6cqw]">
                  {rocketFeatures.map((f, i) => {
                    const Icon = featureIcons[i];
                    return (
                      <li key={f.t.en} className="flex flex-col items-center gap-[2cqw] text-center">
                        <span className="grid size-[15cqw] place-items-center rounded-[4.5cqw] bg-rocket-100 text-rocket">
                          <Icon className="size-[7cqw]" aria-hidden />
                        </span>
                        <span className="text-[4.4cqw] font-medium leading-tight text-rocket-ink/80">{f.t[lang]}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* The money lands */}
                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={reduce ? false : { y: "-140%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduce ? undefined : { y: "-140%", opacity: 0 }}
                      transition={{ delay: reduce ? 0 : 1.2, type: "spring", stiffness: 260, damping: 22 }}
                      className="absolute inset-x-[4cqw] top-[12cqw] flex items-center gap-[3cqw] rounded-[5cqw] bg-white p-[3.5cqw] shadow-[0_12px_30px_-10px_color-mix(in_srgb,var(--color-rocket-ink)_45%,transparent)]"
                    >
                      <span className="relative size-[11cqw] shrink-0 overflow-hidden rounded-[3cqw]">
                        <Image src={links.rocketLogo} alt="" fill sizes="36px" quality={70} className="object-cover" />
                      </span>
                      <span className="min-w-0 text-[4.6cqw] leading-snug">
                        <span className="block font-bold">{service.notif[lang]}</span>
                        <span className="tabular block text-rocket-ink/75">{amount}</span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SmartPhone>
              <figcaption className="mt-4 text-center text-sm font-semibold text-white/85">{service.to[lang]}</figcaption>
            </figure>

            {/* Paper plane: the money in flight */}
            {!reduce && (
              <div ref={flightRef} aria-hidden className="pointer-events-none absolute left-[24%] right-[24%] top-[16%] h-[26%]">
                <svg viewBox={`0 0 ${box.w} ${box.h}`} className="absolute inset-0 size-full overflow-visible">
                  <motion.path
                    d={`M${(P0[0] * box.w) / 100} ${(P0[1] * box.h) / 100} Q${(P1[0] * box.w) / 100} ${(P1[1] * box.h) / 100} ${(P2[0] * box.w) / 100} ${(P2[1] * box.h) / 100}`}
                    fill="none"
                    stroke="color-mix(in srgb, var(--color-sun) 75%, transparent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={sent ? { pathLength: 1, opacity: [0, 1, 1, 0] } : { pathLength: 0, opacity: 0 }}
                    transition={sent ? { duration: 1.35, ease: "easeInOut", opacity: { duration: 2.2, times: [0, 0.1, 0.6, 1] } } : { duration: 0.2 }}
                  />
                </svg>
                <motion.span
                  className="absolute -ml-5 -mt-5 block size-10"
                  initial={{ left: "0%", top: "100%", opacity: 0, rotate: flight[0].r }}
                  animate={
                    sent
                      ? {
                          left: flight.map((f) => `${f.x}%`),
                          top: flight.map((f) => `${f.y}%`),
                          rotate: flight.map((f) => f.r),
                          opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                          scale: [0.6, 1, 1.15, 1.2, 1.2, 1.15, 1.1, 1, 1, 0.95, 0.9, 0.8, 0.6],
                        }
                      : { left: "0%", top: "100%", opacity: 0, rotate: flight[0].r }
                  }
                  transition={sent ? { duration: 1.35, ease: "easeInOut" } : { duration: 0 }}
                >
                  <PaperPlane />
                </motion.span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Everything else Rocket does */}
      <div className="relative mx-auto max-w-[1360px] px-5 pb-24 sm:px-6 md:pb-32 xl:px-10">
        <div className="border-t border-white/20 pt-14">
          <Reveal>
            <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.03em]">
              {bn ? "রকেটে আরও যা করা যায়" : "Everything else Rocket does"}
            </h3>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rocketFeatures.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <motion.li
                  key={f.t.en}
                  initial={reduce ? false : { opacity: 0, y: 30, rotate: i % 2 ? 2 : -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: "spring", stiffness: 170, damping: 18, delay: (i % 3) * 0.06 }}
                  className="group relative isolate flex items-start gap-4 overflow-hidden rounded-2xl bg-white/10 p-5 ring-1 ring-inset ring-white/15 transition-[background-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:z-10 hover:scale-[1.04] hover:bg-white/15 hover:shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--color-rocket-ink)_80%,transparent)]"
                >
                  {/* On hover the card zooms and its related photo comes up behind the text */}
                  {f.img && (
                    <>
                      <Image
                        src={f.img}
                        alt=""
                        fill
                        sizes="(min-width:1024px) 30vw, 50vw"
                        quality={75}
                        className="-z-20 scale-110 object-cover opacity-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-100 group-hover:opacity-100"
                      />
                      <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-rocket-ink)_85%,transparent),color-mix(in_srgb,var(--color-rocket-ink)_35%,transparent))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </>
                  )}
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sun text-rocket-ink transition-transform duration-500 group-hover:-rotate-12">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="font-display block text-lg font-semibold tracking-[-0.015em]">{f.t[lang]}</span>
                    <span className="block text-[0.95rem] text-white/80">{f.d[lang]}</span>
                  </span>
                </motion.li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              <Button href={links.rocket} tone="white" size="lg">
                {bn ? "রকেট সম্পর্কে" : "All about Rocket"}
              </Button>
            </div>
            <div className="text-sm text-white/80 lg:text-right">
              <p className="flex items-center gap-2 lg:justify-end">
                <Lock className="size-4 text-sun" aria-hidden />
                {bn ? "টাকা তুলতে ফোন, পিন আর চেক ডিজিট তিনটিই লাগে।" : "Moving money needs your phone, your PIN and the check digit together."}
              </p>
              <p className="mt-1 text-white/60">{bn ? "ফোনের স্ক্রিনগুলো উদাহরণ মাত্র।" : "Phone screens are illustrative."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeypadPhone({ screen, keypad }: { screen: React.ReactNode; keypad: React.ReactNode }) {
  return (
    <div className="@container w-[clamp(8.5rem,38vw,12.5rem)] lg:w-[min(14rem,calc((100svh-14rem)*0.36))]">
      <div className="rounded-[10cqw] bg-rocket-ink p-[7cqw] pb-[9cqw] shadow-[0_50px_90px_-30px_color-mix(in_srgb,var(--color-rocket-ink)_85%,transparent)] ring-1 ring-white/10">
        <span aria-hidden className="mx-auto mb-[5cqw] block h-[2.4cqw] w-[26cqw] rounded-full bg-white/15" />
        <div className="@container aspect-[1/0.92] overflow-hidden rounded-[2.5cqw] bg-white text-rocket-ink">
          <div className="h-full p-[7cqw]">{screen}</div>
        </div>
        {keypad}
      </div>
    </div>
  );
}

function Keys({ pressed, bn }: { pressed: string | null; bn: boolean }) {
  return (
    <div aria-hidden className="mt-[7cqw]">
      <div className="mb-[4cqw] flex justify-between px-[4cqw]">
        <span className="h-[7cqw] w-[24cqw] rounded-full bg-green-600" />
        <span className="h-[7cqw] w-[24cqw] rounded-full bg-red-600" />
      </div>
      <div className="grid grid-cols-3 gap-[3.5cqw]">
        {keys.map(([k, sub]) => {
          const on = pressed === k;
          return (
            <motion.span
              key={k}
              animate={on ? { scale: 0.86, backgroundColor: "var(--color-sun)", color: "var(--color-rocket-ink)" } : { scale: 1, backgroundColor: "rgba(255,255,255,0.1)", color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="flex h-[13cqw] flex-col items-center justify-center rounded-[5cqw] leading-none"
            >
              <span className="font-display text-[7.5cqw] font-semibold">{bd(k, bn)}</span>
              {sub && <span className="text-[3.6cqw] uppercase opacity-60">{sub}</span>}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

function SmartPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="@container w-[clamp(9.5rem,44vw,15rem)] lg:w-[min(17.5rem,calc((100svh-14rem)*0.42))]">
      <div className="rounded-[15cqw] bg-rocket-ink p-[3.5cqw] shadow-[0_50px_90px_-30px_color-mix(in_srgb,var(--color-rocket-ink)_85%,transparent)] ring-1 ring-white/10">
        <div className="relative aspect-[9/18.5] overflow-hidden rounded-[12cqw] bg-paper px-[6cqw] pt-[13cqw] text-rocket-ink">
          <span aria-hidden className="absolute left-1/2 top-[3.5cqw] h-[5cqw] w-[24cqw] -translate-x-1/2 rounded-full bg-rocket-ink" />
          {children}
        </div>
      </div>
    </div>
  );
}

function PaperPlane() {
  return (
    <svg viewBox="0 0 40 40" className="size-full drop-shadow-[0_6px_10px_color-mix(in_srgb,var(--color-rocket-ink)_45%,transparent)]">
      <path d="M3 19 37 5 26 35 19 23Z" fill="#ffffff" />
      <path d="M19 23 37 5 15 30Z" className="fill-sun" />
      <path d="M19 23 15 30 15 21Z" style={{ fill: "var(--k-wing)" }} />
    </svg>
  );
}
