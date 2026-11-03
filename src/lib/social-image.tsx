import React from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const assets = Promise.all([
  readFile(join(process.cwd(), "public/fonts/haettenschweiler.ttf")),
  readFile(join(process.cwd(), "public/fonts/open-sans-regular.ttf")),
  readFile(join(process.cwd(), "public/fonts/open-sans-600.ttf")),
  readFile(join(process.cwd(), "public/crocodocs.svg")),
]);

export async function createSocialImage(title: string, description: string) {
  const [displayFont, bodyFont, headingFont, mascot] = await assets;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#171719",
          color: "#faf9f7",
          fontFamily: "Open Sans",
          borderLeft: "10px solid #e43437",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            left: 60,
            top: 60,
            fontFamily: "Croc",
            fontSize: 90,
            lineHeight: 1,
            textTransform: "uppercase",
            transform: "skewX(-12deg)",
            transformOrigin: "left bottom",
          }}
        >
          Croco<span style={{ color: "#f15b5e" }}>Docs</span>
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            left: 60,
            top: 218,
            width: 650,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: title.length > 24 ? 64 : 76,
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-2px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 28,
              lineHeight: 1.45,
              color: "#d3d1d4",
            }}
          >
            {description}
          </div>
        </div>
        {/* ImageResponse renders the supplied SVG directly, without next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;base64,${mascot.toString("base64")}`}
          alt=""
          width={400}
          height={336}
          style={{ position: "absolute", right: 30, top: 168 }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Croc", data: displayFont, weight: 400, style: "normal" },
        { name: "Open Sans", data: bodyFont, weight: 400, style: "normal" },
        { name: "Open Sans", data: headingFont, weight: 600, style: "normal" },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
