import { fmt, rich } from "@/lib/i18n/rich";
import { getT } from "@/lib/i18n/server";
import { nav, site, socialLinks } from "@/lib/site";
import { SocialIcon } from "./SocialIcons";
import Link from "./LocaleLink";
import Logo from "./Logo";
import Marquee from "./Marquee";

export default async function Footer() {
  const { t } = await getT();
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div aria-hidden="true" className="kente h-2 w-full" />
      <Marquee
        items={t.footer.marquee}
        className="border-b border-cream/10 py-6 font-display text-[clamp(2.25rem,7vw,6rem)] md:py-8 font-extrabold tracking-tight text-cream/90"
        speed="55s"
      />
      <div className="container-x grid grid-cols-2 gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-16">
        <div className="col-span-2 md:col-span-5">
          <Logo className="h-24 w-auto" />
          <p className="mt-6 max-w-sm text-cream/70">
            {rich(t.footer.tagline)}
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((sl) => (
              <li key={sl.key}>
                <a
                  href={sl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={fmt(t.common.onSocial, { network: sl.label })}
                  title={sl.label}
                  className="grid size-12 place-items-center rounded-full ring-1 ring-cream/20 transition-colors hover:bg-sun hover:text-ink hover:ring-sun"
                >
                  <SocialIcon name={sl.key} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label={t.footer.nav} className="col-span-2 md:col-span-3">
          <h2 className="eyebrow mb-5 text-sun">{t.footer.explore}</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:block md:space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-u text-cream/80 hover:text-cream">{t.common.nav[n.key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-2 md:col-span-4">
          <h2 className="eyebrow mb-5 text-sun">{t.footer.getInTouch}</h2>
          <ul className="space-y-3 text-cream/80">
            <li><a className="link-u" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className="link-u" href={`tel:${site.phoneHref}`}>{site.phone}</a></li>
            {t.common.locations.map((l) => <li key={l}>{l}</li>)}
          </ul>
          <Link href="/contact?topic=partner" className="mt-8 inline-block font-display text-2xl font-bold text-sun link-u">
            {t.footer.partner}
          </Link>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-3 border-t border-cream/10 py-6 text-sm text-cream/50 sm:flex-row">
        <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
        <div className="flex flex-col gap-1 sm:items-end">
          <p>{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}

export function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return <SocialIcon name="instagram" className={className} />;
}
