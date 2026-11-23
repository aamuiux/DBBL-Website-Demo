"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { ChevronDown, Globe, MapPin, Menu, Phone, X, ArrowUpRight, Lock } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n";
import { nav as allNav, type NavItem } from "@/lib/nav";

/** The Employee/Payroll menu is part of the /new-design concept only. */
const navFor = (brand: boolean) => (brand ? allNav : allNav.filter((n) => n.key !== "payroll"));
import { links, phone } from "@/lib/links";
import { easeOut, useReduce } from "./ui";


const featureTone: Record<NavItem["feature"]["tone"], string> = {
  indigo: "bg-indigo-600 text-white",
  green: "bg-green-600 text-white",
  rocket: "bg-rocket text-white",
  lime: "bg-lime text-indigo-950",
};

export function Header() {
  const { d, lang, toggle } = useLang();
  const reduce = useReduce();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<NavItem["key"] | null>(null);
  const [drawer, setDrawer] = useState(false);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  // Tone of whatever the island is floating over, sampled from the page under it.
  const [under, setUnder] = useState<"dark" | "light">("dark");

  // Island: 0 = full-width bar at the top of the page, 1 = floating glass pill. Driven by the scroll itself.
  const { scrollY, scrollYProgress } = useScroll();
  const kRaw = useTransform(scrollY, [0, 180], [0, 1]);
  const kSpring = useSpring(kRaw, { stiffness: 260, damping: 34, mass: 0.6 });
  const k = reduce ? kRaw : kSpring;

  // Always-visible sticky header that reads the tone of the page underneath it.
  useEffect(() => {
    let raf = 0;
    const sample = () => {
      raf = 0;
      // Where the island rests once it has floated free of the top edge.
      const bar = barRef.current;
      const y = 12 + (bar ? bar.offsetHeight : 64) / 2;
      // Left edge of the page: section grounds, not the cards inside them.
      const hit = document.elementsFromPoint(6, y).find((el) => !navRef.current?.contains(el));
      setUnder(isDarkGround(hit) ? "dark" : "light");
    };
    let settle: number | undefined;
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!raf) raf = requestAnimationFrame(sample);
      // And once more after the page comes to rest (jumps and pinned sections can skip a frame).
      window.clearTimeout(settle);
      settle = window.setTimeout(sample, 180);
    };
    onScroll();
    // Smooth scrolling and programmatic jumps don't always emit scroll events, so watch the position each
    // frame and react only when it actually changes (one number compare per frame).
    let seen = window.scrollY;
    let watch = 0;
    const tick = () => {
      if (window.scrollY !== seen) {
        seen = window.scrollY;
        onScroll();
      }
      watch = requestAnimationFrame(tick);
    };
    watch = requestAnimationFrame(tick);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(watch);
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, []);

  const clearTimers = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const hoverOpen = (key: NavItem["key"]) => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(key), open ? 0 : 90);
  };
  const hoverClose = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen((cur) => {
          if (cur) document.getElementById(`${baseId}-trigger-${cur}`)?.focus();
          return null;
        });
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [baseId]);

  // Lock page scroll under the mobile drawer
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    document.documentElement.style.overflow = drawer ? "hidden" : "";
    if (drawer) lenis?.stop();
    else lenis?.start();
  }, [drawer]);

  const brand = usePathname()?.startsWith("/new-design") ?? false;
  const nav = navFor(brand);
  const active = nav.find((n) => n.key === open);
  // A solid white bar at the top of the page; as an island it takes the tone underneath; an open mega menu is light.
  // /new-design: the bar is white at every scroll position, whatever section is underneath.
  const tone: "dark" | "light" = brand || open || !scrolled ? "light" : under;
  const lightUi = tone === "light"; // dark text on light glass
  const bubble = lightUi ? "bg-indigo-50" : "bg-white/14";
  const bubbleSpring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 34 };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-indigo-950"
      >
        {d.skip}
      </a>

      <motion.header
        ref={navRef}
        onMouseLeave={hoverClose}
        style={{ "--k": k } as React.CSSProperties}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Main bar: always a floating, rounded glass island; it tightens as the page scrolls */}
        <div className={`px-3 pt-3 sm:pt-4 ${brand ? "sm:px-7" : "sm:px-5"}`}>
        <div
          ref={barRef}
          className={`relative mx-auto ${brand ? "w-[calc(100%-var(--k)*150px)]" : "max-w-[calc(1320px-var(--k)*150px)]"}`}
        >
          {/* Background: translucent glass, light or dark to match the section underneath */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-500 ${
              lightUi
                ? "shadow-[0_1px_0_var(--color-line),0_18px_40px_-22px_rgb(13_15_43/0.45)] ring-1 ring-inset ring-indigo-950/8"
                : "shadow-[0_18px_44px_-20px_rgb(0_0_0/0.6)] ring-1 ring-inset ring-white/12"
            }`}
          >
            <span className={`absolute inset-0 ${brand ? "bg-white" : "bg-white/78"} transition-opacity duration-500 ${lightUi ? "opacity-100" : "opacity-0"}`} />
            <span className={`absolute inset-0 bg-indigo-950/72 transition-opacity duration-500 ${lightUi ? "opacity-0" : "opacity-100"}`} />
            {/* Reading progress along the island's lower edge */}
            <motion.span
              style={{ scaleX: scrollYProgress }}
              className={`absolute inset-x-6 bottom-0 h-[2px] origin-left rounded-full transition-colors duration-500 ${lightUi ? "bg-indigo-500" : "bg-lime"}`}
            />
          </div>

          <div className="relative flex h-[calc(var(--header-h)-var(--k)*10px)] items-center gap-3 pl-4 pr-2.5 sm:pl-5 xl:pl-6">
            <a href="#top" aria-label="Dutch-Bangla Bank home" className="flex shrink-0 items-center leading-none" onClick={close}>
              <Logo light={!lightUi} />
            </a>

            <nav aria-label="Main" className="hidden flex-1 lg:flex lg:justify-center">
              <ul className="flex items-center gap-0.5" onMouseLeave={() => setHoverKey(null)}>
                {nav.map((item) => {
                  const isOpen = open === item.key;
                  // The bubble follows the pointer; with no pointer over the bar it rests on the open item.
                  const showBubble = hoverKey ? hoverKey === item.key : isOpen;
                  return (
                    <li
                      key={item.key}
                      onMouseEnter={() => {
                        hoverOpen(item.key);
                        setHoverKey(item.key);
                      }}
                    >
                      <button
                        id={`${baseId}-trigger-${item.key}`}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${baseId}-panel`}
                        onClick={() => setOpen(isOpen ? null : item.key)}
                        onFocus={() => setHoverKey(item.key)}
                        onBlur={() => setHoverKey(null)}
                        className={`relative isolate inline-flex h-11 items-center gap-1 whitespace-nowrap rounded-full font-semibold transition-colors ${brand ? "px-1.5 text-[0.875rem] xl:px-3.5 xl:text-[0.95rem]" : "px-2.5 text-[0.95rem] xl:px-3.5"} ${
                          lightUi ? (isOpen ? "text-indigo-700" : "text-ink hover:text-indigo-700") : "text-white/90 hover:text-white"
                        }`}
                      >
                        {showBubble && (
                          <motion.span layoutId={`${baseId}-bubble`} transition={bubbleSpring} aria-hidden className={`absolute inset-0 -z-10 rounded-full ${bubble}`} />
                        )}
                        {d.nav[item.key]}
                        <ChevronDown
                          className={`size-4 transition-transform duration-300 ${brand ? "max-xl:hidden" : ""} ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden
                          strokeWidth={2.25}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="ml-auto flex items-center">
              {/* Language switch: folds away as the page scrolls (driven by the same scroll value as the bar) */}
              <div
                aria-hidden={scrolled || undefined}
                className="flex max-w-[calc((1-var(--k))*7rem)] items-center overflow-hidden opacity-[calc(1-var(--k)*1.8)]"
              >
                <button
                  type="button"
                  onClick={toggle}
                  tabIndex={scrolled ? -1 : undefined}
                  aria-label={d.utility.langAria}
                  lang={lang === "en" ? "bn" : "en"}
                  className={`mr-2 inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-semibold transition-colors ${
                    lightUi ? "text-indigo-700 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50" : "text-white ring-1 ring-inset ring-white/35 hover:bg-white/10"
                  }`}
                >
                  <Globe className="hidden size-4 xl:block" aria-hidden />
                  {lang === "en" ? (
                    <>
                      <span className="xl:hidden">বাং</span>
                      <span className="hidden xl:inline">বাংলা</span>
                    </>
                  ) : (
                    "EN"
                  )}
                </button>
              </div>
              {/* Internet Banking: the same fill-sweep hover as every other button */}
              <a
                href={links.ibLogin}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative isolate hidden h-12 items-center overflow-hidden whitespace-nowrap rounded-full text-[0.95rem] font-semibold ring-1 ring-inset transition-colors sm:inline-flex ${
                  lightUi ? "bg-indigo-50/80 text-indigo-950 ring-indigo-100" : "bg-white/10 text-white ring-white/20"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-[3px] left-[3px] -z-10 w-[calc(3rem-6px)] rounded-full transition-[width,background-color] duration-[480ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:w-[calc(100%-6px)] group-focus-visible:w-[calc(100%-6px)] motion-reduce:transition-none ${
                    lightUi ? "bg-indigo-600" : "bg-lime"
                  }`}
                />
                <span
                  aria-hidden
                  className={`grid size-12 shrink-0 place-items-center transition-transform duration-[480ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:translate-x-1 motion-reduce:transition-none ${
                    lightUi ? "text-white" : "text-indigo-950"
                  }`}
                >
                  <Lock className="size-4" strokeWidth={2.4} />
                </span>
                <span
                  className={`pl-1 pr-5 transition-colors duration-300 ${lightUi ? "group-hover:text-white group-focus-visible:text-white" : "group-hover:text-indigo-950 group-focus-visible:text-indigo-950"}`}
                >
                  {/* Full label everywhere except the tight 1024–1279px band, where "Log in" keeps the bar on one line */}
                  <span aria-hidden className="lg:hidden xl:inline">{d.nav.ib}</span>
                  <span aria-hidden className="hidden lg:inline xl:hidden">{d.nav.ibShort}</span>
                  <span className="sr-only">{d.nav.ib} (opens in a new tab)</span>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setDrawer(true)}
                aria-label={d.nav.menu}
                aria-expanded={drawer}
                className={`ml-2 grid size-11 place-items-center rounded-full lg:hidden ${
                  lightUi ?"bg-indigo-50 text-indigo-700" : "bg-white/12 text-white ring-1 ring-inset ring-white/30"
                }`}
              >
                <Menu className="size-5" strokeWidth={2.25} aria-hidden />
              </button>
            </div>
          </div>

          {/* Mega menu panel */}
          <AnimatePresence>
            {active && (
              <motion.div
                id={`${baseId}-panel`}
                key="panel"
                role="region"
                aria-label={d.nav[active.key]}
                initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.45, ease: easeOut }}
                onMouseEnter={clearTimers}
                className="absolute inset-x-0 top-full mt-2 hidden overflow-hidden rounded-[28px] border-t border-line bg-white shadow-[0_30px_60px_-30px_rgb(13_15_43/0.35)] lg:block"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.key}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: easeOut }}
                    className="mx-auto grid max-w-[1360px] grid-cols-[1fr_1fr_1fr_minmax(280px,0.95fr)] gap-10 px-10 pb-10 pt-8"
                  >
                    {active.columns.map((col) => (
                      <div key={col.heading.en}>
                        <h3 className="text-[0.8125rem] font-semibold text-ink-3">{col.heading[lang]}</h3>
                        <ul className="mt-4 space-y-1">
                          {col.links.map((l) => (
                            <li key={l.label.en}>
                              <a
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={close}
                                className="group -mx-3 flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-indigo-50"
                              >
                                <span>
                                  <span className="block font-semibold text-ink group-hover:text-indigo-700">{l.label[lang]}</span>
                                  {l.note && <span className="mt-0.5 block text-sm text-ink-3">{l.note[lang]}</span>}
                                </span>
                                <ArrowUpRight
                                  className="mt-1 size-4 shrink-0 text-indigo-400 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                  aria-hidden
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <a
                      href={active.feature.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className={`group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-2xl p-6 ${featureTone[active.feature.tone]}`}
                    >
                      <FeatureGlyph tone={active.feature.tone} />
                      <span className="relative">
                        <span className="font-display block text-2xl font-semibold leading-tight tracking-[-0.02em]">
                          {active.feature.title[lang]}
                        </span>
                        <span className="mt-2 block max-w-[30ch] text-[0.95rem] opacity-85">{active.feature.body[lang]}</span>
                      </span>
                      <span className="relative mt-6 inline-flex items-center gap-2 font-semibold">
                        {active.feature.cta[lang]}
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      </span>
                    </a>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </motion.header>

      {/* Scrim behind the mega menu */}
      <AnimatePresence>
        {active && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 hidden bg-indigo-950/30 backdrop-blur-[2px] lg:block"
          />
        )}
      </AnimatePresence>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}

/** Walks up from an element to the first solid background and reports whether it is dark. Photos count as dark. */
function isDarkGround(el: Element | undefined): boolean {
  for (let n: Element | null = el ?? null; n; n = n.parentElement) {
    if (n instanceof HTMLImageElement || n instanceof HTMLVideoElement || n instanceof HTMLCanvasElement) return true;
    const bg = getComputedStyle(n).backgroundColor;
    if (!/^rgba?\(/.test(bg)) continue; // translucent tints (color-mix/oklab) are never a section ground
    const m = bg.match(/[\d.]+/g);
    if (!m) continue;
    const [r, g, b, a = 1] = m.map(Number);
    if (a < 0.5) continue;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
  }
  return false;
}

function FeatureGlyph({ tone }: { tone: NavItem["feature"]["tone"] }) {
  const stroke = tone === "lime" ? "rgb(9 11 58 / 0.18)" : "rgb(255 255 255 / 0.2)";
  return (
    <svg viewBox="0 0 200 200" className="pointer-events-none absolute -right-10 -top-10 size-52 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-12" aria-hidden>
      {[30, 55, 80].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={stroke} strokeWidth="1.5" />
      ))}
      <circle cx="180" cy="100" r="6" fill={stroke} />
    </svg>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { d, lang, toggle } = useLang();
  const reduce = useReduce();
  const [section, setSection] = useState<NavItem["key"] | null>(null);
  const nav = navFor(usePathname()?.startsWith("/new-design") ?? false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={d.nav.menu}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-white lg:hidden"
        >
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-5">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={d.nav.close}
              className="grid size-11 place-items-center rounded-full bg-indigo-50 text-indigo-700"
            >
              <X className="size-5" strokeWidth={2.25} aria-hidden />
            </button>
          </div>

          <div className="px-5 pb-4">
            <a
              href={links.ibLogin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-indigo-600 text-lg font-semibold text-white"
            >
              <Lock className="size-5" aria-hidden />
              {d.nav.ib}
            </a>
          </div>

          <nav aria-label="Main" className="flex-1 px-5">
            <ul className="divide-y divide-line border-y border-line">
              {nav.map((item) => {
                const isOpen = section === item.key;
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setSection(isOpen ? null : item.key)}
                      className="font-display flex w-full items-center justify-between py-4 text-left text-2xl font-semibold tracking-[-0.02em] text-ink"
                    >
                      {d.nav[item.key]}
                      <ChevronDown className={`size-5 text-indigo-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: easeOut }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-5 pb-6">
                            {item.columns.map((col) => (
                              <div key={col.heading.en}>
                                <p className="text-sm font-semibold text-ink-3">{col.heading[lang]}</p>
                                <ul className="mt-1.5">
                                  {col.links.map((l) => (
                                    <li key={l.label.en}>
                                      <a
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex min-h-11 items-center justify-between gap-3 py-1.5 font-medium text-ink"
                                      >
                                        {l.label[lang]}
                                        <ArrowUpRight className="size-4 shrink-0 text-indigo-400" aria-hidden />
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6 grid grid-cols-2 gap-3 px-5 pb-8">
            <a href={`tel:${phone.hotline}`} className="flex min-h-14 items-center gap-2 rounded-2xl bg-paper px-4 font-semibold text-ink">
              <Phone className="size-4 text-indigo-600" aria-hidden /> 16216
            </a>
            <a href={links.atmLocator} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center gap-2 rounded-2xl bg-paper px-4 font-semibold text-ink">
              <MapPin className="size-4 text-indigo-600" aria-hidden /> {d.utility.locate}
            </a>
            <button
              type="button"
              onClick={toggle}
              className="col-span-2 flex min-h-14 items-center justify-center gap-2 rounded-2xl ring-1 ring-inset ring-indigo-200 font-semibold text-indigo-700"
            >
              <Globe className="size-4" aria-hidden /> {d.utility.langLabel}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
