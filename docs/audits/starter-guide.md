# Starter Guide implementation and evidence

Scope: new high-school beginner path at `/docs/starter-guide`, separate from the three existing handbooks. Intentional Build is the write owner; My Taste, CCC, FTC, Docs Writer, StudyVault Article Writer, and Deslop advise. No new dependency, account system, progress tracker, or analytics change.

## Content and source decisions

- Eighteen lessons cover FIRST/FTC, team registration and adult support, meetings, finance and tools, safety, game strategy, hardware, building, wiring, programming, autonomous and driving, CAD, manufacture, documentation, outreach, judging, events, and season planning. A landing page and glossary bring the new total to twenty MDX pages.
- Original plain-English explanations define terminology in place; the glossary supports lookup. Citations stay in small Sources footers. No review dates or research narration in articles.
- FIRST live materials checked 23 October 2026: BIOBUZZ Competition Manual TU06 and Team Update 06, published 22 October. Eligibility, event safety, portfolio limits, interview structure, and award descriptions were compared with the current material. Regional registration and safeguarding requirements remain explicitly regional. No season-specific scoring thresholds or untested team strategy are imported into this general guide.
- The supplied *Learn Onshape for FTC*, Alan G. Smith, 18 October 2026, is 158 PDF pages. Read the introduction and beginner part/spacer exercises, plus robot space planning and assembly/BOM passages. Visually inspected printed pages 19 and 75. Cross-checked the relevant dimension, extrude, mate, BOM, and export operations with Onshape Help and its FIRST education page. The PDF says All Rights Reserved: it and its screenshots are not redistributed or redrawn. The mounting plate is an original exercise. Public credit links to the author's repository.
- Plate: 60 × 40 × 3 mm; two 4.5 mm through-holes, centres at (10,20) and (50,20) mm relative to the lower-left corner. Centre distance is 40 mm. These are practice dimensions, not a verified vendor mounting pattern or manufacturing-fit claim.
- Existing vendor servo photograph reused with its existing provenance. No new vendor asset downloaded.

## CCC references and adaptations

### Sketch-to-part model

Gap: beginners need to connect a flat sketch, an extrusion depth, and material removal to the resulting object before using an unfamiliar CAD editor.

