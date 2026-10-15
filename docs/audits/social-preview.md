# Social preview verification

**ACCEPT** for the social card and disabled-playground release changes.

The 1200×630 composition was inspected in Chromium after the local Haettenschweiler and Open Sans fonts and original croc SVG loaded. The PNG retains the established crimson, charcoal, italic wordmark, and mascot. It weighs about 212 KiB, is loaded by social crawlers, and adds no visible-page image or JavaScript request. Its editable HTML source is checked in.

The production build and all 103 MDX checks pass. Eight generated HTML pages were inspected: home, Engineering, Portfolio, and the five introductory pages with paused playgrounds. Each has the correct absolute social-image URL and large-image Twitter card. Articles have their own share title, description, and canonical URL. No iframe or playground header renders in these pages. The article instructions and headings are commented out together with each embed.

Existing reading-workspace acceptance is recorded in `docs/brand-theme.md` and the portfolio verification. No shared visual token, search, theme-switch behavior, or navigation contract changed in this final pass. This is Chromium and generated-HTML evidence; external social-network cache refreshes are not controlled by this repository.
