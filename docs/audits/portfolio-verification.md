# Portfolio and article review verification

October 14, 2026. **Verdict: ACCEPT** for the local documentation, editorial, navigation, and header changes.

## Delivered scope

- Fifteen Portfolio pages: ten handbook pages, one case-study index, and four detailed Inspire case studies. Official TU04 award criteria and four source portfolios were reviewed; methods, limitations, and provenance are in `docs/portfolio-corpus.md` and `docs/portfolio-sources.json`.
- Portfolio navigation, sidebar icons, homepage card, footer, metadata, and cross-links.
- Full prose review of all 103 MDX articles: 53 edited, 50 kept. Code, display math, inline code, Markdown link destinations, and complete Sources footers match their recorded baselines.
- Shared slim pill search and theme switch. The search surface is 34 px tall within a 44 px button. The switch has a 24 px icon-bearing thumb, 180 ms travel, 100 ms icon fade, and immediate reduced-motion behavior. Mobile docs retain the switch in the navigation footer; the homepage exposes it directly.

## Project checks

| Check | Result |
| --- | --- |
| `bun run check:docs` | PASS, all 103 pages, including the final dictionary description |
| `bunx tsc --noEmit` | PASS |
| `bun run build` | PASS after the final article and header changes; 110 static pages generated |
| `git diff --check` | PASS |
| Protected article content | PASS across all 103 baselines |
| HTTP routes | PASS: homepage, all fifteen Portfolio routes, and four representative existing articles; see `portfolio-route-checks.json` |
| Sources | All fifteen new articles keep external citations in their bottom Sources section; eighteen supporting URLs returned HTTP 200 during source review |
| Search | Seattle Solvers appears in results; selecting its title opens the case study and closes search |

The final build reports 108 kB first-load JS for the homepage and 181 kB for documentation, compared with the earlier 109/182 kB build in this task. This is build output, not a field-performance measurement.

## Rendered checks

Chrome on macOS was the final acceptance browser. Earlier T3 preview checks covered 320, 430, 768, 1280, and 1600 CSS-pixel layouts. Chrome then verified the changed controls and final content at 320, 768, 1280, and the default 1456 px viewport. The 320 px path supplies narrow-screen reflow evidence; no physical phone testing is claimed.

- All three documentation tabs fit at 320 px, with 44 px height. Tables scroll inside their wrappers rather than widening the document.
- The homepage stacks three cards at 320 px, uses two columns with a full-width Portfolio card at 768 px, and shows three columns on desktop. The collection graphic remains readable.
- Search and the theme switch fit together on the 320 px homepage. Search has one visible trigger, a rounded surface, and a readable shortcut on larger screens.
- Light and dark articles, sidebar icons, homepage cards, header, and switch were visually inspected. Reloading with a saved dark theme preserves both the appearance and `aria-checked=true` without a new hydration error.
- Keyboard Space toggles the switch. Search opens with its text field focused. Search-result navigation works.
- In the mobile docs menu, focus begins on Close navigation. Shift+Tab reaches the theme switch, Space toggles it, and Tab wraps back to Close. Escape restores focus to Open navigation and releases the background scroll lock.
- Browser frame samples confirm thumb travel from x=24 to x=0 over approximately 180 ms with intermediate positions and no overshoot. Reversing after about 65 ms settles at the correct endpoint; sampled positions remained within 0–24 px. The largest sampled interval during that small interaction was 12.6 ms. This is a local interaction sample, not a site-wide performance benchmark.
- With `prefers-reduced-motion: reduce`, computed transition duration is 0 s and the checked state and thumb endpoint still update. Emulation and viewport overrides were reset, and the prior unset theme preference was restored after testing.

## Defects and recovery

| Finding | Resolution and regression evidence |
| --- | --- |
| Local disk filled; dev requests failed with ENOSPC | Stopped the server and cleared only this repository's generated `.next` cache; repaired installed packages. Final build and routes pass. |
| Bun's global isolated layout resolved KaTeX CSS outside the project | Reinstalled with the hoisted linker and added project `bunfig.toml` so future installs retain that layout. KaTeX assets and final route/build checks pass. |
| Theme provider suppressed the new thumb animation | Scoped the switch's transform/opacity transition exception; retained a stronger reduced-motion override. Actual intermediate positions and reduced-motion endpoint checked. |
| Saved dark theme caused a server/client `aria-checked` mismatch | Defer the checked-state reading until mount. Fresh dark reload has matching appearance and checked state, with no new hydration error. |
| Default homepage navigation crowded search at 320 px | Replaced its empty mobile dropdown with a small homepage header containing the shared controls. Both controls are visible and fit at 320 px. |
| T3 preview intermittently timed out and saved an incorrectly sized canvas | Used the permitted Chrome fallback for visual and interaction acceptance. The T3 screenshot is not treated as proof of the actual layout. |

No unresolved in-scope failure remains. Firefox, WebKit, physical touch devices, screen-reader operation, text-only enlargement, and field Core Web Vitals are **UNTESTED**. This is local development acceptance, not a deployment, public release, robot test, or guarantee of historical portfolio claims. Original portfolio PDFs were not republished or shared differently.

The dev server is running on port 3000. Changes remain local; no commit, push, or deployment was performed.
