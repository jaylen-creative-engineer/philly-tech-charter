"use client";

import { useState } from "react";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import Statement from "./sections/Statement";
import Document from "./sections/Document";
import Principles from "./sections/Principles";
import Contribute from "./sections/Contribute";
import Voices from "./sections/Voices";
import Footer from "./sections/Footer";
import { Contribution } from "../lib/types";
import { SEED_CONTRIBUTIONS } from "../lib/data";

export default function Home() {
  const [contributions, setContributions] = useState<Contribution[]>(SEED_CONTRIBUTIONS);

  function handleContribution(c: Contribution) {
    setContributions((prev) => [...prev, c]);
    setTimeout(() => {
      document.getElementById("voices")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }

  return (
    <main>
      <Hero />
      <div className="h-px bg-[var(--color-hairline)]" />
      <Intro />
      <Statement />
      <Document />
      <Principles />
      <Contribute onSubmit={handleContribution} />
      <Voices contributions={contributions} />
      <Footer />
    </main>
  );
}
