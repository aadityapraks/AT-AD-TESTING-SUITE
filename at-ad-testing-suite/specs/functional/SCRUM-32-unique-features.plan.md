# SCRUM-32 Test Plan

## Application Overview

Test plan for validating the optional Unique Features field functionality where Assistive Partners can highlight up to 3 unique accessibility features of their products with titles and descriptions (max 100 characters each), including GenAI assistance, admin review, and WCAG 2.1 AA accessibility compliance.

## Test Scenarios

### 1. Unique Feature Field Access and Input

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 1.1. Verify Unique Feature field presence and instructions

**File:** `tests/functional/unique-feature-field-display.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Locate description section
  4. Find 'Highlight Unique Feature(s)' field

**Expected Results:**
  - Optional field labeled 'Highlight Unique Feature(s)' is visible
  - Instructional note displays: 'Use this section to highlight special or accessibility-focused features of your product (optional).'
  - Field is clearly marked as optional

#### 1.2. Add single unique feature with title and description

**File:** `tests/functional/add-single-unique-feature.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Click Add Unique Feature button
  4. Enter title: 'Foldable Design'
  5. Enter description: 'Easy portability for travel and storage'
  6. Save form

**Expected Results:**
  - Title and description fields appear
  - Both fields accept text input
  - Feature is saved successfully
  - Character count displays for description field

#### 1.3. Add maximum 3 unique features

**File:** `tests/functional/add-three-unique-features.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add first feature with title and description
  4. Add second feature with title and description
  5. Add third feature with title and description
  6. Attempt to add fourth feature

**Expected Results:**
  - All 3 features are added successfully
  - Add button is disabled after 3 features
  - Error message displays: 'You can highlight up to 3 features, with a maximum of 100 characters each.'
  - All 3 features are saved

#### 1.4. Validate 100 character limit per description

**File:** `tests/functional/validate-character-limit.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add unique feature
  4. Enter description with exactly 100 characters
  5. Attempt to enter 101st character

**Expected Results:**
  - Character counter displays remaining characters
  - 100 characters are accepted
  - 101st character is blocked or error shown
  - Inline validation message appears if limit exceeded

### 2. Optional Field Behavior

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 2.1. Submit product without unique features

**File:** `tests/functional/submit-without-features.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Fill all mandatory fields
  4. Leave Unique Features field empty
  5. Submit product

**Expected Results:**
  - Product submits successfully
  - No validation error for empty unique features
  - Product status changes to Pending Review
  - Product is valid and publishable

#### 2.2. Verify section hidden on PwD view when empty

**File:** `tests/functional/hidden-section-when-empty.spec.ts`

**Steps:**
  1. Admin approves product without unique features
  2. Login as PwD user
  3. Navigate to product details page
  4. Check for Key Highlights section

**Expected Results:**
  - Key Highlights section is not displayed
  - Product page displays normally without the section
  - No empty placeholder is shown

### 3. PwD Product Display

**Seed:** `tests/seed/approved-product-with-features.spec.ts`

#### 3.1. Display unique features in Key Highlights section

**File:** `tests/functional/display-key-highlights.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to approved product with unique features
  3. Locate Key Highlights section

**Expected Results:**
  - Section titled 'Key Highlights' or 'Unique Accessibility Features' is visible
  - Section is positioned near top of description
  - All 3 features are displayed with checkmark icons
  - Features use bullet point or card-style layout

#### 3.2. Verify feature formatting with icons

**File:** `tests/functional/verify-feature-formatting.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to product with features
  3. Inspect each feature display

**Expected Results:**
  - Each feature shows checkmark icon (✅)
  - Title and description are clearly visible
  - Simple, non-technical language is used
  - Features are visually distinct from other content

#### 3.3. Verify collapsible section for screen readers

**File:** `tests/functional/collapsible-section.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to product with features
  3. Test expand/collapse functionality
  4. Use screen reader to navigate section

**Expected Results:**
  - Section is collapsible/expandable
  - Collapse/expand button is keyboard accessible
  - Screen reader announces section state
  - Content is accessible when expanded

### 4. GenAI Assistance

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 4.1. Use GenAI to refine feature description

