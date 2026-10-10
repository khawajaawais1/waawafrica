import Link from "next/link";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div aria-hidden="true" className="kente h-2 w-full" />
      <Marquee
        items={["Say Waaw", "Be Multicultural", "Culture", "Entertainment", "Community", "Dakar ↔ Jyväskylä"]}
        className="border-b border-cream/10 py-6 font-display text-[clamp(2.25rem,7vw,6rem)] md:py-8 font-extrabold tracking-tight text-cream/90"
        speed="55s"
      />
      <div className="container-x grid grid-cols-2 gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-16">
        <div className="col-span-2 md:col-span-5">
          <Logo className="h-24 w-auto" />
          <p className="mt-6 max-w-sm text-cream/70">
            “Waaw” means <em className="accent text-sun">yes</em> in Wolof. Yes to rhythm, to roots, and to each other.
          </p>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full px-5 py-3 font-semibold ring-1 ring-cream/20 transition-colors hover:bg-cream hover:text-ink"
          >
            <InstagramIcon /> {site.socials.instagramHandle}
            <span className="sr-only"> on Instagram (opens in a new tab)</span>
          </a>
        </div>
        <nav aria-label="Footer" className="col-span-2 md:col-span-3">
          <h2 className="eyebrow mb-5 text-sun">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:block md:space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-u text-cream/80 hover:text-cream">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-2 md:col-span-4">
          <h2 className="eyebrow mb-5 text-sun">Get in touch</h2>
          <ul className="space-y-3 text-cream/80">
            <li><a className="link-u" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className="link-u" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
            {site.locations.map((l) => <li key={l}>{l}</li>)}
          </ul>
          <Link href="/contact?topic=partner" className="mt-8 inline-block font-display text-2xl font-bold text-sun link-u">
            Partner with us →
          </Link>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-3 border-t border-cream/10 py-6 text-sm text-cream/50 sm:flex-row">
        <p>© {new Date().getFullYear()} WaawAfrica Events. Culture · Entertainment · Community.</p>
        <p>Made with rhythm in Finland & Senegal.</p>
      </div>
    </footer>
  );
}

export function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
