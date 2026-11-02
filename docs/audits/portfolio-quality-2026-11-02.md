# Portfolio teaching audit — November 2, 2026

## Scope and result

**ACCEPT** for the fifteen Portfolio articles, their comparative examples, source attribution, reading paths, and the rendered checks below. Baseline: `4c20b72`, including the existing four case studies and eight attributed page images. This is an editorial improvement to the teaching section, not a new Crimson Crocs team portfolio or a claim of new team accomplishments.

The main weakness was the distance between general advice and the examples needed to apply it. The handbook named useful principles, while most page images lived only in separate case studies. The revision puts comparative readings beside the relevant writing task, adds bounded drafting/review steps, and connects the case studies back to those lessons.

## Page-by-page findings and repairs

| Page | Finding | Resulting improvement |
| --- | --- | --- |
| Portfolio | Topic navigation did not tell readers which book example would help | Added an example column to the draft-problem chooser and a short method for using a reference |
| Awards and Inspire | Award mapping was abstract | Added Blu Cru and Seattle Solvers examples of one story answering distinct questions; added a practical coverage review |
| Planning | A sample page allocation did little to help choose and prepare a story | Added a story-planning record, comparisons of two books' overview/detail structures, and a way to resolve missing information |
| Engineering | No inline source pages; the iteration table used invented test results | Replaced that table with guided Super 7/Rebel Robotics comparisons, added Blu Cru's applied analysis, and supplied a drafting exercise |
| Programming | General lists gave little help reading or constructing a software explanation | Added Blu Cru/Seattle Solvers page comparisons, a Super 7 recovery-plot reading, and a concrete control-story outline |
| Outreach | Good counting advice lacked a close reading and a drafting sequence | Added Super 7's project page, a Rebel Robotics partnership comparison, counting-record guidance, and a project-story exercise |
| Team development | Training, finance, and continuity advice needed visible examples of application | Added Seattle Solvers/Blu Cru comparisons, Rebel Robotics' professional-learning example, budget-review guidance, and Super 7's risk-plan connection |
| Layout and writing | Generic presentation advice and invented example results | Added a task-to-layout comparison, two illustrated layouts, a source-based intake explanation, and caption/reading-order checks |
| Interviews | Generic questions did not show how to use a portfolio page in an answer | Added three book-based practice prompts, follow-ups, a short explanation structure, and a listener exercise |
| Final review | A checklist alone did not show how to check important statements | Added three source examples, a statement-to-record table, and a three-pass exported-PDF review |
| Case-study index | Primarily a list of teams and awards | Added comparisons by reader task and links into the relevant handbook lessons |
| Rebel Robotics | No bounded close-reading exercise; unsupported geographic generalisation about highlight pages | Added a lift-revision reading and retained local-guidance advice as a conditional, without asserting a regional norm |
| Blu Cru | Strong examples needed a clearer path into drafting | Added a record-to-lesson table for learning, analysis, and driver controls |
| Super 7 | Comparison advice stopped before a detailed reading | Added a guided intake-row reading and links to engineering/layout exercises |
| Seattle Solvers | Useful goal/progress distinction could be taught more concretely | Named the page's reported 94% and separate 95% goal, then compared a development sequence with a runtime state diagram |

## Truth and source boundaries

- Current official archive: full BIOBUZZ manual TU07, October 29; Awards section TU06, October 22. Section 6 was read and A201's dimensions/limits were inspected visually. September outreach definitions and question-bank revision 26–27.1 were also checked.
- Current Drive text was retrieved for Rebel Robotics, Super 7, and Seattle Solvers. Blu Cru returned no extracted text; its existing pages 10 and 15 were visually inspected. All eight existing excerpts were inspected, including their page labels and redactions.
- The raw-file download returned HTTP 403. This pass does not claim a new full-PDF download, original-PDF hash verification, or a fresh visual review of all sixty-four source pages. The October full-document review and original hashes remain dated historical evidence in the source register.
- Added descriptions concern visible document choices and clearly attributed other-team examples. No Crimson Crocs achievements, measurements, outreach totals, adopted plans, award results, or interview answers were invented.
- The source images and their redactions are unchanged. The revision reuses those eight excerpts; it adds no original PDF downloads or new page-image assets to the public site. Each displayed example retains a full-size link, meaningful alternative text, team/season/content-page caption, and source footer.
- Existing routes, navigation grouping, component APIs, styles, analytics, and dependencies are preserved. Comparative tabs use the existing MDX component. New tab-pane labels are prose, so the document outline does not offer links into hidden headings.

## Verification

| Check | Result |
| --- | --- |
| MDX, links, images, sidebar | PASS: `bun run check:docs`, 155 MDX pages |
| JSX image/full-size destinations | PASS: all Portfolio `src` and `href` site paths resolve |
| Production build and types | PASS: `bun run build`, 162 generated pages/routes |
| Desktop route matrix | PASS: all fifteen routes in Chrome at 1744 px; one H1, no document overflow or KaTeX errors |
| Narrow route matrix | PASS: all fifteen routes at 390 px; Portfolio active state, source footers, image alternatives, and full-size destinations present |
| Internal fragments | PASS: Portfolio-to-Portfolio section links checked against rendered heading IDs |
| Example tabs | PASS: alternate examples in Engineering, Programming, Team development, and Layout; Engineering switches by keyboard ArrowRight |
| Visual inspection | PASS: engineering and programming comparisons at narrow width; desktop engineering and light-theme layout; all eight source images inspected directly |
| Full-size image journey | PASS: the layout example opens the intended 1391 × 1800 image in a new tab; the tab was closed afterward |
| Browser errors | No errors recorded during the route and interaction checks |
| Baseline comparison | The live engineering lesson had no inline figures or comparison tabs; revised lesson provides illustrated, guided comparisons using the established reader components |

The original dark theme was restored and temporary viewport overrides were cleared. No physical phone, screen-reader session, or other browser engine is claimed. Production identity and live canaries are checked after the release push; final deployment evidence belongs to hosting metadata and the delivery handoff.

Disk pressure was alleviated by clearing the inactive Bun package cache and this task's completed build cache. Installed dependencies, source, user data, and other threads' work were preserved.
