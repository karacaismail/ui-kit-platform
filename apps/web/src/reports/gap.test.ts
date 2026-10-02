import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { gapReportFromMarkdown } from './gap.ts';

const markdown = readFileSync(new URL('../../../../docs/reports/gap-analysis.md', import.meta.url), 'utf8');
const report = gapReportFromMarkdown(markdown);
const byId = (id: string) => report.findings.find(item => item.id === id)!;

test('reads all 38 findings with priority, type and the lead sentence as title', () => {
  assert.equal(report.findings.length, 38);
  assert.equal(byId('GAP-02').priority, 'P2');
  assert.equal(byId('GAP-02').group, 'çelişki');
  assert.match(byId('GAP-02').title, /^F0\.02 katalogda 25 bileşen olduğunu söylüyor;.*\.$/);
  assert.ok(byId('GAP-02').details.some(detail => detail.label === 'Kanıt' && detail.text.includes('app.js')));
});

test('joins each finding with how it was handled and links the roadmap parts', () => {
  assert.equal(byId('GAP-02').resolution, 'resolved');
  assert.equal(byId('GAP-01').resolution, 'decision');
  assert.equal(byId('GAP-35').resolution, 'partial');
  assert.equal(byId('GAP-08').resolution, 'partial');
  assert.deepEqual(
    byId('GAP-08').links.map(link => link.href),
    ['roadmap/#f1-06', 'roadmap/#f1-07', 'roadmap/#f1-09', 'roadmap/#f1-08']
  );
  assert.deepEqual(byId('GAP-06').links, []);
});

test('reads the summary, owner decisions and coverage lists', () => {
  assert.equal(report.summary.length, 6);
  assert.equal(report.decisions.length, 8);
  assert.ok(report.checked.length > 0);
  assert.ok(report.notInspected.length > 0);
  assert.match(report.source, /Codex CLI/);
});
