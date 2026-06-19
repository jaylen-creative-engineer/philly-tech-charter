"use client";

import { useCallback, useEffect, useState } from "react";
import { Contribution, Signatory } from "./types";

export const CHARTER_DATA_REFRESH_KEY = "charter-data-refresh";

export type FetchStatus = "loading" | "ready" | "error";

async function fetchContributions(): Promise<Contribution[]> {
  const response = await fetch("/api/contributions");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof data?.error === "string" ? data.error : "Could not load contributions.",
    );
  }

  if (!Array.isArray(data)) {
    throw new Error("Could not load contributions.");
  }

  return data;
}

async function fetchSignatories(): Promise<Signatory[]> {
  const response = await fetch("/api/signatories");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof data?.error === "string" ? data.error : "Could not load signatories.",
    );
  }

  if (!Array.isArray(data)) {
    throw new Error("Could not load signatories.");
  }

  return data;
}

export function markCharterDataStale() {
  sessionStorage.setItem(CHARTER_DATA_REFRESH_KEY, "1");
}

export function useCharterData() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [signatories, setSignatories] = useState<Signatory[]>([]);
  const [contributionsStatus, setContributionsStatus] = useState<FetchStatus>("loading");
  const [signatoriesStatus, setSignatoriesStatus] = useState<FetchStatus>("loading");
  const [contributionsError, setContributionsError] = useState("");
  const [signatoriesError, setSignatoriesError] = useState("");

  const loadContributions = useCallback(async () => {
    setContributionsStatus("loading");
    setContributionsError("");

    try {
      const data = await fetchContributions();
      setContributions(data);
      setContributionsStatus("ready");
    } catch (error) {
      setContributionsError(
        error instanceof Error ? error.message : "Could not load contributions.",
      );
      setContributionsStatus("error");
    }
  }, []);

  const loadSignatories = useCallback(async () => {
    setSignatoriesStatus("loading");
    setSignatoriesError("");

    try {
      const data = await fetchSignatories();
      setSignatories(data);
      setSignatoriesStatus("ready");
    } catch (error) {
      setSignatoriesError(
        error instanceof Error ? error.message : "Could not load signatories.",
      );
      setSignatoriesStatus("error");
    }
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([loadContributions(), loadSignatories()]);
  }, [loadContributions, loadSignatories]);

  useEffect(() => {
    if (sessionStorage.getItem(CHARTER_DATA_REFRESH_KEY)) {
      sessionStorage.removeItem(CHARTER_DATA_REFRESH_KEY);
    }

    refresh();
  }, [refresh]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState !== "visible") return;
      if (!sessionStorage.getItem(CHARTER_DATA_REFRESH_KEY)) return;
      sessionStorage.removeItem(CHARTER_DATA_REFRESH_KEY);
      refresh();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [refresh]);

  return {
    contributions,
    signatories,
    contributionsStatus,
    signatoriesStatus,
    contributionsError,
    signatoriesError,
    refreshContributions: loadContributions,
    refreshSignatories: loadSignatories,
    refresh,
  };
}
