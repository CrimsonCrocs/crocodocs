# Rookie Design handbook expansion

Date: 3 November 2026

## Outcome

Design grows from thirteen pages into a 39-chapter FTC handbook. The 26 new chapters add measurement, loads, Onshape features and moving assemblies, purchased hardware, configurations, mechanism layouts, fasteners, tolerances, manufacturing, review, troubleshooting, a glossary, and a bench roller project. The introduction provides an ordered beginner route and grouped reference tables. The existing plate-to-assembly-to-export exercise, URLs, team examples, and Crimson Crocs interface are preserved.

The expansion has eight original SVG teaching diagrams and a reproducible generator at `scripts/build-design-figures.mjs`. No dependency, runtime component, or unrelated article changes are part of this release.

## Source coverage

- Alan G. Smith's *Learn Onshape for FTC*: reuse the prior full reading, inspect the current book contents and relevant feature, ball-holder, funnel, mixed-assembly, shooter, BOM, and configuration passages. Teach original exercises; do not redistribute the supplied PDF or its figures.
- FRCDesign: review the course, handbook, and best-practice structure, then use the relevant modeling, top-down design, motor/transmission, motion, fastening, manufacturing, and subsystem lessons. Adapt examples to FTC-scale parts, loads, and constraints rather than copying FRC hardware assumptions.
- Official Onshape help: check feature procedures, constraints, insertion/import, mates, relationships, configurations, drawings, and BOM behavior. In particular, respect Onshape subassembly mates and distinguish total symmetric extrusion depth from per-side depth.
- GM0 and primary component/material guidance: support the FTC mechanism, support, transmission, wiring, fabrication, and fit discussions. Identify Purple Gears as FTC 2901 and direct readers to its published Insert Tool rather than its developer hosting setup.

Sources remain in each article's footer. Original team studies and their image credits are unchanged. A bounded external HEAD batch encountered redirects and transport errors, so it is not evidence that every external source link passed. Resolved canonical source targets were used where checked; this expansion is not a new whole-site external-link audit.

## Checks

- `bun run check:docs`: all **181 MDX pages** pass syntax, navigation, and local-target checks.
- `bun run build`: passes, including Next.js compilation and type/lint checks. macOS memory pressure prevented a local final build; the resource guard was respected. The same commands ran in the existing Vercel preview with a deployment-local build override. No global project build setting changed.
- Worked numbers were independently calculated for arm loads, reductions, linkage positions, shaft reactions, pitch geometry, cascade lift travel/loads, tolerance stacks, the roller assembly, and shooter contact/release geometry. SVG XML and local figure references were checked.
- Chromium rendered inspection covers the 1440px introduction and article layout, 320px reading/navigation, 390px code and diagram presentation, and representative light/dark pages. The formula-heavy load, transmission, lift, and linkage chapters have no KaTeX errors or page-level overflow. An equation slightly wider than the 320px content column remains contained in its horizontal scroller.
- Actual mobile sidebar navigation reaches the practice project. A desktop TOC click places its heading below the header. Keyboard activation opens a full-size diagram. All eight new SVGs were inspected at natural size; the linkage pose label was moved clear of an arm and the repaired hosted SVG was inspected again.
- Figures retain descriptive alternatives, captions, full-size links, and useful dimensions in the surrounding prose. Long tables, the glossary, feature instructions, funnel, shooter layout, and practice project were included in the narrow reading checks.

Checked previews: `c32fa07a95f38d78affa2cd240d71656f78f6c00` at deployment `dpl_2rLB8Ycfg8nggJ1EKuPfzr71eywh`, followed by the diagram repair `4b58bc2265be5f96b87b63b3512d236f54560be2` at `dpl_9tANL7uKnyxyu37VPfPaFrayX2yJ`. Both reached READY. The latter repair changes only the diagram generator and one SVG; the content-check evidence remains applicable.

Focused Intentional Verify: **ACCEPT** for the handbook content and rendered documentation experience.

## Limits

Onshape account-side authoring, native CAD imports, fabrication, and robot hardware were not exercised. The numerical layouts are identified as teaching examples, with actual component fits and operating behavior requiring the stated measurements and tests. Browser checks use Chromium viewport emulation, not physical phones or other browser engines. These checks do not certify a completed robot design.
