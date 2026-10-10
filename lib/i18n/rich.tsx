import type { ReactNode } from "react";

/**
 * Tiny rich-text helper for translated strings:
 *   *word*   → accent (serif italic) span, coloured with classes[n] (cycling)
 *   **word** → bold
 */
export function rich(text: string, classes: string[] = ["text-sun"]): ReactNode[] {
  const out: ReactNode[] = [];
  let accent = 0;
  text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).forEach((part, i) => {
    if (!part) return;
    if (part.startsWith("**")) out.push(<strong key={i} className="font-extrabold">{part.slice(2, -2)}</strong>);
    else if (part.startsWith("*")) out.push(<span key={i} className={`accent ${classes[accent++ % classes.length]}`}>{part.slice(1, -1)}</span>);
    else out.push(part);
  });
  return out;
}

/** Simple {placeholder} replacement. */
export const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
