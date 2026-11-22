"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const MIN_MS = 1100; // long enough to read as a deliberate moment, short enough not to be a wait
const MAX_MS = 5000; // never hold the page hostage to a slow asset

/**
 * Full-screen intro: DBBL's mark (the client-supplied SVG already used in the header) rises in over deep indigo,
 * with a lime progress line. It lifts away once the page has loaded and at least MIN_MS has passed.
 * It is part of the server HTML, so it covers the first paint. Page scroll is locked while it shows.
 */
export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t0 = performance.now();
    const root = document.documentElement;
    root.style.overflow = "hidden";
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - t0));
      window.setTimeout(() => {
        root.style.overflow = "";
        setShow(false);
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = window.setTimeout(finish, MAX_MS);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(cap);
      root.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          className="on-dark fixed inset-0 z-[200] grid place-items-center bg-indigo-950 text-white"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <span className="sr-only">Loading Dutch-Bangla Bank</span>
          <div className="relative flex flex-col items-center">
            <span aria-hidden className="absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgb(106_112_201/0.35),transparent_65%)] motion-safe:animate-pulse" />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- a small static SVG; no optimisation needed */}
              <img src="/dbbl-mark.svg" alt="" width={174} height={108} className="h-24 w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] sm:h-28" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display relative mt-6 text-xl font-bold tracking-[-0.02em]"
            >
              Dutch-Bangla Bank
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="relative mt-1 text-sm text-indigo-200"
            >
              Your Trusted Partner
            </motion.p>
            <span aria-hidden className="relative mt-8 block h-[3px] w-40 overflow-hidden rounded-full bg-white/15">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-lime"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: MIN_MS / 1000, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
