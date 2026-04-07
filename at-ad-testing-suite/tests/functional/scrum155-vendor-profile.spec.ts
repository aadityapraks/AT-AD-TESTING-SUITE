// spec: specs/functional/SCRUM-155-vendor-profile.plan.md
// seed: tests/seed/vendor-login.seed.ts

import { test, expect } from '@playwright/test';
import { VendorProfilePage } from '../../pages/vendor-profile.page';
import { vendorLogin } from '../seed/vendor-login.seed';
import testData from '../../test-data/scrum155-functional.json';

test.describe('1. Navigation and Page Access', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
  });

  test('TC_NAV_001: Verify top navigation bar elements', async ({ page }) => {
    // Navigate to Vendor Profile page
    await vendorProfilePage.navigateToProfile();

    // Verify Dashboard link is visible
    await expect(vendorProfilePage.dashboardBtn).toBeVisible();

    // Verify Help & Resources link is visible
    await expect(vendorProfilePage.helpResourcesBtn).toBeVisible();

    // Verify Profile link is visible and highlighted when active
    await expect(vendorProfilePage.profileBtn).toBeVisible();
    await expect(vendorProfilePage.profileBtn).toHaveAttribute('class', /active/);

    // Verify Logout link is visible
    await expect(vendorProfilePage.logoutBtn).toBeVisible();
  });

  test('TC_NAV_002: Navigate to vendor profile page via nav click', async ({ page }) => {
    // Click Profile in navigation bar
    await vendorProfilePage.navigateToProfile();

    // Verify user is redirected to Vendor Profile page
    await expect(page).toHaveURL(testData.profileUrl);

    // Verify Profile link is highlighted/active
    await expect(vendorProfilePage.profileBtn).toHaveAttribute('class', /active/);

    // Verify page loads successfully with heading
    await expect(vendorProfilePage.pageHeading).toBeVisible();
  });
});

test.describe('1. Navigation and Page Access (unauthenticated)', () => {
  test.setTimeout(30000);

  test('TC_NAV_003: Verify authentication requirement', async ({ page }) => {
    const vendorProfilePage = new VendorProfilePage(page);

    // Attempt to access profile page directly via URL without any session
    await page.goto(testData.profileUrl);

    // Verify unauthenticated users are redirected to login page
    // Verify profile page is not accessible without valid session
    await vendorProfilePage.verifyRedirectedToLogin();
  });
});

test.describe('2. Page Structure and Header', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_PAGE_001: Verify page title and subtitle', async ({ page }) => {
    // Locate page title and verify it displays correctly
    await expect(vendorProfilePage.pageHeading).toBeVisible();
    await expect(vendorProfilePage.pageHeading).toHaveText(testData.expected.pageHeading);

    // Verify subtitle displays correctly
    await expect(vendorProfilePage.pageSubheading).toBeVisible();
    await expect(vendorProfilePage.pageSubheading).toHaveText(testData.expected.pageSubheading);
  });

  test('TC_PAGE_002: Verify Edit Profile button visible on page', async ({ page }) => {
    // Verify Edit Profile button appears and is clickable
    await expect(vendorProfilePage.editProfileBtn).toBeVisible();
    await expect(vendorProfilePage.editProfileBtn).toBeEnabled();
  });
});

test.describe('3. Organization Card', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_ORG_001: Verify organization card elements', async ({ page }) => {
    // Verify organization logo is displayed
    await expect(vendorProfilePage.orgLogo).toBeVisible();

    // Verify organization name is visible and read-only
    await expect(vendorProfilePage.orgName).toBeVisible();

    // Verify organization type is visible and read-only
    await expect(vendorProfilePage.orgType).toBeVisible();
  });
});

test.describe('4. Account Status Section', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_STATUS_001: Verify account status display', async ({ page }) => {
    // Locate Account Status card and verify heading
    await expect(vendorProfilePage.accountStatusHeading).toBeVisible();
    await expect(vendorProfilePage.accountStatusHeading).toHaveText(testData.expected.accountStatus.heading);

    // Verify status badge is displayed
    await expect(vendorProfilePage.accountStatusBadge).toBeVisible();

    // Verify verification status is displayed
    await expect(vendorProfilePage.accountVerificationBadge).toBeVisible();

    // Verify Member Since label and date are displayed
    await expect(vendorProfilePage.memberSinceLabel).toBeVisible();
    await expect(vendorProfilePage.memberSinceValue).toBeVisible();
  });

  test('TC_STATUS_002: Verify status badge colors and visibility', async ({ page }) => {
    // Verify status and verification badges are clearly visible
    await vendorProfilePage.verifyAccountStatusColors();

    // Verify Member Since date is present
    await expect(vendorProfilePage.memberSinceValue).toBeVisible();
  });
});

