import { Contribution, Principle } from "./types";

export const PRINCIPLES: Principle[] = [
  {
    num: "01",
    title: "Intention before implementation",
    body: "We will name what we are building toward before we build it. Technology deployed without purpose serves whoever holds the most power by default. We refuse that default.",
  },
  {
    num: "02",
    title: "Systems think, not symptoms treat",
    body: "We commit to addressing root causes. AI applied to symptoms of broken systems will not heal them. We design for the system, not the surface.",
  },
  {
    num: "03",
    title: "Culture as infrastructure",
    body: "We treat culture with the same seriousness we give technology. The stories, values, and norms we build around AI are not soft considerations — they are load-bearing structures.",
  },
  {
    num: "04",
    title: "Access is not optional",
    body: "The benefits of intelligent technology must be broadly shared. A future in which AI multiplies advantage only for those who already have it is not progress — it is acceleration of the problem.",
  },
  {
    num: "05",
    title: "Evolve in public",
    body: "This document is a living artifact. Every change is visible. Every voice is credited. The process of collective reasoning is itself part of the work — not a precondition for it.",
  },
  {
    num: "06",
    title: "Measure what matters",
    body: "We name our metrics before we celebrate our progress. Efficiency, engagement, and growth are proxies. Human flourishing is the target. We will not mistake one for the other.",
  },
];

export const SEED_CONTRIBUTIONS: Contribution[] = [
  {
    id: "seed-1",
    name: "M. Torres",
    context: "Policy researcher · Chicago, IL",
    type: "A new principle",
    text: "Every AI system that touches public life should have a publicly legible statement of what it is optimizing for — and what it is explicitly not optimizing for.",
    createdAt: "2026-05-20T10:00:00Z",
  },
  {
    id: "seed-2",
    name: "D. Okonkwo",
    context: "Civil engineer · Philadelphia, PA",
    type: "A challenge or counterpoint",
    text: "Intention is not enough. We need enforcement. Beautiful frameworks have been written before and ignored. What makes this one different is the question we have to keep answering.",
    createdAt: "2026-05-21T14:30:00Z",
  },
  {
    id: "seed-3",
    name: "S. Park",
    context: "Educator · Oakland, CA",
    type: "A refinement to existing text",
    text: "The word 'integration' needs to carry a warning label too. Integrated systems can integrate inequality just as efficiently as they integrate strength. Let's name that risk explicitly.",
    createdAt: "2026-05-22T09:15:00Z",
  },
];
