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

## Playgrounds

- [x] Prepare and run five introductory Java examples for sequencing, OpModes, division, motor power, and nonblocking buttons. Inspect their fit on desktop and narrow pages.
- [x] Comment out every playground section, including its heading and instructions, for the current production release, as requested.
- [ ] After simulator thread `49658190-ecac-4616-b650-44b557bd7c2b` finishes and deploys, add a real single-file Blocks embed and use `theme=light` for every embed.
- [ ] Adapt exercises to the released UI, which is removing the telemetry panel; give each exercise an observable result before enabling it.
- [ ] Verify the updated embeds in real articles, then publish them. See `docs/audits/playgrounds.md` for the handoff.

A bounded T3 follow-up checks the simulator thread every 15 minutes, starting 15 October at 04:31 UTC, and stops after handling the update, a blocker, or 12:16 UTC. It must not duplicate an active implementation or override newer user instructions.

## Verification

The published baseline passes 103 MDX checks and the production build. Previous runtime, source, diagram, and reading-workspace evidence is in `docs/audits/` and `docs/brand-theme.md`. The current pass also passes 103 MDX checks and the production build. Code fences, display equations, external source URLs, and paused-playground comments are preserved. Rendered checks cover the nineteen SVGs, all eight page excerpts, a case study at desktop/mobile widths, and the GitHub icon in light/dark mode. The follow-up release is recorded in the Git history. The Blocks/light-mode release remains pending under Playgrounds.
