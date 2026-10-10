import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description: "The story, vision and values behind WaawAfrica — a cultural movement connecting Senegal and Finland through music, dance and community.",
};

const values = [
  { t: "Teranga", d: "The Senegalese art of hospitality. Everyone who walks in is welcomed like family.", c: "bg-sun text-ink" },
  { t: "Authenticity", d: "Real rhythms, real artists, real stories — culture shared with respect, never as a costume.", c: "bg-ink-3 text-cream" },
  { t: "Joy", d: "We believe celebration is powerful. Dancing together breaks down walls faster than words.", c: "bg-ember text-cream" },
  { t: "Togetherness", d: "Finnish, African, everyone in between. Be multicultural — that’s the whole point.", c: "bg-leaf text-cream" },
  { t: "Giving back", d: "Every success is shared with the communities in Senegal that inspire everything we do.", c: "bg-cream text-ink" },
  { t: "Creativity", d: "From graffiti walls to djembe solos, we make room for artists to shine and grow.", c: "bg-flame text-ink" },
];

const goals = [
  ["Create unforgettable cultural experiences", "Regular Afrobeat nights, open-air sessions and stage shows that bring people from every background together."],
  ["Educate & inspire the next generation", "Drum and dance workshops in schools and communities, so children grow up curious about the world."],
  ["Support communities in Senegal", "Meals, supplies, time and care for children and families — growing year after year."],
  ["Empower African creators", "Through Dakar Bazaar, open a fair, beautiful marketplace for African makers, designers and artists."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About WaawAfrica"
        title={<>A yes to culture.<br /><span className="accent text-sun">A yes to each other.</span></>}
        intro="We are drummers and DJs, dancers and dreamers, volunteers and friends — building a bridge of rhythm between Africa and Finland."
        photo={img.stageDjembeFlag}
        position="50% 30%"
      />

      {/* Story */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <Photo photo={img.drummerSmile} curtain priority sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[2rem]" position="50% 25%" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading tone="light" eyebrow="Our story" title={<>It started with a <span className="accent text-ember">drum.</span></>} />
            <div className="mt-10 space-y-7 text-lg leading-relaxed text-ink/80 md:text-xl">
              <p data-reveal>
                Far from the warm streets of Dakar, in the long Nordic nights of Finland, a simple question kept coming back: <em className="accent text-ink">how do we keep home alive — and share it?</em>
              </p>
              <p data-reveal>
                The answer was the drum. A djembe in a classroom. A dance circle in a park. A dance floor that didn’t empty until the lights came on.
                People who had never met — Finnish students, African families, curious neighbours — suddenly moving to the same beat.
              </p>
              <p data-reveal>
                We called it <strong className="font-extrabold text-ink">Waaw</strong> — “yes” in Wolof. Because that’s what we saw every time: people saying yes. Yes to
                something new. Yes to joy. Yes to each other.
              </p>
              <p data-reveal>
                Today WaawAfrica is a home for Afrobeat nights, summer sessions, stage shows and workshops — and a promise to never forget where the
                rhythm comes from. Part of everything we build flows back to the children and communities of Senegal.
              </p>
            </div>
            <blockquote data-reveal className="mt-14 border-l-4 border-ember pl-6 font-display text-3xl font-bold leading-tight md:text-4xl">
              We don’t just throw parties. We build belonging.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="py-16 sm:py-24 md:py-36">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <article data-reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-leaf to-[#0d5c2b] p-10 md:p-14">
            <p className="eyebrow mb-6 text-sun">Vision</p>
            <h2 className="text-4xl font-extrabold md:text-5xl">A world where cultures meet on the dance floor — and leave as family.</h2>
          </article>
          <article data-reveal style={{ ["--d" as string]: "120ms" }} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ember to-[#8c1510] p-10 md:p-14">
            <p className="eyebrow mb-6 text-sun">Mission</p>
            <h2 className="text-4xl font-extrabold md:text-5xl">To connect people through African culture, and give back to the communities that inspire it.</h2>
          </article>
        </div>
      </section>

      <div className="border-y border-cream/10 py-6">
        <Marquee items={["Teranga", "Authenticity", "Joy", "Togetherness", "Giving back", "Creativity"]} className="font-display text-3xl font-extrabold text-cream/80 md:text-5xl" reverse speed="45s" />
      </div>

      {/* Values */}
      <section className="py-16 sm:py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Our values" title={<>What we <span className="accent text-sun">stand for.</span></>} />
          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <li
                key={v.t}
                data-reveal
                style={{ ["--d" as string]: `${(i % 3) * 100}ms` }}
                className={`group rounded-[1.75rem] p-6 transition-transform duration-500 hover:-translate-y-2 sm:p-8 ${v.c}`}
              >
                <span className="font-display text-sm font-bold opacity-60">0{i + 1}</span>
                <h3 className="mt-5 text-3xl font-extrabold sm:mt-10 sm:text-4xl">{v.t}</h3>
                <p className="mt-4 leading-relaxed opacity-80">{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Goals */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading tone="light" eyebrow="Goals & purpose" title={<>Where we’re <span className="accent text-ember">going.</span></>} intro="Our purpose is simple: to make African culture something people live, not just watch — and to make sure it lifts communities on both continents." />
            <div className="mt-10 grid grid-cols-2 gap-4">
              <Photo photo={img.stageDanceSchool} curtain sizes="25vw" className="aspect-square rounded-3xl" />
              <Photo photo={img.humanityGroup} curtain delay={150} sizes="25vw" className="aspect-square rounded-3xl" />
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {goals.map(([t, d], i) => (
              <li key={t} data-reveal className="group flex gap-6 border-t border-ink/15 py-9 last:border-b">
                <span className="font-display text-5xl font-extrabold text-ember/80 transition-colors group-hover:text-leaf">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl font-extrabold md:text-3xl">{t}</h3>
                  <p className="mt-3 text-lg text-ink/70">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Be multicultural */}
      <section className="relative isolate overflow-hidden py-32 md:py-48">
        <div className="absolute inset-0 -z-10">
          <div data-parallax="0.1" className="absolute -inset-y-[15%] inset-x-0">
            <Photo photo={img.summerMcBanner} sizes="100vw" className="h-full w-full" position="50% 70%" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        </div>
        <div className="container-x">
          <p data-reveal className="eyebrow mb-6 text-sun">Our motto</p>
          <h2 data-reveal className="max-w-3xl text-[clamp(3rem,9vw,8rem)] font-extrabold">Be <span className="accent tricolor-text">Multicultural.</span></h2>
          <p data-reveal className="mt-8 max-w-lg text-lg text-cream/80">Printed on our banners, painted on our walls, and lived at every event.</p>
          <div data-reveal className="mt-10"><Button href="/events">See it live</Button></div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
