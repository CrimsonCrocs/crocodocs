> Research-stage evidence, 2026-10-14. Findings describe the pre-correction snapshot. See `../programming-audit.md` for implemented corrections, final checks, and limits. Temporary artifact paths are session-local and are not required by the app.

# CrocoDocs library and beginner programming audit

Audit date: 2026-10-14. Scope: every line of the 20 MDX pages in `content/docs/libraries/`, `content/docs/getting-started/`, and `content/docs/cegp/`, plus bounded primary-source research of the libraries they teach and Alan G. Smith's Learn Java for FTC. No project files were edited. Source clones, downloaded artifacts, experiments, and this report are confined to `/tmp/crocodocs-audit-libraries/`.

## Findings that need correction

1. **Android Studio deploys the TeamCode application module.** The page says to run FtcRobotController, which is a library module in the standard SDK.
2. **The FTCLib example writes motor power before START.** Scheduling immediately initializes the first InstantCommand, even though the scheduler's normal loop runs after START. Its Kotlin InstantCommand syntax also needs parentheses because a Java vararg parameter follows the Runnable.
3. **Mercurial's example is a v1 example, not the current v2 beta model.** Label the version explicitly, and put command construction inside init so the snippets form a valid program.
4. **NextFTC's Java `Set.of` example is unsuitable for the standard FTC Java 8/minSdk24 project.** Use `Collections.singleton`; clarify `whileTrue` edge behavior. The other NextFTC example APIs were verified against the published v0.2.1 artifact, not merely the newer development branch.
5. **Pedro's loop needs explicit drive cleanup when it exits.** In 3.0.1, `stop()` changes mode and a subsequent `update()` sends zero to the drivetrain; `isBusy()` becoming false does not by itself assert zero drive output.
6. **Panels' ordinary SDK telemetry is not automatically Panels telemetry.** Add PanelsTelemetry/TelemetryManager wiring if the example is supposed to display in the browser, and bound the tunable motor limit with a hard software cap.

## Evidence and version pins

All URLs below are primary author sources. The local clones are inspection copies, not additions to the project. A development branch HEAD is not a claim that that code has been published. Maven artifacts were separately checked where noted.

