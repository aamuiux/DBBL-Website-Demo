---
name: Dutch-Bangla Bank (concept homepage)
description: A confident consumer-bank homepage on a DBBL indigo base, turned up for Gen Z with full-colour section fields, where the bank's live campaigns and real firsts do the persuading.
colors:
  indigo-950: "#090b3a"
  indigo-900: "#0e1150"
  indigo-800: "#161a63"
  indigo-700: "#1e2378"
  indigo-600: "#252a86"
  indigo-500: "#3a40a8"
  indigo-400: "#6a70c9"
  indigo-200: "#c9ccee"
  indigo-100: "#e7e8f7"
  indigo-50: "#f1f2fb"
  green-700: "#00703a"
  green-600: "#00904a"
  green-500: "#12a65b"
  green-100: "#dcf2e5"
  red-600: "#e31b23"
  lime: "#c8f169"
  lime-dark: "#b4e04f"
  sun: "#ffcf3d"
  rocket: "#8b2f8f"
  rocket-700: "#6d1f72"
  rocket-100: "#f4e6f4"
  paper: "#f5f6fa"
  white: "#ffffff"
  ink: "#0d0f2b"
  ink-2: "#474b6b"
  ink-3: "#6b6f8e"
  line: "#e2e4ee"
typography:
  display:
    fontFamily: "Sora, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 7.2vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  numeral:
    fontFamily: "Sora, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 8.4vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontFeature: "\"tnum\", \"lnum\""
  numeral-tile:
    fontFamily: "Sora, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 7vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: "-0.05em"
    fontFeature: "\"tnum\", \"lnum\""
  headline-field:
    fontFamily: "Sora, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.4vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Sora, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline-sm:
    fontFamily: "Sora, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Sora, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Sora, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  lede:
    fontFamily: "Stack Sans Headline, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.56
  body:
    fontFamily: "Stack Sans Headline, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Stack Sans Headline, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.375
  label-sm:
    fontFamily: "Stack Sans Headline, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
  body-bangla:
    fontFamily: "Anek Bangla, ui-sans-serif, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  focus: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  card-art: "17.6px"
  xl: "24px"
  tile: "28px"
  feature: "32px"
  device-screen: "38.4px"
  device: "48px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "28px"
  2xl: "40px"
  section: "96px"
  section-md: "128px"
  header: "76px"
  container: "1360px"
components:
  button-primary:
    backgroundColor: "{colors.indigo-600}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "6px 6px 6px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.indigo-700}"
  button-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.indigo-950}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "6px 6px 6px 24px"
    height: "48px"
  button-lime-hover:
    backgroundColor: "{colors.lime-dark}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.indigo-950}"
    rounded: "{rounded.full}"
    padding: "6px 6px 6px 24px"
  button-white-hover:
    backgroundColor: "{colors.indigo-50}"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.indigo-700}"
    rounded: "{rounded.full}"
    padding: "6px 6px 6px 24px"
  button-ghost-light-hover:
    backgroundColor: "{colors.indigo-50}"
  button-ghost-dark:
    backgroundColor: "rgb(255 255 255 / 0.1)"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "6px 6px 6px 24px"
  arrow-chip:
    rounded: "{rounded.full}"
    size: "36px"
  nav-trigger:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: "44px"
    padding: "0 14px"
  nav-trigger-open:
    backgroundColor: "{colors.indigo-50}"
    textColor: "{colors.indigo-700}"
  tab-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: "48px"
    padding: "0 20px"
  tab-pill-selected:
    backgroundColor: "{colors.indigo-600}"
    textColor: "{colors.white}"
  surface-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "28px"
  surface-feature:
    backgroundColor: "{colors.indigo-600}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "40px"
  surface-tinted:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "40px"
  campaign-feature:
    backgroundColor: "{colors.red-600}"
    textColor: "{colors.white}"
    rounded: "{rounded.feature}"
    padding: "48px"
  color-tile:
    backgroundColor: "{colors.indigo-600}"
    textColor: "{colors.white}"
    rounded: "{rounded.tile}"
    padding: "28px"
  number-tile:
    backgroundColor: "{colors.green-600}"
    textColor: "{colors.white}"
    typography: "{typography.numeral-tile}"
    rounded: "{rounded.tile}"
    padding: "28px"
  offer-ticket:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.indigo-950}"
    rounded: "{rounded.xl}"
    padding: "24px"
    width: "256px"
    height: "320px"
  sticker-badge:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.indigo-950}"
    rounded: "{rounded.full}"
    size: "96px"
  sticker-tile:
    backgroundColor: "{colors.indigo-950}"
    textColor: "{colors.lime}"
    rounded: "{rounded.xl}"
    padding: "24px"
  offers-ticker:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.indigo-950}"
    padding: "14px 0"
  pill-chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.indigo-950}"
    rounded: "{rounded.full}"
    height: "48px"
    padding: "0 16px"
  quick-dock:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "8px"
  quick-dock-item:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "64px"
    padding: "12px 16px"
  icon-tile:
    backgroundColor: "{colors.indigo-50}"
    textColor: "{colors.indigo-600}"
    rounded: "{rounded.md}"
    size: "44px"
  chip-year:
    backgroundColor: "{colors.indigo-100}"
    textColor: "{colors.indigo-700}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  store-badge:
    backgroundColor: "{colors.white}"
    textColor: "{colors.indigo-950}"
    rounded: "{rounded.lg}"
    height: "56px"
    padding: "0 20px 0 16px"
