# CrocoDocs progress

Last updated: 15 October 2026. Initial handbook release: `1ffb47a` on `main`.

## Current pass

- [x] Rewrite the Portfolio guides in plain, natural language. Remove repeated manual versions, rule-table narration, and research-process commentary.
- [x] Rewrite the four case studies around what the teams did well. Remove the public percentage critique and repeated warnings.
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
- [ ] Verify navigation, redirects, and the production release.

## Playgrounds

- [x] Prepare and run five introductory Java examples for sequencing, OpModes, division, motor power, and nonblocking buttons. Inspect their fit on desktop and narrow pages.
- [x] Keep every playground section disabled for releases `1ffb47a` and `ec33d7e`, as requested.
- [x] After simulator thread `49658190-ecac-4616-b650-44b557bd7c2b` deployed, add a real single-file Blocks embed and use `theme=light` for every embed.
- [x] Replace telemetry-only exercises with visible robot movement. Verify edited code, Play/Stop, the Blocks sequence, division, power/direction, and nonblocking buttons.
- [x] Inspect all five article embeds at 1440px and 390px. Verify the light iframe inside dark docs, real Blocks editing/running, and a touch-emulated phone Play/Stop path with Code/Simulator tabs and on-screen controls. Fix the long inline file path that widened the first-OpMode page.
- [ ] Publish the updated playgrounds and confirm the production embeds. See `docs/audits/playgrounds.md`.

The simulator update is deployed. Matthew authorized re-enabling the playgrounds, and the scheduled follow-up is disabled to prevent duplicate work. All five updated examples passed the focused hosted-simulator checks. No simulator source was changed.

## Web Analytics

- [x] Install `@vercel/analytics` and render the Next.js Analytics component in the root layout. Confirm Web Analytics is enabled for the canonical CrocoDocs Vercel project.
- [ ] Verify the production analytics script and pageview request after publishing.

## Verification

Release `ec33d7e` passed 103 MDX checks and the production build, with rendered checks for nineteen diagrams, eight portfolio excerpts, and the homepage GitHub icon. Those changes are preserved.

The current release passes **105 MDX checks and the production build**. Focused Chromium checks cover the five hosted examples, edits and lifecycle controls, 1440px and 390px article layouts, light embeds inside dark docs, and a touch-emulated phone editor/simulator path. Community software navigation and the shared page headings are checked; old OpenLoop/Hive Vision paths have permanent redirects.

`BlazeBulkPreview` compiles as Java 8 against the published BlazeFTC 0.1.66 artifact, FTC SDK 12, and Kotlin stdlib. The current Pedro adapter source was checked for Pinpoint requirements and callback ownership. No hardware run or Rust native build was performed. Blaze core and Quickstart source revisions were `9044ffd` and `dbd764e` respectively.

Publication and production analytics verification are the remaining release steps above. No extra test suite or dependency was added for playground verification; Analytics is the separately requested dependency.
