# Readability and diagram follow-up

## Editorial changes

The Portfolio section was reread and rewritten in plain language. Manual editions, table references, checking dates, and reference-copy descriptions were removed from the reading flow. Rules that affect submission remain, including page/file limits, privacy, and event instructions. Existing source URLs remain in the footers.

The four case studies now explain strengths with eight selected page excerpts. Public critiques of another team's percentages, layout, and technical claims were removed. Excerpts retain the original artwork and existing redactions; source credits and full-size image links are provided.

The other 88 articles were screened through their openings, longer prose blocks, and repeated audit/caveat language. Twenty-seven received prose edits, plus Pure Pursuit's image-link change. Code fences, display equations, frontmatter, external source URLs, and the five commented-out playground sections remain unchanged. Contributor guidance and the local article skill now distinguish useful technical qualifications from audit narration.

## Diagram changes

All nineteen current SVG diagrams were inspected in Chromium with isolated SVG documents. Text bounds, text-to-text collisions, and sampled line/path crossings were checked alongside the rendered figures. Raster diagrams and annotated images were also inspected. Repairs affect eight figures:

- Motor model: move curve labels into a legend above the plot.
- Gear forces: move force labels into a clear row above the gears.
- Shaft supports: move force labels below the headings.
- Transfer: move the caption clear of the return arrow.
- Low-pass filter: separate the time label from the footer and remove the unintended axis-path fill.
- PID loop: place the feedback caption below its return line.
- Sensor fusion: wrap the localization explanation within its box.
- Pure Pursuit: replace the raster diagram with editable SVG, keeping labels clear of the circle and the complete circle inside the canvas.

The engineering generator includes the corresponding changes so regeneration preserves the fixes. The final nineteen-SVG geometry check finds no overlapping text, out-of-canvas text, or line/path crossing through text. This check supplements visual review; it is not a cross-browser rendering guarantee.

## Rendered checks

The revised Rebel Robotics page was inspected at 1280px and 390px. Both excerpts load, preserve their aspect ratio, fit the reading column, and have labelled full-size links. The eight original page renders were inspected before encoding. The homepage GitHub link is a grey Phosphor mark in a 44×44px target, with an accessible name, visible focus outline, and legible light/dark colours. No shared theme or reading-layout contract changed.

**ACCEPT** for this change: all 103 MDX pages and the production build pass, protected content is preserved, and the affected rendered checks pass. Publication status is tracked in `PROGRESS.md`.
