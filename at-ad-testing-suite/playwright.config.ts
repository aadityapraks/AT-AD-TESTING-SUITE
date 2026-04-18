import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './',
  timeout: 120000,
  testMatch: '**/*.spec.ts',
  outputDir: './test-results',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [
    // Auth setup — runs once, saves session
    {
      name: 'caregiver-setup',
      testMatch: /caregiver-auth\.setup\.ts/,
    },
    // Default project — runs all spec tests
    {
      name: 'default',
      testMatch: '**/*.spec.ts',
      testIgnore: ['**/*.setup.ts', '**/scrum36*-caregiver-*.spec.ts', '**/seed/**'],
    },
    // Caregiver tests — login handled in test via loginOrNavigateToMyPwDs
    {
      name: 'caregiver',
      testMatch: '**/scrum36*-caregiver-*.spec.ts',
    },
  ],
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['./reporters/readable-reporter.js'],
    ['./reporters/spec-status-reporter.js'],
  ],
});
