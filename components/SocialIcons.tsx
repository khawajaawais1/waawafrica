import type { SocialKey } from "@/lib/site";

/** Simple line/brand icons (no external requests). Safe to use in server and client components. */
export function SocialIcon({ name, className = "size-5" }: { name: SocialKey; className?: string }) {
  if (name === "facebook")
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M13.5 21.5v-8h2.7l.4-3.2h-3.1V8.3c0-.9.3-1.5 1.6-1.5h1.7V4a22 22 0 0 0-2.5-.1c-2.5 0-4.1 1.5-4.1 4.2v2.3H7.5v3.2h2.7v8h3.3Z" />
      </svg>
    );
  if (name === "tiktok")
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M16.6 3c.3 2.3 1.7 3.9 4 4.1v3a7 7 0 0 1-4-1.3v5.9a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.1a2.7 2.7 0 1 0 1.9 2.5V3h2.9Z" />
      </svg>
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
