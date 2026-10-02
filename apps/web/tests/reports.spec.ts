import { expect, test } from '@playwright/test';

const openFilters = async (page: import('@playwright/test').Page) => {
  const filters = page.locator('details.facets');
  if (!(await filters.evaluate((element: HTMLDetailsElement) => element.open))) await filters.locator('summary').click();
};

test('filters start closed on a phone and open on a wide screen', async ({ page }) => {
  await page.goto('./gap/');
  const open = await page.locator('details.facets').evaluate((element: HTMLDetailsElement) => element.open);
  expect(open).toBe((page.viewportSize()?.width ?? 0) >= 1024);
});

const noSidewaysScroll = async (page: import('@playwright/test').Page) =>
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);

test('GAP report lists every finding, P0 first, without sideways scrolling', async ({ page }) => {
  await page.goto('./gap/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('GAP analizi');
  const findings = page.locator('article.finding');
  await expect(findings).toHaveCount(38);
  await expect(findings.first().locator('.finding-priority')).toHaveText('P0');
  await expect(page.locator('#findings-count')).toHaveText('38 bulgu gösteriliyor');
  await noSidewaysScroll(page);
});

test('filters combine, survive a reload and can be cleared', async ({ page }) => {
  await page.goto('./gap/');
  await openFilters(page);
  await page.getByRole('button', { name: /^P0/ }).click();
  await expect(page).toHaveURL(/priority=P0/);
  const p0 = await page.locator('article.finding:visible').count();
  expect(p0).toBeGreaterThan(0);
  await expect(page.locator('article.finding:visible .finding-priority')).toHaveText(Array(p0).fill('P0'));

  await page.getByRole('button', { name: /^Karar bekliyor/ }).click();
  await expect(page).toHaveURL(/resolution=decision/);
  const both = await page.locator('article.finding:visible').count();
  expect(both).toBeLessThanOrEqual(p0);
  await expect(page.locator('#findings-count')).toHaveText(`${both} bulgu gösteriliyor`);

  await page.reload();
  await expect(page.locator('article.finding:visible')).toHaveCount(both);
  await expect(page.locator('details.facets summary')).toContainText('2 etkin');
  await openFilters(page);
  await expect(page.getByRole('button', { name: /^P0/ })).toHaveAttribute('aria-pressed', 'true');

  await page.getByRole('button', { name: 'Filtreleri temizle' }).click();
  await expect(page.locator('article.finding:visible')).toHaveCount(38);
  await expect(page).not.toHaveURL(/priority=/);
});

test('filter buttons work from the keyboard with one focus indicator', async ({ page, browserName }) => {
  // Safari moves between buttons with Option+Tab; plain Tab only visits text fields there.
  const next = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.goto('./gap/');
  const summary = page.locator('details.facets summary');
  await summary.focus();
  if (!(await page.locator('details.facets').evaluate((element: HTMLDetailsElement) => element.open))) {
    await page.keyboard.press('Enter');
  }
  for (let step = 0; step < 6; step += 1) {
    await page.keyboard.press(next);
    if ((await page.evaluate(() => document.activeElement?.textContent?.trim() ?? '')).startsWith('P1')) break;
  }
  const button = page.getByRole('button', { name: /^P1/ });
  await expect(button).toBeFocused();
  const focus = await button.evaluate(element => ({
    outline: getComputedStyle(element).outlineStyle,
    parentOutline: getComputedStyle(element.parentElement!).outlineStyle
  }));
  expect(focus.outline).not.toBe('none');
  expect(focus.parentOutline).toBe('none');
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-pressed', 'true');
});

test('evidence opens on demand and a handled finding links to its roadmap part', async ({ page }) => {
  await page.goto('./gap/');
  const finding = page.locator('#gap-02');
  await finding.getByText('Kanıt ve öneri').click();
  await expect(finding.getByText('Codex önerisi')).toBeVisible();

  await finding.getByRole('link', { name: 'F0.02' }).click();
  await expect(page).toHaveURL(/roadmap\/#f0-02$/);
  await expect(page.locator('#f0-02')).toBeInViewport();
});

test('report pages link to each other', async ({ page }) => {
  await page.goto('./roadmap/');
  await page.getByRole('navigation', { name: 'Raporlar' }).getByRole('link', { name: 'GAP analizi' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('GAP analizi');
  await expect(page.getByRole('link', { name: 'GAP analizi' })).toHaveAttribute('aria-current', 'page');
});
