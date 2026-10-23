# CrocoDocs progress

Last updated: 23 October 2026. Initial handbook release: `1ffb47a` on `main`.

## New-team Starter Guide

- [x] Plan a complete first-season route for high-school students, separate from Programming, Engineering, and Portfolio. Read the supplied Alan G. Smith Onshape book and current FIRST resources; keep regional registration details distinct from general guidance.
- [x] Add a distinct Starter Guide landing page, numbered navigation, homepage entry, plain-English lessons, and a glossary. Cover team setup, costs, safety, strategy, hardware, wiring, programming, CAD, manufacturing, records, outreach, judging, and events.
- [x] Use CCC for custom models and interactive elements. Adapt an inspected direct-manipulation teaching pattern for an original mounting-plate model; reuse the working Blocks playground with the documentation theme. Do not copy or redistribute the book's artwork or PDF.
- [x] Check the new content, links, CAD geometry, interactive behavior, and desktop/mobile reading experience. All 133 MDX pages pass the docs check; the production build passes. The 20 new routes, 30 internal destinations, and 37 external source URLs resolve. Focused Intentional Verify: **ACCEPT**; evidence and limits are in `docs/audits/starter-guide.md`.
- [ ] Publish the scoped Starter Guide release through the existing Git integration and verify the canonical production site.

## Geared multi-turn position

- [x] Read all three pages of the supplied Chinese Remainder Theorem PDF and locate its original publication by dcnemesis. Treat the technique as general Engineering, rather than a season-specific rule or algorithm.
- [x] Add Multi-turn position under Electrical and wiring, linked from the section overview, Sensor integration, and Turrets. Explain gear selection, repeat range, calibration, circular error, a new numerical example, and startup timing. Credit the original public post and the mathematical reference in Sources; keep the uploaded reference out of public assets.
- [x] Verify the worked example, matching behavior around both encoder wraps, travel endpoints, and rejection of inconsistent or ambiguous readings. Inspect the article at 1440px, 390px, and 320px with light/dark views: equations and the table fit, and the Turrets link works in both directions. The docs check covers 113 MDX pages and the production build passes. Focused Intentional Verify: **ACCEPT**. Mathematical checks use a temporary script; no hardware test, dependency, or permanent test suite was added.
- [x] Publish `d214c46` through the normal Git integration. Production deployment `dpl_5i8eKEcoyuNGt18YEutTVid5pSum` is READY and reports source `git` with the expected SHA. The new guide and all three linking pages return HTTP 200 with the expected content; the live phone view has no page overflow or KaTeX errors. Dev server restored on port 3002.

Git-triggered deployments are appearing normally again, including the earlier `81e3051` and `30dfb69` commits. The earlier release's missing-deployment observation should not be treated as evidence that the integration is still broken.

## Season topics and electrical guides

- [x] Research projectile motion and shooting on the move using the two linked Eeshwar Krishnan articles, textbook mechanics, and current BIOBUZZ field information. Separate release delay from camera latency and preserve vertical flight when compensating for motion.
- [x] Add a Season topics group in Programming with projectile mathematics, calibration, and shooting-on-the-move articles, plus a plain Java 8 math helper. Keep geometry examples illustrative and citations in Sources footers.
- [x] Expand Engineering's Electrical and wiring group with an overview, connectors and cables, and power faults and ESD. Preserve the existing wiring guide and hardware photo. Check the linked electrical article and GM0 against FIRST wiring/ESD guidance and REV specifications.
- [x] Generate and inspect two original shooting diagrams; verify equations, worked values, and the Java helper with trajectory checks. Compile the helper as Java 8 and reconstruct its flights in a temporary harness. Add full-size diagram links and simplify the calibration table for phones.
- [x] Check all six new pages at 1440px and narrow widths, including 320px reflow, representative light/dark views, contained equations and tables, diagram labels, full-size links, and keyboard focus. Verify mobile navigation to Electrical and wiring and keyboard scrolling in the Java example. Finish a Deslop pass; keep technical source-review notes out of the public articles.
- [x] Run the docs check (112 MDX pages) and production build. Focused Intentional Verify: **ACCEPT**. No new dependencies or test suite. The Java example is a mathematical helper, not a tested robot controller.
- [x] Push release `81e3051` to main and verify the canonical production deployment. All six new routes return HTTP 200 with their correct titles. Both SVGs and the Java download match the committed assets; live browser checks confirm Electrical and wiring and the moving-shot article.

