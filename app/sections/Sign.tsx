"use client";

import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import Pill from "../components/Pill";
import CountUp from "../components/CountUp";
import BlueTexture from "../components/BlueTexture";
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

  function handleRefineAnother() {
    setSubmitted(false);
    setError("");
  }

  const inputBase =
    "w-full bg-transparent border-0 border-b-2 border-[var(--color-rule-light)] text-[var(--color-ink)] font-sans text-[15px] py-3 outline-none transition-colors duration-200 focus:border-[var(--color-red)] mb-6 placeholder:text-[var(--color-mute)]";

  const labelBase =
    "font-display block text-[10px] tracking-[0.2em] uppercase text-[var(--color-blue)] mb-2";

  const previewName = name.trim() || "Your Name";
  const previewContext = context.trim();

  return (
    <section
      id="sign"
      className="blue-surface py-[120px] px-12 max-md:px-6"
    >
      <BlueTexture />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <ScrollReveal>
            <SectionLabel color="cream">Sign the Charter</SectionLabel>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              className="font-display leading-[1.05] text-[var(--color-cream)] mb-4"
              style={{ fontSize: "clamp(32px, 4.6vw, 58px)" }}
            >
              Refine your signature.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p className="text-[16px] leading-[1.8] text-[var(--color-cream)]/80 max-w-[520px] mx-auto">
              Your name becomes part of the record. Take a moment to shape how you appear. This is your mark on the charter.
            </p>
            {signatoryCount > 0 && (
              <p className="font-display text-[12px] text-[var(--color-gold)] tracking-[0.05em] mt-4">
                <CountUp value={signatoryCount} /> {signatoryCount === 1 ? "person has" : "people have"} signed.
              </p>
            )}
          </ScrollReveal>
        </div>

        <ScrollReveal delay={160}>
          {submitted ? (
            <div className="max-w-[640px] mx-auto text-center">
              <div
                className="card-surface bg-[var(--color-cream)] text-[var(--color-blue)] px-8 py-10 mb-6"
                style={{ animation: "riseIn 0.5s ease forwards" }}
              >
                <span className="text-[var(--color-gold)] text-2xl mb-4 block" aria-hidden="true">★</span>
                <p className="font-display text-[18px] mb-2">Your name has been added.</p>
                <p className="text-[14px] text-[var(--color-mute)]">
                  Thank you for standing with this work.
                </p>
              </div>
              <Pill variant="cream" onClick={handleRefineAnother}>
                Sign Another Name
              </Pill>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Form */}
              <div className="card-surface bg-[var(--color-cream)] p-10 text-left max-md:p-6">
                <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--color-red)] mb-8">
                  Edit your details
                </p>

                {error && (
                  <div className="mb-6 bg-[var(--color-red)] text-[var(--color-cream)] text-[13px] px-4 py-3">
                    {error}
                  </div>
                )}

                <label className={labelBase}>
                  Your Name <span className="text-[var(--color-red)]">*</span>
                </label>
                <input
                  className={inputBase}
                  type="text"
                  placeholder="As you'd like it to appear"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />

                <label className={labelBase}>
                  City / Role
                </label>
                <input
                  className={inputBase}
                  type="text"
                  placeholder="Philadelphia, PA · Designer"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />

                <p className="text-[12px] text-[var(--color-mute)] leading-[1.6] mb-8">
                  Optional context appears beneath your name in the signatory record.
                </p>

                <Pill
                  variant="red"
                  onClick={handleSign}
                  className="w-full justify-center text-[14px]"
                >
                  {loading ? "Signing…" : "Add My Name"}
                </Pill>
              </div>

              {/* Live preview */}
              <div className="md:sticky md:top-28">
                <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--color-cream)]/60 mb-4 text-center md:text-left">
                  Preview on the wall
                </p>
                <div
                  className="preview-card p-8 transition-all duration-300"
                  style={{
                    opacity: name.trim() ? 1 : 0.55,
                    transform: name.trim() ? "scale(1)" : "scale(0.98)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-6">
                    <span className="text-[var(--color-gold)] text-lg shrink-0" aria-hidden="true">★</span>
                    <div>
                      <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--color-red)] mb-1">
                        Signatory
                      </p>
                      <p className="text-[18px] font-semibold text-[var(--color-blue)] leading-tight">
                        {previewName}
                      </p>
                      {previewContext ? (
                        <p className="text-[12px] text-[var(--color-mute)] mt-1">
                          {previewContext}
                        </p>
                      ) : (
                        <p className="text-[12px] text-[var(--color-mute)]/50 mt-1 italic">
                          City / role will appear here
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-[var(--color-rule-light)] pt-4">
                    <p className="text-[12px] text-[var(--color-mute)] leading-[1.6]">
                      This is a declaration of intent. Your name joins a growing record of people who believe technology in Philadelphia should serve everyone.
                    </p>
                  </div>
                </div>

                {!name.trim() && (
                  <p className="text-[11px] text-[var(--color-cream)]/40 mt-3 text-center md:text-left">
                    Start typing to see your signature take shape
                  </p>
                )}
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
