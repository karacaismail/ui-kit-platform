import assert from 'node:assert/strict';
import { test } from 'node:test';

import { roadmap } from './data.ts';
import type { PriorityTier, Roadmap, RoadmapPart, RoadmapPhase } from './model.ts';
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

const plan = (phases: RoadmapPhase[], priorities: PriorityTier[] = []): Roadmap => ({ ...roadmap, phases, priorities });

const tier = (key: string, parts: string[][], sources: string[] = []): PriorityTier => ({
  key,
  name: key.toUpperCase(),
  gate: `${key} gate`,
  steps: parts.map((titles, index) => ({
    title: `${key} step ${index + 1}`,
    why: 'Because',
    owners: ['İsmail Karaca'],
    sources,
    parts: titles
  }))
});

const three = (prefix = '') => [part(`${prefix}one`), part(`${prefix}two`), part(`${prefix}three`)];

test('numbers phases and parts with stable codes and anchors', () => {
  const view = new RoadmapViewModel(plan([phase('poc', three()), phase('mvp', three('m-'))]));

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
  assert.throws(() => new RoadmapViewModel(plan([phase('poc', three()), phase('poc', three('b-'))])), /poc/);
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

test('numbers priority steps across tiers and resolves their parts to codes', () => {
  const view = new RoadmapViewModel(
    plan(
      [phase('poc', three()), phase('mvp', [part('four'), part('five'), part('six')])],
      [tier('critical', [['five'], ['one', 'two']], ['GAP-01', 'UU-25']), tier('must', [['three']])]
    )
  );

  assert.deepEqual(view.tiers.map(item => [item.key, item.steps.map(step => step.number)]), [
    ['critical', [1, 2]],
    ['must', [3]]
  ]);
  assert.deepEqual(view.tiers[0].steps[1].parts.map(item => [item.code, item.anchor]), [
    ['F0.01', 'f0-01'],
    ['F0.02', 'f0-02']
  ]);
  assert.deepEqual(view.tiers[0].steps[0].sources, [
    { id: 'GAP-01', href: 'gap/#gap-01' },
    { id: 'UU-25', href: 'unknowns/#uu-25' }
  ]);
  assert.equal(view.phases[1].parts[1].tier, 'CRITICAL');
  assert.equal(view.phases[1].parts[0].tier, undefined);
});

test('rejects a priority that names a missing part, a part in two tiers or an unknown source', () => {
  const phases = [phase('poc', three())];
  assert.throws(() => new RoadmapViewModel(plan(phases, [tier('critical', [['missing']])])), /missing/);
  assert.throws(
    () => new RoadmapViewModel(plan(phases, [tier('critical', [['one']]), tier('must', [['one']])])),
    /one/
  );
  assert.throws(() => new RoadmapViewModel(plan(phases, [tier('critical', [['one']], ['XYZ-1'])])), /XYZ-1/);
});

test('rejects two parts with the same title, since priorities refer to parts by title', () => {
  assert.throws(() => new RoadmapViewModel(plan([phase('poc', [part('same'), part('same'), part('other')])])), /same/);
});

test('the published priority order has four gated tiers with owners on every step', () => {
  const view = new RoadmapViewModel(roadmap);
  assert.deepEqual(view.tiers.map(item => item.name), ['Kritik', 'Olmazsa olmaz', 'Önemli', 'Pazarlanabilirlik']);
  for (const item of view.tiers) {
    assert.ok(item.gate.length > 0, `${item.name} has a gate`);
    for (const step of item.steps) {
      assert.ok(step.owners.length > 0, `${step.title} has an owner`);
      assert.ok(step.parts.length > 0, `${step.title} points at roadmap parts`);
    }
  }
});
