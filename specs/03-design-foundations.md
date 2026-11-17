# 03 — Design Foundations

## Brief in one line
A wedding and event photographer from Kanglatongbi, Manipur, showing couples and families across India what their day will look like in his frames, and making it easy to ask for a quote.

**Audience:** couples (often booking from a phone, coming from Instagram) and their families; organisers of school programmes and poojas.
**Primary job:** let the photographs sell, then turn a visitor into a WhatsApp message or inquiry.

## Where the identity comes from
- **The logo itself:** three circles going from blush to full red. They read as an exposure sequence, or a photo *developing*. That progression (soft → bold) is the brand's signature, and it drives the motion.
- **Red and green:** sindoor red against the deep green of Manipur's hills and of Puskar's own portrait. Red-and-green is also the colour pair of Indian weddings (bangles, mehendi, silk). Using green for dark sections, not black, is what keeps this site from looking like every other "dark luxury" photographer site.
- **The circle as a UI shape:** pill buttons, a circular "View" cursor over photos, circular progress. The logo's geometry becomes the interface's geometry.

## Colour
| Token | Hex | Role |
|---|---|---|
| `paper` | `#FFFFFF` | Main background. White, matching the logo, *not* cream |
| `mist` | `#F2F3EF` | Quiet alternate surface (cool, faintly green-grey) |
| `ink` | `#16201B` | Text. A green-black, related to `forest`, not neutral #111 |
| `stone` | `#5E6862` | Secondary text (5.8:1 on paper) |
| `forest` | `#1E3328` | Dark sections, footer, the lightbox |
| `sindoor` | `#E41E00` | The brand red (logo base). CTAs, focus ring, the one highlight per screen |
| `sindoor-deep` | `#C41A00` | Red **text** and hover (6.0:1 on paper) |
| `blush` | `#F7C0B9` | Logo's softest circle. Accents on `forest`, selection, image placeholders |

**Rules**
- Red is rare: at most one red thing per screen. The photographs bring the colour.
- No red text on `forest` (2.9:1, fails). On forest, use `paper` or `blush`.
- White text on `sindoor` buttons is 4.7:1, which passes AA. Keep button labels at 16px+ medium weight.
- **Palette locked (2026-11-17).** No light/dark theme switch for now: dark sections are a deliberate part of the design, not a mode. The fullscreen lightbox uses `forest`. Dark mode is deferred, not ruled out: keep colours referenced only through tokens (never raw hex in components) so a dark theme can be added later by redefining tokens.

## Typography
| Role | Face | Notes |
|---|---|---|
| Display | **Hedvig Letters Serif** | Warm and slightly quirky, with a handmade feel that sits next to the brush "DH" without imitating it. Single weight (400). Used large, with tight leading, as the voice of the page |
| Text / UI | **Hanken Grotesk** | Clean and open, a geometric-leaning grotesk that echoes the "PHOTOGRAPHY" wordmark. 400 / 500 / 600 |
| Later (i18n) | Noto Sans Devanagari, Noto Sans Meetei Mayek | Loaded only for `/hi`, `/ne`, `/mni` |

**Scale** (ratio ~1.25, base 17px, display steps fluid):
`xs 13 · sm 15 · base 17 · lg 21 · xl 26 · 2xl clamp(28→36) · 3xl clamp(34→52) · 4xl clamp(44→80) · 5xl clamp(56→128)`

