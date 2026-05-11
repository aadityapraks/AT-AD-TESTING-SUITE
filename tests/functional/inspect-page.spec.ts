// Diagnostic test to inspect page structure
import { test } from '@playwright/test';
import testData from '../../test-data/scrum32-unique-features.json';
import { vendorLogin } from '../seed/vendor-login.seed';

test('Inspect Product Upload Page Structure', async ({ page }) => {
  await vendorLogin(page, testData.baseUrl, testData.vendor.email, testData.vendor.password);
  
  // Navigate to Product Upload
  await page.getByRole('link', { name: 'Product Upload' }).click();
  await page.waitForURL(/product-upload/, { timeout: 20000 });
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  
  // Get all labels, headings, and buttons on page
  console.log('=== PAGE STRUCTURE ===');
  
  // Get all visible text
  const allText = await page.locator('*').evaluateAll(elements => 
    elements
      .filter(el => el.textContent && el.textContent.length < 200)
      .map(el => ({
        tag: el.tagName,
        text: el.textContent.substring(0, 100),
        className: el.className,
      }))
  );
  
  // Get all buttons
  const buttons = await page.locator('button').evaluateAll(btns => 
    btns.map(btn => ({
      text: btn.textContent,
      aria: btn.getAttribute('aria-label'),
      name: btn.getAttribute('name'),
    }))
  );
  
  console.log('BUTTONS:', buttons);
  
  // Get all labels
  const labels = await page.locator('label').evaluateAll(lbls => 
    lbls.map(lbl => lbl.textContent)
  );
  
  console.log('LABELS:', labels);
  
  // Get all headings
  const headings = await page.locator('h1, h2, h3, h4, h5').evaluateAll(hs => 
    hs.map(h => ({
      level: h.tagName,
      text: h.textContent,
    }))
  );
  
  console.log('HEADINGS:', headings);
  
  // Scroll to bottom to see all content
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  // Check for feature-related elements
  const featureElements = await page.locator('*').evaluateAll(els =>
    els
      .filter(el => {
        const text = el.textContent || '';
        return text.includes('Feature') || text.includes('feature') || text.includes('highlight') || text.includes('Highlight');
      })
      .slice(0, 20)
      .map(el => ({
        tag: el.tagName,
        text: el.textContent.substring(0, 100),
      }))
  );
  
  console.log('FEATURE-RELATED ELEMENTS:', featureElements);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/page-structure-inspection.png', fullPage: true });
  
  console.log('=== END PAGE STRUCTURE ===');
});
