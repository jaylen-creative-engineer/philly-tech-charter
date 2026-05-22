import ScrollReveal from "../components/ScrollReveal";

export default function Statement() {
  return (
    <ScrollReveal>
      <div className="bg-[var(--color-volt)] px-12 py-24 text-center max-md:px-6">
        <p
          className="font-serif leading-[1.1] tracking-[-0.02em] text-[var(--color-ink)] max-w-4xl mx-auto"
          style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
        >
          <em>
            "AI is a tool for our collective growth. Culture is a tool for our collective growth. Both need to work as an integrated system — so we can solve the problems that sit at the core of the systems we all live inside."
          </em>
        </p>
      </div>
    </ScrollReveal>
  );
}
