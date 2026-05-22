import ScrollReveal from "../components/ScrollReveal";

function DocSectionNum({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--color-volt)] mb-4">
      {children}
      <span className="flex-1 h-px bg-[var(--color-hairline)]" />
    </div>
  );
}

function PullQuote({ children }: { children: string }) {
  return (
    <blockquote className="border-l-2 border-[var(--color-volt)] pl-7 my-10">
      <p className="font-serif text-[22px] italic leading-[1.6] text-[var(--color-off-white)]">
        {children}
      </p>
    </blockquote>
  );
}

function DocP({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-serif text-[18px] leading-[1.8] text-[var(--color-off-white)]/80 mb-5">
      {children}
    </p>
  );
}

export default function Document() {
  return (
    <section id="document">
      {/* Document header */}
      <div className="px-12 max-md:px-6">
        <ScrollReveal className="max-w-[800px] mx-auto pt-24 pb-16 border-b border-[var(--color-hairline)] text-center">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--color-volt)] mb-5">
            Philadelphia · May 2026 · Version 1.0
          </p>
          <div className="inline-flex items-center gap-1.5 bg-[var(--color-volt)]/10 border border-[var(--color-volt)]/25 text-[var(--color-volt)] text-[10px] font-semibold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-volt)] animate-pulse-dot" />
            Living Document
          </div>
          <h2
            className="font-serif leading-[1.0] tracking-[-0.025em] text-[var(--color-off-white)] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            A Declaration of
            <br />
            <em className="text-[var(--color-volt)]">Intentional Design</em>
          </h2>
          <p className="text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-mute)]">
            Written in Philadelphia · On the occasion of America&apos;s 250th year
          </p>
        </ScrollReveal>
      </div>

      {/* Document body */}
      <div className="max-w-[680px] mx-auto px-12 py-20 max-md:px-6 space-y-18">

        <ScrollReveal>
          <div>
            <DocSectionNum>Preamble</DocSectionNum>
            <h3
              className="font-serif leading-[1.1] tracking-[-0.02em] text-[var(--color-off-white)] mb-6"
              style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
            >
              We have been here before.
            </h3>
            <DocP>
              Two hundred and fifty years ago, a group of people sat in this city, looked honestly at the world they lived in, and had the audacity to write down a vision for something better. They did not have all the answers. They were imperfect and incomplete. But they were intentional — and that intention became the foundation of a nation.
            </DocP>
            <DocP>
              We are their inheritors, in every sense of that word. We inherit the promise they set down, the contradictions they left unresolved, and the responsibility to keep expanding what that promise means. We gather now, at the 250th year of this American experiment, to exercise that same audacity — not to rewrite what they began, but to extend it into a moment they could not have imagined.
            </DocP>
            <PullQuote>
              The question is not whether technology will reshape our culture. It will. The question is whether we will be the authors of that reshaping, or merely its audience.
            </PullQuote>
            <DocP>
              We choose to be authors. We choose intention over reaction. We offer this document as a beginning — not a conclusion.
            </DocP>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <DocSectionNum>Section I</DocSectionNum>
            <h3
              className="font-serif leading-[1.1] tracking-[-0.02em] text-[var(--color-off-white)] mb-6"
              style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
            >
              On the <em className="text-[var(--color-volt)]">nature of tools</em>
            </h3>
            <DocP>
              Artificial intelligence is a tool. So is language. So is architecture. So is law. So is music.{" "}
              <strong className="text-[var(--color-off-white)] font-normal">
                Tools do not have values — but the systems we build with them do.
              </strong>{" "}
              The systems reflect the values, intentions, and blind spots of those who designed them.
            </DocP>
            <DocP>
              Culture is also a tool — perhaps the most powerful one. Culture is the operating system beneath every other system: the accumulated agreements, stories, habits, and beliefs that determine what we normalize, what we reward, what we ignore, and what we pass on to those who come after us.
            </DocP>
            <DocP>
              We assert that AI and culture are not separate forces in tension. They are two instruments in the same orchestra. When played without coordination, the result is noise. When integrated with intention, the result can be something genuinely new — a civilization more equitable, more adaptive, and more whole than the one we inherited.
            </DocP>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <DocSectionNum>Section II</DocSectionNum>
            <h3
              className="font-serif leading-[1.1] tracking-[-0.02em] text-[var(--color-off-white)] mb-6"
              style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
            >
              On the <em className="text-[var(--color-volt)]">problems worth solving</em>
            </h3>
            <DocP>
              We do not lack for problems. We lack for systems that take them seriously. The challenges at the core of American life — inequality, access, health, belonging, trust, participation — are not mysteries. They are the result of systems that were designed, explicitly or implicitly, to produce the outcomes they produce.
            </DocP>
            <DocP>
              <strong className="text-[var(--color-off-white)] font-normal">
                If we design new systems with the same values that built the old ones, we will get faster versions of the same results.
              </strong>{" "}
              The power of this moment is that we are not patching — we are rebuilding. The question is what we are rebuilding toward.
            </DocP>
            <PullQuote>
              An intelligent system that optimizes for efficiency without wisdom will produce efficient injustice. We must be as rigorous about what we aim at as we are about the tools we use to get there.
            </PullQuote>
            <DocP>
              We commit to beginning with the problems that affect the most people most deeply, and building toward solutions that hold those people — not just their data — at the center.
            </DocP>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <DocSectionNum>Section III</DocSectionNum>
            <h3
              className="font-serif leading-[1.1] tracking-[-0.02em] text-[var(--color-off-white)] mb-6"
              style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
            >
              On <em className="text-[var(--color-volt)]">integration</em>, not replacement
            </h3>
            <DocP>
              There is a fear, understandable and worth taking seriously, that artificial intelligence will replace human creativity, human judgment, human connection. We take a different view — not because we are naive, but because we believe the frame of replacement is itself the problem.
            </DocP>
            <DocP>
              Hammers did not replace hands. They extended what hands could build. Writing did not replace memory. It extended what memory could hold. AI will not replace human culture. But culture that does not deliberately integrate AI will be outpaced by culture that does — often in ways that serve narrow interests rather than broad ones.
            </DocP>
            <DocP>
              <strong className="text-[var(--color-off-white)] font-normal">
                Integration, done with intention, means each amplifies the other&apos;s best qualities.
              </strong>{" "}
              AI can process at scales no human can. Culture can generate meaning in ways no algorithm can. Together, they can tackle the problems that neither can address alone.
            </DocP>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
