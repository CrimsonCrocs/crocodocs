# CrocoDocs source refresh: implementation packet

Reviewed 14 October 2026. Read-only research; no project files changed by this agent. The parent is editing some target pages concurrently, so heading names are more stable than line numbers below. This report concerns the five offered sources and bounded, relevant primary-source checks, not a new audit of the whole site.

## Recommended scope

Use three teaching additions, primarily as sections in existing articles:

1. **How gear tooth geometry becomes a bearing load:** extend Gears with involutes, the line of action, pressure angle, and a worked separating-force calculation; extend CAD with a short assembly-validation exercise.
2. **How to decide whether a sensor reading is usable:** extend Sensor integration with uncertainty, spatial mounting error, bandwidth, update timing, and a measured acceptance test; connect this to Low-pass filter and Kalman filter.
3. **How to measure a feedforward model:** extend Feedforward, or add one focused System identification lesson, with logged voltage/velocity/acceleration, a model fit, validation on a separate run, and explicit FTC motor-mode assumptions.

These fill gaps identified before the parent's new edits. Avoid adding duplicate beginner definitions of gear ratio, encoder calibration, PID, or sensor failure handling. An optional short advanced dual-slide fault exercise belongs in the existing Linear slides or control lesson, rather than a fourth new page.

## Sources, versions, and provenance

