import { Header } from "./Header";
import { Hero } from "./Hero";
import { QuickDock } from "./QuickDock";
import { Offers, OffersTicker } from "./Offers";
import { Loans } from "./Loans";
import { Students } from "./Students";
import { AppStory } from "./AppStory";
import { RocketBand } from "./RocketBand";
import { FastTrack } from "./FastTrack";
import { Cards } from "./Cards";
import { VideoStory } from "./VideoStory";
import { Media } from "./Media";
import { Segments } from "./Segments";
import { Proof } from "./Proof";
import { Help } from "./Help";
import { Footer } from "./Footer";
import { CaptureRange } from "./CaptureRange";
import { FocusAreas } from "./FocusAreas";

/** The homepage. Rendered at / and, in the brand-guideline colours, at /new-design. */
export function HomePage({ variant = "classic" }: { variant?: "classic" | "new" }) {
  if (variant === "new") {
    return (
      <>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <QuickDock />
          <OffersTicker />
          <Offers />
          <FastTrack />
          <Loans />
          <Cards />
          <FocusAreas />
          <Students />
          <AppStory />
          <RocketBand />
          <VideoStory />
          <Segments />
          <Media />
          <Proof />
          <Help />
        </main>
        <Footer />
        <CaptureRange />
      </>
    );
  }
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
