# Accessibility Test Plan: External Purchase Links (WCAG 2.1 AA)

## Application Overview

Comprehensive accessibility test plan for adding and displaying external purchase links (Amazon, Flipkart, Official Website) ensuring WCAG 2.1 AA compliance. Tests cover form inputs, validation, link display on product details page, and external link warnings.

## Test Scenarios

### 1. Add Link Button and Dropdown

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Add Link button keyboard accessible

**File:** `tests/accessibility/SCRUM-26/add-link-button.spec.ts`

**Steps:**
  1. Navigate to Product Upload/Edit form
  2. Tab to 'Add Link' button
  3. Verify focus indicator visible
  4. Press Enter/Space to open dropdown
  5. Verify dropdown opens

**Expected Results:**
  - Button keyboard accessible with Tab
  - Enter/Space opens dropdown
  - Button has accessible name
  - Focus indicator visible
  - aria-haspopup present

#### 1.2. TC_A11Y_002: Link type dropdown keyboard accessible

**File:** `tests/accessibility/SCRUM-26/link-dropdown-keyboard.spec.ts`

**Steps:**
  1. Open Add Link dropdown
  2. Use arrow keys to navigate options
  3. Verify all options reachable (Amazon, Flipkart, Website, Other)
  4. Press Enter to select option
  5. Press Escape to close without selection

**Expected Results:**
  - Dropdown opens with keyboard
  - Arrow keys navigate options
  - Enter selects option
  - Escape closes dropdown
  - Focus returns to button

#### 1.3. TC_A11Y_003: Link dropdown has proper ARIA

**File:** `tests/accessibility/SCRUM-26/link-dropdown-aria.spec.ts`

**Steps:**
  1. Inspect Add Link dropdown
  2. Verify aria-haspopup on button
  3. Check aria-expanded state toggles
  4. Verify dropdown has proper role
  5. Check menu items have role='menuitem'
  6. Verify screen reader announces options

**Expected Results:**
  - Dropdown has role='menu' or 'listbox'
  - aria-expanded toggles correctly
  - Menu items have role='menuitem'
  - Selected option announced
  - Accessible name present

### 2. Link Input Fields

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_004: Amazon link input has label

**File:** `tests/accessibility/SCRUM-26/amazon-input-label.spec.ts`

**Steps:**
  1. Select 'Amazon Purchase Link' from dropdown
  2. Verify input field appears
  3. Check visible label present
  4. Verify label associated with input (for/id)
  5. Check autocomplete='url' attribute

**Expected Results:**
  - Input has visible label
  - Label programmatically associated
  - Placeholder supplementary, not sole label
  - Input has autocomplete='url'
  - Field purpose clear

#### 2.2. TC_A11Y_005: Flipkart link input has label

**File:** `tests/accessibility/SCRUM-26/flipkart-input-label.spec.ts`

**Steps:**
  1. Select 'Flipkart Purchase Link'
  2. Verify input field appears
  3. Check label visible and associated
  4. Verify optional status indicated
  5. Check autocomplete attribute

**Expected Results:**
  - Input has visible label
  - Label associated with input
  - Placeholder not sole label
  - autocomplete='url' present
  - Optional status indicated

#### 2.3. TC_A11Y_006: Website link input has label

**File:** `tests/accessibility/SCRUM-26/website-input-label.spec.ts`

**Steps:**
  1. Select 'Official Website Link'
  2. Verify input field appears
  3. Check label present and associated
  4. Verify autocomplete='url'
  5. Check optional status indicated

**Expected Results:**
  - Input has visible label
  - Label associated correctly
  - Placeholder supplementary
  - autocomplete='url' present
  - Field purpose clear

#### 2.4. TC_A11Y_007: Other link inputs have labels

**File:** `tests/accessibility/SCRUM-26/other-link-inputs.spec.ts`

**Steps:**
  1. Select 'Other Link'
  2. Verify two input fields appear
  3. Check 'Link Name' input has label
  4. Check 'URL' input has label
  5. Verify both labels associated
  6. Check tab order logical

**Expected Results:**
  - Both inputs have labels
  - Name input has autocomplete='off'
  - URL input has autocomplete='url'
  - Labels clearly distinguish fields
  - Tab order logical (Name then URL)

#### 2.5. TC_A11Y_008: Optional status indicated

