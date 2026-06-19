import ScrollReveal from "../components/ScrollReveal";

function DocSectionNum({ children }: { children: string }) {
  return (
    <div className="font-display flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[var(--color-red)] mb-4">
      {children}
      <span className="flex-1 h-[3px] bg-[var(--color-rule-light)]" />
    </div>
  );
}

function PullQuote({ children }: { children: string }) {
  return (
    <blockquote className="border-l-[6px] border-[var(--color-red)] pl-7 my-10">
      <p className="font-display text-[19px] leading-[1.5] text-[var(--color-blue)]">
        {children}
      </p>
    </blockquote>
  );
}

function DocP({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[17px] leading-[1.8] text-[var(--color-ink)] mb-5">
      {children}
    </p>
  );
}

export default function Document() {
  return (
    <section id="document" className="bg-[var(--color-paper)]">
      {/* Document header */}
      <div className="px-12 max-md:px-6">
        <ScrollReveal className="max-w-[800px] mx-auto pt-24 pb-16 border-b-[3px] border-[var(--color-blue)] text-center">
          <p className="font-display text-[11px] tracking-[0.25em] uppercase text-[var(--color-red)] mb-5">
            Philadelphia · May 2026 · Version 1.0
          </p>
          <div className="font-display inline-flex items-center gap-1.5 border-[3px] border-[var(--color-red)] text-[var(--color-red)] text-[10px] tracking-[0.2em] uppercase px-3.5 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] animate-pulse-dot" />
            Living Document
          </div>
          <h2
            className="font-display leading-[1.0] text-[var(--color-blue)] mb-6"
            style={{ fontSize: "clamp(32px, 4.6vw, 64px)" }}
          >
            A Declaration of
            <br />
            <span className="text-[var(--color-red)]">Intentional Design</span>
          </h2>
          <p className="font-display text-[11px] tracking-[0.12em] uppercase text-[var(--color-mute)]">
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
              className="font-display leading-[1.1] text-[var(--color-blue)] mb-6"
              style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
            >
              We have been here before.
            </h3>
            <DocP>
              Two hundred and fifty years ago, a group of people sat in this city, looked honestly at the world they lived in, and had the audacity to write down a vision for something better. They did not have all the answers. They were imperfect and incomplete. But they were intentional, and that intention became the foundation of a nation.
            </DocP>
            <DocP>
              We are their inheritors, in every sense of that word. We inherit the promise they set down, the contradictions they left unresolved, and the responsibility to keep expanding what that promise means. We gather now, at the 250th year of this American experiment, to exercise that same audacity: not to rewrite what they began, but to extend it into a moment they could not have imagined.
            </DocP>
            <PullQuote>
              The question is not whether technology will reshape our culture. It will. The question is whether we will be the authors of that reshaping, or merely its audience.
            </PullQuote>
            <DocP>
              We choose to be authors. We choose intention over reaction. We offer this document as a beginning, not a conclusion.
            </DocP>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <DocSectionNum>Section I</DocSectionNum>
            <h3
              className="font-display leading-[1.1] text-[var(--color-blue)] mb-6"
              style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
            >
              On the <span className="text-[var(--color-red)]">nature of tools</span>
            </h3>
            <DocP>
              Artificial intelligence is a tool. So is language. So is architecture. So is law. So is music.{" "}
              <strong className="text-[var(--color-blue)] font-semibold">
                Tools do not have values, but the systems we build with them do.
              </strong>{" "}
              The systems reflect the values, intentions, and blind spots of those who designed them.
            </DocP>
            <DocP>
              Culture is also a tool, perhaps the most powerful one. Culture is the operating system beneath every other system: the accumulated agreements, stories, habits, and beliefs that determine what we normalize, what we reward, what we ignore, and what we pass on to those who come after us.
            </DocP>
            <DocP>
              We assert that AI and culture are not separate forces in tension. They are two instruments in the same orchestra. When played without coordination, the result is noise. When integrated with intention, the result can be something genuinely new: the opening of a creative era in which human imagination and intelligent tools compose together, toward a civilization more equitable, more adaptive, and more whole than the one we inherited.
            </DocP>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <DocSectionNum>Section II</DocSectionNum>
            <h3
              className="font-display leading-[1.1] text-[var(--color-blue)] mb-6"
              style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
            >
              On the <span className="text-[var(--color-red)]">problems worth solving</span>
            </h3>
            <DocP>
              We do not lack for problems. We lack for systems that take them seriously. The challenges at the core of American life, from inequality and access to health, belonging, trust, and participation, are not mysteries. They are the result of systems that were designed, explicitly or implicitly, to produce the outcomes they produce.
            </DocP>
            <DocP>
              <strong className="text-[var(--color-blue)] font-semibold">
                If we design new systems with the same values that built the old ones, we will get faster versions of the same results.
              </strong>{" "}
              The opportunity of this moment is not to dismantle and start over. It is to move into a new era of creativity. The tools are more powerful than ever, but the human impulse to make meaning, to imagine, and to build remains central. The question is not whether we will create. The question is what we will create toward.
            </DocP>
            <PullQuote>
              An intelligent system that optimizes for efficiency without wisdom will produce efficient injustice. We must be as rigorous about what we aim at as we are about the tools we use to get there.
            </PullQuote>
            <DocP>
              We commit to beginning with the problems that affect the most people most deeply, and building toward solutions that hold those people, not just their data, at the center.
            </DocP>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <DocSectionNum>Section III</DocSectionNum>
            <h3
              className="font-display leading-[1.1] text-[var(--color-blue)] mb-6"
              style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
            >
              On <span className="text-[var(--color-red)]">integration</span>, not replacement
            </h3>
            <DocP>
              There is a fear, understandable and worth taking seriously, that artificial intelligence will replace human creativity, human judgment, human connection. We take a different view, not because we are naive, but because we believe the frame of replacement is itself the problem.
            </DocP>
            <DocP>
              Hammers did not replace hands. They extended what hands could build. Writing did not replace memory. It extended what memory could hold. AI will not replace human culture. But culture that does not deliberately integrate AI will be outpaced by culture that does, often in ways that serve narrow interests rather than broad ones.
            </DocP>
            <DocP>
              <strong className="text-[var(--color-blue)] font-semibold">
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
