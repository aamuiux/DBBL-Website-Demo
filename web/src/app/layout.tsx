import type { Metadata, Viewport } from "next";
import { Anek_Bangla, Bricolage_Grotesque, Hanken_Grotesk, Hind_Siliguri, Sora, Stack_Sans_Headline } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
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

/* Sora and Stack Sans Headline are only used on /new-design (see :root:has(.brand2) in globals.css);
   preload is off so / never downloads them. */
/* Bangla text on /new-design (see :root:has(.brand2) in globals.css); preload is off so / never downloads it. */
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const stackSans = Stack_Sans_Headline({
  variable: "--font-stack-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
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
    <html lang="en" className={`${bricolage.variable} ${hanken.variable} ${sora.variable} ${stackSans.variable} ${hindSiliguri.variable} ${anek.variable}`}>
      <body>
        <LanguageProvider>
          <Preloader />
          <SmoothScroll />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
