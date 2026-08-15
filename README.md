# Shark — Find Your Perfect Gym

A single-page marketing and gym-discovery site for a fitness platform concept.
Dark-first, gold-and-black, built to feel like a product rather than a template.

This is a **website, not an app**. There is no backend, database, auth or
payment layer — every interaction runs on local mock data in the browser.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static prerender
npm run typecheck
```

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide.
UI primitives are hand-rolled in the shadcn idiom (`components/ui`) rather than
pulled in wholesale, to keep the dependency footprint small.

## Layout

```
app/          layout, page composition, global tokens
components/   sections + ui/ primitives
data/         gyms, trainers, classes, memberships, testimonials, categories
lib/          utils, search index, site config, hooks
public/       favicon
```

## What actually works

Nothing here is a decorative button. Every control does something real:

| Control | Behaviour |
| --- | --- |
| Search (⌘K, navbar, hero) | Live client-side search across 32 listings with keyboard nav, recent searches (localStorage) and popular queries |
| Gym filters | Discipline, city, max price, max distance, min rating, facilities, plus four sort orders — all applied to real data |
| Gym / trainer / class cards | Open a detail dialog with the full record |
| Comparison table | Add and remove gyms; best value per row is marked |
| Map radius | Recomputes what's in range and redraws the ring |
| Shortlist (heart) | Persists to localStorage |
| Theme toggle | Dark ⇄ light, persisted, cross-faded |
| "Get Started" / "Enquire" | Opens an email-capture dialog that validates locally and says plainly that nothing is sent |

## Design system

Colour is driven by CSS custom properties in `app/globals.css` (`--base`,
`--card`, `--gold`, …) and surfaced to Tailwind as semantic names — `bg-base`,
`text-muted`, `border-line`. Both themes were tuned against WCAG AA: the light
palette uses a darker gold (`133 95 12`) so gold text and the ink-on-gold CTA
clear 4.5:1, which the obvious brighter gold does not.

Type is Sora for display and Manrope for body, loaded via `next/font`.

## Accessibility

Semantic landmarks, one `h1`, no heading-level skips, labelled controls,
visible focus rings, a skip link, focus-trapped dialogs with restore-on-close,
and `prefers-reduced-motion` honoured in both CSS and the motion layer.
A `<noscript>` rule reveals scroll-animated content when JS is unavailable.

## Data

Mock records use realistic Pakistani cities and PKR pricing. Photography is
loaded from Unsplash via `next/image`; `SmartImage` falls back to a designed
gradient if a remote image fails, so the composition never breaks.
