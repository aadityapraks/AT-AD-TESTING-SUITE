// Seed setup file for Playwright MCP test generator
// This file is used to set up the initial page state for test generation

export async function setupPage(page: any) {
  await page.goto('https://hub-ui-admin-qa.swarajability.org/');
}