---

# Design System: Dutch-Bangla Bank (concept homepage)

## Overview

**Creative North Star: "The Indigo Rails"**

DBBL built the country's digital rails (the first ATM network, the first mobile bank, NexusPay), and the system is the visual voice of a bank that does not need to shout, now turned up for Gen Z. It plays the consumer-bank category standard straight, at Revolut and Monzo craft: deep indigo is the base (the hero, Loans, Media, the NexusPay story and every dark band), and full-colour section fields carry the energy, one per section, each with a job. Lime is the Students field and the offers ticker, Rocket magenta is the Rocket field, DBBL green is the CSR field and the Fast Track and ATM accent, red is the live campaign. Sun yellow is the sticker colour and never a ground. Paper and white sections sit between the fields so the colour reads as rhythm, not noise. Persuasion comes from real proof and live campaigns (counted numbers, a dated set of firsts, the UDYOG feature, real offer terms) set in big, tight Sora.

Density is generous: sections breathe at 96 to 128px of vertical padding inside a 1360px container, headlines are left-aligned and large, and each section has one job. Rounding scales with the object: 16px for interface surfaces, 24px for tickets and stickers, 28 to 32px for the big colour tiles and the campaign feature. Shadows stay ambient and indigo-tinted. Photography is full-bleed and graded with indigo or green, never a grey scrim. Motion has two registers: calm and expensive for structure (long ease-out-expo curves, 24px rises, pinned scroll stories), and springy for the Gen Z layer (stickers that pop in tilted, tickets you can drag, a ticker that never stops, a dial pad that types itself). All of it turns off under reduced motion.

The system rejects the cluttered link-farm bank portal (the mega menu holds the depth so the page does not have to) and the novelty-world gimmick alike. It is bilingual by construction: every display and text stack falls back to Anek Bangla, and Bangla mode loosens line height and drops negative tracking.

**Key Characteristics:**
- Indigo base with one full-colour field per section, each colour owning a job: lime (students, offers), magenta (Rocket), green (CSR, Fast Track, ATMs), red (live campaigns), sun (stickers only).
- Lime is still the primary action on every dark ground.
- Sora display set tight (-0.03 to -0.05em) and big; Stack Sans Headline text at 17px.
- Pill buttons with a circular arrow chip whose arrow slides through on hover.
- Radius scales with size: 16px surfaces, 24px tickets and stickers, 28 to 32px colour tiles and features.
- Sticker badges, ticket-shaped offer cards, colour tiles with oversized numerals.
- Two signature scroll moments: the indigo circle spreading from the NexusPay phone, and the tilted card frame opening to full-screen video.
- Bilingual (English and Bangla) with Anek Bangla as a first-class fallback in every stack.

## Colors

A saturated indigo base on cool paper, with five brand-bright field colours, each assigned a job.

