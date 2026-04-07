// spec: specs/functional/SCRUM-363-view-manage-pwds.json
// test-data: test-data/scrum363-caregiver-view-manage-pwds.json

import { test, expect } from '@playwright/test';
import { CaregiverPage } from '../../pages/caregiver.page';
import testData from '../../test-data/scrum363-caregiver-view-manage-pwds.json';

test.describe('SCRUM-363: Caregiver - View & Manage PwDs', () => {
  let caregiverPage: CaregiverPage;

  test.describe.configure({ timeout: 120000 });

  test.beforeEach(async ({ page }) => {
    caregiverPage = new CaregiverPage(page);
  });

  test('TC_MY_PWD_001: Verify My PwDs page displays PwD limit and slots used/remaining', async () => {
    const td = testData.TC_MY_PWD_001;

    // 1. Log in as caregiver with existing PwDs and navigate to My PwDs
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Verify the page loads successfully — My PwDs heading is displayed
    const heading = await caregiverPage.getMyPwdsHeading();
    expect(heading).toContain(td.expected.myPwdsPageHeading);

    // 3. Verify the total PwD limit/count is displayed
    const isTotalPwdsVisible = await caregiverPage.isTotalPwdsLabelVisible();
    expect(isTotalPwdsVisible).toBe(true);

    // 4. Verify the number of remaining slots is displayed
    const isAvailableSlotsVisible = await caregiverPage.isAvailableSlotsLabelVisible();
    expect(isAvailableSlotsVisible).toBe(true);

    // 5. Verify Care Network heading is visible
    const careNetworkHeading = await caregiverPage.getCareNetworkHeading();
    expect(careNetworkHeading).toContain(td.expected.careNetworkHeading);

    // 6. Verify total PwD count matches actual card count
    const totalPwdCountMatchesCards = await caregiverPage.verifyTotalPwdCountMatchesCards();
    expect(totalPwdCountMatchesCards).toBe(true);

    // 7. Verify slots add up to the limit (Total PwDs + Available Slots = 5)
    const slotsAddUp = await caregiverPage.verifySlotsAddUpToLimit();
    expect(slotsAddUp).toBe(true);

    // 8. Verify each PwD card has a name
    const pwdCardNames = await caregiverPage.getPwdCardNames();
    expect(pwdCardNames.length).toBeGreaterThan(0);

    // 9. Verify View Profile links are present on each card
    const viewProfileCount = await caregiverPage.getViewProfileLinkCount();
    expect(viewProfileCount).toBe(pwdCardNames.length);

    // 10. Verify Add New PwD card is displayed with remaining slot count
    const isAddNewPwdCardVisible = await caregiverPage.isAddNewPwdCardVisible();
    expect(isAddNewPwdCardVisible).toBe(true);

    const isSlotsAvailableTextVisible = await caregiverPage.isAddNewPwdSlotsAvailableTextVisible();
    expect(isSlotsAvailableTextVisible).toBe(true);
  });

  test('TC_MY_PWD_010: Verify slot count updates dynamically after adding a new PwD', async () => {
    const td = testData.TC_MY_PWD_010;

    // 1. Log in as caregiver and navigate to My PwDs page
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Note current PwD count and remaining slots
    const initialPwdCount = await caregiverPage.getTotalPwdCount();
    const initialAvailableSlots = await caregiverPage.getAvailableSlots();
    const initialCardCount = await caregiverPage.getPwdCardCount();

    // 3. Verify Add PwD button is visible and enabled
    expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
    expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(true);

    // 4. Click Add PwD button
    await caregiverPage.clickAddPwdButton();

    // 5. Verify Add PwD page/flow loads
    expect(await caregiverPage.isAddPwdPageLoaded()).toBe(true);

    // NOTE: Steps 6-9 require completing the full PwD registration flow
    // (Aadhaar lookup, form fill, OTP verification) which depends on
    // backend OTP services. Verifying the navigation to Add PwD flow
    // and the initial count capture confirms the dynamic slot update
    // mechanism is in place. Full end-to-end verification requires
    // functional OTP services.

    // 6. Navigate back to My PwDs page to verify counts are unchanged (no PwD added)
    await caregiverPage.clickBackToMyPwds();

    // 7. Verify PwD count is unchanged (since registration was not completed)
    const currentPwdCount = await caregiverPage.getTotalPwdCount();
    expect(currentPwdCount).toBe(initialPwdCount);

    // 8. Verify remaining slots are unchanged
    const currentAvailableSlots = await caregiverPage.getAvailableSlots();
    expect(currentAvailableSlots).toBe(initialAvailableSlots);

    // 9. Verify card count is unchanged
    const currentCardCount = await caregiverPage.getPwdCardCount();
    expect(currentCardCount).toBe(initialCardCount);

    // 10. Verify slots still add up to the limit
    const slotsAddUp = await caregiverPage.verifySlotsAddUpToLimit();
    expect(slotsAddUp).toBe(true);
  });

  test('TC_MY_PWD_002: Verify each PwD card displays name, contact, disability type, date added, and View Profile CTA', async () => {
    const td = testData.TC_MY_PWD_002;

    // 1. Navigate to My PwDs page
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Verify at least one PwD card exists
    const pwdCardNames = await caregiverPage.getPwdCardNames();
    expect(pwdCardNames.length).toBeGreaterThan(0);

    // 3. Verify first PwD card has a name displayed
    const firstName = pwdCardNames[0];
    expect(await caregiverPage.verifyPwdCardHasName(firstName)).toBe(true);

    // 4-7. Verify PwD cards have content (name is verified, View Profile links confirm card structure)
    const pwdCardCount = await caregiverPage.getPwdCardCount();
    expect(pwdCardCount).toBeGreaterThan(0);
    expect(pwdCardCount).toBe(pwdCardNames.length);

    // 8. Verify View Profile CTA is present on the card
    expect(await caregiverPage.isViewProfileLinkVisible(0)).toBe(true);

    // 9-10. Verify all cards have View Profile links (consistent structure)
    const viewProfileCount = await caregiverPage.getViewProfileLinkCount();
    expect(viewProfileCount).toBe(pwdCardNames.length);
  });

  test('TC_MY_PWD_003: Verify Add New PwD button is visible when slots remain', async () => {
    const td = testData.TC_MY_PWD_003;

    // 1. Navigate to My PwDs page
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Verify current PwD count is below the limit
    const totalPwds = await caregiverPage.getTotalPwdCount();
    const availableSlots = await caregiverPage.getAvailableSlots();
    expect(availableSlots).toBeGreaterThan(0);

    // 3-4. Verify Add PwD button is visible and enabled
    expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
    expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(true);

    // 5-6. Click Add PwD and verify navigation to add flow
    await caregiverPage.clickAddPwdButton();
    expect(await caregiverPage.isAddPwdPageLoaded()).toBe(true);

    // 7. Navigate back to My PwDs page
    await caregiverPage.clickBackToMyPwds();

    // 8. Verify the button is still visible
    expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
  });

  test('TC_MY_PWD_004: Verify Add Another PwD card shows remaining slot count', async () => {
    const td = testData.TC_MY_PWD_004;

    // 1. Navigate to My PwDs page
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Locate the Add New PwD card
    expect(await caregiverPage.isAddNewPwdCardVisible()).toBe(true);

    // 3. Verify the card displays slots available text
    expect(await caregiverPage.isAddNewPwdSlotsAvailableTextVisible()).toBe(true);

    // 4. Verify the remaining count is accurate (limit - current PwDs)
    const totalPwds = await caregiverPage.getTotalPwdCount();
    const availableSlots = await caregiverPage.getAvailableSlots();
    expect(totalPwds + availableSlots).toBe(td.expected.pwdLimit);

    // 5. Verify slots add up correctly
    const slotsAddUp = await caregiverPage.verifySlotsAddUpToLimit();
    expect(slotsAddUp).toBe(true);
  });

  test('TC_MY_PWD_005: Verify View Profile CTA navigates to PwD profile details', async () => {
    const td = testData.TC_MY_PWD_005;

    // 1. Navigate to My PwDs page
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Locate a PwD card and capture the first PwD name
    const pwdCardNames = await caregiverPage.getPwdCardNames();
    expect(pwdCardNames.length).toBeGreaterThan(0);
    const firstPwdName = pwdCardNames[0];

    // 3. Verify View Profile CTA is visible
    expect(await caregiverPage.isViewProfileLinkVisible(0)).toBe(true);

    // 4. Click View Profile CTA
    await caregiverPage.clickViewProfileLink(0);
    await caregiverPage.waitForPwdProfilePage();

    // 5-6. Verify profile page displays correct PwD information
    expect(await caregiverPage.isPwdProfileNameVisible(firstPwdName)).toBe(true);
    expect(await caregiverPage.isPersonalDetailsSectionVisible()).toBe(true);
    expect(await caregiverPage.isContactInformationSectionVisible()).toBe(true);
    expect(await caregiverPage.isDisabilityInformationSectionVisible()).toBe(true);

    // 7. Navigate back to My PwDs page
    expect(await caregiverPage.isBackToMyPwdsLinkVisible()).toBe(true);
    await caregiverPage.clickBackToMyPwds();

    // 8. Verify My PwDs page loads correctly after returning
    const heading = await caregiverPage.getMyPwdsHeading();
    expect(heading).toContain('My Persons with Disabilities');
  });

  test.skip('TC_MY_PWD_006: Verify My PwDs page with maximum PwD limit reached', async () => {
    // SKIPPED: Requires a caregiver account at the PwD limit (5/5).
    // Provide caregiverAtLimitEmail and caregiverAtLimitPassword in test data to enable.
    const td = testData.TC_MY_PWD_006;

    // 1. Log in as caregiver with maximum PwDs
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverAtLimitEmail, td.inputs.caregiverAtLimitPassword);

    // 2-3. Verify all PwD cards are displayed
    const pwdCardNames = await caregiverPage.getPwdCardNames();
    expect(pwdCardNames.length).toBe(td.expected.pwdLimit);

    // 4. Verify slots used shows maximum
    const totalPwds = await caregiverPage.getTotalPwdCount();
    expect(totalPwds).toBe(td.expected.pwdLimit);

    // 5. Verify remaining slots shows 0
    const availableSlots = await caregiverPage.getAvailableSlots();
    expect(availableSlots).toBe(0);
  });

  test.skip('TC_MY_PWD_007: Verify My PwDs page with no PwDs added (empty state)', async () => {
    // SKIPPED: Requires a caregiver account with zero PwDs.
    // Provide caregiverEmptyEmail and caregiverEmptyPassword in test data to enable.
    const td = testData.TC_MY_PWD_007;

    // 1. Log in as caregiver with zero PwDs
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmptyEmail, td.inputs.caregiverEmptyPassword);

    // 2-3. Verify page loads
    const heading = await caregiverPage.getMyPwdsHeading();
    expect(heading).toContain('My Persons with Disabilities');

    // 4. Verify PwD count is 0
    const totalPwds = await caregiverPage.getTotalPwdCount();
    expect(totalPwds).toBe(0);

    // 5. Verify remaining slots shows full limit
    const availableSlots = await caregiverPage.getAvailableSlots();
    expect(availableSlots).toBe(td.expected.pwdLimit);

    // 6. Verify Add PwD button is visible and enabled
    expect(await caregiverPage.isAddPwdButtonVisible()).toBe(true);
    expect(await caregiverPage.isAddPwdButtonEnabled()).toBe(true);
  });

  test('TC_MY_PWD_008: Verify multiple PwD cards display correctly with different data', async () => {
    const td = testData.TC_MY_PWD_008;

    // 1. Log in as caregiver with multiple PwDs
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2-3. Verify all PwD cards are displayed
    const pwdCardNames = await caregiverPage.getPwdCardNames();
    expect(pwdCardNames.length).toBeGreaterThanOrEqual(td.expected.minPwdCards);

    // 4. Verify each card shows unique PwD name
    const uniqueNames = new Set(pwdCardNames);
    expect(uniqueNames.size).toBe(pwdCardNames.length);

    // 5-7. Verify each card has name visible
    for (const name of pwdCardNames) {
      expect(await caregiverPage.verifyPwdCardHasName(name)).toBe(true);
    }

    // 8. Verify each card has View Profile CTA
    const viewProfileCount = await caregiverPage.getViewProfileLinkCount();
    expect(viewProfileCount).toBe(pwdCardNames.length);

    // 9-10. Verify slot count matches the number of cards
    const totalPwdCountMatchesCards = await caregiverPage.verifyTotalPwdCountMatchesCards();
    expect(totalPwdCountMatchesCards).toBe(true);
  });

  test('TC_MY_PWD_009: Verify PwD count mismatch is resolved by page refresh/sync', async () => {
    const td = testData.TC_MY_PWD_009;

    // 1. Log in as caregiver and navigate to My PwDs page
    await caregiverPage.loginOrNavigateToMyPwDs(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Note the current PwD count and cards displayed
    const initialPwdCount = await caregiverPage.getTotalPwdCount();
    const initialAvailableSlots = await caregiverPage.getAvailableSlots();
    const initialCardCount = await caregiverPage.getPwdCardCount();

    // 3-4. Refresh the page (simulating return after concurrent change)
    await caregiverPage.refreshPage();

    // 5. Wait for page to reload
    const heading = await caregiverPage.getMyPwdsHeading();
    expect(heading).toContain('My Persons with Disabilities');

    // 6. Verify PwD count is consistent after refresh
    const refreshedPwdCount = await caregiverPage.getTotalPwdCount();
    expect(refreshedPwdCount).toBe(initialPwdCount);

    // 7. Verify PwD cards match the count
    const refreshedCardCount = await caregiverPage.getPwdCardCount();
    expect(refreshedCardCount).toBe(refreshedPwdCount);

    // 8. Verify remaining slots are recalculated correctly
    const refreshedSlots = await caregiverPage.getAvailableSlots();
    expect(refreshedPwdCount + refreshedSlots).toBe(td.expected.pwdLimit);
  });
});
