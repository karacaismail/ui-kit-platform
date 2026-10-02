/** The small subset of Markdown the analysis reports use: headings, lists, paragraphs, pipe tables, inline code. */

export interface Section {
  level: number;
  title: string;
  lines: string[];
}

export interface InlineSegment {
  code: boolean;
  text: string;
}

export interface TableRow {
  /** Cell whose header equals or starts with `column`; empty when the column is missing. */
  get(column: string): string;
}

export function parseSections(markdown: string): Section[] {
  const sections: Section[] = [];
  let current: Section = { level: 0, title: '', lines: [] };
  for (const line of markdown.split(/\r?\n/)) {
    const heading = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (heading) {
      sections.push(current);
      current = { level: heading[1].length, title: heading[2], lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  sections.push(current);
  return sections.filter(section => section.level > 0 || section.lines.some(line => line.trim() !== ''));
}

export function findSection(sections: Section[], title: string): Section | undefined {
  return sections.find(section => section.title === title);
}

export function childSections(sections: Section[], title: string): Section[] {
  const start = sections.findIndex(section => section.title === title);
  if (start === -1) return [];
  const parent = sections[start];
  const children: Section[] = [];
  for (const section of sections.slice(start + 1)) {
    if (section.level <= parent.level) break;
    children.push(section);
  }
  return children;
}

export function parseList(lines: string[]): string[] {
  return lines.map(line => /^\s*[-*]\s+(.*)$/.exec(line)?.[1].trim()).filter((item): item is string => Boolean(item));
}

export function parseParagraphs(lines: string[]): string[] {
  const paragraphs: string[] = [];
  let current: string[] = [];
  const flush = () => {
    if (current.length > 0) paragraphs.push(current.join(' '));
    current = [];
  };
  for (const line of lines) {
    const text = line.trim();
    if (text === '' || text.startsWith('|') || /^[-*]\s/.test(text)) flush();
    else current.push(text);
  }
  flush();
  return paragraphs;
}

export function parseGrid(lines: string[]): { columns: string[]; rows: string[][] } {
  const rows = lines.map(line => line.trim()).filter(line => line.startsWith('|'));
  if (rows.length < 2) return { columns: [], rows: [] };
  const cells = (row: string) =>
    row
      .replace(/^\|/, '')
      .replace(/(?<!\\)\|$/, '')
      .split(/(?<!\\)\|/)
      .map(cell => cell.trim().replace(/\\\|/g, '|'));
  return { columns: cells(rows[0]), rows: rows.slice(2).map(cells) };
}

export function parseTable(lines: string[]): TableRow[] {
  const { columns, rows } = parseGrid(lines);
  return rows.map(values => ({
    get(column: string) {
      const index = columns.findIndex(name => name === column || name.startsWith(`${column} `));
      return index === -1 ? '' : (values[index] ?? '');
    }
  }));
}

export function parseInline(text: string): InlineSegment[] {
  return text
    .split('`')
    .map((part, index) => (index % 2 === 1 ? { code: true, text: part } : { code: false, text: part.replace(/\*\*/g, '') }))
    .filter(segment => segment.text !== '');
}

/** First sentence as a scannable title; the rest stays as body text. */
export function splitLead(text: string): { lead: string; rest: string } {
  const end = /[.!?](?=\s)/.exec(text);
  if (!end) return { lead: text.trim(), rest: '' };
  return { lead: text.slice(0, end.index + 1).trim(), rest: text.slice(end.index + 1).trim() };
}
