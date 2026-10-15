# Portfolio corpus

Reviewed October 14, 2026. This records the evidence and boundaries behind `content/docs/portfolio/`, not a claim to have audited every available portfolio or all Discord history.

## Scope and editorial decisions

- Ten handbook pages cover introduction, award planning/Inspire, page planning, engineering, programming, outreach, team development, layout, interviews, and final review.
- Five case-study pages provide an index and four detailed Inspire examples.
- Prepare portfolio evidence for every award a team pursues. This is practical preparation guidance; do not invent a universal official submission rule or add the eligibility-minimizing wording the user explicitly rejected.
- Keep short, literal headings, self-contained explanations, and compact Sources footers. External citations belong in the footer; internal article links remain beside relevant explanations.
- Label illustrative examples, predictions, targets, reported outcomes, and verified event results accurately. Original prose only; no reproduction of portfolio pages, photographs, or diagrams.
- Use existing MDX, Phosphor icons, root metadata, search, theme, and reading components. The Portfolio section adds no library or custom document viewer. The subsequent header update declares the already-used `next-themes` package as a direct dependency. Intentional Build owns implementation; My Taste supplies preference advice and Intentional Verify is the acceptance gate.
- The top navigation gains a Portfolio section with a notebook icon and accurate active state. Homepage, footer, introduction, and engineering-notebook links expose the new section. Mobile section spacing must keep all three labels visible at 320 CSS pixels.

## Official sources

The live season archive listed **BIOBUZZ TU04, updated October 8, 2026**, during this review. The old bundled FTC skill manual is V1 and was not relabelled as TU04.

