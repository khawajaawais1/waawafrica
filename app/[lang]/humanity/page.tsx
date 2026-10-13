import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { img } from "@/lib/images";
import { humanityGallery } from "@/lib/site";
import { hasLocale } from "@/lib/i18n/config";
import { rich } from "@/lib/i18n/rich";
import { dictFor, getT, pageMeta } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/humanity">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictFor(lang).humanity;
  return pageMeta(lang, "/humanity", t.metaTitle, t.metaDescription);
}

/** Photos + place for each initiative (texts in the dictionaries, same order). */
const initiativeMedia = [
  { photo: img.humanityMeal, place: "senegal" },
  { photo: img.humanityTeaching, place: "senegal" },
  { photo: img.humanityGiving, place: "senegal" },
  { photo: img.workshopDrums, place: "finland" },
  { photo: img.communityDinner, place: "finland" },
] as const;

export default async function HumanityPage() {
  const { t: d } = await getT();
  const t = d.humanity;
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={rich(t.title)}
        intro={t.intro}
        photo={img.humanityGroup}
        position="50% 35%"
      >
        <Button href="/contact?topic=humanity" variant="leaf">{t.support}</Button>
        <Button href="#initiatives" variant="ghost">{t.initiativesBtn}</Button>
      </PageHero>

      {/* Statement */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <p data-reveal className="font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-bold leading-[1.1] tracking-tight lg:col-span-8">
            {rich(t.statement, ["text-leaf"])}
          </p>
          <div data-reveal style={{ ["--d" as string]: "150ms" }} className="space-y-4 lg:col-span-3 lg:col-start-10">
            {t.principles.map((pr) => (
              <p key={pr} className="flex items-center gap-3 border-b border-ink/15 pb-4 font-bold">
                <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-leaf" /> {pr}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section id="initiatives" className="scroll-mt-24 py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.initiativesEyebrow} title={rich(t.initiativesTitle)} />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {t.initiatives.map((it, i) => (
              <li
                key={it.t}
                data-reveal
                style={{ ["--d" as string]: `${(i % 3) * 100}ms` }}
                className={`group relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[1.75rem] p-5 sm:min-h-[420px] sm:rounded-[2rem] sm:p-7 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
              >
                <Photo photo={initiativeMedia[i].photo} sizes="(min-width:1024px) 50vw, 100vw" className="!absolute inset-0 -z-10" imgClassName="transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                <span className="eyebrow mb-3 w-fit rounded-full bg-cream/15 px-3 py-1.5 text-[0.6rem] backdrop-blur">{t[initiativeMedia[i].place]}</span>
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
            <p data-reveal className="eyebrow mb-6 text-sun">{t.storyEyebrow}</p>
            <h2 data-reveal className="text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold">{t.storyTitle}</h2>
            <div data-reveal className="mt-8 space-y-5 text-lg leading-relaxed text-cream/85">
              {t.story.map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <div data-reveal className="mt-10"><Button href="/contact?topic=humanity" variant="sun">{t.storyCta}</Button></div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.momentsEyebrow} title={rich(t.momentsTitle)} className="mb-12" />
          <Gallery items={humanityGallery} filters={false} />
        </div>
      </section>

      {/* Partners & collaborations */}
      <section className="bg-cream py-16 text-ink sm:py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading tone="light" eyebrow={t.partnersEyebrow} title={rich(t.partnersTitle, ["text-ember"])} intro={t.partnersIntro} />
            <div data-reveal className="mt-10"><Button href="/contact?topic=partner" variant="dark">{t.partnersCta}</Button></div>
          </div>
          <ul className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-7">
            {t.partners.map((pt, i) => (
              <li key={pt.t} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className={`rounded-[1.75rem] p-7 ${i === 3 ? "bg-sun" : "bg-white/60 ring-1 ring-ink/10"}`}>
                <h3 className="text-2xl font-extrabold">{pt.t}</h3>
                <p className="mt-2 text-ink/70">{pt.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Future */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.futureEyebrow} title={rich(t.futureTitle)} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-cream/10 md:grid-cols-2">
            {t.future.map((f, i) => (
              <li key={f.t} data-reveal className="group bg-ink p-8 transition-colors duration-500 hover:bg-ink-3 md:p-10">
                <span className="font-display text-sm font-bold text-sun">0{i + 1}</span>
                <h3 className="mt-4 text-3xl font-extrabold">{f.t}</h3>
                <p className="mt-3 text-cream/70">{f.d}</p>
              </li>
            ))}
          </ol>
          
          <div data-reveal className="mt-12 flex flex-wrap gap-3">
            <Button href="/contact?topic=humanity" variant="leaf">{t.donate}</Button>
            <Button href="/contact?topic=volunteer" variant="ghost">{t.volunteer}</Button>
          </div>
        </div>
      </section>

      <CtaBand title={t.ctaTitle} text={t.ctaText} />
    </>
  );
}
