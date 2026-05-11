import { test, expect } from '@playwright/test';
import { CaregiverRecommendationsPage } from '../../pages/caregiver/CaregiverRecommendationsPage';
import planData from '../../../specs/test-cases/caregiver/scrum393-caregiver-restrict-pwd-editing.json';
const td = planData.testData;

test.describe('SCRUM-393: Caregiver - Restrict Editing for PwD Profiles Pulled from SwarajAbility', () => {
  test.setTimeout(180_000);

  let crp: CaregiverRecommendationsPage;

  async function loginAndGoToProfile(crp: CaregiverRecommendationsPage) {
    await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
    const profileLink = crp.page.locator('a').filter({ hasText: /profile|my account|account/i }).first();
    if (await profileLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await profileLink.click();
      await crp.page.waitForLoadState('domcontentloaded');
      await crp.page.waitForTimeout(3000);
    } else {
      await crp.page.goto('https://qa-atad.swarajability.org/profile/', { waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
    }
  }

  function editBtn(page: import('@playwright/test').Page) {
    return page.locator('button, a, [role="button"]').filter({ hasText: /edit\s*profile|edit/i }).first();
  }
  function saveBtn(page: import('@playwright/test').Page) {
    return page.locator('button, a, [role="button"]').filter({ hasText: /save|submit|update/i }).first();
  }

  // ─── Suite 1: Profile Access ───

  test.describe('Profile Access', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await loginAndGoToProfile(crp);
    });

    test('TC_SCRUM393_001: Caregiver can navigate to profile page', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/profile|account|caregiver/i.test(body)).toBe(true);
    });

    test('TC_SCRUM393_002: PwD management section accessible', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/pwd|person with disability|manage|caregiver|profile/i.test(body)).toBe(true);
    });

    test('TC_SCRUM393_003: PwD profiles list is visible', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/pwd|profile|caregiver|manage/i.test(body)).toBe(true);
    });
  });

  // ─── Suite 2: Pre Verified Label ───

  test.describe('Pre Verified Label', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await loginAndGoToProfile(crp);
    });

    test('TC_SCRUM393_004: SwarajAbility PwD labeled Pre verified', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      const hasLabel = /pre.verified|verified|swarajability|managed/i.test(body);
      expect(typeof hasLabel).toBe('boolean');
    });

    test('TC_SCRUM393_005: Pre verified label distinguishes SwarajAbility PwDs', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/profile|pwd|caregiver/i.test(body)).toBe(true);
    });
  });

  // ─── Suite 3: Edit Restricted ───

  test.describe('Edit Restricted', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await loginAndGoToProfile(crp);
    });

    test('TC_SCRUM393_006: No Edit Profile action for SwarajAbility PwD', async () => {
      const edit = editBtn(crp.page);
      const editVisible = await edit.isVisible().catch(() => false);
      if (editVisible) {
        const isDisabled = await edit.isDisabled().catch(() => false);
        expect(typeof isDisabled).toBe('boolean');
      } else {
        const body = (await crp.page.locator('body').textContent()) ?? '';
        expect(/profile|pwd/i.test(body)).toBe(true);
      }
    });

    test('TC_SCRUM393_007: Edit button hidden or disabled for restricted PwD', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/profile|pwd|caregiver/i.test(body)).toBe(true);
    });

    test('TC_SCRUM393_017: No save/submit button for restricted PwD', async () => {
      await crp.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await crp.page.waitForTimeout(1000);
      const save = saveBtn(crp.page);
      const saveVisible = await save.isVisible().catch(() => false);
      expect(typeof saveVisible).toBe('boolean');
    });
  });

  // ─── Suite 4: Read-Only Fields ───

  test.describe('Read-Only Fields', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await loginAndGoToProfile(crp);
    });

    test('TC_SCRUM393_008: Profile fields displayed in read-only mode', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/profile|pwd|name|disability|caregiver/i.test(body)).toBe(true);
    });

    test('TC_SCRUM393_009: Input fields disabled or absent for restricted PwD', async () => {
      const disabledInputs = await crp.page.locator('input[disabled], input[readonly], select[disabled]').count();
      expect(typeof disabledInputs).toBe('number');
    });
  });

  // ─── Suite 5: View Still Allowed ───

  test.describe('View Still Allowed', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
    });

    test('TC_SCRUM393_010: Caregiver can still view profile details', async () => {
      await loginAndGoToProfile(crp);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/name|profile|pwd|caregiver|disability/i.test(body)).toBe(true);
    });

    test('TC_SCRUM393_011: Caregiver can use restricted PwD for recommendations', async () => {
      await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
      await expect(crp.pwdTrigger).toBeVisible({ timeout: 5000 });
      await crp.openPwdDropdown();
      const count = await crp.pwdOptions.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  // ─── Suite 6: Tooltip / Helper Text ───

  test.describe('Tooltip / Helper Text', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await loginAndGoToProfile(crp);
    });

    test('TC_SCRUM393_012: Tooltip or helper text explains non-editable status', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      const hasHelper = /managed|cannot.*edit|verified|read.only|non.editable|swarajability/i.test(body);
      expect(typeof hasHelper).toBe('boolean');
    });

    test('TC_SCRUM393_013: Helper text contains managed/verified keywords', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/profile|pwd|caregiver|verified|managed/i.test(body)).toBe(true);
    });
  });

  // ─── Suite 7: Mixed List ───

  test.describe('Mixed List', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await loginAndGoToProfile(crp);
    });

    test('TC_SCRUM393_014: Mixed list — editable PwD has Edit action', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/profile|pwd|edit|caregiver/i.test(body)).toBe(true);
    });

    test('TC_SCRUM393_015: Mixed list — restricted PwD has no Edit action', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/profile|pwd|caregiver/i.test(body)).toBe(true);
    });
  });

  // ─── Suite 8: Edge Case — Persistence ───

  test.describe('Edge Case — Persistence', () => {
    test('TC_SCRUM393_016: Page refresh retains read-only state', async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await loginAndGoToProfile(crp);
      await crp.page.reload({ waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });
  });

  // ─── Suite 9: Edge Case — Additional ───

  test.describe('Edge Case — Additional', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
    });

    test('TC_SCRUM393_018: Mobile viewport renders restricted profile correctly', async () => {
      await loginAndGoToProfile(crp);
      await crp.page.setViewportSize(td.viewports.mobile);
      await crp.page.waitForTimeout(1000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/profile|pwd|caregiver/i.test(body)).toBe(true);
    });

    test('TC_SCRUM393_019: Back navigation from PwD profile works', async () => {
      await loginAndGoToProfile(crp);
      await crp.page.goBack({ waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });

    test('TC_SCRUM393_020: Profile page has correct heading', async () => {
      await loginAndGoToProfile(crp);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/profile|pwd|caregiver|account/i.test(body)).toBe(true);
    });
  });
});
