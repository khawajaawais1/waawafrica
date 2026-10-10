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
import { gallery, moreUpcoming, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description: "Afrobeat Night JKL, WaaW Summer Sessions, drum & dance workshops and live culture shows by WaawAfrica in Jyväskylä, Finland.",
};

const formats = [
  { t: "Afrobeat Nights", d: "Club nights packed with Afrobeats, Amapiano, Dancehall and live percussion." },
  { t: "Summer Sessions", d: "Free open-air days with DJs, MCs, graffiti art, food and family fun." },
  { t: "Stage Shows", d: "Traditional Senegalese drum and dance performances, in full colour." },
  { t: "Workshops", d: "Djembe and dance for schools, communities and teams." },
];

const steps = [
  { t: "Get your ticket", d: "Grab tickets on Kide.app — early birds go fast.", href: site.ticketsUrl, ext: true, cta: "Go to Kide.app" },
  { t: "Perform or DJ", d: "Artists, dancers, DJs and MCs — we want to hear from you.", href: "/contact?topic=performance", cta: "Apply to perform" },
  { t: "Volunteer", d: "Help us build the magic behind the scenes at events.", href: "/contact?topic=volunteer", cta: "Volunteer" },
  { t: "Partner & sponsor", d: "Venues, brands and organisations: let’s create together.", href: "/contact?topic=partner", cta: "Partner with us" },
];

export default async function EventsPage() {
  const [featured, upcoming, past] = await Promise.all([getFeatured(), getUpcoming(), getPast()]);
  const others = upcoming.filter((e) => e.id !== featured?.id);
  return (
    <>
      {upcoming.map((e) => (
        <script key={e.id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(e)) }} />
      ))}
      <PageHero
        eyebrow="Events"
        title={<>Nights that <span className="accent text-sun">move</span> you.</>}
        intro="Afrobeat nights, open-air sessions, stage shows and workshops — come for the music, stay for the family."
        photo={img.clubHandsUp}
        position="50% 40%"
      >
        <Button href="#upcoming">Upcoming events</Button>
        <Button href="#gallery" variant="ghost">Past events</Button>
      </PageHero>

      {/* Featured + upcoming events (managed from /admin) */}
      <section id="upcoming" className="scroll-mt-24 bg-cream py-16 text-ink sm:py-20 md:py-32">
        <div className="container-x">
          <p data-reveal className="eyebrow mb-10 inline-flex items-center gap-3 rounded-full bg-ink px-4 py-2 text-sun">
            <span className="size-2 animate-pulse rounded-full bg-ember" /> {featured ? "Upcoming · tickets on sale" : "Upcoming"}
          </p>
          {featured ? (
            <EventFeature e={featured} />
          ) : (
            <div data-reveal className="rounded-[2rem] bg-ink p-8 text-cream md:p-14">
              <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold">New dates are <span className="accent text-sun">cooking.</span></h2>
              <p className="mt-4 max-w-xl text-lg text-cream/75">Our next nights are being planned right now. Follow us on Instagram or drop us a line to be the first to know.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={site.socials.instagram} external>Follow {site.socials.instagramHandle}</Button>
                <Button href="/contact?topic=events" variant="ghost">Get notified</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-14 sm:py-20 md:py-28">
          <div className="container-x">
            <SectionHeading eyebrow="Also coming up" title={<>Save the <span className="accent text-sun">dates.</span></>} />
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
          <SectionHeading eyebrow="Book & join" title={<>More ways to <span className="accent text-sun">join in.</span></>} />
          <ul className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {moreUpcoming.map((u, i) => (
              <li key={u.title} data-reveal style={{ ["--d" as string]: `${i * 120}ms` }} className={`${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""} group flex flex-col overflow-hidden rounded-[2rem] bg-ink-2 ring-1 ring-cream/10 transition-transform duration-500 hover:-translate-y-2`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo photo={u.photo} sizes="(min-width:768px) 33vw, 100vw" className="h-full w-full" imgClassName="transition-transform duration-1000 group-hover:scale-110" />
                  <span className="eyebrow absolute left-4 top-4 rounded-full bg-sun px-3 py-1.5 text-[0.6rem] text-ink">{u.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-sm font-bold text-sun">{u.when}</p>
                  <h3 className="mt-2 text-3xl font-extrabold">{u.title}</h3>
                  <p className="mt-1 text-sm text-cream/60">{u.where}</p>
                  <p className="mt-4 flex-1 text-cream/75">{u.blurb}</p>
                  <div className="mt-6"><Button href={u.cta.href} variant="ghost">{u.cta.label}</Button></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="-rotate-1 bg-ember py-4">
        <Marquee items={formats.map((f) => f.t)} className="font-display text-2xl font-extrabold uppercase md:text-4xl" speed="30s" />
      </div>

      {/* Formats + video reel */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Event formats" title={<>Every kind of <span className="accent text-sun">celebration.</span></>} />
            <ul className="mt-10 space-y-3">
              {formats.map((f, i) => (
                <li key={f.t} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="rounded-2xl bg-cream/5 p-5 ring-1 ring-cream/10">
                  <h3 className="text-xl font-extrabold">{f.t}</h3>
                  <p className="mt-1 text-cream/70">{f.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-7">
            <div data-reveal className="aspect-[9/16] overflow-hidden rounded-[1.75rem]">
              <AutoVideo src="/video/drum-solo.mp4" poster="/video/drum-solo.jpg" label="A solo djembe performance for a seated audience" />
            </div>
            <div data-reveal style={{ ["--d" as string]: "150ms" }} className="mt-16 aspect-[9/16] overflow-hidden rounded-[1.75rem]">
              <AutoVideo src="/video/dancefloor.mp4" poster="/video/dancefloor.jpg" label="People dancing at a WaawAfrica night" />
            </div>
          </div>
        </div>
      </section>

      {past.length > 0 && (
        <section className="py-14 sm:py-20 md:py-28">
          <div className="container-x">
            <SectionHeading eyebrow="Past events" title={<>Nights we’ll <span className="accent text-sun">never forget.</span></>} />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {past.slice(0, 8).map((e) => <li key={e.id} data-reveal><EventCard e={e} past /></li>)}
            </ul>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-24 bg-ink-2 py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title={<>The <span className="accent text-sun">archive.</span></>} intro="Afrobeat nights, summer sessions, stage shows and community days — tap any photo to view it full-size." className="mb-12" />
          <Gallery items={gallery} />
        </div>
      </section>

      {/* Participate */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow="Get involved" title={<>Be part of the <span className="accent text-ember">next one.</span></>} />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }} className="flex flex-col rounded-[1.75rem] bg-white/60 p-7 ring-1 ring-ink/10">
                <span className="grid size-12 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-sun">{i + 1}</span>
                <h3 className="mt-6 text-2xl font-extrabold">{s.t}</h3>
                <p className="mt-2 flex-1 text-ink/70">{s.d}</p>
                <div className="mt-6"><Button href={s.href} external={s.ext} variant="dark">{s.cta}</Button></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="See you on the dance floor." />
    </>
  );
}
