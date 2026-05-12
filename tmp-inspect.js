const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto('https://atad.org.in/wp-login.php');
  await page.fill('#user_login', 'candidate8new1@mailto.plus');
  await page.fill('#user_pass', '123456');
  await page.click('#wp-submit');
  await page.waitForLoadState('domcontentloaded');
  await page.goto('https://atad.org.in/catalog/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  const link = page.locator('a[href*="/product/"]').first();
  await link.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  const btns = await page.evaluate(() => {
    const r = [];
    document.querySelectorAll('a,button').forEach(el => {
      const t = el.textContent.trim().toLowerCase();
      if (t.includes('contact')||t.includes('vendor')||t.includes('enquire')) {
        r.push({tag:el.tagName,text:t.substring(0,60),cls:el.className.substring(0,100)});
      }
    });
    return r;
  });
  console.log(JSON.stringify(btns, null, 2));
  await browser.close();
})().catch(e => console.error(e.message));