**File:** `tests/accessibility/SCRUM-26/optional-fields.spec.ts`

**Steps:**
  1. Review all link input fields
  2. Verify no required asterisks
  3. Check aria-required not set to true
  4. Verify screen reader announces optional
  5. Check help text if present

**Expected Results:**
  - Optional status indicated visually
  - aria-required='false' or absent
  - Screen reader announces optional
  - Not marked with asterisk
  - Help text explains optional nature

### 3. Input Validation and Errors

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_009: Invalid URL error accessible

**File:** `tests/accessibility/SCRUM-26/invalid-url-error.spec.ts`

**Steps:**
  1. Enter invalid URL (no http/https)
  2. Trigger validation (blur or submit)
  3. Verify error message appears
  4. Check aria-invalid='true' on input
  5. Verify aria-describedby links error
  6. Use screen reader to verify announcement

**Expected Results:**
  - Error message appears inline
  - Error linked with aria-describedby
  - aria-invalid='true' on input
  - Error specific and clear
  - Screen reader announces error

#### 3.2. TC_A11Y_010: Amazon domain validation error accessible

**File:** `tests/accessibility/SCRUM-26/amazon-domain-error.spec.ts`

**Steps:**
  1. Enter URL without 'amazon.' domain
  2. Trigger validation
  3. Verify error message appears
  4. Check error specific (must contain amazon.)
  5. Verify aria-invalid and aria-describedby
  6. Check screen reader announces error

**Expected Results:**
  - Error message specific
  - Error linked to input
  - aria-invalid='true' present
  - Suggests correction
  - Screen reader announces error

#### 3.3. TC_A11Y_011: Flipkart domain validation error accessible

**File:** `tests/accessibility/SCRUM-26/flipkart-domain-error.spec.ts`

**Steps:**
  1. Enter URL without 'flipkart' domain
  2. Trigger validation
  3. Verify error appears
  4. Check error specific
  5. Verify ARIA attributes
  6. Check announcement

**Expected Results:**
  - Error message accessible
  - Error linked to input
  - aria-invalid='true' set
  - Error suggests fix
  - Announced by screen reader

#### 3.4. TC_A11Y_012: Error recovery announced

**File:** `tests/accessibility/SCRUM-26/error-recovery.spec.ts`

**Steps:**
  1. Trigger validation error
  2. Correct the input
  3. Verify error message disappears
  4. Check aria-invalid removed
  5. Verify success announced via aria-live

**Expected Results:**
  - Error clears when corrected
  - aria-invalid removed
  - aria-describedby updated
  - Success state announced
  - Visual error indicator removed

### 4. Product Details Page - Link Display

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_013: Contact AP section has heading

**File:** `tests/accessibility/SCRUM-26/contact-section-heading.spec.ts`

**Steps:**
  1. Navigate to Product Details page
  2. Locate 'Contact Assistive Partner' section
  3. Verify section has heading
  4. Check heading level appropriate
  5. Use screen reader heading navigation

**Expected Results:**
  - Section has descriptive heading
  - Heading level appropriate (H2 or H3)
  - Screen reader can navigate to section
  - Heading describes content
  - Semantic heading structure

#### 4.2. TC_A11Y_014: Amazon link has descriptive text

**File:** `tests/accessibility/SCRUM-26/amazon-link-text.spec.ts`

**Steps:**
  1. Locate 'Buy on Amazon' link
  2. Verify link text descriptive
  3. Check link purpose clear
  4. Verify not generic text
  5. Use screen reader to verify announcement

**Expected Results:**
  - Link has descriptive text
  - Link purpose clear from text alone
  - Not just 'Click here' or URL
  - Context clear without surrounding text
  - WCAG 2.4.4 Link Purpose satisfied

#### 4.3. TC_A11Y_015: Website link has descriptive text

**File:** `tests/accessibility/SCRUM-26/website-link-text.spec.ts`

**Steps:**
  1. Locate 'Visit Vendor Website' link
  2. Verify link text descriptive
  3. Check purpose clear
  4. Verify not just URL
  5. Check screen reader announcement

**Expected Results:**
  - Link text descriptive
  - Purpose clear from text
  - Not generic link text
  - Context clear
  - Screen reader announces clearly

#### 4.4. TC_A11Y_016: New tab opening announced

**File:** `tests/accessibility/SCRUM-26/new-tab-announcement.spec.ts`