Production deployment `dpl_EPEoaMadUhp9cFewzgpGs2ECXLLr` is READY and serves `crocodocs.crimsoncrocs.org`. The Git push did not create a deployment during this release, so the clean committed checkout was deployed with the Vercel CLI to the existing `mantaworks/crocodocs` project. Its repository link remains `CrimsonCrocs/crocodocs`; the Git-trigger issue's cause is unconfirmed. The dev server is running on port 3002.

## Current pass

- [x] Add eight official REV Robotics / goBILDA hardware photos across seven Engineering articles: motors, a servo, a gear, timing belts and pulleys, a bearing, linear-motion parts, and a Control Hub. Use local assets, descriptive captions and alt text, full-size links, and vendor credits in Sources. Record the original image URLs in `docs/engineering-hardware-images.md`.
- [x] Inspect all seven affected articles at 1440px and 390px, with representative light/dark checks. Verify loaded images, contained captions, stacked phone layouts, full-size image responses, and keyboard-visible link focus. All 106 MDX checks and the production build pass. Focused Intentional Verify: **ACCEPT**. No dependency or test suite was added.
- [x] Rewrite the Portfolio guides in plain, natural language. Remove repeated manual versions, rule-table narration, and research-process commentary.
- [x] Rewrite the four case studies around what the teams did well. Remove the public percentage critique and repeated warnings.
- [x] Add a regional-guidance warning directly below the Rebel Robotics award-overview paragraph: Judged Category Highlights pages can resemble a table of contents, so readers should check local judging guidance before adopting the format.
- [x] Add two page excerpts to each case study, with full-size links. All eight excerpts were visually checked; the article layout and full-size links are verified.
- [x] Finish reviewing Programming, Engineering, and the other docs for unnecessarily difficult prose and internal audit language. Keep technical details that readers need to use the code or understand the mechanism.
- [x] Audit all handbook diagrams for overlapping labels, lines through text, and clipped content. Fixed eight diagram layouts, including the reported DC motor graph. Updated the generator and exported SVGs; the diagram set now has nineteen SVGs.
- [x] Replace the homepage's View source button with a grey GitHub icon link.
- [x] Inspect page excerpts and the revised articles at desktop and narrow widths; check the icon's label, focus, and click target.
- [x] Run the required content check and production build, then publish the completed follow-up. No additional test suite was added.

## Published handbook work

- [x] Confirm the checkout is connected to `upsidedly/myFIRSTjournal`, pull current work, and run a development server.
- [x] Add Engineering as a separate documentation section with grouped navigation and coloured icons, alongside Programming.
- [x] Build Engineering coverage for new and experienced teams using GM0, FTC Wiki, and selected linked resources. Include the Mechatronics book, interactive gear explanation, and Onshape robotics resources in the source review.
- [x] Fix the missing arm-load SVG and add original engineering diagrams.
- [x] Install the project-local StudyVault Article Writer skill and adapt its workflow to CrocoDocs.
- [x] Audit Programming against the actual SDK and library source. Use Ctrl Alt FTC, Learn Java for FTC, the Dairy Cookbook, and Controls Engineering in FRC where useful.
- [x] Add or update Panels, Sloth, Slothboard, NextFTC, SolversLib, OpenLoop, and Hive Vision, with release and maintenance checks.
- [x] Verify and expand the game overview using FTC context and official rules.
- [x] Gather and save portfolio advice, award criteria, and source notes; use the Drive portfolios for four Inspire case studies.
- [x] Add Portfolio as a third section covering planning, awards, engineering, programming, outreach, team development, layout, interviews, and final review.
- [x] Treat the portfolio as support for every award the team pursues, following the requested practical approach.
- [x] Put citations in a small Sources section at the bottom, rather than in explanatory paragraphs.
- [x] Make headings simple across Engineering and Programming and run an initial Deslop pass. The current pass above addresses the remaining stiffness reported by the user.

