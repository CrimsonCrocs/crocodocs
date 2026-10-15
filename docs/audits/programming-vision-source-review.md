> Research-stage evidence, 2026-10-14. Findings describe the pre-correction snapshot. See `../programming-audit.md` for implemented corrections, final checks, and limits. Temporary artifact paths are session-local and are not required by the app.

# Sensors and vision programming audit

Audit date: 2026-10-14. Scope: all 13 `content/docs/sensors-and-vision/**/*.mdx` files, including the root `color-sensor-v3.mdx` routing page. Read all prose and all 63 fenced code blocks (32 Java, 31 Kotlin). No project files were changed. This report separates source inspection, local compilation and a small JVM formatting probe from unperformed robot/hardware tests.

## Outcome

The current documentation has reproducible Java compilation failures in three of its four complete Java classes. The fourth passes. The Kotlin translations repeat those source-level faults and add two incorrectly typed radius arguments. Color Locator telemetry also throws when it attempts to format the integer area as a float. There is one important custom-Mat cleanup race and several smaller API/teaching corrections below.

## Versioned primary source evidence

The FTC runtime source is distributed in official Maven Central source archives; the public RobotController repository contains the app/samples, not all runtime implementation files. All runtime findings below were checked against these exact archives:

- [FTC Vision 12.0.0 source JAR](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/Vision/12.0.0/Vision-12.0.0-sources.jar), SHA256 `756294f8307da88b85a73c5a804dbc20f65dd60af97534ed3dea8f38e528aba8`, extracted under `/tmp/crocodocs-audit-vision/sdk12/Vision`.
- [FTC RobotCore 12.0.0 source JAR](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/RobotCore/12.0.0/RobotCore-12.0.0-sources.jar), SHA256 `b1a7b0da86e778fb8e783ae00061f6e52699c6cfa98293305783160c19388bf9`, under `sdk12/RobotCore`.
- [FTC Hardware 12.0.0 source JAR](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/Hardware/12.0.0/Hardware-12.0.0-sources.jar), SHA256 `a199d102a8011242624ccd5af62b337023aef58b79adb591c8d0562079ed3d43`, under `sdk12/Hardware`.
- [EasyOpenCV 1.7.3 source JAR](https://repo.maven.apache.org/maven2/org/openftc/easyopencv/1.7.3/easyopencv-1.7.3-sources.jar), SHA256 `974c57870b1c58d6f7b1bce226a6ab7302f004aadacac3dbe979ebc14933d885`, under `eocv173`.
- [OpenFTC repackaged OpenCV 4.10.0-A source JAR](https://repo.maven.apache.org/maven2/org/openftc/opencv-repackaged-bundled-dylibs/4.10.0-A/opencv-repackaged-bundled-dylibs-4.10.0-A-sources.jar), SHA256 `64f343b46d566937d2ea7805daa9a1739633b146b15f22cb3fa64eba7cf77502`, under `opencv-source`.
- The [Vision 12.0.0 POM](https://repo.maven.apache.org/maven2/org/firstinspires/ftc/Vision/12.0.0/Vision-12.0.0.pom) pins EasyOpenCV 1.7.3; its POM pins OpenCV 4.10.0-A. Thus these are the actual SDK 12 transitive dependencies, not guessed latest dependencies.
- FTC public app/sample commit: [`e14c2aeb33e84d4ea21697beeea9ac49557be870`](https://github.com/FIRST-Tech-Challenge/FtcRobotController/tree/e14c2aeb33e84d4ea21697beeea9ac49557be870), the SDK 12.0 release.
- EasyOpenCV public repository inspected at [`9bb45b3d400a3818ad86d4a97f6ec35323abef39`](https://github.com/OpenFTC/EasyOpenCV/tree/9bb45b3d400a3818ad86d4a97f6ec35323abef39). Versioned Maven implementation above was authoritative where runtime behavior mattered.
- VisionBench inspected via pinned raw source at [`3323f704ef92519a993dd4ea32fad1ab500a8018`](https://github.com/deltacv/VisionBench/tree/3323f704ef92519a993dd4ea32fad1ab500a8018), version 2027.0.0 in root build.gradle. Selected sources are under `visionbench-source`; source tree inventory is `visionbench-tree.json`. A full clone did not finish; no claim is made that the entire VisionBench repository was inspected.
- [OpenCV 4.10 HSV implementation](https://github.com/opencv/opencv/blob/4.10.0/modules/imgproc/src/color_hsv.dispatch.cpp#L331), [color conversion enumeration](https://github.com/opencv/opencv/blob/4.10.0/modules/imgproc/include/opencv2/imgproc.hpp#L599), and [OpenCV 4.10 Java Moments](https://docs.opencv.org/4.10.0/javadoc/org/opencv/imgproc/Moments.html).

All local source locations below are relative to `/tmp/crocodocs-audit-vision`. All article locations are relative to `content/docs/sensors-and-vision` and refer to the original audited text.

## Required corrections

### V1 — High: nonexistent RGBA-to-HSV constant prevents compilation

Locations: `easyopencv/writing-pipelines.mdx:19,63,79,249,316`; also recommended in `easyopencv/easyopencv-basics.mdx:122`.

`Imgproc.COLOR_RGBA2HSV` does not exist in OpenCV 4.10 (nor in the inspected conversion enum). The complete Java PollenTargetPipeline fails javac at this constant. Every Kotlin occurrence has the same API defect.

Use:

```java
Imgproc.cvtColor(blurred, hsv, Imgproc.COLOR_RGB2HSV);
```

```kotlin
Imgproc.cvtColor(blurred, hsv, Imgproc.COLOR_RGB2HSV)
```

Explain that EasyOpenCV input is RGBA, while this OpenCV conversion accepts three or four source channels and ignores alpha. The C++ `cvtColorBGR2HSV` helper explicitly accepts `Set<3, 4>`; the RGB variant selects channel ordering. Alternatively, explicitly remove alpha with RGBA2RGB before RGB2HSV, but the direct RGB2HSV form is valid and simpler. Do not change it to BGR2HSV.

Evidence: `opencv-source/org/opencv/imgproc/Imgproc.java:187`, no RGBA2HSV declaration; pinned OpenCV C++ source above at lines 331–337. EOCV's [RGBA warning](https://github.com/OpenFTC/EasyOpenCV/blob/9bb45b3d400a3818ad86d4a97f6ec35323abef39/readme.md#documentation) is correct.

### V2 — High: wrong WebcamName import prevents both full locator examples compiling

Locations: `visionportal/color-blob-locator.mdx:182,245`.

Replace `com.qualcomm.robotcore.hardware.WebcamName` with:

```java
import org.firstinspires.ftc.robotcore.external.hardware.camera.WebcamName;
```

Use the same fully qualified package without the semicolon in Kotlin. This type is defined in RobotCore, and is imported exactly this way in the [SDK 12 rectangle sample](https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/e14c2aeb33e84d4ea21697beeea9ac49557be870/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/external/samples/ConceptVisionColorLocator_Rectangle.java#L32). Confirmed with javac, not merely documentation.

### V3 — High: SortOrder is not nested in ColorBlobLocatorProcessor.Util

Locations: `visionportal/color-blob-locator.mdx:107,121,217,278`.

Add `import com.qualcomm.robotcore.util.SortOrder;` (Kotlin omits semicolon) and use:

```java
ColorBlobLocatorProcessor.Util.sortByArea(SortOrder.DESCENDING, blobs);
```

`Util.sortByArea` takes `com.qualcomm.robotcore.util.SortOrder`, not a nested enum. Source: `sdk12/Vision/org/firstinspires/ftc/vision/opencv/ColorBlobLocatorProcessor.java:40,530`; also the version-pinned sample above. Confirmed by javac.

### V4 — High: area telemetry throws IllegalFormatConversionException

Locations: `visionportal/color-blob-locator.mdx:143,157,227,288`.

`Blob.getContourArea()` returns `int`. Java/Kotlin pass an Integer through telemetry's Object varargs. The float format `%.0f` is incompatible. Use `%d`:

```java
telemetry.addData("Area", "%d pixels", largest.getContourArea());
telemetry.addData("Area (px)", "%d", largest.getContourArea());
```

Evidence: `ColorBlobLocatorProcessor.java:354` declares `public abstract int getContourArea()`; `ColorBlobLocatorProcessorImpl.java:414–420` returns an integer; `sdk12/RobotCore/org/firstinspires/ftc/robotcore/internal/opmode/TelemetryImpl.java:133–134` calls String.format. `/tmp/crocodocs-audit-vision/FormatProbe.java` was run: `String.format("%.0f pixels", 250)` throws `IllegalFormatConversionException: f != java.lang.Integer`; `%d` prints `250 pixels`. This was a desktop JVM probe, not a robot telemetry test.

### V5 — High: Kotlin circle radius must be Int

Locations: `easyopencv/writing-pipelines.mdx:184,346`.

Replace radius `5.0` with `5` in both Kotlin circle calls. OpenCV Java exposes `circle(Mat, Point, int radius, Scalar, int thickness)`; Kotlin does not implicitly narrow a Double to Int. Point coordinates and Scalar channels should remain Double.

Evidence: `opencv-source/org/opencv/imgproc/Imgproc.java:8746`; [OpenCV Java Imgproc reference](https://docs.opencv.org/4.10.0/javadoc/org/opencv/imgproc/Imgproc.html). Source-checked; no Kotlin compiler was available for an actual Kotlin compile.

### V6 — High: wrong Moments package prevents custom VisionProcessor compiling

Locations: `visionportal/vision-portal.mdx:117,181`.

Replace both imports with `org.opencv.imgproc.Moments`. The rest of the Moments accesses are valid: Java has get_m00/get_m10 methods, and Kotlin can access public m00/m10 fields.

Evidence: versioned OpenCV source `opencv-source/org/opencv/imgproc/Moments.java:1–6` and [Moments API](https://docs.opencv.org/4.10.0/javadoc/org/opencv/imgproc/Moments.html). Confirmed by javac.

### V7 — Medium: locator HSV scaling statement and yellow range are wrong for SDK 12

Locations: `visionportal/color-blob-locator.mdx:33,45,61,198,259`.

The article says FTC ColorRange HSV uses hue 0–255 and scales the OpenCV teaching range from 15–40 to 21–57. The actual processor does not use HSV_FULL or rescale the supplied Scalars: `ColorBlobLocatorProcessorImpl.java:168–182` calls `Imgproc.COLOR_RGB2HSV` and immediately `Core.inRange` with the exact ColorRange min/max. For 8-bit camera frames, hue is 0–179 and saturation/value 0–255.

Use `Scalar(15, 60, 70)` to `Scalar(40, 255, 255)` in Java and `Scalar(15.0, 60.0, 70.0)` to `Scalar(40.0, 255.0, 255.0)` in Kotlin, consistently with the linked OpenCV demonstration. Replace the explanation with the correct ranges and the fact that the same color-space conversion is used here. Those bounds still need real-camera tuning. The original 21–57 bounds can select a substantially different yellow/green range.

Source: official versioned Vision archive + OpenCV source cited above. This finding intentionally resolves an apparent high-level tutorial assumption using implementation evidence.

### V8 — High: portal.close followed by Mat release can race processing

Locations: `visionportal/vision-portal.mdx:132–146,165–168,194–201,217–220,245–246,265–266`.

VisionPortalImpl.close() is asynchronous in FTC 12.0.0: `sdk12/Vision/org/firstinspires/ftc/vision/VisionPortalImpl.java:624–651` starts a new thread that calls `camera.closeCameraDevice()`. It returns before that work necessarily finishes. Immediately releasing hsv/mask can race `processFrame`, causing native use-after-release/invalid image operations. VisionProcessor has only init/processFrame/onDrawFrame; it has no automatic release callback.

A simple safe local fix does not need a polling loop: guard the custom processor's frame processing and release with the same lock, and make release terminal/idempotent. For Java:

```java
private boolean released;

@Override
public synchronized Object processFrame(Mat frame, long captureTimeNanos) {
    if (released) return null;
    // Existing RGB2HSV / inRange / moments computation.
    return null;
}

public synchronized void release() {
    if (released) return;
    released = true;
    centerX = Double.NaN;
    hsv.release();
    mask.release();
}
```

Kotlin equivalent: `private var released = false`, put `@Synchronized` on both `processFrame` and `release`, return null from processFrame when released, and set/reset fields under that lock. Keep the existing @Volatile centerX for OpMode reads. Use try/finally around the owner's loop so cleanup runs on exceptions:

```java
try {
    // Existing INIT loop.
} finally {
    portal.close();
    blueProcessor.release();
}
```

A release waits for an already-running callback via the processor lock; subsequent callbacks see released and touch no Mats. onDrawFrame is empty in this class, so it has no native buffer to protect. The Java processor with this guard compiled successfully (see `compile-lifecycle/BlueCenterProcessor.java` and `javac.log`). The thread-safety conclusion follows Java/Kotlin synchronization semantics and the inspected callback contract; no camera race stress test was performed.

### V9 — Medium: AprilTag pose output units do not follow metadata units

Location: `visionportal/apriltag-detection.mdx:188`.

Replace “Those numbers are distances in the tag library's distance unit” with “The translation and range use the processor's configured output distance unit; defaults are inches and degrees. SetOutputUnits controls this independently of the tag library's metadata units.” SDK 12 also records `detection.distanceUnit` for translations. Therefore the shown easy-default telemetry labels are correct; the general unit explanation is not.

Evidence: `AprilTagProcessor.java:81–82,166–170` defaults/configuration; `AprilTagProcessorImpl.java:284–287,326,345` converts metadata units into outputUnitsLength; `AprilTagDetection.java:64–69` documents frameAcquisitionNanoTime/distanceUnit. The FTC axes, rotation mappings, horizontal range, cluster parent class, percentClusterFound int formatting and single-tag null metadata guard otherwise match source.

### V10 — Medium: camera-basics fragments point to an undefined pipeline and error variable

Locations: `easyopencv/easyopencv-basics.mdx:35,47,61,88,104`.

The text says Writing Pipelines supplies PreviewPipeline, but that page supplies PollenTargetPipeline. Change the references and constructor calls to the actual class, or supply a real pass-through PreviewPipeline definition. `cameraError` is assigned in both callbacks but never declared, so the pasted fragments cannot compile unless readers invent it. Add an OpMode field with cross-thread visibility:

```java
private volatile String cameraError = "";
```

```kotlin
@Volatile private var cameraError = ""
```

Then show/read it in OpMode telemetry as the prose promises. Camera factory, createWebcam, setPipeline, asynchronous open callback and startStreaming signatures otherwise match EOCV 1.7.3.

### V11 — Medium: troubleshooting implies processors can be added to an already-built portal

Location: `advanced/troubleshooting.mdx:41`.

“Add a processor only after the camera opens” follows a processor-free build and implies dynamic attachment. Only Builder.addProcessor/addProcessors exist. VisionPortal exposes setProcessorEnabled for an already attached processor, not a runtime addProcessor. Say to verify the camera-only test, stop/close that test, then rebuild the OpMode's portal with the processor supplied to its Builder. Or attach the processor before build and initially disable it for an isolation test.

Evidence: `VisionPortal.java:259,283,358` API and `VisionPortalImpl.java:74–75,142–150` fixed processor array. The shown empty-processor portal itself is valid.

### V12 — Medium: current SDK sample name is stale

Locations: `visionportal/color-blob-locator.mdx:19,310`.

The current SDK 12 public sample is ConceptVisionColorLocator_Rectangle (and a separate _Circle sample), rather than ConceptVisionColorLocator. Name the Rectangle sample for the boxFit lesson, with a note that older SDKs used the unsuffixed sample name. This is discoverability rather than a Java API failure. Version-pinned sample URL above.

### V13 — Low: use the actual predominant-color processor name

Locations: `color-sensor-v3.mdx:12`; `vision-basics.mdx:45`.

`ColorProcessor` is not the FTC class name. Use `PredominantColorProcessor`, described as the camera “Color Sensor” processor, so readers can search/import the right type. Source: `sdk12/Vision/org/firstinspires/ftc/vision/opencv/PredominantColorProcessor.java`; [SDK 12 ColorSensor sample](https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/e14c2aeb33e84d4ea21697beeea9ac49557be870/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/external/samples/ConceptVisionColorSensor.java#L34).

### V14 — Low: frame and preview terminology should match implementation

Locations: `visionportal/vision-portal.mdx:133,195`; `easyopencv/easyopencv-basics.mdx:67`; `advanced/troubleshooting.mdx:48`.

VisionPortal's ProcessingPipeline forwards the EOCV RGBA input unchanged to VisionProcessor.processFrame (`VisionPortalImpl.java:439–457`). Say RGBA rather than RGB; RGB2HSV is still correct because it accepts four channels. In EOCV, cameraMonitorViewId is a local Robot Controller Android view container; it is not the Driver Station preview container. EOCV registers a CameraStreamServer source separately from the local viewport. The Driver Station Camera Stream does not inherently depend on a local monitor view. Source: `eocv173/.../OpenCvCameraBase.java:132,269`, factory implementations at `OpenCvCameraFactoryImpl.java:94–103`.

### V15 — Low: sensor alpha is synthesized by this SDK driver

Locations: `hardware/color-sensor-v3.mdx:51,66,79`.

REV's high-level material describes Alpha as clear light, but the FTC Broadcom driver computes raw alpha as the mean of its RGB values and normalized alpha using a brightness transformation of that mean; it does not read a separate clear channel for getNormalizedColors. For programming precision, label the telemetry “Alpha / brightness” and explain it is driver-derived. Color, normalized RGB, configuration, 2cm recommendation, LED switch, I2C address conflict and rough proximity guidance are otherwise supported. Source: `sdk12/Hardware/com/qualcomm/hardware/broadcom/BroadcomColorSensorImpl.java:291–301`; [REV application notes](https://docs.revrobotics.com/rev-crossover-products/sensors/color-sensor/application-examples).

### V16 — Low: pipeline-owned persistent Mats need a shutdown owner

Locations: `easyopencv/writing-pipelines.mdx:239–243,307–311`; lifecycle discussion in `easyopencv/easyopencv-basics.mdx:114–116`.

The per-frame hierarchy and contours are correctly released. The reused hsv/mask/blurred/kernel remain alive until eventual Java/native cleanup; the complete pipeline exposes no explicit release method. Teach that a pipeline's owner releases its own working Mats after processing has stopped, and never releases camera-owned input. EOCV OpenCvPipeline has no teardown callback, so this must be explicit in the owner. Its closeCameraDevice implementation stops streaming synchronously before returning (`eocv173/.../OpenCvWebcamImpl.java:207–220`); this differs from VisionPortal.close's asynchronous wrapper. Guard any release method if callbacks can still be active. Do not characterize the four reused Mats as an unbounded per-frame leak: they are reused correctly and Mat has a finalizer, but deterministic cleanup is absent.

## Page-by-page coverage

| Page | Java / Kotlin blocks | Source-review result |
| --- | ---: | --- |
| `advanced/troubleshooting.mdx` | 2 / 2 | V11 runtime-add wording and V14 preview terminology; empty portal build and filterByArea/filterByDensity signatures/order valid. Density ratio 0–1, coordinate/calibration cautions and Mat ownership guidance supported. |
| `advanced/vision-integration.mdx` | 4 / 4 | No independent API defect found. Fragments deliberately depend on locator setup/sorted list/frameWidth; route methods explicitly marked placeholders. Empty-list guard, image thirds, frozen selection and fallback logic are coherent. Multiple loop iterations are not proof of multiple fresh camera frames: a future temporal-confirmation implementation should count actual new frames, not polling iterations. No such counter is implemented here. |
| `color-sensor-v3.mdx` | 0 / 0 | V13 wrong camera processor name. This is a deliberate 14-line chooser/routing article, not a duplicate copy of the hardware lesson and not an empty placeholder. |
| `easyopencv/easyopencv-basics.mdx` | 2 / 2 | V1 nonexistent conversion in prose; V10 absent PreviewPipeline/cameraError; V14 local-versus-DS preview; V16 shutdown integration. SDK-bundled EOCV since 8.2 and no manual native library installation are supported. Async listener API valid. |
| `easyopencv/eocv-sim.mdx` | 1 / 0 | No substantive discrepancy found in checked scope. PassThroughPipeline compiles. Current VisionBench name, Java25 requirement, Gradle workspace menu, src/main/java, public non-final field tuner, hardware limitations, JVM-language/source-build guidance match author docs and selected source. Old eocv-sim tuner URL still resolves. |
| `easyopencv/writing-pipelines.mdx` | 6 / 6 | V1 fatal constant, V5 Kotlin radius, V16 persistent buffer lifecycle. Blur/morphology/findContours/boundingRect drawing APIs and per-frame native releases otherwise match OpenCV. Volatile center publication is appropriate; camera input is returned, not released. |
| `hardware/color-sensor-v3.mdx` | 4 / 4 | V15 alpha nuance. HardwareMap NormalizedColorSensor and DistanceSensor lookups are supported by RevColorSensorV3 implementing those interfaces; field/property accesses valid. Close-range and calibration caveats supported by REV. No hardware verification. |
| `hardware/webcam.mdx` | 0 / 0 | No substantive programming discrepancy found. UVC requirement, C270/C310/C920 support/calibration caveat, configuration-name mapping, mounting and pixel/pose distinction supported by current FIRST webcam documentation and SDK. |
| `vision-basics.mdx` | 0 / 0 | V13 wrong predominant-color API name. HSV0–179 statement, image axes and pixel-versus-field distinction are correct. |
| `vision-overview.mdx` | 0 / 0 | No substantive discrepancy found. Options, version/season cautions, processing-load and freshness advice match inspected APIs. “Check confidence” is generic advice: percentClusterFound is tag visibility percentage, not calibrated probabilistic confidence. |
| `visionportal/apriltag-detection.mdx` | 4 / 4 | V9 output-unit explanation. SDK12 single/cluster types and shared ftcPose validated. SDK processor only constructs cluster detections from known cluster metadata, so the shown cluster.metadata.name access matches actual factory behavior; no speculative missing-null-guard finding. Single metadata/pose checks are correct. XYZ/PRY/range/bearing/elevation mapping supported. |
| `visionportal/color-blob-locator.mdx` | 5 / 5 | V2 wrong import, V3 wrong enum, V4 runtime format, V7 HSV scaling, V12 renamed sample. Builder signatures, ColorRange constructor, ImageRegion.entireFrame, mutable getBlobs result, filtering, bounding-fit access, empty guard and image-space semantics valid. |
| `visionportal/vision-portal.mdx` | 4 / 4 | V6 wrong Moments package; V8 asynchronous close/native-release race; V14 frame terminology. Processor interface callbacks, volatile result, null/no-detection logic, builder/easyCreateWithDefaults and registration behavior valid. |

No assigned page is an empty “coming soon” placeholder. The similarly named root/hardware color-sensor articles are a chooser and a lesson, respectively. Route methods in the autonomous lesson are explicitly documented stand-ins, not falsely presented as SDK functions.

## Verification actually performed

1. Read all 13 pages and all 63 code fences; compared API calls/types against the official FTC12 source archives and EOCV/OpenCV sources, and selected author-source/doc checks for VisionBench.
2. JDK 17.0.18 and Android SDK android-36 were available. Downloaded actual FTC Vision/RobotCore/Hardware12 AARs and EasyOpenCV1.7.3 AAR, extracted classes.jar to `compile-libs`. The large OpenCV binary AAR download was stopped; compilation used the official versioned OpenCV Java sources instead, via javac -sourcepath. No native library was loaded.
3. Extracted the original complete Java classes verbatim into `compile-original/<Class>/<Class>.java`. Original results: PassThroughPipeline exit0; BlueCenterProcessor exit1 (Moments import); GuidedColorLocator exit1 (WebcamName import, nested SortOrder); PollenTargetPipeline exit1 (RGBA2HSV constant). Logs are beside each class at `javac.log`.
4. Applied only the necessary symbol/package corrections to temporary copies under `compile-corrected`. All four classes then compiled with exit0. These temporary copies are validation aids, not a claim that the product pages have been repaired. They do not include every prose/lifecycle/formatting improvement above.
5. Ran FormatProbe with Java17. Its expected exception demonstrates V4 independently of Android or a connected robot.
6. GET-checked all 33 distinct external URLs found in the 13 pages; all returned successful responses. Results are in `link-checks.json`. No broken external link was found. A successful GET does not validate the article's whole content or every linked image.
7. No Kotlin compiler was installed, and no Kotlin snippets were compiled. Kotlin findings are source/signature inspection. No complete FTC Android Gradle project build, RC deployment, camera preview, stream-stop race test, VisionBench GUI exercise, robot, REV sensor, field or hardware test was performed.

Reusable Java compile invocation (one class at a time):

```sh
javac -Xlint:none \
  -classpath '/tmp/crocodocs-audit-vision/compile-libs/*:/Users/matthew/Library/Android/sdk/platforms/android-36/android.jar' \
  -sourcepath /tmp/crocodocs-audit-vision/opencv-source \
  -d /tmp/crocodocs-audit-vision/recheck-classes \
  /tmp/crocodocs-audit-vision/compile-original/PollenTargetPipeline/PollenTargetPipeline.java
```

The original should fail until V1 is corrected; swap in a compile-corrected path to verify the API correction. Avoid treating this Java signature compile as an Android build or an operational vision test.
