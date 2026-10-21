# Season topics and wiring

Scope: six new articles, two original SVG diagrams, a standalone Java helper, and navigation/cross-links. Existing playgrounds, portfolio studies, and hardware photos are unchanged.

## Source review

Reviewed on 21 October 2026:

- Eeshwar Krishnan's two shooting articles and electrical article, as requested.
- OpenStax projectile and relative motion chapters; WPILib coordinate-system documentation as a frame reference, without introducing FRC APIs into FTC examples.
- GM0 wiring, FIRST wiring/ESD guidance, REV Control Hub electrical/connector specifications, REV grounding-strap instructions, and Littelfuse ATO fuse characteristics.
- Live BIOBUZZ resource index lists TU05 (15 October). Field description chapter 9 remains TU04; robot-construction chapter 12 is TU05. New articles avoid repeating version dates and do not reuse illustrative geometry as field dimensions.

The equations compensate horizontal motion while preserving the vertical flight at the chosen time. A fixed hood imposes an additional constraint; the helper does not solve it or command hardware. Calibration-table rows keep flight time, RPM, and hood setting together. Camera capture latency and feeder-to-release delay are separate.

The electrical articles separate battery-side current from regulated servo current. Control Hub limits are 2 A per servo pair and 5 A shared across servo/auxiliary 5 V outputs. The 90% converter efficiency is explicitly illustrative. Grounding guidance permits approved resistive straps, without claiming one vendor is the only permitted option. Fuse behavior is described in terms of time and current, not an instantaneous current ceiling.

## Math and code checks

- Stationary example: d = 2.4 m, h = 0.7 m, angle = 50 degrees. Ball speed = 5.626203 m/s, flight time = 0.663634 s, vertical arrival speed = -2.200324 m/s.
- Moving example: d = (2.4, 0) m, h = 0.7 m, t = 0.6 s, launcher velocity = (0, 1) m/s. Relative launch velocity = (4, -1, 4.109667) m/s; yaw = -14.036243 degrees, pitch = 44.906472 degrees, speed = 5.821457 m/s.
- `MovingShot.java` compiles with `javac --release 8`. A temporary harness reconstructs the velocity from its returned yaw/pitch/speed, adds launcher motion, and integrates each flight to its target: 326 trajectories pass. Both lateral directions, forward/back motion, positive/negative target heights, symmetry, the published worked example, and seven invalid/overflow cases are covered.
- No robot, launcher, moving HIVE, drag model, hardware limits, or flywheel calibration was tested. The helper's contract states these limits.

## Content and rendering

- The docs check resolves all 112 MDX pages, navigation, local links, and assets.
- The production build passes. Focused Chromium checks cover all six new routes at desktop (1440px) and narrow widths, with 320px reflow and representative light/dark views. Headings, equations, tables, and loaded SVGs fit without page overflow or KaTeX errors. The two adjacent-article preview descriptions retain the site's existing intentional truncation.
- Both original diagrams have labels outside their paths and full-size links. The projectile image link receives a visible keyboard focus outline. The Java code block scrolls horizontally with the keyboard; mobile navigation opens, reaches Electrical and wiring, and closes after selection.
- Sources appear only in footers on the new articles. No runtime console errors were reported in the focused snapshot. Screen readers, Firefox, WebKit, physical phones, robot hardware, and shooting performance were not tested.
- Focused Intentional Verify: **ACCEPT** for the new content, navigation, figures, and code presentation. Production outcome is recorded in PROGRESS.md.
- All checked reference destinations return HTTP 200 except the Littelfuse PDF, which blocks the command-line request with HTTP 403. The primary-source web reader opens its three-page datasheet and time/current table successfully; this is an access restriction rather than a missing document.
- Keep Sources in footers. No copied blog images, new dependencies, or permanent test suite.