## Published design work

- [x] Apply Crimson Crocs branding, using the sibling Crimson Crocs website as the reference and My Taste / Intentional Style as advisors.
- [x] Use the supplied Haettenschweiler font with the Call-a-Croc-style slant for the wordmark; use softer, readable body typography and colours.
- [x] Remove the team subtitle beneath the CrocoDocs name and enlarge the inline wordmark/croc lockup.
- [x] Add the Software Collection credit and existing graphic from the FTC emulator's About section to the homepage.
- [x] Refine the header, section navigation, sidebar, article measure, surfaces, and restrained motion toward the requested premium documentation feel.
- [x] Replace the search treatment with a slimmer pill and the theme buttons with an animated icon-thumb switch.
- [x] Add a 1200×630 social preview inspired by the simulator's clear product presentation, with CrocoDocs artwork and per-article share metadata.
- [x] Push the completed handbook and branding as `1ffb47a`; confirm both Vercel production deployments and the live custom domain.

## Community software

- [x] Add a separate Programming category for newer community projects, starting with OpenLoop and Hive Vision.
- [x] Add Blaze FTC, covering the current Java/Kotlin package, Pedro integrations, and Rust Quickstart.
- [x] Give all three project pages the same main headings and coverage: overview, status, setup, example, testing, and limits. Preserve old links with redirects.
- [x] Verify production navigation and all three project pages in release `d6a1528`. Both previous library URLs return permanent redirects to Community software.

## Playgrounds

- [x] Make all five playgrounds and their Open example links follow CrocoDocs' resolved theme, replacing the earlier always-light instruction. Delay iframe creation until hydration and reserve its existing desktop/phone height. Explain that changing theme restores the example. All ten example/theme URL combinations preserve the source; Java's light/dark rendering, matching links, and saved-dark reload were checked. Blocks' hosted light/dark HTML matches its requested theme. The docs check and production build pass. Browser tooling paused the Blocks document response, so a new Blocks runtime or phone interaction pass is not claimed; the unchanged examples retain their earlier verification.
- [x] Prepare and run five introductory Java examples for sequencing, OpModes, division, motor power, and nonblocking buttons. Inspect their fit on desktop and narrow pages.
- [x] Keep every playground section disabled for releases `1ffb47a` and `ec33d7e`, as requested.
- [x] After simulator thread `49658190-ecac-4616-b650-44b557bd7c2b` deployed, add a real single-file Blocks embed and use `theme=light` for every embed.
- [x] Replace telemetry-only exercises with visible robot movement. Verify edited code, Play/Stop, the Blocks sequence, division, power/direction, and nonblocking buttons.
- [x] Inspect all five article embeds at 1440px and 390px. Verify the light iframe inside dark docs, real Blocks editing/running, and a touch-emulated phone Play/Stop path with Code/Simulator tabs and on-screen controls. Fix the long inline file path that widened the first-OpMode page.
- [x] Publish the updated playgrounds in `d6a1528`. The production Blocks iframe uses real Blocks, light mode, and one file; its live run reached Finished. Live Play/Stop also passed. See `docs/audits/playgrounds.md`.

The simulator update is deployed. Matthew authorized re-enabling the playgrounds, and the scheduled follow-up is disabled to prevent duplicate work. All five updated examples passed the focused hosted-simulator checks. No simulator source was changed.

## Web Analytics

- [x] Install `@vercel/analytics` and render the Next.js Analytics component in the root layout. Confirm Web Analytics is enabled for the canonical CrocoDocs Vercel project.
- [x] Verify the production analytics script and pageview request: both returned HTTP 200 from Vercel's generated endpoint.

## Verification

Release `ec33d7e` passed 103 MDX checks and the production build, with rendered checks for nineteen diagrams, eight portfolio excerpts, and the homepage GitHub icon. Those changes are preserved.

Release `d6a1528` passed **105 MDX checks and the production build**. Focused Chromium checks cover the five hosted examples, edits and lifecycle controls, 1440px and 390px article layouts, light embeds inside dark docs, and a touch-emulated phone editor/simulator path. Community software navigation and the shared page headings are checked; old OpenLoop/Hive Vision paths have permanent redirects.

