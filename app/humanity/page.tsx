import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { img } from "@/lib/images";
import { humanityGallery } from "@/lib/site";

export const metadata: Metadata = {
  title: "Humanity & Community Work",
  description: "WaawAfrica’s social impact: shared meals and support for children in Senegal, cultural workshops in Finnish schools and community gatherings.",
};

const initiatives = [
  { t: "Shared Meals", place: "Senegal", d: "Bringing food and sitting down together with children — because a full plate and a kind face change a day.", photo: img.humanityMeal },
  { t: "Children & Learning", place: "Senegal", d: "Spending time, listening and supporting children’s education and wellbeing with care and respect.", photo: img.humanityTeaching },
  { t: "Gifts & Supplies", place: "Senegal", d: "Collecting and delivering everyday essentials, clothing and treats to the kids who need them most.", photo: img.humanityGiving },
  { t: "Culture in Schools", place: "Finland", d: "Djembe and dance workshops that open young minds to Africa — joyfully, hands-on, together.", photo: img.workshopDrums },
  { t: "Community Tables", place: "Finland", d: "Gatherings and dinners where newcomers and locals meet as neighbours and become friends.", photo: img.communityDinner },
];

const future = [
  ["School supply drives", "Seasonal collections of books, bags and materials for children in Senegal."],
  ["Music for every child", "Bringing instruments and music workshops to communities in Dakar."],
  ["Cultural exchange", "Connecting Finnish and Senegalese young people through art, sport and music."],
  ["Bazaar for good", "A share of future Dakar Bazaar sales supporting community projects."],
];

export default function HumanityPage() {
  return (
    <>
      <PageHero
        eyebrow="Humanity & community work"
        title={<>Culture that <span className="accent text-sun">gives back.</span></>}
        intro="The rhythm we share in Finland was born in communities in Senegal. Giving back to them isn’t a side project — it’s the heartbeat of WaawAfrica."
        photo={img.humanityGroup}
        position="50% 35%"
      >
        <Button href="/contact?topic=humanity" variant="leaf">Support the work</Button>
        <Button href="#initiatives" variant="ghost">Our initiatives</Button>
      </PageHero>

      {/* Statement */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <p data-reveal className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-bold leading-[1.1] tracking-tight lg:col-span-8">
            We believe joy and responsibility belong together. Every song we play, every ticket, every volunteer hour helps us show up — with food,
            time and care — for <span className="accent text-leaf">the children who inspire us.</span>
          </p>
          <div data-reveal style={{ ["--d" as string]: "150ms" }} className="space-y-4 lg:col-span-3 lg:col-start-10">
            {["Warmth over charity", "Presence over promises", "Dignity in every photo, every story"].map((t) => (
              <p key={t} className="flex items-center gap-3 border-b border-ink/15 pb-4 font-bold">
                <span aria-hidden="true" className="size-2.5 rounded-full bg-leaf" /> {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section id="initiatives" className="scroll-mt-24 py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Projects & initiatives" title={<>Small acts. <span className="accent text-sun">Big hearts.</span></>} />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {initiatives.map((it, i) => (
              <li
                key={it.t}
                data-reveal
                style={{ ["--d" as string]: `${(i % 3) * 100}ms` }}
                className={`group relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[1.75rem] p-5 sm:min-h-[420px] sm:rounded-[2rem] sm:p-7 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
              >
                <Photo photo={it.photo} sizes="(min-width:1024px) 50vw, 100vw" className="!absolute inset-0 -z-10" imgClassName="transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                <span className="eyebrow mb-3 w-fit rounded-full bg-cream/15 px-3 py-1.5 text-[0.6rem] backdrop-blur">{it.place}</span>
                <h3 className="text-3xl font-extrabold">{it.t}</h3>
                <p className="mt-2 max-w-md text-cream/80">{it.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Impact story */}
      <section className="relative overflow-hidden bg-leaf py-16 text-cream sm:py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Photo photo={img.humanityCircle} curtain sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[7/5] rounded-[2rem]" />
          <div>
            <p data-reveal className="eyebrow mb-6 text-sun">Impact story</p>
            <h2 data-reveal className="text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold">“The day the circle got bigger.”</h2>
            <div data-reveal className="mt-8 space-y-5 text-lg leading-relaxed text-cream/85">
              <p>
                It began with a few bowls on the sand. A handful of kids sat down, unsure. Then more came — brothers, cousins, friends from down the
                road — until the circle stretched wider than anyone planned.
              </p>
              <p>
                Nobody was turned away. Plates were shared, laughter got louder, and for one afternoon the only thing that mattered was being together.
                That circle is what WaawAfrica is about.
              </p>
            </div>
            <div data-reveal className="mt-10"><Button href="/contact?topic=humanity" variant="sun">Help widen the circle</Button></div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Community moments" title={<>Faces of <span className="accent text-sun">the work.</span></>} className="mb-12" />
          <Gallery items={humanityGallery} filters={false} />
        </div>
      </section>

      {/* Partners & collaborations */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading tone="light" eyebrow="Partnerships" title={<>Stronger <span className="accent text-ember">together.</span></>} intro="Venues, schools, associations and businesses help us turn good intentions into real impact. Your organisation could be next." />
            <div data-reveal className="mt-10"><Button href="/contact?topic=partner" variant="dark">Become a partner</Button></div>
          </div>
          <ul className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-7">
            {[
              ["Venues", "Like Teerenpeli Jyväskylä, home of Afrobeat Night JKL"],
              ["Schools", "Hosting our drum & dance workshops"],
              ["Communities", "Local associations in Finland & Senegal"],
              ["Your brand?", "Sponsor an event or a community project"],
            ].map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className={`rounded-[1.75rem] p-7 ${i === 3 ? "bg-sun" : "bg-white/60 ring-1 ring-ink/10"}`}>
                <h3 className="text-2xl font-extrabold">{t}</h3>
                <p className="mt-2 text-ink/70">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Future */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Future initiatives" title={<>What we’re <span className="accent text-sun">building next.</span></>} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-cream/10 md:grid-cols-2">
            {future.map(([t, d], i) => (
              <li key={t} data-reveal className="group bg-ink p-8 transition-colors duration-500 hover:bg-ink-3 md:p-10">
                <span className="font-display text-sm font-bold text-sun">0{i + 1}</span>
                <h3 className="mt-4 text-3xl font-extrabold">{t}</h3>
                <p className="mt-3 text-cream/70">{d}</p>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-12 flex flex-wrap gap-3">
            <Button href="/contact?topic=humanity" variant="leaf">Donate or support</Button>
            <Button href="/contact?topic=volunteer" variant="ghost">Volunteer</Button>
          </div>
        </div>
      </section>

      <CtaBand title="Every yes makes a difference." text="Join an event, lend a hand, or partner with us — and help us keep the circle growing." />
    </>
  );
}
