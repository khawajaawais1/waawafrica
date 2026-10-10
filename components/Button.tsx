import Link from "next/link";
import { localizeHref } from "@/lib/i18n/config";
import { dictFor, getLocale } from "@/lib/i18n/server";
import type { ComponentProps, ReactNode } from "react";

type Variant = "sun" | "light" | "ghost" | "dark" | "ember" | "leaf";

const styles: Record<Variant, string> = {
  sun: "bg-sun text-ink [--sweep:var(--color-cream)]",
  ember: "bg-ember text-cream [--sweep:var(--color-ink)]",
  leaf: "bg-leaf text-cream [--sweep:var(--color-ink)]",
  light: "bg-cream text-ink [--sweep:var(--color-sun)]",
  dark: "bg-ink text-cream [--sweep:var(--color-ember)]",
  ghost: "bg-transparent text-current ring-1 ring-inset ring-current/40 hover:text-ink [--sweep:var(--color-cream)]",
};

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
  arrow?: boolean;
} & Omit<ComponentProps<"a">, "href">;

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`arrow size-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function Button({ href, variant = "sun", children, className = "", external, arrow = true, ...rest }: Props) {
  const locale = await getLocale();
  const cls = `btn-sweep group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide transition-[color,transform] duration-300 active:scale-[0.97] ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
        <span className="sr-only"> {dictFor(locale).common.newTab}</span>
      </a>
    );
  }
  return (
    <Link href={localizeHref(href, locale)} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
