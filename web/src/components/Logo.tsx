/** DBBL's mark (client-supplied SVG in /public) with the wordmark set beside it. */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a small static SVG; no optimisation needed */}
      <img src="/dbbl-mark.svg" alt="" width={58} height={36} className="h-9 w-auto shrink-0" />
      <span className={`flex flex-col leading-none ${light ? "text-white" : "text-indigo-700"}`}>
        <span className="font-display text-[1.05rem] font-bold tracking-[-0.02em]">Dutch-Bangla Bank</span>
        <span className={`mt-1 text-[0.68rem] font-medium tracking-[0.02em] ${light ? "text-indigo-200" : "text-ink-3"}`}>
          Your Trusted Partner
        </span>
      </span>
    </span>
  );
}
