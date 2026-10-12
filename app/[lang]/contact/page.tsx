import type { Metadata } from "next";
import { ContactForm } from "@/components/Forms";
import { SocialIcon } from "@/components/SocialIcons";
import Photo from "@/components/Photo";
import { img } from "@/lib/images";
import { site, socialLinks } from "@/lib/site";
import { hasLocale } from "@/lib/i18n/config";
import { fmt, rich } from "@/lib/i18n/rich";
import { dictFor, getT, pageMeta } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictFor(lang).contact;
  return pageMeta(lang, "/contact", t.metaTitle, t.metaDescription);
}

const wayStyles = [
  { c: "bg-sun text-ink", topic: "partner" },
  { c: "bg-ember", topic: "performance" },
  { c: "bg-leaf", topic: "workshop" },
  { c: "bg-cream text-ink", topic: "humanity" },
];

export default async function ContactPage() {
  const { t: d } = await getT();
  const t = d.contact;
  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24">
        <div aria-hidden="true" className="glow absolute -inset-[10%] -z-10" />
        <div className="container-x">
          <p className="eyebrow fade-up mb-6 inline-flex items-center gap-3 text-sun">
            <span aria-hidden="true" className="kente inline-block h-1.5 w-10 rounded-full" /> {t.eyebrow}
          </p>
          <h1 className="fade-up max-w-5xl text-[clamp(3rem,9vw,8rem)] font-extrabold" style={{ ["--d" as string]: "100ms" }}>
            {rich(t.title)}
          </h1>
          <p className="fade-up mt-8 max-w-2xl text-lg text-cream/80 md:text-xl" style={{ ["--d" as string]: "200ms" }}>
            {t.intro}
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4">
            {t.ways.map((w, i) => (
              <li key={w.t} className="fade-up" style={{ ["--d" as string]: `${300 + i * 80}ms` }}>
                <a href={`?topic=${wayStyles[i].topic}#form`} className={`group flex h-full flex-col justify-between gap-6 rounded-[1.5rem] p-4 transition-transform duration-500 hover:-translate-y-1.5 sm:gap-10 sm:rounded-[1.75rem] sm:p-6 ${wayStyles[i].c}`}>
                  <span className="text-xs font-semibold sm:text-sm">{w.d}</span>
                  <span className="flex items-end justify-between gap-2 font-display text-lg font-extrabold leading-tight sm:gap-4 sm:text-2xl">
                    {w.t} <span aria-hidden="true" className="transition-transform duration-500 group-hover:-rotate-45">→</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="form" className="scroll-mt-20 bg-cream py-14 text-ink sm:py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 data-reveal className="text-4xl font-extrabold md:text-6xl">{t.formTitle}</h2>
            <p data-reveal className="mb-10 mt-4 text-lg text-ink/70">{t.formIntro}</p>
            <ContactForm />
          </div>
          <aside className="space-y-5 lg:col-span-4 lg:col-start-9" aria-label={t.details}>
            <div data-reveal className="rounded-[1.75rem] bg-ink p-8 text-cream">
              <dl className="space-y-6">
                <div>
                  <dt className="eyebrow text-[0.65rem] text-sun">{d.common.email}</dt>
                  <dd className="mt-1 text-lg font-bold"><a className="link-u" href={`mailto:${site.email}`}>{site.email}</a></dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.65rem] text-sun">{d.common.phone}</dt>
                  <dd className="mt-1 text-lg font-bold"><a className="link-u" href={`tel:${site.phoneHref}`}>{site.phone}</a></dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.65rem] text-sun">{d.common.basedIn}</dt>
                  <dd className="mt-1 text-lg font-bold">{d.common.locations.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.65rem] text-sun">{d.common.follow}</dt>
                  <dd className="mt-2">
                    <ul className="flex flex-col gap-2">
                      {socialLinks.map((sl) => (
                        <li key={sl.key}>
                          <a
                            href={sl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 rounded-full bg-cream/10 px-4 py-2.5 font-bold transition-colors hover:bg-sun hover:text-ink"
                          >
                            <SocialIcon name={sl.key} />
                            <span><span className="sr-only">{sl.label}: </span>{sl.handle}</span>
                            <span className="sr-only"> {fmt(d.common.onSocial, { network: sl.label })}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
            <Photo photo={img.clubEmbrace} curtain sizes="(min-width:1024px) 30vw, 100vw" className="aspect-[3/2] rounded-[1.75rem]" />
          </aside>
        </div>
      </section>

      <section className="py-14 sm:py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <h2 data-reveal className="text-4xl font-extrabold md:text-6xl lg:col-span-4">{rich(t.faqTitle)}</h2>
          <div className="lg:col-span-7 lg:col-start-6">
            {t.faqs.map(({ q, a }) => (
              <details key={q} data-reveal className="group border-b border-cream/15 py-6">
                <summary className="flex items-center justify-between gap-6 text-xl font-bold md:text-2xl">
                  {q}
                  <span aria-hidden="true" className="faq-icon grid size-10 shrink-0 place-items-center rounded-full bg-cream/10 text-2xl transition-transform duration-300">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-cream/75">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
