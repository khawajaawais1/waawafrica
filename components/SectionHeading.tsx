import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
};

export default function SectionHeading({ eyebrow, title, intro, align = "left", tone = "dark", className = "", as: H = "h2" }: Props) {
  const center = align === "center";
  const eyebrowColor = tone === "dark" ? "text-sun" : "text-ember";
  const introColor = tone === "dark" ? "text-cream/70" : "text-ink/70";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p data-reveal className={`eyebrow mb-5 inline-flex items-center gap-3 ${eyebrowColor}`}>
          <span aria-hidden="true" className="kente inline-block h-1.5 w-10 rounded-full" />
          {eyebrow}
        </p>
      )}
      <H data-reveal style={{ ["--d" as string]: "80ms" }} className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold">
        {title}
      </H>
      {intro && (
        <div data-reveal style={{ ["--d" as string]: "160ms" }} className={`mt-6 text-lg leading-relaxed md:text-xl ${introColor} ${center ? "mx-auto" : ""} max-w-2xl`}>
          {intro}
        </div>
      )}
    </div>
  );
}
