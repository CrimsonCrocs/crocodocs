import type { Metadata } from "next";
import { createHash } from "node:crypto";

export const siteUrl = new URL("https://crocodocs.crimsoncrocs.org");
export const siteDescription = "A student-written guide to FIRST Tech Challenge engineering, programming, portfolios, and judging, with practical explanations and Inspire case studies.";

export function socialMetadata(title: string, description: string, path = "/"): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const version = createHash("sha256").update(`2:${title}:${description}`).digest("hex").slice(0, 12);
  const parameters = new URLSearchParams({ path, v: version });
  const image = {
    url: `/api/og?${parameters}`,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: `${title} — ${description}`,
  };

  return {
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "CrocoDocs",
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