### Primary
- **DBBL Indigo** (indigo-600): the brand colour. Primary buttons on light grounds, the selected tab pill, the Personal loan tile, the first Proof firsts tile, the lead proof numeral, the right half of the video split headline. Its hover deepens to indigo-700.
- **Midnight Indigo** (indigo-950): the base dark ground. Hero, Loans, Media, video band, network panel, Fast Track count tile, footer, utility bar, and the tint in every indigo photo gradient (`rgb(9 11 58 / x)`). Also the ink on lime, sun and white tiles.
- **Signal Indigo** (indigo-700): the circle that spreads from behind the NexusPay phone until it owns the screen.
- **Indigo scale** (indigo-900 to indigo-50): 900 is the browser theme colour and SVG ink; 800 is a hover state; 500 is the focus ring and glow; 400 is the NexusPay signal rings; 200 is secondary text on dark and hairline rings on light; 100 and 50 are tinted chips, hover washes and open nav triggers.

### Secondary
- **Citrus Lime** (lime): the Students section ground, the offers ticker strip, and the primary action on every dark ground (hero CTA, Loans "Apply online", the "Internet Banking" pill over the hero). Also the accent word in dark-band headlines ("minus the maze", "in the news"), CSR timeline years, the Fast Track count numeral, play buttons, NexusPay active step discs, the network's DBBL node and pulses, the 24/7 and *322# tiles, text selection, and the focus ring on dark grounds. Hover is lime-dark.

