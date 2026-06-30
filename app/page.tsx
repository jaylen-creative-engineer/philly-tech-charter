"use client";

import { useCallback, useState } from "react";
import Welcome from "./components/Welcome";
import Nav from "./components/Nav";
import SmoothScroll from "./components/SmoothScroll";
import HallJourney from "./components/hall/HallJourney";
import Statement from "./sections/Statement";
import Document from "./sections/Document";
import Principles from "./sections/Principles";
import Contribute from "./sections/Contribute";
import Voices from "./sections/Voices";
import SignatoryWall from "./sections/SignatoryWall";
import ClosingCTA from "./sections/ClosingCTA";
import Footer from "./sections/Footer";
import { useCharterData } from "../lib/useCharterData";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const handleWelcomeComplete = useCallback(() => setEntered(true), []);

  const {
    contributions,
    signatories,
    contributionsStatus,
    signatoriesStatus,
    contributionsError,
    signatoriesError,
    refreshContributions,
    refreshSignatories,
  } = useCharterData();

  return (
    <>
      <Welcome onComplete={handleWelcomeComplete} />
      <SmoothScroll>
        <Nav visible={entered} />
        <main data-entered={entered}>
          <HallJourney enabled={entered}>
            <div aria-hidden="true" className="flex h-[3px]">
              <div className="flex-[2] bg-[var(--color-red)]" />
              <div className="flex-1 bg-[var(--color-white)]" />
              <div className="flex-[2] bg-[var(--color-blue)]" />
            </div>
            <Statement />
            <Document />
            <Principles />
            <Contribute />
            <Voices
              contributions={contributions}
              status={contributionsStatus}
              error={contributionsError}
              onRetry={refreshContributions}
            />
            <SignatoryWall
              signatories={signatories}
              status={signatoriesStatus}
              error={signatoriesError}
              onRetry={refreshSignatories}
            />
            <ClosingCTA />
            <Footer />
          </HallJourney>
        </main>
      </SmoothScroll>
    </>
  );
}