test.describe('5. Documents Section', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_DOC_003: Verify empty state message when no documents uploaded', async ({ page }) => {
    // Locate Documents section heading
    await expect(vendorProfilePage.documentsHeading).toBeVisible();
    await expect(vendorProfilePage.documentsHeading).toHaveText(testData.expected.documents.heading);

    // Verify documents section is visible with no documents for this account
    await vendorProfilePage.verifyDocumentsEmptyState();
  });
});

test.describe('6. Organization Details Section', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_ORGDET_001: Verify organization details fields visible in read-only', async ({ page }) => {
    // Verify Organization Details heading
    await expect(vendorProfilePage.orgDetailsHeading).toBeVisible();

    // Verify all fields are visible in read-only mode
    await expect(vendorProfilePage.orgNameLabel).toBeVisible();
    await expect(vendorProfilePage.orgTypeLabel).toBeVisible();
    await expect(vendorProfilePage.orgDescriptionLabel).toBeVisible();
    await expect(vendorProfilePage.gstNumberLabel).toBeVisible();
    await expect(vendorProfilePage.panNumberLabel).toBeVisible();

    // Verify fields are not editable (no textbox visible)
    await expect(vendorProfilePage.orgNameInput).not.toBeVisible();
    await expect(vendorProfilePage.orgDescriptionInput).not.toBeVisible();
  });

  test('TC_ORGDET_002: Verify mandatory field indicators', async ({ page }) => {
    // Verify Organization Details heading is visible
    await expect(vendorProfilePage.orgDetailsHeading).toBeVisible();
    await expect(vendorProfilePage.orgDetailsHeading).toHaveText(testData.expected.orgDetails.heading);

    // Verify mandatory fields show * indicator
    await vendorProfilePage.verifyOrgDetailsMandatoryIndicators();

    // Verify optional fields do not have * indicator
    await expect(vendorProfilePage.gstNumberLabel).toBeVisible();
    await expect(vendorProfilePage.panNumberLabel).toBeVisible();
  });
});

test.describe('7. Contact Information Section', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_CONTACT_001: Verify contact information fields', async ({ page }) => {
    // Verify Contact Information heading is visible
    await expect(vendorProfilePage.contactInfoHeading).toBeVisible();
    await expect(vendorProfilePage.contactInfoHeading).toHaveText(testData.expected.contactInfo.heading);

    // Verify all contact fields are displayed with their labels and values
    await vendorProfilePage.verifyContactInfoFields();
  });

  test('TC_CONTACT_003: Verify social media links section', async ({ page }) => {
    // Verify Social Media Links label is visible
    await expect(vendorProfilePage.socialMediaLabel).toBeVisible();
    await expect(vendorProfilePage.socialMediaLabel).toHaveText(testData.expected.contactInfo.socialMediaLabel);

    // Verify social media value container with icon is visible
    await vendorProfilePage.verifySocialMediaLinks();
  });
});

