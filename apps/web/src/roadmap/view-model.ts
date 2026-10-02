import type { PartStatus, PartTag, PriorityTier, Roadmap, RoadmapPart, RoadmapPhase } from './model.ts';

const STATUS_LABELS: Record<PartStatus, string> = { done: 'Tamam', next: 'Sırada', planned: 'Planlı' };

const TAG_LABELS: Record<PartTag, string> = {
  ai: 'AI',
  legacy: 'Eski plan',
  infra: 'Altyapı',
  quality: 'Kalite',
  business: 'İş modeli',
  decision: 'Karar gerekli',
  marketing: 'Pazarlama'
};

export interface TagView {
  key: PartTag;
  label: string;
}

export interface PartView {
  code: string;
  anchor: string;
  title: string;
  detail: string;
  status: PartStatus;
  statusLabel: string;
  tags: TagView[];
  /** Name of the priority tier that schedules this part, if any. */
  tier?: string;
}

export interface StepView {
  number: number;
  title: string;
  why: string;
  owners: string[];
  sources: { id: string; href: string }[];
  parts: { code: string; anchor: string; title: string }[];
}

export interface TierView {
  key: string;
  name: string;
  gate: string;
  steps: StepView[];
}

export interface PhaseView {
  code: string;
  anchor: string;
  name: string;
  stage: string;
  goal: string;
  exit: string;
  vibecoding: string;
  parts: PartView[];
  progress: { done: number; total: number };
}

export interface RoadmapTotals {
  phases: number;
  parts: number;
  done: number;
  next: number;
  planned: number;
}

/** Turns the plan into what the page renders, and refuses a plan that breaks its own rules. */
export class RoadmapViewModel {
  static readonly MIN_PARTS = 3;
  static readonly MAX_PARTS = 24;

  readonly phases: PhaseView[];
  readonly tiers: TierView[];

  constructor(roadmap: Roadmap) {
    RoadmapViewModel.validate(roadmap);
    this.phases = roadmap.phases.map((phase, index) => RoadmapViewModel.toPhaseView(phase, index));
    this.tiers = this.buildTiers(roadmap.priorities);
  }

  private buildTiers(priorities: readonly PriorityTier[]): TierView[] {
    const byTitle = new Map(this.phases.flatMap(phase => phase.parts).map(item => [item.title, item]));
    const scheduled = new Set<string>();
    let number = 0;
    return priorities.map(tier => ({
      key: tier.key,
      name: tier.name,
      gate: tier.gate,
      steps: tier.steps.map(step => {
        number += 1;
        return {
          number,
          title: step.title,
          why: step.why,
          owners: [...step.owners],
          sources: step.sources.map(id => RoadmapViewModel.toSource(id)),
          parts: step.parts.map(title => {
            const found = byTitle.get(title);
            if (!found) throw new Error(`Priority step "${step.title}" names a missing part "${title}".`);
            if (scheduled.has(title)) throw new Error(`Part "${title}" is scheduled more than once.`);
            scheduled.add(title);
            found.tier = tier.name;
            return { code: found.code, anchor: found.anchor, title: found.title };
          })
        };
      })
    }));
  }

  private static toSource(id: string): { id: string; href: string } {
    const match = /^(GAP|UU)-\d{2}$/.exec(id);
    if (!match) throw new Error(`Unknown finding id "${id}".`);
    return { id, href: `${match[1] === 'GAP' ? 'gap' : 'unknowns'}/#${id.toLowerCase()}` };
  }

  get totals(): RoadmapTotals {
    const parts = this.phases.flatMap(phase => phase.parts);
    const count = (status: PartStatus) => parts.filter(part => part.status === status).length;
    return {
      phases: this.phases.length,
      parts: parts.length,
      done: count('done'),
      next: count('next'),
      planned: count('planned')
    };
  }

  partsWithTag(tag: PartTag): PartView[] {
    return this.phases.flatMap(phase => phase.parts).filter(part => part.tags.some(item => item.key === tag));
  }

  private static validate(roadmap: Roadmap): void {
    if (roadmap.phases.length === 0) throw new Error('A roadmap needs at least one phase.');
    const titles = new Set<string>();
    for (const item of roadmap.phases.flatMap(phase => phase.parts)) {
      if (titles.has(item.title)) throw new Error(`Part title "${item.title}" is used more than once.`);
      titles.add(item.title);
    }
    const seen = new Set<string>();
    for (const phase of roadmap.phases) {
      if (seen.has(phase.key)) throw new Error(`Phase key "${phase.key}" is used more than once.`);
      seen.add(phase.key);
      const count = phase.parts.length;
      if (count < RoadmapViewModel.MIN_PARTS || count > RoadmapViewModel.MAX_PARTS) {
        throw new Error(
          `Phase "${phase.key}" has ${count} parts; a phase holds ${RoadmapViewModel.MIN_PARTS} to ${RoadmapViewModel.MAX_PARTS}.`
        );
      }
    }
  }

  private static toPhaseView(phase: RoadmapPhase, index: number): PhaseView {
    const parts = phase.parts.map((part, partIndex) => RoadmapViewModel.toPartView(part, index, partIndex));
    return {
      code: `F${index}`,
      anchor: `faz-${index}`,
      name: phase.name,
      stage: phase.stage,
      goal: phase.goal,
      exit: phase.exit,
      vibecoding: phase.vibecoding,
      parts,
      progress: { done: parts.filter(part => part.status === 'done').length, total: parts.length }
    };
  }

  private static toPartView(part: RoadmapPart, phaseIndex: number, partIndex: number): PartView {
    const order = String(partIndex + 1).padStart(2, '0');
    return {
      code: `F${phaseIndex}.${order}`,
      anchor: `f${phaseIndex}-${order}`,
      title: part.title,
      detail: part.detail,
      status: part.status,
      statusLabel: STATUS_LABELS[part.status],
      tags: part.tags.map(key => ({ key, label: TAG_LABELS[key] }))
    };
  }
}
