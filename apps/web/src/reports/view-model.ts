import { type InlineSegment, parseInline } from './markdown.ts';
import type { Finding, FindingsReport, Priority, Resolution } from './model.ts';

const PRIORITIES: readonly Priority[] = ['P0', 'P1', 'P2'];
const RESOLUTIONS: readonly Exclude<Resolution, 'open'>[] = ['resolved', 'partial', 'decision'];
const RESOLUTION_LABELS: Record<Resolution, string> = {
  open: 'Açık',
  resolved: 'Çözüldü',
  partial: 'Kısmen',
  decision: 'Karar bekliyor'
};

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

export interface Facet {
  key: 'priority' | 'group' | 'resolution';
  label: string;
  options: FacetOption[];
}

export interface Stat {
  label: string;
  value: number;
}

export interface FindingView {
  id: string;
  anchor: string;
  priority: Priority;
  group: string;
  title: InlineSegment[];
  body: InlineSegment[];
  tags: string[];
  details: { label: string; text: InlineSegment[] }[];
  resolution: Resolution;
  resolutionLabel: string;
  resolutionNote: InlineSegment[];
  links: { label: string; href: string }[];
  /** Values the client-side filter compares against; keys match the facet keys. */
  filter: Record<string, string>;
}

const slug = (text: string) =>
  text
    .toLocaleLowerCase('tr')
    .replace(/[çğıöşü]/g, char => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' })[char] ?? char)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Presentation of an analysis report: ordering, counts, facets and inline formatting. */
export class FindingsReportViewModel {
  readonly report: FindingsReport;
  readonly findings: FindingView[];
  readonly facets: Facet[];
  readonly stats: Stat[];

  constructor(report: FindingsReport) {
    FindingsReportViewModel.validate(report.findings);
    this.report = report;
    const ordered = [...report.findings].sort(
      (a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority)
    );
    const tracked = report.findings.some(item => item.resolution !== 'open');
    this.findings = ordered.map(item => FindingsReportViewModel.toView(item, tracked));
    this.facets = FindingsReportViewModel.buildFacets(report, tracked);
    this.stats = FindingsReportViewModel.buildStats(report.findings, tracked);
  }

  private static validate(findings: Finding[]): void {
    const seen = new Set<string>();
    for (const item of findings) {
      if (seen.has(item.id)) throw new Error(`Finding id "${item.id}" is used more than once.`);
      if (!PRIORITIES.includes(item.priority)) throw new Error(`Finding "${item.id}" has unknown priority "${item.priority}".`);
      seen.add(item.id);
    }
  }

  private static toView(item: Finding, tracked: boolean): FindingView {
    const filter: Record<string, string> = { priority: item.priority, group: slug(item.group) };
    if (tracked) filter.resolution = item.resolution;
    return {
      id: item.id,
      anchor: item.id.toLowerCase(),
      priority: item.priority,
      group: item.group,
      title: parseInline(item.title),
      body: parseInline(item.body),
      tags: item.tags,
      details: item.details.map(detail => ({ label: detail.label, text: parseInline(detail.text) })),
      resolution: item.resolution,
      resolutionLabel: RESOLUTION_LABELS[item.resolution],
      resolutionNote: parseInline(item.resolutionNote),
      links: item.links,
      filter
    };
  }

  private static buildFacets(report: FindingsReport, tracked: boolean): Facet[] {
    const count = (predicate: (item: Finding) => boolean) => report.findings.filter(predicate).length;
    const groups: FacetOption[] = [];
    for (const item of report.findings) {
      const value = slug(item.group);
      const existing = groups.find(option => option.value === value);
      if (existing) existing.count += 1;
      else groups.push({ value, label: item.group, count: 1 });
    }
    groups.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'tr'));

    const facets: Facet[] = [
      {
        key: 'priority',
        label: 'Öncelik',
        options: PRIORITIES.map(value => ({ value, label: value, count: count(item => item.priority === value) })).filter(
          option => option.count > 0
        )
      },
      { key: 'group', label: report.groupLabel, options: groups }
    ];
    if (tracked) {
      facets.push({
        key: 'resolution',
        label: 'Durum',
        options: RESOLUTIONS.map(value => ({
          value,
          label: RESOLUTION_LABELS[value],
          count: count(item => item.resolution === value)
        })).filter(option => option.count > 0)
      });
    }
    return facets;
  }

  private static buildStats(findings: Finding[], tracked: boolean): Stat[] {
    const stats: Stat[] = [
      { label: 'Bulgu', value: findings.length },
      ...PRIORITIES.map(priority => ({ label: priority, value: findings.filter(item => item.priority === priority).length }))
    ];
    if (tracked) {
      for (const resolution of RESOLUTIONS) {
        stats.push({ label: RESOLUTION_LABELS[resolution], value: findings.filter(item => item.resolution === resolution).length });
      }
    }
    return stats;
  }
}
