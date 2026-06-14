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

  return (
    <>
      <Welcome onComplete={handleWelcomeComplete} />
      <Nav visible={entered} />
      <main data-entered={entered}>
        <Hero />
        <div aria-hidden="true" className="flex h-[3px]">
          <div className="flex-[2] bg-[var(--color-red)]" />
          <div className="flex-1 bg-[var(--color-white)]" />
          <div className="flex-[2] bg-[var(--color-blue)]" />
        </div>
        <Intro />
        <Statement />
        <Document />
        <Principles />
        <Contribute />
        <Voices contributions={contributions} />
        <SignatoryWall signatories={signatories} />
        <ClosingCTA />
        <Footer />
      </main>
    </>
  );
}
