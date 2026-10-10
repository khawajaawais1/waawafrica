# WaawAfrica — website

Modern, animated, high-performance site for **WaawAfrica** built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Deploy: push to GitHub and import into **Vercel** (zero config), or any Node host.

## Deploy to Vercel (with the events admin)

1. Push this folder to a GitHub repo and click **Add New → Project** in Vercel, import the repo (framework: Next.js, no settings needed).
2. **Storage for events:** in the Vercel project open **Storage → Create → Blob** (choose **Public** access) and connect it to the project.
   This adds `BLOB_READ_WRITE_TOKEN` automatically.
3. **Admin login:** in **Settings → Environment Variables** add
   * `ADMIN_PASSWORD` — the team password (required)
   * `ADMIN_EMAIL` — optional, also required at sign-in
   * `AUTH_SECRET` — a long random string (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
4. **Redeploy** (Deployments → ⋯ → Redeploy) so the new variables are picked up.
5. Go to **`https://your-site/admin`**, sign in, and add events. Saving updates the website straight away.

## Languages (English + Finnish)

* English lives at the normal URLs (`/about`), Finnish under `/fi` (`/fi/about`). The **EN | FI** switch in the header keeps you on the same page.
* The choice is remembered (cookie `lang`). First-time visitors whose browser prefers Finnish are sent to `/fi` automatically; search engines get both versions via `hreflang` tags and the sitemap.
* **All texts** are in `lib/i18n/en.ts` and `lib/i18n/fi.ts` (same keys — TypeScript complains if one is missing). `*word*` makes a word italic/accent, `**word**` bold.
* Photo alt texts in Finnish: `lib/i18n/alts.ts`.
* The admin area stays in English.

## Managing events (`/admin`)

* **+ New event** — title, edition (e.g. “Round 7”), short badge (e.g. “ANJ”), start/end (Finland time), venue, address,
  description, genres, poster image (auto-resized in the browser), line-up, ticket tiers, ticket link.
* The **home page “Next event”** section, the hero sticker, the Events page and `/events/<slug>` pages all update automatically.
* The **soonest upcoming published** event is featured. Tick **“Feature on home page”** (or press ★ Feature) to pin a specific one instead.
* Finished events move to **Past events** by themselves. **Unpublish** hides an event without deleting it.
* **Finnish version** (optional) — title, edition, description, payment note and ticket names in Finnish. Empty fields fall back to English on `/fi`.
* Each event gets its own page with **Add to calendar** (`/events/<slug>/calendar`) and Google-friendly event data.
* Locally (no Blob token) events are saved to `.data/events.json`, so you can try everything with `npm run dev`
  after creating `.env.local` from `.env.example`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, mission, pillars, next event + countdown, humanity teaser, moments |
| `/about` | Story, vision & mission, values, goals, motto |
| `/events` | Featured event (ANJ Round 6), more upcoming, formats, video reel, filterable gallery + lightbox, get involved |
| `/humanity` | Initiatives, impact story, gallery, partnerships, future initiatives |
| `/dakar-bazaar` | Coming-soon shop, category preview, waitlist, maker call |
| `/contact` | Contact form (topic pre-selected via `?topic=`), details, FAQ |
| `/events/[slug]` | One page per event (created from the admin) |
| `/fi/...` | Finnish version of every page |
| `/admin` | Team sign-in + event manager |

## Before launch — edit these

* **`lib/site.ts`** — email & phone are **placeholders**; set your real ones and your domain (`site.url`). The bookable offerings (workshops, shows) and gallery live here; dated events are managed in `/admin`.
* **Forms** — set the env var `FORM_WEBHOOK_URL` (Formspree, Zapier/Make, Slack webhook, your own API…) and every contact / waitlist submission is POSTed there as JSON. Without it, submissions are just logged on the server.
* **Copy** — story/impact text is written as a strong first draft; tweak it to your exact history.

## Assets

* Photos → `public/images/*.webp` (resized to ≤1600px and compressed, ~3.4 MB total for 43 photos). Alt text lives in `lib/images.ts`.
* Video loops → `public/video/*.mp4` (muted, 480p, ~0.4–1.3 MB each, with poster frames).
* Logo → `public/images/logo.webp` (transparent cut-out of the original).

To add a photo: drop a `.webp` into `public/images`, import it in `lib/images.ts` with alt text, then use it anywhere (`img.yourPhoto`).

## Performance & accessibility

> **Testing speed?** Always check with `npm run build && npm start`. `npm run dev` compiles every page and
> resizes every image on first request, so it is several times slower than the real site.

Lighthouse (mobile, production build): Home 87 · About 86 · Events 90 · Humanity 91 · Bazaar 93 · Contact 94; desktop Home 100. Accessibility 100.


* Pages are statically pre-rendered Server Components; JS is only shipped for the header, forms, gallery, countdown and videos.
* One shared IntersectionObserver drives all scroll reveals; CSS-only animations (GPU transforms/opacity).
* `next/image` → AVIF/WebP, responsive sizes, lazy loading, blur placeholders. Videos load and play only when visible.
* Self-hosted variable fonts (no external requests), `font-display: swap`.
* `prefers-reduced-motion` disables animation, marquees and video autoplay.
* Skip link, keyboard-accessible menu (focus trap + Esc), native `<dialog>` lightbox with arrow keys, labelled form fields with inline errors and `aria-live` status, alt text on every image.
* SEO: per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`, Event JSON-LD, `.ics` add-to-calendar.
