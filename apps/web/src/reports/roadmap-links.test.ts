import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { roadmap } from '../roadmap/data.ts';
import { RoadmapViewModel } from '../roadmap/view-model.ts';
import { findSection, parseSections, parseTable } from './markdown.ts';

const titleByCode = new Map(
  new RoadmapViewModel(roadmap).phases.flatMap(phase => phase.parts).map(part => [part.code, part.title])
);

/** Each report's "Bulguların karşılığı" table names parts as "F1.06 Title"; codes shift when parts move. */
const references = (file: string) => {
  const markdown = readFileSync(new URL(`../../../../docs/reports/${file}`, import.meta.url), 'utf8');
  const rows = parseTable(findSection(parseSections(markdown), 'Bulguların karşılığı')?.lines ?? []);
  return rows.flatMap(row =>
    [...row.get('Yol haritasındaki karşılığı').matchAll(/\bF(\d+\.\d{2}) ([^;—]+?)(?=;| —|$)/g)].map(match => ({
      finding: row.get('Bulgu'),
      code: `F${match[1]}`,
      title: match[2].trim()
    }))
  );
};

for (const file of ['gap-analysis.md', 'unknowns-analysis.md']) {
  test(`${file} points every finding at the roadmap part it names`, () => {
    const found = references(file);
    assert.ok(found.length > 0, 'the report maps its findings to roadmap parts');
    for (const reference of found) {
      assert.equal(titleByCode.get(reference.code), reference.title, `${reference.finding} → ${reference.code}`);
    }
  });
}
