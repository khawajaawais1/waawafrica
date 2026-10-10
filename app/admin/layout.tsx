import type { Metadata, Viewport } from "next";
import { fontVars } from "@/lib/fonts";
import { site } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Admin · WaawAfrica", template: "%s · Admin · WaawAfrica" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0c0a07" };

/** Separate root layout for the team area (English only, no public header/footer). */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <div className="min-h-svh bg-cream text-ink">{children}</div>
      </body>
    </html>
  );
}
