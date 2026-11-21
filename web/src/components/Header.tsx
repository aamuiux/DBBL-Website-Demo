"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Globe, MapPin, Menu, Phone, Search, X, ArrowUpRight, Lock } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n";
import { nav, type NavItem } from "@/lib/nav";
import { links, phone } from "@/lib/links";
import { easeOut, useReduce } from "./ui";

const segmentHrefs = [links.personalAccounts, links.vip, links.smeLenden, links.corporate, links.offshore];

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
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<NavItem["key"] | null>(null);
  const [drawer, setDrawer] = useState(false);
  const lastY = useRef(0);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  // Intelligent header: solid after the hero starts scrolling, hides on the way down, returns on the way up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const goingDown = y > lastY.current;
      if (y > 480 && goingDown && Math.abs(y - lastY.current) > 4) setHidden(true);
      else if (!goingDown) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  const solid = scrolled || open !== null;
  const active = nav.find((n) => n.key === open);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-indigo-950"
      >
        {d.skip}
      </a>

      <header
        ref={navRef}
        onMouseLeave={hoverClose}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !drawer && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Mobile: the concept label stays visible in the first viewport */}
        <div
          className={`overflow-hidden bg-lime text-center text-xs font-bold text-indigo-950 transition-[max-height] duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
            scrolled ? "max-h-0" : "max-h-7"
          }`}
        >
          <p className="flex h-7 items-center justify-center px-4">{d.conceptNote}</p>
        </div>

        {/* Utility bar: segments, hotline, locator, language */}
        <div
          className={`on-dark hidden overflow-hidden bg-indigo-950 text-[0.8125rem] text-indigo-200 transition-[max-height] duration-500 ease-[var(--ease-out-expo)] lg:block ${
            scrolled ? "max-h-0" : "max-h-10"
          }`}
        >
          <div className="mx-auto flex h-10 max-w-[1360px] items-center justify-between px-6 xl:px-10">
            <nav aria-label="Customer segments">
              <ul className="flex items-center gap-1">
                {d.utility.segments.map((seg, i) => (
                  <li key={seg}>
                    <a
                      href={segmentHrefs[i]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-white ${i === 0 ? "text-white" : ""}`}
                    >
                      {seg}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-5">
              <span className="rounded-full bg-lime px-2.5 py-0.5 text-xs font-bold text-indigo-950">{d.conceptNote}</span>
              <a href={`tel:${phone.hotline}`} className="inline-flex items-center gap-1.5 hover:text-white">
                <Phone className="size-3.5" aria-hidden />
                <span>{d.utility.hotline}</span>
                <span className="tabular font-semibold text-white">16216</span>
              </a>
              <a href={links.atmLocator} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                <MapPin className="size-3.5" aria-hidden />
                {d.utility.locate}
              </a>
              <button
                type="button"
                onClick={toggle}
                aria-label={d.utility.langAria}
                lang={lang === "en" ? "bn" : "en"}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold text-white ring-1 ring-white/25 hover:bg-white/10"
              >
                <Globe className="size-3.5" aria-hidden />
                {d.utility.langLabel}
              </button>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`relative transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            solid ? "bg-white/92 shadow-[0_1px_0_var(--color-line),0_10px_30px_-18px_rgb(13_15_43/0.35)] backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-[var(--header-h)] max-w-[1360px] items-center gap-6 px-5 sm:px-6 xl:px-10">
            <a href="#top" aria-label="Dutch-Bangla Bank home" className="shrink-0" onClick={close}>
              <Logo light={!solid} />
            </a>

            <nav aria-label="Main" className="hidden flex-1 lg:block xl:ml-4">
              <ul className="flex items-center gap-0.5">
                <li onMouseEnter={hoverClose}>
                  <a
                    href="#offers"
                    onClick={close}
                    className={`relative inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[0.95rem] font-semibold transition-colors xl:px-3.5 ${
                      solid ? "text-ink hover:bg-indigo-50 hover:text-indigo-700" : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="relative flex size-2" aria-hidden>
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-600 opacity-70 motion-reduce:hidden" />
                      <span className="relative inline-flex size-2 rounded-full bg-red-600" />
                    </span>
                    {d.nav.offers}
                  </a>
                </li>
                {nav.map((item) => {
                  const isOpen = open === item.key;
                  return (
                    <li key={item.key} onMouseEnter={() => hoverOpen(item.key)}>
                      <button
                        id={`${baseId}-trigger-${item.key}`}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${baseId}-panel`}
                        onClick={() => setOpen(isOpen ? null : item.key)}
                        className={`relative inline-flex h-11 items-center gap-1 whitespace-nowrap rounded-full px-2.5 text-[0.95rem] font-semibold transition-colors xl:px-3.5 ${
                          solid
                            ? isOpen
                              ? "bg-indigo-50 text-indigo-700"
                              : "text-ink hover:bg-indigo-50 hover:text-indigo-700"
                            : isOpen
                              ? "bg-white/15 text-white"
                              : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {d.nav[item.key]}
                        <ChevronDown
                          className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden
                          strokeWidth={2.25}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label={d.utility.langAria}
                className={`inline-flex h-11 items-center rounded-full px-3 text-sm font-semibold lg:hidden ${
                  solid ? "text-indigo-700 ring-1 ring-inset ring-indigo-200" : "text-white ring-1 ring-inset ring-white/35"
                }`}
              >
                {lang === "en" ? "বাং" : "EN"}
              </button>
              <a
                href={links.faq}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={d.nav.search}
                className={`hidden size-11 place-items-center rounded-full transition-colors sm:grid lg:hidden xl:grid ${
                  solid ? "text-ink hover:bg-indigo-50" : "text-white hover:bg-white/10"
                }`}
              >
                <Search className="size-[1.15rem]" strokeWidth={2.25} aria-hidden />
              </a>
              <a
                href={links.ibLogin}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden h-11 items-center gap-2 whitespace-nowrap rounded-full pl-4 pr-5 text-[0.95rem] font-semibold transition-colors sm:inline-flex ${
                  solid ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-lime text-indigo-950 hover:bg-lime-dark"
                }`}
              >
                <Lock className="size-4" strokeWidth={2.25} aria-hidden />
                {/* Full label everywhere except the tight 1024–1279px band, where "Log in" keeps the bar on one line */}
                <span aria-hidden className="lg:hidden xl:inline">{d.nav.ib}</span>
                <span aria-hidden className="hidden lg:inline xl:hidden">{d.nav.ibShort}</span>
                <span className="sr-only">{d.nav.ib} (opens in a new tab)</span>
              </a>
              <button
                type="button"
                onClick={() => setDrawer(true)}
                aria-label={d.nav.menu}
                aria-expanded={drawer}
                className={`grid size-11 place-items-center rounded-full lg:hidden ${
                  solid ? "bg-indigo-50 text-indigo-700" : "bg-white/12 text-white ring-1 ring-inset ring-white/30"
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
                className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_30px_60px_-30px_rgb(13_15_43/0.35)] lg:block"
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
      </header>

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
              <li>
                <a
                  href="#offers"
                  onClick={onClose}
                  className="font-display flex w-full items-center gap-3 py-4 text-2xl font-semibold tracking-[-0.02em] text-ink"
                >
                  <span className="size-2.5 rounded-full bg-red-600" aria-hidden />
                  {d.nav.offers}
                </a>
              </li>
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
