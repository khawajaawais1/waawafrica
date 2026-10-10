import { getT } from "@/lib/i18n/server";
import Button from "./Button";
import Rays from "./Rays";

export default async function CtaBand({ title, text }: { title?: string; text?: string }) {
  const { t } = await getT();
  title ??= t.cta.title;
  text ??= t.cta.text;
  return (
    <section className="relative isolate overflow-hidden bg-sun py-16 text-ink sm:py-24 md:py-32">
      <Rays className="absolute -left-6 top-1/2 -z-10 hidden h-[120%] w-auto -translate-y-1/2 opacity-90 md:block" />
      <Rays flip className="absolute -right-6 top-1/2 -z-10 hidden h-[120%] w-auto -translate-y-1/2 opacity-90 md:block" />
      <div className="container-x text-center">
        <h2 data-reveal className="mx-auto max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-extrabold">{title}</h2>
        <p data-reveal style={{ ["--d" as string]: "100ms" }} className="mx-auto mt-6 max-w-xl text-lg text-ink/75">{text}</p>
        <div data-reveal style={{ ["--d" as string]: "200ms" }} className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/contact?topic=join" variant="dark">{t.cta.join}</Button>
          <Button href="/events" variant="ghost">{t.cta.explore}</Button>
        </div>
      </div>
    </section>
  );
}
