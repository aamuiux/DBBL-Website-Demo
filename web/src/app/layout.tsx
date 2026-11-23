import type { Metadata, Viewport } from "next";
import { Anek_Bangla, Sora, Stack_Sans_Headline } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const stackSans = Stack_Sans_Headline({
  variable: "--font-stack-sans",
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
    <html lang="en" className={`${sora.variable} ${stackSans.variable} ${anek.variable}`}>
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
