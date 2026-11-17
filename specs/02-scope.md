# 02 — Scope (v1: Public Site)

## Context
- **Founder:** Puskar Dahal, photographer for 6–7 yrs. Covers weddings, pre/post-wedding, events/programs, school functions and couples. Does everything end to end: shoot → edit → deliver.
- **Base:** Manipur, India. **Market:** clients from anywhere in India.
- **Currency:** INR. Packages are listed **without prices** and every one ends in a "Contact for quote" call to action.
- **Languages:** English at launch; Hindi, Nepali, Manipuri (Meitei Mayek) later.
- **Socials:** IG [@dh_photography07](https://www.instagram.com/dh_photography07/), personal IG [@puskardahal07](https://www.instagram.com/puskardahal07/), [Facebook](https://www.facebook.com/Puskar125/).
- **Existing channels stay** (call, WhatsApp, IG DMs). The site adds one more and sends people to those channels.

## Brand facts (from socials)
- **Business name:** Dh Photography — Photography & Videography
- **Location:** Kanglatongbi (Mandir area), Manipur, India
- **Phone / WhatsApp:** +91 87986 13217
- **Email:** puskardahal325@gmail.com
- **Gear / credentials:** Wedding specialist, 6+ years, Canon R
- **Taglines (reuse in copy):**
  - "Capturing your happiest 'Yes' in timeless frames"
  - "Your love, my lens, a perfect match"
- **Social proof:** IG page ~2.1K followers, 160 posts; FB page ~4.2K followers; personal IG ~1.5K
- **YouTube:** [@dhphotography9531](https://www.youtube.com/@dhphotography9531/videos) holds the wedding films; embed them on Story pages

## Brand assets
- `public/logo.jpg`: three overlapping circles going from blush (#F6C1BA) to vivid red (#E52E14), like an exposure sequence; brush-script "DH" in black; widely spaced geometric sans "PHOTOGRAPHY". White background. Needs an SVG/transparent version.
- `public/profile.jpg`: Puskar portrait, outdoors with green foliage, smiling. Use on the About page.
- Palette: off-white/paper, ink black, signature red as the accent (used sparingly: CTAs, highlights, motion details).

## Goals
1. Showcase the work so clients know what to expect.
2. Make it easy to find him across India (SEO).
3. Turn visitors into inquiries with as little friction as possible.

## Pages
| Page | Content |
|---|---|
| Home | Full-bleed hero (slideshow/reel), short intro, featured stories, services teaser, testimonials, CTA |
| Portfolio | Filter by category, masonry grid, lightbox |
| Stories | One page per wedding/event: photo story and an embedded YouTube film |
| Services | Package cards (inclusions, no price) → "Get a quote" |
| About | Puskar's story, process (shoot → edit → deliver), years of experience |
| Contact | Inquiry form (name, phone/WhatsApp, event type, date, location, message) + WhatsApp, call and IG buttons |

## Design direction
Modern, clean, photo-first. Lots of micro-interactions and motion that support the photos instead of competing with them. Fully responsive (mobile first, since most traffic comes from IG). Respect `prefers-reduced-motion`. Brand logo and colours come from Puskar's assets (to be added to `public/`).

## Stack
- **Next.js (App Router, TS) + Tailwind CSS**, Motion for animation, Lenis for smooth scroll
- **i18n:** next-intl set up from the start, English only at launch (`/hi`, `/ne`, `/mni` added later)
- **Images:** Cloudflare R2 storage, delivered through Cloudflare's CDN and image resizing (AVIF/WebP, responsive sizes, blur placeholders)
- **DB:** Neon Postgres + Drizzle. In v1 it only stores inquiries (and these also email Puskar). The dashboard reuses it later.
- **Hosting:** Vercel (or Cloudflare). To be decided.

## SEO
Localized metadata + `hreflang`, sitemap, LocalBusiness/Photographer JSON-LD, OG images, Core Web Vitals budget (LCP < 2.5s on 4G). Targets such as "wedding photographer Manipur / Imphal / Northeast India / destination".

## Out of scope (later phases)
- Dashboard: inquiry inbox with statuses, upload and management of albums/portfolio
- Private client delivery galleries
- IG post scheduling, booking calendar

## Packages (PLACEHOLDER — confirm names and inclusions with Puskar)
No prices; every card ends in "Get a quote". Store them as data (one config file) so swapping in the real ones is a one-file change.

| Placeholder name | For | Coverage |
|---|---|---|
| **Two Hearts** | Pre-wedding + Wedding | Photos, cinematic video, drone |
| **Forever & After** | Pre-wedding + Wedding + Post-wedding | Photos, cinematic video, drone, full story album |
| **Moments That Matter** | Programs: school functions, poojas, ceremonies, corporate | Photos, highlight video (drone optional) |
| **Candles & Confetti** | Birthdays: kids, milestone (1st, 18th, 50th…), adult, surprise parties | Photos, short reel (video optional) |
| **Your Story, Your Way** | Custom / anything else | Built to fit → contact |

Inquiry form "event type" options mirror these packages.

## Decisions
- **Language:** English only at launch. i18n scaffolding (next-intl) in place so Hindi, Nepali and Manipuri (Meitei Mayek) can be added later.
- **Domain:** none currently; use a Vercel/Cloudflare subdomain until one is bought.

- **Uploads:** the first content load is done by the developer (script → R2 + seed data). Puskar uploads after that, so the content model (albums, categories, featured flag) should be stored in Neon rather than hardcoded. That way the later dashboard just adds a UI on top of it.

## Open questions
- Real package names and inclusions (discuss with Puskar).
