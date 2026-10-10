import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/Forms";
import { InstagramIcon } from "@/components/Footer";
import Photo from "@/components/Photo";
import { img } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with WaawAfrica to partner, perform, book a workshop, join events or support our community work.",
};

const ways = [
  { t: "Partner & sponsor", d: "Brands, venues and organisations", c: "bg-sun text-ink", topic: "partner" },
  { t: "Perform or DJ", d: "Artists, dancers, DJs & MCs", c: "bg-ember", topic: "performance" },
  { t: "Book a workshop", d: "Schools, teams and communities", c: "bg-leaf", topic: "workshop" },
  { t: "Support our work", d: "Donate, volunteer or collaborate", c: "bg-cream text-ink", topic: "humanity" },
];

const faqs = [
  ["Where do I buy event tickets?", "Tickets for our club nights are sold on Kide.app. Some events also accept cash or mobile pay at the door — check each event’s details."],
  ["Can you perform at our event or festival?", "Yes! We offer live drum & dance shows, DJs and MCs. Tell us about your date, venue and audience using the form."],
  ["Do you run workshops for schools?", "We do — djembe and West African dance sessions adapted for every age. Pick “Book a workshop” in the form."],
  ["How can I support the community work in Senegal?", "You can donate, volunteer, sponsor a project or partner with us. Choose “Support community work” and we’ll share the options."],
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24">
        <div aria-hidden="true" className="glow absolute -inset-[10%] -z-10" />
        <div className="container-x">
          <p className="eyebrow fade-up mb-6 inline-flex items-center gap-3 text-sun">
            <span aria-hidden="true" className="kente inline-block h-1.5 w-10 rounded-full" /> Contact us
          </p>
          <h1 className="fade-up max-w-5xl text-[clamp(3rem,9vw,8rem)] font-extrabold" style={{ ["--d" as string]: "100ms" }}>
            Let’s make something <span className="accent text-sun">together.</span>
          </h1>
          <p className="fade-up mt-8 max-w-2xl text-lg text-cream/80 md:text-xl" style={{ ["--d" as string]: "200ms" }}>
            Whether you want to collaborate, partner, join an event or support our community work — our door (and our dance floor) is always open.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4">
            {ways.map((w, i) => (
              <li key={w.t} className="fade-up" style={{ ["--d" as string]: `${300 + i * 80}ms` }}>
                <a href={`?topic=${w.topic}#form`} className={`group flex h-full flex-col justify-between gap-6 rounded-[1.5rem] p-4 transition-transform duration-500 hover:-translate-y-1.5 sm:gap-10 sm:rounded-[1.75rem] sm:p-6 ${w.c}`}>
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
            <h2 data-reveal className="text-4xl font-extrabold md:text-6xl">Send us a message</h2>
            <p data-reveal className="mb-10 mt-4 text-lg text-ink/70">We read every message and usually reply within a few days.</p>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-ink/5" />}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="space-y-5 lg:col-span-4 lg:col-start-9" aria-label="Contact details">
            <div data-reveal className="rounded-[1.75rem] bg-ink p-8 text-cream">
              <dl className="space-y-6">
                <div>
                  <dt className="eyebrow text-[0.65rem] text-sun">Email</dt>
                  <dd className="mt-1 text-lg font-bold"><a className="link-u" href={`mailto:${site.email}`}>{site.email}</a></dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.65rem] text-sun">Phone</dt>
                  <dd className="mt-1 text-lg font-bold"><a className="link-u" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.65rem] text-sun">Based in</dt>
                  <dd className="mt-1 text-lg font-bold">{site.locations.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-[0.65rem] text-sun">Follow</dt>
                  <dd className="mt-2">
                    <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-cream/10 px-4 py-2.5 font-bold transition-colors hover:bg-sun hover:text-ink">
                      <InstagramIcon /> {site.socials.instagramHandle}
                      <span className="sr-only"> on Instagram (opens in a new tab)</span>
                    </a>
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
          <h2 data-reveal className="text-4xl font-extrabold md:text-6xl lg:col-span-4">Good to <span className="accent text-sun">know.</span></h2>
          <div className="lg:col-span-7 lg:col-start-6">
            {faqs.map(([q, a]) => (
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
