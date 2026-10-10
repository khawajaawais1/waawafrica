import type { Metadata } from "next";
import AutoVideo from "@/components/AutoVideo";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import EventFeature, { EventCard, eventJsonLd } from "@/components/EventFeature";
import Gallery from "@/components/Gallery";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { img } from "@/lib/images";
import { getFeatured, getPast, getUpcoming } from "@/lib/events";
import { gallery, offers, site } from "@/lib/site";
import { hasLocale } from "@/lib/i18n/config";
import { fmt, rich } from "@/lib/i18n/rich";
import { dictFor, getT, pageMeta } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/events">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictFor(lang).events;
  return pageMeta(lang, "/events", t.metaTitle, t.metaDescription);
}

const stepLinks = [
  { href: site.ticketsUrl, ext: true },
  { href: "/contact?topic=performance" },
  { href: "/contact?topic=volunteer" },
  { href: "/contact?topic=partner" },
];

export default async function EventsPage() {
  const { t: d, locale } = await getT();
  const t = d.events;
  const [featured, upcoming, past] = await Promise.all([getFeatured(), getUpcoming(), getPast()]);
  const others = upcoming.filter((e) => e.id !== featured?.id);
  return (
    <>
      {upcoming.map((e) => (
        <script key={e.id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(e, locale)) }} />
      ))}
      <PageHero
        eyebrow={t.eyebrow}
        title={rich(t.title)}
        intro={t.intro}
        photo={img.clubHandsUp}
        position="50% 40%"
      >
        <Button href="#upcoming">{t.upcomingBtn}</Button>
        <Button href="#gallery" variant="ghost">{t.pastBtn}</Button>
      </PageHero>

      {/* Featured + upcoming events (managed from /admin) */}
      <section id="upcoming" className="scroll-mt-24 bg-cream py-16 text-ink sm:py-20 md:py-32">
        <div className="container-x">
          <p data-reveal className="eyebrow mb-10 inline-flex items-center gap-3 rounded-full bg-ink px-4 py-2 text-sun">
            <span className="size-2 animate-pulse rounded-full bg-ember" /> {featured ? t.onSale : t.upcoming}
          </p>
          {featured ? (
            <EventFeature e={featured} />
          ) : (
            <div data-reveal className="rounded-[2rem] bg-ink p-8 text-cream md:p-14">
              <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold">{rich(t.emptyTitle)}</h2>
              <p className="mt-4 max-w-xl text-lg text-cream/75">{t.emptyText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={site.socials.instagram} external>{fmt(t.follow, { ig: site.socials.instagramHandle })}</Button>
                <Button href="/contact?topic=events" variant="ghost">{t.notify}</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-14 sm:py-20 md:py-28">
          <div className="container-x">
            <SectionHeading eyebrow={t.alsoEyebrow} title={rich(t.alsoTitle)} />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((e, i) => (
                <li key={e.id} data-reveal style={{ ["--d" as string]: `${(i % 3) * 100}ms` }}><EventCard e={e} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* More upcoming */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.bookEyebrow} title={rich(t.bookTitle)} />
          <ul className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {t.offers.map((u, i) => (
              <li key={u.title} data-reveal style={{ ["--d" as string]: `${i * 120}ms` }} className={`${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""} group flex flex-col overflow-hidden rounded-[2rem] bg-ink-2 ring-1 ring-cream/10 transition-transform duration-500 hover:-translate-y-2`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo photo={offers[i].photo} sizes="(min-width:768px) 33vw, 100vw" className="h-full w-full" imgClassName="transition-transform duration-1000 group-hover:scale-110" />
                  <span className="eyebrow absolute left-4 top-4 rounded-full bg-sun px-3 py-1.5 text-[0.6rem] text-ink">{u.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-sm font-bold text-sun">{u.when}</p>
                  <h3 className="mt-2 text-3xl font-extrabold">{u.title}</h3>
                  <p className="mt-1 text-sm text-cream/60">{u.where}</p>
                  <p className="mt-4 flex-1 text-cream/75">{u.blurb}</p>
                  <div className="mt-6"><Button href={offers[i].href} variant="ghost">{u.cta}</Button></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="-rotate-1 bg-ember py-4">
        <Marquee items={t.formats.map((f) => f.t)} className="font-display text-2xl font-extrabold uppercase md:text-4xl" speed="30s" />
      </div>

      {/* Formats + video reel */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t.formatsEyebrow} title={rich(t.formatsTitle)} />
            <ul className="mt-10 space-y-3">
              {t.formats.map((f, i) => (
                <li key={f.t} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="rounded-2xl bg-cream/5 p-5 ring-1 ring-cream/10">
                  <h3 className="text-xl font-extrabold">{f.t}</h3>
                  <p className="mt-1 text-cream/70">{f.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-7">
            <div data-reveal className="aspect-[9/16] overflow-hidden rounded-[1.75rem]">
              <AutoVideo src="/video/drum-solo.mp4" poster="/video/drum-solo.jpg" label={t.videoA} />
            </div>
            <div data-reveal style={{ ["--d" as string]: "150ms" }} className="mt-16 aspect-[9/16] overflow-hidden rounded-[1.75rem]">
              <AutoVideo src="/video/dancefloor.mp4" poster="/video/dancefloor.jpg" label={t.videoB} />
            </div>
          </div>
        </div>
      </section>

      {past.length > 0 && (
        <section className="py-14 sm:py-20 md:py-28">
          <div className="container-x">
            <SectionHeading eyebrow={t.pastEyebrow} title={rich(t.pastTitle)} />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {past.slice(0, 8).map((e) => <li key={e.id} data-reveal><EventCard e={e} past /></li>)}
            </ul>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-24 bg-ink-2 py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.galleryEyebrow} title={rich(t.galleryTitle)} intro={t.galleryIntro} className="mb-12" />
          <Gallery items={gallery} />
        </div>
      </section>

      {/* Participate */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow={t.involvedEyebrow} title={rich(t.involvedTitle, ["text-ember"])} />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s, i) => (
              <li key={s.t} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }} className="flex flex-col rounded-[1.75rem] bg-white/60 p-7 ring-1 ring-ink/10">
                <span className="grid size-12 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-sun">{i + 1}</span>
                <h3 className="mt-6 text-2xl font-extrabold">{s.t}</h3>
                <p className="mt-2 flex-1 text-ink/70">{s.d}</p>
                <div className="mt-6"><Button href={stepLinks[i].href} external={stepLinks[i].ext} variant="dark">{s.cta}</Button></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title={t.ctaTitle} />
    </>
  );
}
