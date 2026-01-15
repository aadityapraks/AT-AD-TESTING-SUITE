# Accessibility Test Plan: Vendor Profile Page (WCAG 2.1 AA)

## Application Overview

Comprehensive accessibility test plan for Assistive Partner Profile page ensuring WCAG 2.1 AA compliance. Tests cover navigation, page structure, organization card, account status, documents section, profile editing, form validation, and read-only field display.

## Test Scenarios

### 1. Navigation and Page Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Top navigation keyboard accessible

**File:** `tests/accessibility/SCRUM-155/navigation-keyboard.spec.ts`

**Steps:**
  1. Navigate to Vendor Profile page
  2. Tab through navigation links (Dashboard, Help & Resources, Profile, Logout)
  3. Verify focus indicator on each link
  4. Check Profile link has aria-current='page'
  5. Press Enter to activate links

**Expected Results:**
  - All nav links keyboard accessible
  - Tab order logical
  - Active link has aria-current='page'
  - Focus indicators visible
  - Enter activates links

#### 1.2. TC_A11Y_002: Navigation has proper structure

**File:** `tests/accessibility/SCRUM-155/navigation-structure.spec.ts`

**Steps:**
  1. Inspect top navigation
  2. Verify <nav> element or role='navigation'
  3. Check aria-label or aria-labelledby present
  4. Use screen reader to verify navigation announced
  5. Test landmark navigation

**Expected Results:**
  - Nav uses semantic HTML or ARIA
  - Nav has role='navigation' or <nav>
  - Nav has accessible name
  - Screen reader announces navigation
  - Landmark navigation works

#### 1.3. TC_A11Y_003: Page has proper heading structure

**File:** `tests/accessibility/SCRUM-155/page-heading.spec.ts`

**Steps:**
  1. Navigate to Vendor Profile page
  2. Verify H1 exists for 'Vendor Profile'
  3. Check subtitle semantic structure
  4. Use screen reader heading navigation
  5. Verify no heading levels skipped

**Expected Results:**
  - Page has H1 for title
  - Subtitle uses appropriate heading or paragraph
  - Heading hierarchy logical
  - Screen reader can navigate by headings
  - No skipped heading levels

### 2. Edit Profile Button

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_004: Edit Profile button accessible

**File:** `tests/accessibility/SCRUM-155/edit-button.spec.ts`

**Steps:**
  1. Tab to Edit Profile button
  2. Verify focus indicator visible
  3. Check button has accessible name
  4. Press Enter/Space to activate
  5. Verify edit mode activates

**Expected Results:**
  - Button keyboard accessible
  - Enter/Space activates button
  - Focus indicator visible
  - Button has accessible name
  - Button positioned logically

#### 2.2. TC_A11Y_005: Edit mode activation announced

**File:** `tests/accessibility/SCRUM-155/edit-mode-announcement.spec.ts`

**Steps:**
  1. Click Edit Profile button
  2. Verify mode change announced
  3. Check aria-live region announces edit mode
  4. Verify focus moves to first field
  5. Use screen reader to verify announcement

**Expected Results:**
  - Mode change announced via aria-live
  - Edit mode status clear
  - Screen reader announces transition
  - Focus moves to first editable field
  - User aware of mode change

### 3. Organization Card

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_006: Organization logo has alt text

**File:** `tests/accessibility/SCRUM-155/org-logo-alt.spec.ts`

**Steps:**
  1. Locate organization logo/image
  2. Verify alt attribute present
  3. Check alt text descriptive
  4. Verify placeholder has alt if no image
  5. Use screen reader to verify announcement

**Expected Results:**
  - Image has alt text
  - Alt text describes organization
  - Placeholder image has appropriate alt
  - Screen reader announces image
  - Image not essential for understanding

#### 3.2. TC_A11Y_007: Read-only fields indicated

**File:** `tests/accessibility/SCRUM-155/readonly-fields.spec.ts`

**Steps:**
  1. Review organization name and type fields
  2. Verify fields visually disabled
  3. Check fields not in tab order
  4. Verify aria-readonly or disabled attribute
  5. Use screen reader to verify read-only announced

**Expected Results:**
  - Read-only fields clearly indicated
  - Fields not in tab order
  - Visual styling shows disabled state
  - Screen reader announces read-only
  - aria-readonly='true' or disabled attribute

