import Pill from "./Pill";

export function RecordLoading({ label }: { label: string }) {
  return <p className="text-[14px] text-[var(--color-mute)]">{label}</p>;
}

export function RecordError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="card-surface border-2 border-[var(--color-red)] bg-[var(--color-paper)] p-6">
      <p className="mb-4 text-[14px] leading-[1.7] text-[var(--color-ink)]">{message}</p>
      <Pill variant="outline" onClick={onRetry}>
        Try again
      </Pill>
    </div>
  );
}

export function RecordEmpty({
  message,
  href,
  hrefLabel,
}: {
  message: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="py-4">
      <p className="mb-4 text-[14px] leading-[1.7] text-[var(--color-mute)]">{message}</p>
      {href && hrefLabel ? (
        <Pill variant="red" href={href}>
          {hrefLabel}
        </Pill>
      ) : null}
    </div>
  );
}
