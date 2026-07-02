# Sanity CMS Integration

This site now pulls its editable content from Sanity instead of the hardcoded
`src/data/school.ts` file. Here's what changed and how to use it.

## ⚠️ Do this first: rotate your API token

You shared a Sanity write token in plain chat text. Treat it as compromised:

1. Go to https://www.sanity.io/manage → your project (`dak1oghg`) → API → Tokens
2. Revoke the old token
3. Create a new one ("Editor" permission is enough) for use in `studio/.env` (only needed to run the seed script, never committed)

## What was built

**`studio/`** — a standalone Sanity Studio (the admin UI where you'll edit
content). It's a separate mini-project on purpose — Sanity Studio doesn't
plug cleanly into a TanStack Start/Vite app, so it runs and deploys on its
own, independent of your website's build.

- `studio/schemaTypes/` — one schema per content type: notices, news,
  achievements, facilities, staff, events, holidays, downloads (PDFs),
  schemes, testimonials, FAQs, results, gallery albums, plus three
  "singletons" (site settings, timetable, academics) that only ever have one
  document.
- `studio/scripts/seed.mjs` — one-time script that pushes your existing
  hardcoded content into Sanity so you're not starting from a blank slate.

**`src/sanity/`** — the website's read side:
- `client.ts` / `env.ts` — Sanity client (public, read-only, no token needed)
- `queries.ts` — a GROQ query per content type
- `fetch.ts` — typed functions like `getNotices()`, `getStaff()`, etc. Each
  one tries Sanity first and **falls back to the original static content**
  if Sanity has nothing yet or a request fails — the site can't go blank.

Every route that previously imported static arrays from `@/data/school` now
has a TanStack `loader` that calls these fetch functions instead, so pages
are still server-rendered with real data, just sourced from Sanity.

**Wired to Sanity:** home, notices, news, achievements, facilities, staff,
events, holidays, downloads (PDFs), schemes, testimonials, FAQs, results,
timetable, academics, gallery, about, principal-message, contact.

**Left static (low CMS value, rarely edited):** terms, privacy, admissions
page boilerplate, header/footer/nav labels, and the two decorative stock
photos on the homepage/about hero. Ask me if you'd like these wired up too.

## Setup steps

```bash
# 1. Install the studio's own dependencies
cd studio
npm install
cp .env.example .env
# paste your NEW token into .env

# 2. Push your existing content into Sanity (safe to re-run)
npm run seed

# 3. Run the Studio locally to check it out
npm run dev
# opens at http://localhost:3333

# 4. Deploy the Studio so you can edit from anywhere
npm run deploy
# choose a studio hostname, e.g. sages-sohga -> sages-sohga.sanity.studio
```

```bash
# 5. Back in the website root — install the new client libraries
cd ..
npm install   # picks up @sanity/client and @sanity/image-url from package.json

# 6. Run the site as usual
npm run dev
```

The seed script creates text content only — it can't invent photos or PDFs
that never existed as files. After seeding, open the Studio and attach:

- Photos to **Facility**, **Staff Member**, **Gallery Album**, and
  **Testimonial** documents
- Actual PDF/document files to new **Download (PDF/Document)** entries
  (title suggestions are printed by the seed script)

## Editing day-to-day

Once deployed, go to `https://<your-studio-name>.sanity.studio`, log in with
your Sanity account, and edit any content type from the left sidebar —
changes appear on the live site within seconds (no redeploy needed, since
the site fetches from Sanity's CDN at page-render time).

## Notes

- Your project ID (`dak1oghg`) and dataset (`production`) are already wired
  into both the Studio and the website.
- The dataset is read publicly (no token needed) so the website can fetch
  without exposing a secret — this is normal and fine for a public school
  site with no private data.
- If you ever want to lock the dataset down, you'd add a read token via a
  server-side proxy — ask if you want that.
