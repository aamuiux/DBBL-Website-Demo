"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Newspaper, Play, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { billboards, tvAds } from "@/lib/content";
import { Button, Reveal, useReduce } from "./ui";

/** Media: DBBL's own TV commercials (play in a full-screen dialog) and its billboard series. */
export function Media() {
  const { lang } = useLang();
  const reduce = useReduce();
  const id = useId();
  const bn = lang === "bn";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState<(typeof tvAds)[number] | null>(null);
  const [failed, setFailed] = useState(false);

  const open = (ad: (typeof tvAds)[number]) => {
    setFailed(false);
    setCurrent(ad);
    dialogRef.current?.showModal();
  };
  const close = () => {
    videoRef.current?.pause();
    dialogRef.current?.close();
  };

  useEffect(() => {
    if (current) videoRef.current?.play().catch(() => undefined);
  }, [current]);

  return (
    <section id="media" aria-labelledby={`${id}-h`} className="on-dark relative overflow-hidden bg-indigo-950 py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 id={`${id}-h`} className="font-display max-w-[16ch] text-balance text-[clamp(2.4rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              {bn ? (
                <>
                  টিভিতে, রাস্তায়, <span className="text-lime">খবরে।</span>
                </>
              ) : (
                <>
                  On TV, on the street, <span className="text-lime">in the news.</span>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="flex flex-wrap gap-2">
            {[
              { href: links.allTvAds, label: bn ? "সব টিভি বিজ্ঞাপন" : "All TV ads" },
              { href: links.allBillboards, label: bn ? "সব বিলবোর্ড" : "All billboards" },
              { href: links.allPrintAds, label: bn ? "প্রিন্ট বিজ্ঞাপন" : "Print ads" },
            ].map((l) => (
              <Button key={l.href} href={l.href} tone="ghost-dark" size="sm">
                {l.label}
              </Button>
            ))}
          </Reveal>
        </div>
      </div>

      {/* TV commercials: tilted poster rail */}
      <ul className="no-scrollbar mt-14 flex gap-5 overflow-x-auto px-5 pb-6 pt-2 sm:px-6 xl:px-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))]">
        {tvAds.map((ad, i) => (
          <motion.li
            key={ad.id}
            initial={reduce ? false : { opacity: 0, y: 50, rotate: i % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
            whileHover={reduce ? undefined : { rotate: 0, scale: 1.03 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 180, damping: 18, delay: i * 0.05 }}
            className="shrink-0"
          >
            <button
              type="button"
              onClick={() => open(ad)}
              className="group relative block aspect-[1259/680] w-[min(26rem,78vw)] overflow-hidden rounded-3xl bg-indigo-900 text-left"
              aria-label={`${bn ? "টিভি বিজ্ঞাপন চালান" : "Play TV commercial"} ${i + 1}`}
            >
              <Image src={ad.poster} alt="" fill sizes="26rem" quality={70} className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(9_11_58/0.7),transparent_55%)]" />
              <span className="absolute bottom-4 left-4 grid size-14 place-items-center rounded-full bg-lime text-indigo-950 transition-transform duration-500 group-hover:scale-110">
                <Play className="size-5 translate-x-0.5" fill="currentColor" aria-hidden />
              </span>
              <span className="absolute bottom-6 left-22 text-sm font-semibold">{bn ? "টিভি বিজ্ঞাপন" : "TV commercial"}</span>
            </button>
          </motion.li>
        ))}
      </ul>

      {/* Billboards: a pasted-up wall */}
      <div className="mx-auto mt-14 max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{bn ? "আমাদের বিলবোর্ড" : "Our billboards"}</h3>
          <a
            href={links.newsroom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime"
          >
            <Newspaper className="size-4" aria-hidden /> {bn ? "নিউজ রুম" : "News room"}
          </a>
        </div>
        {/* Five portrait boards in one row (a swipe rail on small screens) */}
        <ul className="no-scrollbar -mx-5 mt-6 flex gap-4 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {billboards.slice(0, 5).map((src, i) => (
            <motion.li
              key={src}
              initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: [-3, 2, -2, 3, -1][i] }}
              whileInView={{ opacity: 1, scale: 1, rotate: [-1.5, 1, -1, 1.5, -0.5][i] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 160, damping: 16, delay: i * 0.05 }}
              className="w-[46vw] max-w-[15rem] shrink-0 overflow-hidden rounded-2xl bg-white/5 lg:w-auto lg:max-w-none"
            >
              <a href={links.allBillboards} target="_blank" rel="noopener noreferrer" className="block">
                <Image
                  src={src}
                  alt={bn ? `ডিবিবিএল বিলবোর্ড ${i + 1}` : `DBBL billboard ${i + 1}`}
                  width={683}
                  height={1024}
                  sizes="(min-width:1024px) 20vw, 46vw"
                  quality={70}
                  className="aspect-[2/3] h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* The one landscape board gets its own row, paired with what it advertises */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
          <a href={links.allBillboards} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl bg-white/5">
            <Image
              src={billboards[5]}
              alt={bn ? "ডিবিবিএল মোবাইল ব্যাংকিং বিলবোর্ড: *৩২২#" : "DBBL mobile banking billboard: *322#"}
              width={1199}
              height={663}
              sizes="(min-width:1024px) 60vw, 100vw"
              quality={75}
              className="h-auto w-full transition-transform duration-700 hover:scale-[1.02]"
            />
          </a>
          <a href="#rocket" className="group flex flex-col justify-between rounded-2xl bg-rocket p-7 text-white">
            <p className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tracking-[-0.04em] text-sun">*322#</p>
            <ol className="mt-6 space-y-3">
              {(bn
                ? ["যেকোনো ফোনে *৩২২# ডায়াল করুন", "সেবা বেছে নিন: টাকা পাঠানো, ক্যাশ আউট, বিল", "পিন দিয়ে নিশ্চিত করুন"]
                : ["Dial *322# on any phone", "Pick a service: send money, cash out, pay a bill", "Confirm with your PIN"]
              ).map((t, i) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="tabular grid size-7 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-rocket">{i + 1}</span>
                  <span className="pt-0.5 font-medium">{t}</span>
                </li>
              ))}
            </ol>
            <p className="mt-7 flex items-center gap-2 font-semibold">
              {bn ? "রকেট সম্পর্কে দেখুন" : "See Rocket"}
              <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </p>
          </a>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => videoRef.current?.pause()}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(72rem,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-indigo-950/90 backdrop:backdrop-blur-sm"
        aria-label={bn ? "টিভি বিজ্ঞাপন" : "TV commercial"}
      >
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-float)]">
          {current && !failed && (
            <video ref={videoRef} key={current.id} className="h-full w-full" controls playsInline poster={current.poster} onError={() => setFailed(true)}>
              <source src={current.src} type="video/webm" onError={() => setFailed(true)} />
            </video>
          )}
          {failed && (
            <div className="grid h-full place-items-center p-8 text-center text-indigo-100">
              <p>{bn ? "ভিডিওটি লোড হয়নি। ডিবিবিএলের সাইটে দেখুন।" : "This video couldn't load. Watch it on DBBL's site instead."}</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={close}
          autoFocus
          aria-label={bn ? "বন্ধ করুন" : "Close"}
          className="absolute -top-14 right-0 grid size-11 place-items-center rounded-full bg-white text-indigo-950 hover:bg-lime"
        >
          <X className="size-5" aria-hidden />
        </button>
      </dialog>
    </section>
  );
}
