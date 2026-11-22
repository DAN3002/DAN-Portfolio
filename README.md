# DAN3002 Portfolio

<p align="center">
  <img src="./readme-images/banner.png" alt="DAN3002 portfolio">
</p>

The personal site of Nguyễn Đình Anh, live at [dan3002.id.vn](https://dan3002.id.vn/). It is a static site with no client framework: plain HTML and a few small scripts, built at deploy time.

## Stack

- [Astro 7](https://astro.build/) builds the static site; images are resized and converted to AVIF/WebP at build time.
- [Tailwind CSS v4](https://tailwindcss.com/) provides styling, with the design tokens in `src/styles/global.css`.
- TypeScript (strict), ESLint, and a husky pre-commit lint.
- Self-hosted fonts: Bricolage Grotesque, IBM Plex Sans and IBM Plex Mono.
- [Umami](https://umami.is/) for analytics, and [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) plus a Worker for the contact form.

## Getting started

Requires Node 22.23+ and pnpm.

```sh
pnpm install
cp .env.example .env   # optional: analytics, contact form, GitHub token
pnpm dev               # http://localhost:4321
```

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Type-check, then build to `dist/` |
| `pnpm preview` | Serve the built `dist/` |
| `pnpm lint` | ESLint |

## Editing content

All content lives in typed files under `src/data/`:

- `site.ts`: name, email, socials, nav and skills.
- `career.ts`: current role, experience, education and activities.
- `projects.ts`: projects. Put screenshots in `src/assets/projects/` and reference them with `asset('projects/<file>')`.
- `credentials.ts`: awards, AWS certifications and courses.

A missing image path fails the build, so a typo never ships.

## Environment

| Variable | Used for |
|---|---|
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami analytics (off when empty) |
| `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_EMAIL_API_ENDPOINT` | Contact form overrides; defaults are the production key and Worker |

GitHub stats need no key. They're kept fresh in three layers:

1. **Build:** `src/lib/github-build.ts` fetches from public endpoints (the contributions API by jogruber, plus GitHub's REST and search APIs). Any field that fails, such as a rate-limited CI runner, falls back to the committed `src/data/github-snapshot.json`. A fully successful fetch rewrites that file.
2. **Rebuild:** every push to `main` redeploys on Cloudflare Pages. A scheduled deploy hook can refresh it daily.
3. **Browser:** `src/lib/github-live.ts` refreshes when the browser is idle. It caches in `localStorage` for about 6 hours, waits 30 minutes before retrying after a failure, and validates everything it reads.

## Deployment

Cloudflare Pages (project `dan-portfolio`) builds every push: `main` goes to production at dan3002.id.vn, other branches get a preview URL. Its build settings are: command `pnpm build`, output `dist`, and Node from `.node-version`. The `PUBLIC_*` values are set as Pages environment variables.

## License

MIT.
