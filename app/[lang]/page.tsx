import type { Metadata } from "next";
import AutoVideo from "@/components/AutoVideo";
import Button, { Arrow } from "@/components/Button";
import Countdown from "@/components/Countdown";
import { PosterOrPlaceholder } from "@/components/EventFeature";
import Link from "@/components/LocaleLink";
import CtaBand from "@/components/CtaBand";
import Marquee from "@/components/Marquee";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { img, type Photo as P } from "@/lib/images";
import { getFeatured } from "@/lib/events";
import { dayLabel, dayNum, fullTitle, localizeEvent, monShort, timeRange } from "@/lib/event-types";
import { hasLocale } from "@/lib/i18n/config";
import { fmt, rich } from "@/lib/i18n/rich";
import { dictFor, getT, pageMeta } from "@/lib/i18n/server";
import { site } from "@/lib/site";

const pillars = [
  {
    n: "01",
    href: "/events",
    photo: img.clubHandsUp,
    panel: "bg-ember text-cream",
    tilt: "-1.5deg",
  },
  {
    n: "02",
    href: "/humanity",
    photo: img.humanityGroup,
    panel: "bg-leaf text-cream",
    tilt: "1.2deg",
  },
  {
    n: "03",
    href: "/dakar-bazaar",
    photo: img.stageDancerJump,
    panel: "bg-sun text-ink",
    tilt: "-1deg",
  },
];

const rowA: P[] = [img.summerGraffitiDuo, img.clubSinger, img.stageMaskedDancer, img.communityKids, img.summerMcBanner, img.clubDjembe];
const rowB: P[] = [img.stageDjembeFlag, img.clubBand, img.summerKidsDj, img.stageDanceTroupe, img.clubEmbrace, img.summerGraffitiTrio];