Inspected [Bartosz Ciechanowski's Gears](https://ciechanow.ski/gears/) in the live browser, including the fan illustration, its nearby continuous slider, and playback control. Read the page's control explanation and inspected the slider DOM. Observed pattern: one nearby input changes one physical relationship in a fixed illustration; the explanation remains beside it. This is an interaction reference, not a claim that its renderer or code was reused.

Adaptation: an original SVG parallel projection of a plate, three explicit operation buttons, two native bounded sliders, and fixed top/angled views. No automatic motion, free-camera complexity, external renderer, code copy, or borrowed artwork. Disabled controls express which operations do not exist yet; keyboard-operable controls and a text description expose the same dimensions. Reset restores the exercise. Native range inputs supply pointer, keyboard, and touch behavior.

### Blocks playground

Inspected `src/components/ftc-playground.tsx`, `src/lib/playground-examples.ts`, and the existing Blocks article. Reuse the actual single-file `.blk` example and deployed simulator rather than inventing a facsimile. The exercise changes the first sleep duration and observes movement, not removed telemetry. Themes follow `resolvedTheme`; prose explains that changing theme resets the embed and that a real Driver Station separates Init and Start.

## Links repaired before release

These were draft-only links, never released:

| Draft target | Replacement | Reason |
| --- | --- | --- |
| `docs.revrobotics.com/duo-build/actuators/servos/srs` | `docs.revrobotics.com/rev-crossover-products/servo/smart-robot-servo-v2` | Old guessed path returns 404; the current manufacturer page describes the photographed V2. |
| `docs.revrobotics.com/duo-build/battery` | REV's `12v-battery-best-practices-and-troubleshooting` | Draft path returns 404; use the manufacturer's actual battery guidance. |
| GM0 `being-a-team/strategy.html` | `design-skills/design-strategy.html` | Draft path returns 404; strategy is in Design Skills. |
| GM0 `being-a-team/drive-team.html` | `design-skills/design-strategy.html` | Draft path returns 404; the inspected strategy page covers driving practice. |
| `/docs/engineering/manufacturing` | `/docs/engineering/manufacturing/3d-printing` | Manufacturing is a navigation group with no index article. Link to the relevant introductory guide. |

Existing live links were preserved. Redirecting Onshape mate/BOM links were normalized to their current canonical Help paths.

## Acceptance checks

Focused Intentional Verify: **ACCEPT** for the implementation below. Normal Git publication and the production canary are recorded after deployment.

- All 20 new routes return HTTP 200 with one H1. All 30 internal destinations linked by the new rendered pages and all 37 external Sources destinations return 200. Sources are in footers; the final prose pass preserves definitions, technical qualifications, and explicitly labelled invented examples.
- `bun run check:docs`: 133 pages pass syntax, local link, asset, and navigation checks. `bun run build`: optimized production compilation, type/lint checks, and static generation pass. The final subsequent change is a plain-text CAD closing sentence, checked again with `check:docs`; UI/build inputs are otherwise unchanged. The remote production build will validate the released revision.
- Rendered Chromium checks: 320px, 390px, 768px, 1280px, and 1440px representative pages. Checked homepage entry; four-section header and active states; numbered course landing and its TOC anchors; topic/sidebar transitions; CAD article/model; glossary reflow; and article-width Blocks embed. Both light and dark views were inspected. No page overflow remains in the checked states.
- CAD controls: stage selection, exclusive view selection, thickness Home/End (1/8 mm), maximum hole diameter (8 mm) with fixed centres at (10,20)/(50,20), and Reset (3 mm, 4.5 mm, Sketch, Angled view, both ranges disabled). Native keyboard input changes visible geometry and accessible text. Model bounds and dimensions checked; labels do not cross the plate or dimension lines. Accent text contrast is 6.02:1 light and 9.49:1 dark; body notes exceed 4.5:1 on the local surfaces.
- Mobile navigation: opening focuses Close; background is inert and body scrolling is locked; Shift-Tab wraps to the theme switch; Escape closes and restores focus/scrolling. The new guide's 20 navigation links remain reachable. Existing handbook sidebars and active states work after section changes.
- Blocks: original example reaches Finished; Play/Stop controls, Code/Simulator view changes, and Reset exercised within the article. Edited the actual first sleep field from 700 to 1400 using keyboard input, confirmed the workspace stores 1400 while the later sleep remains 700, ran the released embed to Finished without an alert, and observed the changed final position compared with Reset. No telemetry exercise or Java substitute. The real iframe URL changes from theme=light to theme=dark when CrocoDocs changes theme.
- Component review: small local state, native controls, stable list keys, server-rendered lesson content, no new dependency or network service. A scoped four-file source scan and its no-config counterpart found no design issues; slop scan inspected all four files with zero findings. These are supporting checks, not visual proof.

## Repairs during verification

| Finding | Repair and relevant check |
| --- | --- |
| Four tabs extended beyond a 320px viewport. | At the smallest breakpoint, reduce gaps and omit only the Starter icon. Every label remains visible; last tab ends at x=308 within 320px. Other phone widths retain the Starter icon. |
| SVG title used multiple JSX text children and raised a React development warning. | Use one interpolated string. Fresh page load and production compilation pass without the warning. |
| CAD width label was close to its guide line and too small on phones. | Move it outside the line, enlarge dimension text on narrow views, and preserve non-scaling strokes. Inspect both views and large/small thicknesses. |
| Two-column glossary made long definitions difficult on a phone. | Use semantic definition lists: paired columns on wider screens, full-width definitions on phones. All 102 entries are retained and the 320px page fits. |
| Native Blockly fields ignore a fill-only browser event. | Use actual key presses when verifying the edit. No simulator change needed. |

## Verification limits

No robot hardware, physical manufacturing, Onshape account operation, real mobile device, screen reader, Firefox, or WebKit run was performed. The CAD procedure was checked against the book and official operation documentation, not represented as a completed Onshape project. Existing reduced-motion rules remain; the new CAD model has no automatic animation. Native OS/browser zoom and reduced-motion emulation were not available through the selected preview controls. The 320 CSS-pixel reflow and keyboard checks provide the relevant layout/input evidence.

The simulator is a separately deployed service. Remote compilation is not instantaneous. Observed WebGL readback performance warnings and the existing redundant allowFullscreen warning do not prevent the tested sequence from completing; no claim of physical motion accuracy or hardware compatibility is made.


## Publication

Release `370ebec3a0a556d430d061c1ef0e111e81beea44` was pushed normally to `CrimsonCrocs/crocodocs`, branch `main`. Vercel Git deployment `dpl_8UJ7bns9U1cZ9DC8hDrb7dbdgq5n` reached READY and has `crocodocs.crimsoncrocs.org` assigned, without an alias error. The remote build includes the final text-only edit described above.

Production canary: all twenty new URLs return 200 and the expected single H1; the homepage links to the new section. At 390px, the live CAD example responds to Make holes and has no page overflow or browser error. The first-program page hydrates the genuine Blocks iframe with the correct theme and language. No repeat of the unchanged simulator's full behavior matrix was needed for this documentation-only deployment. The dev server is running on port 3002.

GitHub's push response also reported thirty existing dependency alerts (two critical). No dependency was changed or security audit performed in this content/UI task. Those alerts remain separate maintenance work.
