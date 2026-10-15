# Link audit

Checked 2026-10-15T11:48:08Z against release `23dd005`.

## Scope

Traced all 106 documentation articles and the homepage. The source inventory contains 793 links and 311 distinct external URLs. The rendered crawl checked 1,315 distinct URLs including fragments, fetched 510 destinations after deduplication, followed redirects, and checked HTML section IDs. Images, playground iframe URLs, navigation, and footer links are included. Code fences and comment-only URLs are excluded.

## Outcome

Replaced 48 broken-link occurrences: 47 internal links across six overview pages and the official programming-resource link in the footer. These represent 47 distinct old URLs. Every intended resource has a working replacement, so no article, citation, or resource entry needed to be deleted.

The overview pages used relative paths that were valid as file references but resolved against the folder URL incorrectly in the rendered site. Seven distinct internal targets returned HTTP 404; 38 other target paths returned a generic page shell with HTTP 200 and no article, including a broken Slothboard fragment. This is why an HTTP-status-only check was insufficient.

## Every replaced link

The “old destination” column records the URL a reader actually reached. Paths in this table are relative to the CrocoDocs domain. Repeated rows identify separate occurrences.

| Page / component | Link | Old destination | Replacement | Why the old link was removed |
| --- | --- | --- | --- | --- |
| `content/docs/autonomous/index.mdx:9` | current season guide | `/season-breakdown` | `/docs/season-breakdown` | The relative link resolved outside its article folder and returned HTTP 404. |
| `content/docs/autonomous/index.mdx:35` | Time-based and encoder-based movement | `/docs/time-vs-encoder` | `/docs/autonomous/time-vs-encoder` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/autonomous/index.mdx:36` | Odometry | `/docs/odometry` | `/docs/autonomous/odometry` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/autonomous/index.mdx:37` | Motion planning | `/docs/motion-planning` | `/docs/autonomous/motion-planning` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/autonomous/index.mdx:38` | Pure Pursuit | `/docs/pure-pursuit` | `/docs/autonomous/pure-pursuit` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/autonomous/index.mdx:39` | Sensor fusion | `/docs/sensor-fusion` | `/docs/autonomous/sensor-fusion` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/autonomous/index.mdx:40` | Current FTC season | `/season-breakdown` | `/docs/season-breakdown` | The relative link resolved outside its article folder and returned HTTP 404. |
| `content/docs/cegp/index.mdx:40` | Naming conventions | `/docs/naming-conventions` | `/docs/cegp/naming-conventions` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/cegp/index.mdx:41` | Code organization | `/docs/code-organization` | `/docs/cegp/code-organization` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/cegp/index.mdx:42` | Formatting | `/docs/formatting` | `/docs/cegp/formatting` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/cegp/index.mdx:43` | Comments and documentation | `/docs/comments` | `/docs/cegp/comments` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/cegp/index.mdx:44` | Team collaboration | `/docs/team-collaboration` | `/docs/cegp/team-collaboration` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/community-software/index.mdx:13` | Blaze FTC | `/docs/blaze-ftc` | `/docs/community-software/blaze-ftc` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/community-software/index.mdx:14` | OpenLoop | `/docs/openloop` | `/docs/community-software/openloop` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/community-software/index.mdx:15` | Hive Vision | `/docs/hive-vision` | `/docs/community-software/hive-vision` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/community-software/index.mdx:17` | Libraries | `/libraries` | `/docs/libraries` | The relative link resolved outside its article folder and returned HTTP 404. |
| `content/docs/control-systems/index.mdx:35` | Joystick mapping | `/docs/joystick-mapping` | `/docs/control-systems/joystick-mapping` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/control-systems/index.mdx:36` | PID control | `/docs/pid-control` | `/docs/control-systems/pid-control` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/control-systems/index.mdx:37` | Motion profiling | `/docs/motion-profiling` | `/docs/control-systems/motion-profiling` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/control-systems/index.mdx:38` | Low-pass filtering | `/docs/lowpass-filter` | `/docs/control-systems/lowpass-filter` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/control-systems/index.mdx:39` | Kalman filtering | `/docs/kalman-filter` | `/docs/control-systems/kalman-filter` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/control-systems/index.mdx:43` | Feedforward | `/docs/feedforward` | `/docs/control-systems/feedforward` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/control-systems/index.mdx:45` | system identification | `/docs/system-identification` | `/docs/control-systems/system-identification` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/getting-started/index.mdx:27` | Blocks | `/docs/blocks` | `/docs/getting-started/blocks` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/getting-started/index.mdx:28` | OnBot Java | `/docs/onbot-java` | `/docs/getting-started/onbot-java` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/getting-started/index.mdx:29` | Android Studio | `/docs/android-studio` | `/docs/getting-started/android-studio` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/getting-started/index.mdx:33` | Your first OpMode | `/docs/first-opmode` | `/docs/getting-started/first-opmode` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/getting-started/index.mdx:33` | Java basics | `/docs/java-basics` | `/docs/getting-started/java-basics` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/getting-started/index.mdx:33` | Motors and servos | `/docs/motors-and-servos` | `/docs/getting-started/motors-and-servos` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/getting-started/index.mdx:33` | Nonblocking code | `/docs/nonblocking-code` | `/docs/getting-started/nonblocking-code` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/getting-started/index.mdx:33` | Debugging robot code | `/docs/debugging` | `/docs/getting-started/debugging` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/getting-started/index.mdx:33` | limit-switch | `/sensors-and-vision/hardware/limit-switches` | `/docs/sensors-and-vision/hardware/limit-switches` | The relative link resolved outside its article folder and returned HTTP 404. |
| `content/docs/getting-started/index.mdx:33` | IMU | `/sensors-and-vision/hardware/imu` | `/docs/sensors-and-vision/hardware/imu` | The relative link resolved outside its article folder and returned HTTP 404. |
| `content/docs/libraries/index.mdx:15` | Pedro Pathing | `/docs/pedro-pathing` | `/docs/libraries/pedro-pathing` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:16` | Road Runner | `/docs/road-runner` | `/docs/libraries/road-runner` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:20` | NextFTC | `/docs/nextftc` | `/docs/libraries/nextftc` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:21` | Mercurial v2 | `/docs/mercurial-v2` | `/docs/libraries/mercurial-v2` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:22` | Mercurial v1 | `/docs/mercurial` | `/docs/libraries/mercurial` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:23` | FTCLib | `/docs/ftclib` | `/docs/libraries/ftclib` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:24` | SolversLib | `/docs/solverslib` | `/docs/libraries/solverslib` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:28` | FTC Dashboard | `/docs/ftc-dashboard` | `/docs/libraries/ftc-dashboard` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:29` | Panels | `/docs/panels` | `/docs/libraries/panels` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:30` | Sloth | `/docs/sloth` | `/docs/libraries/sloth` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:31` | Slothboard | `/docs/sloth#slothboard` | `/docs/libraries/sloth#slothboard` | The relative link dropped the article folder and led to a generic page shell (HTTP 200) with no matching article. |
| `content/docs/libraries/index.mdx:35` | EasyOpenCV | `/sensors-and-vision/easyopencv/easyopencv-basics` | `/docs/sensors-and-vision/easyopencv/easyopencv-basics` | The relative link resolved outside its article folder and returned HTTP 404. |
| `content/docs/libraries/index.mdx:36` | VisionPortal and AprilTags | `/sensors-and-vision/vision-overview` | `/docs/sensors-and-vision/vision-overview` | The relative link resolved outside its article folder and returned HTTP 404. |
| `content/docs/libraries/index.mdx:38` | Community software | `/community-software` | `/docs/community-software` | The relative link resolved outside its article folder and returned HTTP 404. |
| `src/components/footer.tsx:19` | Official FTC resources | `https://ftc-resources.firstinspires.org/ftc/programming` | `https://ftc-docs.firstinspires.org/en/latest/programming_resources/index.html` | The former FTC resources URL returns HTTP 404. FIRST's official programming documentation index is available and provides the intended setup resources. |

