import type { NextRequest } from "next/server";
import { source } from "@/lib/source";
import { siteDescription } from "@/lib/social-metadata";
import { createSocialImage } from "@/lib/social-image";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";

  if (path === "/") {
    return createSocialImage("The FTC handbook", siteDescription);
  }

  if (path !== "/docs" && !path.startsWith("/docs/")) {
    return new Response("Page not found", { status: 404 });
  }

  const slug = path === "/docs" ? [] : path.slice("/docs/".length).split("/");
  const page = source.getPage(slug);
  if (!page) return new Response("Page not found", { status: 404 });

  return createSocialImage(page.data.title, page.data.description ?? siteDescription);
}
