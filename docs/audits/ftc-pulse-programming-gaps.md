# FTC Pulse programming gaps — 2026-11-01

## Result

Prepared eight programming guides and expanded two existing articles after comparing retained programming discussions with CrocoDocs. Source-linked findings, proposed experiments, unresolved cases and exact coverage are in [FTC Pulse Analytics](https://app.notion.com/p/40c75a51ff89817f8640dc1b535fa618). The report was read back after the asynchronous write: correct data source, Name property, native programming icon, 60 Discord source links and final section are present. Notion automatically converted a legacy date tag to its current date syntax.

The programming content passed the November 2 quality audit below and is prepared for the requested production deployment. No robot hardware was exercised. Final deployment status belongs to the release commit and hosting deployment, rather than the research coverage claim.

## New guides

| Route | Missing reader task addressed |
| --- | --- |
| /docs/control-systems/field-centric-drive | Rotate input with explicit axes; check individual directions before heading integration |
| /docs/cegp/loop-timing | Measure full cycles; own bulk-cache refresh and separate I2C freshness |
| /docs/autonomous/localization-troubleshooting | Diagnose scale, offsets, turns, vibration, status and stale data before retuning |
| /docs/autonomous/reliable-sequences | Distinguish settled arrival, timeout, failed measurement and cancellation |
| /docs/autonomous/auto-to-teleop | Carry valid pose snapshots; align heading; start TeleOp without AUTO |
| /docs/control-systems/flywheel-velocity | Choose a velocity controller; convert units; gate feeding on measured recovery |
| /docs/sensors-and-vision/limelight | Select pipelines, reject old results and distinguish aiming from global pose |
| /docs/season-topics/turret-aiming | Aim from an offset pivot and choose a reachable unwrapped target within travel limits |

Expanded debugging with Gradle/JDK/network/file-lock cases, install target identity, startup class loading, live configuration and off-robot testing. Expanded the physical colour-sensor article with sample interval versus passing-object dwell and entry/exit counting. Linked the additions from existing indexes and sidebar groups.

## Editorial decisions

- Public teaching pages use official SDK/manufacturer/project references in the existing Sources footers. Raw discussions remain outside this repository.
- Preserve reported fixes, suggestions, disagreements and unanswered cases separately in the research report.
- An unconfirmed community claim does not establish a universal fix, benchmark, buying recommendation or current competition rule.
- Keep controller ownership, frame conventions, units, lifecycle, data age and explicit failure results visible.
- Existing PID, homing, filtering, basic vision, libraries and moving-shot articles already cover many concepts; link them instead of repeating them.
- Full alliance mirroring, a complete moving-camera 3D implementation and hardware-specific multi-camera/native-I/O repairs remain qualified follow-ups.

## Source checks

Inspected the published FTC SDK 12.0.0 RobotCore and Hardware source archives for blackboard persistence, velocity APIs, Pinpoint setup/update units, Lynx bulk caching/transport locks and Limelight result retention/timestamps/pose units. Checked primary documentation for IMU orientation, Pinpoint, OTOS calibration, Limelight, Pedro 3 endpoint constraints and Foresight, Road Runner actions, Android JDK selection, Gradle dependency reports and rigid transforms.

The turret geometry, wheel-mixing application, arrival helper and pose-handoff helper are original examples. They do not claim measured Crimson Crocs robot performance.

## Verification

| Check | Evidence |
| --- | --- |
| MDX, local links, assets and navigation | PASS: 155 pages in an isolated deployment snapshot based on `31c2259` plus this programming change |
| Production build / TypeScript | PASS: 162 generated pages/routes; unrelated uncommitted Design changes were excluded from the snapshot |
| SDK-facing Java examples | PASS: FieldCentricDrive, LoopTiming, PoseHandoff, ArrivalGate, LimelightPreview and TurretAngles compile against SDK 12.0.0 / Java 8 / Android API 30 classes |
| Setup fragments | PASS: Pinpoint mapping/configuration and flywheel velocity fragments compile with explicit robot-specific inputs; the new handoff caller fragments also compile against the published Pedro 3.0.1 core artifact |
| Mathematical and state behavior | PASS: 5,108 assertions for field directions, power normalization, settling/deadline/stale/invalid/cancel outcomes, equivalent turret angles and limits, and velocity units; 12 further checks cover the new RPM, turret-pivot, and arrival-trace worked examples |
| Desktop article rendering | PASS: all eight new routes and both expanded articles, source footers, no document overflow or KaTeX errors |
| Narrow rendering | PASS at 390 px: all eight guides have no document overflow or KaTeX errors; code scrolls in its container, tables wrap, and both diagrams retain full-size links and descriptive alternatives |
| Reading paths and theme | PASS: Programming is the active section; joystick mapping reaches field-centric drive by keyboard; diagrams inspected in dark and light themes |
| Rendered inputs | A file-hash manifest binds the isolated snapshot to the intended programming changes; the final static SVG font correction was checked without rebuilding unchanged MDX |
| Physical hardware | Not run; host compilation and math checks do not establish sensor, motor or robot performance |

Unrelated concurrent Design/Engineering work was preserved. No broad unrelated robot, authentication, integration or release suites were run. Diff whitespace checks passed.

## Writing and placement audit — 2026-11-02

Scope: the eight programming guides above, their existing index/sidebar entries, and the lessons that introduce their reader tasks. The comparison baseline was the Pedro Pathing, feedforward, projectile mathematics, joystick mapping, and odometry guides: explicit prerequisites, named frames and units, worked reasoning, appropriately labelled code, a first experiment, failure handling, and compact source footers.

| Finding in the initial additions | Repair |
| --- | --- |
| The handoff frame named units and heading but omitted its origin; integration stopped at prose | Defined the Pedro field origin and axes, required conversion at the boundary, and added version-checked AUTO/TeleOp caller fragments with a missing-pose path |
| Field rotation and an offset turret pivot required readers to visualise several frames at once | Added two original vector illustrations with descriptive alternatives, full-size links, and a numerical turret example |
| Flywheel conversion and arrival/recovery gates had few intermediate observations to follow | Added a complete RPM conversion and measurement traces showing settling resets, passing too quickly, success, and timeout |
| The localization checklist did not begin with one bounded physical experiment | Added a marked-reference push/return/turn sequence and clarified that a flat wall alone cannot establish full pose |
| Limelight setup allowed a pipeline that might not supply the example's offset fields | Specified a colour or AprilTag first exercise and separated image offsets, mapped pose, and follower pose in a units/frame table |
| Index links existed, but adjacent lessons did not consistently introduce the additions | Linked joystick mapping, PID, odometry, motion planning, and moving shots to the relevant new guide; placed handoff after localization/fusion in the autonomous reading order |

These are introduced teaching/placement gaps, resolved in this revision. The loop-timing guide already supplied a complete read-only first experiment and required no additional controller or caching abstraction. Inspection of SDK 12 source confirmed that motor directions and bulk-cache modes are reset for each OpMode; the audit did not turn those existing SDK guarantees into spurious defects.

All eight guides remain within Programming: Control systems, Autonomous, Code practices, Season topics, or Sensors and vision. CAD Design has its own section and was outside this edit. The isolated snapshot avoids treating unfinished concurrent CAD download links as programming failures or deploying those unrelated edits.

Scoped Intentional verdict: **ACCEPT** for teaching, placement, links, build, and the desktop/phone rendering exercised. Physical robot performance, screen-reader sessions, and other browser engines were not tested. The guide examples expressly require robot-specific configuration and measured trials.

## Archive coverage and reconnect blocker

Read all 29,581 unique retained #programming records through native FTC Pulse pagination. The retained span is discontinuous: six records on December 6, 2025 and a large run from April 19 through October 28, 2026. No January–March coverage or October 28–November 1 coverage was established.

Automated screening identified 2,650 possible symptom/question records, including false positives, and 954 technical candidates. Review included 502 longer excerpts and 38 fetched contexts (508 distinct context records, overlapping the excerpt set). The 60-area report is a broad deduplicated inventory, not an assertion that every retained record was individually reviewed or every Discord problem was found. Deleted/inaccessible messages, unknown archived threads and attachment contents remain gaps.

A 10,000-message, thread-inclusive older-window backfill failed before job creation because the Discord plugin was disconnected. No new messages were imported. Both the app UI and its integrity-checked bundled installer were denied by macOS App Management, which is off for FTC Pulse. Computer use also blocked opening Terminal for safety reasons. No OS permission or collection/retention change was made. The report includes the exact requested window and continuation boundary.

The initial task-owned site copy was removed after rendering. During the November 2 audit, the completed verification build's regenerable cache was also removed under disk pressure, preserving the compiled pages for inspection, repository work, research, and example-check evidence.