| Project | Inspected commit | Version evidence / important source |
| --- | --- | --- |
| FTC SDK | `e14c2aeb33e84d4ea21697beeea9ac49557be870` (2026-09-12) | [SDK README and release notes](https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/e14c2aeb33e84d4ea21697beeea9ac49557be870/README.md), SDK 12.0.0; actual RobotCore 12.0.0 AAR and source JAR downloaded from Maven Central. |
| FTCLib | `1c8995d09413b406e0f4aff238ea4edc2bb860c4` | [CommandOpMode](https://github.com/FTCLib/FTCLib/blob/1c8995d09413b406e0f4aff238ea4edc2bb860c4/core/src/main/java/com/arcrobotics/ftclib/command/CommandOpMode.java), [CommandScheduler](https://github.com/FTCLib/FTCLib/blob/1c8995d09413b406e0f4aff238ea4edc2bb860c4/core/src/main/java/com/arcrobotics/ftclib/command/CommandScheduler.java), published `org.ftclib.ftclib:core:2.1.1` downloaded and used in checks. |
| FTC Dashboard | `a876f094dac392a949711b8219ca2ec8d4cc20c7` | [Installation](https://github.com/acmerobotics/ftc-dashboard/blob/a876f094dac392a949711b8219ca2ec8d4cc20c7/README.md), `com.acmerobotics.dashboard:dashboard:0.6.0` from `https://maven.brott.dev/`; actual dashboard AAR and core JAR downloaded. |
| Pedro Pathing | `9c95f86d1d141bedde002c81bac021c6b1ff5351` | [Follower](https://github.com/Pedro-Pathing/PedroPathing/blob/9c95f86d1d141bedde002c81bac021c6b1ff5351/core/src/main/java/com/pedropathing/follower/Follower.java), [Paths](https://github.com/Pedro-Pathing/PedroPathing/blob/9c95f86d1d141bedde002c81bac021c6b1ff5351/core/src/main/java/com/pedropathing/api/Paths.java), [PoseFactory](https://github.com/Pedro-Pathing/PedroPathing/blob/9c95f86d1d141bedde002c81bac021c6b1ff5351/core/src/main/java/com/pedropathing/api/PoseFactory.java); core 3.0.1 JAR downloaded. |
| Pedro Quickstart | `41158ec1ec7314a7cef1d6c9b9f21b380a6cb8e9` | [Dependencies](https://github.com/Pedro-Pathing/Quickstart/blob/41158ec1ec7314a7cef1d6c9b9f21b380a6cb8e9/build.dependencies.gradle): `com.pedropathing:revhub:3.0.1`, `com.pedropathing:tuning:1.0.1`, FTC SDK 12.0.0. [Constants](https://github.com/Pedro-Pathing/Quickstart/blob/41158ec1ec7314a7cef1d6c9b9f21b380a6cb8e9/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/pedro/Constants.java) is deliberately a setup skeleton returning null until the user configures a follower. |
| Road Runner | `5cf18fb625dcb5b17ce8c47af16a80f47b0f6bb1` | [Actions builder source](https://github.com/acmerobotics/road-runner/blob/5cf18fb625dcb5b17ce8c47af16a80f47b0f6bb1/road-runner/actions/src/main/kotlin/com/acmerobotics/roadrunner/Actions.kt), [path builders](https://github.com/acmerobotics/road-runner/blob/5cf18fb625dcb5b17ce8c47af16a80f47b0f6bb1/road-runner/core/src/main/kotlin/com/acmerobotics/roadrunner/Builders.kt); actual core/actions 1.0.1 JARs and ftc 0.1.25 AAR/source JAR downloaded from brott Maven. |
| Road Runner Quickstart | `6e63a7792e9bb6958798bf46fc03d84765b50c51` | [TeamCode dependencies](https://github.com/acmerobotics/road-runner-quickstart/blob/6e63a7792e9bb6958798bf46fc03d84765b50c51/TeamCode/build.gradle) declare ftc 0.1.25, core/actions 1.0.1, dashboard 0.5.1. The default Quickstart has its own older SDK/dependency pins: do not imply it is an SDK12 project without an explicit migration. |
| NextFTC v2 | Release `v0.2.1`, commit `83606d2b8ab4c628b1585bd23561e6f91f2475c4`; development HEAD `585b89ceabeb745340f4398f41ab5a97b37af2a8` | Current source is **NextFTC/NextFTCSuite**, not the older NextFTC/NextFTC repository. [Mechanism](https://github.com/NextFTC/NextFTCSuite/blob/83606d2b8ab4c628b1585bd23561e6f91f2475c4/robot/src/main/kotlin/dev/nextftc/robot/Mechanism.kt), [NextOpMode](https://github.com/NextFTC/NextFTCSuite/blob/83606d2b8ab4c628b1585bd23561e6f91f2475c4/robot/src/main/kotlin/dev/nextftc/robot/opmode/NextOpMode.kt), [Trigger](https://github.com/NextFTC/NextFTCSuite/blob/83606d2b8ab4c628b1585bd23561e6f91f2475c4/robot/src/main/kotlin/dev/nextftc/robot/triggers/Trigger.kt). Maven Central metadata reports published `dev.nextftc.v2:{control,hardware,robot}:0.2.1`; all three artifacts downloaded. Ivy 1.1.1 and Kotlin stdlib 2.3.0 used for Java signature checks. |
| NextFTC live docs | `5c5a967d1f9661ba52965e6e0bf8b418622b1f66` | [Official installation](https://nextftc.dev/introduction/installation/), [project structure](https://nextftc.dev/robot/project-structure/), [NextOpMode](https://nextftc.dev/robot/nextopmode/), [mechanisms](https://nextftc.dev/robot/mechanisms/), [triggers](https://nextftc.dev/robot/triggers/). Docs can precede releases; this audit checked published APIs separately. |
| Mercurial v1 | `207a360df3f90ff62f441aa543921107ddeed5c8` | [Lambda](https://github.com/Dairy-Foundation/Mercurial/blob/207a360df3f90ff62f441aa543921107ddeed5c8/src/main/kotlin/dev/frozenmilk/mercurial/commands/Lambda.kt), [Mercurial](https://github.com/Dairy-Foundation/Mercurial/blob/207a360df3f90ff62f441aa543921107ddeed5c8/src/main/kotlin/dev/frozenmilk/mercurial/Mercurial.kt), [build file](https://github.com/Dairy-Foundation/Mercurial/blob/207a360df3f90ff62f441aa543921107ddeed5c8/build.gradle.kts): published `dev.frozenmilk.mercurial:Mercurial:1.0.3`, actual AAR downloaded. |
| Mercurial v2 FTC bindings | `97469abec908bfc9eea342570ed9b95250047316` (2026-10-14) | [README](https://github.com/Dairy-Foundation/MercurialFTC/blob/97469abec908bfc9eea342570ed9b95250047316/README.md), [introduction](https://github.com/Dairy-Foundation/MercurialFTC/blob/97469abec908bfc9eea342570ed9b95250047316/introduction.md), [Java OpMode examples](https://github.com/Dairy-Foundation/MercurialFTC/blob/97469abec908bfc9eea342570ed9b95250047316/JavaExamples/src/main/java/org/firstinspires/ftc/teamcode/OpModes.java). README still pins MercurialFTC 2.0.1-beta0; development build references underlying Mercurial 2.0.1-beta1. Preserve that distinction. |
| Dairy monorepo | `936d46a69102cb89aa0c144618092aa4a014fc18` | Historical v1 organization; not the authoritative current v2 FTC example source. |
| Sloth | `30a169dbba5c73e5abf71eea0af1abd3191c7574` | [README](https://github.com/Dairy-Foundation/Sloth/blob/30a169dbba5c73e5abf71eea0af1abd3191c7574/README.md), Sloth/Load 0.3.2. Source checked deployment task and package limitations. |
| Panels | `ed2d9f6ae464974df6a1e54358b2cb03f1b4c3d1` | [Configurables scanner](https://github.com/ftcontrol/ftcontrol-panels/blob/ed2d9f6ae464974df6a1e54358b2cb03f1b4c3d1/library/Configurables/src/main/java/com/bylazar/configurables/ConfigurablesPlugin.kt), [PanelsTelemetry](https://github.com/ftcontrol/ftcontrol-panels/blob/ed2d9f6ae464974df6a1e54358b2cb03f1b4c3d1/library/Telemetry/src/main/java/com/bylazar/telemetry/PanelsTelemetry.kt), [TelemetryManager](https://github.com/ftcontrol/ftcontrol-panels/blob/ed2d9f6ae464974df6a1e54358b2cb03f1b4c3d1/library/Telemetry/src/main/java/com/bylazar/telemetry/TelemetryManager.kt). FullPanels 1.0.18; source data lists Configurables 1.0.7 and Telemetry 1.0.7. |
| Panels Java Quickstart | `3073df6408687fe10b338cbe2e81d9744aef54be` | [Dependencies](https://github.com/ftcontrol/Panels-Quickstart-Java/blob/3073df6408687fe10b338cbe2e81d9744aef54be/build.dependencies.gradle) confirm FullPanels 1.0.18, FTC SDK 12.0.0, both byLazar and Dairy Maven repositories. [Official release details](https://panels.bylazar.com/docs/com.bylazar.fullpanels/) say Kotlin consumers need kotlin-gradle-plugin 2.4.10 or later for 1.0.18. |
| Learn Java for FTC | Repository HEAD `9547071c531b89baeb33f74a6889a12f5b0c5fe1` (2026-09-24); PDF last-change commit `31aba3d329d7df9ab876acf2102da0583695e155` (2026-05-11) | [Author repository](https://github.com/alan412/LearnJavaForFTC), [pinned PDF](https://github.com/alan412/LearnJavaForFTC/blob/31aba3d329d7df9ab876acf2102da0583695e155/LearnJavaForFTC.pdf), [solutions](https://github.com/alan412/LearnJavaForFTC/tree/9547071c531b89baeb33f74a6889a12f5b0c5fe1/solutions). PDF title date May 11, 2026; 235 PDF pages. README says most recent sample build used SDK 11.2. |

## Coverage of every assigned page

| Page | Audit result and action |
| --- | --- |
| `libraries/index.mdx` | Read all 49 lines. Scope and install guidance are accurate. At line 20 remove the promise of an intake example: the current NextFTC page only teaches the claw. Line 15 promises a Java OpMode example although Pedro currently contains fragments; either add a complete class or say staged fragments. |
| `libraries/ftclib.mdx` | Read all 116 lines. Verified CommandOpMode, scheduler, InstantCommand, SequentialCommandGroup, WaitCommand units and lifecycle. Critical INIT side effect, Kotlin constructor syntax, and exact-version wording need correction below. A complete corrected Java class was compiled. Its Pure Pursuit warning is supported by the official documentation search snapshot, which still identifies that implementation as buggy and not recommended. |
| `libraries/ftc-dashboard.mdx` | Read all 149 lines. Version/repository, packets, sendTelemetryPacket, Config/public static mutability, Kotlin JvmField, default network URL and field/camera claims are supported. First packet Java fragment compiled. The tuning fragment needs declared measured encoder scale, mapped arm, dashboard reference and explicit Kotlin min/max imports or coerceIn; it is not standalone. |
| `libraries/pedro-pathing.mdx` | Read all 176 lines. Verified Pedro3 PoseFactory/of, line/linear, Constants.create, setPose, follow/update/isBusy and pose accessors. Coordinates agree with official guide. Add imports/full class, explicit path exit cleanup, and a bounded test timeout. Java path-construction fragment compiled against core3.0.1. Hardware follower construction not compiled as a working robot: Quickstart Constants is a robot-specific skeleton. |
| `libraries/road-runner.mdx` | Read all 113 lines. Verified Pose2d, Vector2d, actionBuilder (Quickstart class), strafeTo, turn radians, build and ftc.Actions.runBlocking. Builder/action fragment compiled against actual 1.0.1/0.1.25 artifacts. Good explanation that MecanumDrive is Quickstart code. Add explicit imports and clearer note that all fragments belong in LinearOpMode; the strafe sample needs a mecanum drive, so selecting TankDrive in the opening does not make the same strafe route suitable. |
| `libraries/nextftc.mdx` | Read all 190 lines. Verified published0.2.1 module coordinates, Mechanism/NextRobot/NextOpMode, constructor injection, annotation and lazy servo APIs, Ivy command return types and Java a() accessor. Correct Set.of to Collections.singleton and whileTrue description. Original three-class Java sample fails Java8 checking only at Set.of; corrected sample passes. Kotlin lifecycle binding in start and Java constructor binding are both supported. |
| `libraries/mercurial.mdx` | Read all 161 lines. Lambda builder signatures and Attach scheduling are real v1 APIs; Java assembled with construction inside init compiles against v1.0.3. Label v1 specifically; v2 beta uses a different continuation/program API. Step2 must explicitly go inside init. Add exact imports/full example rather than ask beginners to choose release-sensitive imports. |
| `libraries/panels.mdx` | Read all 101 lines. Configurable annotation/package, mutable static scanning, Kotlin JvmField, plugin features and compatibility cautions are supported by source. Source confirms SDK telemetry does not automatically become Panels telemetry. Wire TelemetryManager or label the shown output Driver Station only. Add a hard clamp for the adjustable motor test limit. Current repository/install coordinates can be pinned with an audit date. |
| `libraries/sloth.mdx` | Read all 54 lines. Hot-reload scope, full-install limitation, Sinister runtime and deploySloth task are supported. Windows command is correctly fenced PowerShell; add macOS/Linux ./gradlew equivalent. Current README also requires removeSlothRemote before a normal install so old reloaded code does not override a new full install. Explain this actual task, not merely 'normal install'. |
| `getting-started/index.mdx` | Read all 36 lines. Matches FIRST's current three-tool comparison and recommendation to begin Blocks. RC/DS/OpMode/hardware-name distinctions accurate. Add link to new Java fundamentals and lifecycle once written. |
| `getting-started/android-studio.mdx` | Read all 97 lines. SDK12 minimum Narwhal3 Feature Drop verified in SDK source; OneMotor.java compiles against RobotCore12.0.0. Correct Run module/configuration to TeamCode at line84. A full build, install and hardware test were not performed. |
| `getting-started/blocks.mdx` | Read all 31 lines. Tool/browser/server/backup claims agree with FIRST docs. Add one concrete Save Op Mode -> INIT -> START exercise; generic 'build' wording is also used by FIRST comparison, so not counted as a factual error. Device block availability depends on active config; reopening the editor after configuration changes is useful beginner troubleshooting. |
| `getting-started/onbot-java.mdx` | Read all 27 lines. Claims and sequence agree with official OnBot tutorial. Useful missing detail: build output is distinct from saving text, and OpMode should be selected only after successful build. Add small complete first program or link shared lifecycle example. |
| `getting-started/dictionary-demo.mdx` | Read all 45 lines. Local remark transformer uses [[display text|dictionary-key]], lookup normalizes case, undefined terms render with brackets, dictionary.ts exists. General servo wording should say positional servo since CRServo controls speed; this is a teaching precision change. Move developer-facing feature demo out of a novice programming path if navigation scope permits. |
| `cegp/index.mdx` | Read all 46 lines. SDK gamepad field, negation and motor power fragment valid. Scope is clearly labeled as inside active OpMode. No material programming error. The term safePower is only a low command magnitude, not a mechanism safety guarantee; current surrounding text mostly keeps that distinction. |
| `cegp/code-organization.mdx` | Read all 73 lines. TeamCode path, Java package/class/import pattern and HardwareMap constructor are accurate. Arm.java compiled against SDK12.0.0. Clarify move clamps commanded power but does not enforce encoder/endstop limits. It is not a complete safe arm controller. |
| `cegp/comments.mdx` | Read all 60 lines. Javadoc syntax and clamp fragment valid. Explicit fragment assumptions are helpful. No material source defect; add @param requestedPower if teaching reusable Java method docs. Avoid stating 'tested range' as evidence about the reader's hardware; label it an example measured range. |
| `cegp/formatting.mdx` | Read all 34 lines. Java/Kotlin style advice and hardware-name requirements valid. No source/API defect. Per-loop telemetry is not inherently wrong: the bottleneck is quantity, formatting, transmission rate and loop timing; replace blanket remove-before-competition wording with keep driver-relevant/diagnostic values and measure loop timing. |
| `cegp/naming-conventions.mdx` | Read all 65 lines. HardwareMap type overload and Kotlin class.java/property syntax valid. Constant/package/naming/units explanation sound. No material source defect. |
| `cegp/team-collaboration.mdx` | Read all 60 lines. Git pull/status/diff/add/commit/push/switch syntax and branch/PR/conflict explanation are correct. No material source defect. Add first-time clone/config and explicit clean-worktree expectation only if expanding beginner Git; avoid expanding this into a Git reference. |

## Exact corrections

### Android Studio

`content/docs/getting-started/android-studio.mdx:84`:

Replace `run the FtcRobotController app configuration` with:

> Select the **TeamCode** Run configuration (the application module), choose the connected Robot Controller, then click Run. Android Studio builds and installs the combined Robot Controller app, including your TeamCode.

Evidence: [TeamCode applies com.android.application](https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/e14c2aeb33e84d4ea21697beeea9ac49557be870/TeamCode/build.gradle), while [FtcRobotController applies com.android.library](https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/e14c2aeb33e84d4ea21697beeea9ac49557be870/FtcRobotController/build.gradle).

### FTCLib: pre-START movement

`content/docs/libraries/ftclib.mdx:72` and Java/Kotlin sequence at lines78–97:

The instruction to schedule the sequence inside initialize is wrong for a first motor test. Source chain:

- CommandOpMode.runOpMode calls initialize, then waitForStart.
- CommandScheduler.schedule immediately invokes command.initialize when outside the scheduler's run loop.
- SequentialCommandGroup.initialize immediately initializes its first child.
- InstantCommand.initialize runs the supplied Runnable.

The effect is a 0.15 motor command during INIT. The one-second WaitCommand does not advance until the post-START scheduler begins. A real JVM probe using the released FTCLib2.1.1 artifact reproduced the early InstantCommand action without any scheduler.run call.

Use a complete LinearOpMode for this first example so the order is explicit. A compiled replacement is at `compile/FTCLibMotorTest.java` beside this report. Its central structure is:

```java
Command sequence = new SequentialCommandGroup(
    new InstantCommand(() -> motor.setPower(0.15)),
    new WaitCommand(1000),
    new InstantCommand(() -> motor.setPower(0.0))
);
CommandScheduler scheduler = CommandScheduler.getInstance();
waitForStart();
if (!opModeIsActive()) return;
try {
    scheduler.schedule(sequence);
    while (opModeIsActive() && scheduler.isScheduled(sequence)) {
        scheduler.run();
    }
} finally {
    scheduler.cancel(sequence);
    motor.setPower(0.0);
    scheduler.reset();
}
```

If preserving CommandOpMode is important, a first `WaitUntilCommand(this::isStarted)` can prevent the sequence's motor initialization until START, but explicit cleanup is still needed, and beginners need an explanation that scheduling can execute initialization immediately. LinearOpMode is clearer for a first timed test.

At lines62,93,95 replace Kotlin `InstantCommand { motor.power = ... }` with `InstantCommand({ motor.power = ... })`. The only Runnable-taking Java constructor is `InstantCommand(Runnable toRun, Subsystem... requirements)`. The lambda is not the last parameter, so trailing-lambda syntax is inappropriate. Kotlin equivalent of the central replacement:

```kotlin
val sequence = SequentialCommandGroup(
    InstantCommand({ motor.power = 0.15 }),
    WaitCommand(1000),
    InstantCommand({ motor.power = 0.0 })
)
val scheduler = CommandScheduler.getInstance()
waitForStart()
if (!opModeIsActive()) return
try {
    scheduler.schedule(sequence)
    while (opModeIsActive() && scheduler.isScheduled(sequence)) {
        scheduler.run()
    }
} finally {
    scheduler.cancel(sequence)
    motor.power = 0.0
    scheduler.reset()
}
```

This Kotlin replacement was signature-reviewed, not compiled; no kotlinc executable is installed.

At line11 replace `FTCLib and FTC SDK versions must match` with `Choose an FTCLib release compatible with your FTC SDK; their version numbers are independent.` Current author installation and Maven metadata both specify `implementation 'org.ftclib.ftclib:core:2.1.1'`. This bounded audit compiled the demonstrated APIs against SDK12, not the entire FTCLib hardware feature set.

### NextFTC

`content/docs/libraries/nextftc.mdx:98`:

```java
import java.util.Collections;
import java.util.Set;

@Override
public Set<Mechanism> getMechanisms() {
    return Collections.singleton(claw);
}
```

The standard FTC project uses Java8 source/target and minSdk24, without coreLibraryDesugaring enabled. Android's [Set.of API reference](https://developer.android.com/reference/java/util/Set#of(E)) marks of as API30. The original fails `javac --release 8`; the singleton replacement compiles against the real NextFTC0.2.1 artifacts. Source compilation against a newer JDK alone would not establish old-Android runtime compatibility.

At line169 use: `whileTrue schedules when the condition changes from false to true and cancels on true to false. If a command finishes while the button stays held, it is not automatically scheduled again.` This matches Trigger.kt exactly.

For a self-contained Java example, include these actual imports rather than send the beginner to a version-sensitive docs lookup:

```java
import com.pedropathing.ivy.Command;
import dev.nextftc.hardware.actuators.NextServo;
import dev.nextftc.robot.Mechanism;
import dev.nextftc.robot.NextRobot;
import dev.nextftc.robot.opmode.NextOpMode;
import dev.nextftc.robot.opmode.NextTeleop;
import dev.nextftc.robot.triggers.CommandGamepad;
```

Keep Claw.java, Robot.java and ClawPractice.java as separate public files. The present Java binding in the constructor and Kotlin binding in start are both supported. The chapter should state exact package declarations and file names.

### Mercurial

`content/docs/libraries/mercurial.mdx:9,13,25,150` must explicitly identify the taught API as **Mercurial v1 Lambda API (1.0.3)**. The new Mercurial2 introduction describes an alternative to command-based control flow, not the same framework with renamed methods. Its FTC programs use MercurialFTC.teleop/autonomous, Context and continuations. A beta warning without labeling the example does not tell the reader which installation fits.

A bounded correction can keep the v1 teaching while linking v2 separately. Suggested version paragraph:

> This worked example uses the Mercurial **v1** Lambda API from `dev.frozenmilk.mercurial:Mercurial:1.0.3`. Its `Lambda` and `@Mercurial.Attach` code does not apply to Mercurial2. If your project uses `dev.frozenmilk.dairy:MercurialFTC`, follow that release's [Java/Kotlin examples](https://github.com/Dairy-Foundation/MercurialFTC) and setup instructions instead. Confirm the Core/Util/Pasteurized integration appropriate to your robot project; this page's Java API check is not a full SDK12 library compatibility certification.

At lines74–80 and86–92 add explicit direction to construct the command **inside init after hardware mapping**. Step3 says to keep fields from Steps1/2, but Step2 is an assignment statement, not a field declaration or method. A literal assembly is invalid Java/Kotlin or leaves runMotor null/uninitialized.

```java
@Override
public void init() {
    motor = hardwareMap.get(DcMotor.class, "testMotor");
    motor.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
    runMotor = new Lambda("Run motor briefly")
        .setInit(timer::reset)
        .setExecute(() -> motor.setPower(0.15))
        .setFinish(() -> timer.seconds() >= 1.0)
        .setEnd(interrupted -> motor.setPower(0.0))
        .setRequirements(motorRequirement);
}
```

Imports for the legacy version are `dev.frozenmilk.mercurial.Mercurial` and `dev.frozenmilk.mercurial.commands.Lambda`. The Java API fragment assembled this way compiled against the published1.0.3 AAR. Scheduling in start is appropriate. An explicit stop method writing zero is a useful final backstop for the beginner example.

### Pedro Pathing

`content/docs/libraries/pedro-pathing.mdx:119–155`: enclose execution in cleanup and bound the first practice attempt. With source3.0.1, follower.stop merely switches to IDLE. The next update actually invokes drivetrain.stop. Use:

```java
follower.follow(firstPath);
try {
    while (opModeIsActive() && follower.isBusy()) {
        follower.update();
        // Existing telemetry belongs here.
    }
} finally {
    follower.stop();
    follower.update();
}
```

Kotlin equivalent:

```kotlin
follower.follow(firstPath)
try {
    while (opModeIsActive() && follower.isBusy()) {
        follower.update()
        // Existing telemetry belongs here.
    }
} finally {
    follower.stop()
    follower.update()
}
```

A separate ElapsedTime timeout around the first field experiment is recommended so a misconfigured localizer cannot keep the routine running indefinitely. This is source-based defensive teaching, not evidence that a tuned Pedro path normally hangs. The existing text's low-speed advice should be backed by a concrete project-specific path/drivetrain power configuration from the installed Quickstart rather than an invented universal setter.

Required imports for the shown path API are:

```java
import com.pedropathing.api.PoseFactory;
import com.pedropathing.follower.Follower;
import com.pedropathing.math.Pose;
import com.pedropathing.paths.Path;
import org.firstinspires.ftc.teamcode.pedro.Constants;
import static com.pedropathing.api.Paths.line;
```

The official Quickstart Constants.create currently starts as a skeleton returning null. Existing instruction to finish setup/tuning is correct, but add a visible check that Constants.create returns a configured follower before copying the path OpMode. The setup URL `https://pedropathing.com/docs/pathing/guide/installation` could not be fetched (403/internal error); that is not proof it is broken. The accessible official coordinate page navigation links Installation separately; prefer its current actual URL after checking navigation.

### Road Runner

The sample route's API is correct. Add actual explicit imports:

```java
import com.acmerobotics.roadrunner.Action;
import com.acmerobotics.roadrunner.Pose2d;
import com.acmerobotics.roadrunner.Vector2d;
import com.acmerobotics.roadrunner.ftc.Actions;
import org.firstinspires.ftc.teamcode.MecanumDrive;
```

Avoid `import com.acmerobotics.roadrunner.*`: that package has its own Math class, making unqualified `Math.toRadians` ambiguous with java.lang.Math. My initial audit wrapper used a wildcard and failed for this reason; the wrapper with explicit imports passes. This was an audit-wrapper issue, not a defect in the original page (which omits imports).

`strafeTo` uses tangent-relative heading interpolation internally; on a straight segment its tangent is constant, so the stated route keeps heading as claimed. `strafeToConstantHeading` can be used to make the teaching intention explicit. Do not describe the same strafe route as compatible with TankDrive. Actions.runBlocking uses thread interruption; SDK LinearOpMode STOP interrupts that thread. Blocking work inside a custom Action can still delay stop. The current introductory example does not define a custom blocking Action.

### Panels

At `content/docs/libraries/panels.mdx:62–79`, normal OpMode.telemetry writes to the Driver Station. The Panels TelemetryPlugin has its own TelemetryManager; its onOpModePreInit does not replace SDK telemetry. If browser telemetry is intended, use source-verified wiring:

```java
import com.bylazar.telemetry.PanelsTelemetry;
import com.bylazar.telemetry.TelemetryManager;

// Keep this reference in the OpMode after the plugin is installed.
TelemetryManager panelsTelemetry = PanelsTelemetry.getTelemetry();

// Inside the active loop:
double limit = Math.max(0.0, Math.min(0.25, DriveTuning.MAX_TEST_POWER));
double requested = -gamepad1.left_stick_y * limit;
leftMotor.setPower(requested);
rightMotor.setPower(requested);
panelsTelemetry.addData("Test power limit", limit);
panelsTelemetry.addData("Requested power", requested);
panelsTelemetry.update(telemetry);
```

```kotlin
import com.bylazar.telemetry.PanelsTelemetry

val panelsTelemetry = PanelsTelemetry.telemetry

// Inside the active loop:
val limit = DriveTuning.MAX_TEST_POWER.coerceIn(0.0, 0.25)
val requested = -gamepad1.left_stick_y * limit
leftMotor.power = requested
rightMotor.power = requested
panelsTelemetry.addData("Test power limit", limit)
panelsTelemetry.addData("Requested power", requested)
panelsTelemetry.update(telemetry)
```

`update(telemetry)` forwards the accumulated lines to SDK telemetry and sends to Panels, then clears its lines. This was source checked only; no Panels binaries or runtime were compiled/exercised. The hard cap is a recommended safety improvement: a configurable field alone can be edited to negative or full power, so it is not a durable quarter-power test boundary.

Current audited install example (a dated option, not a forever-current promise):

```groovy
repositories {
    maven { url = 'https://mymaven.bylazar.com/releases' }
    maven { url = 'https://repo.dairy.foundation/releases' }
}
dependencies {
    implementation 'com.bylazar:fullpanels:1.0.18'
}
```

This release targets SDK12.0.0; Kotlin consumers need kotlin-gradle-plugin2.4.10 or newer according to its own release notes. Existing warning about older Sloth replacement artifacts is sensible; current FullPanels already incorporates Sloth support under official com.bylazar coordinates, so avoid blindly replacing it with the older com.bylazar.sloth fork.

### Sloth

`content/docs/libraries/sloth.mdx:33–48`: add a macOS/Linux equivalent `./gradlew :TeamCode:deploySloth` next to Windows PowerShell `./gradlew.bat :TeamCode:deploySloth`.

The current author instructions require the normal install run configuration to run **removeSlothRemote first**. Otherwise previously hot-reloaded code can override a later standard install. Preserve a reviewable explanation and exact task ordering. Example CLI sequence for a standard project that has both tasks available:

```sh
./gradlew :TeamCode:removeSlothRemote :TeamCode:installDebug
```

The actual installed project/template defines deployment details; do not claim this command was run here. The article's instruction to end the OpMode before deployment is safe and conservative; source says Sloth defers loading until OpMode ends and can upload while one runs, so do not call 'must end first' a hard Sloth API restriction.

### FTC Dashboard

At lines97 and114, define COUNTS_PER_DEGREE as a measured, nonzero **double** and describe encoder zero. If it is an integer Java division truncates; if undefined the fragment does not compile. Add a sentence identifying arm as a previously mapped DcMotor and dashboard as FtcDashboard.getInstance. Clarify that the proportional arm fragment omits gravity compensation and mechanism limits and is a tuning illustration rather than a complete arm controller.

At line116 use a no-import Kotlin form:

```kotlin
val power = (ArmTuning.KP * error).coerceIn(-0.25, 0.25)
```

Do not label the mutable dashboard fields constant in a way that encourages final/const declarations. Existing explanation of copying a primitive value during initialization is accurate and useful.

## Learn Java for FTC: useful missing teaching

The book is an author-controlled teaching source, not an SDK12 compatibility authority. The PDF says All Rights Reserved; no repository open-source license was observed. Teach these concepts with original prose and original examples; do not copy substantial text or solution implementations. The current PDF SHA256 is `cd8b9cab7b5b92f343bc334eb6937c779c9b0a0242430f09bddecc7ab9e0758d`.

The source's README says sample build SDK11.2, and explicitly excepts rumble and EasyOpenCV chapter OpModes from its testing claim. Neither that statement nor this inspection establishes SDK12/hardware compatibility. Chapter16 AprilTag code needs its own SDK12 audit before use: SDK12 changed AprilTagDetection APIs. Solution filenames also contain historical chapter/ProgrammingBoard naming and dependencies; they are not all standalone drop-ins.

Recommended new pages, in learning order (specific proposals; parent chooses exact scope):

| Page | Why it fills a real gap | Book evidence and author source inspected |
| --- | --- | --- |
| **Your first OpMode** | Explain file/package/import/annotation, INIT vs START vs STOP, iterative OpMode vs LinearOpMode, and why telemetry-only code is a useful first test. Show one complete Java file, then one modification exercise. Keep motor motion after START. | Ch1, pp2–10; AppendixB, pp215–218. `solutions/Exercise_1_1.java`, `Exercise_1_2.java`. |
| **Java values and scope** | Explain int/double/boolean/String, assignment vs comparison, field vs local scope and measurement units using telemetry. Include integer-division exercise that predicts 1/2 vs1.0/2.0. These concepts currently appear as assumptions throughout library tutorials. | Ch2, pp13–16; Ch3, pp17–20. `solutions/Exercise_2_1.java`, `Exercise_2_2.java`, `Exercise_3_1.java`–`Exercise_3_4.java`. |
| **Decisions and loops** | Teach if/else, &&/||/!, while and for with an FTC stop-aware loop. Show why an inner wait loop or sleep in an iterative loop prevents other mechanisms from updating. | Ch4, pp21–28; `solutions/Exercise_4_1.java`, `Exercise_4_2.java`. |
| **Methods and classes** | Explain parameters/return values, constructors, private hardware fields, final/static and composition with an original one-motor mechanism helper. Bridge simple OpModes to NextFTC/FTCLib without requiring architecture vocabulary first. | Ch5, pp29–40; Ch14, pp95–104; Ch19.4, pp136–137. `RobotLocation_5_1.java`–`RobotLocation_5_3.java`, `UseRobotLocationOpMode_5_1.java`–`UseRobotLocationOpMode_5_3.java`. |
| **Configure and read a switch** | Map a named touch/limit switch, display pressed state, explain active-low digital wiring separately from TouchSensor API, and stop motion at a measured limit. Current vision material does not replace basic digital sensor instruction. | Ch6, pp41–48; `ProgrammingBoard_6_1.java`, `TouchSensorOpMode_6_1.java`, `TouchSensorOpMode_6_2.java`, `TestDigitalChannel_14_1.java`. |
| **Motors and encoders** | Teach setPower vs physical speed, direction, BRAKE/FLOAT, encoder ticks/zero/scale, the run modes and timeout/stop protection. Make clear that software limits need a known zero and homing is not blindly resetting at an arbitrary position. | Ch7, pp49–58; Ch24, pp185–200. `ProgrammingBoard_7_1.java`, `MotorOpMode_7_1.java`, `MotorOpMode_7_2.java`. |
| **Control a servo** | Distinguish positional Servo from CRServo, normalized position from angle, measured linkage limits and command completion from physical arrival. Add edge-triggered A/B open/close as first input exercise. | Ch8, pp59–62; `ProgrammingBoard_8_1.java`, `ServoGamepadOpMode_8_2.java` (its historical ProgrammingBoard5 dependency demonstrates why examples need adaptation rather than copying). |
| **Read an IMU** | Teach current universal IMU initialize/RevHubOrientationOnRobot, yaw units/reset and measured hub mounting before field-centric driving. | Ch11, pp73–76; `solutions/Exercise_11_1.java`; verify current API against SDK12 sample `SensorIMUOrthogonal.java`, not historical BNO055-only snippets. |
| **Remember state without blocking** | A button toggle with prior/current state, followed by a small enum autonomous state machine, ElapsedTime, per-state deadlines, and stop cleanup. This fills the gap between 'one while loop' and command framework/pathing chapters. | Ch12, pp77–90; `solutions/Exercise_12_1.java`, `Exercise_12_2.java`. The first solution uses enum states, getRuntime and per-step timestamps; it is conceptual evidence, not code to copy. |
| **Find an SDK method and debug a failure** | Show jump-to-definition/source, Javadoc parameter types/units/return values, compiler vs configuration vs runtime errors, and telemetry as evidence. Use current SDK samples to show how to verify an API before copying a library tutorial. | Ch17, pp127–129; Ch18, p131. `TestMotor_17_2.java`, `Exercise_18_1.java`. |

Other future candidates supported by later chapters are rumble/LED driver feedback, arrays for grouped motors/sensors, analog sensor calibration, and a measured autonomous sequence. Defer behavior-tree architecture until readers understand lifecycle and state machines; the current beginner bottleneck is prerequisite knowledge, not another orchestration abstraction.

## Verification actually performed

- Read every assigned MDX page in full, including both Java and Kotlin tabs.
- Browsed current official docs and inspected pinned author source for each library, current FTC project layout/release notes, actual RobotCore12 source, and LearnJavaForFTC's PDF/table of contents plus selected author solution programs.
- Downloaded real published FTC12, FTCLib2.1.1, Dashboard0.6.0, Pedro core3.0.1, Road Runner core/actions1.0.1 + ftc0.1.25, NextFTC0.2.1, Ivy1.1.1 and legacy Mercurial1.0.3 artifacts into the tmp tree.
- Compiled original OneMotor and Arm classes; wrapped Dashboard packet, Pedro path creation, Road Runner builder/action and legacy Mercurial Lambda fragments with the imports and lifecycle required to make a Java compilation unit. These checks used javac17 `--release 8` and Android30's android.jar. Successful Java checks validate type/signature/syntax for the snippets only.
- NextFTC original three-class example failed at Set.of under Java8 API checking; the singleton variant compiled against published0.2.1. `javap` confirmed Java default methods and the a() getter in the released artifacts.
- Compiled the complete corrected FTCLibMotorTest.java and ran a hardware-free JVM lifecycle probe using the real FTCLib scheduler. The probe demonstrated immediate first InstantCommand execution at schedule time, before any scheduler.run call.
- Raw check output: `compile/results.txt`. Probe source: `compile/FTCLibScheduleProbe.java`. Corrected self-contained FTCLib program: `compile/FTCLibMotorTest.java`.

Not performed: full Gradle/Android APK build, Kotlin compilation (no kotlinc executable), installation or Control Hub tests, browser dashboard connection, motor/servo/localization calibration, mechanism safety tests, or on-field path testing. Panels telemetry and Sloth deployment were source checked only. No robot hardware is attached or assumed. Do not report these snippets as hardware-tested or fully integration-tested.
