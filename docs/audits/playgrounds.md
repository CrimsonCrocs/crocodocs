# Programming playgrounds

The five getting-started articles now use the released FTC Simulator embed. Every URL pins `field=empty`, `singleFile=true`, and `theme=light`; light mode also applies inside dark documentation pages. Examples are editable and reset on reload, without an account or saved workspace.

## Examples

| Article | Source | Observable exercise |
| --- | --- | --- |
| Blocks | FTC `.blk` XML with the Blockly workspace and FTC `<Extra>` metadata | Drive forward, pause, reverse, and stop; change the first sleep from 700 to 1400 ms |
| First OpMode | Java `GamepadPractice` | Drive with W/S or the left touch stick; change the speed multiplier |
| Java basics | Java `NumberPractice` | `1 / 2` requests zero power; changing it to `1.0 / 2` moves the robot |
| Motors and servos | Java `PowerPractice` | Compare positive and negative power over one second |
| Nonblocking code | Java `PulseDrive` | A starts one timed pulse per press; B cancels; change the duration |

The gamepad example adds motors to make the input visible. It is deliberately separate from the article's Hello Robot telemetry example. The division lesson now uses motor power as its output. None of the embed instructions rely on the removed telemetry panel.

The Blocks sequence uses `drive(power)` and `setup` functions, with collapsed definitions below the main stack. This keeps the main sequence readable inside an article while leaving the individual motor blocks editable.

## Released API and configuration

The contract was checked against `ftc-emulator/docs/EMBEDDING.md`, `src/lib/embed-options.ts`, the project templates, the vendored FTC Blocks definitions, and the live deployment on 15 October 2026. Java examples use the tank template's descriptive hardware names and right-side reversal. Blocks uses the mecanum template and its FTC Blocks hardware aliases.

The released Blocks tank template currently fails during server rendering with “Robot configuration schema 3 is incomplete or has an invalid physical profile or hub port descriptor.” The mecanum template works and supports the same forward/reverse exercise. No simulator source was changed for this documentation release.

## Focused verification

- All five complete examples compiled and ran against the hosted simulator. Edited versions also ran: the Blocks sleep, gamepad multiplier, decimal division, motor direction, and button duration.
- Play and Stop were exercised; timed examples reached Finished. The Blocks example was also run and edited inside the actual documentation iframe.
- Robot movement was inspected in the field. Telemetry is not used as a visible output.
- Article fit, responsive controls, theme, and deployment checks are recorded in `PROGRESS.md`.

The simulator thread is complete. The follow-up timer was disabled before implementation; no recurring task remains necessary.