## Links retained after verification

- `https://ftconshape.com/` returned HTTP 403 to the automated request. The live browser opened “Using Onshape for FTC” and its parts-library navigation successfully; a separate web fetch also succeeded. Both existing links remain. This was an access restriction on the request, not a dead resource.
- The pinned NextFTC KalmanFilter source link ending in `#L131-L141` has no literal `L131` / `L141` IDs in its initial HTML. GitHub handles line ranges in the client: the browser displayed the source and highlighted all eleven requested lines, with `LC131` and `LC141` present. The link remains unchanged.
- All four linked Google Drive portfolios returned their named PDF viewer pages without redirecting to a sign-in page. Their source links remain.

## Verification

- Initial requests, including internal pages and assets: 501 HTTP 200, eight HTTP 404, one HTTP 403 across all 510 fetched destinations. The 403 was resolved with browser verification as described above.
- The replacement FIRST programming index was already checked successfully as part of the initial crawl.
- All 106 MDX syntax, local-link, image, and navigation checks pass; the production build passes.
- Rechecked all 106 built documentation pages and the homepage: 1,268 distinct URLs/fragments and 464 destination URLs. Every local route, section fragment, and image target resolves; unchanged external URLs retain the passing initial evidence and the two browser-confirmed exceptions above. No unresolved link remains in this checked graph.
- A 390px browser click from Libraries reached the Slothboard section at `/docs/libraries/sloth#slothboard`. A desktop (1440px) click from Community software reached the Blaze FTC article. Focused Intentional Verify: **ACCEPT**. Production canary: pending.

Detailed URL-level results and dispositions are recorded in [link-audit.json](./link-audit.json).
