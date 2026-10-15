> Research-stage evidence, 2026-10-14. Findings describe the pre-correction snapshot. See `../programming-audit.md` for implemented corrections, final checks, and limits. Temporary artifact paths are session-local and are not required by the app.

# Control systems and autonomous programming audit

Read-only audit completed 2026-10-14. Scope: all 12 `content/docs/control-systems/*.mdx` and `content/docs/autonomous/*.mdx` pages, including their prose, equations, 29 Java blocks and 28 Kotlin blocks. No project files were changed. All scratch files, downloaded artifacts and source clones are under `/tmp/crocodocs-audit-controls`.

## Evidence and version scope

- FTC official robot-controller repository: **v12.0**, commit **e14c2aeb33e84d4ea21697beeea9ac49557be870**. Its dependency file selects FTC **12.0.0** artifacts and `build.common.gradle:103–104` selects Java 8 source/target compatibility. [Pinned build configuration](https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/e14c2aeb33e84d4ea21697beeea9ac49557be870/build.common.gradle#L102-L105), [pinned dependency file](https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/e14c2aeb33e84d4ea21697beeea9ac49557be870/build.dependencies.gradle).
- Actual FTC SDK implementation inspected from Maven Central source artifacts: [RobotCore 12.0.0 sources](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/RobotCore/12.0.0/RobotCore-12.0.0-sources.jar), [Hardware 12.0.0 sources](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/Hardware/12.0.0/Hardware-12.0.0-sources.jar). These include `LinearOpMode`, `DcMotor`, `DcMotorImpl`, `DistanceSensor`, `DistanceUnit`, `IMU`, `YawPitchRollAngles`, `Gamepad`, `Rev2mDistanceSensor`, and `VL53L0X`. The public controller repository contains samples, not all these SDK implementation files; the source JARs supply that missing evidence.
- Source-JAR SHA256: RobotCore `b1a7b0da86e778fb8e783ae00061f6e52699c6cfa98293305783160c19388bf9`; Hardware `a199d102a8011242624ccd5af62b337023aef58b79adb591c8d0562079ed3d43`.
- CTRL ALT FTC website and author repository inspected, pinned author repository commit **0bc0c90c96461b4e92ededc08ff1c26809126f6d**. Relevant chapters: PID/improvements, feedforward, heading wrapping, Kalman filtering, and both motion-profile chapters. Its README explicitly identifies the code as pseudocode. [Pinned scope statement](https://github.com/BenCaunt/CTRL-ALT-FTC/blob/0bc0c90c96461b4e92ededc08ff1c26809126f6d/README.md#L21-L27).
- NextFTC Suite control module inspected at release **v0.2.1**, commit **83606d2b8ab4c628b1585bd23561e6f91f2475c4**, and main commit **585b89ceabeb745340f4398f41ab5a97b37af2a8**. The API documentation labels the module 0.2.1; calling this simply “NextFTC v2” obscures independent module versioning. [Released Kalman source](https://github.com/NextFTC/NextFTCSuite/blob/83606d2b8ab4c628b1585bd23561e6f91f2475c4/control/src/main/kotlin/dev/nextftc/control/filters/KalmanFilter.kt).
- Independent mathematical implementation comparison: FIRST/WPILib [KalmanFilter v2025.3.2](https://github.com/wpilibsuite/allwpilib/blob/v2025.3.2/wpimath/src/main/java/edu/wpi/first/math/estimator/KalmanFilter.java), [DifferentialDriveOdometry v2025.3.2](https://github.com/wpilibsuite/allwpilib/blob/v2025.3.2/wpimath/src/main/java/edu/wpi/first/math/kinematics/DifferentialDriveOdometry.java), [TrapezoidProfile v2025.3.2](https://github.com/wpilibsuite/allwpilib/blob/v2025.3.2/wpimath/src/main/java/edu/wpi/first/math/trajectory/TrapezoidProfile.java). These are equation/model cross-checks, not proposed FTC dependencies.

## Every-page coverage

| Page | Java / Kotlin blocks | Result |
| --- | ---: | --- |
| `control-systems/index.mdx` | 0 / 0 | Open/closed-loop explanation and learning order checked; no material error found. |
| `control-systems/joystick-mapping.mdx` | 2 / 1 | SDK gamepad fields, signed stick mapping, tank motor calls and servo fragment checked. Complete Java TankDrive compiles. Claw placeholders are honestly identified as a fragment. |
| `control-systems/pid-control.mdx` | 7 / 7 | PID units, integral, measured derivative, monotonic timestep and all fragments checked. Complete Java class compiles. Signed sensor conversion needs output-sign correction (C5). |
| `control-systems/motion-profiling.mdx` | 2 / 2 | Trapezoid/triangle equations and samples checked with JVM diagnostics. Profile is correct for finite positive limits and nonnegative displacement. Follower origin mismatch (C4), one-way correction limitation (C9), omitted Kotlin math imports (C3), helper-domain assumptions (C10). |
| `control-systems/lowpass-filter.mdx` | 3 / 3 | EMA recurrence and alpha interpretation correct. First-reading initialization is good. Real SDK invalid readings must be rejected before state update (C1). |
| `control-systems/kalman-filter.mdx` | 2 / 2 | Scalar equations and variance units correct; Java helper compiles. Out-of-range gate inadequate (C1), small hand-calculation correction, missing variance preconditions (C10), upstream NextFTC correction defect (C8). |
| `autonomous/index.mdx` | 0 / 0 | Localization/control/planning distinctions checked. No programming issue found. Season rule verification remains with the parent audit; this audit does not independently certify the competition manual. |
| `autonomous/time-vs-encoder.mdx` | 2 / 2 | Both Java OpModes compile. Target-before-mode order, positive RUN_TO_POSITION power, relative ticks, OR busy condition, timeout, mode restoration and negative-distance explanation match SDK implementation/sample. Add entry guard/finally as recommended under C2. |
| `autonomous/odometry.mdx` | 3 / 3 | Counts-to-distance and differential translation checked. Java class compiles and straight update diagnostic passes. Current-heading integration is correctly disclosed as a straight-segment exercise. Explicit field-heading initialization is missing (C6); Kotlin imports omitted (C3). |
| `autonomous/motion-planning.mdx` | 4 / 4 | Blocking route and state-machine transitions checked. Original Java OpMode missing imports; assembled state machine fails Java 8 compilation; Kotlin local enum/member const are invalid (C3). New motion can be issued after Stop during sleep (C2). |
| `autonomous/pure-pursuit.mdx` | 2 / 2 | Circle/segment quadratic, coordinate rotation, curvature and tank velocity ratio checked. Geometry code compiles in a documented class/import wrapper. Behind-target/progress gap reproduced (C7). Endpoint and full-controller disclaimers are good but do not resolve it. |
| `autonomous/sensor-fusion.mdx` | 2 / 2 | Complementary heading blend, wheel-turn sign for +Y-left/CCW convention, midpoint update and angle wrapping checked. Java class compiles; +/-180-degree test passes. Raw yaw needs explicit field offset (C6). Camera/cluster cautions match SDK12 release behavior, without inspecting vision implementation beyond this page's claims. |

## Findings and precise corrections

### C1 — High: both distance-filter examples can accept unavailable measurements

Locations: `control-systems/lowpass-filter.mdx:95–96` and `107–108`; `control-systems/kalman-filter.mdx:158–160` and `178–180`.

The SDK's documented `DistanceSensor.distanceOutOfRange` is `DistanceUnit.infinity`, which is **Double.MAX_VALUE**, a finite number (`DistanceSensor.java:44–55`; `DistanceUnit.java:45`). Therefore `Double.isFinite(rawCm)` / `rawCm.isFinite()` is insufficient. The common REV2m implementation also exposes a finite failure value: `VL53L0X.java:103–115` converts the return of its range read; `FAKE_DISTANCE_MM = 65535` at line 131 becomes **6553.5cm**. These are source-inspected implementation facts, not guesses about a disconnected robot.

Observed JVM diagnostics from the original helpers: EMA after a Double.MAX_VALUE sample returns approximately `4.494e307`; a NaN sample permanently poisons later EMA output. The scalar filter accepts 6553.5cm after 50cm and returns **3381.06cm**, with the displayed example Q/R.

Correction: gate samples **before** calling either stateful update: finite, not the SDK unavailable sentinel, and inside the validated operating range of that specific sensor/target geometry. Use clearly named measured/configured `MIN_VALID_CM` and `MAX_VALID_CM`, with a comment identifying their sensor-specific meaning. Invalid samples should preserve the previous filter state and display invalid/stale status; do not present the previous estimate as a fresh valid observation. Explain that plausible-range checks also reject implementation-specific finite failures. Do not publish a universal max distance for every `DistanceSensor` implementation.

Relevant primary source: the versioned RobotCore/Hardware source JARs linked above; local extracted files are under `robotcore-source/.../DistanceSensor.java`, `robotcore-source/.../DistanceUnit.java`, and `hardware-source/.../stmicroelectronics/VL53L0X.java`.

### C2 — High: a route can send a new movement command after Stop

Locations: `autonomous/motion-planning.mdx:46–57`, `159–175`, `232–244`, `291–302`, `331–339`; related reusable helper `autonomous/time-vs-encoder.mdx:148–158` / `219–227`.

In ScoreAndParkAuto, Stop during `sleep(300)` can return from sleep and continue into the reverse `driveInches` call. The helper sets target/mode/nonzero power before its first `opModeIsActive()` test. FTC `LinearOpMode.sleep` catches interruption, restores the interrupt flag, and returns (`LinearOpMode.java:94–100`); it does not throw out of `runOpMode`. The official encoder-drive sample guards the helper body before configuring a move. This finding is about issuing commands after Stop; hardware failsafe behavior was not tested and should not be claimed either way.

Correction: start blocking helpers with `if (!opModeIsActive()) return false;`; check active state again after a sleep before beginning another action. Give `beginDriveInches` a boolean success result or only call it from an active-state branch, including the first call after `waitForStart`. Put motor shutdown in `finally` in complete OpModes, so exceptional exits also follow the lesson's own cleanup advice. Preserve normal `opModeIsActive()` loop guards and timeouts. Do not describe `sleep` itself as uninterruptible or replace it with a busy loop.

Primary references: actual RobotCore12 `LinearOpMode` source; [official encoder sample, pinned](https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/e14c2aeb33e84d4ea21697beeea9ac49557be870/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/external/samples/RobotAutoDriveByEncoder_Linear.java#L153-L176).

### C3 — High for the state-machine lesson: advertised placement does not compile

- `autonomous/motion-planning.mdx:363–369` tells the reader to place `enum AutoStep` after `waitForStart`, hence inside `runOpMode`. The assembled original block fails real `javac --release 8` with **“enum types must not be local.”** Move the enum declaration to class scope and leave only `step` and `stateTimer` local. FTC still sets Java source compatibility to 8.
- `autonomous/motion-planning.mdx:420` likewise declares a local Kotlin enum class; Kotlin forbids that even with a modern compiler. Move `enum class AutoStep` into class scope. [Kotlin specification, local classes](https://kotlinlang.org/spec/declarations.html#local-class-declaration).
- `autonomous/motion-planning.mdx:36` says place the Step3 helper inside the class, but Kotlin line82 has `private const val COUNTS_PER_INCH`, which is invalid as an ordinary class member. Put constants in a companion object or use a regular `private val`. [Kotlin compile-time constant rules](https://kotlinlang.org/docs/properties.html#compile-time-constants).
- `autonomous/motion-planning.mdx:126`/`202` full OpMode blocks omit imports. Original Java compilation fails with unresolved SDK symbols; adding only the six relevant SDK imports makes it compile. Include `Autonomous`, `LinearOpMode`, `DcMotor`, `DcMotorSimple`, `Servo`, `ElapsedTime`; Kotlin additionally needs `kotlin.math.abs` and `kotlin.math.roundToInt`.
- `control-systems/motion-profiling.mdx:131` helper needs Kotlin imports `abs`, `sqrt`, `min`, `max`; its follower needs `abs`, `min`, `max`. `autonomous/odometry.mdx:148` needs `kotlin.math.cos`/`sin`. `autonomous/pure-pursuit.mdx:83` Java helper needs `java.util.List` and class-level placement. Label these explicitly as members/fragments if complete source is not supplied.

The other small PID/servo integration fragments can remain fragments; they already lead into a full example or name their missing setup. A short consistent “complete file” versus “inside your loop/class” label is sufficient; no new UI is needed.

### C4 — Medium: the motion-profile follower mixes relative profile position with an absolute encoder total

Locations: `control-systems/motion-profiling.mdx:58`, `198–207`, `240–249`, `283`.

The profile starts at displacement zero. The follower reads the current absolute encoder count divided by counts/inch; merely confirming the mechanism is at the move's physical start does not make the encoder reading zero. For a 500-count baseline and 100counts/inch, the initial error is **-5in** instead of zero. This conflicts with the test instruction that target position begins at the measured position.

Correction: save `int startTicks = slide.getCurrentPosition()` immediately before starting the clock; calculate `(slide.getCurrentPosition() - startTicks) / COUNTS_PER_INCH`. Kotlin equivalent uses `val startTicks`. Alternatively add the measured starting position to every profile position; choose one and explain its origin consistently. Avoid resetting encoders to fabricate a reference unless physical homing/reset is separately intended. Place the start clock after setup and after START in the complete integration context.

The trapezoid generator itself passes the 48in/24in/s/24in/s² example and triangular endpoint checks. [Primary profile comparison, WPILib](https://github.com/wpilibsuite/allwpilib/blob/v2025.3.2/wpimath/src/main/java/edu/wpi/first/math/trajectory/TrapezoidProfile.java#L118-L165).

### C5 — High when following the negative-scale advice: PID can become positive feedback

Locations: `control-systems/pid-control.mdx:119`, `125–127`, `208`, `289`, `318–321`, `399`, `428–431`.

The page tells readers to use negative COUNTS_PER_DEGREE if reported counts fall as physical angle rises. That makes the sensor conversion correct, but the controller's positive output is still applied directly as positive logical motor power. For a normal paired motor/encoder, positive logical power increases logical counts; dividing by a negative scale therefore decreases physical/measured angle and increases a positive target error. A direction change in the SDK reverses **both** output and reported encoder position (`DcMotorImpl.java:192–201`, `292–307`), so “reverse the motor” and “negate the scale” are not interchangeable fixes while holding the rest of the calibration fixed.

Correction option A, simplest for beginners: configure motor direction first so a small positive command raises the defined arm angle; remeasure counts after that direction configuration and use the resulting positive counts/degree. Explain that changing configured direction means redoing signed calibration. Option B: retain signed counts/degree but map controller output from increasing-angle units to motor units using a separately verified sign (normally `Math.signum(COUNTS_PER_DEGREE)` for the paired encoder): `arm.setPower(MOTOR_POWER_SIGN * power)`. Apply the same convention in P fragments and full Java/Kotlin examples. Never change only the measurement sign to hide a feedback direction problem.

The digital derivative, first-loop treatment, gain units and finite dt guard otherwise check out. Derivative-on-measurement intentionally differs from derivative-on-error when the target changes; the text explains that choice correctly.

### C6 — Medium: odometry examples omit a selectable initial field heading

Locations: `autonomous/odometry.mdx:116–122`, `186–193`; `autonomous/sensor-fusion.mdx:54–65`, `169–177`, and Kotlin counterparts.

The examples accept a start X/Y but use raw IMU yaw as field heading. The FTC IMU API explicitly says its yaw reference persists between OpModes until reset/restart; initializing mounting does not make yaw match a chosen field direction (`IMU.java:64–71`). A robot physically pointing along field +Y with raw yaw0 and 12in forward travel is currently reported at X+12,Y0 instead of X0,Y+12. The page caveat “same zero and sign” is correct but does not give a beginner a means to establish that zero.

Correction: accept `startHeadingRadians`, record the initial raw yaw alongside initial encoder readings, then use `fieldHeading = wrap(startHeadingRadians + wrap(rawYaw - initialRawYaw))` in the same right-handed convention as the path. In fused odometry compare the wheel prediction to that aligned field yaw, not the raw yaw. Explain resetting yaw to0 as an alternative only if the chosen field start heading is also handled. Reset the baselines and heading offset together when setting a new pose. [WPILib's primary odometry API explicitly handles initial pose and gyro offset](https://github.com/wpilibsuite/allwpilib/blob/v2025.3.2/wpimath/src/main/java/edu/wpi/first/math/kinematics/DifferentialDriveOdometry.java#L24-L41).

Do not treat the simpler current-heading integration as a new bug: `odometry.mdx:213` honestly limits it to straight segments, and the fusion page adds a midpoint approximation. An advanced extension can teach exact constant-curvature/SE(2) integration later.

### C7 — Medium: Pure Pursuit helper can select a point behind and then command away from it

Locations: `autonomous/pure-pursuit.mdx:83–110`, `124–150`, `174–181`, `202–209`, `218`.

The quadratic is correct, but “last intersection in the whole path” does not establish forward route progress. The motor conversion computes localX and then ignores it while always choosing positive forward speed. Reproduced from original Java helpers: path `(0,0)->(10,0)`, robot `(11,0)`, heading0, radius2 selects `(9,0)` behind the robot; tankPowers returns `+0.25,+0.25` with track width12 and max speed24, driving farther from the endpoint. On self-intersecting/nearby path sections, searching all segments can also jump to a much later part of the route.

Correction: track monotonic segment/arc-length progress, search only a bounded upcoming part of the route, and explicitly handle targets behind the robot and overshot endpoints. For this small educational helper, reject a behind-only candidate and return a recovery/stop result rather than silently feeding it to positive-speed tank control. Add an endpoint fallback when the endpoint is inside the lookahead circle; it must respect progress and finish tolerances. Once a fallback can lie inside the circle, use actual `localX*localX + localY*localY` in the curvature denominator, with a near-zero guard, rather than assuming it is exactly radius². Keep the page's clear differential-drive limitation. State that wheel speed/max speed is an approximate power mapping unless a velocity controller/feedforward is calibrated.

This is an inference confirmed by executing the local code and checking the printed geometry; no physical follower was run. Avoid copying the full geometric/controller solution from a third-party tutorial without checking its coordinate convention.

### C8 — Medium dependency recommendation: released NextFTC Kalman correction omits the predicted output

Location: `control-systems/kalman-filter.mdx:200–204`.

The stated signatures are correct for control0.2.1. However, source inspection of release v0.2.1 finds `Xhat += K * (outputs - D * inputs)` at KalmanFilter.kt:136. A standard correction residual is **measurement minus predicted measurement**, `outputs - (C*Xhat + D*inputs)`. NextFTC's own `LinearModel.output` computes that predicted output. Its released implementation omits C*Xhat; at a nonzero stationary measurement this repeatedly adds positive measurement-scaled corrections instead of reducing the innovation toward zero. This is a concrete source-level mathematical defect, not a compile error.

[Released source at exact commit, lines131–141](https://github.com/NextFTC/NextFTCSuite/blob/83606d2b8ab4c628b1585bd23561e6f91f2475c4/control/src/main/kotlin/dev/nextftc/control/filters/KalmanFilter.kt#L131-L141); [same release's model output](https://github.com/NextFTC/NextFTCSuite/blob/83606d2b8ab4c628b1585bd23561e6f91f2475c4/control/src/main/kotlin/dev/nextftc/control/model/Model.kt#L39-L43); [WPILib innovation implementation](https://github.com/wpilibsuite/allwpilib/blob/v2025.3.2/wpimath/src/main/java/edu/wpi/first/math/estimator/KalmanFilter.java#L217-L219).

Correction to the guide: name the independent control module version, keep the verified scalar learning example, and avoid presenting the linked implementation as a verified next step until the installed version passes a deterministic nonzero-state convergence test. If retaining a source note, identify this precise audited release and condition rather than claiming all future versions are broken. No upstream issue or message was sent. Do not report predict() as incorrect: despite its name, `LinearModel.derivative()` actually returns discretized Ad*x+Bd*u, so predict's use of it is internally consistent. The filter constructor dt and plant dt must also agree.

### C9 — Medium teaching limitation: the one-way profile controller cannot correct overshoot

Locations: `control-systems/motion-profiling.mdx:209–212`, `251–253`.

The clamp deliberately permits only nonnegative power. At final target8in, measured8.5in and target velocity0, output is0; there is no reverse position correction and no guaranteed final hold. The page identifies a one-direction example, so this is a disclosed scope limitation, not a claim that every mechanism should receive negative power.

Correction: explicitly explain that the example can stop applying forward drive but cannot recover overshoot. For a mechanism verified safe in both directions, clamp symmetrically and add mechanical travel bounds; otherwise retain the one-way clamp and treat overshoot as a failed move that requires a safe stop/recovery. Explain that a vertical slide may need measured gravity feedforward and a hold policy. Do not claim a power clamp guarantees the profile's physical acceleration/speed constraints.

### C10 — Lower priority robustness and numerical clarity

- `kalman-filter.mdx:87–90` / `116–119`: validate finite processNoise>=0 and finite measurementNoise>0. Original helper with Q=R=0 gives NaN on second update. Reject invalid measurements at the integration boundary as C1; optional helper-level finite rejection makes reuse clearer.
- `kalman-filter.mdx:55–56` and image alt/number at60: retain full precision until the end: K=5/9 and estimate=**52.22cm**, rather than using rounded0.56 to derive52.24cm. The original code correctly returns52.2222cm. This is a minor rounding inconsistency, not a wrong update equation.
- `motion-profiling.mdx:82–100` / `134–155`: require finite maxVelocity>0 and maxAcceleration>0. Document finite nonnegative distance if the helper intentionally supports only positive displacement; `abs(distance)` currently silently changes a negative request to a positive move. Alternatively keep a direction sign and apply it to sampled position and velocity. The rest-to-rest assumption is already disclosed and should stay.
- `sensor-fusion.mdx:90–93` / `153–157`: reject nonfinite heading inputs before the wrapping loops. Infinity would never terminate the repeated-subtraction loop. Require positive finite track width/counts-per-inch. Current FTC yaw is normally bounded; this is a helper contract improvement, not a demonstrated SDK invalid-yaw event.
- EMA, fixed per-update Q and the complementary heading weight depend on update cadence. The low-pass page already advises testing at the actual loop rate. Extend the same caution to Kalman/fusion: use fresh measurements at a stated cadence, or derive dt-scaled noise/time-constant weights. Do not repeatedly count the same cached sensor observation as an independent measurement.

## Teaching improvements informed by CTRL ALT FTC

Useful concepts worth incorporating in the current pages:

1. Add one measured arm/slide feedforward example after PID, with **angle from horizontal, radians inside trig, and real measured angle/reference choice stated**. Gravity feedforward reduces dependence on an integral for persistent gravity load. Keep all gains measured, not imported from the article. [Author feedforward chapter](https://github.com/BenCaunt/CTRL-ALT-FTC/blob/0bc0c90c96461b4e92ededc08ff1c26809126f6d/feedforward-control.md).
2. Add saturation-aware anti-windup as an optional advanced PID subsection: bound the **I contribution** relative to available power and consider conditional integration while saturated. Explain why a finite integral cap reduces windup but cannot eliminate it in every blocked-mechanism/target-change case. The present derivative-on-measurement implementation is already a good improvement over error-difference pseudocode. [Author practical improvements](https://github.com/BenCaunt/CTRL-ALT-FTC/blob/0bc0c90c96461b4e92ededc08ff1c26809126f6d/the-pid-controller/practical-improvements-to-pid.md).
3. Add one heading-error exercise: target179deg, measured-179deg; compute the wrapped2deg correction with declared sign. Existing filter angle cautions are correct and provide the right lead-in.
4. Give beginners exact file/import/class/loop placement and a short worked trace before introducing a reusable helper. Use telemetry to connect error, P/I/D contribution and saturation to actual behavior. These changes bridge programming syntax to control reasoning without making beginners learn matrix state estimation first.
5. For advanced readers, add explicit model state/measurement units, process/measurement variance vs standard deviation, timestamp/freshness, frame transforms and a nonzero-state convergence check. Add pure-pursuit progress/recovery only after the simple circle geometry is understood.

Cautions when using CTRL ALT FTC as a source: it labels examples pseudocode, and its prose is not a correctness oracle. The author Kalman article uses inconsistent prior/predicted-state notation in its displayed correction, while its pseudocode performs the sensible `x += K*(z-x)` update. Its motion-profile prose omits the square on time in one displayed-in-text kinematic expression even though the pseudocode uses time². The local guide's explicit predicted-state formula and actual Java sampling are improvements; preserve them. Its low-pass alpha weights the previous estimate, whereas this guide's alpha weights the new measurement; both conventions work but the meanings are opposite. Do not merge their tuning advice without translating that convention. [Pinned Kalman chapter](https://github.com/BenCaunt/CTRL-ALT-FTC/blob/0bc0c90c96461b4e92ededc08ff1c26809126f6d/advanced/the-kalman-filter.md), [pinned motion chapter](https://github.com/BenCaunt/CTRL-ALT-FTC/blob/0bc0c90c96461b4e92ededc08ff1c26809126f6d/advanced/motion-profiling.md).

LearnJavaForFTC source review belongs to the other audit slice/parent integration. This report makes no source-inspected claim about that resource.

## Validation performed and reusable paths

Environment: OpenJDK javac17.0.18, compiling with `--release 8`; Android SDK30 `android.jar`; actual Maven [RobotCore12.0.0 AAR](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/RobotCore/12.0.0/RobotCore-12.0.0.aar) extracted to `RobotCore-12.0.0.jar`. No mocked FTC types were substituted for the standalone Java compilation.

- Eight complete public Java class blocks extracted and compiled unchanged. Seven passed: TankDrive, ScalarKalmanFilter, GuidedPidArm, DifferentialOdometry, FusedOdometry, TimedDriveTest, EncoderDriveTest. ScoreAndParkAuto failed because its imports are omitted.
- A separate copy of ScoreAndParkAuto with **imports only** added compiled. Assembling the exact advertised state-machine replacement into that class reproduced the Java8 local-enum error.
- Original pure Java helper bodies were compiled inside small necessary class/import wrappers. JVM diagnostics checked trapezoid/triangle endpoints, scalar Kalman update, heading wrap, straight odometry and the concrete failure cases described above. They did not model the real motor plant.
- Kotlin snippets were read against Kotlin/Java interop rules and SDK source; **no Kotlin compiler was installed/run**. The Kotlin local-enum and const-placement failures follow the linked language rules. Missing math imports are inspection findings.
- No Android Gradle APK build, deployment, SDK-library runtime test, FTC OpMode hardware execution, IMU calibration, motor direction test, gain tuning, field repeatability test or physical safety validation was performed. Do not call this audit “robot tested.” The NextFTC upstream defect is source/math inspection, not an executed NextFTC test.

Artifacts:

- Original exact Java extraction and block/line manifest: `/tmp/crocodocs-audit-controls/java-original/manifest.json`.
- Original compiler diagnostics: `/tmp/crocodocs-audit-controls/java-original/compile-results.json`.
- Latest verified snapshot/hashes: `/tmp/crocodocs-audit-controls/java-verified/page-snapshot.json` and `compile-results.json`.
- Import-added planning source: `/tmp/crocodocs-audit-controls/java-original/planning-imports/ScoreAndParkAuto.java`.
- Assembled state-machine failure: `/tmp/crocodocs-audit-controls/java-original/planning-state-original/ScoreAndParkAuto.java`.
- Diagnostic source and output: `/tmp/crocodocs-audit-controls/java-original/math/AuditDiagnostics.java` and `results.txt`.
- Repeat original numerical diagnostics: `sh /tmp/crocodocs-audit-controls/run-original-diagnostics.sh`.
- Re-extract/recompile changed complete Java examples without modifying the repository: `python3 /tmp/crocodocs-audit-controls/validate-java.py --output /tmp/crocodocs-audit-controls/java-corrected`.

For corrections, rerun affected standalone compilation and update the relevant diagnostic inputs/expected outputs; do not treat the archived-original diagnostic's intentional bug confirmations as a passing acceptance suite for corrected code. Physical direction, origin, limit, timestep and stop tests remain necessary on the team's robot before these examples are relied on.
