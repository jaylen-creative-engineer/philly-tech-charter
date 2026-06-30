"use client";

import { createContext, useContext, type ReactNode, type RefObject } from "react";

interface HallScrollContextValue {
  progressRef: RefObject<number>;
  trackRef: RefObject<HTMLDivElement | null>;
}

const HallScrollContext = createContext<HallScrollContextValue | null>(null);

export function HallScrollProvider({
  children,
  progressRef,
  trackRef,
}: HallScrollContextValue & { children: ReactNode }) {
  return (
    <HallScrollContext.Provider value={{ progressRef, trackRef }}>
      {children}
    </HallScrollContext.Provider>
  );
}

export function useHallScroll() {
  const ctx = useContext(HallScrollContext);
  if (!ctx) throw new Error("useHallScroll must be used within HallScrollProvider");
  return ctx;
}

export function useHallScrollOptional() {
  return useContext(HallScrollContext);
}
