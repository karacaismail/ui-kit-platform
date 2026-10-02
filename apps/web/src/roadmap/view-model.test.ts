import assert from 'node:assert/strict';
import { test } from 'node:test';

import { roadmap } from './data.ts';
import type { Roadmap, RoadmapPart, RoadmapPhase } from './model.ts';
import { RoadmapViewModel } from './view-model.ts';

const part = (title: string, overrides: Partial<RoadmapPart> = {}): RoadmapPart => ({
  title,
  detail: `${title} detail`,
  status: 'planned',
  tags: [],
  ...overrides
});

const phase = (key: string, parts: RoadmapPart[]): RoadmapPhase => ({
  key,
  name: key.toUpperCase(),
  stage: 'Stage',
  goal: 'Goal',
  exit: 'Exit',
  vibecoding: 'Note',
  parts
});

const plan = (phases: RoadmapPhase[]): Roadmap => ({ ...roadmap, phases });

const three = () => [part('one'), part('two'), part('three')];

test('numbers phases and parts with stable codes and anchors', () => {
  const view = new RoadmapViewModel(plan([phase('poc', three()), phase('mvp', three())]));

  assert.deepEqual(view.phases.map(item => [item.code, item.anchor]), [['F0', 'faz-0'], ['F1', 'faz-1']]);
  assert.deepEqual(view.phases[1].parts.map(item => [item.code, item.anchor]), [
    ['F1.01', 'f1-01'],
    ['F1.02', 'f1-02'],
    ['F1.03', 'f1-03']
  ]);
});

test('rejects a phase with fewer than 3 or more than 24 parts', () => {
  assert.throws(() => new RoadmapViewModel(plan([phase('thin', three().slice(0, 2))])), /thin.*3.*24/);
  const many = Array.from({ length: 25 }, (_, index) => part(`part ${index}`));
  assert.throws(() => new RoadmapViewModel(plan([phase('wide', many)])), /wide.*3.*24/);
  assert.doesNotThrow(() => new RoadmapViewModel(plan([phase('full', many.slice(0, 24))])));
});

test('rejects duplicate phase keys and a plan without phases', () => {
  assert.throws(() => new RoadmapViewModel(plan([phase('poc', three()), phase('poc', three())])), /poc/);
  assert.throws(() => new RoadmapViewModel(plan([])), /phase/);
});

test('counts parts by status for the whole plan and per phase', () => {
  const view = new RoadmapViewModel(
    plan([
      phase('poc', [part('a', { status: 'done' }), part('b', { status: 'done' }), part('c', { status: 'next' })]),
      phase('mvp', three())
    ])
  );

  assert.deepEqual(view.totals, { phases: 2, parts: 6, done: 2, next: 1, planned: 3 });
  assert.deepEqual(view.phases[0].progress, { done: 2, total: 3 });
});

test('collects the parts carrying a tag in plan order with a readable label', () => {
  const view = new RoadmapViewModel(
    plan([
      phase('poc', [part('a', { tags: ['ai'] }), part('b'), part('c', { tags: ['legacy'] })]),
      phase('mvp', [part('d'), part('e', { tags: ['ai', 'legacy'] }), part('f')])
    ])
  );

  assert.deepEqual(view.partsWithTag('ai').map(item => item.code), ['F0.01', 'F1.02']);
  assert.deepEqual(view.partsWithTag('legacy').map(item => item.code), ['F0.03', 'F1.02']);
  assert.equal(view.phases[1].parts[1].tags.map(tag => tag.label).join(', '), 'AI, Eski plan');
  assert.equal(view.phases[0].parts[0].statusLabel, 'Planlı');
});

test('labels a part that waits for an owner decision', () => {
  const view = new RoadmapViewModel(plan([phase('poc', [part('a', { tags: ['decision'] }), part('b'), part('c')])]));

  assert.deepEqual(view.partsWithTag('decision').map(item => item.code), ['F0.01']);
  assert.equal(view.phases[0].parts[0].tags[0].label, 'Karar gerekli');
});

test('the published roadmap satisfies its own rules', () => {
  const view = new RoadmapViewModel(roadmap);

  assert.ok(view.phases.length >= 8, 'covers PoC through maturity');
  for (const item of view.phases) {
    assert.ok(item.parts.length >= 3 && item.parts.length <= 24, `${item.code} has ${item.parts.length} parts`);
  }
  assert.ok(view.partsWithTag('ai').length > 0);
  assert.ok(view.partsWithTag('legacy').length > 0);
  assert.ok(view.partsWithTag('decision').length > 0);
  assert.ok(roadmap.personas.length >= 8);
});