| Offered source | Author/version inspected | Provenance and reuse scope |
| --- | --- | --- |
| [Mechatronics PDF, pinned revision](https://raw.githubusercontent.com/Thaddeus-Maximus/mechatronics_book/fd58a2ed0ee1f36aec1bb48999ee2b14c92aaabb/mechatronics.pdf) | Thaddeus Hughes; contributions Caleb Hagner; **Rev B, March 2021**, 119 pages. Repository master `fd58a2ed0ee1f36aec1bb48999ee2b14c92aaabb`, committed 28 March 2021. | [Title source](https://github.com/Thaddeus-Maximus/mechatronics_book/blob/fd58a2ed0ee1f36aec1bb48999ee2b14c92aaabb/mechatronics.tex), public fork of Team 501 The PowerKnights' book. No LICENSE file in the inspected root, and no license/copyright grant located in the PDF or inspected headers. Treat as a reading/reference source; do not copy its figures, text, or CAD assets into CrocoDocs. Public availability is not an open license. |
| [Gears](https://ciechanow.ski/gears/) | **Bartosz Ciechanowski, 12 February 2020**. Live page reviewed 14 October 2026. | Author's own interactive article. Footer identifies copyright; no open-content license was located on the reviewed page. Explain the physical facts independently and draw original diagrams. Do not rehost the animations or illustration code. |
| [Onshape for FIRST teams](https://www.onshape.com/en/education/first-robotics) | Corporate Onshape/PTC resource. User's `/education/robotics` URL redirects here. Live 14 October 2026. Also read the [onboarding article](https://www.onshape.com/en/blog/how-to-onboard-your-first-robotics-team), Ronan Melville and Drew Bennett, updated **16 September 2025**. | Official product/training guidance. Free education access is an access offering, not a license to redistribute training content or every community CAD document. Individual part documents have their own provenance. The page labels CAM Studio access for **FRC**; it does not establish that entitlement for FTC. |
| [The Cookbook](https://cookbook.dairy.foundation/) | Community handbook originating in FTC team 4017 knowledge sharing. Source repository `dr-hextanium/cookbook`, HEAD `fa4b2b12e1b2970d6bdc04606cdf6653d981c4cb`, 13 April 2026. | [MIT license](https://github.com/dr-hextanium/cookbook/blob/fa4b2b12e1b2970d6bdc04606cdf6653d981c4cb/LICENSE), copyright 2024 Cookbook Contributors. Preserve its notice for substantial copied code/text. MIT does not establish correctness; several recipe defects are detailed below. |
| [Controls Engineering in FRC](https://file.tavsys.net/control/controls-engineering-in-frc.pdf) | **Tyler Veness**, PDF generated **4 October 2026**, source commit `dd88824706e6d32b92cb941068b0feb2e6a7992e`, 362 PDF pages. The cover's short pin is `dd88824`. | [README and licensing](https://github.com/calcmogul/controls-engineering-in-frc/blob/dd88824706e6d32b92cb941068b0feb2e6a7992e/README.md): text **CC BY-SA 4.0**, software **BSD 3-Clause**. Preserve attribution/notices and applicable ShareAlike obligations when adapting protected text/figures. Prefer original exposition and diagrams with source citations here. Its Python/frccontrol/WPILib ecosystem is FRC, not an FTC SDK API. |

## Coverage and decisive passages

### Mechatronics

Read §4.2.2, printed/PDF pp42–46, including tooth geometry, types, force components, idlers and differentials; §7.2, pp70–73, switch/encoder/proximity/inertial/vision sensing; §§9.1–9.4, pp99–102, metrics and design for testing; §10.6, p107, mounting alignment error. Page numbers in this PDF equal PDF page numbers.

- **p44, Fig4.8:** verified visually that the tangential tooth force is torque divided by pitch radius and radial force is the tangential force times the tangent of pressure angle. This supports the new Gears force section. [Pinned component source, lines273–274](https://github.com/Thaddeus-Maximus/mechatronics_book/blob/fd58a2ed0ee1f36aec1bb48999ee2b14c92aaabb/mechatronics_components.tex#L273).
- **p107, §10.6 and Fig10.6:** an angular mounting error becomes a linear error with a lever arm. The book prints `h sin(theta) ≈ h theta`; use the small-angle relation with an explicitly drawn geometry and radians. Do not present the exact sine equation as universal for every misalignment geometry. [Pinned source](https://github.com/Thaddeus-Maximus/mechatronics_book/blob/fd58a2ed0ee1f36aec1bb48999ee2b14c92aaabb/mechatronics_design.tex#L381).
- **pp100–101:** requirements should be measurable subsystem behaviors and support isolated tests. Use that to turn the existing sensor-bracket exercise into a documented acceptance test, while retaining integration tests.

Do not copy these errors into new lessons:

| Location | Problem | Precise treatment |
| --- | --- | --- |
| p43, components source line217 | Broad claim that higher pressure angles are weaker; vague explanation of pressure angle as tooth steepness. | Define pressure angle through the line of action and common tangent. At fixed transmitted tangential force, higher pressure angle raises the separating force. Do not infer tooth strength from this alone. |
| p71, electrical source line96 | DPST explanation swaps pole and throw labels. | DPST has two isolated poles, each making/breaking one circuit; SPDT has one pole selecting between two throws. |
| p73, electrical source line260 | Says a gyro measures rotational acceleration, then integrates to angular velocity. | A gyro measures angular velocity; integrating can estimate angular displacement, subject to bias/drift. The IMU expansion is also wrong: use **inertial measurement unit**. |
| p46, differential derivation | Writes a rotational torque balance with mass times angular acceleration. | Rotational inertia, not mass, belongs in `sum(torque)=I*angular_acceleration`; unnecessary for the proposed additions. |

The source is useful selectively. It is not a source of FTC electrical limits: its RoboRIO pull-up and FRC hardware details should stay out of FTC device instructions.

### Ciechanowski, Gears

Read the full article, including the Spinning, Disc, Transmission, Torque, Gears, Tangent & Normal, Strings Attached, and Multiple Gears sections. Its decisive contribution is the **involute's geometric reason for constant transmission ratio**, not another gear-ratio formula. The force acts along the normal at contact; the involute construction keeps the relevant line of action fixed. Separate the pitch circle (speed geometry) from the base circle (involute construction) and the outer tooth diameter. The article's common 20° example is not a universal gear specification. [Author's article](https://ciechanow.ski/gears/).

### Onshape

Read the full current FIRST resources page and relevant full onboarding sections on classroom ownership, user roles, folders, COTS libraries, comments, branching, and training. Also read the [official Gear Relation help](https://cad.onshape.com/help/Content/Assembly/gear_relation.htm), last updated 9 October 2026. Its gear relation constrains two rotational mates by a specified ratio; the example uses **driving teeth / driven teeth**, so 20/40 is entered as 0.5. This can differ from a lesson's verbal “2:1 reduction” convention.

The CAD for Robotics course advertises six units, but its [learning-path content](https://learn.onshape.com/learning-paths/cad-for-robotics) was not readable through the public text interface. I did not claim to complete or inspect those units. Likewise, the current resources page's “2026 FTC Field Model” label alone does not prove it is the current BIOBUZZ field. Check the actual document/season before linking it as current.

### Cookbook

Read actual chapter prose and all included code for:

- [Custom PIDF integration](https://cookbook.dairy.foundation/pidf_controllers/integrating_a_custom_PIDF_controller.html), live article last modified 15 September 2025 by Lucas Bubner; [pinned Markdown](https://github.com/dr-hextanium/cookbook/blob/fa4b2b12e1b2970d6bdc04606cdf6653d981c4cb/src/pidf_controllers/integrating_a_custom_PIDF_controller.md).
- [Dual-slide synchronization](https://cookbook.dairy.foundation/pidf_controllers/syncing_two_linear_slide_motors_using_a_pidf_controller/syncing_two_linear_slide_motors_using_a_pidf_controller.html), including its [included Java file](https://github.com/dr-hextanium/cookbook/blob/fa4b2b12e1b2970d6bdc04606cdf6653d981c4cb/src/pidf_controllers/syncing_two_linear_slide_motors_using_a_pidf_controller/PIDFExample.java).
- [Improving loop times](https://cookbook.dairy.foundation/improving_loop_times/improving_loop_times.html), updated 14 October 2024; [pinned Markdown/code](https://github.com/dr-hextanium/cookbook/blob/fa4b2b12e1b2970d6bdc04606cdf6653d981c4cb/src/improving_loop_times/improving_loop_times.md).

This is a scoped chapter review, not a claim that the entire Cookbook is verified. Its old Road Runner 0.5.6 recipes were not used as current Road Runner guidance.

### Veness

Read the relevant full subsections: §1.4 p10; §2.2 pp14–16; §2.3 pp16–18; §§2.6–2.7 pp20–21; §3.2 actuator saturation p24 onward; §6.10.6 p70; §§7.1.3–7.2 pp84–86; §§14.1–14.2.1 pp227–231. For estimation, inspected the derivation and theorem around §§9.6.1–9.6.2 pp158–163, the steady-state numerical snippet p168, and complete §§9.6.6–9.6.11 pp169–170. This is not a whole-book or whole-estimation-chapter verification. Arabic printed page `n` is PDF page `n+19` in this artifact.

Key source anchors:

- [Ordinary least squares](https://github.com/calcmogul/controls-engineering-in-frc/blob/dd88824706e6d32b92cb941068b0feb2e6a7992e/system-modeling/system-identification/ordinary-least-squares.tex), pp227–228: stack observations into a design matrix and fit coefficients. Prefer a numerical least-squares solver (QR/SVD), rather than implementing the printed normal-equation inverse literally.
- [1-DOF identification](https://github.com/calcmogul/controls-engineering-in-frc/blob/dd88824706e6d32b92cb941068b0feb2e6a7992e/system-modeling/system-identification/1-dof-mechanism-state-space-model.tex), p229 Eq14.2: voltage depends on motion direction, velocity, and acceleration. This is the basis for the proposed measured model.
- [Kalman source](https://github.com/calcmogul/controls-engineering-in-frc/blob/dd88824706e6d32b92cb941068b0feb2e6a7992e/estimation-and-localization/stochastic-control-theory/kalman-filter.tex), p169: estimate measurement covariance from logs, model process uncertainty separately, and update from the measurements available at that time; p170: inspect residual behavior when the model/noise assumptions fail.

**Math corrections when using this edition:** the rendered p163 theorem and source line293 print `P^-_(k+1) = A P^-_k A^T + Q_k`, while minus/plus explicitly denote prior/posterior. Prediction must propagate the previous corrected covariance, **`P^-_(k+1) = A P^+_k A^T + Q_k`**. Eq9.23 includes the proper predicted-measurement subtraction, and Eq9.24's Joseph covariance correction is sound. p169's broad finite-time convergence guarantee needs assumptions and generally asymptotic wording; do not repeat it as universal. The p168 Python snippet docstring reverses the Kalman gain dimensions (actual gain is states×outputs) and labels R as inputs×inputs (should be outputs×outputs). These defects do not invalidate the scalar teaching example already in CrocoDocs.

## Implementation-ready additions

### 1. Gears and CAD

Target existing Gears heading `Pitch geometry` and `Gear forces`; before this round the force discussion was qualitative at approximately lines43–45. The parent has already begun adding the verified force material.

Use original prose explaining that involute teeth are shaped so their contact normals maintain the required relationship while engagement moves across the teeth. Define pressure angle as the angle between the line of action and the tangent to the pitch circles. This explains why two gears with the right tooth counts can still be incompatible. Matching module/DP and nominal pressure angle are necessary starting checks; tooth form, center distance, tooth modification, clearance, and manufacturing tolerances still matter. Involute gearing tolerates some center-distance variation while preserving the ratio, but this changes operating pressure angle and backlash; it is not permission to ignore shaft spacing.

For an ideal external spur mesh:

`Ft = T/r_pitch`, `Fr = Ft*tan(alpha)`, and, optionally, `Fn = Ft/cos(alpha)`.

Original worked example continuing the existing module0.8/20-tooth pinion: pitch diameter16mm, radius0.008m, torque0.40N·m gives `Ft=50N`. At20°, `Fr=18.20N`; at25°, the same Ft produces `Fr=23.32N`. This is a separating load on shaft supports; it is not a tooth rating or bearing-life calculation. The parent's alternative 0.9N·m/30mm example correctly gives Ft30N and Fr10.9N at20°.

Draw an original small diagram: two pitch circles, line of centers, common tangent, line of action at alpha, and Ft/Fr components. Do not trace either offered source's figure. The minimum beginner exercise is to identify which support resists Fr; the advanced exercise is to test whether plate flex changes backlash under the intended load.

Target CAD `Assemble and check motion` / existing first bracket exercise, around lines29–54 in the initial snapshot:

1. Import vendor parts in verified units and record the part revision.
2. Assemble two gears at their calculated pitch center distance with rotational mates.
3. Apply the gear relation using Onshape's documented ratio convention; observe output motion and direction.
4. Independently inspect tooth engagement, interference, shaft retention, driver access, and loaded clearance. A kinematic relation will rotate even inappropriate geometry; it is not a tooth-contact, strength, or collision proof.
5. Create a named version for manufacture, leave a geometry-linked review comment, and compare a design branch before merging the chosen change.

Use individually owned user accounts and team/classroom ownership with suitable roles. The onboarding article suggests a shared CAD email as one option, but CrocoDocs does not need to recommend shared passwords. The practical addition is continuity of team design ownership and reviewable versions, rather than account administration instructions.

### 2. Measurement quality and timing

Target Sensor integration after `Calibration` (initial lines31–35), then cross-link Low-pass filter and Kalman filter. Keep the existing device-specific electrical and failure checks.

Use a short comparison table:

| Quantity | Team test | What it does not establish |
| --- | --- | --- |
| Agreement with a reference / bias | Compare several known distances/angles against an independent reference. | A smooth reading may still be offset. |
| Repeatability / spread | Hold the physical setup still and log repeated fresh samples; report a standard deviation. | Small spread does not prove agreement with the reference. |
| Resolution | Identify the smallest physical change that produces a discernible indication change under the test conditions. | Display increments or extra decimal places do not establish physical resolution or accuracy. |
| Bandwidth / response | Move the target with a known change and measure response amplitude/time. | A high host-loop rate does not prove the sensor tracks fast motion. |
| Update interval and age | Log timestamps/sequence changes and delivery delay, where exposed. | Re-reading a cache is not an independent new observation. |

For terminology, [NIST TN1297 AppendixD1](https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-appendix-d1-terminology) distinguishes accuracy from precision and recommends reporting explicit uncertainty/spread measures. Do not label a standard deviation “accuracy.” Exact supporting entries in the primary JCGM VIM3 vocabulary are [2.18 measurement bias](https://jcgm.bipm.org/vim/en/2.18.html), [2.15 measurement precision](https://jcgm.bipm.org/vim/en/2.15.html), and [4.14 resolution](https://jcgm.bipm.org/vim/en/4.14.html). These were inspected as short terminology checks because the five offered sources do not themselves provide a complete definition set. Resolution can depend on noise and operating point; distinguish physical resolution from an output register's quantization or a display's decimal increment.

Original tiny example: a known100cm reference produces100.2,100.4,100.6cm. The sample mean is100.4cm; estimated offset is+0.4cm; sample standard deviation is0.2cm and sample variance0.04cm². Three readings only illustrate the arithmetic, not a sufficient calibration study. Include reference uncertainty and varied surfaces, distances, angles, lighting, and load in a real test.

For mounting, an illustrative60mm lever arm and0.5° angular error produces approximately `h*theta = 60*(0.5*pi/180) = 0.524mm` displacement. Draw the rotation and datum so the sign and geometry are clear. Calibrating software against a bracket that later flexes does not preserve that calibration.

For timing, a100ms-old position at1m/s can already differ from current position by0.10m under constant velocity. This is a deterministic age example, not a sensor noise variance. Sensor conversion delay, transport delay, scheduling jitter, and a filter's lag all contribute to the usable measurement age.

Advanced filter addition: CrocoDocs' alpha weights the **new** reading. For a first-order time-constant model, use `alpha = 1 - exp(-dt/tau)`; tau50ms and dt10ms gives alpha0.1813. Its corresponding continuous first-order cutoff is about3.18Hz. This matched-pole construction preserves decay versus elapsed time; do not call it an exact arbitrary-signal discretization or a sensor's hardware bandwidth. Faster host loops must not repeatedly filter the same sample as new evidence.

Veness pp84–86 supports discussing aliasing and delay. Sample rate must exceed twice the highest signal frequency only for the ideal band-limited reconstruction setting; control design usually needs margin, actual delay information, and anti-aliasing before sampling. A digital smoother after sampling cannot undo aliasing already introduced. Avoid a universal “FTC must run at XHz” recommendation.

Existing Kalman filter already states variance units and the per-update Q assumption near its end; retain these. Add a concrete noise-measurement exercise, an innovation/residual plot, and the corrected posterior-then-predict sequence rather than another scalar implementation. For variable elapsed time, use a time-based process model; fresh asynchronous vision observations need their own observation time/model. Do not turn smoothed repeated data into independent measurements or assume uncorrelated sensors merely because they have different names.

### 3. Feedforward/system identification

Target Feedforward after existing `Measurement and tuning` and the short kV/kA note (initial lines57–63). Make the output units explicit before extending the existing normalized-power example.

For a horizontal or otherwise gravity-compensated 1-DOF mechanism away from the static transition:

`V_ff = kS*sign(v_ref) + kV*v_ref + kA*a_ref`.

Use volts for kS, V·s/m for kV, V·s²/m for kA when travel is in meters. An angular model uses radians consistently and angular coefficient units. An arm may add a gravity term with its documented angle reference; a vertical lift adds an approximately constant gravity term for a fixed load. Keep friction/direction and gravity as distinct physical effects. At zero desired velocity, sign selection requires an explicit intended-motion/static-friction policy; `sign(0)=0` alone does not model breakaway friction.

Suggested bounded lab:

1. Choose one mechanism and a repeatable, limited travel test; agree on reference, direction, load, limits, stop behavior, and supported test setup.
2. Log monotonic time, commanded duty, measured battery rail voltage, encoder position/velocity, run mode, load and test direction. In open-loop power mode, `applied_voltage ≈ duty*battery_voltage` is an approximation: motor-terminal voltage, bridge losses, clipping, current limits and rail measurement delay still differ.
3. Collect forward/reverse slow voltage ramps and separate acceleration runs, within the mechanism's envelope. Do not fit only steady speed data and expect kA to be identifiable. Do not treat commanded acceleration as measured acceleration during identification.
4. Put timestamps and units on every series. Derivative estimates amplify velocity noise; document filtering and preserve sample alignment. Fit using a numerical least-squares solver and inspect rank/conditioning. The simple voltage regression below is an original teaching construction; Veness also presents an acceleration-as-dependent-variable form before rearranging the model. These are not statistically identical fits with noisy data. Separate test regimes or model terms when gravity/load/friction change.
5. Validate on a different run and, where appropriate, a different battery level. Plot measured/predicted voltage or motion and residuals; report errors and saturation. Reusing training data only measures training fit.
6. Use the model with desired profile velocity/acceleration, add feedback in compatible voltage units, convert to a duty command once, clamp, apply limits, and log both requested and delivered commands. Recheck performance under expected load and voltage.

Original synthetic teaching fixture, explicitly **not measured gains**:

| v (m/s) | a (m/s²) | V (V) |
| --- | --- | --- |
| 1 | 0 | 2.4 |
| 2 | 0 | 4.4 |
| -1 | 0 | -2.4 |
| -2 | 0 | -4.4 |
| 1 | 2 | 3.0 |
| -1 | -2 | -3.0 |

Rows of X are `[sign(v), v, a]`. The full-rank least-squares fit gives kS0.4V, kV2.0V·s/m, kA0.3V·s²/m. A separate synthetic point at1.5m/s and1m/s² predicts3.7V. With no added feedback, that is approximately0.308 duty at12V or0.352 at10.5V. Label this as an arithmetic demonstration; a real motor fit will have residuals and limits.

**FTC API boundary:** FTC SDK12 `DcMotor.setPower()` is dimensionless and depends on motor mode. Inspected `LynxDcMotorController.internalSetMotorPower`: `RUN_WITHOUT_ENCODER` sends a constant-power command, while `RUN_USING_ENCODER` and `RUN_TO_POSITION` interpret power through target-velocity behavior. Therefore a simple requested-volts/battery-volts mapping belongs to the explicitly documented open-loop/custom-controller path, not an arbitrary motor mode. Do not paste FRC `setVoltage`, WPILib SysId, or frccontrol APIs into a purported FTC SDK example. Do not sum volts with the current lesson's normalized kG/feedback values.

When the requested command saturates, the actuator cannot deliver the model's effort; use a feasible profile or reduced load/acceleration rather than promising that more gain resolves the error. Existing bounded I storage is useful, but genuine anti-windup should account for the command that is actually delivered, including clamps and mechanism limits.

## Cookbook code caveats and corrected contracts

The useful idea in the custom PIDF chapter is explicit ownership of motor output when switching manual/automatic modes. Its shown code is not a safe runnable template:

1. **Both trigger branches command positive power.** For intended up/down control, define opposing signs deliberately and verify motor direction.
2. **No output branch runs after manual release if usePIDF is false.** The previous power remains commanded. Every loop/state must choose an explicit command or safe hold policy; releasing input must not leave the previous manual value latched.
3. **`lastGamepad1 = gamepad1` aliases the SDK's mutable Gamepad.** Later checks compare the object with itself. Snapshot booleans, use a separate Gamepad's `copy()`, or use supported SDK edge helpers at a pinned version. FTC12 RobotCore Gamepad exposes mutable volatile fields and `copy()`; source was inspected.
4. The controller imports/API are user-supplied examples; they are not a complete implementation. Reset/update controller history intentionally when handing control back, and specify homing, motor mode, direction, travel limits and stop cleanup.

A corrected teaching state table can say: manual input selects MANUAL with opposing command signs; a preset edge selects POSITION; manual release follows the lesson's declared supported STOP/HOLD policy; any invalid measurement or limit selects the declared fault state. Compute one bounded command, apply one motor write, and make stop cleanup explicit. HOLD requires a valid referenced sensor and controller; zero power alone does not physically support a vertical load.

The dual-slide chapter's code reads only the left encoder and sends the same power to both motors. Equal electrical commands do **not** establish equal movement with different loads, friction, motor characteristics, string radii, or a disconnected mechanism. The source also calls `PIDFController.update(...)` on the class despite declaring an `examplePIDF` instance; the custom class is not supplied, so this API cannot be validated as a runnable example. Keep mechanical coupling and alignment as the first design discussion. If both encoders are available, log normalized left/right travel and skew, establish a bounded skew fault response, and test under load. A cross-coupled correction is an advanced design requiring known signs, scaling, saturation, and stops; it is not a generic pair of gains to paste.

The loop-time recipe's bulk-cache pattern agrees with FTC12 `LynxModule`: manual caching needs clearing at the start of each hardware loop for each hub. It is not a freshness guarantee for arbitrary I2C devices or asynchronous cameras, nor an atomic snapshot across multiple hubs. SDK12 also already avoids many identical motor-power writes. An extra threshold caching wrapper introduces its own deadband; add it only for a measured need and document the external library/version. The recipe's broad implication that faster loops always improve control should be replaced by measured latency/jitter and fresh-data requirements, consistent with Veness §7.2.

Primary FTC source evidence: official [RobotCore12.0.0 source JAR](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/RobotCore/12.0.0/RobotCore-12.0.0-sources.jar) (`Gamepad.java` lines159,379); [Hardware12.0.0 source JAR](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/Hardware/12.0.0/Hardware-12.0.0-sources.jar) (`LynxDcMotorController.java` internalSetMotorPower; `LynxModule.java` BulkCachingMode). These were reused read-only from the earlier audit extraction, not downloaded again.

## Evidence and verification limits

- Downloaded the two offered PDFs, inspected the specified text sections, and visually rendered/inspected Hughes p44 and p107 plus Veness printed p229/PDF248 and p163/PDF182. Rendered pages remain temporary research evidence, not product assets.
- Saved exact revision metadata, relevant pinned TeX/Markdown/Java source files and license files in this directory. `artifact-manifest.json` records SHA256 and byte counts. The controls PDF generation pin was resolved to its full Git commit through the author's repository API.
- Ran original `validate_teaching.py` with NumPy; all assertions passed. Results are in `math-validation.json`: gear load decomposition, small-angle mounting error, sample statistics, time-constant filter coefficient, full-rank synthetic least-squares fit, duty conversion, and scalar/Joseph covariance agreement.
- No new Java/Kotlin examples were authored or compiled in this round. Cookbook fragments depend on unspecified custom controller code; source inspection and SDK verification cannot establish a full compile. This report does not claim robot runtime, motor terminal-voltage measurement, hardware safety, real system-identification quality, CAD motion testing, or completion of the inaccessible Onshape learning path.
- No source assets or book text were added to the project. Storage was bounded: approximately46MB total PDF downloads, small source/text files and four low-resolution single-page renders; no repository clones or full image extraction. Disk had approximately1.4GiB free at the final check, so avoid heavy build caches or another full extraction during integration.

Reusable check: `python3 /tmp/crocodocs-resource-refresh/validate_teaching.py`. For visual evidence use `mechatronics-p044.png`, `mechatronics-p107.png`, `veness-p229.png`, and `veness-p163.png`. Public articles put these links in Sources footers, with the edition/commit where the citation is version-dependent.
