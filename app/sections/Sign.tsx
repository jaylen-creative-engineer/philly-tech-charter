"use client";

import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import Pill from "../components/Pill";
import { Signatory } from "../../lib/types";

interface Props {
  signatoryCount: number;
  onSign: (s: Signatory) => void;
}

export default function Sign({ signatoryCount, onSign }: Props) {
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSign() {
    if (!name.trim()) {
      setError("Please enter your name to sign.");
      return;
    }
    setError("");
    setLoading(true);

    const signatory: Signatory = {
      id: `sig-${Date.now()}`,
      name: name.trim(),
      context: context.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/signatories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signatory),
      });
    } catch {
      // Non-fatal — optimistic update still happens locally
    }

    onSign(signatory);
    setSubmitted(true);
    setName("");
    setContext("");
    setLoading(false);
  }

  const inputBase =
    "w-full bg-transparent border-0 border-b border-[var(--color-hairline)] text-[var(--color-off-white)] font-sans text-[15px] font-light py-3 outline-none transition-colors duration-200 focus:border-[var(--color-volt)] mb-8 placeholder:text-[var(--color-mute)]";

  return (
    <section
      id="sign"
      className="border-t border-[var(--color-hairline)] py-[120px] px-12 max-w-[900px] mx-auto text-center max-md:px-6"
    >
      <ScrollReveal>
        <SectionLabel>Sign the Charter</SectionLabel>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <h2
          className="font-serif leading-[1.05] tracking-[-0.025em] text-[var(--color-off-white)] mb-6"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          We, the undersigned,
          <br />
          <em className="text-[var(--color-volt)]">pledge to build</em>
          <br />
          with intention.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <p className="text-[16px] font-light leading-[1.8] text-[var(--color-mute)] max-w-[560px] mx-auto mb-4">
          Add your name to this declaration. Signing means you believe technology deployed in Philadelphia should serve everyone — and you are willing to hold yourself and others to that standard.
        </p>
        {signatoryCount > 0 && (
          <p className="text-[13px] font-semibold text-[var(--color-volt)] tracking-[0.05em] mb-12">
            {signatoryCount.toLocaleString()} {signatoryCount === 1 ? "person has" : "people have"} signed.
          </p>
        )}
      </ScrollReveal>

      <ScrollReveal delay={160}>
        {submitted ? (
          <div
            className="max-w-[640px] mx-auto bg-[var(--color-volt)]/10 border border-[var(--color-volt)]/25 text-[var(--color-volt)] text-[15px] font-medium px-8 py-6 rounded-sm"
            style={{ animation: "riseIn 0.5s ease forwards" }}
          >
            Your name has been added. Thank you for standing with this work.
          </div>
        ) : (
          <div className="bg-white/[0.03] border border-[var(--color-hairline)] rounded-sm p-12 text-left max-w-[640px] mx-auto max-md:p-6">
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/25 text-red-400 text-[13px] px-4 py-3 rounded-sm">
                {error}
              </div>
            )}

            <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-volt)] mb-2">
              Your Name <span className="text-[var(--color-volt)]">*</span>
            </label>
            <input
              className={inputBase}
              type="text"
              placeholder="As you'd like it to appear"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-volt)] mb-2">
              City / Role
            </label>
            <input
              className={inputBase}
              type="text"
              placeholder="Philadelphia, PA · Designer — optional"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />

            <p className="text-[12px] text-[var(--color-mute)] leading-[1.6] mb-8">
              Your name and optional context will appear in the signatory record below. This is a declaration of intent, not a legal document.
            </p>

            <Pill
              variant="volt"
              onClick={handleSign}
              className="w-full justify-center text-[14px]"
            >
              {loading ? "Signing…" : "Add My Name"}
            </Pill>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
}