**Rules**
- Body measure 60–70ch; body line-height 1.6, display 1.0–1.1 with slight negative tracking.
- Sentence case everywhere. No all-caps eyebrow labels above headings (the logo's spaced "PHOTOGRAPHY" is the only tracked caps on the site).
- No single-word accent colour or italics inside headlines.
- `tabular-nums` for any numbers (years, counts).

## Layout
- 12-column grid, `max-width 1440px`, gutters 20px (mobile) → 32px → 48px (desktop).
- **Left-aligned** text throughout; only the logo is centred.
- Photos are the structure: asymmetric, full-bleed or near full-bleed, mixed portrait/landscape. No identical card grids.
- Spacing scale (4px base): 4 8 12 16 24 32 48 64 96 128 192. Sections are separated by 96–192px of space, not by divider lines.

```
HOME (desktop)
┌──────────────────────────────────────────────┐
│ [logo-h]                     Work  Services  │  ← transparent over hero, pill "Get a quote"
│                                              │
│        FULL-BLEED PHOTO (wedding moment)     │
│                                              │
│ Capturing your happiest                      │  ← display, bottom-left over image
│ "Yes" in timeless frames.        [Get a quote]│
└──────────────────────────────────────────────┘
  Intro (6 cols, left)          tall portrait →
  ┌──────────┐ ┌─────┐
  │ story A  │ │  B  │   ← asymmetric featured stories
  └──────────┘ │     │
               └─────┘
  ███████████ FOREST SECTION: services ███████████
  Contact strip: WhatsApp · Call · Instagram
```

## Shape
- Photos: **square corners** (a photo is a print).
- Text over a photo must **never cover a face**: pick photos and focal points so faces sit in the top two-thirds, keep overlay text in the bottom third.
- Photos are **never cropped**: always shown at their native aspect ratio (`w-full h-auto`, no forced `aspect-*` + `object-cover`). Layouts adapt to the photo, not the other way round. The only exception is a full-bleed hero, which must set an explicit focal point (`object-position`) per image.
- Interactive things: **fully round** (pills and circles, from the logo).
- Panels/inputs: 12px radius. Only those three values.
- No drop shadows on content (photos, panels, text); depth comes from photos and the `forest` / `paper` contrast.
- **Buttons are the exception:** soft, layered shadows tinted to their colour (ink-tinted under `sindoor` and outline (a red-tinted glow looked off), deep under `on-dark`). On hover the button lifts 1px and the shadow grows; on press it sinks and the shadow disappears. Each property has its own timing (`btn-motion`): colour/fill can be slow, lift 240ms, press 150ms, so press feedback always feels instant. Tokens: `shadow-btn*`.

## Motion
**The signature moment ("develop").** On first load the three logo circles appear soft → mid → bold, and the hero photo develops in behind them (blush tint resolving to full colour). This is the one orchestrated entrance. Everything else stays quiet.

| Token | Value | Use |
|---|---|---|
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances, reveals |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Moving things on screen |
| `duration-fast` | 150ms | Hover, press |
| `duration-base` | 240ms | Menus, small UI |
| `duration-slow` | 480ms | Lightbox, panels |
| `duration-hover-fill` + `ease-smooth` | 700ms, cubic-bezier(0.33, 1, 0.68, 1) | Circular hover fill on **every** button variant (primary → sindoor-deep, outline → ink, on-dark → blush); text colour in sync |
| `duration-menu-open` / `-close` | 700ms / 500ms | Mobile menu circle (radius = screen diagonal) |
| `duration-develop` | 900ms | Photo develop / hero only |

- Images develop the first time they enter view: a blush placeholder fades out as the photo fades in (no slide-ups on every section).
- Interactions respond: press scale 0.97, a circular "View" cursor on gallery photos (pointer devices only), and a lightbox that opens from the clicked photo.
- Lenis smooth scroll on desktop only.
- `prefers-reduced-motion`: no develop sequence, no smooth scroll, instant swaps.

## Review against the brief (what I changed)
- *First instinct:* black background with a red accent, a classic "cinematic photographer" look. **Rejected:** it's a generic default, and our red is close to vermilion, which makes it doubly common. **Changed to** white paper with deep-forest dark sections: grounded in Manipur and the red-green wedding palette.
- *First instinct:* cream background with a high-contrast serif. **Rejected:** too common a pattern. **Changed to** pure white (matching the logo) and Hedvig Letters, which is warmer and less expected than Cormorant or Playfair.
- *First instinct:* fade-up animations on every section. **Replaced** with a single "develop" idea that comes straight from the logo.

## Quality floor
Responsive from 360px; visible focus ring (2px `sindoor`, 2px offset); AA contrast; touch targets ≥ 44px; images in AVIF/WebP with explicit sizes; LCP image preloaded.

## Site shell
- **Header:** always visible (sticky). At the top of the page it is flat and transparent; over the first 80px of scroll a floating, rounded, frosted pill fades in (opacity + slight scale only, for smoothness); nav links centred, "Get a quote" on the right. Its edges align with page content at every width.
- **Large screens:** all content is capped at `--container-page` (1440px) and centred; full-bleed backgrounds (hero, forest sections) still run edge to edge.
- **Small screens:** hero is ~60svh on phones and ~88svh from `md` (placeholder; revisit with the real hero photo), and display type scales down to 44px at 320px wide.
