import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Dutch-Bangla Bank | Your Trusted Partner (concept, brand colours)",
  description:
    "Concept redesign of the Dutch-Bangla Bank homepage in DBBL's brand-guideline colours: NexusPay, Rocket, cards, accounts, loans and the country's largest ATM network.",
};

export const viewport: Viewport = {
  themeColor: "#161960",
};

/** `.brand2` switches the whole page (via :root:has(.brand2) in globals.css) to the brand-guideline palette. */
export default function BrandColoursLayout({ children }: { children: React.ReactNode }) {
  return <div className="brand2">{children}</div>;
}
