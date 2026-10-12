import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionRoot from "@/components/MotionRoot";
import { fontVars } from "@/lib/fonts";
import { hasLocale, htmlLang, locales } from "@/lib/i18n/config";
import { dictFor, pageMeta } from "@/lib/i18n/server";
import { site, socialLinks } from "@/lib/site";
import "../globals.css";

/** Both languages are prerendered. (No `dynamicParams = false` here — it would also block new event pages.) */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictFor(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: "%s · WaawAfrica" },
    ...pageMeta(lang, "/", undefined, t.meta.description),
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = { themeColor: "#0c0a07", colorScheme: "dark" };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = dictFor(lang);
  return (
    <html lang={htmlLang[lang]} className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "WaawAfrica Events",
              url: site.url,
              logo: `${site.url}/images/logo.png`,
              email: site.email,
              telephone: site.phoneHref,
              sameAs: socialLinks.map((s) => s.url),
            }),
          }}
        />
        <a href="#main" className="sr-only fixed left-4 top-4 z-[200] rounded-full bg-sun px-5 py-3 font-bold text-ink focus:not-sr-only">
          {t.common.skip}
        </a>
        <Header
          locale={lang}
          t={{
            nav: t.common.nav,
            joinUs: t.common.joinUs,
            homeAria: t.common.homeAria,
            openMenu: t.common.openMenu,
            closeMenu: t.common.closeMenu,
            mainNav: t.common.mainNav,
            mobileNav: t.common.mobileNav,
            language: t.common.language,
            langNames: t.common.langNames,
            newTab: t.common.newTab,
          }}
        />
        <main id="main">{children}</main>
        <Footer />
        <MotionRoot />
      </body>
    </html>
  );
}
