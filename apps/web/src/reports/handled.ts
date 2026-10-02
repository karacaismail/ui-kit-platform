import { findSection, parseTable, type Section } from './markdown.ts';
import type { ReportLink, Resolution } from './model.ts';

export interface Handled {
  resolution: Resolution;
  note: string;
  links: ReportLink[];
}

const resolutionOf = (status: string): Resolution => {
  if (/kısmen|bir karar bekliyor/i.test(status)) return 'partial';
  if (/^karar bekliyor/i.test(status)) return 'decision';
  return status ? 'resolved' : 'open';
};

/** Roadmap part codes such as F1.06 become links to that part. */
const partLinks = (text: string): ReportLink[] =>
  [...text.matchAll(/\bF(\d+)\.(\d{2})\b/g)].map(match => ({
    label: `F${match[1]}.${match[2]}`,
    href: `roadmap/#f${match[1]}-${match[2]}`
  }));

/**
 * Reads a report's "Bulguların karşılığı" table, which records what was done with each finding.
 * Returns an empty map when the report has not been worked into the roadmap yet.
 */
export function readHandled(sections: Section[]): Map<string, Handled> {
  return new Map(
    parseTable(findSection(sections, 'Bulguların karşılığı')?.lines ?? []).map(row => {
      const note = row.get('Yol haritasındaki karşılığı');
      return [row.get('Bulgu'), { resolution: resolutionOf(row.get('Durum')), note, links: partLinks(note) }];
    })
  );
}