### Tertiary
- **Rocket Magenta** (rocket, rocket-700, rocket-100): the Rocket section ground, with rocket-700 for its large background discs and the ink inside sun icon tiles, and rocket-100 for the Rocket dock icon tile. Elsewhere it appears only as one colour in the multi-colour sets (an offer ticket, a School Savers sticker, the women's SME loan chips, the Rocket first in Proof).
- **DBBL Green** (green-600, green-700, green-500, green-100): the CSR section ground (green-700 under a green photo grade), the Fast Track primary button, accent word, check discs and ATM number tile, the Home loan tile, the Bangladesh Bank node, and the "Open account" and "Call" dock tiles.
- **Signal Red** (red-600): live campaigns and alerts. The UDYOG campaign feature card, the live dot on the header's "Offers" link, offer tickets for live card campaigns, and alert tiles.
- **Sun** (sun): stickers, badges and small accents. The "56 districts" campaign sticker, the Fast Track hours sticker, the Car loan tile, offer tickets, the GraTA programme tile, Rocket's icon tiles and its accent word ("a bank."). Never a section ground.

### Neutral
- **Cool Paper** (paper): the page background, calm sections between fields (Offers), tinted inset panels, and the ticket notches.
- **White** (white): calm sections (Fast Track, Proof), cards, the quick-action dock, the solid header (92% with backdrop blur), mega menu, mobile drawer, white buttons on colour fields, SME chips.
- **Ink** (ink): headings and primary text on light grounds.
- **Ink 2** (ink-2): body and lede text on light grounds.
- **Ink 3** (ink-3): captions, rail hints, source notes.
- **Hairline** (line): dividers, list rules, header bottom edge, quiet outline rings.

### Named Rules
**The One Field Per Section Rule.** Each section takes one ground: indigo-950, paper, white, or one full-colour field (lime for Students, rocket for Rocket, green-700 for CSR). Colour tiles and stickers inside a section may mix the palette; the ground does not.

**The Colour Has A Job Rule.** Lime means students, offers and the action on dark; magenta means Rocket; green means growth, safety, Fast Track, ATMs and CSR; red means a live campaign or an alert; sun means a sticker or accent. Inside a multi-colour set (offer tickets, stickers, firsts) the colours rotate freely, but no colour becomes a section ground outside its job.

**The Sun Never Grounds Rule.** Sun fills stickers, badges, tiles and icon chips, and colours an accent word on magenta. It is never a section background.

**The Citrus On Dark Rule.** On indigo, magenta, green or a photograph, the primary action is lime (or white on a colour field). On paper or white the primary action is indigo-600 (green-600 in the Fast Track section), never a lime button or lime text. On the lime Students field the action is indigo-950.

**The Tinted Scrim Rule.** Photographs are graded with indigo-950 or green-700-family gradients that run from the text side outward. Never a neutral grey or black scrim.

## Typography

**Display Font:** Sora (opsz and wdth axes loaded), falling back to Anek Bangla, ui-sans-serif, system-ui
**Body Font:** Stack Sans Headline, falling back to Anek Bangla, ui-sans-serif, system-ui
**Bangla Font:** Anek Bangla (bengali and latin subsets)

**Character:** A characterful, slightly quirky grotesque set very tight and very large for headlines and numbers, against a clean, warm, highly legible grotesque for everything people actually read. Semibold (600) is the house weight; bold (700) is reserved for oversized numerals and sticker text.

### Hierarchy
- **Display** (600, clamp(2.9rem, 7.2vw, 6rem), 0.98): the hero H1 only, balanced, max two lines.
- **Numeral** (600, clamp(3.2rem, 8.4vw, 6rem), 0.9, -0.04em, tabular lining figures): the lead proof statistic and the 16216 hotline; supporting stats step down to clamp(2.6rem, 5vw, 4rem).
- **Numeral tile** (700, clamp(3.5rem, 7vw, 5.5rem), 0.85, -0.05em): the big numbers inside colour tiles (4,100+ ATMs, Fast Track count, 24/7). The UDYOG "5,000" runs to clamp(7rem, 17vw, 15rem) at -0.06em as the campaign graphic.
- **Headline field** (600, clamp(2.4rem, 5.4vw, 4.75rem), 0.98, -0.04em): section H2s in the new field sections (Offers, Loans, Fast Track, Media); Students, Rocket and CSR run to 5 to 5.25rem at 0.95 and -0.045em. A second phrase often takes the section's accent colour.
- **Headline** (600, clamp(2.1rem, 4.4vw, 3.75rem), 1.02, -0.03em): the SectionHeading H2 used by Proof, Needs, Segments and Help, max-width 48rem.
- **Headline small** (600, clamp(1.9rem, 3.2vw, 2.75rem), 1.04): the feature product name inside the Needs panel; loan tile names at 2.25rem.
- **Title** (600, 1.5rem, -0.02em): card and panel headings, programme tiles, offer ticket titles (1.65rem), firsts (1.85rem).
- **Title small** (600, 1.25rem, -0.015em): product rows, NexusPay steps, Rocket features.
- **Lede** (400, 1.125rem): the paragraph under a section headline, 38 to 60ch, ink-2 on light, indigo-200 or white at 85% on colour.
- **Body** (400, 1.0625rem, 1.6): running text, base size of the page.
- **Label** (600, 0.95rem): nav triggers, dock items, tab pills, buttons (1rem at md, 1.0625rem at lg).
- **Label small** (600, 0.8125rem): utility bar, mega-menu column headings, rail hints, source notes. Sentence case.

### Named Rules
**The Tight Display Rule.** Display type is always semibold or bold with negative tracking between -0.015em (small titles) and -0.06em (the campaign numeral); line height never exceeds 1.04 on headlines.

**The Bangla Breathing Rule.** In Bangla mode the whole page switches to Anek Bangla, body line height rises to 1.7, display line height to 1.12 and display tracking resets to 0. Never apply Latin negative tracking to Bangla script.

**The Tabular Money Rule.** Every number that represents money, a count, a phone number, a USSD code or a card number uses tabular lining figures.

## Layout

A single centered container (max 1360px) with side gutters of 20px on mobile, 24px from sm, 40px from xl. Sections are vertically padded 96px, rising to 128px from md. Breakpoints are Tailwind defaults: sm 640px, md 768px, lg 1024px, xl 1280px.

Headlines are left-aligned. Field sections pair the headline with a right-aligned lede and buttons at lg (1.2fr/1fr, ends aligned). Content grids are asymmetric two-column splits at lg (1.15fr/1fr, 1.2fr/1fr, 1.3fr/1fr for the campaign feature, 1.5fr/1fr for the Fast Track photo and number tiles, 1.6fr/1fr/1fr for proof numbers), and three- or four-up tile rows (loans, CSR, firsts), collapsing to one or two columns below. Gaps are 16px between tiles.

Rails break the container: the offer-ticket rail and the TV-ad poster rail start at the container edge and run off the right of the viewport (left padding `max(2.5rem, (100vw - 1360px)/2 + 2.5rem)`). The offers ticker runs full-bleed at a -1deg tilt.

The header is fixed, 76px tall, transparent over the hero and solid white after 24px of scroll; it hides on scroll down past 480px and returns on scroll up. Above it sit a 40px indigo-950 utility bar (desktop) or a lime concept strip (mobile), both collapsing on scroll. The quick-action dock overlaps the hero's bottom edge by 64px, and the offers ticker sits 48px below it.

**The Overlap Rule.** Exactly one element bridges the hero and the page: the white quick-action dock, pulled up 64px on the float shadow.

## Elevation & Depth

A hybrid: depth comes mainly from ground changes (paper, white, indigo-950, colour fields) and full-bleed photography, with ambient, indigo-tinted shadows for white elements and stickers that sit above another surface. Shadows are long, soft and negative-spread, never hard or offset. Colour tiles on a field sit flat; stickers and tickets lift.

### Shadow Vocabulary
- **Card** (`0 1px 2px rgb(13 15 43 / 0.04), 0 12px 32px -12px rgb(13 15 43 / 0.14)`): resting white cards on paper, offer tickets and School Savers stickers at rest, the offers ticker.
- **Lift** (`0 2px 4px rgb(13 15 43 / 0.06), 0 28px 56px -20px rgb(13 15 43 / 0.28)`): hover state of tickets and cards; round stickers and the Fast Track hours sticker.
- **Float** (`0 4px 10px rgb(9 11 58 / 0.12), 0 32px 64px -24px rgb(9 11 58 / 0.45)`): elements over a dark or photographic ground: the quick-action dock, the video card frame, the media dialog.
- **Header** (`0 1px 0 var(--color-line), 0 10px 30px -18px rgb(13 15 43 / 0.35)`): the solid header bar, with 92% white and backdrop blur.

### Named Rules
**The Lift-On-Hover Rule.** Cards and tickets rest at Card and move to Lift on hover; nothing gains a shadow it did not need to separate from its ground.

## Shapes

Rounding scales with the object. Interface surfaces (white cards, the dock, panels, store badges, billboard frames, the network panel) are 16px; inner elements step down to 12px (list rows, dock items, icon tiles) and 8px (QR frame). Tickets, stickers, programme tiles, CSR timeline cards, Proof firsts and TV-ad posters are 24px. The big colour tiles (loans, Fast Track number tiles, the Fast Track photo, the SME panel) are 28px and the UDYOG campaign feature is 32px. Every interactive control that is not a surface (buttons, nav triggers, tab pills, chips, icon buttons, the arrow chip, dial keys) is a full pill or circle. Device frames: the NexusPay phone 48px outer, 38.4px screen; the dial-pad phone 44px outer, 35px screen.

Recurring geometry: offer tickets with two paper-coloured notches and a dashed tear line 60px from the bottom; round stickers set at 6 to 12deg; tiles and posters resting at alternating ±1.5deg tilts that straighten on hover; oversized outline or translucent icons and words bleeding off a tile's corner; large flat discs as field texture (Rocket, the School Savers card). Scroll geometry: the NexusPay indigo circle (clip-path circle from 31% to 125% at 50% 78%) and the video card frame (30vw card at -4deg and 24px radius opening to 100vw by full height at 0deg and 0 radius).

## Components

### Buttons
Tactile pills that point where they go.
- **Shape:** full pill, minimum height 48px, label then a 36px circular arrow chip inset 6px on the right.
- **Primary:** indigo-600 with white text on light grounds; the chip is lime with indigo-950 arrow. Re-toned per section: indigo-950 on the lime Students field, green-600 (hover green-700) in Fast Track.
- **Lime:** lime with indigo-950 text, the primary action on dark grounds; chip is indigo-950 with lime arrow.
- **White:** white with indigo-950 text on colour fields (UDYOG red, Rocket magenta); chip indigo-600.
- **Ghost dark:** 10% white with a 30% white inset ring and backdrop blur, on dark and colour grounds.
- **Ghost light:** transparent with indigo-700 text and an indigo-200 inset ring.
- **Outline pill (no chip):** a 48px pill with a leading icon and a 1 to 2px inset ring in the ground's ink (white/35 on indigo, line on white, indigo-950/80 on lime), for secondary tools such as EMI calculator, Find an ATM, DBBL Scholarship.
- **Hover / Focus:** background steps one shade deeper over 300ms on ease-out-quart; the arrow slides out right while a twin slides in from the left over 500ms on ease-out-expo; press scales to 0.98. External links swap to an up-right arrow and announce "(opens in a new tab)".
- **Text link:** indigo-600 (lime on dark) semibold with a 40% underline that takes the current colour on hover.

### Chips
- **Year chip:** a pill in current colour at 12% with a 25% inset ring on Proof firsts tiles; indigo-100 and indigo-700 where it sits on white.
- **SME loan chip:** a 48px pill, white with indigo-950 (rocket with white for the two loans made for women), display-font name plus a 70% note; pops in on a spring and rises 2px on hover.
- **Ticket tag:** a small pill in current colour at 10% with a 20% ring.
- **Date badge:** white pill with red-600 bold text and a calendar icon on the campaign feature.
- **Concept badge:** lime ground, indigo-950 bold, pill.

### Cards / Containers
- **Corner Style:** 16px for interface cards, 24px for tickets and small tiles, 28 to 32px for colour tiles and features (see Shapes).
- **Background:** white on paper, paper on white, or a full palette colour for tiles.
- **Shadow Strategy:** Card at rest, Lift on hover (see Elevation & Depth); colour tiles on a field are flat.
- **Border:** none; translucent panels on colour fields use a 12 to 20% white inset ring.
- **Internal Padding:** 24 to 28px, rising to 36 to 48px from sm on features.

### Navigation
- **Header:** logo, a row of 44px pill triggers with chevrons (white over the hero, ink once solid), an "Offers" link with a pinging red live dot, a search icon button and an "Internet Banking" pill (lime over the hero, indigo-600 when solid) with a lock icon.
- **Mega menu:** a white panel that wipes down by clip-path over 450ms, link columns with ink-3 headings and rows that wash indigo-50 on hover, plus one coloured feature tile; a 30% indigo-950 blurred scrim behind it. Opens on hover with a 90ms delay, closes after 160ms, Escape returns focus.
- **Mobile:** a full-screen white drawer with a full-width indigo-600 login pill, display-font accordion sections, and paper tiles for hotline, locator and language.

### Quick-Action Dock (signature)
A white 16px dock on the Float shadow, overlapping the hero by 64px: five 64px-tall items, each a 44px coloured icon tile (indigo-50, green-100 or rocket-100 with its matching ink) and a semibold label. On hover the item washes paper and the icon tile tilts -6deg and scales 1.1.

### Offers Ticker (signature)
A full-bleed lime strip tilted -1deg, 14px tall padding, on the Card shadow: partner and offer titles in 1.125rem display semibold, separated by indigo-950 dots, sliding left forever (two copies, 55s per loop), paused on hover and focus. The duplicate copy is hidden from assistive tech. Static under reduced motion.

### Offer Tickets (signature)
256 by 320px, 24px cards in a rotating palette (lime, red, rocket, sun, green, indigo-600, indigo-950), each with two paper notches and a dashed tear line, a tag pill and category icon on top, partner and display title in the middle, and a "Terms & FAQ (PDF)" link at the foot. They sit in a horizontal rail you drag (8% elastic, constrained), spring in from 4deg to a ±1.5deg rest, and straighten and rise 8px on hover. Under reduced motion the rail scrolls natively with no physics.

### Campaign Feature
The live campaign as a 32px red-600 card: date badge, field-size headline, lede, white and ghost-dark buttons on the left; on the right the campaign number set as the graphic in white display bold, springing up from a tilt, with a round sun sticker popping in.

### Stickers
Round sun, red or lime badges (96 to 112px) in bold display text, set at 6 to 12deg on the Lift shadow, popping in on a stiff spring (stiffness 260 to 300, damping 12) from scale 0. Square sticker tiles (School Savers: indigo-950 with lime, rocket, white, red) are 24px with a big bold figure and a short label, springing from scale 0.4 at triple tilt to their resting tilt and straightening on hover. The Fast Track hours sticker is a 16px sun card pinned over the photo at -3deg.

### Colour Tiles
Loans: three 28px tiles (indigo-600, green-600, sun), each a 56px icon chip, a 2.25rem name, body and two pills (a solid Apply chip and an outline FAQ), with an oversized 15% icon bleeding off the corner that rotates -12deg and grows on hover; they spring up from alternating tilts. Fast Track number tiles: green-600 and indigo-950 28px tiles carrying a numeral-tile figure. Proof firsts: four 24px tiles (indigo-600, green-600, rocket, lime) with a year chip, a 1.85rem title and body pinned to the foot. CSR programmes: lime, sun and white 24px tiles that rise 4px on hover.

### NexusPay Story (signature)
On desktop with a fine pointer the section pins for 3.4 viewport heights. It opens on paper with the headline and store badges; as scroll starts, an indigo-700 circle spreads from behind the phone (clip-path circle 31% to 125% at 50% 78%), indigo-400 signal rings expand ahead of it, and the phone travels from the lower centre to the left slot. The second half of the scroll walks the phone through four steps; steps are 16px rounded buttons with a lime number disc when active and scroll-to on click. On touch and reduced motion it becomes a tap-through with no pinning.

### Video Frame (signature)
On wide screens without reduced motion the section pins: a split headline (left half ink, right half indigo-600) sits either side of a 30vw indigo-950 card-shaped frame tilted -4deg with a 24px radius on the Float shadow; scroll opens it to the full viewport at 0deg and 0 radius as the headline parts. The play control is an 80px translucent ring that fills lime on hover.

### Rocket Dial Pad (signature)
A phone (dark plum frame, pale blush screen) on the magenta field whose display types *322# one key at a time while in view (420ms per key, hold, repeat); the pressed key springs to 0.88 and fills rocket, and a green call button lights when the code is complete. Static and complete under reduced motion.

### Media Rail
TV-ad posters as 24px cards (1259:680) in a tilted, off-edge rail with a bottom indigo gradient and a 56px lime play disc; clicking opens a native dialog over a 90% indigo-950 blurred backdrop with a 16px video frame on the Float shadow and a white close circle above it. Billboards follow as a five-up row of 16px portrait boards at small alternating tilts, then the landscape board paired with a lime *322# tile.

### Store Badges
56px, 16px-radius badges, white on dark grounds (indigo-950 when light is requested), with small "Get it on" overline text at 70% opacity.

### Motion
Lenis smooth scroll. Reveals rise 24px and fade in over 800ms on ease-out-expo, once; staggered lists rise 28px over 700ms with 80ms between children. The Gen Z layer uses springs: stickers (stiffness 260 to 300, damping 12 to 14), tickets and tiles (140 to 200, damping 16 to 18), chips (320, damping 16). The Students card swings from -24 to 10deg and travels 160px with scroll on a spring. CSR photo parallaxes ±10%. The hero crossfades every 7s with lime progress bars and a pause control. Counters run 2s. Under reduced motion all transitions collapse to 0.01ms, the ticker stops, reveals render in place, the dial pad shows the full code, autoplay is off and pinning, dragging and parallax are disabled.

## Do's and Don'ts

### Do:
- **Do** keep indigo as the base: indigo-950 for dark bands and photo grades, indigo-600 for the primary action on light grounds.
- **Do** give each section one ground, and give each full-colour field its job: lime for Students and the offers ticker, rocket for Rocket, green-700 for CSR, red-600 for the live campaign card.
- **Do** use lime (#c8f169) as the primary action on every dark or colour ground.
- **Do** use sun (#ffcf3d) for stickers, badges, tiles and accents only.
- **Do** scale radius with the object: 16px surfaces, 24px tickets and stickers, 28 to 32px colour tiles and features, full pills for controls.
- **Do** let stickers and tickets tilt and spring, and straighten them on hover.
- **Do** grade every photograph with an indigo-950 or green gradient from the text side.
- **Do** set headlines in Sora 600 with negative tracking and line height at or below 1.04.
- **Do** set every money, count, phone, code and card number in tabular lining figures.
- **Do** rest cards on the Card shadow and move them to Lift on hover.
- **Do** turn off every loop, spring, drag, pin and parallax under reduced motion, leaving the final state in place.
- **Do** keep every stack falling back to Anek Bangla and switch to the Bangla rhythm (1.7 body, 1.12 display, 0 tracking) in Bangla mode.

### Don't:
- **Don't** use sun as a section ground.
- **Don't** use rocket magenta as a section ground outside the Rocket section, or red outside live campaigns, alerts and the offer set.
- **Don't** put two full-colour fields in one section, or place two field sections back to back without the colour having a job.
- **Don't** put lime text or lime buttons on paper or white grounds.
- **Don't** use grey or black scrims over photography.
- **Don't** use hard offset shadows or visible card borders; separate with ground and ambient shadow.
- **Don't** add uppercase tracked eyebrows or kickers above headlines; the headline leads.
- **Don't** apply negative Latin tracking to Bangla text.
- **Don't** turn the homepage into a link farm; depth belongs in the mega menu and footer.

<!-- Concept placeholders, not system decisions: the logo mark (components/Logo.tsx) is a stand-in to be replaced by DBBL's official logo SVG; the hero, CSR and other lifestyle photography is Unsplash stand-in imagery for DBBL's own shoots (the Fast Track photo, TV-ad posters and billboards are DBBL's own published assets); the phone screens, dial pad, Rocket notification, sample card number and amounts are illustrative synthetic demo data. -->