### 4. Account Status Section

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_008: Status badge accessible

**File:** `tests/accessibility/SCRUM-155/status-badge.spec.ts`

**Steps:**
  1. Locate Account Status badge
  2. Verify status has text label (Active/Inactive)
  3. Check not relying on color alone
  4. Measure badge contrast (4.5:1)
  5. Use screen reader to verify announcement

**Expected Results:**
  - Status badge has text label
  - Status not conveyed by color alone
  - Badge has 4.5:1 contrast
  - Screen reader announces status
  - Icon supplemented with text

#### 4.2. TC_A11Y_009: Verification icon accessible

**File:** `tests/accessibility/SCRUM-155/verification-icon.spec.ts`

**Steps:**
  1. Locate Verification indicator
  2. Verify text label present (Verified/Pending)
  3. Check icon has aria-hidden='true'
  4. Verify not relying on icon alone
  5. Use screen reader to verify announcement

**Expected Results:**
  - Verification status has text
  - Icon has aria-hidden='true'
  - Status conveyed by text, not icon alone
  - Screen reader announces verification
  - Not relying on icon color

#### 4.3. TC_A11Y_010: Member Since date accessible

**File:** `tests/accessibility/SCRUM-155/member-since-date.spec.ts`

**Steps:**
  1. Locate Member Since date
  2. Verify label present
  3. Check date format clear
  4. Verify label associated
  5. Use screen reader to verify announcement

**Expected Results:**
  - Date has proper label
  - Date format clear
  - Screen reader announces date
  - Label associated with date
  - Date semantically marked

### 5. Documents Section

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_011: Documents displayed in semantic list

**File:** `tests/accessibility/SCRUM-155/documents-list.spec.ts`

**Steps:**
  1. Locate documents section
  2. Verify list structure (<ul> or role='list')
  3. Check each document is <li>
  4. Use screen reader to verify list announced
  5. Check document count announced

**Expected Results:**
  - Documents in semantic list
  - List uses <ul> or role='list'
  - Each document is list item
  - Screen reader announces list
  - Document count announced

#### 5.2. TC_A11Y_012: Document preview button accessible

**File:** `tests/accessibility/SCRUM-155/document-preview.spec.ts`

**Steps:**
  1. Tab to preview (eye icon) button
  2. Verify focus indicator visible
  3. Check button has accessible name
  4. Press Enter to activate
  5. Verify document opens in new tab
  6. Check aria-label includes 'opens in new tab'

**Expected Results:**
  - Preview button keyboard accessible
  - Button has accessible name
  - Enter/Space activates button
  - Focus indicator visible
  - New tab opening announced

#### 5.3. TC_A11Y_013: Document type icons accessible

**File:** `tests/accessibility/SCRUM-155/document-icons.spec.ts`

**Steps:**
  1. Locate document type icons
  2. Verify icons have aria-hidden='true'
  3. Check document type in text
  4. Verify not relying on icon alone
  5. Use screen reader to verify type announced

**Expected Results:**
  - Document icons have aria-hidden='true'
  - Document type conveyed by text
  - Not relying on icon alone
  - Screen reader announces document type
  - Icons decorative

#### 5.4. TC_A11Y_014: Documents empty state accessible

**File:** `tests/accessibility/SCRUM-155/documents-empty-state.spec.ts`

**Steps:**
  1. View profile with no documents
  2. Verify empty state message appears
  3. Check message reads 'No documents uploaded yet'
  4. Verify message has proper semantics
  5. Use screen reader to verify announcement

**Expected Results:**
  - Empty state message visible
  - Message has proper semantics
  - Screen reader announces message
  - Message clear and helpful
  - No broken list structure

### 6. Organization Details Section

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_015: Organization details fields have labels

**File:** `tests/accessibility/SCRUM-155/org-details-labels.spec.ts`

**Steps:**
  1. Review Organization Details section
  2. Verify all fields have visible labels
  3. Check labels associated (for/id)
  4. Verify required fields have asterisk
  5. Check aria-required='true' on required fields

**Expected Results:**
  - All fields have visible labels
  - Labels programmatically associated
  - Required fields marked with asterisk
  - aria-required on required fields
  - Labels remain visible

#### 6.2. TC_A11Y_016: Required field indicator accessible

