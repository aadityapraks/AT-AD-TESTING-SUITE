# SCRUM-26 Test Plan

## Application Overview

Test plan for validating external link functionality (Amazon, Flipkart, Website) for Assistive Partners to add to product listings with proper validation, display, admin review, and WCAG 2.1 AA accessibility compliance.

## Test Scenarios

### 1. Add Link Form Controls

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 1.1. Verify Add Link button and dropdown options

**File:** `tests/functional/add-link-button.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Locate Additional Information section
  4. Click Add Link button

**Expected Results:**
  - Additional Information section is visible
  - Add Link button is present and clickable
  - Dropdown displays: Amazon Purchase Link, Flipkart Purchase Link, Official Website Link, Other Link (Up to 3)

#### 1.2. Add Amazon Purchase Link field

**File:** `tests/functional/add-amazon-link.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Click Add Link button
  4. Select Amazon Purchase Link (URL)

**Expected Results:**
  - Input field appears for Amazon link
  - Field is optional (not mandatory)
  - Field is visible only to vendors

#### 1.3. Add multiple link types

**File:** `tests/functional/add-multiple-links.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add Amazon Purchase Link
  4. Add Flipkart Purchase Link
  5. Add Official Website Link
  6. Add Other Link with name and URL

**Expected Results:**
  - All link types can be added simultaneously
  - Up to 3 Other Links can be added
  - Each link type shows appropriate input fields

### 2. URL Validation

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 2.1. Validate invalid URL format

**File:** `tests/functional/validate-invalid-url.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add Amazon Purchase Link
  4. Enter invalid URL: 'invalid-url'
  5. Attempt to save form

**Expected Results:**
  - Inline error message appears: 'Please enter a valid URL.'
  - Form does not submit
  - Field is highlighted with error state

#### 2.2. Validate URL protocol requirement

**File:** `tests/functional/validate-url-protocol.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add Official Website Link
  4. Enter URL without protocol: 'example.com'
  5. Attempt to save form

**Expected Results:**
  - Inline error message appears
  - Error indicates URL must start with http:// or https://
  - Form does not submit

#### 2.3. Validate Amazon domain requirement

**File:** `tests/functional/validate-amazon-domain.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add Amazon Purchase Link
  4. Enter non-Amazon URL: 'https://example.com/product'
  5. Attempt to save form

**Expected Results:**
  - Inline error message appears
  - Error indicates Amazon domain required (must contain 'amazon.')
  - Form does not submit

#### 2.4. Validate Flipkart domain requirement

**File:** `tests/functional/validate-flipkart-domain.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add Flipkart Purchase Link
  4. Enter non-Flipkart URL: 'https://example.com/product'
  5. Attempt to save form

**Expected Results:**
  - Inline error message appears
  - Error indicates Flipkart domain required (must contain 'flipkart.')
  - Form does not submit

#### 2.5. Accept valid Amazon URL

**File:** `tests/functional/valid-amazon-url.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add Amazon Purchase Link
  4. Enter valid URL: 'https://www.amazon.in/product/B08XYZ123'
  5. Save form

**Expected Results:**
  - No error message appears
  - Link is saved successfully
  - Product status updates appropriately

### 3. PwD Product Details Display

**Seed:** `tests/seed/approved-product-with-links.spec.ts`

#### 3.1. Display Contact Assistive Partner section

**File:** `tests/functional/display-contact-section.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to approved product with external links
  3. Scroll to Contact Assistive Partner section

**Expected Results:**
  - Section title reads: 'Contact Assistive Partner'
  - Section is visible to PwD users
  - All submitted links are displayed

#### 3.2. Display Amazon link with proper labeling

**File:** `tests/functional/display-amazon-link.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to approved product with Amazon link
  3. Locate Buy on Amazon link

**Expected Results:**
  - Link is labeled 'Buy on Amazon'
  - External link icon is visible
  - Tooltip indicates external website

#### 3.3. Verify link opens in new tab

**File:** `tests/functional/link-new-tab.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to approved product with Amazon link
  3. Click Buy on Amazon link

**Expected Results:**
  - Link opens in new browser tab
  - Original page remains open
  - New tab displays Amazon product page

### 4. Accessibility Compliance

**Seed:** `tests/seed/approved-product-with-links.spec.ts`

#### 4.1. Verify ARIA labels for screen readers

**File:** `tests/functional/aria-labels.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to approved product with external links
  3. Inspect Amazon link attributes