**File:** `tests/functional/genai-refine-feature.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add unique feature with basic description
  4. Click 'Assist with GenAI' button
  5. Review AI-generated suggestion

**Expected Results:**
  - 'Assist with GenAI' button is visible beside field
  - AI generates accessibility-compliant phrasing
  - Suggestion is clear and inclusive
  - AP can view generated content before accepting

#### 4.2. Edit AI-generated content before saving

**File:** `tests/functional/edit-ai-content.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Use GenAI to generate feature description
  3. Modify AI-generated text
  4. Save the edited version

**Expected Results:**
  - AI-generated content is editable
  - AP can overwrite any part of suggestion
  - Edited version is saved successfully
  - Original input is replaced with edited content

#### 4.3. View GenAI phrasing examples in tooltips

**File:** `tests/functional/genai-tooltip-examples.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Unique Features field
  3. Hover over help icon or tooltip
  4. Review example phrases

**Expected Results:**
  - Tooltip displays phrasing examples
  - Examples include: 'Designed for ease of use with limited hand mobility'
  - Examples include: 'Includes tactile buttons and voice prompts'
  - Examples include: 'Adjustable height for customized comfort'

### 5. Admin Review and Moderation

**Seed:** `tests/seed/admin-product-review.spec.ts`

#### 5.1. Admin views submitted unique features

**File:** `tests/functional/admin-view-features.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to product pending review with unique features
  3. View product details in review interface

**Expected Results:**
  - All unique features are visible to admin
  - Features display with titles and descriptions
  - Admin can read all submitted content

#### 5.2. Admin approves features as-is

**File:** `tests/functional/admin-approve-features.spec.ts`

**Steps:**
  1. Login as admin
  2. Review product with valid unique features
  3. Approve product without changes

**Expected Results:**
  - Admin can approve features without editing
  - Product status changes to Approved
  - Features go live on product page

#### 5.3. Admin edits feature for clarity

**File:** `tests/functional/admin-edit-feature.spec.ts`

**Steps:**
  1. Login as admin
  2. Review product with unclear feature description
  3. Edit feature text for grammar or clarity
  4. Save changes and approve product

**Expected Results:**
  - Admin can edit feature title and description
  - Changes are saved successfully
  - Edited version appears on product page
  - Edit is logged in audit trail

#### 5.4. Admin rejects promotional feature

**File:** `tests/functional/admin-reject-feature.spec.ts`

**Steps:**
  1. Login as admin
  2. Review product with promotional feature
  3. Reject specific feature as non-compliant
  4. Add feedback note for vendor
  5. Approve product with remaining features

**Expected Results:**
  - Admin can reject individual features
  - Feedback displays in vendor's product status notes
  - Rejected feature is removed from product
  - Other valid features remain visible

### 6. Vendor Editing and Updates

**Seed:** `tests/seed/vendor-edit-product.spec.ts`

#### 6.1. Edit existing unique feature

**File:** `tests/functional/edit-existing-feature.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to published product
  3. Click Edit Product
  4. Modify unique feature description
  5. Save changes

**Expected Results:**
  - Feature is updated successfully
  - Product status changes to Pending Review
  - Update is logged in audit trail
  - Old content is replaced with new

#### 6.2. Add feature to existing product

**File:** `tests/functional/add-feature-to-existing.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to published product with 1 feature
  3. Click Edit Product
  4. Add second unique feature
  5. Save changes

**Expected Results:**
  - New feature is added successfully
  - Product goes to Pending Review
  - Both features visible after admin approval

#### 6.3. Remove unique feature from product

**File:** `tests/functional/remove-unique-feature.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to published product with features
  3. Click Edit Product
  4. Delete one unique feature
  5. Save changes

**Expected Results:**
  - Feature is removed from form
  - Product status changes to Pending Review
  - After admin approval, feature is permanently removed
  - Deletion is logged in audit trail

#### 6.4. Updated features go live after approval

**File:** `tests/functional/updated-features-live.spec.ts`

**Steps:**
  1. AP updates unique features
  2. Admin reviews and approves changes
  3. Login as PwD user
  4. View product details

**Expected Results:**
  - Updated features are visible on product page
  - Changes reflect admin-approved content
  - Old features are replaced with new ones

### 7. Accessibility Compliance

**Seed:** `tests/seed/approved-product-with-features.spec.ts`

#### 7.1. Verify WCAG 2.1 AA compliance for labels

**File:** `tests/functional/wcag-labels.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to product with unique features
  3. Inspect field labels and tooltips with screen reader

