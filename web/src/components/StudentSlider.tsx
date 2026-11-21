"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { animate, motion, useMotionValue, useScroll, useTransform, type AnimationPlaybackControls, type MotionValue } from "motion/react";
import { useLang } from "@/lib/i18n";
import { useReduce } from "./ui";

/**
 * A student's day with their own account: each moment is a real School Savers feature
 * (savings account, free SMS alerts, free debit card, internet banking, interest).
 * Unsplash stand-ins, marked for replacement.
 */
const slides = [
  { photo: "photo-1789579703472-5ff8acb17a41", focus: "50% 50%", when: { en: "7:30 am", bn: "সকাল ৭:৩০" }, t: { en: "Pocket money, saved", bn: "হাতখরচের টাকা, জমা" } },
  { photo: "photo-1741580298757-9d9b78e63c8d", focus: "50% 40%", when: { en: "8:10 am", bn: "সকাল ৮:১০" }, t: { en: "An SMS for every taka", bn: "প্রতিটি টাকার এসএমএস" } },
  { photo: "photo-1697465381336-a3e93c5b97b2", focus: "60% 50%", when: { en: "2:00 pm", bn: "দুপুর ২:০০" }, t: { en: "New books, own savings", bn: "নিজের সঞ্চয়ে নতুন বই" } },
  { photo: "photo-1771527355678-49c169623a58", focus: "55% 60%", when: { en: "4:30 pm", bn: "বিকেল ৪:৩০" }, t: { en: "Cash from a DBBL ATM, with your own card", bn: "নিজের কার্ডে ডিবিবিএল এটিএম থেকে টাকা" } },
  { photo: "photo-1660982741734-5a7d2730ff28", focus: "45% 50%", when: { en: "9:00 pm", bn: "রাত ৯:০০" }, t: { en: "Balance checked online", bn: "অনলাইনে ব্যালেন্স দেখা" } },
  { photo: "photo-1773702787707-d7a790aa9f5e", focus: "30% 50%", when: { en: "Month end", bn: "মাস শেষে" }, t: { en: "Savings that earn interest", bn: "সঞ্চয়ে সুদ" } },
];

const GAP = 16;
const DRIFT = 0.32; // how far an image slides inside its frame, as a share of the frame width
const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * An endless strip of tall photo frames. Drag it, swipe it sideways on a trackpad, or focus it and use the
 * arrow keys; it glides and settles on a frame. Each photo drifts against the motion inside its frame, and
 * the page scroll nudges the whole strip. Reduced motion: no glide, no drift, no scroll nudge.
 */
