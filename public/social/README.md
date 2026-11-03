# Social preview

CrocoDocs generates 1200×630 Open Graph and Twitter cards with the existing mascot, slanted Haettenschweiler wordmark, and Open Sans. The composition has a page title and description, with no section list or bottom footer.

The shared renderer is `src/lib/social-image.tsx`, using Next.js ImageResponse. `/api/og?path=/docs/design/design-brief` looks up that article's title and description in the documentation source. `/api/og` renders the homepage card. Unknown pages return 404. Font and artwork files are read locally; rendering needs no external service or additional dependency.

Metadata lives in `src/lib/social-metadata.ts`. Its image URL includes the canonical page path and a content fingerprint, so changing the page title or description produces a new share-image URL. Bump the renderer version prefix there after changing the composition. Open Graph and Twitter use the same image.

`crocodocs.png` is retained as a static homepage fallback for existing image links. Refresh it from the deployed `/api/og` endpoint after changing the shared renderer. Font provenance and licenses are recorded in `public/fonts/README.md`.