test.describe('8. Edit Profile Functionality', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_EDIT_001: Switch to editable mode', async ({ page }) => {
    // Click Edit Profile button
    await vendorProfilePage.editProfileBtn.click();

    // Verify Organization Details and Contact Information fields become editable
    // Verify Save Changes and Cancel buttons appear, Edit Profile button is gone
    await vendorProfilePage.verifyEditMode();
  });

  test('TC_EDIT_002: Verify editable mode elements and labels', async ({ page }) => {
    // Click Edit Profile to enter edit mode
    await vendorProfilePage.editProfileBtn.click();

    // Verify all input fields, labels, Save and Cancel buttons are visible
    await vendorProfilePage.verifyEditModeElements();
  });

  test('TC_EDIT_003: Cancel editing and revert changes', async ({ page }) => {
    // Click Edit Profile to enter edit mode
    await vendorProfilePage.editProfileBtn.click();
    await vendorProfilePage.verifyEditMode();

    // Modify organization description
    await vendorProfilePage.orgDescriptionInput.clear();
    await vendorProfilePage.orgDescriptionInput.fill('modified value that should be reverted');

    // Click Cancel and verify fields revert to original values
    await vendorProfilePage.cancelEditAndVerifyReverted(testData.expected.editMode.orgDescriptionOriginal);
  });

  test('TC_EDIT_004: Save profile changes successfully', async ({ page }) => {
    // Click Edit Profile button to enter edit mode
    await vendorProfilePage.editProfileBtn.click();
    await vendorProfilePage.verifyEditMode();

    // Update Organization Description with new valid value
    await vendorProfilePage.orgDescriptionInput.clear();
    await vendorProfilePage.orgDescriptionInput.fill(testData.expected.editMode.orgDescriptionUpdated);

    // Click Save Changes and capture the success alert message
    const alertMessage = await vendorProfilePage.saveProfileChanges(page);

    // Verify success alert message
    expect(alertMessage).toBe(testData.expected.editMode.successAlertMessage);

    // Verify page returns to read-only mode
    await vendorProfilePage.verifyReadOnlyMode();

    // Verify updated value is displayed in read-only view
    await expect(vendorProfilePage.orgDescriptionValue).toHaveText(testData.expected.editMode.orgDescriptionUpdated);

    // Revert description back to original value to keep test data clean
    await vendorProfilePage.editProfileBtn.click();
    await vendorProfilePage.orgDescriptionInput.clear();
    await vendorProfilePage.orgDescriptionInput.fill(testData.expected.editMode.orgDescriptionOriginal);
    await vendorProfilePage.saveProfileChanges(page);
  });
});

test.describe('9. Data Validation', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
    await vendorProfilePage.editProfileBtn.click();
    await vendorProfilePage.verifyEditMode();
  });

  test('TC_VAL_001: Validate mandatory fields - empty org name shows alert', async ({ page }) => {
    // Clear a mandatory field (Organization Name)
    await vendorProfilePage.orgNameInput.clear();

    // Attempt to save and capture validation alert
    const alertMessage = await vendorProfilePage.triggerValidationAlert(page);

    // Verify validation alert message
    expect(alertMessage).toBe(testData.expected.editMode.validationAlertMessage);

    // Verify form remains in edit mode (Cancel button still visible)
    await expect(vendorProfilePage.cancelBtn).toBeVisible();

    // Restore org name and cancel
    await vendorProfilePage.orgNameInput.fill('vendor23');
    await vendorProfilePage.cancelBtn.click();
  });

  test('TC_VAL_002: Validate email format - invalid email shows alert', async ({ page }) => {
    // Enter invalid email format
    await vendorProfilePage.emailAddressInput.clear();
    await vendorProfilePage.emailAddressInput.fill(testData.expected.editMode.invalidEmail);

    // Attempt to save and capture validation alert
    const alertMessage = await vendorProfilePage.triggerValidationAlert(page);

    // Verify validation alert message
    expect(alertMessage).toBe(testData.expected.editMode.validationAlertMessage);

    // Verify form remains in edit mode
    await expect(vendorProfilePage.cancelBtn).toBeVisible();

    // Restore valid email and cancel
    await vendorProfilePage.emailAddressInput.fill(testData.credentials.email);
    await vendorProfilePage.cancelBtn.click();
  });

  test('TC_VAL_003: Validate phone number - non-numeric phone shows alert', async ({ page }) => {
    // Enter invalid phone number (non-numeric)
    await vendorProfilePage.phoneNumberInput.clear();
    await vendorProfilePage.phoneNumberInput.fill(testData.expected.editMode.invalidPhone);

    // Attempt to save and capture validation alert
    const alertMessage = await vendorProfilePage.triggerValidationAlert(page);

    // Verify validation alert message
    expect(alertMessage).toBe(testData.expected.editMode.validationAlertMessage);

    // Verify form remains in edit mode
    await expect(vendorProfilePage.cancelBtn).toBeVisible();

    // Restore valid phone and cancel
    await vendorProfilePage.phoneNumberInput.fill('7284892292');
    await vendorProfilePage.cancelBtn.click();
  });
});

