import Image from "next/image";
import type { Photo as P } from "@/lib/images";
import { localizePhoto } from "@/lib/i18n/alts";
import { getLocale } from "@/lib/i18n/server";

type Props = {
  photo: P;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  curtain?: boolean;
  delay?: number;
  position?: string;
  quality?: number;
};

/** Optimised, lazy-loaded image with blur placeholder and optional curtain reveal. */
export default async function Photo({ photo, className = "", imgClassName = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority, curtain, delay = 0, position, quality = 70 }: Props) {
  const { alt } = localizePhoto(photo, await getLocale());
  return (
    <div
      className={`relative overflow-hidden bg-ink-3 ${className}`}
      data-curtain={curtain || undefined}
      style={delay ? { ["--d" as string]: `${delay}ms` } : undefined}
    >
      <Image
        src={photo.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        quality={quality}
        className={`object-cover ${imgClassName}`}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
