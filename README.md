# SAGES Sohga — School Website

Production-ready website for **Swami Atmanand Govt English School, Sohga, Surguja, Chhattisgarh**.

## Stack

- **TanStack Start** (React 19, file-based routing, SSR) — the framework supported on this platform
- **TypeScript** (strict) · **Tailwind CSS v4** · **Framer Motion** (`motion`)
- shadcn/ui components · Lucide icons

> Note: the original brief specified Next.js + Sanity. This platform runs on TanStack Start, so the app was delivered on that stack. All content is centralised in `src/data/school.ts` in a CMS-shaped structure, so migrating to a headless CMS later only means replacing those constants with fetched data — the components stay unchanged.

## Pages

Home · About · Principal's Message · Academics · Admissions · Facilities · Staff · Gallery · Achievements · Results · Timetable · Notice Board · Downloads · Government Schemes · Events · Contact · Privacy · Terms · 404.

## Key features

- Design system (Royal Blue / Saffron / Green) via oklch tokens in `src/styles.css` — no hardcoded colors
- Responsive header with news ticker, mobile drawer, glassmorphism on scroll
- Validated forms (react-hook-form + zod) for admission enquiry & contact/feedback/complaint
- Search & category filters (staff, gallery, achievements, results, downloads, notices)
- Gallery lightbox, event & holiday calendar, FAQ accordion, Google Map embed
- SEO: per-route meta/OG, canonical, JSON-LD (`School`), `sitemap.xml`, `robots.txt`
- Accessibility: skip link, semantic landmarks, ARIA labels, visible focus, reduced-motion support
- PWA: `site.webmanifest`, theme color

## Content editing

Edit `src/data/school.ts` — school info, navigation, notices, news, staff, facilities,
events, results, timetable, downloads, schemes, testimonials, FAQs and gallery albums.

## Develop

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # production build
```

## Deploy

Publish from the Lovable editor (**Publish** button). To go live on `sagessohga.in`,
publish first, then connect the custom domain in Project Settings → Domains.

Once a domain is set, update `BASE_URL` in `src/routes/sitemap[.]xml.ts`.

## Optional backend (Lovable Cloud)

Forms currently show success toasts without persisting. To store submissions, manage
users/roles, or upload PDFs, enable **Lovable Cloud** and wire the forms to server
functions — the form schemas are already validation-ready.
