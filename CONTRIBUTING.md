# Writing and updating CrocoDocs pages

This project uses [Fumadocs MDX](https://fumadocs.dev/docs/mdx) for the handbook. Content lives in `content/docs/`; pages are `.mdx` files and sidebar groups/order are controlled by nearby `meta.json` files.

## Add a page

Create a `.mdx` file under the appropriate folder and begin it with YAML frontmatter:

```mdx
---
title: Page title
description: One sentence that appears in navigation and page metadata
icon: BookOpen
---

## First section

Write the page content here.
```

Use a registered Phosphor name with the `phosphor:` prefix, such as `icon: phosphor:BookOpen`. Register any additional names in `src/lib/source.ts`. Legacy Lucide names are still supported for existing pages. Add the page name to the folder's `meta.json` if the sidebar order is explicit. Nested directories with their own `meta.json` keep related pages together.

Engineering pages use the existing Phosphor library through the `engineering:` prefix, for example `icon: engineering:Wrench`. The supported names are registered in `src/lib/source.ts`; they share the red sidebar treatment. Engineering's root `meta.json` uses `---Section heading---` and `...folder` entries to show grouped article links, matching the Programming sidebar.

Portfolio is a separate root at `content/docs/portfolio/`, with registered `phosphor:` icons and grouped navigation. Its editorial and source register is [docs/portfolio-corpus.md](docs/portfolio-corpus.md). Case studies must distinguish season, division versus overall awards, and team-reported outcomes from independently verified results. Keep original reference PDFs and redacted material out of public assets.

## MDX features available here

- Standard Markdown: headings, lists, tables, links, blockquotes, and fenced code blocks with a language such as `java`, `kotlin`, `groovy`, or `bash`.
- `<Callout>` for a short note, warning, or tip. Supported styles include `info`, `warn`, and `tip`.
- `<Tabs items={['Java', 'Kotlin']}>` with matching `<Tab value="Java">` and `<Tab value="Kotlin">` children for equivalent code examples.
- `<LinkedCards data={[{ title, description, href }]}/>` for link cards on the introduction page.
- `<Wordmark />` for the CrocoDocs wordmark.
- `<FTCPlayground example="java-numbers" />` for an FTC Simulator example. Five introductory sections use editable Java or FTC Blocks, always with `theme=light`. Example source and IDs live in `src/lib/playground-examples.ts`; use complete OpModes or `.blk` documents and match the simulator's hardware configuration. Exercises need a visible result in the robot field; the embed has no telemetry panel. See [playground verification](docs/audits/playgrounds.md).
- Math using `$...$` inline or `$$...$$` on its own line (KaTeX renders it).

These project-specific components are registered in `src/mdx-components.tsx` and `src/app/docs/[[...slug]]/page.tsx`. Check those files before adding another component name.

## Links and images

Use relative links between nearby handbook pages when possible; the docs renderer resolves them against the current page. Use a site path such as `/docs/libraries` for a known route. Put static images in `public/` and refer to them with a root path, for example `![Robot coordinate axes](/coordinates.png)`. Write useful alt text. Keep source, license, season, and image attribution with the page when they matter.

Do not use `href="#"` as a placeholder. Link to a real route or remove the link until its destination exists. Check link targets when moving or renaming pages.

Use short topic headings such as “Encoder scale” or “Handoff geometry”. When renaming an existing heading, preserve its fragment with Fumadocs custom-ID syntax: `## Handoff geometry [#keep-the-handoff-constrained]`. Do not include a second H1 in the article body; frontmatter supplies the page title.

## Writing guidance

- Write for a teammate learning the topic. Use ordinary verbs and explain technical terms when they first help. Avoid research-process narration such as “source-checked”, “the supplied copy”, or repeated statements about what a test does not prove.
- Keep manual editions, review dates, and table numbers in the source register or audit notes. Mention a season or version in an article when it changes the rule, setup, or API the reader needs.
- Case studies should explain what a team did well, using selected page images beside the discussion. Credit the portfolio in Sources, keep page numbers clear, and give readers a way to open each image at full size.
- Separate general robotics concepts from season-specific facts.
- Put citations in one compact **Sources** section at the bottom of the article, inside `<footer className="article-sources">`. Use a short linked list with descriptive source names; keep source links and attribution out of explanatory paragraphs and image captions. Keep internal article links and navigation links in resource directories where they help the reader.
- For APIs, use the official project's current documentation and show the version context beside the example. List the exact upstream page in Sources.
- For game rules or scoring, include the current official Competition Manual and Team Updates in Sources. Keep rule IDs and qualifications in the explanation, and label older seasons as archives.
- State assumptions and hardware requirements. Avoid claims such as “always,” “guaranteed,” or exact performance numbers unless the cited source supports them.
- Keep each code sample focused. Make clear when it is illustrative and when it is ready to compile.
- Prefer short sections, descriptive headings, diagrams with alt text, and comparison tables where they make a choice easier.
- Use an image when it explains a relationship or step that is hard to see in text. Place it near the explanation, give it descriptive alt text, and label illustrative drawings so they are not mistaken for official field measurements.
- Give beginners one complete first exercise before adding optional techniques. Say when a code block is only a fragment or uses robot-specific values.

## Validate changes

Run `npm run check:docs` to check MDX syntax and local page, image, and sidebar links. Before submitting content changes, run the repository's production build (`bun run build`) so generated routes are checked. For edits to a library article, compare every dependency coordinate and API call with upstream documentation again. For season pages, record the manual version and review date you checked.