**Steps:**
  1. Inspect external links
  2. Verify aria-label includes 'opens in new tab'
  3. Check target='_blank' attribute
  4. Verify rel='noopener noreferrer'
  5. Use screen reader to verify announcement

**Expected Results:**
  - Link has aria-label or title
  - Announces 'opens in new tab'
  - target='_blank' present
  - rel='noopener noreferrer' present
  - Screen reader announces new window

#### 4.5. TC_A11Y_017: External link icon accessible

**File:** `tests/accessibility/SCRUM-26/external-icon.spec.ts`

**Steps:**
  1. Locate external link icons
  2. Verify icons visible
  3. Check aria-hidden='true' on icons
  4. Verify text conveys external nature
  5. Use screen reader to verify icon ignored

**Expected Results:**
  - External icon visible
  - Icon has aria-hidden='true'
  - Icon meaning conveyed by text
  - Not relying on icon alone
  - Screen reader ignores decorative icon

#### 4.6. TC_A11Y_018: External links keyboard accessible

**File:** `tests/accessibility/SCRUM-26/links-keyboard-nav.spec.ts`

**Steps:**
  1. Tab to Contact AP section
  2. Tab through all external links
  3. Verify focus indicator on each
  4. Press Enter to activate link
  5. Verify new tab opens

**Expected Results:**
  - All links keyboard accessible
  - Tab reaches all links
  - Enter activates links
  - Focus indicators visible
  - Tab order logical

### 5. External Link Confirmation

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_019: Exit confirmation accessible

**File:** `tests/accessibility/SCRUM-26/exit-confirmation.spec.ts`

**Steps:**
  1. Click external link
  2. Verify confirmation appears
  3. Check message clear
  4. Verify keyboard accessible
  5. Check focus management

**Expected Results:**
  - Modal/tooltip appears on click
  - Warning message clear
  - Keyboard accessible
  - Focus moves to modal
  - Can proceed or cancel

#### 5.2. TC_A11Y_020: Confirmation modal has ARIA

**File:** `tests/accessibility/SCRUM-26/confirmation-modal-aria.spec.ts`

**Steps:**
  1. Trigger exit confirmation
  2. Verify role='dialog' or 'alertdialog'
  3. Check aria-modal='true'
  4. Verify aria-labelledby for title
  5. Check aria-describedby for message

**Expected Results:**
  - Modal has role='dialog' or 'alertdialog'
  - aria-modal='true' present
  - Modal has accessible name
  - Description provided
  - Focus trapped in modal

#### 5.3. TC_A11Y_021: Confirmation buttons accessible

**File:** `tests/accessibility/SCRUM-26/confirmation-buttons.spec.ts`

**Steps:**
  1. Open confirmation modal
  2. Tab to Continue button
  3. Tab to Cancel button
  4. Press Enter to activate
  5. Press Escape to close
  6. Verify focus returns to link

**Expected Results:**
  - Continue button accessible
  - Cancel button accessible
  - Tab cycles between buttons
  - Enter activates buttons
  - Escape closes modal

### 6. Broken Link Handling

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_022: Broken link placeholder accessible

**File:** `tests/accessibility/SCRUM-26/broken-link-message.spec.ts`

**Steps:**
  1. Navigate to product with broken link
  2. Verify placeholder message appears
  3. Check message reads 'Link currently unavailable'
  4. Verify no broken hyperlink shown
  5. Use screen reader to verify message

**Expected Results:**
  - Placeholder message visible
  - Message clear and helpful
  - Not showing broken link
  - Message has proper semantics
  - Screen reader announces message

#### 6.2. TC_A11Y_023: Unavailable link state indicated

**File:** `tests/accessibility/SCRUM-26/unavailable-link-state.spec.ts`

**Steps:**
  1. Locate unavailable link
  2. Verify visual indication
  3. Check text indicates unavailable
  4. Verify not relying on color alone
  5. Check screen reader announces state

**Expected Results:**
  - Unavailable links visually distinguished
  - Not just grayed out
  - Text indicates unavailability
  - Screen reader announces status
  - Not in tab order if non-functional

### 7. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_024: Link contrast meets WCAG AA

**File:** `tests/accessibility/SCRUM-26/link-contrast.spec.ts`

**Steps:**
  1. Measure link text contrast
  2. Verify 4.5:1 minimum for normal text
  3. Check visited link contrast
  4. Verify focus indicator 3:1 contrast
  5. Check links distinguishable

