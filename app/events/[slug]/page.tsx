import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import EventFeature, { EventCard, eventJsonLd } from "@/components/EventFeature";
import { getBySlug, getPublished, getUpcoming } from "@/lib/events";
import { dayLabel, fullTitle } from "@/lib/event-types";

export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPublished()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = await getBySlug((await params).slug);
  if (!e) return { title: "Event not found" };
  return {
    title: fullTitle(e),
    description: `${dayLabel(e.startISO)} · ${e.venue}. ${e.description}`.slice(0, 160),
    openGraph: e.poster ? { images: [{ url: e.poster.url, width: e.poster.width, height: e.poster.height, alt: e.poster.alt }] } : undefined,
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = await getBySlug(slug);
  if (!e) notFound();
  const others = (await getUpcoming()).filter((x) => x.id !== e.id).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(e)) }} />
      <section className="bg-cream pb-20 pt-[calc(var(--header-h)+2.5rem)] text-ink md:pb-28 md:pt-[calc(var(--header-h)+4rem)]">
        <div className="container-x">
          <a href="/events" className="eyebrow mb-8 inline-flex items-center gap-2 text-ember">← All events</a>
          <EventFeature e={e} headingLevel="h1" />
        </div>
      </section>
      {others.length > 0 && (
        <section className="py-14 sm:py-20 md:py-28">
          <div className="container-x">
            <h2 data-reveal className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold">More <span className="accent text-sun">coming up</span></h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => <li key={o.id} data-reveal><EventCard e={o} /></li>)}
            </ul>
            <div className="mt-10"><Button href="/events" variant="ghost">All events</Button></div>
          </div>
        </section>
      )}
      <CtaBand title="See you on the dance floor." />
    </>
  );
}
