import { expect, test } from '@playwright/test';

test('catalog opens an interactive component detail without browser errors', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  await page.goto('./?page=catalog');
  await expect(page.locator('.component-card')).toHaveCount(25);
  await page.locator('.component-card').first().click();

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#preview')).toHaveAttribute('sandbox', 'allow-scripts');
  await expect(page.getByText('Editable source')).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test('Storybook is included in the production output', async ({ page }) => {
  await page.goto('./?page=catalog');
  const storybookUrl = await page.locator('.topnav a', { hasText: 'Storybook' }).evaluate((link: HTMLAnchorElement) => link.href);
  await page.goto(storybookUrl);
  await expect(page).toHaveTitle(/Storybook/);
  const index = await page.evaluate(async () => (await fetch('index.json')).json());
  expect(Object.keys(index.entries).length).toBeGreaterThanOrEqual(3);
});

test('the Storybook production story opens the workspace under the deployed path', async ({ page, baseURL }) => {
  await page.goto('./storybook/iframe.html?id=documentation-production-workspace--live-application&viewMode=story');
  const frameUrl = await page.locator('iframe.production-story').evaluate((frame: HTMLIFrameElement) => frame.src);
  expect(frameUrl).toBe(`${baseURL}?page=catalog`);
});

test('catalog filters are shareable and sidebar accordions stay exclusive', async ({ page }) => {
  await page.goto('./?page=catalog');
  await page.getByRole('button', { name: 'Pro', exact: true }).click();
  await expect(page).toHaveURL(/tier=pro/);
  await expect(page.locator('.component-card')).toHaveCount(1);

  await page.getByRole('switch', { name: 'Experimental' }).check();
  await expect(page).toHaveURL(/experimental=1/);
  await expect(page.locator('.component-card')).toHaveCount(2);

  if ((page.viewportSize()?.width ?? 0) >= 1024) {
    const groups = page.locator('#sidebar details');
    await expect(groups).toHaveCount(5);
    await expect(page.locator('#sidebar details[open]')).toHaveCount(0);
    await groups.nth(0).locator('summary').click();
    await groups.nth(1).locator('summary').click();
    await expect(groups.nth(0)).not.toHaveAttribute('open', '');
    await expect(groups.nth(1)).toHaveAttribute('open', '');
  }
});

test('editor updates preview, theme switches and sandbox blocks network', async ({ page }) => {
  await page.goto('./?page=component&component=button');
  const frame = page.locator('#preview');
  await expect(frame).toHaveAttribute('sandbox', 'allow-scripts');
  await expect(frame).toHaveAttribute('srcdoc', /connect-src 'none'/);

  await page.getByRole('button', { name: 'Light', exact: true }).click();
  await expect.poll(async () => page.frames()[1]?.locator('html').getAttribute('data-appearance')).toBe('light');

  const editor = page.getByLabel('Editable source');
  await editor.fill(`${await editor.inputValue()}\n<!-- edited -->`);
  await expect(page.getByText(/Modified · changes stay in this session/)).toBeVisible();
  await expect(page.locator('#preview-status')).toHaveText('Preview ready');
});

test('command search opens from the keyboard and owns focus', async ({ page }) => {
  await page.goto('./?page=catalog');
  await page.keyboard.press('ControlOrMeta+KeyK');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#global-query')).toBeFocused();
  await page.locator('#global-query').fill('dialog');
  await expect(page.locator('.search-result')).toHaveCount(1);
});
