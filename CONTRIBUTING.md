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

Use an icon name exported by Lucide (`src/lib/source.ts` reads `lucide-react`). Add the page name to the folder's `meta.json` if the sidebar order is explicit. Nested directories with their own `meta.json` keep related pages together.

## MDX features available here

- Standard Markdown: headings, lists, tables, links, blockquotes, and fenced code blocks with a language such as `java`, `kotlin`, `groovy`, or `bash`.
- `<Callout>` for a short note, warning, or tip. Supported styles include `info`, `warn`, and `tip`.
- `<Tabs items={['Java', 'Kotlin']}>` with matching `<Tab value="Java">` and `<Tab value="Kotlin">` children for equivalent code examples.
- `<LinkedCards data={[{ title, description, href }]}/>` for link cards on the introduction page.
- `<Wordmark />` for the CrocoDocs wordmark.
- Math using `$...$` inline or `$$...$$` on its own line (KaTeX renders it).

These project-specific components are registered in `src/mdx-components.tsx` and `src/app/docs/[[...slug]]/page.tsx`. Check those files before adding another component name.

## Links and images

Use relative links between nearby handbook pages when possible; the docs renderer resolves them against the current page. Use a site path such as `/docs/libraries` for a known route. Put static images in `public/` and refer to them with a root path, for example `![Robot coordinate axes](/coordinates.png)`. Write useful alt text. Keep source, license, season, and image attribution with the page when they matter.

Do not use `href="#"` as a placeholder. Link to a real route or remove the link until its destination exists. Check link targets when moving or renaming pages.

## Writing guidance

- Separate general robotics concepts from season-specific facts.
- For APIs, use the official project's current documentation and show the version context. Link the exact upstream page near the example.
- For game rules or scoring, link the current official Competition Manual and Team Updates. Label older seasons as archives.
- State assumptions and hardware requirements. Avoid claims such as “always,” “guaranteed,” or exact performance numbers unless the cited source supports them.
- Keep each code sample focused. Make clear when it is illustrative and when it is ready to compile.
- Prefer short sections, descriptive headings, diagrams with alt text, and comparison tables where they make a choice easier.
- Use an image when it explains a relationship or step that is hard to see in text. Place it near the explanation, give it descriptive alt text, and label illustrative drawings so they are not mistaken for official field measurements.
- Give beginners one complete first exercise before adding optional techniques. Say when a code block is only a fragment or uses robot-specific values.

## Validate changes

Run `npm run check:docs` to check MDX syntax and local page, image, and sidebar links. Before submitting content changes, run the repository's production build (`bun run build`) so generated routes are checked. For edits to a library article, compare every dependency coordinate and API call with upstream documentation again. For season pages, record the manual version and review date you checked.
