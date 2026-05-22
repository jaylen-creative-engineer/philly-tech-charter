interface Props {
  children: string;
}

export default function SectionLabel({ children }: Props) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--color-volt)] mb-6">
      {children}
    </p>
  );
}
