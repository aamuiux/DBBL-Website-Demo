"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader2, Play } from "lucide-react";
import { YoutubeIcon } from "./SocialIcons";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Button, Reveal, useReduce } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
// At rest the card and headline are centred in the space below the floating header, not in the raw viewport;
// the card eases back to true centre as it opens to full screen.
const restOffset = () => Math.max(0, Math.min(24, (window.innerHeight - 700) / 4));
const MQ = "(min-width: 1024px) and (min-height: 640px) and (pointer: fine)";
function subscribeMq(cb: () => void) {
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Choreographed like City Bank's "Trusted Bank for Three Generations":
 *  1. Light section: the story sits bottom-left; DBBL's TV commercial plays muted in a panel anchored
 *     bottom-right, running off the edges, with a rounded leading corner and a play button.
 *  2. Pinned scroll grows the panel until the film fills the whole screen, sliding over the text.
 *  3. Play restarts the film from the top with sound and native controls.
 * Touch, narrow screens and reduced motion get a static layout: copy, then a full-width film.
 */
export function VideoStory() {
  const { d } = useLang();
  const reduce = useReduce();
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"preview" | "playing">("preview");
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const wide = useSyncExternalStore(subscribeMq, () => window.matchMedia(MQ).matches, () => false);
  const pinned = wide && !reduce;

  // Muted preview only runs while the section is on screen (the file is 21 MB; nothing loads before then).
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (mode === "playing") return;
        if (e.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, mode, pinned]);

  // The open: a card-shaped frame between the two halves of the headline becomes the whole screen.
  useIsoLayoutEffect(() => {
    const el = sectionRef.current;
    const panel = panelRef.current;
    if (!pinned || !el || !panel) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.3}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(q("[data-word-a]"), { xPercent: 0, autoAlpha: 1 }, { xPercent: -70, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 0)
        .fromTo(q("[data-word-b]"), { xPercent: 0, autoAlpha: 1 }, { xPercent: 70, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 0)
        .fromTo(q("[data-under]"), { y: 0, autoAlpha: 1 }, { y: 40, autoAlpha: 0, duration: 0.3 }, 0)
        .fromTo(
          panel,
          { xPercent: -50, yPercent: -50, x: 0, y: () => restOffset(), width: "30vw", height: () => (window.innerWidth * 0.3) / 1.586, borderRadius: 24, rotate: -4 },
          { xPercent: -50, yPercent: -50, x: 0, y: 0, width: "100vw", height: () => window.innerHeight, borderRadius: 0, rotate: 0, duration: 1, ease: "power2.inOut" },
          0,
        )
        .fromTo(q("[data-chip]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, 0.05);
    }, el);
    return () => ctx.revert();
  }, [pinned]);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setMode("playing");
    setState("loading");
    v.muted = false;
    v.loop = false;
    v.currentTime = 0;
    v.play()
      .then(() => setState("ready"))
      .catch(() => setState("ready"));
  };

  const film = (
    <>
      <video
        ref={videoRef}
        // The commercial is letterboxed (~2.35:1 inside 16:9); the muted preview zooms past the bars, playback shows the full frame.
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] ${
          mode === "preview" ? "scale-[1.34]" : "scale-100"
        }`}
        poster={links.tvAdPoster}
        muted
        loop
        playsInline
        preload="none"
        controls={mode === "playing"}
        aria-label={d.video.title}
        onCanPlay={() => mode === "playing" && setState("ready")}
        onWaiting={() => mode === "playing" && setState("loading")}
        onPlaying={() => mode === "playing" && setState("ready")}
        onPause={() => {
          if (mode === "playing" && videoRef.current?.ended) {
            setMode("preview");
            setState("idle");
          }
        }}
        onEnded={() => {
          const v = videoRef.current;
          if (!v) return;
          v.muted = true;
          v.loop = true;
          setMode("preview");
          setState("idle");
          v.play().catch(() => undefined);
        }}
        onError={() => setState("error")}
      >
        <source src={links.tvAd} type="video/webm" onError={() => setState("error")} />
      </video>

      {mode === "preview" && state !== "error" && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(9_11_58/0.15),rgb(9_11_58/0.5))]" />
          <button
            type="button"
            onClick={play}
            className="group absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 text-white"
          >
            <span className="relative grid size-20 place-items-center rounded-full bg-white/15 ring-2 ring-white/80 backdrop-blur-md transition-[background-color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:bg-lime group-hover:text-indigo-950">
              <Play className="size-7 translate-x-0.5" fill="currentColor" aria-hidden />
            </span>
            <span className="rounded-full bg-indigo-950/60 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">{d.video.play}</span>
          </button>
        </>
      )}

      {mode === "playing" && state === "loading" && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center" role="status">
          <Loader2 className="size-10 animate-spin text-lime" aria-hidden />
          <span className="sr-only">{d.video.loading}</span>
        </div>
      )}

      {state === "error" && (
        <div className="absolute inset-0 grid place-items-center bg-indigo-950 p-8 text-center text-white" role="alert">
          <div>
            <p className="max-w-md text-lg text-indigo-100">{d.video.error}</p>
            <Button href={links.youtube} tone="lime" className="mt-6" icon={YoutubeIcon}>
              {d.video.youtube}
            </Button>
          </div>
        </div>
      )}
    </>
  );

  const copy = (
    <>
      <h2 id={`${id}-h`} className="font-display text-balance text-[clamp(2.4rem,4.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
        {d.video.title}
      </h2>
      <p className="mt-5 max-w-[40ch] text-pretty text-lg text-ink-2">{d.video.body}</p>
      <div className="mt-8">
        <Button href={links.eBankingIntro} tone="primary" size="lg">
          {d.video.learn}
        </Button>
      </div>
    </>
  );

  /* ───────────── Pinned choreography (desktop, fine pointer) ───────────── */
  if (pinned) {
    return (
      <section ref={sectionRef} aria-labelledby={`${id}-h`} className="relative h-[100svh] overflow-hidden bg-paper">
        <h2 id={`${id}-h`} className="sr-only">
          {d.video.title}
        </h2>

        {/* Headline split around the card-shaped frame */}
        <div aria-hidden className="absolute inset-x-0 top-[calc(50%+clamp(0px,(100svh-700px)/4,24px))] flex -translate-y-1/2 items-center px-6 xl:px-10">
          <p data-word-a className="font-display flex-1 text-right text-[clamp(2.6rem,5.2vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
            {d.video.titleA}
          </p>
          <span className="w-[calc(30vw+5rem)] shrink-0" />
          <p data-word-b className="font-display flex-1 text-[clamp(2.6rem,5.2vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-indigo-600">
            {d.video.titleB}
          </p>
        </div>

        <div data-under className="absolute inset-x-0 bottom-[7vh] flex flex-col items-center gap-5 px-6 text-center">
          <p className="max-w-[52ch] text-pretty text-lg text-ink-2">{d.video.body}</p>
          <Button href={links.eBankingIntro} tone="primary" size="lg">
            {d.video.learn}
          </Button>
        </div>

        {/* The frame: a card at rest, the screen when open */}
        <div
          ref={panelRef}
          className="on-dark absolute left-1/2 top-1/2 h-[calc(30vw/1.586)] w-[30vw] overflow-hidden rounded-3xl bg-indigo-950 shadow-[var(--shadow-float)] will-change-[width,height]"
        >
          {film}
          <div data-chip aria-hidden className="pointer-events-none absolute left-[6%] top-[9%] flex items-center gap-3">
            <span className="block h-[2.4vw] w-[3.2vw] rounded-md bg-[linear-gradient(135deg,var(--k-gold-a),var(--k-gold-c))] shadow-sm" />
            <span className="font-display text-[1.05vw] font-bold text-white drop-shadow">Dutch-Bangla Bank</span>
          </div>
        </div>
      </section>
    );
  }

  /* ───────────── Static layout (touch, narrow, reduced motion, first paint) ───────────── */
  return (
    <section ref={sectionRef} aria-labelledby={`${id}-h`} className="bg-paper pt-24 md:pt-32">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 xl:px-10">
        <Reveal className="max-w-2xl">{copy}</Reveal>
      </div>
      <div ref={panelRef} className="on-dark relative mt-12 aspect-[4/5] w-full overflow-hidden bg-indigo-950 sm:aspect-video">
        {film}
      </div>
    </section>
  );
}
