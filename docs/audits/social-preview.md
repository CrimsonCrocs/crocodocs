# Social cards — 3 November 2026

Focused Intentional Verify: **ACCEPT** for the simplified, page-specific cards.

- One Next.js ImageResponse renderer produces 1200×630 PNGs. Keep the original croc, slanted Haettenschweiler wordmark, charcoal background, and crimson accent. Remove the section list and entire bottom footer.
- The homepage and each article point Open Graph and Twitter to `/api/og`, using the canonical page path and a fingerprint of the share title/description. The endpoint looks up the actual document title and description; it does not accept arbitrary image copy. Unknown pages return 404.
- Preview `dpl_AV9y6ruPicCdNS4krFgSZ2kkqmYq`, commit `50dd862`, passes the production build, type checks, and lint. Four actual cards were downloaded and visually inspected: homepage, Plan your mechanism, the longest article title, and the longest article description. All render distinct 1200×630 PNGs with complete readable text and no overlap or footer. Both share tags point to the correct page image.
- Cards weigh approximately 96–105 KB in the checked samples. Fonts and artwork are local to the server-side renderer; no external rendering service or new dependency was added. Existing browser font loading and page UI are unchanged. Static `public/social/crocodocs.png` is refreshed from the rendered homepage card for old image links.
- Evidence: ignored `.agents/work/social-cards/preview/` contains the four PNGs and metadata checks. The Vercel preview is protected; downloads used its existing authorized temporary share access, without changing project protection or storing access values in the repository.

No social-network cache refresh is claimed. New metadata image URLs include a content fingerprint; external platforms choose when they re-fetch an already shared URL. The original static-card verification below is retained as history and describes the earlier implementation.

# Original static-card verification (historical)

**ACCEPT** for the social card and disabled-playground release changes.

The 1200×630 composition was inspected in Chromium after the local Haettenschweiler and Open Sans fonts and original croc SVG loaded. The PNG retains the established crimson, charcoal, italic wordmark, and mascot. It weighs about 212 KiB, is loaded by social crawlers, and adds no visible-page image or JavaScript request. Its editable HTML source is checked in.

The production build and all 103 MDX checks pass. Eight generated HTML pages were inspected: home, Engineering, Portfolio, and the five introductory pages with paused playgrounds. Each has the correct absolute social-image URL and large-image Twitter card. Articles have their own share title, description, and canonical URL. No iframe or playground header renders in these pages. The article instructions and headings are commented out together with each embed.

Existing reading-workspace acceptance is recorded in `docs/brand-theme.md` and the portfolio verification. No shared visual token, search, theme-switch behavior, or navigation contract changed in this final pass. This is Chromium and generated-HTML evidence; external social-network cache refreshes are not controlled by this repository.
