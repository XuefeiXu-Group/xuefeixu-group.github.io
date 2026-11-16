# Xuefei Xu's Group Website

Theoretical and computational chemistry at Tsinghua University.

## Preview on Windows

Double-click **`preview.cmd`** in the repository folder. Keep the window open,
then open the local URL printed there, normally **http://127.0.0.1:4173/**.
Press Ctrl+C in that window to stop the preview.

This previews the last production build and needs no package installation.
The launcher uses a local Node.js installation or the runtime bundled with Codex.
It does not publish anything to GitHub.

Alternatively, with Node.js on PATH:

```powershell
cd D:\codexjob\group_web
node scripts/preview.mjs
```

## Editing and live preview

With Node.js and npm installed:

```powershell
npm ci
npm run dev
```

Open the Local URL printed by Vite. Source edits refresh automatically.
Research figures, portraits, and papers are served from the repository's
existing `assets/` and `papers/` folders in development as well as in the build.

## Production build

```powershell
npm run build
```

The source application lives in `site/`. The build writes the deployable site to
`dist/` and synchronizes generated entry files and bundles to the repository
root for GitHub Pages. Rebuild after source changes before using `preview.cmd`.

## Site structure

- `/` — research introduction, research directions, recent publications, group, and open positions
- `/research` — research directions and recent-work highlights
- `/publications` — the group publication list, organized by year
- `/members` — PI, postdocs, students, and alumni
- `/members/<name>` — profiles, research interests, and first-author publications
- `/software` — TUMME, MSTor, and Polyrate, with overview, features, advantages, and papers
- `/news` — group updates and a looping group photo wall
- `/news/<slug>` — individual news articles
- `/links` — resources, journals, databases, courses, and tutorials
- `/contact` — address, email, telephone, and academic profiles

## Adding content

- In `site/src/data.js`, add `biography` and `researchInterests` to each member as details become available. A paper's `firstAuthor` should match the member's name or their `authorName` where a different spelling appears in the publication.
- Add items with `title`, `summary`, and `doi` to each research direction's `recentWork` array. An item can also include `image` and `imageAlt`.
- Add `overview`, `features`, and `advantages` to each software entry. To list an existing paper, put its full DOI URL in `relatedPapers`.
- Add news entries in `site/src/news.js`. Use a unique `id`, a date in `YYYY-MM-DD` format or a four-digit year, and an `image` path under `/assets/`. Each entry's image also appears in the photo wall.
