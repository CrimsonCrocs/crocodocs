# Engineering corpus

Reviewed: 14 October 2026.

## Scope and navigation

The Engineering handbook contains 29 MDX pages: an entry page, a first-build exercise, 3 design articles, 6 mechanical fundamentals, 7 mechanism articles, 4 manufacturing articles, 2 electrical integration articles, 3 build/testing/team articles, a glossary, and a resource guide. It is an original synthesis for new and experienced FTC teams, not a complete mirror of the upstream sites.

Fumadocs 15 uses `root: true` on `content/docs/engineering/meta.json` to isolate its sidebar. The two explicit sidebar tabs in `src/app/docs/layout.tsx` provide Programming and Engineering navigation. The top-level page-tree root is not automatically offered as a tab by this installed version, so relying only on metadata would omit Programming from the selector. Existing programming URLs remain at their original routes.

The first-build path owns a working kit drivetrain and repeatable driving checks. Experienced readers can enter through a symptom-to-topic table. Articles define local prerequisites and combine explanation, worked calculations, design tradeoffs, failure diagnosis, and practical checks. The handbook links to existing programming articles for control and vision implementation. At the user's request, the sidebar uses visible section separators and expanded article groups like Programming. Every Engineering page has a red Phosphor icon, using the already-installed library and a scoped `engineering:` frontmatter resolver. Existing Programming icons are preserved.

## Research and editorial decisions

