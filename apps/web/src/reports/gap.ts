import { readHandled } from './handled.ts';
import { findSection, parseList, parseParagraphs, parseSections, parseTable, splitLead } from './markdown.ts';
import type { Finding, FindingsReport, Priority } from './model.ts';

/** Reads docs/reports/gap-analysis.md: Codex's report plus the table of how each finding was handled. */
export function gapReportFromMarkdown(markdown: string): FindingsReport {
  const sections = parseSections(markdown);
  const lines = (title: string) => findSection(sections, title)?.lines ?? [];

  const handled = readHandled(sections);

  const findings: Finding[] = parseTable(lines('Bulgular')).map(row => {
    const id = row.get('ID');
    const { lead, rest } = splitLead(row.get('Bulgu'));
    const outcome = handled.get(id);
    return {
      id,
      priority: row.get('Öncelik') as Priority,
      group: row.get('Tür'),
      title: lead,
      body: rest,
      tags: [],
      details: [
        { label: 'Kanıt', text: row.get('Kanıt') },
        { label: 'Codex önerisi', text: row.get('Önerilen düzeltme') }
      ],
      resolution: outcome?.resolution ?? 'open',
      resolutionNote: outcome?.note ?? '',
      links: outcome?.links ?? []
    };
  });

  return {
    title: 'GAP analizi',
    eyebrow: 'Yol haritası denetimi',
    lead: 'Yol haritasının karar kaydı, DevOps çerçevesi ve kodun bugünkü haliyle karşılaştırılması: eksik parçalar, yanlış sıralar, çelişkiler ve doğrulanamayan iddialar.',
    source: parseParagraphs(sections[0]?.lines ?? []).join(' '),
    groupLabel: 'Tür',
    detailsLabel: 'Kanıt ve öneri',
    method: [],
    summary: parseList(lines('Özet')),
    decisions: parseList(lines('Kullanıcı kararı gerektirenler')),
    findings,
    stories: [],
    tables: [],
    checked: parseList(lines('Kontrol edilip sorun bulunmayan alanlar')),
    notInspected: parseList(lines('İncelenemeyenler'))
  };
}
