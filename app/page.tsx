"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Welcome from "./components/Welcome";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Footer from "./sections/Footer";
import type { LandingIntent } from "./components/LandingContent";
import { PRINCIPLES } from "../lib/data";
import { useCharterData } from "../lib/useCharterData";

export default function Home() {
  const router = useRouter();
  const [entered, setEntered] = useState(false);

  const { contributions, signatories } = useCharterData();

  const voicesCount = contributions.length + signatories.length;
  const proposedPrinciples = contributions.filter((c) => c.type === "A new principle").length;
  const versionLabel = proposedPrinciples > 0 ? "1.1" : "1.0";

  const handleWelcomeComplete = useCallback(
    (intent?: LandingIntent) => {
      setEntered(true);

      // Both paths lead into the contribution workspace — charter lives there as the living document.
      if (intent === "contribute" || intent === "charter") {
        router.push("/contribute");
      }
    },
    [router],
  );

  return (
    <>
      <Welcome
        onComplete={handleWelcomeComplete}
        principlesCount={PRINCIPLES.length}
        voicesCount={voicesCount}
        versionLabel={versionLabel}
      />
      <Nav visible={entered} variant="landing" />
      <main data-entered={entered}>
        <Hero voicesCount={voicesCount} versionLabel={versionLabel} />
        <Footer />
      </main>
    </>
  );
}
