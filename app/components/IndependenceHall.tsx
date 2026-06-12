interface Props {
  className?: string;
}

/**
 * Flat, vintage-poster-style illustration of Independence Hall.
 * Solid fills only — no gradients — to match mid-century travel poster printing.
 */
export default function IndependenceHall({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 360 560"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Independence Hall"
    >
      {/* ── Spire ── */}
      {/* Weathervane */}
      <line x1="180" y1="10" x2="180" y2="38" stroke="var(--color-gold)" strokeWidth="3" />
      <polygon points="180,14 196,20 180,26" fill="var(--color-gold)" />
      <circle cx="180" cy="40" r="6" fill="var(--color-gold)" />
      {/* Cone */}
      <polygon points="180,46 158,128 202,128" fill="var(--color-brown)" />

      {/* ── Lantern ── */}
      <rect x="160" y="128" width="40" height="44" fill="var(--color-cream)" />
      <rect x="156" y="124" width="48" height="6" fill="var(--color-cream)" />
      <rect x="170" y="136" width="6" height="28" fill="var(--color-brown)" />
      <rect x="184" y="136" width="6" height="28" fill="var(--color-brown)" />

      {/* ── Belfry (bell stage) ── */}
      <rect x="144" y="178" width="72" height="66" fill="var(--color-cream)" />
      <rect x="138" y="172" width="84" height="8" fill="var(--color-cream)" />
      {/* Arched opening with bell */}
      <path d="M165 244 L165 212 Q180 196 195 212 L195 244 Z" fill="var(--color-brown)" />
      <path d="M174 216 Q180 212 186 216 L186 226 Q180 230 174 226 Z" fill="var(--color-gold)" />
      {/* Columns */}
      <rect x="150" y="184" width="5" height="60" fill="var(--color-rule-light)" />
      <rect x="205" y="184" width="5" height="60" fill="var(--color-rule-light)" />

      {/* ── Clock stage ── */}
      <rect x="136" y="250" width="88" height="74" fill="var(--color-cream)" />
      <rect x="130" y="244" width="100" height="8" fill="var(--color-cream)" />
      <circle cx="180" cy="284" r="22" fill="var(--color-gold)" />
      <circle cx="180" cy="284" r="17" fill="var(--color-cream)" />
      <line x1="180" y1="284" x2="180" y2="272" stroke="var(--color-brown)" strokeWidth="3" />
      <line x1="180" y1="284" x2="189" y2="288" stroke="var(--color-brown)" strokeWidth="3" />

      {/* ── Brick tower base ── */}
      <rect x="128" y="324" width="104" height="76" fill="var(--color-brick)" />
      <rect x="122" y="318" width="116" height="8" fill="var(--color-cream)" />
      {/* Arched tower window */}
      <path d="M166 396 L166 352 Q180 338 194 352 L194 396 Z" fill="var(--color-cream)" />
      <path d="M171 396 L171 355 Q180 346 189 355 L189 396 Z" fill="var(--color-brown)" />

      {/* ── Main building ── */}
      {/* Roof */}
      <polygon points="30,398 330,398 314,378 46,378" fill="var(--color-brown)" />
      {/* Cornice */}
      <rect x="26" y="396" width="308" height="8" fill="var(--color-cream)" />
      {/* Facade */}
      <rect x="34" y="404" width="292" height="132" fill="var(--color-brick)" />
      {/* Belt course */}
      <rect x="34" y="466" width="292" height="5" fill="var(--color-cream)" />

      {/* Upper windows */}
      {[52, 88, 124, 212, 248, 284].map((x) => (
        <g key={`u-${x}`}>
          <rect x={x} y="414" width="22" height="36" fill="var(--color-brown)" />
          <rect x={x - 2} y="448" width="26" height="4" fill="var(--color-cream)" />
          <line x1={x + 11} y1="414" x2={x + 11} y2="450" stroke="var(--color-brick)" strokeWidth="2" />
          <line x1={x} y1="432" x2={x + 22} y2="432" stroke="var(--color-brick)" strokeWidth="2" />
        </g>
      ))}

      {/* Lower windows */}
      {[52, 88, 124, 212, 248, 284].map((x) => (
        <g key={`l-${x}`}>
          <rect x={x} y="482" width="22" height="38" fill="var(--color-brown)" />
          <rect x={x - 2} y="518" width="26" height="4" fill="var(--color-cream)" />
          <line x1={x + 11} y1="482" x2={x + 11} y2="520" stroke="var(--color-brick)" strokeWidth="2" />
          <line x1={x} y1="500" x2={x + 22} y2="500" stroke="var(--color-brick)" strokeWidth="2" />
        </g>
      ))}

      {/* Center window above door */}
      <rect x="169" y="414" width="22" height="36" fill="var(--color-brown)" />
      <rect x="167" y="448" width="26" height="4" fill="var(--color-cream)" />

      {/* Doorway */}
      <path d="M158 536 L158 492 Q180 474 202 492 L202 536 Z" fill="var(--color-cream)" />
      <path d="M164 536 L164 495 Q180 482 196 495 L196 536 Z" fill="var(--color-brown)" />
      <line x1="180" y1="484" x2="180" y2="536" stroke="var(--color-cream)" strokeWidth="2" />

      {/* Ground line */}
      <rect x="14" y="536" width="332" height="8" fill="var(--color-brown)" />
    </svg>
  );
}
