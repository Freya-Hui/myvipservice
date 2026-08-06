# MYVIPSERVICE

Private concierge & bespoke travel — marketing site. Astro static site, four languages (EN/ZH/FR/RU), content in Markdown.

Planning docs: [docs/PLAN.md](docs/PLAN.md) (full implementation plan) · [docs/cms-comparison.md](docs/cms-comparison.md) (CMS decision) · [docs/legal-notice-draft.md](docs/legal-notice-draft.md) · [docs/content-source-extract.md](docs/content-source-extract.md).

## Requirements

- Node.js ≥ 22.12 (see `engines` in `package.json`)

## Commands

| Command                | Action                                          |
| :---------------------- | :----------------------------------------------- |
| `npm install`            | Install dependencies                             |
| `npm run dev`             | Start the local dev server at `localhost:4321`   |
| `npm run build`           | Build the production site to `./dist/`           |
| `npm run preview`         | Preview the production build locally             |
| `npm run check`           | Type-check `.astro`/`.ts` files (`astro check`)  |
| `npm run lint`            | Lint with ESLint                                 |
| `npm run format`          | Format all files with Prettier                   |
| `npm run format:check`    | Check formatting without writing                 |

Run `check`, `lint`, and `format:check` before committing — there is no CI wired up yet, so this is the whole safety net.

## Project structure

```
src/
├── content.config.ts        # Content collection schemas (services, hotels, experiences, case studies, legal)
├── content/
│   ├── services/{en,zh,fr,ru}/*.md
│   ├── hotels/{en,zh,fr,ru}/*.md
│   ├── experiences/{en,zh,fr,ru}/*.md
│   ├── case-studies/{en,zh,fr,ru}/*.md
│   └── legal/{en,zh,fr,ru}/*.md
├── i18n/ui.ts                # UI copy (nav, footer, CTA) per locale
├── components/                # Header, Footer, LanguageSwitcher
├── layouts/BaseLayout.astro
├── styles/{tokens,global}.css # Design tokens + resets
└── pages/
    ├── index.astro           # Root: client-side language-detection redirect (no server at request time)
    └── [locale]/index.astro  # Homepage, one dynamic route generating /en/ /zh/ /fr/ /ru/
```

Every page under `[locale]` is generated once per locale via `getStaticPaths()`, reading `Astro.params.locale` — that's the pattern to follow when adding `about`, `services`, etc.

## Adding content

Each content collection is a flat glob across `en/ zh/ fr/ ru/` sub-folders — an entry's `id` is `<locale>/<slug>`, which is how pages filter by language (see `content.config.ts`). Add a new item by dropping a Markdown file with front-matter matching the collection's schema into the right locale folder; no code change needed.

## Business documents

`business-docs/` (KBIS extract, RIB, partnership decks) is git-ignored — never commit it. It's local reference material only.

## Not yet wired up

- **CMS**: recommended plan is Sveltia CMS via GitHub OAuth — see [docs/cms-comparison.md](docs/cms-comparison.md). Not installed yet.
- **Hosting**: Netlify, not yet connected — no `netlify.toml` yet.
- **Contact/bespoke-travel forms**: not built yet (Phase 4).
- **Legal Notice / Privacy Policy**: placeholder copy only — real copy is pending your sign-off on [docs/legal-notice-draft.md](docs/legal-notice-draft.md).
