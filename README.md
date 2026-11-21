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

Next.js 16 (App Router, static), TypeScript, Tailwind CSS 4, Motion (Framer Motion) for component motion, GSAP + ScrollTrigger for the pinned NexusPay story, the video frame and parallax, Lenis for smooth scrolling on desktop, React Three Fiber for the one 3D moment (the draggable card), and `qrcode` for the app QR.

## What's on the page

1. Sticky header: utility bar (segments, 16216, locator, বাংলা), mega menus with a featured panel, hides on scroll down and returns on scroll up, full-screen drawer on mobile.
2. Hero slider: three photographic slides, crossfade and slow zoom, progress rail, pause button, pointer parallax.
3. Quick-action dock: ATM/branch, open an account, NexusPay, Rocket, call 16216.
4. "What do you want to do?": needs-based tabs (save, spend, borrow, send, business) with a lead product and related products.
5. NexusPay story: on desktop the section pins and scrolling walks an illustrative phone through four real NexusPay features; tap-through on touch screens.
6. Rocket: DBBL's mobile financial service.
7. Cards: a draggable 3D card (loaded only when near the viewport, with a CSS fallback when WebGL is missing).
8. Video: the frame opens to full bleed on scroll; plays one of DBBL's own TV commercials on request, with loading and error states.
9. Segments: Personal, VIP, SME, Corporate, NRB & Offshore.
10. Proof: DBBL's published figures, its firsts, and a diagram of the ATM network shared with Bangladesh Bank and 23 banks.
11. Help: 24/7 hotline, lost-card action, safety tips, quick links.
12. Conscience: the bank's social causes and scholarship.
13. Footer: all major links, locators, contact, apps, social, legal and the concept disclaimer.

## Content sources

Every product, figure and link comes from DBBL's public site (checked 2026-11-21): 64,120,000+ customers, 4,100+ ATMs, first fully automated bank (2003), Rocket as the first mobile financial service, NexusPay as the first app-based digital banking solution, 23 partner banks on the ATM network, NexusPay at 10,000+ shops, credit cards accepted at 40M+ merchants. Product claims are condensed from DBBL's own descriptions. Links go to DBBL's live pages.

## Replace before any real use

- **Logo**: `web/src/components/Logo.tsx` is a placeholder mark. Use DBBL's official logo SVG.
- **Photography** (Unsplash, free licence): hero slides, Rocket, segments, video backdrop and the Conscience section. Swap for DBBL's own photography.
- **App screens**: `web/src/components/PhoneScreens.tsx` is an illustrative mock with demo data (balances, numbers, "Corner Grocery (demo)"). Replace with real NexusPay screenshots.
- **Rocket logo**: the Rocket section uses Rocket's official app icon, hotlinked from its Google Play listing (`links.rocketLogo`). Get the logo files from DBBL and self-host them. The keypad and app screens in that section are illustrative, and the *322# menu wording may differ from the real one.
- **3D card face**: painted in code as a concept card, not a real DBBL card design.
- **TV commercial**: streamed from dutchbanglabank.com (`video1/video60.webm`). Self-host a compressed MP4/WebM with a poster for production.
- **Bangla copy**: written for the concept; have it reviewed by a native copywriter.
