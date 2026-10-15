# Crimson Crocs theme and reading workspace

CrocoDocs is a reference product for new and experienced FTC teams. The homepage introduces Engineering and Programming; the reading workspace lets a reader switch sections, find an article, and stay oriented while reading it.

## Identity

The user supplied the sibling Crimson Crocs website, its Call-a-Croc title, and the FTC emulator's Software Collection graphic as references. CrocoDocs retains its own name and mascot. There is no team subtitle under the wordmark.

- Haettenschweiler 400 with a 12-degree forward skew carries the CrocoDocs name. Open Sans 400–700, with real italics, carries reading text and sentence-case headings.
- Deep crimson, white/neutral gray, and charcoal remain the brand palette. Dark-mode small crimson text uses the lighter semantic primary already verified for contrast.
- The homepage uses the exact supplied Software Collection graphic. Asset/font provenance and notices are in `public/brand/README.md` and `public/fonts/README.md`.
- The larger article lockup includes a 40px-high croc and a 2.1rem wordmark. Its image margins are explicit so it sits properly within the opening sentence.

## Docs style contract

Intentional Build owns this structural refinement. My Taste and Intentional Style advise; Intentional Verify supplies the final acceptance gate. The earlier same-structure theme refinement used Polish.

The named reference is Mintlify's documentation, inspected as a rendered desktop reference on 2026-10-14. Its useful ideas are visible section navigation, a quiet reading canvas, clear search, and less visual competition around articles. Its green branding, decorative artwork, assistant product, and font choices are not transferred.

The bespoke profile uses:

| Element | Delivered treatment |
| --- | --- |
| Header | 64px brand/search row plus 44px Programming/Engineering row |
| Sections | Real route links, Phosphor braces/gear, active crimson underline, `aria-current` |
| Search | Familiar search button with platform shortcut, existing indexed search and keyboard selection |
| Sidebar | 272px desktop, 248px tablet, same canvas as article, restrained separator and selection tint |
| Article | Up to 740px reading measure inside an 844px article; 15px prose at 1.8 line height; 28–36px title, 23px H2 |
| Contents | Quiet 220px desktop rail; existing mobile/tablet contents disclosure |
| Reading surfaces | 10–12px corners, inset code/notes, no callout shadows, cards reserved for linked topic regions |
| Mobile | 20px article inset, 44px header controls, full-height scrollable navigation and appearance control |
| Motion | 180ms article opacity entrance; 100–150ms overlay fades; 150ms color changes; existing disclosure height motion |

The two signature mechanisms are the skewed mascot/name lockup and crimson section selection. Long-form text remains calm and readable. No new interface dependency, idle animation, spring, lift, slide, blur entrance, assistant, or invented status was added. Reduced motion removes entrance duration. Forced colors retain native adaptation.

Fumadocs supplies content loading, search, page trees, accessible primitive behavior, and article utilities. CrocoDocs owns the header, section navigation, sidebar composition, typography, spacing, surfaces, and motion treatment. Existing documentation URLs remain.

## My Taste and Intentional Style evaluation

The two sections are visible without opening a switcher. Search is prominent for experienced readers; the sidebar exposes a beginner progression. The reading measure and neutral surfaces reduce visual competition with diagrams and code. Open Sans respects the established Crimson Crocs reading identity while the wordmark provides the display character.

The audit repaired introduced implementation issues: card styling originally also matched Fumadocs' empty `data-card` heading anchors, and mobile focus initially ran before the drawer was visible. Real cards now use `[data-card="true"]`; headings align with body text. The forced-colors active-section marker uses CanvasText, and the selected sidebar row keeps a system-color outline. The drawer waits for its visible frame before focusing Close, traps Tab/Shift-Tab, supports Escape, makes background content inert, locks page scroll, and restores focus. Crossing to the desktop breakpoint closes it.

The deterministic detector returns no findings with or without repository configuration. The advisory prose/design scan reports pre-existing unused placeholder/drawer/card/spinner patterns plus intentional navigation underlines and semantic callouts. No scan ignore or waiver was introduced.

## Verification basis

This is local Chromium/macOS acceptance, not cross-browser release certification. The initial theme/homepage/font/collection-graphic evidence from the previous refinement remains applicable because those surfaces and assets did not change in this reading-workspace revision.

Current checks include:

- 84 MDX articles pass syntax, local links, image, and navigation checks.
- TypeScript check and production build pass. Homepage remains 173 B / 109 kB first-load JS; the docs route is 42.8 kB / 182 kB first-load JS in the measured build.
- Current light-mode reading views at 320, 430, 768, 1280, and 1600 CSS pixels have no document-width overflow. They cover equations, game tables, Engineering text, code, and the introductory lockup. A representative narrow math view has no KaTeX errors.
- Dark-mode desktop, tablet, and narrow-mobile views were also inspected. Main text, icons, active state, and code remain legible. No theme-role or font change was introduced after the earlier measured contrast pass.
- The 320px drawer's close focus, Tab/Shift-Tab cycle, Escape, scroll lock, background inertness, and trigger focus return were exercised. Appearance remains available inside the mobile drawer.
- Search finds the new Feedforward article and related source text. Keyboard selection and result navigation are exercised through the existing search dialog.
- Heading text is short and literal in both sections; the transfer article's old verbose fragment IDs still reach its simplified headings.
- Reduced-motion emulation was used for responsive checks where hidden-browser paint throttling affected default entrance screenshots. Default opacity motion was inspected separately. Viewport/media overrides are reset at the end.

The shared T3 preview repeatedly timed out and once returned tiled screenshots with mismatched dimensions. Chrome's extension then disconnected. Browser Harness supplied the final browser evidence; a dedicated existing-Chrome window avoided background tab interference. No browser security settings were changed.

Earlier browser-resolved contrast measurements remain valid for unchanged semantic colors:

| Foreground/background | Ratio |
| --- | ---: |
| Light primary text/canvas | 14.56:1 |
| Light secondary text/card | 5.55:1 |
| Light crimson/card | 6.71:1 |
| Dark primary text/canvas | 15.58:1 |
| Dark secondary text/secondary surface | 7.10:1 |
| Dark crimson/accent surface | 4.55:1 |
| White action label/deep crimson | 7.38:1 |

Firefox/WebKit, physical phones, screen-reader operation, independent browser text enlargement, and production field Core Web Vitals are untested. A 320px layout check is reflow evidence, not a claim that those checks occurred. Code/source verification and hardware limits are documented separately in [the programming audit](programming-audit.md).

## Final acceptance

**ACCEPT** for the requested local reading-workspace and brand scope. The final production build passes after the heading-anchor and forced-colors repairs. The final forced-colors check shows a white active marker on the black canvas and a solid selected-row outline. DPR2 light/dark screenshots were inspected; viewport and media overrides were reset. Search keyboard navigation reaches `/docs/control-systems/feedforward`. All 84 full article responses pass, and no runtime exception or failed network request was recorded during the final normal article inspection.

The development server is running on port 3000. Changes remain local. Current visual evidence: `/tmp/crocodocs-final-light.png`, `/tmp/crocodocs-final-dark.png`, `/tmp/crocodocs-mobile-menu-final.png`, and `/tmp/crocodocs-forced-colors-final.png`. Temporary screenshots are inspection evidence, not app dependencies.
