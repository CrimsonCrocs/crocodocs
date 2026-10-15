# Programming playgrounds

Five complete Java examples are prepared in `src/lib/playground-examples.ts`: a timed Blocks-equivalent sequence, first-OpMode telemetry, integer division, timed motor power, and a nonblocking button action. The component uses the hosted simulator without a saved workspace.

All five article sections are commented out at Matthew's request. Their headings and instructions are included in the comments, so public articles have no empty playground sections. Keep them disabled for this release.

## Before enabling

- Wait for [the simulator embed update](t3-thread://v1/49658190-ecac-4616-b650-44b557bd7c2b) to finish and reach production.
- Use `theme=light` for every embed, including those displayed inside dark CrocoDocs pages.
- Replace the Java equivalent on the Blocks page with a real single-file Blocks example using the released `.blk` query contract.
- Recheck each exercise against the new embed UI. That thread is removing the telemetry panel, so the telemetry and division lessons need a visible output method before they can be enabled.
- Verify Play, Stop, editing, and narrow layouts in the deployed iframe before uncommenting the articles.

## Existing evidence

Before the pause, all five Java OpModes compiled and ran in the hosted simulator. Integer division reported 0 versus 0.5; timed movement finished and stopped its motors; the button action started once per press, cancelled with B, and continued reading the joystick. Desktop, 390px, and 320px article layouts were inspected in Chromium. This evidence applies to the earlier Java embed, not the forthcoming Blocks, theme, or telemetry changes.