**File:** `tests/accessibility/SCRUM-155/required-indicator.spec.ts`

**Steps:**
  1. Locate required fields
  2. Verify asterisk visible
  3. Check legend explains asterisk
  4. Verify aria-required='true'
  5. Use screen reader to verify required announced

**Expected Results:**
  - Required indicator has text equivalent
  - Not relying on color alone
  - Screen reader announces required
  - Legend explains asterisk meaning
  - Visual and programmatic indication

#### 6.3. TC_A11Y_017: Read-only fields visually distinct

**File:** `tests/accessibility/SCRUM-155/readonly-styling.spec.ts`

**Steps:**
  1. View profile in read-only mode
  2. Verify read-only fields visually distinct
  3. Check fields not in tab order
  4. Verify disabled styling has contrast
  5. Use screen reader to verify read-only

**Expected Results:**
  - Read-only styling clear
  - Fields not in tab order
  - Visual distinction from editable
  - Screen reader announces read-only
  - Disabled state has sufficient contrast

### 7. Contact Information Section

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_018: Contact fields have labels and autocomplete

**File:** `tests/accessibility/SCRUM-155/contact-labels.spec.ts`

**Steps:**
  1. Review Contact Information section
  2. Verify all fields have labels
  3. Check labels associated
  4. Verify email has autocomplete='email'
  5. Check phone has autocomplete='tel'
  6. Verify website has autocomplete='url'

**Expected Results:**
  - All fields have labels
  - Labels associated correctly
  - Email has autocomplete='email'
  - Phone has autocomplete='tel'
  - Website has autocomplete='url'

#### 7.2. TC_A11Y_019: Website link accessible

**File:** `tests/accessibility/SCRUM-155/website-link.spec.ts`

**Steps:**
  1. Locate website link
  2. Verify link text descriptive
  3. Check target='_blank'
  4. Verify aria-label includes new tab warning
  5. Check rel='noopener noreferrer'
  6. Use screen reader to verify announcement

**Expected Results:**
  - Website link has descriptive text
  - Link opens in new tab
  - aria-label includes 'opens in new tab'
  - target='_blank' present
  - rel='noopener noreferrer' present

#### 7.3. TC_A11Y_020: Social media links accessible

**File:** `tests/accessibility/SCRUM-155/social-links.spec.ts`

**Steps:**
  1. Tab to social media links
  2. Verify focus indicator on each
  3. Check links have accessible names
  4. Verify icons have aria-hidden='true'
  5. Check new tab announced
  6. Press Enter to activate

**Expected Results:**
  - Social links keyboard accessible
  - Links have accessible names
  - Icons have aria-hidden='true'
  - New tab opening announced
  - Links distinguishable

### 8. Edit Mode - Form Inputs

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_021: Edit mode inputs keyboard accessible

**File:** `tests/accessibility/SCRUM-155/edit-inputs-keyboard.spec.ts`

**Steps:**
  1. Activate edit mode
  2. Tab through all input fields
  3. Verify focus indicator on each
  4. Check tab order logical
  5. Verify labels visible on focus

**Expected Results:**
  - All inputs keyboard accessible
  - Tab order logical
  - Focus indicators visible
  - Labels remain visible on focus
  - Placeholder supplementary

#### 8.2. TC_A11Y_022: Save and Cancel buttons accessible

**File:** `tests/accessibility/SCRUM-155/save-cancel-buttons.spec.ts`

**Steps:**
  1. Enter edit mode
  2. Tab to Save button
  3. Tab to Cancel button
  4. Verify focus indicators visible
  5. Press Enter to activate buttons
  6. Check button labels clear

**Expected Results:**
  - Save button accessible
  - Cancel button accessible
  - Tab order includes both buttons
  - Enter/Space activates buttons
  - Focus indicators visible

### 9. Form Validation and Errors

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_023: Required field error accessible

**File:** `tests/accessibility/SCRUM-155/required-field-error.spec.ts`

**Steps:**
  1. Enter edit mode
  2. Clear required field
  3. Trigger validation
  4. Verify error message appears
  5. Check aria-invalid='true'
  6. Verify aria-describedby links error
  7. Use screen reader to verify announcement

**Expected Results:**
  - Error message appears inline
  - Error linked with aria-describedby
  - aria-invalid='true' on input
  - Error specific and clear
  - Screen reader announces error

