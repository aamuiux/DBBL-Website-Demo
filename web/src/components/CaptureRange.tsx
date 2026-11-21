"use client";

import { useEffect } from "react";

/** Review helper: `?still&from=<section id>&to=<section id>` hides every <main> section outside that range
 *  (header and footer stay), so full-page review captures of a long page stay under browser size limits.
 *  Does nothing without those params. */
export function CaptureRange() {
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const from = p.get("from");
    const to = p.get("to");
    if (!from && !to) return;
    const main = document.getElementById("main");
    if (!main) return;
    const kids = [...main.children] as HTMLElement[];
    const idx = (id: string | null, fallback: number) => {
      if (!id) return fallback;
      const i = kids.findIndex((k) => k.id === id || k.querySelector(`#${CSS.escape(id)}`));
      return i < 0 ? fallback : i;
    };
    const a = idx(from, 0);
    const b = idx(to, kids.length - 1);
    kids.forEach((k, i) => {
      if (i < a || i > b) k.style.display = "none";
    });
    if (p.has("nofooter")) document.querySelector("footer")?.setAttribute("style", "display:none");
  }, []);
  return null;
}
