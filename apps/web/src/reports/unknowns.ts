import { readHandled } from './handled.ts';
import { childSections, findSection, parseGrid, parseList, parseParagraphs, parseSections, parseTable, splitLead } from './markdown.ts';
import type { Finding, FindingsReport, Priority, ReportLink, ReportTable } from './model.ts';

const DETAIL_COLUMNS = ['Neden görünmüyordu', 'Erken sinyal', 'Ucuz erken deneme', 'Kanıt'];
const TABLE_SECTIONS = ['Sınanmamış varsayımlar', 'Erken uyarı göstergeleri'];

/** Phase codes such as F2 (not part codes such as F2.05) become links to that phase. */
const phaseLinks = (text: string): ReportLink[] =>
  [...text.matchAll(/\bF(\d+)\b(?!\.\d)/g)].map(match => ({ label: `F${match[1]}`, href: `roadmap/#faz-${match[1]}` }));

/** Reads docs/reports/unknowns-analysis.md, written by Codex in the format its prompt fixed. */
export function unknownsReportFromMarkdown(markdown: string): FindingsReport {
  const sections = parseSections(markdown);
  const lines = (title: string) => findSection(sections, title)?.lines ?? [];

  const handled = readHandled(sections);
  const rows = parseTable(lines('Bulgular'));
  if (rows.length === 0) throw new Error('The unknowns report has no "Bulgular" table.');

  const findings: Finding[] = rows.map(row => {
    const { lead, rest } = splitLead(row.get('Bilinmeyen'));
    const outcome = handled.get(row.get('ID'));
    return {
      id: row.get('ID'),
      priority: row.get('Öncelik') as Priority,
      group: row.get('Alan'),
      title: lead,
      body: rest,
      tags: [`Olasılık: ${row.get('Olasılık')}`, row.get('Teknik')].filter(tag => !tag.endsWith(': ') && tag !== ''),
      details: DETAIL_COLUMNS.map(label => ({ label, text: row.get(label) })).filter(detail => detail.text !== ''),
      resolution: outcome?.resolution ?? 'open',
      resolutionNote: outcome?.note ?? '',
      // Once an unknown is worked into the plan, point at the parts; until then, at the phases.
      links: outcome?.links.length ? outcome.links : phaseLinks(row.get('İlgili faz'))
    };
  });

  const tables: ReportTable[] = TABLE_SECTIONS.map(title => ({ title, ...parseGrid(lines(title)) })).filter(
    table => table.rows.length > 0
  );

  return {
    title: 'Bilinmeyen bilinmeyenler',
    eyebrow: 'Kör nokta analizi',
    lead: 'Planın görmediği riskleri bilinir hale getirmek için yapılan çok ajanlı analiz: sessiz varsayımlar, pre-mortem senaryoları, eski projeden dersler, kırılabilecek bağımlılıklar ve başarının yaratacağı yeni sorunlar.',
    source: parseParagraphs(sections[0]?.level === 1 ? sections[0].lines : []).join(' '),
    groupLabel: 'Alan',
    detailsLabel: 'Neden görünmüyordu, erken sinyal ve deneme',
    method: parseList(lines('Yöntem')),
    summary: parseList(lines('Özet')),
    decisions: [],
    findings,
    stories: childSections(sections, 'Pre-mortem senaryoları').map(section => ({
      title: section.title,
      text: parseParagraphs(section.lines).join(' ')
    })),
    tables,
    checked: parseList(lines('Kontrol edilip sorun bulunmayan alanlar')),
    notInspected: parseList(lines('İncelenemeyenler'))
  };
}
