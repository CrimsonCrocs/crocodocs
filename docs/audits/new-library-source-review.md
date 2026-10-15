# New FTC library coverage: Hive Vision, SolversLib and OpenLoop

Observed 14 October 2026. Bounded read-only research; no Crocodocs files changed. Primary repository metadata, tagged/current source, build files, licenses, published artifacts and documentation were inspected. Machine-readable pins and outcomes are in `report.json`. Suggested complete Java examples are in `examples/` and have been signature-compiled as described below.

## Recommended scope

Add three focused introductions. SolversLib is still maintained and has a current published artifact. OpenLoop is a very new source-copy timed autonomous helper, with no numbered package release. Hive Vision v2.0.0 is primarily a Limelight 3A neural-model release; teach detection telemetry first. Do not describe any of these as certified for competition or independently proven on our hardware.

| Project | Identity / version | Maintenance evidence | Article direction |
| --- | --- | --- | --- |
| Hive Vision | [hivevisionftc/Hive-Vision](https://github.com/hivevisionftc/Hive-Vision), [v2.0.0 release](https://github.com/hivevisionftc/Hive-Vision/releases/tag/v2.0.0), published 12 Oct 2026 | Repository unarchived; v2 model release on Oct12 and new Java demo code Oct14. Current main pin `fd597b8cf42ab684f2f5a0e9f3e23da2aeef2cf7`; release source pin `5181638d3856124a09bff3f9c345d8eb21034c2a` | Explain the Limelight and webcam tracks separately; use a stationary Limelight telemetry exercise. Webcam source currently has concrete integration defects. |
| SolversLib | [FTC-23511/SolversLib](https://github.com/FTC-23511/SolversLib), published `org.solverslib:core:0.3.6` | Unarchived; Sept15 code migration to Pedro3; Aug18 controller fixes and modern-SDK dependency changes. Artifact metadata updated Sept16. Source/tag pin `93ff730965655b3a55f6648ce5e0f1c0b820206b` | Install only core first; run a sequence of telemetry commands without motors. |
| OpenLoop | [AbhiPixeld/OpenLoop](https://github.com/AbhiPixeld/OpenLoop), creator Abhiraj Karki | Unarchived; initial implementation Sept27; documentation changes Oct4. No tags, GitHub releases or versioned Maven package found. Pin `b67b4034fd9a64e35f2a6f061f09d2432db85128` | Calibrate short timed moves; distinguish requested distance from measured position. Early project, not an established maintenance history. |

Repository archived flags and histories were fetched directly from GitHub API and saved in each `*-metadata.json`. Merely having recent GitHub activity was not treated as proof of robustness.

## Hive Vision

### What it actually is

The [versioned repository](https://github.com/hivevisionftc/Hive-Vision/tree/5181638d3856124a09bff3f9c345d8eb21034c2a) has no Gradle project, Maven coordinate, CMakeLists.txt, C++ source or Android AAR integration to install. There are two current deployment paths in the [author's overview](https://sidhuharjas.gitbook.io/hive-vision):

1. A TensorFlow Lite SSD-MobileNetV2 model and matching label file loaded onto a **Limelight 3A**. Inference runs on that device's CPU. The FTC robot program reads results using the FTC SDK's Java `Limelight3A` driver. This does not attach a VisionProcessor to VisionPortal.
2. Source-copy Java color thresholding on a Control Hub plus USB webcam: `cv/TeamCode/BallBlobPipeline.java` and `BallDetectorPipeline.java`. It uses VisionProcessor/OpenCV and does not use the neural model.

Current main archives the Lab and PC YOLO/ONNX tracks; do not recommend those as current installation paths. The separate `ftc_ball_chase_lib` contains advanced action/driver wrappers with additional dependencies. They are unnecessary to read detections, and their historical SDK11/Pedro2 examples should not be mixed into a beginner SDK12 article.

The FTC code is Java. Limelight documentation also contains FRC Java/C++ examples; those use a different robot platform/API and do not establish an FTC C++ deployment path.

### Exact v2 setup

Use the [v2.0.0 release assets](https://github.com/hivevisionftc/Hive-Vision/releases/tag/v2.0.0), rather than old filenames from rolling quick starts:

- `best_limelight3a_ssd_mobilenetv2_300x300_v2_int8_dets25.tflite`
- `labels.txt`, in this order: `yellow_pollen`, `red_nectar`, `blue_nectar` (IDs 0, 1, 2).

Configure the Limelight pipeline as **Neural Detector**, choose **CPU**, upload both files and match the model's **300×300** input. The release suggests a high detection threshold around 80–90% as a starting point. Treat that as the release author's tuning guidance; compare it with actual false positives/misses under the robot's lighting. Older setup pages still describe the old model and 0.35–0.45 thresholds.

Follow the [manufacturer's 3A quick start](https://docs.limelightvision.io/docs/docs-limelight/getting-started/limelight-3a) for wiring and configuration. Its supported FTC arrangement uses USB-C to the Control Hub's blue USB3 port. For initial browser setup, connect the camera to the computer by USB and use Hardware Manager or `http://limelight.local:5801`. The FTC scan identifies an Ethernet device which can be named `limelight`. Do not promise that the hostname is reachable over the robot Wi-Fi without the relevant connection/forwarding setup. The 3A has CPU neural inference and no Coral support. No Raspberry Pi, NVIDIA GPU, Python environment or C++ toolchain is required to run this model on the 3A.

The proposed exercise targets FTC SDK12.0.0, whose Hardware artifact includes `com.qualcomm.hardware.limelightvision.Limelight3A`, `LLResult` and `LLResultTypes`. No new Maven dependency beyond the standard FTC project is needed for this path. A minimum Hive SDK version is not declared by its model artifact; SDK12 was the inspected/compiled version here.

### Practical Java example

Complete, compiled example: [HiveDetectionPreview.java](/tmp/crocodocs-new-libraries/examples/HiveDetectionPreview.java).

The material calls are source-verified:

```java
limelight = hardwareMap.get(Limelight3A.class, "limelight");
limelight.setPollRateHz(50);
limelight.pipelineSwitch(0); // The Hive model must be in slot 0.
limelight.start();
```

During `loop()`, get `limelight.getLatestResult()`, require a valid, recently received result from the expected pipeline, and iterate:

```java
for (LLResultTypes.DetectorResult detection : result.getDetectorResults()) {
    telemetry.addData(detection.getClassName(), "tx=%.1f deg, raw confidence=%.3f",
        detection.getTargetXDegrees(), detection.getConfidence());
}
```

Call `limelight.stop()` from the owning OpMode's `stop()`. The supplied complete example handles absent/invalid results and uses distinct telemetry keys when multiple objects are visible.

Freshness and measurement cautions: `LLResult.getStaleness()` is milliseconds since the Control Hub received/parsed that result, not a guarantee that it contains a newly captured frame. Faster polling can reread one camera frame. Compare `getTimestamp()` if implementing consecutive-frame confirmation. Do not subtract a camera-local timestamp from the Control Hub clock. The SDK DetectorResult Javadoc calls confidence 0–100, while its implementation forwards JSON `conf` unchanged; inspect the actual firmware output before choosing a numerical threshold. The beginner example deliberately prints raw confidence and commands no motion. A ball's `tx` is an angular offset, not field X or distance.

Source: official FTC Hardware12 source archive previously downloaded at `/tmp/crocodocs-audit-vision/sdk12/Hardware/com/qualcomm/hardware/limelightvision/`, particularly `Limelight3A.java:136,167,225–247,308`, `LLResult.java:75–115,187,442` and `LLResultTypes.java:249–289,334`. Archive URL: [Hardware12.0.0 sources](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/Hardware/12.0.0/Hardware-12.0.0-sources.jar). The [manufacturer's FTC API guide](https://docs.limelightvision.io/docs/docs-limelight/apis/ftc-programming) independently matches this API family.

### Source defects and conflicting upstream guidance

Do not publish the webcam path as a copy-and-run lesson without correcting and validating it:

- [BallBlobPipeline at v2](https://github.com/hivevisionftc/Hive-Vision/blob/5181638d3856124a09bff3f9c345d8eb21034c2a/cv/TeamCode/BallBlobPipeline.java#L34) imports nonexistent `org.firstinspires.ftc.vision.CameraCalibration`. Correct FTC12 type: `org.firstinspires.ftc.robotcore.internal.camera.calibration.CameraCalibration`. The two original Java files fail javac because of this.
- `BallBlobPipeline.processFrame` clones and returns a Mat at lines128–131. Although covariant Mat-as-Object is legal Java, VisionPortal uses the return as the callback's draw context; it continues displaying the original frame. The empty onDrawFrame never consumes or releases this clone. Thus the promised overlay is absent and per-frame native allocation is left to eventual GC. Use Canvas draw context or a clearly owned image annotation strategy; never release the camera-owned input. This is source inspection of the Hive processor and FTC12 `VisionPortalImpl.ProcessingPipeline`, not a camera runtime test.
- [Current webcam quick start](https://github.com/hivevisionftc/Hive-Vision/blob/fd597b8cf42ab684f2f5a0e9f3e23da2aeef2cf7/docs/quick_start_cv.md#L31) imports `org.opencv.core.Size` for `VisionPortal.Builder.setCameraResolution`, which actually takes `android.util.Size`.
- The HSV blob coordinates normalize by image width/height: zero is the top/left, 0.5 is center and one is bottom/right. They are not signed center-zero coordinates. `bestOf()` can return null, and `suspend()` leaves the last detection snapshot unchanged; it must not be interpreted as a fresh observation.
- The release v2 describes up to25 detections, but rolling README/setup prose retains old model names and10-output shapes. Use the release assets/notes for this version. The author's 18–21ms inference comparison was measured on a development host; do not turn it into guaranteed Limelight/Control Hub FPS or pickup success. The stated97.3% is an author-reported training/evaluation metric, not an independent result.

### Binary/artifact checks actually performed

Downloaded the actual release model (5,190,408 bytes) and label asset. Model SHA256: `5ef2727847f9b1cff89b3c271e7a8416a67f797e43d533707037a9e41f1139dc`. A small FlatBuffer structure reader verified TFL3 identity, input `uint8 [1,300,300,3]` and quantization scale approximately1/255; output tensor types are float32. Output tensor shapes are not statically populated in the tensor records, so the advertised25-detection contract was not independently tested by inference. See `inspect_model.py` and `hive-model-contract.json`. No TensorFlow interpreter or Limelight was run.

### License and article exercise

The [v2 LICENSE](https://github.com/hivevisionftc/Hive-Vision/blob/5181638d3856124a09bff3f9c345d8eb21034c2a/LICENSE) grants MIT terms for original code, documentation and configuration. [Third-party notices](https://github.com/hivevisionftc/Hive-Vision/blob/fd597b8cf42ab684f2f5a0e9f3e23da2aeef2cf7/THIRD_PARTY_NOTICES.md) separately cover archived YOLO/Ultralytics material under AGPL terms and limit assumptions about demo-media redistribution. Do not label every binary/media asset simply MIT: the code-scoped grant does not explicitly resolve every model-weight asset, while release notes identify dataset licenses. Link users to model downloads rather than bundling or relicensing them. This is a description of inspected notices, not a legal interpretation.

Proposed article title: **Detect BIOBUZZ balls with Hive Vision**. Sections: two deployment paths; required hardware; download exact v2 model+labels; verify boxes in the camera UI; read a detection without driving; confidence/freshness/coordinate limits; links to advanced tracking. Exercise: move one colored object left/right, remove it, add a similar-colored distractor and record reported class/tx/confidence. Do not add ball-chase driving to the first lesson.

## SolversLib

### Maintenance and compatibility

This is Seattle Solvers FTC23511's maintained FTCLib fork, not FTCLib2.1.1 with a new version number. [Official installation docs](https://docs.seattlesolvers.com/installation) and [Dairy metadata](https://repo.dairy.foundation/releases/org/solverslib/core/maven-metadata.xml) agree on **0.3.6**. Old `v2.1.1` tags are inherited FTCLib history; the Solvers release tag is `0.3.6`.

[Source93ff730](https://github.com/FTC-23511/SolversLib/tree/93ff730965655b3a55f6648ce5e0f1c0b820206b) contains meaningful recent code changes: Pedro3 migration on Sept15, controller velocity/reset corrections on Aug18, and a stop-during-INIT lifecycle fix. This supports “still maintained as checked Oct14”; it does not promise a future maintenance schedule.

[Core build](https://github.com/FTC-23511/SolversLib/blob/93ff730965655b3a55f6648ce5e0f1c0b820206b/core/build.gradle.kts) uses the Dairy Android library plugin11.1.0-1.1.1 and compileOnly FTC RobotCore/FtcCommon/Hardware dependencies. The published0.3.6 AAR declares Android API24 minimum; inspected Java classes use Java8 bytecode. Our example compiled against FTC12.0.0. This is signature compatibility evidence, not a complete Android integration test.

### Exact dependency setup

In an Android Studio FTC project's TeamCode Gradle configuration:

```groovy
repositories {
    maven { url 'https://repo.dairy.foundation/releases' }
}
dependencies {
    implementation 'org.solverslib:core:0.3.6'
}
```

Remove FTCLib core when migrating, and deliberately migrate imports from `com.arcrobotics.ftclib` to `com.seattlesolvers.solverslib`. The group/artifact is `org.solverslib:core`, but Java package imports begin `com.seattlesolvers.solverslib`. Follow upstream's instruction to choose one framework rather than teach both simultaneously.

Optional modules are `org.solverslib:pedroPathing:0.3.6` and `org.solverslib:photon:0.3.6`; neither is needed for the proposed introduction. The Pedro module targets Pedro3 (`com.pedropathing:revhub:3.0.0` in source) and requires the Pedro repository/setup as well. Version0.3.5 belongs to Pedro2; do not combine examples indiscriminately. SolversLib removed old FTCLib vision; it is not the camera library lesson.

[Published0.3.6 POM](https://repo.dairy.foundation/releases/org/solverslib/core/0.3.6/core-0.3.6.pom) declares Kotlin stdlib2.3.0, EJML simple0.39 and AndroidX core1.2.0 as transitive dependencies. The official dependency normally resolves these; do not manually add arbitrary versions to a beginner's build. AAR SHA256 `8f59b9e17a8125587b79fb9a3d606e1c69fd6084769c1eafe193f3d8fddb803b`; source JAR SHA256 `9fae28ceeb219491731b91dca35c14bdb50d4835f331e05ba4944f39fd9d0ffc`.

### Practical example and lifecycle

Complete compiled example: [SolversCommandPreview.java](/tmp/crocodocs-new-libraries/examples/SolversCommandPreview.java). It extends `CommandOpMode`, implements `initialize()`, schedules in `preRun()` after START and keeps `super.run()` in the overridden loop:

```java
schedule(new SequentialCommandGroup(
    new InstantCommand(() -> stage = "First command"),
    new WaitCommand(1000),
    new InstantCommand(() -> stage = "Finished")
));
```

`WaitCommand(long)` takes milliseconds. This wait is scheduler-driven; it is not Thread.sleep in the OpMode control loop. Scheduling initializes commands immediately in this scheduler, so using preRun avoids executing the first InstantCommand action during INIT. CommandOpMode itself owns the runOpMode lifecycle: INIT loop, preRun, scheduler loop, end and reset in finally. Do not add a second runOpMode or a separate waitForStart to this subclass. Source signatures were checked against the actual [published source JAR](https://repo.dairy.foundation/releases/org/solverslib/core/0.3.6/core-0.3.6-sources.jar), including CommandOpMode, CommandScheduler, InstantCommand, WaitCommand and SequentialCommandGroup.

Proposed article title: **Run a first command sequence with SolversLib**. Sections: why a scheduler helps; install core; read one command's lifecycle; run a telemetry-only sequence; modify timing/order; introduce subsystem requirements only when a mechanism is added. Exercise: change the1000ms wait to2000ms and observe both labels while the OpMode stays responsive. Teach cancel/end/requirements before motors; this simple exercise deliberately requires none.

### License nuance

The repository contains [FIRST-LICENSE](https://github.com/FTC-23511/SolversLib/blob/93ff730965655b3a55f6648ce5e0f1c0b820206b/FIRST-LICENSE) for inherited source and [23511-LICENSE](https://github.com/FTC-23511/SolversLib/blob/93ff730965655b3a55f6648ce5e0f1c0b820206b/23511-LICENSE). GitHub detects BSD3-Clause, but the latter text includes a fourth condition literally `67`. Preserve/link the actual files; do not rewrite the license as an unmodified standard BSD3-Clause grant. This observation does not resolve that clause's legal interpretation.

## OpenLoop

### Correct identity and maturity

The relevant project is [AbhiPixeld/OpenLoop](https://github.com/AbhiPixeld/OpenLoop), not a generic explanation of open-loop control, an AI agent platform named OpenLoop, or another programming package. The [pinned README](https://github.com/AbhiPixeld/OpenLoop/blob/b67b4034fd9a64e35f2a6f061f09d2432db85128/README.md) and its own Java source explicitly describe an FTC timed autonomous helper.

The inspected repository is unarchived with six commits in its short history. The implementation arrived Sept27; latest Oct4 changes are documentation. There is no semantic release/tag/artifact version. Cite the commit/date as the version scope instead of inventing0.x or1.0. [build.dependencies.gradle](https://github.com/AbhiPixeld/OpenLoop/blob/b67b4034fd9a64e35f2a6f061f09d2432db85128/build.dependencies.gradle) uses FTC SDK12.0.0. No third-party Java library dependency is required for the helper.

### Install and calibrate

Copy `OpenLoopBackend.java` into the normal TeamCode package. The author's onboarding also provides `MotorDirectionDebugger.java`, the appropriate `OpenLoopMecanumCalibration.java` or `OpenLoopTankCalibration.java`, and the corresponding example Auto. This can be source-copied into OnBot Java or an existing Android Studio project; replacing the whole robot project is optional.

The actual backend always maps **four DcMotor objects**, even in TANK mode. Thus its unmodified tank arrangement is two motors per side; do not claim it supports a two-motor tank without adapting the mapping. Defaults are hardware names `FL`, `FR`, `BL`, `BR`; replace them with the actual configured names. Direction defaults reverse the left pair but must be verified on the robot.

Source: [OpenLoopBackend](https://github.com/AbhiPixeld/OpenLoop/blob/b67b4034fd9a64e35f2a6f061f09d2432db85128/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/OpenLoopBackend.java), particularly lines163–259,261–395,400–428,442–475.

Run the author's direction/calibration OpModes in a suitable practice setup. Take two measured distances at the two configured times for forward motion, and two for mecanum strafing. Tune left/right90° timing separately. Record battery voltage, floor, payload and power. Distances are inches, turn arguments are degrees, positive turn means right. `DRIVE_POWER`, `STRAFE_POWER` and `TURN_POWER` should match the calibrated conditions. The backend fits a straight line between two distance/time samples; it does not read encoders or heading.

### Practical API and limits

Complete compiled example: [OpenLoopShortAuto.java](/tmp/crocodocs-new-libraries/examples/OpenLoopShortAuto.java).

```java
OpenLoopBackend bot = new OpenLoopBackend(this, OpenLoopBackend.DriveType.MECANUM);
waitForStart();
if (isStopRequested()) return;
try {
    bot.forward(6);
} finally {
    bot.stop();
}
```

A request such as `forward(6)` estimates the timing for six inches from the user's calibration. It does not know the robot's actual travel, correct collisions/wheel slip or localize on the field. Voltage compensation rescales requested motor power and clips it; it cannot guarantee the calibrated distance. Use finite, meaningful calibration values and check repeatability; invalid/equal distances are not rejected with a helpful error.

All movement methods block through `LinearOpMode.sleep`, then stop motors. They do not poll opModeIsActive internally. If expanding to multiple movements, check `opModeIsActive()` before each subsequent call and retain finally-stop cleanup. Tank-mode strafe requests silently return rather than throw. Do not call it a nonblocking path follower, PID controller, motion profiler or alternative localization system.

Proposed article title: **Calibrate a short autonomous move with OpenLoop**. Sections: what time-based movement can answer; install files; map/direction-check four motors; two-point calibration; perform one short move; compare requested versus measured travel; when to move to feedback-based control. Exercise: repeat a six-inch request three times, log travel error and explain why the results differ. Begin with one move; do not present a complete match route as validated.

The repo's [LICENSE](https://github.com/AbhiPixeld/OpenLoop/blob/b67b4034fd9a64e35f2a6f061f09d2432db85128/LICENSE) contains a FIRST BSD-style notice and explicit absence of patent grants; GitHub identifies BSD3-Clause-Clear. Preserve the included notice when copying source.

## Competition/platform boundary

These are programming tools, not blanket approvals of a robot configuration. A successful Java compile establishes that the inspected symbols are available; a manufacturer's FTC integration page establishes supported integration, not compliance with every current season rule. The article can say that FTC SDK provides the Limelight3A Java API and that the two other projects use FTC SDK robot code. It should not say “FIRST approved this library” or infer that an arbitrary GPU/PC/coprocessor, connection, autonomous behavior or payload is legal. Apply the parent's independently verified BIOBUZZ TU04 manual context for any concrete legality claim; this branch did not redo that complete rules check.

## Validation and reusable files

- All six original OpenLoop Java source files compiled against actual FTC12.0.0 AAR class files plus Android36 API signatures.
- All three proposed complete Java examples compiled: Solvers0.3.6 actual AAR + FTC12; Hive preview uses only the SDK's Limelight API; OpenLoop short auto uses the unmodified backend.
- Original Hive v2 webcam source pair failed on the wrong CameraCalibration import, as described above.
- Logs/classes are under `validation/<check>/javac.log`; complete original source copies are under `hive-v2/`, `hive/`, `solvers/`, `solvers-published-src/` and `openloop/`. `*-tree.json` and `*-metadata.json` preserve source/discovery pins. The source copies are research evidence outside the product repository, not an authorization to redistribute model/media assets.
- No full Android Gradle project build, Kotlin compilation, deployment, model inference, VisionBench test, camera operation, hardware movement or FTC inspection certification was performed.

The complete examples are ready for the parent to adapt into article tabs. Preserve the checked imports/signatures/lifecycle and the specific version scope. Copying a Java example into a Kotlin tab is not Kotlin compilation evidence.
