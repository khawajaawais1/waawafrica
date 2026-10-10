import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import EventFeature, { EventCard, eventJsonLd } from "@/components/EventFeature";
import { getBySlug, getPublished, getUpcoming } from "@/lib/events";
import { dayLabel, fullTitle, localizeEvent } from "@/lib/event-types";
import { hasLocale } from "@/lib/i18n/config";
import { rich } from "@/lib/i18n/rich";
import { dictFor, getT, pageMeta } from "@/lib/i18n/server";
import Link from "@/components/LocaleLink";

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPublished()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/events/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const raw = await getBySlug(slug);
  if (!raw) return { title: dictFor(lang).event.notFound };
  const e = localizeEvent(raw, lang);
  const meta = pageMeta(lang, `/events/${e.slug}`, fullTitle(e), `${dayLabel(e.startISO, lang)} · ${e.venue}. ${e.description}`.slice(0, 160));
  if (e.poster) meta.openGraph = { ...meta.openGraph, images: [{ url: e.poster.url, width: e.poster.width, height: e.poster.height, alt: e.poster.alt }] };
  return meta;
}

export default async function EventPage({ params }: PageProps<"/[lang]/events/[slug]">) {
  const { slug } = await params;
  const { t, locale } = await getT();
  const e = await getBySlug(slug);
  if (!e) notFound();
  const others = (await getUpcoming()).filter((x) => x.id !== e.id).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(e, locale)) }} />
      <section className="bg-cream pb-20 pt-[calc(var(--header-h)+2.5rem)] text-ink md:pb-28 md:pt-[calc(var(--header-h)+4rem)]">
        <div className="container-x">
          <Link href="/events" className="eyebrow mb-8 inline-flex items-center gap-2 text-ember">{t.event.allEvents}</Link>
          <EventFeature e={e} headingLevel="h1" />
        </div>
      </section>
      {others.length > 0 && (
        <section className="py-14 sm:py-20 md:py-28">
          <div className="container-x">
            <h2 data-reveal className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold">{rich(t.event.moreTitle)}</h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => <li key={o.id} data-reveal><EventCard e={o} /></li>)}
            </ul>
            <div className="mt-10"><Button href="/events" variant="ghost">{t.event.allEventsBtn}</Button></div>
          </div>
        </section>
      )}
      <CtaBand title={t.event.ctaTitle} />
    </>
  );
}
