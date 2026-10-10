/** Decorative sun-rays motif echoing the curved strokes in the WaawAfrica logo. */
export default function Rays({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 200" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M100 20 C 50 60, 30 120, 40 190" fill="none" stroke="var(--color-leaf)" strokeWidth="14" strokeLinecap="round" />
      <path d="M70 50 C 30 90, 15 140, 22 195" fill="none" stroke="var(--color-ember)" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}