| Source | Inspected material | Use |
| --- | --- | --- |
| [BIOBUZZ season archive](https://ftc-resources.firstinspires.org/ftc/archive/2027/game) | Season, Section 6 version, and latest Team Update listing | Freshness and pinned season context |
| [Section 6, Awards, TU04](https://ftc-resources.firstinspires.org/ftc/archive/2027/game/manual-06) | §§6.1–6.3, printed pages 43–57; A201 visual inspection on printed page 48 to recover dimensions missing in extracted text | Award groups and criteria, interviews, readability, submission, privacy, page/file limits |
| [Outreach Terms and Definitions](https://info.firstinspires.org/hubfs/web/program/ftc/outreach-terms-and-definitions.pdf) | September 2026, all eight pages | Precise outreach terms and support/reach distinctions |
| [Judging Question Bank](https://ftc-resources.firstinspires.org/ftc/event/question-bank) | Revision 26–27.1, all eleven pages | Interview preparation and sample areas of inquiry |
| [Initial-interview feedback form](https://ftc-resources.firstinspires.org/ftc/archive/2027/event/interview-feedback) | Linked as a resource; interpretation of its role grounded in A212 | Optional follow-up resource; no claim of full form review |

A201 is a cover plus at most fifteen content pages, US Letter or A4, a digital file strictly below 15 MB, and current-season progress/challenges/accomplishments since January 1, 2026. Keep growth context from older seasons qualified. Font guidance is not presented as a newly invented hard minimum. Cover content is not award evidence; web links and supplementary handouts cannot carry evidence absent from the portfolio. A202 event instructions take precedence over its default printed-copy route.

## Drive collection

The user directed research to the existing `Others/` folder. Seven direct children were returned. Four Inspire portfolios were prioritized and read across all sixteen PDF pages each; the cover is excluded from the fifteen numbered content pages. All four were rendered and visually reviewed. Selected dense technical pages were inspected at page size. Blu Cru is an image-only scan, so OCR was used as an aid and decisive details were checked against the rendered page.

Reference originals and extracted text remain in `/tmp/crocodocs-portfolio-research-20261014/`; they are not application dependencies or publicly redistributed assets. Redactions are preserved. The connector reported access as unverified; no sharing permissions were changed and no public download access is asserted. Article source links may require existing Drive access.

| Team | Source copy | Reviewed content | Official award verification |
| --- | --- | --- | --- |
| 18139, Rebel Robotics | [INTO THE DEEP portfolio](https://drive.google.com/file/d/1BwbpyaX3YCZ-lo-9cuNhbTGD0glnTJQr/view), 2,234,949 bytes | All content pages 1–15. Especially p1 overview, p6 mentor learning, pp9–10 revision history and time comparison, p14 software claims | [2024 season record](https://ftc-events.firstinspires.org/2024/team/18139): 2025 overall Championship Inspire and Franklin Division Inspire |
| 6417, Blu Cru | [DECODE portfolio](https://drive.google.com/file/d/1wnucpLEzxrLYH6uO9_v3LXjHI8i9jVK7/view), 25,912,009 bytes | All content pages 1–15. Especially p3 skills, p8 mentors/reviews, p10 design process, p12 linkage, p15 state diagram and recovery. Redacted scan | [2025 season record](https://ftc-events.firstinspires.org/2025/team/6417): 2026 Goodall Division Inspire |
| 7477, Super 7 | [DECODE portfolio](https://drive.google.com/file/d/1vXc7HtoYnBhZ8VZUYlZZGtNKuT_e-ftd/view), 10,153,558 bytes | All content pages 1–15. Especially p4 risks/training, pp5–9 outreach structure, p12 comparisons, p13 indexer, p15 control plots. Some redactions | [2025 season record](https://ftc-events.firstinspires.org/2025/team/7477): 2026 Edison Division Inspire |
| 23511, Seattle Solvers | [DECODE portfolio](https://drive.google.com/file/d/1jCnEVCMHPD42UgGrJsthdqCmEf6Ljgfe/view), 8,632,259 bytes | All content pages 1–15. Especially p3 learning, pp8–11 metrics and strategy, p10 decision still open at April 6 writing, p15 target versus results/localization. Some redactions | [2025 season record](https://ftc-events.firstinspires.org/2025/team/23511): 2026 Lovelace Division Inspire second place |

The source filenames say “Worlds” without consistently specifying the division; use the official distinctions above. No portfolio feature is claimed to have caused an award. Metrics, donations, audience numbers, robot behavior, and organizational outcomes inside PDFs are team-reported and have not been independently reproduced or audited.

The collection also contains The Hive 3747 (Innovate second), IronEagles 6272 (Connect second), and Brickbot 15996 (Design second), all labelled DECODE Worlds in filenames. Those labels have not been independently checked in this task and the three documents have not been read for detailed studies. They remain possible follow-up material rather than implied completed coverage.

## Specific checks

- Rebel p10's 3.4 s → 1.1 s comparison is approximately 67.65% less time, or a 3.09 duration ratio. Its “309% improvement” label is discussed critically, not copied as a time reduction.
- Seattle p15's reported latest scoring value is 94%, with a separate 95% goal; never state that the target was attained.
- Seattle p10 identifies a still-open architecture decision at April 6. Do not infer which robot competed or attribute the event outcome to either architecture from this document alone.
- Blu Cru's file exceeds today's 15 MB limit as a reference copy. The historical file is neither certified as the exact submitted file nor used to establish current compliance.
- Historical API, material, accuracy, update-rate, and library-maintenance claims are not treated as current technical guidance. The studies examine documentation and direct implementation questions to current CrocoDocs engineering/programming sources.

## Community research

The saved FTC Pulse research (Continuity Memory #2971) was reused as historical evidence. Its corrected main channel ID is `1443406021610574005`; the mistaken earlier ID in that memory is not authoritative.

- Guild `1443377051305508896`; portfolio backfill job `56e50732-94a4-4c55-a5f7-7b2d46aaa8d9`, range 2025-01-01 through 2026-10-15, included accessible known threads.
- Result `completed_unknown_gaps`: 3 imported, 32 duplicates, 1,184 skipped, 1,219 examined. Thirty-five locally accessible messages, August 27–October 6, 2026. Deleted/inaccessible messages and unlisted/archived threads are not covered.
- All 33 locally indexed awards-help messages were previously read; that channel was not backfilled. The archive is incomplete, not a full consensus survey.
- Portfolio-review was mostly FTC Coach announcements and source/provenance discussion. Detailed writing advice came largely from awards-help. Product claims, usage statistics, and alleged award credentials of posters were not independently verified or repeated as facts.

| Advice | Source message |
| --- | --- |
| Page purpose, skimming, process, outreach, examples, and human review | [Seven-point post](https://discord.com/channels/1443377051305508896/1443405895055704146/1553551584296829008) |
| Stats, tradeoffs, outcomes, and award navigation | [Metrics and award mapping](https://discord.com/channels/1443377051305508896/1443405895055704146/1551311640924917861) |
| Explain the technical problem and response instead of a long general definition | [Backspin discussion](https://discord.com/channels/1443377051305508896/1443405895055704146/1557954017479495763), [follow-up](https://discord.com/channels/1443377051305508896/1443405895055704146/1557955368414347378) |
| Ask for portfolio feedback and inspect examples | [Review resources](https://discord.com/channels/1443377051305508896/1443405895055704146/1556158756457545810) |
| FTC Coach public-reference claim and uncertainty about complete provenance | [Reference claim](https://discord.com/channels/1443377051305508896/1465438314910843233/1552376532067160155), [provenance uncertainty](https://discord.com/channels/1443377051305508896/1465438314910843233/1552465804652449864) |

Community posts do not establish training versus reference use, consent, copyright permissions, privacy terms, or official FIRST endorsement. The handbook gives general checks for automated feedback rather than promoting an unverified tool. Canva and Figma are presented as optional authoring tools, not official recommendations.

## Verification

Required checks are MDX/local links/navigation, production build, TypeScript, all new HTTP routes and search indexing, and the affected homepage/header/sidebar/article journeys. Rendered acceptance covers narrow mobile, tablet, desktop, light/dark, keyboard navigation, mobile menu recovery, and reflow for the new third section. Preserve existing typography, colors, assets, and opacity-only entrances. The user's later header request adds a 180 ms theme-thumb slide and a 100 ms icon fade, with no bounce and an immediate reduced-motion alternative.

The follow-up prose review covers all 103 articles, including Programming and Engineering. See `docs/audits/deslop-review.md` and its per-article JSON manifest.

Current execution results and the final acceptance verdict are recorded in `docs/audits/portfolio-verification.md` when verification completes.
