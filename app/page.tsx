"use client";

import { useState, useEffect, useCallback } from "react";
import Welcome from "./components/Welcome";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import Statement from "./sections/Statement";
import Document from "./sections/Document";
import Principles from "./sections/Principles";
import Contribute from "./sections/Contribute";
import Voices from "./sections/Voices";
import Sign from "./sections/Sign";
import SignatoryWall from "./sections/SignatoryWall";
import ClosingCTA from "./sections/ClosingCTA";
import Footer from "./sections/Footer";
import { Contribution, Signatory } from "../lib/types";
import { SEED_CONTRIBUTIONS } from "../lib/data";

export default function Home() {
  const [contributions, setContributions] = useState<Contribution[]>(SEED_CONTRIBUTIONS);
  const [signatories, setSignatories] = useState<Signatory[]>([]);
  const [entered, setEntered] = useState(false);

  const handleWelcomeComplete = useCallback(() => setEntered(true), []);

  useEffect(() => {
    fetch("/api/contributions")
      .then((r) => r.json())
      .then((data: Contribution[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setContributions(data);
        }
      })
      .catch(() => {});

    fetch("/api/signatories")
      .then((r) => r.json())
      .then((data: Signatory[]) => {
        if (Array.isArray(data)) {
          setSignatories(data);
        }
      })
      .catch(() => {});
  }, []);

  function handleContribution(c: Contribution) {
    setContributions((prev) => [...prev, c]);
    setTimeout(() => {
      document.getElementById("voices")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }

  function handleSign(s: Signatory) {
    setSignatories((prev) => [...prev, s]);
    setTimeout(() => {
      document.getElementById("signatories")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }

  return (
    <>
      <Welcome onComplete={handleWelcomeComplete} />
      <Nav visible={entered} />
      <main data-entered={entered}>
        <Hero />
        <div aria-hidden="true">
          <div className="h-1.5 bg-[var(--color-red)]" />
          <div className="h-1.5 bg-[var(--color-cream)]" />
          <div className="h-1.5 bg-[var(--color-blue)]" />
        </div>
        <Intro />
        <Statement />
        <Document />
        <Principles />
        <Contribute onSubmit={handleContribution} />
        <Voices contributions={contributions} />
        <Sign signatoryCount={signatories.length} onSign={handleSign} />
        <SignatoryWall signatories={signatories} />
        <ClosingCTA />
        <Footer />
      </main>
    </>
  );
}
