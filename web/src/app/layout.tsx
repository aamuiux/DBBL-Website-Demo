import type { Metadata, Viewport } from "next";
import { Anek_Bangla, Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const anek = Anek_Bangla({
  variable: "--font-anek",
  subsets: ["bengali", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dutch-Bangla Bank | Your Trusted Partner (concept)",
  description:
    "Concept redesign of the Dutch-Bangla Bank homepage: NexusPay, Rocket, cards, accounts, loans and the country's largest ATM network.",
};

export const viewport: Viewport = {
  themeColor: "#0e1150",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable} ${anek.variable}`}>
      <body>
        <LanguageProvider>
          <SmoothScroll />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
