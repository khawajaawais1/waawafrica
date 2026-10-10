import type { Metadata } from "next";
import Button from "@/components/Button";
import { WaitlistForm } from "@/components/Forms";
import Marquee from "@/components/Marquee";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Dakar Bazaar — Coming Soon",
  description: "Dakar Bazaar by WaawAfrica: an online marketplace for African-inspired fashion, textiles, art, music and lifestyle. Join the waitlist.",
};

const categories = [
  { t: "Textiles & Wax Print", d: "Bold fabrics by the metre and ready to sew.", style: { ["--p1" as string]: "var(--color-sun)", ["--p2" as string]: "var(--color-ember)" } },
  { t: "Fashion & Accessories", d: "Statement pieces, jewellery and bags.", photo: img.stageDancerJump },
  { t: "Art & Décor", d: "Prints, sculpture and colour for your walls.", style: { ["--p1" as string]: "var(--color-leaf)", ["--p2" as string]: "var(--color-sun)" } },
  { t: "Music & Instruments", d: "Djembes, shakers and sounds of the Sahel.", photo: img.stageDjembeFlag },
  { t: "Beauty & Wellness", d: "Shea, black soap and natural rituals.", style: { ["--p1" as string]: "var(--color-flame)", ["--p2" as string]: "var(--color-earth)" } },
  { t: "WaawAfrica Merch", d: "Wear the movement. Be multicultural.", photo: img.summerMcBanner },
];

const why = [
  ["Made by African creators", "Every product tells the story of the hands that made it."],
  ["Fair from the start", "Honest prices that respect makers and their craft."],
  ["Culture you can hold", "Pieces that carry meaning, not just a look."],
];

export default function BazaarPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-20 pt-[calc(var(--header-h)+4rem)] md:min-h-svh md:pb-28">
        <div aria-hidden="true" className="pattern-diamond absolute inset-0 -z-20 opacity-[0.13]" />
        <div aria-hidden="true" className="glow absolute -inset-[10%] -z-10" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow fade-up mb-7 inline-flex items-center gap-3 rounded-full bg-sun px-4 py-2 text-ink">
              <span className="size-2 animate-pulse rounded-full bg-ember" /> Coming soon
            </p>
            <h1 className="fade-up text-[clamp(3.6rem,12vw,10rem)] font-extrabold leading-[0.85]" style={{ ["--d" as string]: "100ms" }}>
              Dakar <span className="accent tricolor-text block pb-2">Bazaar</span>
            </h1>
            <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-cream/80 md:text-xl" style={{ ["--d" as string]: "220ms" }}>
              The colour, noise and soul of a Dakar market — online. African-inspired fashion, textiles, art, music and lifestyle, curated by
              WaawAfrica and made by creators we believe in.
            </p>
            <div className="fade-up mt-10" style={{ ["--d" as string]: "320ms" }}>
              <WaitlistForm />
              <p className="text-sm text-cream/50">Be first through the doors — early members get launch perks.</p>
            </div>
          </div>
          <div className="relative mx-auto h-[440px] w-full max-w-md lg:col-span-5 lg:h-[560px]">
            <div className="fade-up absolute right-0 top-0 h-[70%] w-[64%]" style={{ ["--d" as string]: "200ms" }}>
              <div className="float h-full w-full [--r:2deg]">
                <Photo photo={img.stageMaskedDancer} priority sizes="(min-width:1024px) 25vw, 60vw" className="h-full w-full rotate-2 rounded-[2rem] ring-1 ring-cream/10" />
              </div>
            </div>
            <div className="fade-up absolute bottom-0 left-0 h-[52%] w-[56%]" style={{ ["--d" as string]: "350ms" }}>
              <div className="pattern-diamond h-full w-full -rotate-3 rounded-[2rem] ring-4 ring-ink [--p1:var(--color-leaf)] [--p2:var(--color-sun)]" />
            </div>
            <div aria-hidden="true" className="fade-up absolute bottom-10 right-4 grid size-32 place-items-center rounded-full bg-ember text-center font-display text-lg font-extrabold leading-tight shadow-2xl" style={{ ["--d" as string]: "500ms" }}>
              Opening<br />soon
            </div>
          </div>
        </div>
      </section>

      <div className="rotate-1 bg-sun py-4 text-ink">
        <Marquee items={["Wax print", "Kente", "Djembe", "Shea", "Jewellery", "Art prints", "Bogolan", "Merch"]} className="font-display text-2xl font-extrabold uppercase md:text-4xl" />
      </div>

      {/* Categories */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="A first look" title={<>What’s on <span className="accent text-sun">the stalls.</span></>} intro="A preview of the aisles we’re stocking. Products are being curated now." />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-3">
            {categories.map((c, i) => (
              <li key={c.t} data-reveal style={{ ["--d" as string]: `${(i % 3) * 100}ms` }} className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.5rem] p-4 ring-1 ring-cream/10 sm:rounded-[2rem] sm:p-7">
                {c.photo ? (
                  <Photo photo={c.photo} sizes="(min-width:1024px) 33vw, 50vw" className="!absolute inset-0 -z-10" imgClassName="transition-transform duration-1000 group-hover:scale-110" />
                ) : (
                  <div aria-hidden="true" className="pattern-diamond absolute inset-0 -z-10 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2" style={c.style} />
                )}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="eyebrow absolute right-3 top-3 rounded-full sm:right-5 sm:top-5 bg-ink/70 px-3 py-1.5 text-[0.6rem] backdrop-blur">Soon</span>
                <h3 className="text-lg font-extrabold leading-tight sm:text-3xl">{c.t}</h3>
                <p className="mt-1 text-xs text-cream/80 sm:mt-2 sm:text-base">{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading tone="light" eyebrow="Why Dakar Bazaar" title={<>A market with <span className="accent text-ember">meaning.</span></>} />
          </div>
          <ul className="space-y-0 lg:col-span-7">
            {why.map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }} className="flex gap-6 border-t border-ink/15 py-8 last:border-b">
                <span className={`mt-1 size-4 shrink-0 rounded-full ${["bg-leaf", "bg-sun", "bg-ember"][i]}`} />
                <div>
                  <h3 className="text-2xl font-extrabold md:text-3xl">{t}</h3>
                  <p className="mt-2 text-lg text-ink/70">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Waitlist + makers */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24 md:py-32">
        <div aria-hidden="true" className="pattern-dots absolute inset-0 -z-10 opacity-10" />
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <div data-reveal className="rounded-[2rem] bg-ember p-8 md:p-12">
            <h2 className="text-4xl font-extrabold md:text-5xl">Be notified at launch.</h2>
            <p className="mt-4 max-w-md text-cream/85">One email when the doors open. No spam, ever — just colour.</p>
            <div className="mt-8"><WaitlistForm /></div>
          </div>
          <div data-reveal style={{ ["--d" as string]: "120ms" }} className="flex flex-col justify-between rounded-[2rem] bg-leaf p-8 md:p-12">
            <div>
              <h2 className="text-4xl font-extrabold md:text-5xl">Are you a maker?</h2>
              <p className="mt-4 max-w-md text-cream/85">Designers, artisans, artists and small brands with African roots — we’d love to feature your work in Dakar Bazaar.</p>
            </div>
            <div className="mt-8"><Button href="/contact?topic=bazaar" variant="sun">Apply to sell</Button></div>
          </div>
        </div>
      </section>
    </>
  );
}