`BlazeBulkPreview` compiles as Java 8 against the published BlazeFTC 0.1.66 artifact, FTC SDK 12, and Kotlin stdlib. The current Pedro adapter source was checked for Pinpoint requirements and callback ownership. No hardware run or Rust native build was performed. Blaze core and Quickstart source revisions were `9044ffd` and `dbd764e` respectively.

Release `d6a1528` is published on `main`; both Vercel production deployments succeeded. The canonical site serves the new Community software pages and redirects, and its Analytics script/pageview requests return HTTP 200. No extra test suite or dependency was added for playground verification; Analytics is the separately requested dependency.

Focused Intentional Verify verdict: **ACCEPT**. No unrelated article audit or full release suite was run.

## Mercurial guides

- [x] Rename the existing guide and directory link to Mercurial v1. Keep its existing URL and examples. Replace dated review narration with one legacy warning linking to v2.
- [x] Add a separate Mercurial v2 guide based on the published 2.0.1-beta1 bindings, examples, and dependency metadata. Cover setup, programs, sequences, fibers, scheduler behavior, and motor cleanup.
- [x] Validate the examples and rendered pages; all 106 MDX pages and the production build pass. Focused Intentional Verify: **ACCEPT**.
- [x] Publish `dc71a5c` to `main`; both Vercel production deployments succeeded. The canonical domain returns HTTP 200 for Mercurial v1, Mercurial v2, and Libraries, with both version links and no October review-date text. The live v2 page also opens in the browser.

Mercurial v2 source: FTC bindings tag `2.0.1-beta1` (`97469ab`), published core/bindings `2.0.1-beta1`, and Dairy Maven metadata. The complete Java example compiles as Java 8 against the published artifacts and FTC SDK 12; the Kotlin equivalent was compared with upstream examples and implementation. No Android install or robot hardware test was performed. Desktop (1440px) and narrow (390px) checks cover both article titles, the legacy warning and its v2 link, navigation, Java/Kotlin tabs, and contained code scrolling.

## Link audit

- [x] Trace all 106 articles and the homepage, including rendered navigation, source links, images, embed URLs, and section fragments. Initial crawl: 1,315 distinct URLs/fragments and 510 fetched destinations.
- [x] Replace 47 broken internal-link occurrences across six overview pages and the obsolete official programming URL in the shared footer. Preserve the linked topics and document every old target, replacement, and reason in `docs/audits/link-audit.md`.
- [x] Verify the final production-build graph: 1,268 distinct URLs/fragments, 464 destinations, no unresolved targets. The docs check and production build pass; phone-width Slothboard navigation and desktop Community software → Blaze FTC navigation pass. Focused Intentional Verify: **ACCEPT**.
- [x] Publish `309939a`; the canonical Vercel deployment succeeded. Fresh production HTML verifies all 48 replacements across the six overview pages and homepage footer, with the old targets absent. The local dev server is restored on port 3000.

## Repository ownership

- [x] Transfer and rename the original public repository to `CrimsonCrocs/crocodocs`, preserving repository ID `1023463810`, commit history, and `main`. Update the local `origin` remote and current GitHub / issue links.
- [x] Confirm Vercel automatically followed the transfer: canonical project `prj_wURFGAfKlh1Hlzx5zhKzpDrambxv` now links `CrimsonCrocs/crocodocs`, repository ID `1023463810`, production branch `main`.
- [x] Verify Git-triggered production deployment `dpl_6WxhUTxBWKcGno4KXEarkGPhJWkk` from `CrimsonCrocs/crocodocs`, commit `40b0bed`, reached READY. The live homepage returns HTTP 200 and both GitHub links plus the issue link use the new organization repository. The previous GitHub repository URL redirects to the same transferred repository.

The separate legacy `cc-software-engineering/my-first-journal` Vercel project is not accessible with the current connector or CLI account. It has not been changed. The canonical production project is `mantaworks/crocodocs`, serving `crocodocs.crimsoncrocs.org`.
