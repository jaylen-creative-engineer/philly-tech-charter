export interface ParticipantProfile {
  name: string;
  context: string;
  email?: string;
}

const STORAGE_KEY = "charter-participant-profile";

export function readParticipantProfile(): ParticipantProfile | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ParticipantProfile;
    if (!parsed.name?.trim()) return null;

    return {
      name: parsed.name.trim(),
      context: parsed.context?.trim() ?? "",
      email: parsed.email?.trim() || undefined,
    };
  } catch {
    return null;
  }
}

export function saveParticipantProfile(profile: ParticipantProfile) {
  if (typeof window === "undefined") return;
  if (!profile.name.trim()) return;

  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      name: profile.name.trim(),
      context: profile.context.trim(),
      email: profile.email?.trim() || undefined,
    }),
  );
}

export function resolveParticipantAttribution(name: string, context: string) {
  const profile = readParticipantProfile();

  return {
    name: name.trim() || profile?.name || "",
    context: context.trim() || profile?.context || "",
  };
}
