# Programming and game overview audit

Reviewed 2026-10-14. This is a maintainer record; source excerpts and audit process do not appear in the public reading flow.

## Scope

All **47 original Programming-section pages** were reviewed: 12 control/autonomous, 13 sensor/vision, 20 libraries/setup/code-practice pages, the introduction, and the season overview. The review inspected the actual official SDK and library source where API and lifecycle claims depend on implementation. Eight original lessons were added, giving **55 Programming and 29 Engineering articles**.

The new lessons cover OpMode lifecycle, Java foundations, motors/servos, nonblocking state, debugging, limit switches, the universal IMU, and gravity feedforward. Alan G. Smith's Learn Java for FTC identified missing prerequisites; CTRL ALT FTC informed control explanations. Their code was not treated as a current SDK compatibility guarantee. Learn Java's PDF is All Rights Reserved; no substantial book text or solution code was copied.

## Library and resource refresh

A subsequent 14 October review adds SolversLib, OpenLoop, Hive Vision, and System identification: **59 Programming and 29 Engineering articles, 88 total**. Slothboard is covered inside Sloth with setup, current version, shared Dashboard packages, and conditional Road Runner exclusions. Engineering gained original gear-force teaching and a diagram, Onshape onboarding context, measurement terminology/timing, and two-motor lift limits. Cookbook concepts informed explicit manual-release behaviour and gamepad snapshots; its defective recipe code was not copied.

Publication checks cover every existing library. NextFTC 0.2.1 is still the latest published v2 line; development 0.3.0-SNAPSHOT remains separate. Panels FullPanels 1.0.18 integrates Sloth, replacing the older fork route. Slothboard 0.3.2+0.6.0 and SolversLib 0.3.6 are maintained. MercurialFTC 2.0.1-beta1 is identified as a beta, while the existing v1 tutorial remains explicit legacy coverage.

The new artifact check corrected an error missed in the original source-only Panels review: Java requires `PanelsTelemetry.INSTANCE.getTelemetry()`, not a static call. Corrected calls compile against the actual published Telemetry/Configurables 1.0.7 binaries. The earlier record below describes the initial 84-article review; the refresh records supersede its Panels/source-only limitation.

- [Library publication and API refresh](audits/library-refresh.md) · [release pins](audits/library-release-pins.json)
- [New-library source and compilation review](audits/new-library-source-review.md) · [pins](audits/new-library-pins.json)
- [Five-resource review and source caveats](audits/resource-refresh.md)
- [Article examples matched to compiled source](audits/library-example-preservation.json)
- [Refresh verification and limits](audits/library-refresh-verification.md)

All three new complete Java exercises exactly match their compiled source. A corrected complete Panels OpMode, Slothboard API example, and the unchanged NextFTC three-class example also compiled with published artifacts during this refresh. Original numerical checks cover the new gear forces, sensor delay/bias example, and synthetic model-fit arithmetic. No robot, camera, Limelight inference, hot deployment, full Android APK build, or refreshed Kotlin integration test was performed.

## Material corrections

| Area | Result |
| --- | --- |
| FTCLib | Motor sequence schedules after START. `schedule()` can initialize the first action immediately; INIT is not a motion barrier. Kotlin Runnable syntax and final cleanup corrected. |
| Android Studio | Standard deploy/run module is TeamCode. |
| NextFTC | Published v2 module context 0.2.1; Java uses `Collections.singleton`, complete imports, and accurate rising/falling-edge semantics for `whileTrue`. |
| Mercurial | Explicit legacy v1 1.0.3 boundary, with a complete assembled OpMode. Current v2 beta is a different programming model. |
| Pedro | Version 3.0.1 setup, test deadline, and `stop()` followed by `update()` in final cleanup. Endpoint holding is distinguished from zero drive output. |
| Road Runner | Explicit 1.0.1/0.1.25 context, MecanumDrive strafe scope, imports, Quickstart SDK distinction, and constant-heading strafe calls. |
| Panels | Browser telemetry uses PanelsTelemetry/TelemetryManager. Java singleton access corrected to `INSTANCE` by the subsequent binary review. Runtime-configured motor power remains bounded by a fixed test cap. No robot/runtime verification. |
| Sloth | macOS/Linux deployment command and remote-class removal before a standard install. No robot deployment performed. |
| Distance filters | Reject finite SDK unavailable sentinels and sensor-specific implausible readings before changing state. Invalid samples remain stale. Variance/alpha domains and cadence assumptions documented. |
| PID | Motor output and encoder calibration use a consistent positive-angle convention. Kotlin inherited-enum reference corrected. Full controller cleanup uses `finally`. |
| Profiles | Positive finite limits, nonnegative distance contract, per-move encoder baseline, cleanup, and an explicit forward-only overshoot limitation. |
| Localization | Starting field heading and initial IMU yaw are aligned; positive finite scales and finite input are required. Wrapped-heading behavior tested. |
| Autonomous | Entry guards prevent a later move after STOP during sleep. Imports, class-scope enums, Kotlin constant placement, state-machine assembly, and cleanup corrected. |
| Pure Pursuit | Unsafe whole-path/positive-power example replaced with standalone geometry, behind-target rejection, and explicit progress/recovery requirements. Curvature uses actual target distance, including endpoint fallback. |
| Vision | Correct WebcamName/Moments packages, SortOrder, integer area formatting, RGB2HSV conversion, Kotlin integer drawing radius, HSV hue scale 0–179, and current SDK sample names. |
| Camera lifecycle | Custom VisionProcessor locks processing/release and marks release terminal because SDK12 portal close is asynchronous. EasyOpenCV-owned Mats are explicitly released after synchronous camera close. |
| Vision prose | RGBA input, output-unit configuration, predominant-color processor name, local versus DS preview, no runtime processor attachment, and driver-derived color-sensor alpha clarified. |