**Expected Results:**
  - All labels are readable by screen readers
  - Tooltips have proper ARIA attributes
  - Field instructions are accessible

#### 7.2. Verify icon text equivalents

**File:** `tests/functional/icon-text-equivalents.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to product with features
  3. Inspect checkmark icons with screen reader

**Expected Results:**
  - Icons have text equivalents
  - Screen reader announces: 'Feature: Foldable Design'
  - Visual and text content are equivalent

#### 7.3. Verify color contrast for highlights

**File:** `tests/functional/color-contrast.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Navigate to product with features
  3. Check color contrast of badges and markers

**Expected Results:**
  - Color contrast meets WCAG 2.1 AA standards
  - Text is readable against background
  - Highlight markers have sufficient contrast

#### 7.4. Verify keyboard accessibility

**File:** `tests/functional/keyboard-accessibility.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to Product Upload Form
  3. Use Tab key to navigate unique features fields
  4. Use keyboard to add, edit, and remove features

**Expected Results:**
  - All input fields are keyboard accessible
  - Tab order is logical
  - Add/remove buttons work with Enter key
  - Focus indicators are visible

### 8. Error Handling and Validation

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 8.1. Validate character limit error message

**File:** `tests/functional/character-limit-error.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add unique feature
  4. Enter description exceeding 100 characters
  5. Attempt to save

**Expected Results:**
  - Inline validation error displays
  - Error message: 'You can highlight up to 3 features, with a maximum of 100 characters each.'
  - Form does not submit
  - Field is highlighted with error state

#### 8.2. Validate invalid text or symbols

**File:** `tests/functional/invalid-text-validation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add unique feature
  4. Enter invalid symbols or special characters
  5. Attempt to save

**Expected Results:**
  - Inline validation message appears
  - Invalid characters are highlighted
  - Form does not submit until corrected

#### 8.3. Validate empty title with description

**File:** `tests/functional/empty-title-validation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Add unique feature
  4. Leave title empty but add description
  5. Attempt to save

**Expected Results:**
  - Validation error for missing title
  - Error message indicates title is required if description is provided
  - Form does not submit

### 9. Audit and Version Tracking

**Seed:** `tests/seed/admin-audit-logs.spec.ts`

#### 9.1. Log feature addition in audit trail

**File:** `tests/functional/audit-log-addition.spec.ts`

**Steps:**
  1. Login as AP
  2. Add unique features to product
  3. Save product
  4. Login as admin
  5. View audit logs for product

**Expected Results:**
  - Audit log records feature addition
  - Log includes Product ID, AP ID, Action type (Added)
  - Timestamp is recorded
  - All 3 features are logged individually

#### 9.2. Log feature edit in audit trail

**File:** `tests/functional/audit-log-edit.spec.ts`

**Steps:**
  1. Login as AP
  2. Edit existing unique feature
  3. Save changes
  4. Login as admin
  5. View audit logs

**Expected Results:**
  - Audit log records feature edit
  - Log shows before and after values
  - Action type is 'Edited'
  - Timestamp is recorded

#### 9.3. Log feature removal in audit trail

**File:** `tests/functional/audit-log-removal.spec.ts`

**Steps:**
  1. Login as AP
  2. Remove unique feature from product
  3. Save changes
  4. Login as admin
  5. View audit logs

**Expected Results:**
  - Audit log records feature removal
  - Log includes removed feature content
  - Action type is 'Removed'
  - Timestamp is recorded

#### 9.4. Generate admin report on accessibility highlights

**File:** `tests/functional/admin-report-highlights.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to Reports section
  3. Generate report for products with accessibility highlights
  4. View report data

**Expected Results:**
  - Report shows count of products with unique features
  - Report includes breakdown by feature type
  - Data is accurate and up-to-date
  - Report can be exported
