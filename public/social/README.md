# Social preview

`crocodocs.png` is the 1200×630 Open Graph and Twitter card for CrocoDocs. The artwork uses the existing CrocoDocs mascot, supplied Haettenschweiler font, Open Sans, and the project's Phosphor icons. It contains no generated robot or invented product screenshot.

The editable composition is `scripts/social-preview.html`. Serve the repository root locally, open that file at a 1200×630 viewport, wait for local fonts and the mascot to load, and export a PNG at that size. The checked-in image was rendered at DPR 2 and reduced to 1200×630. No extra browser or image package is needed by the deployed site.

Metadata lives in `src/lib/social-metadata.ts`. Both the homepage and individual articles use this image; articles supply their own title, description, and canonical URL under `https://crocodocs.crimsoncrocs.org`.
