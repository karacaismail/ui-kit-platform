export type PartStatus = 'done' | 'next' | 'planned';

export type PartTag = 'ai' | 'legacy' | 'infra' | 'quality' | 'business' | 'decision' | 'marketing';

export type Owner = 'İsmail Karaca' | 'Hüseyin Cengiz' | 'Asistan Hüseyin';

export interface RoadmapPart {
  title: string;
  detail: string;
  status: PartStatus;
  tags: readonly PartTag[];
}

export interface RoadmapPhase {
  /** Stable identifier; must be unique within the plan. */
  key: string;
  name: string;
  /** Where the phase sits in the product's life: PoC, MVP, Enterprise… */
  stage: string;
  goal: string;
  /** The observable condition that closes the phase. */
  exit: string;
  /** How the phase is meant to be built with coding agents. */
  vibecoding: string;
  parts: readonly RoadmapPart[];
}

export interface Persona {
  name: string;
  who: string;
  need: string;
  ai: string;
}

export interface Requirement {
  title: string;
  detail: string;
}

export interface PriorityStep {
  title: string;
  /** Why this step sits at this point in the order. */
  why: string;
  owners: readonly Owner[];
  /** Finding ids from the analysis reports, e.g. GAP-01 or UU-15. */
  sources: readonly string[];
  /** Titles of the roadmap parts this step delivers. */
  parts: readonly string[];
}

/** A priority tier cuts across phases: it says what must be done before the next gate. */
export interface PriorityTier {
  key: string;
  name: string;
  /** The condition that closes the tier. */
  gate: string;
  steps: readonly PriorityStep[];
}

export interface Roadmap {
  vision: string;
  requirements: readonly Requirement[];
  personas: readonly Persona[];
  /** Ordered tiers; parts that no tier names come after the last one. */
  priorities: readonly PriorityTier[];
  phases: readonly RoadmapPhase[];
}
