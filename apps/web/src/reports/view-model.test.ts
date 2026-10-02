import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { Finding, FindingsReport } from './model.ts';
import { FindingsReportViewModel } from './view-model.ts';

const finding = (id: string, overrides: Partial<Finding> = {}): Finding => ({
  id,
  priority: 'P1',
  group: 'Eksik parça',
  title: `${id} title`,
  body: '',
  tags: [],
  details: [],
  resolution: 'open',
  resolutionNote: '',
  links: [],
  ...overrides
});

const report = (findings: Finding[]): FindingsReport => ({
  title: 'Report',
  eyebrow: 'Eyebrow',
  lead: 'Lead',
  source: 'Source',
  groupLabel: 'Tür',
  detailsLabel: 'Details',
  method: [],
  summary: [],
  decisions: [],
  stories: [],
  tables: [],
  checked: [],
  notInspected: [],
  findings
});

test('orders findings by priority, keeping report order within a priority', () => {
  const view = new FindingsReportViewModel(
    report([finding('A-01', { priority: 'P2' }), finding('A-02', { priority: 'P0' }), finding('A-03', { priority: 'P0' })])
  );
  assert.deepEqual(view.findings.map(item => item.id), ['A-02', 'A-03', 'A-01']);
});

test('rejects duplicate finding ids and an unknown priority', () => {
  assert.throws(() => new FindingsReportViewModel(report([finding('A-01'), finding('A-01')])), /A-01/);
  assert.throws(
    () => new FindingsReportViewModel(report([finding('A-01', { priority: 'P9' as Finding['priority'] })])),
    /P9/
  );
});

test('builds facets with counts and ASCII keys, leaving out the resolution facet when nothing is resolved', () => {
  const view = new FindingsReportViewModel(
    report([finding('A-01', { group: 'Çelişki' }), finding('A-02', { group: 'Eksik parça', priority: 'P0' })])
  );
  assert.deepEqual(view.facets.map(facet => facet.key), ['priority', 'group']);
  // Equal counts fall back to Turkish alphabetical order.
  assert.deepEqual(view.facets[1].options, [
    { value: 'celiski', label: 'Çelişki', count: 1 },
    { value: 'eksik-parca', label: 'Eksik parça', count: 1 }
  ]);
  assert.deepEqual(view.facets[0].options.map(option => [option.value, option.count]), [['P0', 1], ['P1', 1]]);
});

test('adds the resolution facet and stats when findings carry a resolution', () => {
  const view = new FindingsReportViewModel(
    report([
      finding('A-01', { resolution: 'resolved' }),
      finding('A-02', { resolution: 'decision', priority: 'P0' }),
      finding('A-03', { resolution: 'partial' })
    ])
  );
  assert.deepEqual(view.facets.map(facet => facet.key), ['priority', 'group', 'resolution']);
  assert.deepEqual(
    view.stats.map(stat => [stat.label, stat.value]),
    [['Bulgu', 3], ['P0', 1], ['P1', 2], ['P2', 0], ['Plana işlendi', 1], ['Kısmen', 1], ['Karar bekliyor', 1]]
  );
  assert.deepEqual(view.findings[0].filter, { priority: 'P0', group: 'eksik-parca', resolution: 'decision' });
  assert.equal(view.findings[0].resolutionLabel, 'Karar bekliyor');
});