#### 9.2. TC_A11Y_024: Email validation error accessible

**File:** `tests/accessibility/SCRUM-155/email-validation-error.spec.ts`

**Steps:**
  1. Enter invalid email format
  2. Trigger validation
  3. Verify error appears
  4. Check error specific
  5. Verify ARIA attributes
  6. Use screen reader to verify announcement

**Expected Results:**
  - Email error accessible
  - Error linked to input
  - aria-invalid='true' present
  - Error suggests correction
  - Screen reader announces error

#### 9.3. TC_A11Y_025: Phone validation error accessible

**File:** `tests/accessibility/SCRUM-155/phone-validation-error.spec.ts`

**Steps:**
  1. Enter invalid phone number
  2. Trigger validation
  3. Verify error appears
  4. Check error specific
  5. Verify ARIA attributes
  6. Use screen reader to verify announcement

**Expected Results:**
  - Phone error accessible
  - Error linked to input
  - aria-invalid='true' set
  - Error suggests format
  - Screen reader announces error

#### 9.4. TC_A11Y_026: URL validation error accessible

**File:** `tests/accessibility/SCRUM-155/url-validation-error.spec.ts`

**Steps:**
  1. Enter invalid URL (no http)
  2. Trigger validation
  3. Verify error appears
  4. Check error suggests format
  5. Verify ARIA attributes
  6. Use screen reader to verify announcement

**Expected Results:**
  - URL error accessible
  - Error linked to input
  - aria-invalid='true' present
  - Error suggests http(s)://
  - Screen reader announces error

#### 9.5. TC_A11Y_027: Error summary accessible

**File:** `tests/accessibility/SCRUM-155/error-summary.spec.ts`

**Steps:**
  1. Submit form with multiple errors
  2. Verify error summary appears
  3. Check focus moves to summary
  4. Verify summary lists all errors
  5. Check links jump to fields
  6. Use screen reader to verify announcement

**Expected Results:**
  - Error summary at top of form
  - Focus moves to error summary
  - Summary lists all errors
  - Links jump to specific fields
  - aria-live announces errors

### 10. Success and Status Messages

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_028: Success toast accessible

**File:** `tests/accessibility/SCRUM-155/success-toast.spec.ts`

**Steps:**
  1. Save profile changes
  2. Verify success toast appears
  3. Check toast announced via aria-live
  4. Verify role='status' or aria-live='polite'
  5. Check message clear
  6. Verify toast dismissible

**Expected Results:**
  - Success toast announced
  - Toast has role='status' or aria-live
  - Message clear and specific
  - User doesn't need to find message
  - Toast dismissible or auto-dismisses

#### 10.2. TC_A11Y_029: Return to read-only mode announced

**File:** `tests/accessibility/SCRUM-155/readonly-mode-return.spec.ts`

**Steps:**
  1. Save or cancel edit
  2. Verify return to read-only announced
  3. Check aria-live announces change
  4. Verify focus managed
  5. Use screen reader to verify announcement

**Expected Results:**
  - Mode change announced
  - Fields return to read-only
  - Transition announced via aria-live
  - Focus managed appropriately
  - User aware of mode change

### 11. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_030: Text contrast meets WCAG AA

**File:** `tests/accessibility/SCRUM-155/text-contrast.spec.ts`

**Steps:**
  1. Measure contrast for all text
  2. Check body text has 4.5:1
  3. Check large text has 3:1
  4. Verify status badges have contrast
  5. Check disabled text contrast

**Expected Results:**
  - Normal text has 4.5:1 contrast
  - Large text has 3:1 contrast
  - Status badges have sufficient contrast
  - All text meets WCAG AA
  - Disabled text has contrast if conveying info

#### 11.2. TC_A11Y_031: UI component contrast meets WCAG AA

**File:** `tests/accessibility/SCRUM-155/component-contrast.spec.ts`

**Steps:**
  1. Measure input border contrast
  2. Check button borders
  3. Verify status badge borders
  4. Check focus indicators
  5. Verify all meet 3:1 minimum

**Expected Results:**
  - Input borders have 3:1 contrast
  - Button boundaries have 3:1 contrast
  - Status badges have 3:1 contrast
  - Focus indicators have 3:1 contrast
  - All UI components meet WCAG 1.4.11

#### 11.3. TC_A11Y_032: Focus indicators visible

