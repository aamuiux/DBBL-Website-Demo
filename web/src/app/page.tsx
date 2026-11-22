import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuickDock } from "@/components/QuickDock";
import { Offers, OffersTicker } from "@/components/Offers";
import { Loans } from "@/components/Loans";
import { Students } from "@/components/Students";
import { AppStory } from "@/components/AppStory";
import { RocketBand } from "@/components/RocketBand";
import { FastTrack } from "@/components/FastTrack";
import { Cards } from "@/components/Cards";
import { VideoStory } from "@/components/VideoStory";
import { Media } from "@/components/Media";
import { Segments } from "@/components/Segments";
import { Proof } from "@/components/Proof";
import { Help } from "@/components/Help";
import { Footer } from "@/components/Footer";
import { CaptureRange } from "@/components/CaptureRange";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <QuickDock />
        <OffersTicker />
        {/* Client priority: campaigns, offers and loans first */}
        <Offers />
        <Loans />
        <Students />
        <AppStory />
        <RocketBand />
        <FastTrack />
        <Cards />
        <VideoStory />
        <Media />
        <Segments />
        <Proof />
        <Help />
      </main>
      <Footer />
      <CaptureRange />
    </>
  );
}