NextFTC control 0.2.1's inspected Kalman implementation omits `C * Xhat` in the correction innovation. The article scopes this finding to the exact release and requires a nonzero-state convergence test before adoption. It does not claim the prediction step is broken or that future releases share the defect.

## Game overview

The FTC skill's complete background was loaded. Its bundled V1 manual was treated as historical context. Public game facts were checked against the **173-page English TU04 manual (2026-10-08)**, all TU00–TU04 updates, and the current answered official Q&A through 2026-10-13. Scoring and AprilTag numerical tables were visually checked against the PDF.

The article covers setup, the complete scoring table, assessment timing, four-piece combined CONTROL, HIVE TIP completion, discharge collection, FLOWER ownership and bottom bonus, the exact NECTAR timing rule, human loading, RP event distinctions, AprilTag clusters, and the corrected HIVE height. It does not publish private team strategies or untested mass/ball-count hypotheses as rules. Regional Championship and FIRST Championship RP thresholds remain TBA in the reviewed manual; Premier Events can set their own.

The exact G410 NECTAR wording is retained rather than broadening an explanatory box to every FLOWER interaction. Conflicting Q&A/manual penalty wording is documented in the research record; the public overview uses the manual and omits those penalty details.

## Verification

- **84 MDX pages:** repository syntax, local page links, images, and navigation checker; all 84 routes also returned a complete HTTP200 article response. The HTTP check consumes the body rather than intentionally aborting a render after headers.
- **24 Java compilation units/groups:** checked with `javac --release 8`, Android API30, actual FTC12 and published library artifacts. The NextFTC group contains three public files. Full examples and selected API fragments are distinguished in the source-stage reports.
- **15 Kotlin groups:** actual Kotlin compiler 2.3.0, JVM target1.8, the same real SDK/library types, and versioned OpenCV Java classes. This includes profile helpers, complete SDK/vision examples, FTCLib, Mercurial, and three-file NextFTC.
- **Hardware-free numerical probes:** trapezoid/triangle/zero-distance endpoints and invalid domains; EMA initialization and invalid-state protection; unrounded scalar Kalman update and invalid variances; nonzero encoder/yaw baselines; heading wrap; behind-target rejection; actual-distance endpoint curvature.
- FTCLib's scheduler INIT behavior was reproduced with the real scheduler on a desktop JVM. Vision telemetry's integer-format failure was reproduced independently before correcting it.
- Engineering and Programming heading text was simplified. The 397 heading simplifications preserve their prior fragment IDs through Fumadocs custom IDs or zero-height aliases; redundant body H1s were removed. Rewritten tutorial sections have the section structure shown in the current articles.

Compilation validates types and syntax, not physical behavior. No complete FTC Android APK build, Control Hub deployment, hardware calibration, camera stream/native OpenCV processing, physical motor/servo/IMU tests, or on-field path test was performed. Panels and Sloth remain source-reviewed only. A team must validate direction, limits, sensor range, timing, load, stop behavior, and gain tuning on its robot.

## Evidence

- [Source register](programming-sources.json)
- [Control/autonomous research](audits/programming-controls-source-review.md)
- [Vision research](audits/programming-vision-source-review.md)
- [Library/setup research](audits/programming-libraries-source-review.md)
- [BIOBUZZ TU04 and Q&A research](audits/biobuzz-tu04-source-review.md)
- [Final Java compilation results](audits/programming-java-compilation.json)
- [Final Kotlin compilation results](audits/programming-kotlin-compilation.json)

Research-stage reports intentionally retain the original findings and explicitly label their pre-correction scope. Temporary artifact paths in them are session-local. Current public articles, the source register, and final verification records describe the delivered result.
