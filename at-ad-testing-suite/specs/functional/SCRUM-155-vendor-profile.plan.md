# SCRUM-155 Test Plan

## Application Overview

Test plan for validating Assistive Partner profile page including navigation, organization details, contact information, documents, account status, edit functionality, validation, security, and WCAG 2.1 AA compliance.

## Test Scenarios

### 1. Navigation and Page Access

**Seed:** `tests/seed/vendor-login.spec.ts`

#### 1.1. Verify top navigation bar elements

**File:** `tests/functional/verify-navigation-bar.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Observe top navigation bar

**Expected Results:**
  - Dashboard link is visible
  - Help & Resources link is visible
  - Profile link is visible and highlighted when active
  - Logout link is visible

#### 1.2. Navigate to Vendor Profile page

**File:** `tests/functional/navigate-to-profile.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Profile in navigation bar

**Expected Results:**
  - User is redirected to Vendor Profile page
  - Profile link is highlighted
  - Page loads successfully

#### 1.3. Verify authentication requirement

**File:** `tests/functional/profile-authentication-required.spec.ts`

**Steps:**
  1. Logout from portal
  2. Attempt to access profile page directly via URL

**Expected Results:**
  - Unauthenticated users are redirected to login page
  - Profile page is not accessible without valid session
  - Security is enforced

### 2. Page Structure and Header

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 2.1. Verify page title and subtitle

**File:** `tests/functional/verify-page-header.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Locate page title and subtitle

**Expected Results:**
  - Page title displays: "Vendor Profile"
  - Subtitle displays: "Manage your organization details and account information"
  - Header is clearly visible

#### 2.2. Verify Edit Profile button

**File:** `tests/functional/verify-edit-profile-button.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Locate Edit Profile button

**Expected Results:**
  - Edit Profile button appears on top-right
  - Button is functional and clickable
  - Button is clearly labeled

### 3. Organization Card

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 3.1. Verify organization card elements

**File:** `tests/functional/verify-organization-card.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Locate left profile panel

**Expected Results:**
  - Organization image/logo is displayed
  - Organization name is visible (read-only)
  - Organization type is visible (read-only)
  - All elements are properly formatted

#### 3.2. Verify default placeholder image

**File:** `tests/functional/verify-placeholder-image.spec.ts`

**Steps:**
  1. Login as Assistive Partner without logo
  2. Navigate to Vendor Profile page
  3. Check organization image

**Expected Results:**
  - Default placeholder image appears
  - Placeholder is appropriate and professional
  - No broken image icon

### 4. Account Status Section

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 4.1. Verify account status display

**File:** `tests/functional/verify-account-status.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Locate Account Status card

**Expected Results:**
  - Status badge displays (Active/Inactive)
  - Verification status displays with icon (Verified/Pending)
  - Member Since date is shown
  - All data is fetched from backend

#### 4.2. Verify status badge colors

**File:** `tests/functional/verify-status-badge-colors.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Check status badge colors

**Expected Results:**
  - Green badge for Active status
  - Blue badge for Verified status
  - Colors follow UI theme
  - Badges are clearly visible

### 5. Documents Section

**Seed:** `tests/seed/vendor-profile-documents.spec.ts`

#### 5.1. Verify documents list display

**File:** `tests/functional/verify-documents-list.spec.ts`

**Steps:**
  1. Login as Assistive Partner with uploaded documents
  2. Navigate to Vendor Profile page
  3. Locate Documents section

**Expected Results:**
  - Document name is displayed
  - Issue/Upload date is shown
  - Document type icon is visible
  - All uploaded documents are listed

#### 5.2. Preview document in new tab

**File:** `tests/functional/preview-document.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Click preview (eye icon) on document

**Expected Results:**
  - Document opens in new tab
  - PDF/Image displays correctly
  - Original page remains open

#### 5.3. Verify empty state message

**File:** `tests/functional/documents-empty-state.spec.ts`

**Steps:**
  1. Login as Assistive Partner without documents
  2. Navigate to Vendor Profile page
  3. Check Documents section

**Expected Results:**
  - Empty state message displays
  - Message states: "No documents uploaded yet."
  - Message is clearly visible

### 6. Organization Details Section

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 6.1. Verify organization details fields

