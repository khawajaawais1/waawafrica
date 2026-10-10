import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-[var(--header-h)]">
      <p className="eyebrow mb-6 text-sun">404 · Lost the beat</p>
      <h1 className="text-[clamp(3rem,10vw,9rem)] font-extrabold">This page <span className="accent text-sun">danced</span> away.</h1>
      <div className="mt-10"><Button href="/">Back home</Button></div>
    </section>
  );
}
