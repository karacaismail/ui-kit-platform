import assert from 'node:assert/strict';
import { test } from 'node:test';

import { matchesFilter, readFilterState, writeFilterState } from './filter.ts';

const keys = ['priority', 'group'];

test('reads only the known facets from the address', () => {
  assert.deepEqual(readFilterState('?priority=P0&other=1', keys), { priority: 'P0', group: '' });
});

test('writes the state back without disturbing other parameters', () => {
  assert.equal(writeFilterState('?other=1&priority=P1', { priority: 'P0', group: '' }), '?other=1&priority=P0');
  assert.equal(writeFilterState('?priority=P1', { priority: '', group: '' }), '');
});

test('an empty facet matches everything; a set facet must match exactly', () => {
  const card = { priority: 'P0', group: 'eksik-parca' };
  assert.equal(matchesFilter(card, { priority: '', group: '' }), true);
  assert.equal(matchesFilter(card, { priority: 'P0', group: 'eksik-parca' }), true);
  assert.equal(matchesFilter(card, { priority: 'P1', group: '' }), false);
});
