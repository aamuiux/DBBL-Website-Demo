# DBBL homepage redesign (concept)

An independent concept redesign of the Dutch-Bangla Bank homepage, built for a portfolio. It is not affiliated with or endorsed by Dutch-Bangla Bank PLC.

## Run it

```powershell
cd web
npm install
npm run dev
```

Open http://localhost:3000. Add `?still` to the URL to turn off entrance animations (useful for screenshots).

Production build: `npm run build` then `npm start`.

## Stack

Next.js 16 (App Router, static), TypeScript, Tailwind CSS 4, Motion (Framer Motion) for component motion, GSAP + ScrollTrigger for the pinned NexusPay story, the video frame and parallax, Lenis for smooth scrolling on desktop, and `qrcode` for the app QR.

## What's on the page

1. Sticky header, always visible: a rounded, slightly transparent glass bar floating below the top edge. On scroll it tightens and the বাংলা/EN switch folds away; it takes the tone of the section underneath, with a reading-progress line, a gliding hover bubble, mega menus with a featured panel, and a full-screen drawer on mobile. Buttons across the page share one hover: an icon circle whose fill sweeps across the pill.
2. Hero slider: three photographic slides, crossfade and slow zoom, progress rail, pause button, pointer parallax.
3. Quick-action dock: ATM/branch, open an account, NexusPay, Rocket, call 16216, each with an animated glyph on hover and a pointer spotlight.
4. "What do you want to do?": needs-based tabs (save, spend, borrow, send, business) with a lead product and related products.
5. NexusPay story: on desktop the section pins and scrolling walks an illustrative phone through four real NexusPay features; tap-through on touch screens.
6. Rocket: a scroll story of a keypad phone dialling *322# and sending money, with Google Play and App Store links.
7. Cards: pinned on desktop; the scroll deals, fans and swaps illustrative debit, credit and prepaid card designs (tabs on phones).
8. Video: the frame opens to full bleed on scroll; plays one of DBBL's own TV commercials on request, with loading and error states.
9. Segments: Personal, VIP, SME, Corporate, NRB & Offshore.
10. Proof: DBBL's published figures, its firsts, and a diagram of the ATM network shared with Bangladesh Bank and 23 banks.
11. Help: 24/7 hotline, lost-card action, safety tips, quick links.
12. Conscience: the bank's social causes and scholarship.
13. Footer: all major links, locators, contact, apps, social, legal and the concept disclaimer.

## Content sources

Every product, figure and link comes from DBBL's public site (checked 2026-11-21): 64,120,000+ customers, 4,100+ ATMs, first fully automated bank (2003), Rocket as the first mobile financial service, NexusPay as the first app-based digital banking solution, 23 partner banks on the ATM network, NexusPay at 10,000+ shops, credit cards accepted at 40M+ merchants. Product claims are condensed from DBBL's own descriptions. Links go to DBBL's live pages.

## Replace before any real use

- **Logo**: DBBL's mark from the client's SVG (`web/public/dbbl-mark.svg`), with the wordmark set in type. Swap in the official lockup if DBBL supplies one.
- **Photography** (Unsplash, free licence): hero slides, the Students photo slider, segments, video backdrop and the Conscience section. Swap for DBBL's own photography.
- **App screens**: `web/src/components/PhoneScreens.tsx` is an illustrative mock with demo data (balances, numbers, "Corner Grocery (demo)"). Replace with real NexusPay screenshots.
- **Rocket logo**: the Rocket section uses Rocket's official app icon, hotlinked from its Google Play listing (`links.rocketLogo`). Get the logo files from DBBL and self-host them. The keypad and app screens in that section are illustrative, and the *322# menu wording may differ from the real one.
- **Card faces**: illustrative concept designs drawn in code (not DBBL's actual card faces), so there is nothing to hotlink or self-host.
- **Fast Track photo**: an Unsplash stand-in (modern ATMs). Swap for a photo of a real DBBL Fast Track.
- **TV commercial**: streamed from dutchbanglabank.com (`video1/video60.webm`). Self-host a compressed MP4/WebM with a poster for production.
- **Bangla copy**: written for the concept; have it reviewed by a native copywriter.
