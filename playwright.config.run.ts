import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/functional',
  timeout: 120000,
  testMatch: 'scrum31-workflow.spec.ts',
  outputDir: './test-results',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },
  reporter: [['list']],
});