function PhotoRow({ items, reverse, speed }: { items: P[]; reverse?: boolean; speed: string }) {
  const Track = ({ hidden }: { hidden?: boolean }) => (
    <ul className="marquee__track gap-4 pr-4" aria-hidden={hidden || undefined}>
      {items.map((m, i) => (
        <li key={i} className={`shrink-0 ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
          <Photo photo={hidden ? { ...m, alt: "" } : m} sizes="260px" quality={60} className="h-56 w-44 rounded-[1.5rem] ring-4 ring-ink sm:h-72 sm:w-56" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee py-3" data-reverse={reverse || undefined} style={{ ["--speed" as string]: speed }}>
      <Track />
      <Track hidden />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMeta(lang, "/", undefined, dictFor(lang).meta.description);
}

export default async function Home() {
  const { t, locale } = await getT();
  const h = t.home;
  const featured = await getFeatured();
  const ev = featured ? localizeEvent(featured, locale) : null;
  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="grain relative isolate overflow-hidden pb-16 pt-[calc(var(--header-h)+2.5rem)] lg:min-h-svh lg:pb-24 lg:pt-[calc(var(--header-h)+4rem)]">
        <div aria-hidden="true" className="glow absolute inset-0 -z-20" />
        <div aria-hidden="true" className="sunburst absolute left-[60%] top-1/2 -z-10 aspect-square w-[150vmax] -translate-x-1/2 -translate-y-1/2" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 left-0 -z-10 select-none whitespace-nowrap font-display text-[26vw] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(246_237_220/0.07)]">
          WAAW
        </div>

        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow fade-up mb-7 inline-flex items-center gap-3 rounded-full bg-cream/5 px-4 py-2 text-sun ring-1 ring-cream/10">
              <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
              {h.eyebrow}
            </p>
            <h1 className="hero-title text-[clamp(3.3rem,10vw,9rem)] font-extrabold leading-[0.9]">
              <span className="slide-up block">
                {h.say} <span className="accent tricolor-text pr-[0.06em]">Waaw</span>
              </span>
              <span className="slide-up block" style={{ ["--d" as string]: "80ms" }}>
                {h.to && <>{h.to} </>}
                <span className="word-rotator">
                  {h.words.map((w, i) => (
                    <span key={w} className={["text-sun", "text-ember", "text-leaf", "text-flame"][i % 4]} aria-hidden={i > 0 || undefined}>
                      {w}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <p className="slide-up mt-8 max-w-xl text-lg leading-relaxed text-cream/80 md:text-xl" style={{ ["--d" as string]: "160ms" }}>
              <strong className="font-bold text-cream">{h.introStrong}</strong> {h.intro}
            </p>
            <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "340ms" }}>
              <Button href="/events">{h.explore}</Button>
              <Button href="/dakar-bazaar" variant="ember">{h.shop}</Button>
              <Button href="/contact?topic=join" variant="ghost">{t.common.joinUs}</Button>
            </div>
            <ul className="fade-up mt-10 flex flex-wrap gap-2" style={{ ["--d" as string]: "440ms" }} aria-label={h.genresLabel}>
              {h.genres.map((g, i) => (
                <li key={g} className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${["bg-leaf/20 text-leaf", "bg-sun/15 text-sun", "bg-ember/20 text-[#ff6b5f]", "bg-flame/20 text-flame", "bg-cream/10 text-cream"][i]}`}>
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Media collage */}
          <div className="relative mx-auto h-[440px] w-full max-w-md sm:h-[540px] lg:col-span-5 lg:max-w-none">
            <div aria-hidden="true" className="absolute right-[6%] top-[4%] h-[80%] w-[62%] rotate-6 rounded-[2rem] bg-gradient-to-br from-leaf via-sun to-ember" />
            <div className="fade-up absolute right-[10%] top-0 h-[78%] w-[60%] -rotate-2 overflow-hidden rounded-[2rem] bg-ink-3 shadow-2xl ring-4 ring-ink" style={{ ["--d" as string]: "150ms" }}>
              <AutoVideo src="/video/dancefloor.mp4" poster="/video/dancefloor.jpg" label={h.videoLabel} eager />
              <span className="eyebrow absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-ink/75 px-3 py-1.5 text-[0.6rem] text-cream">
                <span className="size-2 animate-pulse rounded-full bg-ember" /> {h.live}
              </span>
            </div>
            <div className="fade-up absolute bottom-2 left-0 h-[50%] w-[44%]" style={{ ["--d" as string]: "300ms" }}>
              <Photo photo={img.drummerSmile} priority quality={60} sizes="(min-width:1024px) 18vw, 42vw" className="h-full w-full -rotate-6 rounded-[1.75rem] ring-4 ring-ink" position="50% 30%" />
            </div>
            {ev && (
              <Link
                href={`/events/${ev.slug}`}
                className="beat absolute bottom-0 right-0 flex max-w-[15rem] items-center gap-3 rounded-2xl bg-sun p-3 pr-4 text-ink shadow-xl [--r:3deg]"
              >
                <span className="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-ink font-display text-lg font-extrabold leading-none text-sun">
                  {dayNum(ev.startISO)}
                  <span className="mt-0.5 text-[0.6rem]">{monShort(ev.startISO, locale)}</span>
                </span>
                <span className="text-sm font-bold leading-tight">{fmt(t.event.nextUp, { title: fullTitle(ev) })}</span>
              </Link>
            )}
            <div aria-hidden="true" className="absolute -left-2 top-2 hidden size-28 sm:block">
              <svg viewBox="0 0 100 100" className="spin-slow size-full">
                <defs><path id="c" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
                <text fontSize="10.5" fontWeight="700" letterSpacing="3" fill="var(--color-sun)">
                  <textPath href="#c">{h.badge}</textPath>
                </text>
              </svg>
              <span className="absolute inset-0 grid place-items-center text-2xl text-ember">✦</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── CROSSING TAPES ───────────── */}
      <div className="relative z-10 -my-6 overflow-hidden py-10" aria-hidden="true">
        <div className="-rotate-3 bg-sun py-3 text-ink shadow-xl">
          <Marquee items={h.tapeA} className="font-display text-2xl font-extrabold uppercase md:text-4xl" speed="34s" />
        </div>
        <div className="absolute -inset-x-4 top-1/2 -translate-y-1/2 rotate-3 bg-leaf py-2 text-cream shadow-xl">
          <Marquee items={h.tapeB} className="font-display text-xl font-extrabold uppercase md:text-2xl" speed="40s" reverse />
        </div>
      </div>

      {/* ───────────── NEXT EVENT — managed from /admin ───────────── */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-ember via-[#b51a14] to-flame py-16 sm:py-20 md:py-32">
        <div aria-hidden="true" className="pattern-dots absolute inset-0 -z-10 opacity-15 [--p1:var(--color-sun)]" />
        {ev ? (
          <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div data-reveal="scale" className="relative mx-auto w-full max-w-[18rem] sm:max-w-xs lg:col-span-4 lg:max-w-none">
              <Link href={`/events/${ev.slug}`} className="block" aria-label={fmt(t.event.detailsAria, { title: fullTitle(ev) })}>
                <PosterOrPlaceholder e={ev} sizes="(min-width:1024px) 26vw, 75vw" className="tilt relative -rotate-3 rounded-3xl shadow-2xl ring-8 ring-ink/30 [--tilt:0deg]" />
              </Link>
              {ev.tickets[0]?.price && (
                <span aria-hidden="true" className="beat absolute -right-3 -top-4 grid size-20 place-items-center rounded-full bg-sun text-center font-display text-sm font-extrabold leading-tight text-ink shadow-lg [--r:12deg]">
                  {ev.tickets[0].label.split(" ").slice(0, 2).join(" ")}<br />{ev.tickets[0].price}
                </span>
              )}
            </div>
            <div className="min-w-0 lg:col-span-7 lg:col-start-6">
              <p data-reveal className="eyebrow mb-5 inline-flex items-center gap-3 rounded-full bg-ink/25 px-4 py-2 text-sun">
                <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span> {h.next.eyebrow}{ev.subtitle ? ` · ${ev.subtitle}` : ""}
              </p>
              <h2 data-reveal className="text-[clamp(2.4rem,6.5vw,5.8rem)] font-extrabold">{ev.title}</h2>
              <p data-reveal className="mt-5 max-w-xl text-lg font-semibold text-cream/90 md:text-xl">
                {dayLabel(ev.startISO, locale)} · {timeRange(ev)} · {[ev.venue, ev.address].filter(Boolean).join(", ")}
              </p>
              {ev.lineup.length > 0 && (
                <ul data-reveal className="mt-6 flex flex-wrap gap-2">
                  {ev.lineup.map((l) => (
                    <li key={l.name} className="rounded-full bg-ink/25 px-3.5 py-1.5 text-sm font-bold">{l.name}</li>
                  ))}
                </ul>
              )}
              <div data-reveal className="mt-8 max-w-md">
                <Countdown to={ev.startISO} endISO={ev.endISO} />
              </div>
              <div data-reveal className="mt-8 flex flex-wrap gap-3">
                <Button href={`/events/${ev.slug}`} variant="sun">{h.next.register}</Button>
                <Button href="/events" variant="ghost">{h.next.viewAll}</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container-x text-center">
            <p data-reveal className="eyebrow mb-5 text-sun">{h.next.eyebrow}</p>
            <h2 data-reveal className="mx-auto max-w-3xl text-[clamp(2.4rem,6vw,5rem)] font-extrabold">{rich(h.next.emptyTitle)}</h2>
            <p data-reveal className="mx-auto mt-5 max-w-lg text-lg text-cream/90">{fmt(h.next.emptyText, { ig: site.socials.instagramHandle })}</p>
            <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={site.socials.instagram} external variant="sun">{h.next.follow}</Button>
              <Button href="/contact?topic=events" variant="ghost">{h.next.notify}</Button>
            </div>
          </div>
        )}
      </section>

      {/* ───────────── INTRO + MISSION ───────────── */}
      <section className="relative bg-cream py-16 text-ink sm:py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p data-reveal className="eyebrow mb-6 text-ember">{h.who.eyebrow}</p>
            <p data-reveal className="font-display text-[clamp(1.9rem,3.6vw,3.3rem)] font-bold leading-[1.08] tracking-tight">
              {rich(h.who.statement, ["text-earth", "text-leaf"])}
            </p>
            <div data-reveal className="mt-10 grid gap-6 sm:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/75">
                {h.who.body}
              </p>
              <div className="relative overflow-hidden rounded-3xl bg-ink p-7 text-cream">
                <span aria-hidden="true" className="kente absolute inset-x-0 top-0 h-1.5" />
                <p className="eyebrow mb-3 text-sun">{h.who.missionEyebrow}</p>
                <p className="text-lg font-semibold leading-snug">
                  {h.who.mission}
                </p>
              </div>
            </div>
            <div data-reveal className="mt-10">
              <Button href="/about" variant="dark">{h.who.story}</Button>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4 lg:col-span-5">
            <Photo photo={img.stageFlags} curtain quality={65} sizes="(min-width:1024px) 35vw, 90vw" className="col-span-2 aspect-[16/9] rounded-3xl" />
            <Photo photo={img.communityKids} curtain delay={120} quality={60} sizes="(min-width:1024px) 17vw, 45vw" className="aspect-[4/5] rotate-[-2deg] rounded-3xl" />
            <div className="pt-10">
              <Photo photo={img.workshopDrums} curtain delay={220} quality={60} sizes="(min-width:1024px) 17vw, 45vw" className="aspect-[4/5] rotate-2 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── PILLARS ───────────── */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={h.pillars.eyebrow} title={rich(h.pillars.title)} />
            <p data-reveal className="max-w-sm text-cream/70">{h.pillars.sub}</p>
          </div>
          <ul className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.n} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <Link href={p.href} className="tilt group flex h-full flex-col overflow-hidden rounded-[2rem] ring-1 ring-cream/10" style={{ ["--tilt" as string]: p.tilt }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Photo photo={p.photo} quality={60} sizes="(min-width:768px) 33vw, 100vw" className="h-full w-full" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute left-5 top-4 font-display text-6xl font-extrabold text-cream drop-shadow-lg">{p.n}</span>
                  </div>
                  <div className={`flex flex-1 flex-col p-7 ${p.panel}`}>
                    <h3 className="text-4xl font-extrabold">{h.pillars.items[i].title}</h3>
                    <p className="mt-3 flex-1 opacity-85">{h.pillars.items[i].text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-bold">
                      {h.pillars.items[i].cta} <Arrow className="transition-transform duration-500 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── VIBE REEL ───────────── */}
      <section className="grain relative isolate overflow-hidden bg-leaf py-16 sm:py-24 md:py-32">
        <div aria-hidden="true" className="sunburst absolute right-0 top-1/2 -z-10 aspect-square w-[120vmax] -translate-y-1/2 translate-x-1/3 opacity-60" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p data-reveal className="eyebrow mb-6 text-sun">{h.vibe.eyebrow}</p>
            <p data-reveal className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-extrabold leading-[1] tracking-tight">
              {rich(h.vibe.quote)}
            </p>
            <p data-reveal className="mt-6 max-w-md text-lg text-cream/85">
              {h.vibe.text}
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <Button href="/events" variant="sun">{h.vibe.find}</Button>
              <Button href="/events#gallery" variant="ghost">{h.vibe.gallery}</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:col-start-8">
            <div data-reveal className="aspect-[9/16] -rotate-3 overflow-hidden rounded-[1.75rem] bg-ink ring-4 ring-ink">
              <AutoVideo src="/video/drum-solo.mp4" poster="/video/drum-solo.jpg" label={h.vibe.videoA} />
            </div>
            <div data-reveal style={{ ["--d" as string]: "150ms" }} className="mt-14 aspect-[9/16] rotate-3 overflow-hidden rounded-[1.75rem] bg-ink ring-4 ring-ink">
              <AutoVideo src="/video/party.mp4" poster="/video/party.jpg" label={h.vibe.videoB} />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── HUMANITY TEASER ───────────── */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <Photo photo={img.humanityMeal} curtain quality={65} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/3] rounded-[2rem]" />
            <div data-reveal="right" style={{ ["--d" as string]: "250ms" }} className="absolute -bottom-8 right-4 max-w-[16rem] rotate-2 rounded-3xl bg-ember p-6 text-cream shadow-xl md:-right-6">
              <p className="font-display text-2xl font-extrabold leading-tight">{h.humanity.plate}</p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeading
              tone="light"
              eyebrow={h.humanity.eyebrow}
              title={rich(h.humanity.title, ["text-leaf"])}
              intro={h.humanity.intro}
            />
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <Button href="/humanity" variant="leaf">{h.humanity.work}</Button>
              <Button href="/contact?topic=humanity" variant="ghost">{h.humanity.support}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── MOMENTS — moving photo wall ───────────── */}
      <section className="overflow-hidden py-16 sm:py-24 md:py-32" aria-labelledby="moments-title">
        <div className="container-x mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={h.moments.eyebrow} title={<span id="moments-title">{rich(h.moments.title)}</span>} />
          <Button href="/events#gallery" variant="ghost">{h.moments.full}</Button>
        </div>
        <PhotoRow items={rowA} speed="60s" />
        <PhotoRow items={rowB} speed="70s" reverse />
      </section>

      <CtaBand />
    </>
  );
}