**Expected Results:**
  - ARIA label present: 'Opens in new tab – Amazon link'
  - Link has target='_blank' attribute
  - Link has rel='noopener noreferrer' for security

#### 4.2. Verify keyboard navigation support

**File:** `tests/functional/keyboard-navigation.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to product with external links
  3. Use Tab key to navigate through links
  4. Press Enter on focused link

**Expected Results:**
  - All links are reachable via keyboard
  - Tab order is logical
  - Focus indicators are visible
  - Enter key activates link

#### 4.3. Verify external link confirmation

**File:** `tests/functional/external-link-confirmation.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to product with external links
  3. Click on any external link

**Expected Results:**
  - Confirmation message may appear: 'You are leaving the Y4J Portal. Continue?'
  - User can confirm or cancel navigation
  - Canceling keeps user on current page

### 5. Admin Review and Approval

**Seed:** `tests/seed/admin-product-review.spec.ts`

#### 5.1. Admin views submitted external links

**File:** `tests/functional/admin-view-links.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to product pending review with external links
  3. View product details in review interface

**Expected Results:**
  - All submitted links are visible to admin
  - Links are displayed with labels
  - Admin can click to verify links

#### 5.2. Admin edits invalid link

**File:** `tests/functional/admin-edit-link.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to product with invalid link
  3. Edit the link to correct URL
  4. Save changes and approve product

**Expected Results:**
  - Admin can edit link successfully
  - Updated link is saved
  - Product can be approved with corrected link

#### 5.3. Admin removes inappropriate link

**File:** `tests/functional/admin-remove-link.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to product with inappropriate link
  3. Remove the link
  4. Approve product

**Expected Results:**
  - Link is removed completely
  - Product is approved without removed link
  - Removal is logged in audit trail

### 6. Edit and Update Links

**Seed:** `tests/seed/vendor-edit-product.spec.ts`

#### 6.1. AP updates Amazon link

**File:** `tests/functional/update-amazon-link.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to published product
  3. Click Edit Product
  4. Update Amazon Purchase Link
  5. Save changes

**Expected Results:**
  - Link is updated successfully
  - Product status changes to 'Pending Review'
  - Update is logged in audit trail

#### 6.2. Updated links go live after approval

**File:** `tests/functional/updated-links-live.spec.ts`

**Steps:**
  1. AP updates links (product in Pending Review)
  2. Admin reviews and approves product
  3. PwD user views product details

**Expected Results:**
  - Updated links are visible on product page
  - Links are functional
  - Old links are replaced with new ones

### 7. Error Handling

**Seed:** `tests/seed/product-with-broken-links.spec.ts`

#### 7.1. Display placeholder for broken link

**File:** `tests/functional/broken-link-placeholder.spec.ts`

**Steps:**
  1. System detects broken link on product
  2. Login as PwD user
  3. Navigate to product with broken link
  4. View Contact Assistive Partner section

**Expected Results:**
  - Placeholder message displayed: 'Link currently unavailable.'
  - No broken hyperlink is shown
  - Other valid links remain visible

#### 7.2. Vendor notification for broken link

**File:** `tests/functional/vendor-broken-link-notification.spec.ts`

**Steps:**
  1. System detects broken link on vendor's product
  2. Check vendor notifications

**Expected Results:**
  - Vendor receives notification to update link
  - Notification includes product and link details
  - Notification provides action to edit product

### 8. Audit and Security

**Seed:** `tests/seed/vendor-product-with-links.spec.ts`

#### 8.1. Audit log for link addition

**File:** `tests/functional/audit-link-addition.spec.ts`

**Steps:**
  1. Login as AP
  2. Add Amazon Purchase Link to product
  3. Save product
  4. Check audit log

**Expected Results:**
  - Audit log records link addition
  - Log includes: timestamp, AP ID, action 'Added', link URL
  - Log entry is immutable

#### 8.2. Block malicious URL

**File:** `tests/functional/block-malicious-url.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to Product Upload Form
  3. Add Official Website Link
  4. Enter known malicious URL
  5. Attempt to save

**Expected Results:**
  - System blocks the malicious URL
  - Error message indicates URL is not allowed
  - Form does not submit

#### 8.3. Sanitize external links

**File:** `tests/functional/sanitize-links.spec.ts`

**Steps:**
  1. Login as AP
  2. Add link with special characters/scripts
  3. Save product
  4. Admin approves product
  5. View product as PwD user

**Expected Results:**
  - Link is sanitized before storage
  - No script execution occurs
  - Link is safe to display and click
