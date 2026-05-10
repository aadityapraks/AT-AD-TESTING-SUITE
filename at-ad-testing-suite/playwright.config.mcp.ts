import { defineConfig } from '@playwright/test';

/**
 * Minimal Playwright config for MCP test generator.
 * testDir MUST point to a folder with ONLY the seed file.
 * No other test files should be discoverable.
 */
export default defineConfig({
  testDir: './mcp-seed',
  timeout: 120000,
  testIgnore: ['**/tests/**', '**/seed/**', '**/node_modules/**', '**/test-data/**'],
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
