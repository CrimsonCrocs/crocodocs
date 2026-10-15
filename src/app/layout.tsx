import localFont from "next/font/local";
import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { siteDescription, siteUrl, socialMetadata } from "@/lib/social-metadata";
import { Analytics } from "@vercel/analytics/next";

const openSans = localFont({
  src: [
    { path: "../../public/fonts/open-sans-normal-latin.woff2", weight: "400 700", style: "normal" },
    { path: "../../public/fonts/open-sans-italic-latin.woff2", weight: "400 700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-open-sans",
});

const crocDisplay = localFont({
  src: "../../public/fonts/haettenschweiler.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-croc-display",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "CrocoDocs — FTC Engineering, Programming, and Portfolios",
    template: "%s | CrocoDocs",
  },
  description: siteDescription,
  ...socialMetadata("CrocoDocs — The FTC handbook", siteDescription),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${openSans.variable} ${crocDisplay.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          {children}
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
