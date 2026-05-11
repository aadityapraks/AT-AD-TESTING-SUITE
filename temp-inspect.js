const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  p.setDefaultTimeout(60000);

  // Login via Authentik
  await p.goto('https://qa-atad.swarajability.org/');
  await p.waitForLoadState('domcontentloaded');
  await p.waitForTimeout(1500);
  await p.locator('a').filter({ hasText: /Sign In/i }).first().click();
  await p.waitForTimeout(1500);
  await p.locator('a').filter({ hasText: /Sign In with SwarajAbility/i }).first().click();
  await p.waitForURL(/auth-d/, { timeout: 10000 });
  await p.waitForLoadState('networkidle');
  await p.waitForTimeout(2000);
  await p.locator('input[name="uidField"]').fill('candidate8new1@mailto.plus');
  await p.locator('button[type="submit"]').click();
  await p.waitForTimeout(3000);
  await p.locator('input[type="password"]').fill('123456');
  await p.locator('button[type="submit"]').click();
  await p.waitForTimeout(5000);
  for (let i = 0; i < 5; i++) {
    if (!p.url().includes('auth-d')) break;
    await p.waitForTimeout(2000);
    await p.evaluate(() => {
      function f(r) {
        const bs = r.querySelectorAll('button');
        for (const btn of bs) { if (btn.type === 'submit') { btn.click(); return; } }
        for (const el of r.querySelectorAll('*')) { if (el.shadowRoot) f(el.shadowRoot); }
      }
      f(document);
    }).catch(() => {});
    await p.waitForTimeout(3000);
  }
  await p.waitForURL(/qa-atad/, { timeout: 15000 }).catch(() => {});
  await p.waitForTimeout(3000);
  console.log('Logged in:', p.url());

  // Go to profile
  await p.goto('https://qa-atad.swarajability.org/my-profile/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(8000);

  // 1. Header info
  const header = await p.evaluate(() => {
    const n = document.querySelector('.atad-up-name');
    const e = document.querySelector('.atad-up-email');
    const tags = document.querySelectorAll('.atad-up-tag');
    return {
      name: n ? n.textContent.trim() : 'N/A',
      email: e ? e.textContent.trim() : 'N/A',
      tags: Array.from(tags).map(t => t.textContent.trim())
    };
  });
  console.log('HEADER:', JSON.stringify(header));

  // 2. All atad-up classes
  const classes = await p.evaluate(() => {
    const els = document.querySelectorAll('[class*="atad-up"]');
    return Array.from(els).slice(0, 50).map(e =>
      e.className.substring(0, 70) + ' | ' + e.tagName + ' | ' + e.textContent.trim().replace(/\s+/g, ' ').substring(0, 60)
    );
  });
  console.log('--- ATAD-UP CLASSES ---');
  classes.forEach(c => console.log(c));

  // 3. Profile tab panel content
  const profilePanel = await p.evaluate(() => {
    const panels = document.querySelectorAll('.atad-flow-panel, [class*="panel"]');
    for (const pan of panels) {
      if (pan.textContent.includes('Personal Information')) {
        return pan.textContent.replace(/\s+/g, ' ').substring(0, 500);
      }
    }
    return 'not found';
  });
  console.log('PROFILE PANEL:', profilePanel);

  // 4. Click Wishlist tab
  await p.locator('button.atad-flow-tab').filter({ hasText: /Wishlist/i }).click();
  await p.waitForTimeout(2000);
  const wishlistPanel = await p.evaluate(() => {
    const active = document.querySelector('.atad-flow-panel.active, .atad-flow-panel:not([hidden])');
    return active ? active.textContent.replace(/\s+/g, ' ').substring(0, 400) : 'no active panel';
  });
  console.log('WISHLIST PANEL:', wishlistPanel);

  // 5. Click Inquiries tab
  await p.locator('button.atad-flow-tab').filter({ hasText: /Inquiries/i }).click();
  await p.waitForTimeout(2000);
  const inquiriesPanel = await p.evaluate(() => {
    const panels = document.querySelectorAll('.atad-flow-panel');
    for (const pan of panels) {
      if (pan.offsetParent !== null && pan.textContent.includes('Inquir')) {
        return pan.textContent.replace(/\s+/g, ' ').substring(0, 400);
      }
    }
    return document.body.textContent.replace(/\s+/g, ' ').match(/Inquir.{0,300}/)?.[0] || 'not found';
  });
  console.log('INQUIRIES PANEL:', inquiriesPanel);

  // 6. Click Settings tab
  await p.locator('button.atad-flow-tab').filter({ hasText: /Settings/i }).click();
  await p.waitForTimeout(2000);
  const settingsPanel = await p.evaluate(() => {
    const panels = document.querySelectorAll('.atad-flow-panel');
    for (const pan of panels) {
      if (pan.offsetParent !== null && (pan.textContent.includes('Privacy') || pan.textContent.includes('Delete') || pan.textContent.includes('Setting'))) {
        return pan.textContent.replace(/\s+/g, ' ').substring(0, 500);
      }
    }
    return 'not found';
  });
  console.log('SETTINGS PANEL:', settingsPanel);

  // 7. All buttons on page
  const buttons = await p.evaluate(() => {
    const btns = document.querySelectorAll('button, a[class*="atad"]');
    return Array.from(btns).filter(b => b.offsetParent !== null).slice(0, 20).map(b => ({
      text: b.textContent.trim().substring(0, 40),
      cls: b.className.substring(0, 60),
      tag: b.tagName
    }));
  });
  console.log('BUTTONS:', JSON.stringify(buttons));

  await b.close();
})().catch(e => console.error('ERROR:', e.message));
