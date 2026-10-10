import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { img } from "@/lib/images";
import { hasLocale } from "@/lib/i18n/config";
import { rich } from "@/lib/i18n/rich";
import { dictFor, getT, pageMeta } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictFor(lang).about;
  return pageMeta(lang, "/about", t.metaTitle, t.metaDescription);
}

const valueColors = ["bg-sun text-ink", "bg-ink-3 text-cream", "bg-ember text-cream", "bg-leaf text-cream", "bg-cream text-ink", "bg-flame text-ink"];

export default async function AboutPage() {
  const { t: d } = await getT();
  const t = d.about;
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={<>{t.title1}<br /><span className="accent text-sun">{t.title2}</span></>}
        intro={t.intro}
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
            <SectionHeading tone="light" eyebrow={t.storyEyebrow} title={rich(t.storyTitle, ["text-ember"])} />
            <div className="mt-10 space-y-7 text-lg leading-relaxed text-ink/80 md:text-xl">
              {t.story.map((para, i) => (
                <p key={i} data-reveal>{rich(para, ["text-ink"])}</p>
              ))}
            </div>
            <blockquote data-reveal className="mt-14 border-l-4 border-ember pl-6 font-display text-3xl font-bold leading-tight md:text-4xl">
              {t.quote}
            </blockquote>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="py-16 sm:py-24 md:py-36">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <article data-reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-leaf to-[#0d5c2b] p-10 md:p-14">
            <p className="eyebrow mb-6 text-sun">{t.vision}</p>
            <h2 className="text-4xl font-extrabold md:text-5xl">{t.visionText}</h2>
          </article>
          <article data-reveal style={{ ["--d" as string]: "120ms" }} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ember to-[#8c1510] p-10 md:p-14">
            <p className="eyebrow mb-6 text-sun">{t.mission}</p>
            <h2 className="text-4xl font-extrabold md:text-5xl">{t.missionText}</h2>
          </article>
        </div>
      </section>

      <div className="border-y border-cream/10 py-6">
        <Marquee items={t.values.map((v) => v.t)} className="font-display text-3xl font-extrabold text-cream/80 md:text-5xl" reverse speed="45s" />
      </div>

      {/* Values */}
      <section className="py-16 sm:py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={t.valuesEyebrow} title={rich(t.valuesTitle)} />
          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.values.map((v, i) => (
              <li
                key={v.t}
                data-reveal
                style={{ ["--d" as string]: `${(i % 3) * 100}ms` }}
                className={`group rounded-[1.75rem] p-6 transition-transform duration-500 hover:-translate-y-2 sm:p-8 ${valueColors[i % valueColors.length]}`}
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
            <SectionHeading tone="light" eyebrow={t.goalsEyebrow} title={rich(t.goalsTitle, ["text-ember"])} intro={t.goalsIntro} />
            <div className="mt-10 grid grid-cols-2 gap-4">
              <Photo photo={img.stageDanceSchool} curtain sizes="25vw" className="aspect-square rounded-3xl" />
              <Photo photo={img.humanityGroup} curtain delay={150} sizes="25vw" className="aspect-square rounded-3xl" />
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {t.goals.map((g, i) => (
              <li key={g.t} data-reveal className="group flex gap-6 border-t border-ink/15 py-9 last:border-b">
                <span className="font-display text-5xl font-extrabold text-ember/80 transition-colors group-hover:text-leaf">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl font-extrabold md:text-3xl">{g.t}</h3>
                  <p className="mt-3 text-lg text-ink/70">{g.d}</p>
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
          <p data-reveal className="eyebrow mb-6 text-sun">{t.mottoEyebrow}</p>
          <h2 data-reveal className="max-w-3xl text-[clamp(3rem,9vw,8rem)] font-extrabold">{rich(t.motto, ["tricolor-text"])}</h2>
          <p data-reveal className="mt-8 max-w-lg text-lg text-cream/80">{t.mottoText}</p>
          <div data-reveal className="mt-10"><Button href="/events">{t.mottoCta}</Button></div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
