type Props = { items: string[]; className?: string; reverse?: boolean; speed?: string; separator?: string };

export default function Marquee({ items, className = "", reverse, speed = "40s", separator = "✦" }: Props) {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6">{t}</span>
          <span aria-hidden="true" className="opacity-60">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`} data-reverse={reverse || undefined} style={{ ["--speed" as string]: speed }}>
      <Row />
      <Row hidden />
    </div>
  );
}
