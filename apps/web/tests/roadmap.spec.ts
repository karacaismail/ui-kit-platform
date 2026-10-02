import { expect, test } from '@playwright/test';

test('roadmap lists every phase with 3 to 24 parts and never scrolls sideways', async ({ page }) => {
  await page.goto('./roadmap/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Yol haritası/);

  const phases = page.locator('section.phase');
  const phaseCount = await phases.count();
  expect(phaseCount).toBeGreaterThanOrEqual(8);
  await expect(page.locator('.phase-index a')).toHaveCount(phaseCount);

  for (let index = 0; index < phaseCount; index += 1) {
    const partCount = await phases.nth(index).locator('.part').count();
    expect(partCount, `phase ${index}`).toBeGreaterThanOrEqual(3);
    expect(partCount, `phase ${index}`).toBeLessThanOrEqual(24);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('phase index opens the phase and shows one focus indicator on the focused link', async ({ page }) => {
  await page.goto('./roadmap/');
  const link = page.locator('.phase-index a').nth(3);

  await link.focus();
  const focus = await link.evaluate(element => {
    const style = getComputedStyle(element);
    return { outline: style.outlineStyle, shadow: style.boxShadow, parentOutline: getComputedStyle(element.parentElement!).outlineStyle };
  });
  expect(focus.outline).not.toBe('none');
  expect(focus.shadow).toBe('none');
  expect(focus.parentOutline).toBe('none');

  await link.press('Enter');
  await expect(page).toHaveURL(/#faz-3$/);
  await expect(page.locator('#faz-3').getByRole('heading', { level: 2 })).toBeInViewport();
});

test('AI and carried-over items link to the part they describe', async ({ page }) => {
  await page.goto('./roadmap/');
  const first = page.locator('#ai .part-links a').first();
  const target = await first.getAttribute('href');
  expect(target).toMatch(/^#f\d+-\d{2}$/);
  await first.click();
  await expect(page.locator(target!)).toBeInViewport();
  await expect(page.locator('#eski-plan .part-links a').first()).toBeVisible();
  await expect(page.locator('#kararlar .part-links a').first()).toBeVisible();
});

test('roadmap links back to the component workspace', async ({ page }) => {
  await page.goto('./roadmap/');
  await page.getByRole('link', { name: 'Çalışma alanı' }).click();
  await expect(page.locator('.component-card').first()).toBeVisible();
});

test('priority order shows four gated tiers whose steps link to parts and findings', async ({ page }) => {
  await page.goto('./roadmap/');
  const order = page.locator('#oncelik');
  await expect(order.locator('.tier h3')).toHaveText(['Kritik', 'Olmazsa olmaz', 'Önemli', 'Pazarlanabilirlik']);
  await expect(order.locator('.tier-gate')).toHaveCount(4);
  await expect(order.locator('.step').first().locator('.step-number')).toHaveText('1');

  await order.locator('.step').first().getByRole('link', { name: /Son yeşil sürümün kurulması/ }).click();
  await expect(page).toHaveURL(/#f0-17$/);
  await expect(page.locator('#f0-17')).toBeInViewport();
  await expect(page.locator('#f0-17 .tier-badge')).toHaveText('Kritik');

  await page.goto('./roadmap/');
  await order.locator('.step').first().getByRole('link', { name: 'UU-15' }).click();
  await expect(page).toHaveURL(/unknowns\/#uu-15$/);
  await expect(page.locator('#uu-15')).toBeInViewport();
});
