import Image from "next/image";
import Button from "./Button";
import Countdown from "./Countdown";
import Link from "./LocaleLink";
import { site } from "@/lib/site";
import { localizeHref } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";
import { dayLabel, dayNum, fullTitle, localizeEvent, monShort, timeRange, type EventItem } from "@/lib/event-types";

/** Big letters like “ANJ”, coloured green / yellow / red. */
function Badge({ text }: { text: string }) {
  const colors = ["text-leaf", "text-sun [-webkit-text-stroke:2px_var(--color-ink)]", "text-ember", "text-flame"];
  return (
    <p data-reveal className="font-display text-[clamp(4.5rem,18vw,10rem)] font-extrabold leading-none tracking-tighter">
      {text.split("").map((c, i) => (
        <span key={i} className={colors[i % colors.length]}>{c}</span>
      ))}
    </p>
  );
}

export async function PosterOrPlaceholder({ e: raw, sizes, className = "" }: { e: EventItem; sizes: string; className?: string }) {
  const { locale } = await getT();
  const e = localizeEvent(raw, locale);
  if (e.poster)
    return (
      <Image
        src={e.poster.url}
        alt={e.poster.alt}
        width={e.poster.width}
        height={e.poster.height}
        sizes={sizes}
        quality={70}
        className={`h-auto w-full ${className}`}
      />
    );
  return (
    <div className={`pattern-diamond grid aspect-[9/16] w-full place-items-center ${className}`}>
      <div className="rounded-3xl bg-ink/85 px-6 py-8 text-center">
        <p className="font-display text-6xl font-extrabold text-sun">{dayNum(e.startISO)}</p>
        <p className="eyebrow text-cream">{monShort(e.startISO, locale)}</p>
        <p className="mt-4 max-w-[12rem] font-display text-2xl font-extrabold text-cream">{e.title}</p>
      </div>
    </div>
  );
}

/** Full detail block for one event (events page + event detail page). */
export default async function EventFeature({ e: raw, headingLevel = "h2" }: { e: EventItem; headingLevel?: "h1" | "h2" }) {
  const { t, locale } = await getT();
  const e = localizeEvent(raw, locale);
  const H = headingLevel;
  const ticketUrl = e.ticketUrl || site.ticketsUrl;
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div data-reveal="scale" className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
        <PosterOrPlaceholder e={e} sizes="(min-width:1024px) 34vw, 90vw" className="rounded-[2rem] shadow-2xl shadow-ink/30" />
      </div>
      <div className="min-w-0 lg:col-span-7">
        {e.short && <Badge text={e.short} />}
        <H data-reveal className="mt-2 text-[clamp(2.2rem,6vw,3.75rem)] font-extrabold">
          {e.title} {e.subtitle && <span className="accent text-ember">{e.subtitle}</span>}
        </H>
        {e.description && <p data-reveal className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">{e.description}</p>}

        <dl data-reveal className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            [t.event.when, dayLabel(e.startISO, locale)],
            [t.event.time, timeRange(e)],
            [t.event.where, [e.venue, e.address].filter(Boolean).join(" · ")],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-ink/5 p-4 ring-1 ring-ink/10 sm:p-5">
              <dt className="eyebrow text-[0.65rem] text-ember">{k}</dt>
              <dd className="mt-1.5 font-bold leading-snug">{v}</dd>
            </div>
          ))}
        </dl>

        {e.lineup.length > 0 && (
          <div data-reveal className="mt-8">
            <p className="eyebrow mb-3 text-ink/60">{t.event.lineup}</p>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {e.lineup.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3">
                  <span className="font-display text-lg font-extrabold sm:text-xl">{l.name}</span>
                  <span className="text-right text-sm text-ink/60">{l.role}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {e.tickets.length > 0 && (
          <div data-reveal className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {e.tickets.map((tk, i) => (
              <div key={tk.label + i} className={`rounded-2xl p-4 sm:p-5 ${i === 0 ? "bg-sun" : "bg-ink text-cream"} ${e.tickets.length === 3 && i === 0 ? "col-span-2 sm:col-span-1" : ""}`}>
                <p className="text-sm font-bold opacity-80">{tk.label}</p>
                <p className="font-display text-4xl font-extrabold sm:text-5xl">{tk.price}</p>
                {tk.note && <p className="text-sm font-semibold">{tk.note}</p>}
              </div>
            ))}
          </div>
        )}
        {(e.payment || e.genres.length > 0) && (
          <p data-reveal className="mt-4 text-sm text-ink/60">
            {[e.payment, e.genres.length ? `${t.event.music}: ${e.genres.join(" · ")}` : ""].filter(Boolean).join(" · ")}
          </p>
        )}

        <div data-reveal className="mt-8 rounded-[1.75rem] bg-ink p-5 text-cream sm:p-8">
          <p className="eyebrow mb-4 text-sun">{t.event.doorsIn}</p>
          <Countdown to={e.startISO} endISO={e.endISO} />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={ticketUrl} external>{t.event.tickets}</Button>
            <a href={localizeHref(`/events/${e.slug}/calendar`, locale)} className="inline-flex items-center rounded-full px-6 py-3.5 text-sm font-bold ring-1 ring-cream/30 transition-colors hover:bg-cream hover:text-ink">
              {t.event.addCal}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Compact card for lists of upcoming / past events. */
export async function EventCard({ e: raw, past }: { e: EventItem; past?: boolean }) {
  const { t, locale } = await getT();
  const e = localizeEvent(raw, locale);
  return (
    <Link href={`/events/${e.slug}`} className="tilt group flex h-full flex-col overflow-hidden rounded-[2rem] bg-ink-2 ring-1 ring-cream/10">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-3">
        {e.poster ? (
          <Image src={e.poster.url} alt={e.poster.alt} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" quality={65} className={`object-cover transition-transform duration-700 group-hover:scale-105 ${past ? "grayscale-[60%]" : ""}`} />
        ) : (
          <div className="pattern-diamond h-full w-full" />
        )}
        <span className="absolute left-4 top-4 flex size-16 flex-col items-center justify-center rounded-2xl bg-sun font-display font-extrabold leading-none text-ink shadow-lg">
          <span className="text-2xl">{dayNum(e.startISO)}</span>
          <span className="mt-1 text-[0.65rem]">{monShort(e.startISO, locale)}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-bold text-sun">{past ? t.event.past : `${dayLabel(e.startISO, locale)} · ${timeRange(e)}`}</p>
        <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">{fullTitle(e)}</h3>
        <p className="mt-1 text-sm text-cream/60">{e.venue}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sun">{past ? t.event.seeDetails : t.event.detailsTickets} →</span>
      </div>
    </Link>
  );
}

export function eventJsonLd(raw: EventItem, locale: "en" | "fi" = "en") {
  const e = localizeEvent(raw, locale);
  return {
    inLanguage: locale,
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: fullTitle(e),
    startDate: e.startISO,
    endDate: e.endISO,
    description: e.description,
    image: e.poster ? [e.poster.url.startsWith("http") ? e.poster.url : `${site.url}${e.poster.url}`] : undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: e.venue, address: e.address },
    performer: e.lineup.map((l) => ({ "@type": "Person", name: l.name })),
    organizer: { "@type": "Organization", name: "WaawAfrica Events", url: site.url },
    offers: e.ticketUrl ? { "@type": "Offer", url: e.ticketUrl, priceCurrency: "EUR", availability: "https://schema.org/InStock" } : undefined,
  };
}
