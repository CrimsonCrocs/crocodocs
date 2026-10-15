import type { Metadata } from "next";

export const siteUrl = new URL("https://crocodocs.crimsoncrocs.org");
export const siteDescription = "A student-written guide to FIRST Tech Challenge engineering, programming, portfolios, and judging, with practical explanations and Inspire case studies.";

export function socialMetadata(title: string, description: string, path = "/"): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const image = {
    url: "/social/crocodocs.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "CrocoDocs: engineering, programming, and portfolios for FIRST Tech Challenge, with the Crimson Crocs crocodile reading a book.",
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
