import ScrollReveal from "../components/ScrollReveal";

export default function Statement() {
  return (
    <ScrollReveal>
      <div className="bg-[var(--color-red)] px-12 py-24 text-center max-md:px-6">
        <p
          className="font-display leading-[1.15] text-[var(--color-cream)] max-w-4xl mx-auto"
          style={{ fontSize: "clamp(22px, 3.4vw, 46px)" }}
        >
          &ldquo;AI is a tool for our collective growth. Culture is a tool for our collective growth. Both need to work as an integrated system — so we can solve the problems that sit at the core of the systems we all live inside.&rdquo;
        </p>
      </div>
    </ScrollReveal>
  );
}
