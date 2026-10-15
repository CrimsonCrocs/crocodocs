# Article prose review

Reviewed October 14, 2026 with the Deslop skill. Scope: all 103 MDX articles in Portfolio, Engineering, and Programming, including headings, callouts, captions, navigation-card descriptions, and introductory prose.

| Area | Reviewed | Edited | Kept |
| --- | ---: | ---: | ---: |
| Portfolio | 15 | 15 | 0 |
| Engineering | 29 | 15 | 14 |
| Autonomous | 6 | 4 | 2 |
| Code practices | 6 | 0 | 6 |
| Control systems | 8 | 3 | 5 |
| Getting started | 10 | 1 | 9 |
| Libraries | 12 | 6 | 6 |
| Sensors and vision | 15 | 8 | 7 |
| Introduction and season | 2 | 1 | 1 |
| **Total** | **103** | **53** | **50** |

The Portfolio articles received their full edit before the existing corpus review. Existing articles were read in full, with fenced code omitted from the prose display. Clear instructional passages were kept; there was no rewrite quota. This pass is an editorial review, not a claim that all robot code was recompiled or all external facts were researched again.

Changes remove repetitive audience framing, abstract descriptions, rhetorical questions, unnecessary tutorial narration, promotional claims, and repeated tuning advice. Technical vocabulary, meaningful qualifications, examples, and direct safety instructions remain. Existing short headings and compatibility anchors remain intact.

The preservation check compares fenced code, display-math blocks, inline code, Markdown link destinations, and entire Sources footers with the recorded baseline. All comparisons pass. Route paths and frontmatter remain intact except the dictionary demo's promotional description, now a plain description of its examples. The JSON manifest records each article's disposition and the protected content used by that check.

Examples of the edit:

- “For experienced teams, compare measured holding effort against angle” becomes “Compare measured holding effort against angle.”
- The CAD introduction states which collisions and clearances to check rather than describing the tool's “most useful FTC job.”
- The PID guide removes a second copy of the P/D/I tuning order without changing its controller, units, or limitations.
- The dictionary examples replace “great for learning robotics” and “essential for smooth motion” with specific explanations.

Project checks and rendered acceptance are recorded in [Portfolio verification](./portfolio-verification.md).

The later programming-playground request extends five Getting started articles with exercises, components, and Simulator sources. The JSON baselines describe the earlier editorial pass; those additions intentionally change inline-code and Sources inventories. The original fenced examples remain intact.
