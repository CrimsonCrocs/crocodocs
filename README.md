# CrocoDocs

CrocoDocs is a student-written guide to FIRST Tech Challenge (FTC) robot programming. It is built with Next.js, TypeScript, Tailwind CSS, and Fumadocs MDX.

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

## Deploy on Vercel

Import the `upsidedly/myFIRSTjournal` GitHub repository into Vercel and set the production branch to `main`. Vercel should detect Next.js automatically. Use the install command `bun install` if the project is configured for Bun; the build command is `bun run build`, and the output is the Next.js default. Add `OPENROUTER_API_KEY` only if the AI endpoint is enabled. Check the Vercel deployment log for the commit SHA and build errors when a GitHub push does not appear on the live site.

The Vercel project and its Git integration are configured in the Vercel dashboard; this repository has no checked-in `vercel.json` or project-link metadata.
