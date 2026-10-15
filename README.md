# CrocoDocs

CrocoDocs is a student-written guide to FIRST Tech Challenge (FTC) engineering and robot programming. It is built with Next.js, TypeScript, Tailwind CSS, and Fumadocs MDX.

## Run locally

Use [Bun](https://bun.sh/) with the checked-in `bun.lock`:

```bash
bun install
bun run dev
```

Open the local URL printed by Next.js (usually `http://localhost:3000`). For a production build, run `bun run build`, then `bun run start`.

The optional `/api/ai` route requires an `OPENROUTER_API_KEY` environment variable. The rest of the site can be browsed without it.

## Content

Handbook pages are MDX files in `content/docs/`. Navigation order and groups are defined in `meta.json`. See [CONTRIBUTING.md](./CONTRIBUTING.md) for frontmatter, components, images, links, and content review guidance.

The docs sidebar switches between **Programming** (`/docs`, with existing page URLs preserved), **Engineering** (`/docs/engineering`), and **Portfolio** (`/docs/portfolio`). Engineering includes a first-build path, mechanical fundamentals, mechanisms, manufacturing, electrical integration, and team testing. Portfolio includes planning, award evidence, writing, judging, and four Inspire case studies. Source and editorial notes are in [docs/engineering-corpus.md](./docs/engineering-corpus.md) and [docs/portfolio-corpus.md](./docs/portfolio-corpus.md).

The project-local [StudyVault Article Writer skill](./.agents/skills/studyvault-article-writer/SKILL.md) is adapted for CrocoDocs. Regenerate its original engineering diagrams with `node scripts/build-engineering-figures.mjs`. Validate content with `bun run check:docs` and `bun run build`.

## Deploy on Vercel

Import the `CrimsonCrocs/crocodocs` GitHub repository into Vercel and set the production branch to `main`. Vercel should detect Next.js automatically. Use the install command `bun install` if the project is configured for Bun; the build command is `bun run build`, and the output is the Next.js default. Add `OPENROUTER_API_KEY` only if the AI endpoint is enabled. Check the Vercel deployment log for the commit SHA and build errors when a GitHub push does not appear on the live site.

The Vercel project and its Git integration are configured in the Vercel dashboard; this repository has no checked-in `vercel.json` or project-link metadata.
