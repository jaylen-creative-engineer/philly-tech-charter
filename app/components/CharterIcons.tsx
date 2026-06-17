/**
 * Flat poster-style icons — solid fills, no gradients, matching IndependenceHall aesthetic.
 */

interface IconProps {
  className?: string;
  size?: number;
}

const defaults = { size: 24, className: "" };

export function IconStar({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2l2.8 6.4L22 9.5l-5 4.5 1.5 6.8L12 17.8 5.5 20.8 7 14 2 9.5l7.2-1.1L12 2z"
      />
    </svg>
  );
}

export function IconScroll({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path fill="currentColor" d="M6 3h10a4 4 0 0 1 4 4v14H8a2 2 0 0 1-2-2V3z" />
      <path fill="var(--color-cream)" d="M8 5h8a2 2 0 0 1 2 2v12H8V5z" />
      <rect x="10" y="9" width="6" height="1.5" fill="currentColor" opacity="0.5" />
      <rect x="10" y="12.5" width="5" height="1.5" fill="currentColor" opacity="0.5" />
      <rect x="10" y="16" width="6" height="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function IconPen({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path fill="currentColor" d="M18.4 2.6a2 2 0 0 1 2.8 2.8L8.8 17.8l-4.6 1.8 1.8-4.6L18.4 2.6z" />
      <path fill="var(--color-gold)" d="M17 4l3 3-1.4 1.4-3-3L17 4z" />
    </svg>
  );
}

export function IconSignature({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" />
      <path
        d="M6 14c2-3 4-3 6 0s4 3 6 0"
        stroke="var(--color-blue)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="8" cy="9" r="1.5" fill="var(--color-gold)" />
    </svg>
  );
}

export function IconPrinciple({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="2" fill="currentColor" />
      <rect x="7" y="7" width="10" height="2" fill="var(--color-gold)" />
      <rect x="7" y="11" width="8" height="1.5" fill="var(--color-cream)" opacity="0.7" />
      <rect x="7" y="14" width="9" height="1.5" fill="var(--color-cream)" opacity="0.7" />
      <rect x="7" y="17" width="6" height="1.5" fill="var(--color-cream)" opacity="0.7" />
    </svg>
  );
}

export function IconVoice({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 3a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V7a4 4 0 0 0-4-4z" />
      <rect x="10" y="17" width="4" height="3" rx="1" fill="currentColor" />
      <rect x="7" y="20" width="10" height="2" rx="1" fill="currentColor" />
      <path fill="var(--color-gold)" d="M18 9h2v2a6 6 0 0 1-6 6v-2a4 4 0 0 0 4-4V9z" />
    </svg>
  );
}

export function IconTimeline({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <rect x="11" y="3" width="2" height="18" fill="currentColor" opacity="0.4" />
      <circle cx="12" cy="6" r="3" fill="currentColor" />
      <circle cx="12" cy="12" r="2.5" fill="var(--color-gold)" />
      <circle cx="12" cy="18" r="3" fill="currentColor" />
    </svg>
  );
}

export function IconLayers({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 2 2 8l10 6 10-6-10-6z" />
      <path fill="currentColor" opacity="0.7" d="M2 13l10 6 10-6-2.5-1.5L12 17.5 4.5 11.5 2 13z" />
      <path fill="currentColor" opacity="0.5" d="M2 18l10 6 10-6-2.5-1.5L12 22.5 4.5 16.5 2 18z" />
    </svg>
  );
}

export function IconCulture({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <rect x="3" y="10" width="18" height="10" fill="currentColor" />
      <polygon points="12,3 21,10 3,10" fill="var(--color-gold)" />
      <rect x="10" y="14" width="4" height="6" fill="var(--color-cream)" />
    </svg>
  );
}

export function IconAccess({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path fill="currentColor" d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8H4z" />
      <circle cx="18" cy="7" r="2" fill="var(--color-gold)" />
      <path d="M15 14c1.5-1 3.5-1 5 0" stroke="var(--color-gold)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function IconPublic({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9" ry="4" fill="none" stroke="var(--color-cream)" strokeWidth="1.5" />
      <line x1="12" y1="3" x2="12" y2="21" stroke="var(--color-cream)" strokeWidth="1.5" />
    </svg>
  );
}

export function IconMeasure({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <rect x="4" y="8" width="16" height="8" rx="1" fill="currentColor" />
      <rect x="6" y="10" width="1.5" height="4" fill="var(--color-gold)" />
      <rect x="9" y="10" width="1" height="4" fill="var(--color-cream)" opacity="0.6" />
      <rect x="11.5" y="10" width="1.5" height="4" fill="var(--color-gold)" />
      <rect x="14.5" y="10" width="1" height="4" fill="var(--color-cream)" opacity="0.6" />
      <rect x="17" y="10" width="1.5" height="4" fill="var(--color-gold)" />
    </svg>
  );
}

export function IconTarget({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.25" />
      <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="var(--color-gold)" />
    </svg>
  );
}

export function IconRefinement({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path fill="currentColor" d="M4 4h12v2H6v12H4V4z" />
      <path fill="var(--color-gold)" d="M8 8h10v2H8V8zm0 4h8v2H8v-2zm0 4h6v2H8v-2z" />
    </svg>
  );
}

export function IconChallenge({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 2 3 7v10l9 5 9-5V7L12 2z" />
      <path d="M12 8v5M9.5 10.5h5" stroke="var(--color-blue)" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function IconEvidence({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" fill="currentColor" />
      <rect x="8" y="7" width="8" height="6" fill="var(--color-cream)" />
      <circle cx="12" cy="10" r="2" fill="var(--color-gold)" />
      <rect x="8" y="15" width="8" height="1.5" fill="var(--color-cream)" opacity="0.7" />
    </svg>
  );
}

export function IconQuestion({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path
        d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3.5"
        stroke="var(--color-cream)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="17" r="1" fill="var(--color-cream)" />
    </svg>
  );
}

export function IconChevronRight({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconArrowRight({ size = defaults.size, className = defaults.className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path fill="currentColor" d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
    </svg>
  );
}

export type CharterIconName =
  | "star"
  | "scroll"
  | "pen"
  | "signature"
  | "principle"
  | "voice"
  | "timeline"
  | "layers"
  | "culture"
  | "access"
  | "public"
  | "measure"
  | "target"
  | "refinement"
  | "challenge"
  | "evidence"
  | "question"
  | "chevron-right"
  | "arrow-right";

const ICON_MAP = {
  star: IconStar,
  scroll: IconScroll,
  pen: IconPen,
  signature: IconSignature,
  principle: IconPrinciple,
  voice: IconVoice,
  timeline: IconTimeline,
  layers: IconLayers,
  culture: IconCulture,
  access: IconAccess,
  public: IconPublic,
  measure: IconMeasure,
  target: IconTarget,
  refinement: IconRefinement,
  challenge: IconChallenge,
  evidence: IconEvidence,
  question: IconQuestion,
  "chevron-right": IconChevronRight,
  "arrow-right": IconArrowRight,
} as const;

export function CharterIcon({
  name,
  size = 24,
  className = "",
}: {
  name: CharterIconName;
  size?: number;
  className?: string;
}) {
  const Icon = ICON_MAP[name];
  return <Icon size={size} className={className} />;
}