Starting points were [GM0 useful resources](https://gm0.org/en/latest/docs/useful-resources.html) and [FTC Wiki](https://www.ftcwiki.org/). Relevant linked GM0 design, hardware, mechanism, fabrication, motor, servo, and wiring pages were inspected. FTC Wiki's published page index was used to locate manufacturing, assembly, material, design-style, power-transmission, and mechanism pages. Relevant substantive passages were read before drafting; merely appearing in an index was not treated as technical verification.

The exact supporting links are retained near the explanations in each article. The resource guide distinguishes community teaching from official rules and manufacturer ratings. A machine-readable source register maps every Engineering article's external references to the page and link-check evidence. HTTP success establishes reachability only; it does not independently establish technical accuracy.

- FTC Wiki's shaft, belt, chain, drivetrain, and several slide/rigging pages were empty or effectively navigation stubs during research. They were not used as evidence for those mechanisms. GM0 and manufacturer material filled that coverage.
- FTC Wiki's gear-ratio page states a reduction correctly in its initial example but reverses the speed/torque wording later. The handbook defines reduction explicitly as input speed divided by output speed, uses driven/driver tooth counts, and keeps that convention throughout.
- FTC Wiki's motor example combines assumptions in a way that can confuse free-speed and loaded power. The handbook instead separates free speed, stall torque, loaded operating points, and idealized DC motor behavior. Its motor graph is a normalized mathematical illustration, not vendor test data.
- A steel property table on FTC Wiki retains aluminum alloy column labels. No numerical stock-property table was imported. Articles direct readers to the exact material supplier and temper.
- Broad claims such as all four-bars preserving orientation, a material combination always being unsuitable, or one universal printed clearance are avoided. The handbook states the geometry or compatibility conditions.
- FIRST and REV electrical specifications take precedence over generic community pinout advice. Control Hub servo limits and sensor logic compatibility are linked directly to the manufacturer. No fixed season-specific motor list, robot limit, scoring table, or legality assertion was added.
- Archived REV launcher examples are identified by season and used for mechanism context, not current-game requirements.
- Two SDP/SI HTML endpoints returned incomplete HTTP 307 responses during validation. The belt article and resource guide use the publisher's accessible technical handbook PDF instead. FTC Onshape returned HTTP 403 to the local checker but its public page and library navigation were verified through the web tool.

The entire NASA RAP design book, every GM0 outgoing link, CAD courses, videos, and paid resources were not exhaustively reviewed. They are discovery references where listed. The corpus does not claim that uninspected material was verified. Prices, vendor rankings, and unsupported performance claims were omitted.

## Authorship and assets

All new prose, tables, worked examples, and diagrams are original. Source books, page images, team photographs, and raw downloaded text are not hosted in the repository. No upstream article or diagram was copied or closely redrawn.

The five SVG figures in `public/guides/engineering/` are generated by `scripts/build-engineering-figures.mjs`: shaft support, arm loading, an ideal DC motor model, transfer ownership, and a tolerance stack. They are labeled illustrative and not to scale. Article alt text describes their meaning. Rebuild them with:

```bash
node scripts/build-engineering-figures.mjs
```

Numerical examples are illustrative and state their assumptions. They are not measured robot results, approved hardware configurations, or component load ratings. A final editorial pass followed the StudyVault Article Writer voice reference and Deslop preservation guidance.

## Installed writing skill

The user-requested StudyVault Article Writer was found in the sibling StudyVault project's `.agents/skills/studyvault-article-writer` directory and installed into this repository at the same relative skill path. Its voice reference was retained. A CrocoDocs adaptation at the top of `SKILL.md` replaces StudyVault syllabus, directory, component, ordering, and validation contracts with this repository's actual ones. Its agent metadata describes this adapted purpose. No StudyVault application or corpus files were modified.

## Validation contract

Required checks are MDX syntax with the same math parser used by the app, local page/image/navigation targets, a full production build, and browser inspection of section switching, a representative equation and figure article, search, and narrow-layout navigation. The existing checker now loads `remark-math`; parsing math as MDX expressions produced false syntax failures for valid equations.

The pulled repository imported `katex` in styling, `@mdx-js/mdx` in its docs checker, and `unified`/`mdast` types in its remark plugin without declaring those direct dependencies. They are declared at the appropriate runtime/development scope. KaTeX CSS is imported once through `global.css`. A pre-existing dependency tree linked into a global cache produced incorrect React icon types; a fresh local install restored proper resolution without type assertions or disabled checks.

Physical robot builds and component ratings have not been experimentally validated by this software change. Cross-browser release testing, real-device touch testing, and screen-reader operation are outside this content/navigation change's performed matrix; they must not be implied by an acceptance verdict.

## Verification result

**ACCEPT** for the requested local Engineering corpus and navigation, including the subsequent request for visible sections and colored sidebar icons.

- `bun run check:docs`: all 76 MDX pages pass syntax, local links, image paths, and navigation checks.
- `bun run build`: production compilation, lint/type validation, page-data collection, and all 83 generated static pages pass after the final source changes.
- All 29 Engineering routes returned HTTP 200 with no module or KaTeX error markers. The final production build also generated every docs route.
- Eighteen worked numerical results were recalculated independently and agree within displayed rounding.
- Chrome desktop at 1280 and 1456 CSS pixels: section switching, article hierarchy, search results and result navigation, equations, and a representative original figure inspected. All 29 Engineering sidebar links have their red icons. Both existing light and dark themes inspected.
- Keyboard Enter opens the section selector and activates Programming; existing Programming links and URLs remain available. Mobile sidebar opening and dismissal were exercised.
- Narrow viewport emulation at 375 and 320 CSS pixels: sidebar groups/icons, article reflow, overview comparison table, and long equations inspected. The long flywheel derivation is broken into aligned steps. Display equations scroll locally when needed, preserving the left edge and centering short equations; the page remains within the viewport. This fixes an observed 320-pixel equation overflow rather than hiding page overflow.
- Final browser inspection reported no console errors. Temporary viewport and theme changes were restored, and the development server was left running on port 3000 with the Engineering overview open.

The first baseline attempt was blocked by the pulled code's undeclared KaTeX dependency. The first preview backend subsequently timed out twice; rendered verification used a separate Chrome connection. The clean local dependency installation resolved the stale styling/type-resolution state. No checks were disabled, types weakened, or global overflow clipping introduced.

No public deployment, GitHub push, or physical robot validation was performed. Field performance metrics and non-Chromium browsers were not tested.
