import localFont from "next/font/local";
import "@/app/global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import type { Metadata } from "next";

const poppins = localFont({
  src: [
    { path: "../../public/fonts/poppins-400.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/poppins-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/poppins-600.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/poppins-700.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/poppins-800.ttf", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "CrocoDocs — FTC Robotics Programming Guide",
    template: "%s | CrocoDocs",
  },
  description: "A student-written guide to FIRST Tech Challenge robot programming, control systems, vision, and FTC libraries.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
