import type { ReactNode } from "react";
import type { Photo as P } from "@/lib/images";
import Photo from "./Photo";

type Props = { eyebrow: string; title: ReactNode; intro?: ReactNode; photo?: P; children?: ReactNode; position?: string; media?: ReactNode };

/** Shared immersive hero for inner pages. */
export default function PageHero({ eyebrow, title, intro, photo, children, position, media }: Props) {
  return (
    <section className="grain relative isolate flex min-h-[78svh] items-end overflow-hidden pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24">
      <div className="absolute inset-0 -z-10">
        {media ?? (photo && <Photo photo={photo} priority sizes="100vw" className="h-full w-full" imgClassName="scale-105" position={position} />)}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
        <div className="glow absolute inset-0 opacity-70" />
      </div>
      <div aria-hidden="true" className="kente absolute inset-x-0 bottom-0 h-1.5" />
      <div className="container-x">
        <p className="eyebrow fade-up mb-6 inline-flex items-center gap-3 text-sun">
          <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
          {eyebrow}
        </p>
        <h1 className="slide-up max-w-5xl text-[clamp(3rem,9vw,8.5rem)] font-extrabold" style={{ ["--d" as string]: "100ms" }}>
          {title}
        </h1>
        {intro && (
          <p className="slide-up mt-8 max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl" style={{ ["--d" as string]: "220ms" }}>
            {intro}
          </p>
        )}
        {children && <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "320ms" }}>{children}</div>}
      </div>
    </section>
  );
}