**File:** `tests/accessibility/SCRUM-155/focus-indicators.spec.ts`

**Steps:**
  1. Tab through all interactive elements
  2. Verify focus indicator on each
  3. Check focus has 3:1 contrast
  4. Verify focus not obscured
  5. Check indicator thickness

**Expected Results:**
  - All focusable elements show focus
  - Focus indicators have 3:1 contrast
  - Focus visible and not obscured
  - Indicator thickness adequate
  - WCAG 2.4.7 satisfied

#### 11.4. TC_A11Y_033: Information not conveyed by color alone

**File:** `tests/accessibility/SCRUM-155/not-color-only.spec.ts`

**Steps:**
  1. Review status badges
  2. Check required field indicators
  3. Verify error states have text
  4. Check links have underline
  5. Test in grayscale mode

**Expected Results:**
  - Status not conveyed by color alone
  - Required fields have asterisk
  - Error states have icons/text
  - Links distinguishable without color
  - WCAG 1.4.1 satisfied

#### 11.5. TC_A11Y_034: Page scales to 200% without loss

**File:** `tests/accessibility/SCRUM-155/text-resize.spec.ts`

**Steps:**
  1. Zoom browser to 200%
  2. Verify all text visible
  3. Check no horizontal scrolling
  4. Verify all functionality available
  5. Check no text truncation

**Expected Results:**
  - All text scales to 200%
  - No horizontal scrolling
  - No text truncation
  - All features remain usable
  - Layout adapts responsively

### 12. Keyboard Navigation

**Seed:** `tests/seed.spec.ts`

#### 12.1. TC_A11Y_035: Tab order logical

**File:** `tests/accessibility/SCRUM-155/tab-order.spec.ts`

**Steps:**
  1. Tab from page start
  2. Verify tab order follows visual layout
  3. Check all interactive elements reachable
  4. Verify no keyboard traps
  5. Check skip link if present

**Expected Results:**
  - Tab order follows visual layout
  - All interactive elements reachable
  - No keyboard traps
  - Skip link available
  - Focus visible throughout

#### 12.2. TC_A11Y_036: Cancel action accessible

**File:** `tests/accessibility/SCRUM-155/cancel-action.spec.ts`

**Steps:**
  1. Enter edit mode
  2. Make changes
  3. Click Cancel button
  4. Verify changes reverted
  5. Check revert announced
  6. Verify focus managed

**Expected Results:**
  - Cancel reverts changes
  - Revert announced via aria-live
  - Focus managed appropriately
  - User aware of cancellation
  - No data loss warning if needed

### 13. Mobile and Responsive

**Seed:** `tests/seed.spec.ts`

#### 13.1. TC_A11Y_037: Profile accessible on mobile

**File:** `tests/accessibility/SCRUM-155/mobile-responsive.spec.ts`

**Steps:**
  1. Set viewport to mobile (375x667)
  2. Navigate to Vendor Profile
  3. Verify all content accessible
  4. Check touch targets adequate
  5. Verify no horizontal scrolling
  6. Test all functionality

**Expected Results:**
  - Page accessible on mobile
  - Touch targets 44x44px minimum
  - No horizontal scrolling
  - All features available
  - Text readable without zoom

### 14. Screen Reader Specific

**Seed:** `tests/seed.spec.ts`

#### 14.1. TC_A11Y_038: Page has proper landmarks

**File:** `tests/accessibility/SCRUM-155/landmarks.spec.ts`

**Steps:**
  1. Use screen reader landmark navigation
  2. Verify banner/header landmark
  3. Verify navigation landmark
  4. Verify main landmark
  5. Verify all regions accessible

**Expected Results:**
  - Page has proper landmarks
  - Main content in <main>
  - Navigation in <nav>
  - Screen reader can navigate by landmarks
  - All regions labeled

#### 14.2. TC_A11Y_039: Screen reader announces all content

**File:** `tests/accessibility/SCRUM-155/screen-reader-comprehensive.spec.ts`

**Steps:**
  1. Use screen reader to navigate entire page
  2. Verify all sections announced
  3. Check field labels announced
  4. Verify status changes announced
  5. Check errors and success announced

**Expected Results:**
  - All sections announced
  - Field labels announced
  - Status changes announced
  - Errors announced
  - Success messages announced
