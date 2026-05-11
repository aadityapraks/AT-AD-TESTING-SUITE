// spec: specs/functional/SCRUM-375-pwd-limit-enforcement.json
// test-data: test-data/scrum375-pwd-limit-enforcement.json

import { test, expect } from '@playwright/test';
import { CaregiverPage } from '../../pages/caregiver.page';
import testData from '../../test-data/scrum375-pwd-limit-enforcement.json';

test.describe('SCRUM-375: Caregiver - PwD Limit Enforcement', () => {
  let caregiverPage: CaregiverPage;

  test.describe.configure({ timeout: 120000 });

  test.beforeEach(async ({ page }) => {
    caregiverPage = new CaregiverPage(page);
  });

  test('TC_LIMIT_001: Verify PwD limit is enforced and displayed correctly', async () => {
    const td = testData.TC_LIMIT_001;

    // 1-2. Log in and navigate to My PwDs page
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 3. Verify Total PwDs label is displayed
    expect(await caregiverPage.isTotalPwdsLabelVisible()).toBe(true);

    // 4. Verify current PwD count is displayed
    const totalPwds = await caregiverPage.getTotalPwdCount();
    expect(totalPwds).toBeGreaterThanOrEqual(0);

    // 5. Verify remaining slots are shown
    expect(await caregiverPage.isAvailableSlotsLabelVisible()).toBe(true);
    const availableSlots = await caregiverPage.getAvailableSlots();
    expect(availableSlots).toBeGreaterThanOrEqual(0);

    // 6. Verify total PwD count matches actual card count
    expect(await caregiverPage.verifyTotalPwdCountMatchesCards()).toBe(true);

    // 7. Verify slots add up to the limit (Total PwDs + Available Slots = 5)
    expect(await caregiverPage.verifySlotsAddUpToLimit()).toBe(true);

    // 8. Verify the limit value (Total + Available = expected limit)
    expect(totalPwds + availableSlots).toBe(td.expected.pwdLimit);
  });

  test('TC_LIMIT_006: Verify limit enforcement prevents exceeding maximum PwDs', async () => {
    const td = testData.TC_LIMIT_006;

    // 1. Log in and navigate to My PwDs page
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Get current PwD count and available slots
    const totalPwds = await caregiverPage.getTotalPwdCount();
    const availableSlots = await caregiverPage.getAvailableSlots();

    // 3. Verify slots add up to the limit
    expect(totalPwds + availableSlots).toBe(td.expected.pwdLimit);

    // 4. If at limit (0 available), verify Add PwD button state
    if (availableSlots === 0) {
      // At limit — button should be disabled or hidden
      const isAddVisible = await caregiverPage.isAddPwdButtonVisible();
      if (isAddVisible) {
        const isEnabled = await caregiverPage.isAddPwdButtonEnabled();
        // Button may be visible but disabled
        expect(isEnabled).toBe(false);
      }
    } else {
      // Below limit — button should be enabled
      expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
      expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(true);

      // Navigate to Add PwD flow and verify it loads
      await caregiverPage.clickAddPwdButton();
      expect(await caregiverPage.isAddPwdPageLoaded()).toBe(true);

      // Navigate back without adding
      await caregiverPage.clickBackToMyPwds();

      // Verify count unchanged
      const currentCount = await caregiverPage.getTotalPwdCount();
      expect(currentCount).toBe(totalPwds);
    }
  });

  test('TC_LIMIT_009: Verify limit enforcement with available slots', async () => {
    const td = testData.TC_LIMIT_009;

    // 1. Log in and navigate to My PwDs page
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Get current counts
    const totalPwds = await caregiverPage.getTotalPwdCount();
    const availableSlots = await caregiverPage.getAvailableSlots();

    // 3. Verify slots add up to limit
    expect(totalPwds + availableSlots).toBe(td.expected.pwdLimit);

    // 4. If slots available, verify Add PwD button is enabled
    if (availableSlots > 0) {
      expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
      expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(true);

      // 5. Verify Add New PwD card shows slots available
      expect(await caregiverPage.isAddNewPwdCardVisible()).toBe(true);
      expect(await caregiverPage.isAddNewPwdSlotsAvailableTextVisible()).toBe(true);
    }

    // 6. Verify total count matches card count
    expect(await caregiverPage.verifyTotalPwdCountMatchesCards()).toBe(true);
  });

  test('TC_LIMIT_002: Verify Add New PwD button state based on available slots', async () => {
    const td = testData.TC_LIMIT_002;
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    const availableSlots = await caregiverPage.getAvailableSlots();

    if (availableSlots === 0) {
      // At limit — button should be disabled or hidden
      const isVisible = await caregiverPage.isAddPwdButtonVisible();
      if (isVisible) {
        expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(false);
      }
    } else {
      // Below limit — button should be enabled
      expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
      expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(true);
    }
  });

  test('TC_LIMIT_003: Verify informational message based on limit status', async () => {
    const td = testData.TC_LIMIT_003;
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    const availableSlots = await caregiverPage.getAvailableSlots();
    const totalPwds = await caregiverPage.getTotalPwdCount();

    // Verify slots add up
    expect(totalPwds + availableSlots).toBe(td.expected.pwdLimit);

    // Verify Care Network heading is visible
    const heading = await caregiverPage.getCareNetworkHeading();
    expect(heading).toContain('Your Care Network');

    // Verify PwD cards are displayed
    const cardCount = await caregiverPage.getPwdCardCount();
    expect(cardCount).toBe(totalPwds);
  });

  test('TC_LIMIT_004: Verify slots update dynamically when navigating to Add PwD', async () => {
    const td = testData.TC_LIMIT_004;
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // Note current counts
    const initialPwds = await caregiverPage.getTotalPwdCount();
    const initialSlots = await caregiverPage.getAvailableSlots();
    expect(initialPwds + initialSlots).toBe(td.expected.pwdLimit);

    // If slots available, navigate to Add PwD and back
    if (initialSlots > 0) {
      await caregiverPage.clickAddPwdButton();
      expect(await caregiverPage.isAddPwdPageLoaded()).toBe(true);
      await caregiverPage.clickBackToMyPwds();

      // Verify counts unchanged after navigating back
      const currentPwds = await caregiverPage.getTotalPwdCount();
      expect(currentPwds).toBe(initialPwds);
      const currentSlots = await caregiverPage.getAvailableSlots();
      expect(currentSlots).toBe(initialSlots);
    }
  });

  test('TC_LIMIT_005: Verify slot consistency after page refresh', async () => {
    const td = testData.TC_LIMIT_005;
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // Note current counts
    const initialPwds = await caregiverPage.getTotalPwdCount();
    const initialSlots = await caregiverPage.getAvailableSlots();

    // Refresh the page
    await caregiverPage.refreshPage();
    const heading = await caregiverPage.getMyPwdsHeading();
    expect(heading).toContain('My Persons with Disabilities');

    // Verify counts are consistent after refresh
    const refreshedPwds = await caregiverPage.getTotalPwdCount();
    const refreshedSlots = await caregiverPage.getAvailableSlots();
    expect(refreshedPwds).toBe(initialPwds);
    expect(refreshedSlots).toBe(initialSlots);
    expect(refreshedPwds + refreshedSlots).toBe(td.expected.pwdLimit);
  });

  test('TC_LIMIT_007: Verify limit is consistent after page refresh', async () => {
    const td = testData.TC_LIMIT_007;
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // Verify initial state
    const totalPwds = await caregiverPage.getTotalPwdCount();
    const availableSlots = await caregiverPage.getAvailableSlots();
    const limit = totalPwds + availableSlots;
    expect(limit).toBe(td.expected.pwdLimit);

    // Refresh and verify limit persists
    await caregiverPage.refreshPage();
    const heading = await caregiverPage.getMyPwdsHeading();
    expect(heading).toContain('My Persons with Disabilities');

    const newTotal = await caregiverPage.getTotalPwdCount();
    const newSlots = await caregiverPage.getAvailableSlots();
    expect(newTotal + newSlots).toBe(td.expected.pwdLimit);
  });

  test('TC_LIMIT_008: Verify limit enforcement with current slot count', async () => {
    const td = testData.TC_LIMIT_008;
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    const totalPwds = await caregiverPage.getTotalPwdCount();
    const availableSlots = await caregiverPage.getAvailableSlots();

    // Verify limit math
    expect(totalPwds + availableSlots).toBe(td.expected.pwdLimit);

    // Verify button state matches slot availability
    if (availableSlots > 0) {
      expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
      expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(true);
      expect(await caregiverPage.isAddNewPwdCardVisible()).toBe(true);
    }

    // Verify View Profile links match PwD count
    if (totalPwds > 0) {
      const viewProfileCount = await caregiverPage.getViewProfileLinkCount();
      expect(viewProfileCount).toBe(totalPwds);
    }
  });
});
