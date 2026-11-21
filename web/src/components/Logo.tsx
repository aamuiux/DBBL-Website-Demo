/** Placeholder mark + wordmark for the concept. Swap for DBBL's official logo SVG before any real use. */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
        <rect width="40" height="40" rx="11" fill={light ? "#ffffff" : "#252a86"} />
        <path d="M11 29V11h7.2c6 0 10.3 3.6 10.3 9s-4.3 9-10.3 9H11Z" fill={light ? "#252a86" : "#ffffff"} />
        <path d="M16.5 24.2v-8.4h1.9c2.8 0 4.6 1.6 4.6 4.2s-1.8 4.2-4.6 4.2h-1.9Z" fill="#00904a" />
        <circle cx="31" cy="11" r="3.2" fill="#e31b23" />
      </svg>
      <span className={`flex flex-col leading-none ${light ? "text-white" : "text-indigo-700"}`}>
        <span className="font-display text-[1.05rem] font-bold tracking-[-0.02em]">Dutch-Bangla Bank</span>
        <span className={`mt-1 text-[0.68rem] font-medium tracking-[0.02em] ${light ? "text-indigo-200" : "text-ink-3"}`}>
          Your Trusted Partner
        </span>
      </span>
    </span>
  );
}
