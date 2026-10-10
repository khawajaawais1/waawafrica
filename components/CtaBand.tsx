import Button from "./Button";
import Rays from "./Rays";

export default function CtaBand({
  title = "Say Waaw. Join the family.",
  text = "Dance with us, volunteer with us, build with us. However you show up, there’s a place for you at WaawAfrica.",
}: { title?: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-sun py-16 text-ink sm:py-24 md:py-32">
      <Rays className="absolute -left-6 top-1/2 -z-10 hidden h-[120%] w-auto -translate-y-1/2 opacity-90 md:block" />
      <Rays flip className="absolute -right-6 top-1/2 -z-10 hidden h-[120%] w-auto -translate-y-1/2 opacity-90 md:block" />
      <div className="container-x text-center">
        <h2 data-reveal className="mx-auto max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-extrabold">{title}</h2>
        <p data-reveal style={{ ["--d" as string]: "100ms" }} className="mx-auto mt-6 max-w-xl text-lg text-ink/75">{text}</p>
        <div data-reveal style={{ ["--d" as string]: "200ms" }} className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/contact?topic=join" variant="dark">Join Us</Button>
          <Button href="/events" variant="ghost">Explore Events</Button>
        </div>
      </div>
    </section>
  );
}