test.describe('10. UI Consistency and Design', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_UI_001: Verify card layout consistency', async ({ page }) => {
    // Verify all section cards are visible and properly structured
    await vendorProfilePage.verifyCardLayout();
  });

  test('TC_UI_002: Verify icon theme consistency', async ({ page }) => {
    // Verify icons are present throughout the page
    await vendorProfilePage.verifyIconsVisible();
  });

  test('TC_UI_003: Verify input field styling in edit mode', async ({ page }) => {
    // Enter edit mode
    await vendorProfilePage.editProfileBtn.click();
    await vendorProfilePage.verifyEditMode();

    // Verify all input fields are visible and styled
    await vendorProfilePage.verifyEditModeInputStyling();

    // Exit edit mode
    await vendorProfilePage.cancelBtn.click();
  });

  test('TC_UI_004: Verify read-only field styling', async ({ page }) => {
    // Check read-only fields show disabled state styling (light grey background + border)
    await vendorProfilePage.verifyReadOnlyFieldStyling();
  });

  test('TC_UI_005: Verify responsive layout on mobile and tablet', async ({ page }) => {
    // Verify layout on mobile viewport
    await vendorProfilePage.verifyResponsiveLayout(
      testData.expected.uiConsistency.mobileViewport.width,
      testData.expected.uiConsistency.mobileViewport.height
    );

    // Verify layout on tablet viewport
    await vendorProfilePage.verifyResponsiveLayout(
      testData.expected.uiConsistency.tabletViewport.width,
      testData.expected.uiConsistency.tabletViewport.height
    );
  });
});

test.describe('11. Security and Permissions', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_SEC_001: Verify user can only view and edit own profile data', async ({ page }) => {
    // Verify the profile data displayed belongs to the logged-in user
    await vendorProfilePage.verifyOwnProfileData(testData.expected.security.ownProfileEmail);
  });
});

test.describe('12. Accessibility Standards', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_A11Y_001: Verify keyboard navigation on profile page', async ({ page }) => {
    // Tab through interactive elements and verify focus is reachable
    await vendorProfilePage.verifyKeyboardNavigation();

    // Verify Edit Profile button is keyboard accessible
    await vendorProfilePage.editProfileBtn.focus();
    await expect(vendorProfilePage.editProfileBtn).toBeFocused();
  });

  test('TC_A11Y_002: Verify page has proper landmarks for screen readers', async ({ page }) => {
    // Verify navigation landmark is present
    await vendorProfilePage.verifyPageLandmarks();

    // Verify page heading is present
    await expect(vendorProfilePage.pageHeading).toBeVisible();
  });

  test('TC_A11Y_003: Verify images have alt text', async ({ page }) => {
    // Verify organization logo has alt text
    await expect(vendorProfilePage.orgLogo).toHaveAttribute('alt', testData.expected.orgCard.logoAltText);
  });

  test('TC_A11Y_004: Verify text size adjustability at 200% zoom', async ({ page }) => {
    // Apply 200% zoom via CSS
    await page.evaluate(() => { document.body.style.zoom = '2.0'; });

    // Verify key content remains visible after zoom
    await expect(vendorProfilePage.pageHeading).toBeVisible();
    await expect(vendorProfilePage.editProfileBtn).toBeVisible();
    await expect(vendorProfilePage.orgDetailsHeading).toBeVisible();
  });
});

test.describe('14. Data Privacy', () => {
  test.setTimeout(60000);

  let vendorProfilePage: VendorProfilePage;

  test.beforeEach(async ({ page }) => {
    vendorProfilePage = new VendorProfilePage(page);
    await vendorLogin(page, testData.baseUrl, testData.credentials.email, testData.credentials.password);
    await vendorProfilePage.navigateToProfile();
  });

  test('TC_PRIV_001: Verify profile data is only sent to internal endpoints', async ({ page }) => {
    // Monitor network requests during profile save
    const requests: string[] = [];
    page.on('request', req => requests.push(req.url()));

    // Enter edit mode and save without changes
    await vendorProfilePage.editProfileBtn.click();
    await vendorProfilePage.saveProfileChanges(page);

    // Verify all requests go to the internal domain only
    const externalRequests = requests.filter(
      url => !url.includes('swarajability.org')
    );
    expect(externalRequests.length).toBe(0);
  });
});
