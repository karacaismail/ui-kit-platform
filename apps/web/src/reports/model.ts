export type Priority = 'P0' | 'P1' | 'P2';

/** What happened to a finding. Reports without follow-up use `open`. */
export type Resolution = 'open' | 'resolved' | 'partial' | 'decision';

export interface Detail {
  label: string;
  text: string;
}

export interface ReportLink {
  label: string;
  /** Relative to the site root, e.g. `roadmap/#f1-06`. */
  href: string;
}

export interface Finding {
  id: string;
  priority: Priority;
  group: string;
  title: string;
  body: string;
  tags: string[];
  details: Detail[];
  resolution: Resolution;
  resolutionNote: string;
  links: ReportLink[];
}

export interface Story {
  title: string;
  text: string;
}

export interface ReportTable {
  title: string;
  columns: string[];
  rows: string[][];
}

export interface FindingsReport {
  title: string;
  eyebrow: string;
  lead: string;
  source: string;
  /** Name of the facet that groups findings, e.g. "Tür" or "Alan". */
  groupLabel: string;
  /** Summary text of the disclosure that holds a finding's details. */
  detailsLabel: string;
  method: string[];
  summary: string[];
  decisions: string[];
  findings: Finding[];
  stories: Story[];
  tables: ReportTable[];
  checked: string[];
  notInspected: string[];
}