**File:** `tests/functional/verify-organization-details.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Locate Organization Details section

**Expected Results:**
  - Organization Name field is visible (read-only)
  - Organization Type field is visible (read-only)
  - Organization Description field is visible (read-only)
  - GST Number field is visible (read-only)
  - PAN Number field is visible (read-only)

#### 6.2. Verify mandatory field indicators

**File:** `tests/functional/verify-mandatory-indicators.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Check field labels

**Expected Results:**
  - Mandatory fields show red * indicator
  - Indicators are clearly visible
  - UI follows consistent styling

### 7. Contact Information Section

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 7.1. Verify contact information fields

**File:** `tests/functional/verify-contact-information.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Locate Contact Information section

**Expected Results:**
  - Contact Person Name is displayed
  - Email Address is displayed
  - Phone Number is displayed
  - Website is displayed as clickable link
  - Address is displayed
  - Social Media Links are displayed

#### 7.2. Verify website link opens in new tab

**File:** `tests/functional/website-link-new-tab.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Click website link

**Expected Results:**
  - Website opens in new tab
  - Link is functional
  - Original page remains open

#### 7.3. Verify social media links

**File:** `tests/functional/verify-social-media-links.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Check social media links

**Expected Results:**
  - Social media links have appropriate icons
  - Links open in new tab
  - Icons are clearly visible
  - All platforms are supported

### 8. Edit Profile Functionality

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 8.1. Switch to editable mode

**File:** `tests/functional/switch-to-editable-mode.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Click Edit Profile button

**Expected Results:**
  - Organization Details fields become editable
  - Contact Information fields become editable
  - Document section remains non-editable
  - Save and Cancel buttons appear

#### 8.2. Verify editable mode elements

**File:** `tests/functional/verify-editable-mode.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Check form elements

**Expected Results:**
  - Input fields have correct labels
  - Required field indicators are shown
  - Save button is visible
  - Cancel button is visible

#### 8.3. Cancel editing and revert changes

**File:** `tests/functional/cancel-editing.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Modify some fields
  4. Click Cancel

**Expected Results:**
  - All fields revert to last saved values
  - User returns to read-only mode
  - No changes are saved
  - Form state is restored

#### 8.4. Save profile changes successfully

**File:** `tests/functional/save-profile-changes.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Update valid information
  4. Click Save

**Expected Results:**
  - Success toast message appears
  - Fields return to read-only mode
  - Updated values are displayed
  - Changes are persisted

### 9. Data Validation

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 9.1. Validate mandatory fields

**File:** `tests/functional/validate-mandatory-fields.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Clear mandatory field
  4. Attempt to save

**Expected Results:**
  - Validation error appears
  - Error message indicates field is required
  - Form does not submit
  - Field is highlighted

#### 9.2. Validate email format

**File:** `tests/functional/validate-email-format.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Enter invalid email format
  4. Attempt to save

**Expected Results:**
  - Validation error appears
  - Error indicates invalid email format
  - Form does not submit
  - Field is highlighted

#### 9.3. Validate phone number format

**File:** `tests/functional/validate-phone-format.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Enter invalid phone number
  4. Attempt to save

**Expected Results:**
  - Validation error appears
  - Error indicates phone must be numeric
  - Country code format is enforced
  - Form does not submit

#### 9.4. Validate website URL format

**File:** `tests/functional/validate-website-url.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Enter website without http(s)://
  4. Attempt to save

**Expected Results:**
  - Validation error appears
  - Error indicates URL must start with http(s)://
  - Form does not submit
  - Field is highlighted

#### 9.5. Validate social media URLs

**File:** `tests/functional/validate-social-urls.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Enter invalid social media URL
  4. Attempt to save

**Expected Results:**
  - Validation error appears
  - Error indicates invalid URL format
  - Form does not submit
  - Field is highlighted

### 10. UI Consistency and Design

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 10.1. Verify card layout consistency

**File:** `tests/functional/verify-card-layout.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Inspect all cards

**Expected Results:**
  - All cards follow rounded card layout
  - Spacing is consistent
  - Layout matches design specifications
  - Cards are properly aligned

#### 10.2. Verify icon theme consistency

**File:** `tests/functional/verify-icon-theme.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Check all icons