**Expected Results:**
  - Link text has 4.5:1 contrast
  - Visited links distinguishable
  - Focus indicator has 3:1 contrast
  - All text meets WCAG AA
  - Links distinguishable from body text

#### 7.2. TC_A11Y_025: Links not identified by color alone

**File:** `tests/accessibility/SCRUM-26/link-not-color-only.spec.ts`

**Steps:**
  1. Review link styling
  2. Verify underline or other indicator
  3. Check hover state has non-color change
  4. Verify focus state distinguishable
  5. Test in grayscale mode

**Expected Results:**
  - Links not identified by color alone
  - Underline or other indicator present
  - Hover state not color-only
  - Focus state not color-only
  - WCAG 1.4.1 Use of Color satisfied

#### 7.3. TC_A11Y_026: Links usable at 200% zoom

**File:** `tests/accessibility/SCRUM-26/links-zoom-200.spec.ts`

**Steps:**
  1. Zoom browser to 200%
  2. Verify all links visible
  3. Check no text truncation
  4. Verify links remain clickable
  5. Check no horizontal scrolling

**Expected Results:**
  - All links visible at 200%
  - No text truncation
  - Links remain clickable
  - No horizontal scrolling
  - Functionality preserved

### 8. Form Interaction and Submission

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_027: Multiple links manageable

**File:** `tests/accessibility/SCRUM-26/multiple-links.spec.ts`

**Steps:**
  1. Add Amazon link
  2. Add Flipkart link
  3. Add Website link
  4. Add Other link
  5. Verify all accessible
  6. Check remove buttons accessible

**Expected Results:**
  - Can add multiple links
  - Each link independently accessible
  - Remove buttons accessible
  - Tab order logical
  - Screen reader announces count

#### 8.2. TC_A11Y_028: Remove link button accessible

**File:** `tests/accessibility/SCRUM-26/remove-link-button.spec.ts`

**Steps:**
  1. Add a link
  2. Tab to remove button
  3. Verify button has accessible name
  4. Press Enter to remove
  5. Verify removal announced
  6. Check focus management

**Expected Results:**
  - Remove button has accessible name
  - Button keyboard accessible
  - Confirmation if needed
  - Removal announced via aria-live
  - Focus managed after removal

#### 8.3. TC_A11Y_029: Form submission accessible

**File:** `tests/accessibility/SCRUM-26/form-submission.spec.ts`

**Steps:**
  1. Fill link fields
  2. Tab to Save button
  3. Press Enter to submit
  4. Verify validation runs
  5. Check success/error announced
  6. Verify focus management

**Expected Results:**
  - Save button accessible
  - Validation runs on submit
  - Errors announced
  - Success announced
  - Focus managed appropriately

### 9. Admin Review Interface

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_030: Admin can review links accessibly

**File:** `tests/accessibility/SCRUM-26/admin-review-links.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to product review
  3. Locate external links section
  4. Verify links displayed
  5. Check edit/remove controls accessible
  6. Verify keyboard navigation works

**Expected Results:**
  - Links displayed in review interface
  - Links keyboard accessible
  - Edit/Remove controls accessible
  - Changes announced
  - All actions keyboard operable

### 10. Mobile and Responsive

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_031: Links accessible on mobile

**File:** `tests/accessibility/SCRUM-26/mobile-links.spec.ts`

**Steps:**
  1. Set viewport to mobile (375x667)
  2. Navigate to Product Details
  3. Verify links accessible
  4. Check touch targets adequate
  5. Verify no horizontal scrolling
  6. Test all link interactions

**Expected Results:**
  - Links accessible on mobile
  - Touch targets 44x44px minimum
  - No horizontal scrolling
  - All functionality available
  - Text readable without zoom

### 11. Screen Reader Specific

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_032: Links properly announced by screen reader

**File:** `tests/accessibility/SCRUM-26/screen-reader-links.spec.ts`

**Steps:**
  1. Use screen reader to navigate to Contact AP section
  2. Verify section announced
  3. Navigate through links
  4. Verify each link purpose announced
  5. Check external and new tab announced
  6. Verify link count if applicable

**Expected Results:**
  - Section announced as region or group
  - All links announced with purpose
  - External nature announced
  - New tab opening announced
  - Link count announced
