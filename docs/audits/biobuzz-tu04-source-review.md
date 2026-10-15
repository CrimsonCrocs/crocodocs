> Research-stage evidence, 2026-10-14. Findings describe the pre-correction snapshot. See `../programming-audit.md` for implemented corrections, final checks, and limits. Temporary artifact paths are session-local and are not required by the app.

# BIOBUZZ TU04 source packet

Reviewed **2026-10-14**, against the official English **173-page TU04 manual, updated 2026-10-08**, all **11 pages of combined Team Updates TU00–TU04**, and the live official answered Q&A feed (21 entries, including answers updated 2026-10-13). This is a bounded read-only source audit for expanding `content/docs/season-breakdown.mdx`; no repository or skill files were edited. No private team strategies, mass hypotheses, proposed designs, or untested ball-count thresholds are presented as rules.

## Source authority and artifacts

- [Current season resources](https://ftc-resources.firstinspires.org/ftc/game) explicitly identifies BIOBUZZ 2026–2027 and TU04, Oct 8, 2026.
- [Official full manual](https://ftc-resources.firstinspires.org/ftc/game/manual), saved unchanged as `/tmp/crocodocs-audit-controls/biobuzz/manual-tu04.pdf`; SHA 256 `070a66d8b7f2c047a325e5a7b2b3ffff433dfd074eff6de7d40727524f6d66e4`.
- [Combined Team Updates](https://ftc-resources.firstinspires.org/ftc/game/tu-combined), saved unchanged as `biobuzz/tu-combined.pdf`; SHA 256 `692303e6f0f714a9e0012951c1a11d23672437bdc28fc5a9f37678a27794b3e9`.
- Convenient primary section PDFs: [Section 9 ARENA](https://ftc-resources.firstinspires.org/ftc/game/manual-09), [Section 10 Game Details](https://ftc-resources.firstinspires.org/ftc/game/manual-10), [Section 11 Game Rules](https://ftc-resources.firstinspires.org/ftc/game/manual-11). Cite **printed manual page numbers**, not zero-based PDF indices; printed p91 is PDF index 90.
- [Official Q&A](https://game-qa.firstinspires.org/boards/2027/FTC/QA), linked by the current season page via `https://ftc.game/qa`. Browser rendering exposed all current answered entries without logging in. The web text extractor returned only the page shell, so **do not report Q&A as inaccessible**. The public [Atom feed](https://game-qa.firstinspires.org/boards/2027/FTC/QA/answers.atom) was archived as `biobuzz/qa-answers.atom`; its entries contain question text, source links and update timestamps, **not the answer bodies**. Answer bodies were read directly in the rendered browser Answer Feed and Additional Views.
- Original V1 baseline was read from the existing skill's unchanged PDF, `/Users/matthew/.codex/skills/ftc/references/manual/BIOBUZZ_Competition_Manual_V1.pdf`, extracted only into `/tmp/.../biobuzz/manual-v1-layout.txt` for focused comparison.

Authority: §1.7.1–1.7.4, pp 17–19: current English PDF manual prevails over supporting material; exact rule text prevails over headlines/orange boxes; Q&A assists interpretation and does not supersede the manual. Team Updates published after an event's driver meeting do not apply to that event. Imperial dimensions take precedence over approximate metric conversions. Preserve this distinction in the public guide.

## Scoring: visually verified at printed p91

The rendered `p91-scoring.png` was inspected; these values are not inferred from incomplete PDF text extraction. **Table 10-2, §10.5.5, p91**:

| Achievement | AUTO | TELEOP |
| --- | ---: | ---: |
| LEAVE, per robot | 3 | — |
| PARK, per robot | 5 | 5 |
| HIVE TIP | 20 | 20 |
| Each POLLEN/NECTAR remaining in upward-facing CELL at final assessment | — | 2 |
| Bottom-NECTAR bonus, per FLOWER | — | 5 |
| Each scoring POLLEN/NECTAR in an owned FLOWER | — | 2 |
| Each POLLEN/NECTAR scoring in a GARDEN | — | 1 |

WIN earns 3 RP; TIE earns 1 RP. SWARM, POLLINATOR 1 and POLLINATOR 2 each earn 1 RP when their respective threshold is met. The game-specific RP achievements are alliance achievements; do not frame them as four-element personal payload requirements.

**Table 10-3, p91**, also visually checked:

| RP | All Other Events | Regional Championships | FIRST Championship |
| --- | --- | --- | --- |
| SWARM | combined LEAVE + PARK ≥16 points | TBA | TBA |
| POLLINATOR 1 | ≥4 TIPS | TBA | TBA |
| POLLINATOR 2 | ≥7 TIPS | TBA | TBA |

Premier Events may choose their own thresholds. The local page's current line 40 says “Championship thresholds” generally; make both Regional Championships and FIRST Championship explicitly TBA so Jamaica's championship is not accidentally assigned 16/4/7.

### Assessment matters as much as values

**§10.5, p86; §10.5.1–10.5.4, pp 87–90**:

- LEAVE and AUTO PARK are evaluated at the end of AUTO; TELEOP PARK at the match end. PARK requires the robot at least partly in its LOADING ZONE; LEAVE requires no perimeter-wall contact at its assessment.
- [QA21](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/21), updated 2026-10-10, explicitly confirms that a robot touching a wall at the end of AUTO does **not** receive LEAVE, even if it left earlier and then parked. “Leave the wall once” is misleading.
- A TIP needs the HIVE to change stable states and then the previously non-contacting damper to start contacting the frame (§10.5.1 p87). HIVE TIPS completed before TELEOP starts are assessed as AUTO. Merely moving the HIVE, loading a presumed ball count, or beginning a swing is not the scoring test.
- Final CELL/FLOWER/GARDEN assessments wait for robots and pieces to come to rest as §10.5 specifies. CELL leftovers score only in the upward-facing CELL. FLOWER owner and bonus are determined by pieces satisfying the scoring volume at final assessment.
- [QA14](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/14), updated 2026-10-10, says no new RP achievement types will be introduced and Table 10-2 point values are fixed. RP thresholds and Championship/Premier piece number/type/distribution may change. A general “check Team Updates” reminder remains appropriate; avoid claiming points have changed in TU01–TU04.

## Four-element CONTROL and opponent NECTAR

**G407–G409, pp 108–109; CONTROL definition §16 p169**:

- Maximum simultaneous CONTROL is **four total scoring elements**, combining POLLEN and NECTAR. It is not four of each, four per intake, or four held plus extra deliberately herded.
- CONTROL includes pieces supported by, stuck in/on/under, or intentionally herded by the robot; contact can be transitive through other pieces. Launched pieces no longer contacting the robot are not controlled.
- G408 prohibits controlling opponent-colored NECTAR. Accidental contact and CONTROL are different; do not simplify this to “never touch another color” or “briefly holding it is always legal.”
- [QA3](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/3), [QA4](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/4) and [QA23](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/23) confirm there is **no explicit MOMENTARY grace exception**. Brief accidental fifth-piece/opponent-NECTAR CONTROL remains a violation, generally a verbal warning if judged nonstrategic; deliberate or routine design-based violations may be STRATEGIC. Do not turn the manual's roughly 3-second definition of MOMENTARY into a permitted intake window.
- Exact current penalty text: G407 verbal warning; MAJOR FOUL and YELLOW CARD per match if strategic. G408 verbal warning; YELLOW CARD per match if strategic. **QA23 groups both penalties together and mentions a MAJOR FOUL for both, conflicting with G408's current rule text. Use the manual's G408 wording**, or omit detailed penalty amounts from the public overview. This is a source inconsistency, not an invitation to invent a resolution.

## HIVE: legal launch, completed TIP and discharge

**§10.5.1 p87; G409 pp 108–109; G417 pp 111–112; LAUNCH definition §16 p171**:

- The legal way to induce a HIVE TIP is to LAUNCH POLLEN/NECTAR into the **upward-facing CELL**. G417 prohibits other manipulation of HIVE motion, including deliberate ramming, impeding tips, or contacting the HIVE via a controlled piece. Do not suggest a lift, poke or held-ball push as an equivalent scoring method.
- LAUNCH is a defined action involving shooting into the air, propelling across the floor or forceful throwing; the overview need not prescribe a specific launcher design.
- G409 prohibits catching/deflecting pieces released from a tipped HIVE until they contact something other than that receiving robot. Its intent box says pieces should hit the TILE floor before collection. Preserve the actual rule wording rather than substituting an absolute “only floor contact can ever end this condition.”
- [QA17](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/17), updated 2026-10-13, clarifies even a nonstrategic incidental discharge deflection is a violation with a verbal warning. Do not promise accidental catches are automatically exempt.
- [QA12](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/12) confirms that adding NECTAR while the HIVE is moving is not separately prohibited, but may prevent completion of the TIP. Its **question** mentions 5 NECTAR/8 POLLEN; the **answer does not make these fixed scoring thresholds**. It says piece placement and HIVE dynamics vary and scoring depends on the damper criterion. Never promote the question's premise, local 199.6 g calculations, or nominal masses to an official rule.

## FLOWERS: time, owner, bonus, volume and removal

**§10.5.2 p88; G410 p109; G418 p112**:

- FLOWER scoring volume is between the top and middle rings. A piece must be at least partly within that volume. Being somewhere in the structure, resting below the middle ring, or hovering alongside does not by itself establish a legal scored piece.
- Owner: the alliance whose color is the **topmost qualifying NECTAR** owns the FLOWER and receives 2 points for every qualifying POLLEN/NECTAR there, regardless of who placed them. Initial POLLEN alone does not assign a FLOWER to the alliance on that field side.
- Bonus: the alliance whose color is the **bottommost qualifying NECTAR** gets the 5 point bottom bonus. This is separate from ownership; the same alliance need not receive both.
- G410 specifically prohibits **NECTAR** entering the FLOWER scoring volume until the final 60 seconds. Penalty is a MAJOR FOUL per early NECTAR. The p88 orange box broadly describes FLOWER scoring beginning with one minute remaining; that does not expand G410's exact subject from NECTAR to all POLLEN placement. For the public guide, state the exact NECTAR restriction, cite G410, and avoid either a broad “all FLOWER interaction is forbidden beforehand” claim or unsupported strategic permission. No current answered Q&A entry resolved the orange-box wording more specifically.
- G418 permits entry only through the top and removal only of **POLLEN from the bottom**. No deliberate NECTAR extraction, side entry or side extraction. Ordinary contact during legal attempts is not automatically prohibited; avoid a blanket “never touch the FLOWER.”
- The “ownership unlocked” chime at 1:00 is courtesy audio. Visual field timer is authoritative (§9.11 p79; G410 p109). TU04 specifically supplies the chime; software/human timing should not rely on audio over the field display.

## Humans and NECTAR release

**G424–G428, pp 115–117; §10.3.1 p84**:

- Five NECTAR start in each alliance area. Each TIP of the corresponding colored HIVE unlocks one additional NECTAR; when 60 seconds or less remain, all remaining NECTAR may enter. The unlock is per alliance/HIVE, not per robot. Entry need not be immediate after a tip.
- TU02 adds that own NECTAR that exits the field may be re-entered at any time via G427; re-entry is not another fresh-ball unlock.
- [QA11](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/11) explicitly permits TIP-unlocked NECTAR introduction in **AUTO** as well as TELEOP, provided human-interaction rules are followed.
- G427 requires own-colored NECTAR, no tool, and contact with the TILE inside the own LOADING ZONE before a robot or other field element. Do not hand a ball directly to an intake or score it directly in HIVE/FLOWER. DRIVE COACHES cannot handle scoring elements except for safety (G424).
- [QA6](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/6) clarifies the person must release/drop the NECTAR before it contacts the TILE, to comply with G425; no special holding-on-the-floor exception. [QA7](https://game-qa.firstinspires.org/boards/2027/FTC/QA/qa/7) accepts throwing/rolling after release when the loading-zone floor-first and no direct HIVE/FLOWER scoring conditions are met.

## Setup and field facts suitable for the overview

**§10.3.1–10.3.4 pp 83–85; G304 p104; G305 p105**:

- 40 POLLEN total: four in each of four FLOWERS (16), four in each GARDEN (8), and four preloads touching each of four robots (16).
- 8 red+8 blue NECTAR total: three in each corresponding upward CELL (6), five per alliance area (10).
- Each robot must contact **exactly four POLLEN preloads**. They may be in/on it or on the TILE contacting it, but **all preloads must be wholly on its alliance half** (TU03 clarification). Do not write “up to four” or “must fit all four inside the robot.”
- Robot starts wholly on its own half, touching perimeter, outside LOADING ZONE, not touching or in FLOWER scoring volume, in starting configuration, and stationary after INIT. An AUTO OpMode must have the 30 second timer enabled. Teams select and INIT an OpMode even if not running AUTO.
- Timing remains 30-second AUTO, 8-second transition, and 120-second TELEOP (§10.4 p85). G403 p106 prohibits powered robot/mechanism movement during transition; initialization that causes twitching must wait until TELEOP. This is useful practical context for the programming links.

**§9.1–9.9 pp 63–77**:

- Field is approximately 144×144 in inside its walls, with 36 approximately 24 in tiles (§9.2 p64). Dimensions/illustrations are nominal; use current CAD/setup drawings and tolerances, not measurements from webpage art.
- POLLEN approximately 2.8 in diameter; NECTAR approximately 3.6 in (§9.8 p74). No manual mass or automatic ball-count tipping threshold was established in this audit.
- HIVE cell opening approximately 20 in wide × 14 in tall × 12 in deep (§9.6.2 p70). **Figure 9-10 p71 now has bottom of HIVE 30.6 in above tiles**, corrected from V1's 25.5 in by TU01. Do not confuse this with the upward opening bottom 53.5 in or top 65.6 in. Both V1 and TU04 diagrams were rendered and inspected.
- FLOWER top opening approximately 4 in diameter, 21.5 in above tiles; use §9.7 p72 and current diagrams for mechanism design.

### AprilTag IDs: visually verified, not filled in from memory

**§9.9 pp 74–77, especially rendered p76**: 36h11 family; 3.25 in square tags; four clusters, one attached to each CELL, four distinct tags per cluster. Each cluster is on a CELL bottom facing tiles, its lower edge oriented toward field center (§9.9 p75).

| CELL location | Printed tag IDs |
| --- | --- |
| Red, opposite audience |30,31,32,33|
| Red, audience side |34,35,36,37|
| Blue, audience side |38,39,40,41|
| Blue, opposite audience |42,43,44,45|

The current season page's cluster explanation is consistent with these field facts; SDK 12 result class details remain covered by the vision audit. Clusters move with tipping CELLS; avoid describing all 16 tags as stationary wall tags or reusing old-season field coordinates. The manual says its tag images are not for printing; link official Playing Field Resources for practice assets.

## TU00–TU04: actual changes versus unchanged V1 assumptions

All updates were read in full from the combined 11 page packet. Printed update page numbers below refer to each update's own footer; combined page numbers in parentheses aid locating artifacts.

| Update | Date | Relevant change and location |
| --- | --- | --- |
|TU00,3 pages (combined 9–11)|Sep 12, 2026; resource page labels v2 updated Sep 17|Baseline overview of changes from previous season/V0, rather than later BIOBUZZ scoring changes: CIC/STRATEGIC framework, restructured rules, 8 motor + 8 servo limit, revised expansion, removed prior allowed-gamepad list, and other construction/tournament revisions. Do not present these as changes from supplied V1 to TU04.|
|TU01,2 pages (combined 7–8)|Sep 17|§9.6.2 Figure 9-10: bottom HIVE height corrected to 30.6 in(77.70 cm). Also duplicated-card text removal, G204 rule cross-reference correction, and QuestionBox representatives wording.|
|TU02,4 pages (combined 3–6)|Sep 24|Violation interpretation table corrections; G420 entanglement guidance; G423/G425 penalty attribution to responsible team. G426 clarified one **additional** NECTAR per own-HIVE TIP, optional delayed entry, and own NECTAR re-entry after field exit.|
|TU03,1 page (combined 2)|Oct 1|§10.3.4 andG 304.G clarify that preloads are wholly on own alliance half; judging/outreach resource links updated.|
|TU04,1 page (combined 1)|Oct 8|§9.11 Table 9-1 supplies 1:00 FLOWER-unlock **Chime**; judging feedback/interview-bank links and escalation-guideline links updated.|

Focused V1/TU04 text comparison confirms no substantive changes in the requested scoring values/thresholds, G407 control limit, G409 discharge rule, G410 timing rule, G417 launch-only manipulation rule, G418 flower-entry/removal rule, FLOWER ownership/bonus criteria or tag-ID placement. The key gameplay deltas for an expanded V1-based overview are the corrected HIVE height, preload half-field constraint and NECTAR-entry clarifications. Recent Q&A adds interpretation; it is not evidence that TU04 changed the underlying scoring table.

## Concrete changes recommended for the existing season page

1. Replace the current sparse scoring paragraph (line 38) with the complete small scoring table and explicitly explain AUTO/TELEOP PARK assessment and LEAVE wall contact at endAUTO.
2. Expand the RP paragraph (line 40) with 16/4/7 for applicable other events and TBA for **both** championship categories, plus Premier exception.
3. Add a short “legal scoring loop” explanation using four-piece combined CONTROL, own-colored NECTAR, launch into upward CELL, completed TIP, legal discharge collection, human unlock/loading, final-minute NECTAR/FLOWER ownership and PARK. Keep it rule-based; do not prescribe private team design choices or predicted optimal cycle timing.
4. Explain topmost owner versus bottommost bonus and actual scoring volume. Name the exact final-minute NECTAR restriction rather than a blanket FLOWER ban.
5. Add concise setup/piece-count information and a rule-link box. Keep source review date 2026-10-14 and manual TU04 (Oct 8) separate.
6. Keep the existing cluster section; optionally add the four ID ranges and dimensions only if readers need that implementation detail here. Avoid duplicating the full vision tutorial.

## Inspection record and limits

Artifacts under `/tmp/crocodocs-audit-controls/biobuzz/` include both primary PDFs, page-indexed extracted text for relevant pages, full layout text, public Atom question/update feed, and rendered images: `p91-scoring.png`, `p76-tags.png`, `p71-hive.png`, `v1-p71-hive.png`, `p88-flower.png`, `p85-setup.png`, `tu02-p4.png`, `tu03-p1.png`. Decisive numeric/geometry/scoring images were visually inspected, including the p91 table, p76 IDs and V1/TU04 p71 height difference.

No answered Q&A needed for the listed overview topics was blocked. No current answered question specifically settled the p88 orange-box/G410 wording discrepancy; the manual's rule-precedence convention controls the wording recommendation. No login, question submission, private team messaging, hardware measurement or physical rule-enforcement test was performed. The official game board's question bodies sometimes contain unverified premises; only published answers and manual text were treated as authority. This packet is source evidence and recommended wording scope, not a referee ruling for a particular robot design.
