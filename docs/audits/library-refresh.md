# FTC library refresh

Reviewed **14 October 2026**. Read all current `content/docs/libraries/*.mdx`, the existing programming source register, official documentation, publication metadata, release records, and the implementation/build files described below. No project files were edited. Every named repository is **unarchived** according to GitHub's repository API. That flag alone does not establish active maintenance. No inspected timestamp fell after the review date; development branch code is separated from published releases.

Machine-readable pins, publication dates, dependency context, archive flags, and actions are in **`sources.json`**. Raw primary-source evidence is retained in `github-raw.json`, `activity-raw.json`, `extra-raw.json`, `source-activity.json`, `metadata/`, and `artifact-pins.json`.

## Current status

| Library / exact repository | Current publication as of review | Latest inspected meaningful activity | SDK / maturity / article result |
| --- | --- | --- | --- |
| [Panels](https://github.com/ftcontrol/ftcontrol-panels) | **FullPanels 1.0.18**, Maven metadata and author changelog **7 Oct 2026**; no GitHub Releases entries | `ed2d9f6` on 7 Oct: release/compiler guidance; Sloth integration merged 3 Oct | SDK **12.0.0**; default compileSdk30/minSdk24 retained. Kotlin consumers: author explicitly requires kotlin-gradle-plugin **2.4.10+**. Fix Java singleton call and add concrete current installation below. |
| [Sloth](https://github.com/Dairy-Foundation/Sloth) | **0.3.2**, Load **0.3.2**, Dairy Maven metadata **17 Sep 2026**; no GitHub Releases entries | Actual Load code `7b8ba6c9`, 17 Sep: improve removal of old hot loads. HEAD `30a169db` is a later README typo | Current build tooling targets SDK12; Sloth depends on Sinister2.3.0. Update integration advice: Slothboard is still available; official Panels now supports Sloth itself. |
| [Slothboard](https://github.com/Dairy-Foundation/ftc-dashboard) | **`0.3.2+0.6.0`**, Dairy Maven metadata **17 Sep 2026**; no GitHub Releases entries | `4f98686b`, 17 Sep: runtime/build integration update; implementation contains a Sinister scanner that registers/unloads `@Config` classes and refreshes OpModes | Maintained Dairy fork of Dashboard, SDK12 build context. Its README's **0.3.1+0.6.0** example is stale; actual Maven metadata/POM and Sloth README agree on **0.3.2+0.6.0**. Name and link this fork explicitly. |
| [NextFTC Suite](https://github.com/NextFTC/NextFTCSuite) | **v2 modules 0.2.1**, GitHub release **17 Sep 2026** and Maven Central metadata agree | `585b89ce`, 11 Oct: field-centric math; `15423ccb`, 11 Oct: motor-stop cleanup. Main is **0.3.0-SNAPSHOT**, not a newer published release | Release catalog: SDK12, Kotlin2.3.0, Sloth0.3.2, Ivy1.1.1. **Current CrocoDocs claw example already uses the latest published API.** Its three Java classes compile unchanged. Do not silently use main's fixes as evidence for0.2.1. |
| [NextFTC v1](https://github.com/NextFTC/NextFTC) | **1.1.0**, **23 Feb 2026** | Latest implementation/release work 23 Feb; latest HEAD change 30 May is README-only | Different legacy line and artifact namespace. Do not replace v2 examples with the old repository's README. |
| [FTCLib](https://github.com/FTCLib/FTCLib) | **2.1.1**, **22 Feb 2023** | Unreleased `dev` motor-wrapper changes `cd966af5`, **4 Mar 2024**; default/released branch remains2023 | Older stable release, slow development, **not archived**. Released build targets FTC7.1.0/minSdk24; shown command APIs were previously compiled with SDK12, not full-library certified. No newer release to migrate to. Keep Pure Pursuit warning. |
| [Pedro Pathing](https://github.com/Pedro-Pathing/PedroPathing) | **3.0.1**, GitHub release **18 Sep 2026**, Maven agrees | `9c95f86d`, **11 Oct 2026**; current Quickstart also uses3.0.1 | SDK12 source/Quickstart, revhub3.0.1/core3.0.1. Current article version/API is current; no rewrite needed. |
| [Road Runner](https://github.com/acmerobotics/road-runner) and [FTC bindings](https://github.com/acmerobotics/road-runner-ftc) | Core/actions **1.0.1**, **5 Jan 2025**; FTC **0.1.25**, Maven **23 Aug 2025** | Core action code changed18 Apr2025; FTC binding `3011c70e` changed tuning-page parsing **31 Oct 2025** | Stable published versions. FTC bindings declare SDK10 minimum; inspected Quickstart pins SDK11. Current article already states this. GitHub FTC Releases only shows older0.1.14, so use actual Maven publication metadata for0.1.25. No newer API version found. |
| [FTC Dashboard](https://github.com/acmerobotics/ftc-dashboard) | **0.6.0**, **16 May 2026** | `a876f094`, **7 Sep 2026**, source/lint and CI work | Build declares FTC10 minimum/minSdk24. Current article's0.6.0 coordinate is current. Add Slothboard as an optional, separately named replacement for Sloth projects. |
| [Mercurial FTC](https://github.com/Dairy-Foundation/MercurialFTC), [core](https://github.com/Dairy-Foundation/Mercurial/tree/continuations) | **2.0.1-beta1**, **14 Oct 2026**. Legacy v1 remains1.0.3 | Bindings `97469ab` and continuation core `4db4260`, both14 Oct | **Beta**, even though GitHub's prerelease flag is false. SDK12 tooling, Sloth0.3.2, optional Pedro3.0.1 wrappers. Current CrocoDocs v1 tutorial is correctly labeled legacy; add a dated beta status/link rather than relabel its incompatible Lambda code. |
| [EasyOpenCV](https://github.com/OpenFTC/EasyOpenCV) | **1.7.3**, **15 Jun 2024** | Source HEAD `9bb45b3`, **15 Jun 2024**; no newer release/source observed | Author's minimum is FTC9; source compiles against9.0.1 and uses OpenCV4.10.0-A. **Official FTC Vision12.0.0 POM still directly depends on EasyOpenCV1.7.3**, so publication age alone is not evidence to remove it. Current version remains appropriate. |

Primary publication sources: [Panels release details](https://panels.bylazar.com/docs/com.bylazar.fullpanels/), [Sloth metadata](https://repo.dairy.foundation/releases/dev/frozenmilk/sinister/Sloth/maven-metadata.xml), [Slothboard metadata](https://repo.dairy.foundation/releases/com/acmerobotics/slothboard/dashboard/maven-metadata.xml), [NextFTC metadata](https://repo.maven.apache.org/maven2/dev/nextftc/v2/robot/maven-metadata.xml), [Pedro metadata](https://repo.maven.apache.org/maven2/com/pedropathing/core/maven-metadata.xml), [Road Runner FTC metadata](https://maven.brott.dev/com/acmerobotics/roadrunner/ftc/maven-metadata.xml), [Dashboard metadata](https://maven.brott.dev/com/acmerobotics/dashboard/dashboard/maven-metadata.xml), [MercurialFTC beta release](https://github.com/Dairy-Foundation/MercurialFTC/releases/tag/2.0.1-beta1), [FTC Vision12 POM](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/Vision/12.0.0/Vision-12.0.0.pom).

## Panels: concrete article corrections

1. **`panels.mdx:56,62`: Java must use `PanelsTelemetry.INSTANCE.getTelemetry()`.** `PanelsTelemetry` is a Kotlin `object` without `@JvmStatic`. The current `PanelsTelemetry.getTelemetry()` fails javac against published Telemetry1.0.7. My earlier source-only audit missed that singleton access detail. Actual binary `javap` confirms a static INSTANCE field and an **instance** getTelemetry method. Kotlin `PanelsTelemetry.telemetry` remains correct.
2. **`panels.mdx:13–16`: replace vague setup text with the current audited coordinates and requirements.** The two plugin APIs used by this page are Telemetry1.0.7 and Configurables1.0.7, included by FullPanels1.0.18.
3. **`panels.mdx:21`: give the real documented defaults**, qualified by network mode: Control Hub `http://192.168.43.1:8001`; phone RC `http://192.168.49.1:8001`. Source `Panels.kt:77` actually creates the HTTP server on8001, matching author docs.
4. State that **official `com.bylazar:*` artifacts gained native Sloth support in FullPanels1.0.16**; the author explicitly directs users away from old `com.bylazar.sloth:*` replacements.

Audited installation for SDK12:

```groovy
repositories {
    maven { url = 'https://mymaven.bylazar.com/releases' }
    maven { url = 'https://repo.dairy.foundation/releases' }
}
dependencies {
    implementation 'com.bylazar:fullpanels:1.0.18'
}
```

Keep existing mavenCentral/google repositories. Kotlin users must follow the author's kotlin-gradle-plugin2.4.10+ setup. No compileSdk/minSdk migration is required by Panels' current instructions. Choose FullPanels or a deliberate set of individual plugins to keep dependency versions clear; redundant declarations of the same Gradle module do not inherently create duplicate classes, so avoid repeating that overly broad claim from the author's docs.

The corrected Java API is:

```java
import com.bylazar.telemetry.PanelsTelemetry;
import com.bylazar.telemetry.TelemetryManager;

TelemetryManager panels = PanelsTelemetry.INSTANCE.getTelemetry();
panels.addData("Motor power", power);
panels.update(telemetry);
```

This fragment belongs in a valid OpMode, with `power` declared. A complete, original one-motor example is saved as **`compile/PanelsExample.java`**; it maps hardware, waits for START, clamps the editable limit, sends browser+Driver Station telemetry, and removes motor power in finally. It **compiles** against the published Telemetry/Configurables1.0.7 artifacts and RobotCore12. The current article's Configurable/JvmField declarations, `addData`, `update(telemetry)`, and hard0.25 cap otherwise remain supported.

Pinned implementation evidence: [singleton](https://github.com/ftcontrol/ftcontrol-panels/blob/ed2d9f6ae464974df6a1e54358b2cb03f1b4c3d1/library/Telemetry/src/main/java/com/bylazar/telemetry/PanelsTelemetry.kt), [manager](https://github.com/ftcontrol/ftcontrol-panels/blob/ed2d9f6ae464974df6a1e54358b2cb03f1b4c3d1/library/Telemetry/src/main/java/com/bylazar/telemetry/TelemetryManager.kt), [prerequisites](https://github.com/ftcontrol/ftcontrol-panels/blob/ed2d9f6ae464974df6a1e54358b2cb03f1b4c3d1/library/Docs/web/src/docs/Prerequisites.svelte), [connection](https://github.com/ftcontrol/ftcontrol-panels/blob/ed2d9f6ae464974df6a1e54358b2cb03f1b4c3d1/library/Docs/web/src/docs/Accessing.svelte), [FullPanels build](https://github.com/ftcontrol/ftcontrol-panels/blob/ed2d9f6ae464974df6a1e54358b2cb03f1b4c3d1/library/FullPanels/build.gradle.kts). Published binaries came from the author's [official Maven repository mirror](https://github.com/ftcontrol/ftcontrol-maven), not a third-party fork.

## Sloth and Slothboard: concrete article corrections

**`sloth.mdx:25` needs an integration table**, because Panels and Dashboard now take different routes:

| Existing tool | Current Sloth route |
| --- | --- |
| FTC Dashboard0.6.0 | Replace it with **Slothboard** `com.acmerobotics.slothboard:dashboard:0.3.2+0.6.0` from Dairy Maven. Do not retain ordinary Dashboard classes alongside the fork. |
| FullPanels1.0.18 | Use official `com.bylazar:fullpanels:1.0.18`; Sloth support is already integrated. Do not select the older `com.bylazar.sloth` fork for this release. |
| NextFTC v2 hardware/robot0.2.1 | Already depends on Sloth0.3.2. Hot deployment still needs the **Load plugin** and its deployment task; a transitive runtime dependency does not create the build plugin task. |

Slothboard is **still maintained**, not merely an abandoned historical fork. Its source contains a Sinister scanner that registers, unloads and refreshes `@Config` classes and OpModes when TeamCode reloads. The Java packages remain `com.acmerobotics.dashboard`, so normal Dashboard packet/config imports continue to work. A small API sample in **`compile/SlothboardExample.java`** compiled against **only the fork's** dashboard/core0.3.2+0.6.0 JARs; ordinary Dashboard was omitted from that check.

```groovy
repositories {
    maven { url = 'https://repo.dairy.foundation/releases' }
}
dependencies {
    implementation 'com.acmerobotics.slothboard:dashboard:0.3.2+0.6.0'
}
```

If Road Runner pulls ordinary Dashboard transitively, follow Sloth's documented exclusions on the relevant RR dependencies:

```groovy
implementation('com.acmerobotics.roadrunner:ftc:0.1.25') {
    exclude group: 'com.acmerobotics.dashboard'
}
implementation('com.acmerobotics.roadrunner:actions:1.0.1') {
    exclude group: 'com.acmerobotics.dashboard'
}
```

This is conditional integration guidance, not a reason to add Road Runner to a project that does not use it. The fork's publication coordinate changes; its Java API namespace does not.

**`sloth.mdx:23` can pin Sloth/Load0.3.2 with an audit date.** A standard manually configured SDK project uses runtime `dev.frozenmilk.sinister:Sloth:0.3.2`, buildscript classpath `dev.frozenmilk:Load:0.3.2`, and plugin ID `dev.frozenmilk.sinister.sloth.load`, all from Dairy Maven. The README's alternative Core2.2.4 setup is specifically for projects using older Dairy1.x libraries; do not apply that route unconditionally.

**`sloth.mdx:39` should say “Deploy through the Gradle task” rather than the absolute “Sloth has no Java API”.** Sloth/Sinister exposes runtime scanning APIs, while deploying source changes is a build task.

Existing deploySloth/removeSlothRemote task names and package-scope caveats remain correct. Current **Load0.3.2 source automatically makes Gradle installDebug/installRelease depend on removeSlothRemote**. The Android Studio Before launch configuration remains part of the author's IDE workflow. Explain that distinction instead of implying the Gradle CLI always needs a separate removal invocation. The current explicit two-task command remains valid.

Pinned implementation: [Sloth Load task registration/order](https://github.com/Dairy-Foundation/Sloth/blob/30a169dbba5c73e5abf71eea0af1abd3191c7574/Load/src/main/kotlin/dev/frozenmilk/sinister/sloth/Load.kt), [Sloth setup](https://github.com/Dairy-Foundation/Sloth/blob/30a169dbba5c73e5abf71eea0af1abd3191c7574/README.md), [Slothboard scanner](https://github.com/Dairy-Foundation/ftc-dashboard/blob/4f98686b3f1cf9de1e1fb1c2d8e41d5e6d43e83d/FtcDashboard/src/main/java/com/acmerobotics/dashboard/FtcDashboardScanner.java), [Slothboard build](https://github.com/Dairy-Foundation/ftc-dashboard/blob/4f98686b3f1cf9de1e1fb1c2d8e41d5e6d43e83d/FtcDashboard/build.gradle.kts), [actual0.3.2+0.6.0 POM](https://repo.dairy.foundation/releases/com/acmerobotics/slothboard/dashboard/0.3.2%2B0.6.0/dashboard-0.3.2%2B0.6.0.pom).

## NextFTC: update status, preserve working APIs

**No published API migration is needed.** Existing article Java `Mechanism.instant`, NextServo, NextRobot's Set, constructor-injected NextOpMode, NextTeleop and CommandGamepad.a().onTrue still compile against the latest published v2 modules0.2.1. The existing whileTrue description is accurate.

At **`nextftc.mdx:17–28`**, make the audited install directly usable by replacing VERSION with0.2.1 and retaining the Dairy repository. It is safe to show all three current modules as the official installation does:

```groovy
implementation 'dev.nextftc.v2:control:0.2.1'
implementation 'dev.nextftc.v2:hardware:0.2.1'
implementation 'dev.nextftc.v2:robot:0.2.1'
```

Add a short version note: **“Examples use published v2 modules0.2.1, reviewed14Oct2026. The main branch is0.3.0-SNAPSHOT and includes later fixes that are not part of this publication.”** The source has Oct11 fixes for field-centric math and motor-stop cleanup; do not advertise those as0.2.1 guarantees. There is no need to replace the working claw code with guessed0.3 APIs or add a snapshot dependency.

The authoritative source is **NextFTC/NextFTCSuite**, not the legacy NextFTC/NextFTC repository. The Suite README currently links beta.nextftc.dev and says kdoc.nextftc.dev follows main. The installation and existing article links at nextftc.dev are live, but a main-generated reference is not automatically a release reference.

Pinned release evidence: [v0.2.1 catalog](https://github.com/NextFTC/NextFTCSuite/blob/83606d2b8ab4c628b1585bd23561e6f91f2475c4/gradle/libs.versions.toml), [Mechanism](https://github.com/NextFTC/NextFTCSuite/blob/83606d2b8ab4c628b1585bd23561e6f91f2475c4/robot/src/main/kotlin/dev/nextftc/robot/Mechanism.kt), [NextOpMode](https://github.com/NextFTC/NextFTCSuite/blob/83606d2b8ab4c628b1585bd23561e6f91f2475c4/robot/src/main/kotlin/dev/nextftc/robot/opmode/NextOpMode.kt), [release](https://github.com/NextFTC/NextFTCSuite/releases/tag/v0.2.1), [current development version](https://github.com/NextFTC/NextFTCSuite/blob/585b89ceabeb745340f4398f41ab5a97b37af2a8/gradle.properties).

## Remaining article actions

- **FTC Dashboard:** retain0.6.0; add a short Slothboard cross-link near installation. The ordinary and fork artifacts share class names, so present them as alternatives.
- **Mercurial:** retain current explicit v1 tutorial; add a current-status note linking **2.0.1-beta1**, published today. Current beta's release fixes include dynamic OpModes, GamepadD stick mapping and Timer initialization; Java `Timer.getRemaining()` becomes `Timer.remaining()`. Those claims apply to v2 beta only. Do not confuse the core repository's legacy master with its active continuations branch.
- **FTCLib:** retain2.1.1 and the safe scheduler example. Add release age/status if useful. Its unarchived flag does not imply recent maintenance, and its quiet release history does not prove abandonment.
- **Pedro Pathing:** no version/API change needed; current3.0.1 remains latest. Existing start-pose/tuning/timeout/cleanup requirements remain appropriate.
- **Road Runner:** no version/API change needed; current core/actions1.0.1 and FTC0.1.25 remain latest publications. Keep the explicit SDK11 Quickstart caveat.
- **EasyOpenCV:** no version change needed; add full source commit `9bb45b3d400a3818ad86d4a97f6ec35323abef39` to the register. FTC Vision12's direct1.7.3 dependency is useful current compatibility evidence, while camera behavior still needs hardware testing.
- **Library overview:** a dated compact status table is useful. Slothboard belongs as an integration option under Sloth/FTC Dashboard; its API does not need a duplicate beginner tutorial. Ivy can remain explained as NextFTC's command dependency; no additional library article is needed to correct these pages.

## Verification limits

- Read source implementations, build files, current official docs, real Maven metadata/POMs and GitHub releases/archive flags. GitHub activity timestamps were not substituted for source history. Explicit beta naming overrides an inaccurate prerelease=false flag.
- **Panels:** downloaded the official Telemetry/Configurables1.0.7 binaries. Original Java singleton call failed; INSTANCE correction and a complete original OpMode compiled with javac17 `--release8`, RobotCore12 and Android30.
- **Slothboard:** downloaded published dashboard/core0.3.2+0.6.0. Its config/packet snippet compiled without ordinary Dashboard on the classpath. **NextFTC:** current article's three complete Java classes compiled against published0.2.1. Diagnostics are saved in `compile/results.txt`.
- No full Gradle/APK build, Kotlin compilation in this refresh, hardware deployment, browser connection, camera processing, motor/servo run or field test was performed. Sloth task setup is source-verified, not executed. Source and signature checks are not hardware acceptance.
