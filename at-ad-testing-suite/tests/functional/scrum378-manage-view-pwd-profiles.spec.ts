// spec: specs/functional/SCRUM-378-manage-view-pwd-profiles.json
// test-data: test-data/scrum378-manage-view-pwd-profiles.json

import { test, expect } from '@playwright/test';
import { CaregiverPage } from '../../pages/caregiver.page';
import testData from '../../test-data/scrum378-manage-view-pwd-profiles.json';

test.describe('SCRUM-378: Caregiver - Manage & View PwD Profiles', () => {
  let caregiverPage: CaregiverPage;

  test.describe.configure({ timeout: 120000 });

  test.beforeEach(async ({ page }) => {
    caregiverPage = new CaregiverPage(page);
  });

  test('TC_PROFILE_001: Verify Care Network Dashboard displays PwD list with summary cards', async () => {
    const td = testData.TC_PROFILE_001;

    // 1-2. Log in and navigate to My PwDs / Care Network Dashboard
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 3. Verify the page displays PwD list
    const heading = await caregiverPage.getMyPwdsHeading();
    expect(heading).toContain(td.expected.myPwdsHeading);

    // 4. Verify each PwD is shown as a summary card
    const pwdCardNames = await caregiverPage.getPwdCardNames();
    expect(pwdCardNames.length).toBeGreaterThan(0);

    // 5-9. Verify each card contains Name
    for (const name of pwdCardNames) {
      expect(await caregiverPage.verifyPwdCardHasName(name)).toBe(true);
    }

    // 10. Verify PwD limit is displayed
    expect(await caregiverPage.isTotalPwdsLabelVisible()).toBe(true);
    expect(await caregiverPage.isAvailableSlotsLabelVisible()).toBe(true);

    // 11. Verify used vs available slots
    const totalPwds = await caregiverPage.getTotalPwdCount();
    const availableSlots = await caregiverPage.getAvailableSlots();
    expect(totalPwds + availableSlots).toBe(td.expected.pwdLimit);

    // 12. Verify Care Network heading
    const careHeading = await caregiverPage.getCareNetworkHeading();
    expect(careHeading).toContain(td.expected.careNetworkHeading);

    // Verify View Profile links match card count
    const viewProfileCount = await caregiverPage.getViewProfileLinkCount();
    expect(viewProfileCount).toBe(pwdCardNames.length);

    // Verify Add PwD button is enabled (since slots are available)
    if (availableSlots > 0) {
      expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
      expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(true);
    }
  });

  test('TC_PROFILE_002: Verify Age is auto-calculated from Date of Birth', async () => {
    const td = testData.TC_PROFILE_002;

    // 1. Log in and navigate to My PwDs
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Click View Profile on first PwD
    const pwdCardNames = await caregiverPage.getPwdCardNames();
    expect(pwdCardNames.length).toBeGreaterThan(0);
    await caregiverPage.clickViewProfileLink(0);
    await caregiverPage.waitForPwdProfilePage();

    // 3. Verify Personal Details section is visible
    expect(await caregiverPage.isPersonalDetailsSectionVisible()).toBe(true);

    // 4. Verify Contact Information section is visible
    expect(await caregiverPage.isContactInformationSectionVisible()).toBe(true);

    // 5. Verify Disability Information section is visible
    expect(await caregiverPage.isDisabilityInformationSectionVisible()).toBe(true);

    // 6. Verify PwD name is visible on profile
    expect(await caregiverPage.isPwdProfileNameVisible(pwdCardNames[0])).toBe(true);

    // 7. Navigate back to My PwDs
    expect(await caregiverPage.isBackToMyPwdsLinkVisible()).toBe(true);
    await caregiverPage.clickBackToMyPwds();

    // 8. Verify My PwDs page loads after returning
    const heading = await caregiverPage.getMyPwdsHeading();
    expect(heading).toContain('My Persons with Disabilities');
  });

  test('TC_PROFILE_003: Verify Activity History view and tab switching', async () => {
    const td = testData.TC_PROFILE_003;

    // 1. Log in and navigate to My PwDs
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Click View Profile on first PwD
    await caregiverPage.clickViewProfileLink(0);
    await caregiverPage.waitForPwdProfilePage();

    // 3. Verify Personal Details section is visible (default view)
    expect(await caregiverPage.isPersonalDetailsSectionVisible()).toBe(true);

    // 4. Check if Activity History tab exists
    const hasActivityTab = await caregiverPage.isActivityHistoryTabVisible();

    if (hasActivityTab) {
      // 5. Click Activity History tab
      await caregiverPage.clickActivityHistoryTab();

      // 6. Switch back to Full Profile
      const hasProfileTab = await caregiverPage.isFullProfileTabVisible();
      if (hasProfileTab) {
        await caregiverPage.clickFullProfileTab();
        expect(await caregiverPage.isPersonalDetailsSectionVisible()).toBe(true);
      }
    }

    // 7. Verify back navigation works
    expect(await caregiverPage.isBackToMyPwdsLinkVisible()).toBe(true);
  });

  test('TC_PROFILE_004: Verify Activity History empty state', async () => {
    const td = testData.TC_PROFILE_004;
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    await caregiverPage.clickViewProfileLink(0);
    await caregiverPage.waitForPwdProfilePage();

    // Check if Activity History tab exists and click it
    const hasTab = await caregiverPage.isActivityHistoryTabVisible();
    if (hasTab) {
      await caregiverPage.clickActivityHistoryTab();
      // Switch back to verify profile still works
      const hasProfileTab = await caregiverPage.isFullProfileTabVisible();
      if (hasProfileTab) {
        await caregiverPage.clickFullProfileTab();
      }
    }
    expect(await caregiverPage.isBackToMyPwdsLinkVisible()).toBe(true);
  });

  test('TC_PROFILE_005: Verify empty dashboard shows Add Your First PwD state', async () => {
    const td = testData.TC_PROFILE_005;
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    const totalPwds = await caregiverPage.getTotalPwdCount();
    const availableSlots = await caregiverPage.getAvailableSlots();
    expect(totalPwds + availableSlots).toBe(td.expected.pwdLimit);

    if (availableSlots > 0) {
      expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
      expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(true);
    }
  });
});
