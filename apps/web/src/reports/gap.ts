import { findSection, parseList, parseParagraphs, parseSections, parseTable, splitLead } from './markdown.ts';
import type { Finding, FindingsReport, Priority, ReportLink, Resolution } from './model.ts';

const resolutionOf = (status: string): Resolution => {
  if (/kısmen|bir karar bekliyor/i.test(status)) return 'partial';
  if (/^karar bekliyor/i.test(status)) return 'decision';
  return status ? 'resolved' : 'open';
};

/** Roadmap part codes such as F1.06 become links to that part. */
const roadmapLinks = (text: string): ReportLink[] =>
  [...text.matchAll(/\bF(\d+)\.(\d{2})\b/g)].map(match => ({
    label: `F${match[1]}.${match[2]}`,
    href: `roadmap/#f${match[1]}-${match[2]}`
  }));

/** Reads docs/reports/gap-analysis.md: Codex's report plus the table of how each finding was handled. */
export function gapReportFromMarkdown(markdown: string): FindingsReport {
  const sections = parseSections(markdown);
  const lines = (title: string) => findSection(sections, title)?.lines ?? [];

  const handled = new Map(
    parseTable(lines('Bulguların karşılığı')).map(row => [row.get('Bulgu'), { status: row.get('Durum'), note: row.get('Yol haritasındaki karşılığı') }])
  );

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
      resolution: resolutionOf(outcome?.status ?? ''),
      resolutionNote: outcome?.note ?? '',
      links: roadmapLinks(outcome?.note ?? '')
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
