import Pill from "./Pill";
import { CharterIcon } from "./CharterIcons";
import { PRINCIPLES } from "../../lib/data";

export type LandingIntent = "contribute" | "charter";

interface Props {
  /** Staggered entrance animations (welcome overlay). */
  animate?: boolean;
  principlesCount?: number;
  voicesCount?: number;
  versionLabel?: string;
  /** When set, CTAs call this instead of navigating via href. */
  onIntent?: (intent: LandingIntent) => void;
  /** Soften CTAs until the entrance animation has settled. */
  actionsReady?: boolean;
}

const SYNTHESIS = ["Principles", "Commitments", "Challenges", "Voices"] as const;

export default function LandingContent({
  animate = false,
  principlesCount = PRINCIPLES.length,
  voicesCount = 0,
  versionLabel = "1.0",
  onIntent,
  actionsReady = true,
}: Props) {
  const rise = (step: 1 | 2 | 3 | 4 | 5) =>
    animate ? `welcome-animate-rise-${Math.min(step, 4) as 1 | 2 | 3 | 4}` : "";

  const voicesDisplay =
    voicesCount > 0 ? voicesCount.toLocaleString("en-US") : "—";

  return (
    <div className="landing-inner">
      <div className={rise(1)}>
        <span className="welcome-era" aria-label="1776 to 2026">
          <span className="welcome-era-year">1776</span>
          <span className="welcome-era-line" aria-hidden="true" />
          <span className="welcome-era-year">2026</span>
        </span>
      </div>

      <h1
        className={`${rise(2)} mt-8 font-display leading-[0.96] tracking-[-0.025em] text-[var(--color-blue-deep)]`}
        style={{ fontSize: "clamp(40px, 7.4vw, 94px)" }}
      >
        The Future of Technology
        <br />
        <span className="text-[var(--color-red)]">Is Still Being Written.</span>
      </h1>

      <p
        className={`${rise(3)} mx-auto mt-6 max-w-[38rem] text-[17px] leading-[1.7] text-[var(--color-mute)] max-md:text-[15px]`}
      >
        This is a working charter for how technology should serve people — its
        commitments, its open challenges, the standards we hold builders to. Add
        your voice and help decide what comes next.
      </p>

      <div className={`${rise(3)} landing-stats mx-auto mt-10`}>
        <div className="landing-stat">
          <p className="landing-stat-value text-[var(--color-blue)]">{principlesCount}</p>
          <p className="landing-stat-label">Principles</p>
        </div>
        <div className="landing-stat-rule" aria-hidden="true" />
        <div className="landing-stat">
          <p className="landing-stat-value text-[var(--color-red)]">{voicesDisplay}</p>
          <p className="landing-stat-label">Voices</p>
        </div>
        <div className="landing-stat-rule" aria-hidden="true" />
        <div className="landing-stat">
          <p className="landing-stat-value text-[var(--color-gold)]">v{versionLabel}</p>
          <p className="landing-stat-label">Version</p>
        </div>
      </div>

      <div
        className={`${rise(4)} mt-10 flex flex-wrap items-center justify-center gap-3.5 transition-opacity duration-500 ${
          actionsReady ? "opacity-100" : "opacity-40"
        }`}
      >
        {onIntent ? (
          <>
            <Pill
              variant="red"
              onClick={() => actionsReady && onIntent("contribute")}
              className={!actionsReady ? "pointer-events-none" : ""}
            >
              Add your voice
              <CharterIcon name="chevron-right" size={14} />
            </Pill>
            <Pill
              variant="outline"
              onClick={() => actionsReady && onIntent("charter")}
              className={!actionsReady ? "pointer-events-none" : ""}
            >
              Read the charter
            </Pill>
          </>
        ) : (
          <>
            <Pill variant="red" href="/contribute">
              Add your voice
              <CharterIcon name="chevron-right" size={14} />
            </Pill>
            <Pill variant="outline" href="/contribute">
              Read the charter
            </Pill>
          </>
        )}
      </div>

      <div className={`${rise(4)} landing-synthesis mt-12`}>
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-mute)]">
          Every entry is synthesized into a proposed strategy
        </p>
        <div className="landing-synthesis-row">
          {SYNTHESIS.map((label) => (
            <span key={label} className="landing-synthesis-chip">
              {label}
            </span>
          ))}
          <span className="landing-synthesis-arrow" aria-hidden="true">
            →
          </span>
          <span className="landing-synthesis-result">A proposed technology strategy</span>
        </div>
      </div>
    </div>
  );
}
