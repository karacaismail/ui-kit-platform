import type { PartStatus, PartTag, Roadmap, RoadmapPart, RoadmapPhase } from './model.ts';

const STATUS_LABELS: Record<PartStatus, string> = { done: 'Tamam', next: 'Sırada', planned: 'Planlı' };

const TAG_LABELS: Record<PartTag, string> = {
  ai: 'AI',
  legacy: 'Eski plan',
  infra: 'Altyapı',
  quality: 'Kalite',
  business: 'İş modeli',
  decision: 'Karar gerekli'
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

  constructor(roadmap: Roadmap) {
    RoadmapViewModel.validate(roadmap);
    this.phases = roadmap.phases.map((phase, index) => RoadmapViewModel.toPhaseView(phase, index));
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