**Expected Results:**
  - Icons match theme (solid line icons)
  - Icon style is consistent
  - Icons are clearly visible
  - Appropriate icons for each element

#### 10.3. Verify input field styling

**File:** `tests/functional/verify-input-styling.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Inspect input fields

**Expected Results:**
  - Grey border on input fields
  - Clear placeholder text
  - Required * indicator present
  - Styling is consistent

#### 10.4. Verify read-only field styling

**File:** `tests/functional/verify-readonly-styling.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Check read-only fields

**Expected Results:**
  - Read-only fields show disabled state styling
  - Visual distinction from editable fields
  - Styling is consistent
  - Fields are clearly marked

#### 10.5. Verify responsive layout

**File:** `tests/functional/verify-responsive-layout.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Resize browser to desktop and tablet sizes

**Expected Results:**
  - Layout is responsive for desktop
  - Layout is responsive for tablet
  - Elements adjust appropriately
  - No layout breaks or overlaps

### 11. Security and Permissions

**Seed:** `tests/seed/vendor-profile-security.spec.ts`

#### 11.1. Verify user can only edit own profile

**File:** `tests/functional/edit-own-profile-only.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to profile page
  3. Verify profile data matches logged-in user

**Expected Results:**
  - User can only edit their own profile data
  - Profile data belongs to logged-in user
  - No access to other profiles

#### 11.2. Block access to other vendor profiles

**File:** `tests/functional/block-other-vendor-access.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Attempt to access another vendor's profile by changing URL/ID
  3. Observe response

**Expected Results:**
  - Access is blocked
  - Error message or redirect occurs
  - Security is enforced
  - No unauthorized access

#### 11.3. Verify audit logging

**File:** `tests/functional/verify-audit-logging.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Edit and save profile changes
  3. Login as admin
  4. Check audit logs

**Expected Results:**
  - All changes are audit-logged
  - Log includes timestamp
  - Log includes user ID
  - Changes are traceable

### 12. Accessibility Standards

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 12.1. Verify keyboard navigation

**File:** `tests/functional/profile-keyboard-navigation.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Use Tab key to navigate all elements
  4. Use Enter/Space to activate controls

**Expected Results:**
  - Page is fully navigable via keyboard
  - Tab order is logical
  - All interactive elements are accessible
  - Focus indicators are visible

#### 12.2. Verify screen reader compatibility

**File:** `tests/functional/profile-screen-reader.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Use screen reader to navigate
  4. Test all sections and fields

**Expected Results:**
  - Field labels are screen-reader friendly
  - Status indicators are announced
  - All content is accessible
  - ARIA labels are present

#### 12.3. Verify color contrast

**File:** `tests/functional/profile-color-contrast.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Check color contrast ratios

**Expected Results:**
  - Color contrast meets WCAG 2.1 AA
  - Status badges have clear contrast
  - Text is readable
  - Visual elements are distinguishable

#### 12.4. Verify text size adjustability

**File:** `tests/functional/profile-text-adjustable.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Navigate to Vendor Profile page
  3. Adjust browser text size
  4. Check layout and readability

**Expected Results:**
  - Text size is adjustable
  - Layout remains functional
  - Readability is maintained
  - No content is cut off

### 13. Error Handling

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 13.1. Handle save failure due to connectivity

**File:** `tests/functional/handle-save-failure.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Make changes
  4. Simulate connectivity issue
  5. Attempt to save

**Expected Results:**
  - Error message appears
  - Message states: "We couldn't submit your request right now. Please check your connection and try again."
  - User can retry
  - Data is not lost

#### 13.2. Auto-save draft on failure

**File:** `tests/functional/auto-save-draft.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Click Edit Profile
  3. Make changes
  4. Simulate save failure
  5. Refresh page

**Expected Results:**
  - Partially completed changes are auto-saved as draft
  - Draft can be resumed later
  - No data loss occurs
  - User is notified

### 14. Data Privacy

**Seed:** `tests/seed/vendor-profile.spec.ts`

#### 14.1. Verify no external data sharing

**File:** `tests/functional/no-external-sharing.spec.ts`

**Steps:**
  1. Login as Assistive Partner
  2. Update profile information
  3. Monitor network requests

**Expected Results:**
  - No personal information shared outside portal
  - All communication remains internal
  - Data privacy is maintained
  - Secure transmission
