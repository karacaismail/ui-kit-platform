import { defineConfig, devices } from '@playwright/test';

// Same variable the Astro build reads, so the suite exercises the site at its deployed path.
const baseURL = `http://127.0.0.1:49177${(process.env.PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '')}/`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'line',
  use: {
    baseURL,
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium-mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 800 }, hasTouch: true } },
    { name: 'webkit-mobile', use: { ...devices['Desktop Safari'], viewport: { width: 390, height: 844 }, hasTouch: true } },
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'firefox-desktop', use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } } },
    { name: 'webkit-desktop', use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } } }
  ],
  webServer: {
    command: 'astro preview --host 127.0.0.1 --port 49177 --ignore-lock',
    url: baseURL,
    reuseExistingServer: false
  }
});
