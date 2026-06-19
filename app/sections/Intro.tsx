import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import SectionPhoto from "../components/SectionPhoto";
import { CharterIcon } from "../components/CharterIcons";

export default function Intro() {
  return (
    <section className="max-w-[1200px] mx-auto px-12 py-[120px] max-md:px-6 max-md:py-20">
      <div className="grid grid-cols-2 gap-16 items-start max-md:grid-cols-1 max-md:gap-10">
        <div className="sticky top-20 max-md:static">
          <ScrollReveal>
            <SectionLabel icon={<CharterIcon name="layers" size={18} />}>
              Why This. Why Now.
            </SectionLabel>
            <h2
              className="font-display leading-[1.05] text-[var(--color-blue)]"
              style={{ fontSize: "clamp(32px, 3.6vw, 50px)" }}
            >
              Technology and culture
              <br />
              <span className="text-[var(--color-red)]">
                have always been
                <br />
                one system.
              </span>
            </h2>
          </ScrollReveal>
          <div className="mt-8 max-md:mt-6">
            <SectionPhoto
              src="/images/community-gathering.png"
              alt="A community gathering beneath an American flag, South Carolina, mid-20th century"
              aspect="photo"
              vintage
              vintageScale={1.1}
              objectPosition="center 42%"
              priority
              className="shadow-[0_16px_48px_rgba(26,53,128,0.12)]"
            />
          </div>
        </div>

        <ScrollReveal delay={100} className="pt-4">
          <p className="text-[19px] font-semibold leading-[1.65] text-[var(--color-blue)] mb-8">
            Every transformative technology in human history reshaped not just what we could do, but how we lived, what we valued, and who we became.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-ink)] mb-6">
            The printing press didn&apos;t just print books. It democratized knowledge and fractured the authority of institutions. Electricity didn&apos;t just light rooms. It restructured labor, lengthened the day, and redrew the boundary between public and private life. The internet didn&apos;t just connect computers. It remade how we form identity, relationship, and truth itself.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-ink)] mb-6">
            In each of these moments, the cultural transformation happened largely without intention. The change was reactive, adaptive, often painful. We are now at the threshold of the most rapid technological shift in human history. We have a rare opportunity: to approach it differently. To design our intention before the moment designs us.
          </p>
          <p className="text-[15px] leading-[1.8] text-[var(--color-ink)]">
            This document is not a law. It is not a policy. It is an act of collective design, written in the city where America first dared to write down what it believed, and offered to anyone willing to add their voice to the work of shaping what comes next.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
