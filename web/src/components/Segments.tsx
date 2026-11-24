"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { ArrowUpRight, Building2, Crown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links } from "@/lib/links";
import { Reveal, SectionHeading } from "./ui";
import { Pattern } from "./Patterns";

export function Segments() {
  const { d } = useLang();
  const id = useId();
  const it = d.segments.items;
  const brand = usePathname()?.startsWith("/new-design") ?? false;

  return (
    <section aria-labelledby={`${id}-h`} className="mx-auto max-w-[1360px] px-5 py-24 sm:px-6 md:py-32 xl:px-10">
      <SectionHeading id={`${id}-h`} title={d.segments.title} />

      <div className="mt-12 grid auto-rows-[minmax(15rem,auto)] gap-4 md:grid-cols-6 lg:grid-cols-12">
        {/* Personal: photographic, the widest tile */}
        <Reveal className="md:col-span-6 lg:col-span-7 lg:row-span-2">
          <Tile href={links.personalAccounts} label={it.personal.name} className={`text-indigo-950 lg:min-h-full ${brand ? "min-h-[32rem]" : "min-h-[24rem]"}`}>
            <PersonalPhoto />
            <TileCopy name={it.personal.name} body={it.personal.body} cta={d.segments.cta} big dark narrow={brand} />
          </Tile>
        </Reveal>

        {/* VIP */}
        <Reveal delay={0.06} className="md:col-span-3 lg:col-span-5">
          <Tile href={links.vip} label={it.vip.name} className={brand ? "bg-[#0b0a08] text-white" : "bg-indigo-950 text-white"}>
            {brand && (
              <>
                {/* Black to elite gold: a dark base with a sweeping golden glow from the lower right, like the Nexus card */}
                <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#050505_0%,#14110b_45%,#5a4420_78%,#c9a24d_100%)]" />
                <span aria-hidden className="absolute -bottom-24 -right-20 -z-10 size-80 rounded-full bg-[radial-gradient(circle,rgb(240_208_130/0.45),transparent_65%)] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110" />
                <span aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,#e8c875,transparent)]" />
              </>
            )}
            <Pattern variant="waves" className={brand ? "text-[#e8c875]/[0.12]" : "text-lime/[0.10]"} />
            <Crown className={`relative size-8 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-12 ${brand ? "text-[#e8c875]" : "text-lime"}`} aria-hidden />
            <TileCopy name={it.vip.name} body={it.vip.body} cta={d.segments.cta} />
          </Tile>
        </Reveal>

        {/* SME */}
        <Reveal delay={0.1} className="md:col-span-3 lg:col-span-5">
          <Tile href={links.smeLenden} label={it.sme.name} className="text-white">
            <Image
              src="/sme-boutique.webp"
              alt="A smiling boutique owner with a measuring tape, leaning on her sewing machine in her shop"
              fill
              sizes="(min-width:1024px) 42vw, 50vw"
              quality={80}
              className="-z-20 object-cover object-[72%_35%] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(0_80_41/0.96)_0%,rgb(0_80_41/0.84)_38%,rgb(0_80_41/0)_62%)]" />
            <TileCopy name={it.sme.name} body={it.sme.body} cta={d.segments.cta} narrow />
          </Tile>
        </Reveal>

        {/* Corporate */}
        <Reveal delay={0.06} className="md:col-span-3 lg:col-span-6">
          <Tile href={links.corporate} label={it.corporate.name} className="bg-indigo-600 text-white">
            <Pattern variant="rings" className="text-white/[0.08]" />
            <Building2 className="relative size-8 text-lime transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1" aria-hidden />
            <TileCopy name={it.corporate.name} body={it.corporate.body} cta={d.segments.cta} />
          </Tile>
        </Reveal>

        {/* NRB & Offshore */}
        <Reveal delay={0.1} className="md:col-span-3 lg:col-span-6">
          <Tile href={links.offshore} label={it.nrb.name} className="bg-lime text-indigo-950">
            <Pattern variant="zigzag" className="text-indigo-950/[0.08]" />
            <ul className="relative flex flex-wrap gap-2" aria-label="Offshore currencies">
              {["USD", "EUR", "GBP", "CAD", "AUD"].map((c, i) => (
                <li
                  key={c}
                  className="tabular rounded-full bg-indigo-950/8 px-3.5 py-1.5 text-sm font-bold ring-1 ring-inset ring-indigo-950/15 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {c}
                </li>
              ))}
            </ul>
            <TileCopy name={it.nrb.name} body={it.nrb.body} cta={d.segments.cta} dark />
          </Tile>
        </Reveal>
      </div>
    </section>
  );
}

/** Personal: a young man smiling at his phone, on the warm cream of the loan campaign it is drawn from. */
function PersonalPhoto() {
  const brand = usePathname()?.startsWith("/new-design") ?? false;
  if (brand) {
    /* /new-design: the supplied artwork fills the tile; its pale left side carries the copy */
    return (
      <div className="absolute inset-0 -z-20 overflow-hidden bg-[#d6e8fb]">
        {/* Full-height artwork pinned to the right (pushed a little past the edge) so the pale left side stays free for the copy */}
        <div className="absolute inset-y-0 -right-[12%] aspect-[16/9] min-w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03] lg:min-w-0">
          <Image
            src="/personal-banner.webp"
            alt="A young man smiling at his phone, with a card, bank, wallet and shopping cart icons around him"
            fill
            sizes="(min-width:1024px) 60vw, 130vw"
            quality={80}
            className="object-cover"
          />
        </div>
        <span aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.5),rgb(255_255_255/0)_50%)]" />
        {/* Small screens: the copy sits under the artwork, on a soft fade */}
        <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(222_236_252/0.96)_30%,rgb(222_236_252/0)_62%)] lg:hidden" />
      </div>
    );
  }
  return (
    <div aria-hidden={false} className="absolute inset-0 -z-20 overflow-hidden bg-[linear-gradient(120deg,var(--k-cream-a),var(--k-cream-b))]">
      <span className="absolute -left-24 top-0 size-[30rem] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.9),transparent_65%)]" />
      <div className="absolute inset-y-0 right-0 w-[min(52%,23rem)] [mask-image:linear-gradient(90deg,transparent,#000_28%)]">
        <Image
          src="/personal-finance.webp"
          alt="A young man smiling at his phone after a quick, easy approval"
          fill
          sizes="(min-width:1024px) 23rem, 52vw"
          quality={85}
          className="object-cover object-[50%_20%] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

function Tile({ href, label, className = "", children }: { href: string; label: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className={`group relative isolate flex h-full min-h-60 flex-col justify-between overflow-hidden rounded-2xl p-7 transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] sm:p-8 ${className}`}
    >
      {children}
    </a>
  );
}

function TileCopy({ name, body, cta, big, dark, narrow }: { name: string; body: string; cta: string; big?: boolean; dark?: boolean; narrow?: boolean }) {
  return (
    <div className="relative mt-auto pt-10">
      <h3 className={`font-display font-semibold tracking-[-0.03em] ${big ? "text-[clamp(2.2rem,4vw,3.5rem)] leading-none" : "text-3xl leading-tight"}`}>{name}</h3>
      <p className={`mt-3 text-pretty ${narrow ? "max-w-[27ch] lg:max-w-[24ch] xl:max-w-[30ch]" : "max-w-[40ch]"} ${dark ? "text-indigo-900/80" : "text-white/80"} ${big ? "text-lg" : ""}`}>{body}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-semibold">
        {cta}
        <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </div>
  );
}