export function StudentSlider({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const { lang } = useLang();
  const reduce = useReduce();
  const boxRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(600);
  const [moving, setMoving] = useState(false);
  const slideW = cw < 520 ? 168 : cw < 620 ? 216 : 240;
  const slideH = Math.round((slideW * 16) / 10);
  const step = slideW + GAP;
  const total = step * slides.length;

  const x = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const nudge = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [140, -140]);
  const pos = useTransform(() => x.get() + nudge.get());

  const anim = useRef<AnimationPlaybackControls | null>(null);
  const goal = useRef(0);
  const settle = (target: number, velocity = 0) => {
    anim.current?.stop();
    goal.current = target;
    setMoving(true);
    anim.current = animate(x, target, {
      ...(reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 26, velocity }),
      onComplete: () => setMoving(false),
    });
  };
  const snap = (v: number) => Math.round(v / step) * step;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setCw(Math.round(e.contentRect.width)));
    ro.observe(el);

    // Sideways trackpad / shift-wheel moves the strip; ordinary vertical scrolling still scrolls the page.
    let idle: number | undefined;
    const onWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      anim.current?.stop();
      setMoving(true);
      x.set(x.get() - dx);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => settle(snap(x.get())), 140);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(idle);
    };
    // settle/snap only read refs and the current step
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, reduce]);

  // Pointer drag with release velocity
  const drag = useRef({ on: false, startX: 0, start: 0, lastX: 0, lastT: 0, v: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    anim.current?.stop();
    drag.current = { on: true, startX: e.clientX, start: x.get(), lastX: e.clientX, lastT: performance.now(), v: 0 };
    setMoving(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.on) return;
    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    d.v = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.v;
    d.lastX = e.clientX;
    d.lastT = now;
    x.set(d.start + (e.clientX - d.startX));
  };
  const onPointerUp = () => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    // Throw: project the release velocity ~300ms ahead, then settle on the nearest frame.
    settle(snap(x.get() + d.v * 300), d.v * 1000);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    // Repeated presses stack up from where the strip is heading, not where it is mid-glide.
    const from = moving ? goal.current : snap(x.get());
    settle(from + (e.key === "ArrowLeft" ? step : -step));
  };

  return (
    <div
      ref={boxRef}
      tabIndex={0}
      role="region"
      aria-roledescription={lang === "bn" ? "স্লাইডার" : "slider"}
      aria-label={lang === "bn" ? "স্কুল সেভার্স নিয়ে একটি দিন (টেনে বা তীর চিহ্ন দিয়ে সরাও)" : "A day with School Savers (drag or use the arrow keys)"}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      className="relative w-full cursor-grab touch-pan-y select-none rounded-3xl outline-offset-4 active:cursor-grabbing [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      style={{ height: slideH + 52 }}
    >
      <ul className="absolute inset-0">
        {slides.map((s, i) => (
          <Slide
            key={s.photo}
            i={i}
            pos={pos}
            step={step}
            total={total}
            w={slideW}
            h={slideH}
            cw={cw}
            reduce={reduce}
            moving={moving}
            photo={s.photo}
            focus={s.focus}
            when={s.when[lang]}
            title={s.t[lang]}
          />
        ))}
      </ul>
    </div>
  );
}

function Slide({
  i,
  pos,
  step,
  total,
  w,
  h,
  cw,
  reduce,
  moving,
  photo,
  focus,
  when,
  title,
}: {
  i: number;
  pos: MotionValue<number>;
  step: number;
  total: number;
  w: number;
  h: number;
  cw: number;
  reduce: boolean;
  moving: boolean;
  photo: string;
  focus: string;
  when: string;
  title: string;
}) {
  // Place on the endless loop, starting a little in from the left edge.
  const left = useTransform(pos, (p) => wrap(-step, total - step, i * step + p + 24));
  // The photo drifts against the strip: frames right of centre show the photo's left side, and vice versa.
  const drift = useTransform(left, (l) => (reduce ? 0 : (-((l + w / 2 - cw / 2) / cw) * w * DRIFT)));

  return (
    <motion.li style={{ x: left, width: w }} className="group absolute left-0 top-0">
      <div className="relative overflow-hidden rounded-3xl bg-indigo-950/10 shadow-[0_24px_50px_-24px_rgb(9_11_58/0.55)]" style={{ height: h }}>
        <motion.div style={{ x: drift }} className="absolute inset-y-0 -left-[30%] -right-[30%]">
          <Image
            src={`https://images.unsplash.com/${photo}?w=1000&q=80&auto=format`}
            alt=""
            fill
            loading="eager"
            draggable={false}
            sizes="(min-width:520px) 400px, 280px"
            quality={70}
            className="pointer-events-none object-cover saturate-[1.2] contrast-[1.04]"
            style={{ objectPosition: focus }}
          />
        </motion.div>
        <span className="font-display tabular absolute left-3 top-3 rounded-full bg-lime px-3 py-1.5 text-sm font-bold text-indigo-950">{when}</span>
      </div>
      <p
        className={`font-display mt-3 px-1 text-lg font-semibold leading-tight tracking-[-0.015em] transition-opacity duration-300 [@media(hover:none)]:opacity-100 ${
          moving ? "opacity-0" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {title}
      </p>
    </motion.li>
  );
}
