import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HideOnAdmin from "@/components/HideOnAdmin";
import MotionRoot from "@/components/MotionRoot";
import { site } from "@/lib/site";
import "./globals.css";

const bricolage = localFont({ src: "./fonts/bricolage.woff2", variable: "--font-bricolage", weight: "200 800", display: "swap" });
const fraunces = localFont({ src: "./fonts/fraunces-italic.woff2", variable: "--font-fraunces", style: "italic", weight: "100 900", display: "swap" });
const manrope = localFont({ src: "./fonts/manrope.woff2", variable: "--font-manrope", weight: "200 800", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "WaawAfrica — Culture, Events & Community", template: "%s · WaawAfrica" },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "WaawAfrica",
    title: "WaawAfrica — Say yes to culture",
    description: site.description,
    images: [{ url: "/images/og-logo.png", width: 512, height: 512, alt: "WaawAfrica Events logo" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0c0a07", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only fixed left-4 top-4 z-[200] rounded-full bg-sun px-5 py-3 font-bold text-ink focus:not-sr-only">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <HideOnAdmin><Footer /></HideOnAdmin>
        <MotionRoot />
      </body>
    </html>
  );
}
