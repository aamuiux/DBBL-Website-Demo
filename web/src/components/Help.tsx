"use client";

import { useId } from "react";
import { AlertTriangle, FileText, HelpCircle, MessageSquareWarning, Phone, Receipt, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { links, phone } from "@/lib/links";
import { Reveal, SectionHeading } from "./ui";

export function Help() {
  const { d, num } = useLang();
  const id = useId();
  const quick = [
    { label: d.help.links.faq, href: links.faq, icon: HelpCircle },
    { label: d.help.links.complaint, href: links.complaint, icon: MessageSquareWarning },
    { label: d.help.links.forms, href: links.forms, icon: FileText },
    { label: d.help.links.charges, href: links.charges, icon: Receipt },
  ];

  return (
    <section id="help" aria-labelledby={`${id}-h`} className="mx-auto max-w-[1360px] px-5 py-24 sm:px-6 md:py-32 xl:px-10">
      <SectionHeading id={`${id}-h`} title={d.help.title} lede={d.help.lede} />

      <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        {/* Hotline */}
        <Reveal className="on-dark relative overflow-hidden rounded-2xl bg-indigo-600 p-7 text-white sm:p-10">
          <div className="relative grid gap-8 sm:grid-cols-2">
            <a href={`tel:${phone.hotline}`} className="group block">
              <span className="text-sm font-semibold text-indigo-200">{d.help.local}</span>
              <span className="font-display tabular mt-2 flex items-center gap-3 text-[clamp(3.2rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.04em]">
                <Phone className="size-[0.55em] shrink-0 text-lime transition-transform duration-500 group-hover:-rotate-12" strokeWidth={2.25} aria-hidden />
                {num(16216).replace(/,/g, "")}
              </span>
            </a>
            <a href={`tel:${phone.international}`} className="block self-end">
              <span className="text-sm font-semibold text-indigo-200">{d.help.intl}</span>
              <span className="tabular mt-2 block text-2xl font-semibold tracking-[-0.01em] underline decoration-white/30 underline-offset-[6px] hover:decoration-lime">
                +880 9666 716216
              </span>
            </a>
          </div>
          <div className="relative mt-10 flex items-start gap-4 rounded-xl bg-white p-5 text-ink">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-red-600/10 text-red-600">
              <AlertTriangle className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block font-semibold">{d.help.lost}</span>
              <span className="mt-0.5 block text-ink-2">{d.help.lostBody}</span>
            </span>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {/* Safety */}
          <Reveal delay={0.06} className="rounded-2xl bg-green-100 p-7 sm:p-8">
            <h3 className="flex items-center gap-2.5 font-display text-2xl font-semibold tracking-[-0.02em] text-green-700">
              <ShieldCheck className="size-6" aria-hidden /> {d.help.safetyTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {d.help.safety.map((s) => (
                <li key={s} className="flex gap-3 text-ink">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-green-600" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Quick links */}
          <Reveal delay={0.12}>
            <ul className="grid grid-cols-2 gap-3">
              {quick.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-16 items-center gap-3 rounded-xl bg-white px-4 py-3 font-semibold text-ink shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]"
                  >
                    <Icon className="size-5 shrink-0 text-indigo-500 transition-transform duration-500 group-hover:scale-110" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
