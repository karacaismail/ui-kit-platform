import assert from 'node:assert/strict';
import { test } from 'node:test';

import { childSections, findSection, parseInline, parseList, parseParagraphs, parseSections, parseTable, splitLead } from './markdown.ts';

const sample = `# Report

Intro line.

## Summary

- First \`code\` item
- Second **bold** item

## Findings

| ID | Priority (P0/P1) | Finding |
|---|---|---|
| A-01 | P0 | Pipe \\| inside. Rest. |
| A-02 | P1 | Plain |

## Stories

### First story

Paragraph one
continues.

Paragraph two.

### Second story

Text.

## After
`;

test('splits a document into headed sections', () => {
  const sections = parseSections(sample);
  assert.deepEqual(sections.map(section => [section.level, section.title]), [
    [1, 'Report'],
    [2, 'Summary'],
    [2, 'Findings'],
    [2, 'Stories'],
    [3, 'First story'],
    [3, 'Second story'],
    [2, 'After']
  ]);
  assert.equal(findSection(sections, 'Missing'), undefined);
});

test('returns the sub-sections of a section until the next sibling', () => {
  const sections = parseSections(sample);
  assert.deepEqual(childSections(sections, 'Stories').map(section => section.title), ['First story', 'Second story']);
});

test('reads list items and paragraphs', () => {
  const sections = parseSections(sample);
  assert.deepEqual(parseList(findSection(sections, 'Summary')!.lines), ['First `code` item', 'Second **bold** item']);
  assert.deepEqual(parseParagraphs(findSection(sections, 'First story')!.lines), ['Paragraph one continues.', 'Paragraph two.']);
});

test('reads a pipe table, keeping escaped pipes inside cells', () => {
  const rows = parseTable(findSection(parseSections(sample), 'Findings')!.lines);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].get('ID'), 'A-01');
  assert.equal(rows[0].get('Priority'), 'P0', 'a column is found by the start of its header');
  assert.equal(rows[0].get('Finding'), 'Pipe | inside. Rest.');
  assert.equal(rows[1].get('Missing'), '');
});

test('turns backticks into code segments and drops bold markers', () => {
  assert.deepEqual(parseInline('Run `pnpm test` **now**'), [
    { code: false, text: 'Run ' },
    { code: true, text: 'pnpm test' },
    { code: false, text: ' now' }
  ]);
});

test('splits a finding into a lead sentence and the rest', () => {
  assert.deepEqual(splitLead('F0.02 says 25. The code has 26.'), { lead: 'F0.02 says 25.', rest: 'The code has 26.' });
  assert.deepEqual(splitLead('No sentence end'), { lead: 'No sentence end', rest: '' });
});
