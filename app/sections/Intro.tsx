import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";

export default function Intro() {
  return (
    <section className="max-w-[1200px] mx-auto px-12 py-[120px] grid grid-cols-2 gap-24 items-start max-md:grid-cols-1 max-md:gap-12 max-md:px-6">
      <ScrollReveal className="sticky top-20 max-md:static">
        <SectionLabel>Why This. Why Now.</SectionLabel>
        <h2
          className="font-serif leading-[1.05] tracking-[-0.02em] text-[var(--color-off-white)]"
          style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
        >
          Technology and culture
          <br />
          <em className="text-[var(--color-volt)]">
            have always been
            <br />
            one system.
          </em>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={100} className="pt-4">
        <p className="font-serif text-[19px] italic leading-[1.75] text-[var(--color-off-white)] mb-8">
          Every transformative technology in human history reshaped not just what we could do — but how we lived, what we valued, and who we became.
        </p>
        <p className="text-[15px] font-light leading-[1.8] text-[var(--color-mute)] mb-6">
          The printing press didn't just print books. It democratized knowledge and fractured the authority of institutions. Electricity didn't just light rooms. It restructured labor, lengthened the day, and redrew the boundary between public and private life. The internet didn't just connect computers. It remade how we form identity, relationship, and truth itself.
        </p>
        <p className="text-[15px] font-light leading-[1.8] text-[var(--color-mute)] mb-6">
          In each of these moments, the cultural transformation happened largely without intention — reactive, adaptive, often painful. We are now at the threshold of the most rapid technological shift in human history. We have a rare opportunity: to approach it differently. To design our intention before the moment designs us.
        </p>
        <p className="text-[15px] font-light leading-[1.8] text-[var(--color-mute)]">
          This document is not a law. It is not a policy. It is an act of collective design — written in the city where America first dared to write down what it believed, and offered to anyone willing to add their voice to the work of shaping what comes next.
        </p>
      </ScrollReveal>
    </section>
  );
}
