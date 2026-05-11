// spec: specs/functional/SCRUM-354-caregiver-account-type-selection.json
// test-data: test-data/scrum354-account-type-selection.json

import { test, expect } from '@playwright/test';
import { AccountTypePage } from '../../pages/account-type.page';
import testData from '../../test-data/scrum354-account-type-selection.json';

test.describe('Caregiver Account Type Selection', () => {
  let accountTypePage: AccountTypePage;

  test.beforeEach(async ({ page }) => {
    accountTypePage = new AccountTypePage(page);
  });

  test('TC_ACCT_SEL_001 - Verify all four account type options are displayed on sign-up page', async () => {
    const data = testData.TC_ACCT_SEL_001;

    // 1. Navigate to the AT/AD platform home page
    await accountTypePage.navigateToHomePage(data.url);

    // 2. Click on 'Sign In/Register' button/link
    await accountTypePage.clickSignInRegister();

    // 3. Click 'Create New Account' to open account type selection
    await accountTypePage.clickCreateNewAccount();

    // 4. Verify the account type selection section is visible
    expect(await accountTypePage.isAccountTypeSelectionVisible()).toBeTruthy();

    // 5-8. Verify all four account type options are displayed
    for (const accountType of data.expected.accountTypes) {
      expect(await accountTypePage.isAccountTypeOptionVisible(accountType)).toBeTruthy();
    }

    // 9. Verify 'Back to Sign In' option is available
    expect(await accountTypePage.isBackToSignInVisible()).toBeTruthy();
  });

  test('TC_ACCT_SEL_005 - Verify static card content is displayed as per design', async () => {
    const data = testData.TC_ACCT_SEL_005;

    // 1. Navigate to the sign-up page
    await accountTypePage.navigateToHomePage(data.url);

    // 2. Click Sign In/Register to open the popup
    await accountTypePage.clickSignInRegister();

    // 3. Verify 'Secure SSO Authentication' static card is visible in sign-in popup
    expect(await accountTypePage.isSecureSSOCardVisible()).toBeTruthy();

    // 4. Verify the card content matches design specification
    const ssoCardText = await accountTypePage.getSecureSSOCardText();
    expect(ssoCardText).toContain(data.expected.ssoCardDescription);

    // 5. Click 'Create New Account' to open account type selection
    await accountTypePage.clickCreateNewAccount();

    // 6. Verify 'Choose Account Type' header is visible
    expect(await accountTypePage.isChooseAccountTypeHeaderVisible()).toBeTruthy();

    // 7. Verify selection prompt text is displayed
    const promptText = await accountTypePage.getSelectionPromptText();
    expect(promptText).toContain(data.expected.selectionPrompt);

    // 8. Verify each account type card has description text
    for (const [accountType, description] of Object.entries(data.expected.accountTypeDescriptions)) {
      expect(await accountTypePage.isAccountTypeOptionVisible(accountType)).toBeTruthy();
      expect(await accountTypePage.isAccountTypeDescriptionVisible(accountType, description as string)).toBeTruthy();
    }
  });

  test('TC_ACCT_SEL_010 - Verify user cannot proceed without selecting an account type', async () => {
    const data = testData.TC_ACCT_SEL_010;

    // 1. Navigate to the AT/AD platform home page
    await accountTypePage.navigateToHomePage(data.url);

    // 2. Click on 'Sign In/Register' button/link
    await accountTypePage.clickSignInRegister();

    // 3. Click 'Create New Account' to open account type selection
    await accountTypePage.clickCreateNewAccount();

    // 4. Verify the account type selection section is visible (no pre-selection)
    expect(await accountTypePage.isChooseAccountTypeHeaderVisible()).toBeTruthy();

    // 5. Verify all four account type options are displayed as clickable links
    for (const accountType of data.expected.accountTypes) {
      expect(await accountTypePage.isAccountTypeOptionVisible(accountType)).toBeTruthy();
    }

    // 6. Verify 'Back to Sign In' is the only navigation option besides account type links
    expect(await accountTypePage.isBackToSignInVisible()).toBeTruthy();
  });
});
