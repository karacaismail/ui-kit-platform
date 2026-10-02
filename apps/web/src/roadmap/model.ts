export type PartStatus = 'done' | 'next' | 'planned';

export type PartTag = 'ai' | 'legacy' | 'infra' | 'quality' | 'business';

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

export interface Roadmap {
  vision: string;
  requirements: readonly Requirement[];
  personas: readonly Persona[];
  phases: readonly RoadmapPhase[];
}
