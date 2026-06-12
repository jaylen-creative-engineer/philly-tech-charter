interface Props {
  items: string[];
  className?: string;
}

function MarqueeRow({ items }: { items: string[] }) {
  return (
    <div className="flex items-center shrink-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-serif italic text-[clamp(18px,2.2vw,28px)] text-[var(--color-off-white)]/85 whitespace-nowrap px-8">
            {item}
          </span>
          <span className="text-[var(--color-volt)] text-[14px]">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee({ items, className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-y border-[var(--color-hairline)] py-5 select-none ${className}`}
    >
      <div className="marquee-track flex w-max">
        <MarqueeRow items={items} />
        <MarqueeRow items={items} />
      </div>
    </div>
  );
}
