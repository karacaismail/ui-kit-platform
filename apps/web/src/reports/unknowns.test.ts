import assert from 'node:assert/strict';
import { test } from 'node:test';

import { unknownsReportFromMarkdown } from './unknowns.ts';

const fixture = `# Bilinmeyen bilinmeyenler analizi

## Yöntem

- Altı alt ajan paralel çalıştı.

## Özet

- İlk özet.
- İkinci özet.

## Bulgular

| ID | Alan | Öncelik | Olasılık | Teknik | Bilinmeyen | Neden görünmüyordu | Erken sinyal | Ucuz erken deneme | Kanıt | İlgili faz |
|---|---|---|---|---|---|---|---|---|---|---|
| UU-01 | Teknik ve güvenlik | P1 | orta | Pre-mortem | Önizleme yavaşlar. Kullanıcı ayrılır. | Ölçüm yok. | İlk açılış 3 sn üstü. | Tek sayfada ölç. | \`apps/web/public/app.js:12\` | F1, F2 |
| UU-02 | Hukuk ve içerik | P0 | yüksek | Eski projeden ders | Lisans belirsiz. | Kimse sormadı. | Kopya şikâyeti. | Avukata sor. | karar.json | F3 |

## Pre-mortem senaryoları

### Kimse geri gelmedi

18 ay sonra kullanıcılar bir kez gelip
gitti. UU-01 ile bağlantılı.

### Lisans davası

UU-02.

## Sınanmamış varsayımlar

| Varsayım | Planda nerede | Nasıl sınanır |
|---|---|---|
| İnsanlar paylaşmak ister | Vizyon | Beş görüşme |

## Erken uyarı göstergeleri

| Gösterge | Eşik | Hangi bulguya bağlı |
|---|---|---|
| İlk açılış süresi | 3 sn | UU-01 |

## Kontrol edilip sorun bulunmayan alanlar

- Sandbox.

## İncelenemeyenler

- Canlı sunucu.
`;

const report = unknownsReportFromMarkdown(fixture);

test('reads each unknown with area, likelihood, technique and the lead sentence as title', () => {
  assert.equal(report.findings.length, 2);
  const [first, second] = report.findings;
  assert.equal(first.id, 'UU-01');
  assert.equal(first.group, 'Teknik ve güvenlik');
  assert.equal(first.title, 'Önizleme yavaşlar.');
  assert.equal(first.body, 'Kullanıcı ayrılır.');
  assert.deepEqual(first.tags, ['Olasılık: orta', 'Pre-mortem']);
  assert.deepEqual(first.details.map(detail => detail.label), ['Neden görünmüyordu', 'Erken sinyal', 'Ucuz erken deneme', 'Kanıt']);
  assert.equal(first.resolution, 'open');
  assert.equal(second.priority, 'P0');
});

test('links each unknown to the roadmap phases it belongs to', () => {
  assert.deepEqual(report.findings[0].links, [
    { label: 'F1', href: 'roadmap/#faz-1' },
    { label: 'F2', href: 'roadmap/#faz-2' }
  ]);
});

test('reads method, summary, pre-mortem stories, the two tables and coverage', () => {
  assert.deepEqual(report.method, ['Altı alt ajan paralel çalıştı.']);
  assert.equal(report.summary.length, 2);
  assert.deepEqual(report.stories.map(story => story.title), ['Kimse geri gelmedi', 'Lisans davası']);
  assert.equal(report.stories[0].text, '18 ay sonra kullanıcılar bir kez gelip gitti. UU-01 ile bağlantılı.');
  assert.deepEqual(report.tables.map(table => [table.title, table.columns.length, table.rows.length]), [
    ['Sınanmamış varsayımlar', 3, 1],
    ['Erken uyarı göstergeleri', 3, 1]
  ]);
  assert.deepEqual(report.tables[1].rows[0], ['İlk açılış süresi', '3 sn', 'UU-01']);
  assert.deepEqual(report.checked, ['Sandbox.']);
  assert.deepEqual(report.notInspected, ['Canlı sunucu.']);
});

test('refuses a report whose findings table is missing', () => {
  assert.throws(() => unknownsReportFromMarkdown('# Bilinmeyen bilinmeyenler analizi\n\n## Özet\n\n- x\n'), /Bulgular/);
});

test('the published report has the expected shape', async () => {
  const { readFileSync } = await import('node:fs');
  const real = unknownsReportFromMarkdown(
    readFileSync(new URL('../../../../docs/reports/unknowns-analysis.md', import.meta.url), 'utf8')
  );
  assert.equal(real.findings.length, 25);
  assert.ok(real.findings.every(item => /^UU-\d{2}$/.test(item.id) && ['P0', 'P1', 'P2'].includes(item.priority)));
  assert.ok(real.findings.every(item => item.links.length > 0), 'every unknown points at a roadmap phase');
  assert.equal(real.stories.length, 5);
  assert.deepEqual(real.tables.map(table => table.rows.length), [12, 18]);
  assert.match(real.source, /Codex CLI/);
});
