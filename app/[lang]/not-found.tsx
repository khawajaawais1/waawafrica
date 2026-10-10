import Button from "@/components/Button";
import { rich } from "@/lib/i18n/rich";
import { getT } from "@/lib/i18n/server";

export default async function NotFound() {
  const { t } = await getT();
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-[var(--header-h)]">
      <p className="eyebrow mb-6 text-sun">{t.notFound.eyebrow}</p>
      <h1 className="text-[clamp(2.8rem,10vw,9rem)] font-extrabold">{rich(t.notFound.title)}</h1>
      <div className="mt-10"><Button href="/">{t.notFound.back}</Button></div>
    </section>
  );
}
