import { defineConfig } from '@playwright/test';

const VIEWPORT_WIDTH = parseInt(process.env.VIEWPORT_WIDTH || '1280');
const VIEWPORT_HEIGHT = parseInt(process.env.VIEWPORT_HEIGHT || '720');

export default defineConfig({
  testDir: './',
  timeout: 120000,
  testMatch: '**/*.spec.ts',
  testIgnore: ['**/seed/**', '**/node_modules/**'],
  outputDir: './test-results',
  use: {
    headless: false,
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
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
      testIgnore: ['**/*.setup.ts', '**/scrum36*-caregiver-*.spec.ts', '**/seed/**', '**/seed-*.ts', '**/tests/accessibility/**'],
    },
    // Caregiver tests — login handled in test via loginOrNavigateToMyPwDs
    {
      name: 'caregiver',
      testMatch: '**/scrum36*-caregiver-*.spec.ts',
    },
    // Accessibility tests
    {
      name: 'accessibility',
      testMatch: '**/tests/accessibility/**/*.spec.ts',
    },
  ],
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['./reporters/readable-reporter.js'],
    ['./reporters/spec-status-reporter.js'],
  ],
});
