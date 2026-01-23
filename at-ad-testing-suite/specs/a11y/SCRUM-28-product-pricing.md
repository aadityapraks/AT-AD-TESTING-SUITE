# SCRUM-28 Accessibility Test Plan: Product Pricing

## Application Overview

Comprehensive accessibility test plan for Assistive Partner product pricing feature ensuring WCAG 2.1 AA compliance. Tests cover Edit Pricing & Inventory modal, pricing input options (Single Price, Price Range, Custom Label), form validation, currency formatting, display on product details page, catalog cards, keyboard navigation, screen reader support, and error handling.

## Test Scenarios

### 1. Edit Pricing & Inventory Modal Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Edit Pricing button accessible

**File:** `tests/accessibility/scrum28-pricing/edit-button.spec.ts`

**Steps:**
  1. Navigate to Product Management page
  2. Locate 'Edit Pricing & Inventory' button in action column
  3. Tab to button using keyboard
  4. Verify focus indicator visible
  5. Check button has accessible name
  6. Press Enter to activate

**Expected Results:**
  - Button keyboard accessible
  - Button has accessible name 'Edit Pricing & Inventory'
  - Enter/Space activates button
  - Focus indicator visible with 3:1 contrast
  - Modal opens on activation

#### 1.2. TC_A11Y_002: Modal has proper ARIA attributes

**File:** `tests/accessibility/scrum28-pricing/modal-aria.spec.ts`

**Steps:**
  1. Open Edit Pricing & Inventory modal
  2. Verify modal has role='dialog'
  3. Check aria-modal='true'
  4. Verify aria-labelledby points to modal title
  5. Check focus moves to modal
  6. Use screen reader to verify announcement

**Expected Results:**
  - Modal has role='dialog'
  - aria-modal='true' present
  - Modal has accessible name
  - Focus trapped within modal
  - Screen reader announces modal opening

#### 1.3. TC_A11Y_003: Modal keyboard navigation

**File:** `tests/accessibility/scrum28-pricing/modal-keyboard.spec.ts`

**Steps:**
  1. Open modal
  2. Tab through all form fields
  3. Verify tab order logical
  4. Press Escape key
  5. Verify modal closes
  6. Check focus returns to trigger button

**Expected Results:**
  - All fields keyboard accessible
  - Tab order follows visual layout
  - Escape closes modal
  - Focus returns to Edit button
  - No keyboard traps

### 2. Pricing Type Dropdown

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_004: Pricing dropdown accessible

**File:** `tests/accessibility/scrum28-pricing/dropdown-accessible.spec.ts`

**Steps:**
  1. Open Edit Pricing modal
  2. Locate 'Price Range' dropdown
  3. Tab to dropdown
  4. Verify focus indicator visible
  5. Press Enter/Space to open
  6. Use Arrow keys to navigate options
  7. Press Enter to select

**Expected Results:**
  - Dropdown keyboard accessible
  - Has accessible name 'Price Range'
  - Arrow keys navigate options
  - Enter/Space opens dropdown
  - Selected option announced
  - Focus indicator visible

#### 2.2. TC_A11Y_005: Dropdown options announced

**File:** `tests/accessibility/scrum28-pricing/dropdown-screen-reader.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to dropdown
  3. Open dropdown
  4. Navigate through options
  5. Verify each option announced
  6. Check option count announced

**Expected Results:**
  - Dropdown role announced
  - Options: Single Price, Price Range, Custom Label
  - Selected option announced
  - Option count announced (1 of 3)
  - Expanded/collapsed state announced

### 3. Single Price Input

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_006: Single price field has label

**File:** `tests/accessibility/scrum28-pricing/single-price-label.spec.ts`

**Steps:**
  1. Select 'Single Price' option
  2. Verify price input field appears
  3. Check field has visible label
  4. Verify label associated with input
  5. Check currency symbol (₹) visible
  6. Verify help text present

**Expected Results:**
  - Field has visible label
  - Label programmatically associated (for/id)
  - Currency symbol visible
  - Help text: 'Enter amount in rupees'
  - Field has aria-describedby for help text

#### 3.2. TC_A11Y_007: Single price validation accessible

**File:** `tests/accessibility/scrum28-pricing/single-price-validation.spec.ts`

**Steps:**
  1. Enter invalid value (e.g., '12abc')
  2. Trigger validation
  3. Verify error message appears
  4. Check aria-invalid='true'
  5. Verify aria-describedby links error
  6. Use screen reader to verify announcement

**Expected Results:**
  - Error message appears inline
  - Error: 'Please enter a valid number'
  - aria-invalid='true' on input
  - Error linked with aria-describedby
  - Screen reader announces error

### 4. Price Range Inputs

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_008: Price range fields have labels

**File:** `tests/accessibility/scrum28-pricing/price-range-labels.spec.ts`

**Steps:**
  1. Select 'Price Range' option
  2. Verify Min and Max fields appear
  3. Check both fields have labels
  4. Verify labels associated
  5. Check currency symbols visible
  6. Verify help text present

**Expected Results:**
  - Min field has label 'Minimum Price'
  - Max field has label 'Maximum Price'
  - Labels programmatically associated
  - Currency symbols (₹) visible
  - Help text explains range requirement

#### 4.2. TC_A11Y_009: Price range validation accessible

**File:** `tests/accessibility/scrum28-pricing/price-range-validation.spec.ts`

**Steps:**
  1. Enter only Min value
  2. Leave Max empty
  3. Trigger validation
  4. Verify error on Max field
  5. Check aria-invalid='true'
  6. Verify error message clear

**Expected Results:**
  - Error: 'Both minimum and maximum required'
  - aria-invalid='true' on empty field
  - Error linked to field
  - Screen reader announces error
  - Form prevents submission

#### 4.3. TC_A11Y_010: Price range logical validation

**File:** `tests/accessibility/scrum28-pricing/price-range-logic.spec.ts`

**Steps:**
  1. Enter Max < Min (e.g., Min: 15000, Max: 10000)
  2. Trigger validation
  3. Verify error appears
  4. Check error explains issue
  5. Verify aria-invalid on both fields

**Expected Results:**
  - Error: 'Maximum must be greater than minimum'
  - aria-invalid='true' on both fields
  - Error clear and actionable
  - Screen reader announces error
  - Suggests correction

### 5. Custom Label Input

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_011: Custom label field accessible

**File:** `tests/accessibility/scrum28-pricing/custom-label-field.spec.ts`

**Steps:**
  1. Select 'Custom Label' option
  2. Verify text input appears
  3. Check field has label
  4. Verify character counter visible
  5. Check maxlength attribute
  6. Verify help text present

**Expected Results:**
  - Field has label 'Custom Pricing Label'
  - Label associated with input
  - Character counter: '0/25 characters'
  - maxlength='25' attribute present
  - Help text: 'e.g., Contact for details'

#### 5.2. TC_A11Y_012: Custom label character limit accessible

**File:** `tests/accessibility/scrum28-pricing/custom-label-limit.spec.ts`

**Steps:**
  1. Type in custom label field
  2. Verify character count updates
  3. Check aria-live announces count
  4. Type to reach 25 characters
  5. Verify limit enforced
  6. Check warning when approaching limit

**Expected Results:**
  - Character count updates dynamically
  - Count announced via aria-live='polite'
  - Warning at 20 characters
  - Input stops at 25 characters
  - Visual indicator when at limit

### 6. Currency Formatting

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_013: Currency symbol accessible

**File:** `tests/accessibility/scrum28-pricing/currency-symbol.spec.ts`

**Steps:**
  1. Enter price value
  2. Verify currency symbol (₹) displays
  3. Check symbol has aria-label
  4. Verify symbol not in input value
  5. Use screen reader to verify announcement

**Expected Results:**
  - Currency symbol visible
  - Symbol has aria-label='Rupees'
  - Symbol positioned clearly
  - Screen reader announces 'Rupees'
  - Symbol not part of input value

#### 6.2. TC_A11Y_014: Formatted price display accessible

**File:** `tests/accessibility/scrum28-pricing/price-format-display.spec.ts`

**Steps:**
  1. Enter price: 12000
  2. Verify formatted as ₹12,000
  3. Check comma separators visible
  4. Verify screen reader reads correctly
  5. Check format consistent

**Expected Results:**
  - Price formatted with commas
  - Display: ₹12,000
  - Screen reader: 'Twelve thousand rupees'
  - Format consistent across UI
  - Decimal handling correct

### 7. Form Submission and Save

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_015: Save button accessible

**File:** `tests/accessibility/scrum28-pricing/save-button.spec.ts`

**Steps:**
  1. Fill pricing information
  2. Tab to Save button
  3. Verify focus indicator visible
  4. Check button has accessible name
  5. Press Enter to submit
  6. Verify success announced

**Expected Results:**
  - Save button keyboard accessible
  - Button has accessible name 'Save'
  - Enter/Space activates button
  - Focus indicator visible
  - Success message announced

#### 7.2. TC_A11Y_016: Cancel button accessible

**File:** `tests/accessibility/scrum28-pricing/cancel-button.spec.ts`

**Steps:**
  1. Make changes to pricing
  2. Tab to Cancel button
  3. Press Enter to cancel
  4. Verify modal closes
  5. Check changes not saved
  6. Verify focus returns

**Expected Results:**
  - Cancel button accessible
  - Enter/Space activates cancel
  - Modal closes on cancel
  - Changes discarded
  - Focus returns to Edit button

#### 7.3. TC_A11Y_017: Success message accessible

**File:** `tests/accessibility/scrum28-pricing/success-message.spec.ts`

**Steps:**
  1. Save pricing changes
  2. Verify success toast appears
  3. Check toast has role='status'
  4. Verify aria-live announces
  5. Check message clear
  6. Verify toast dismissible

**Expected Results:**
  - Success toast announced
  - Toast has role='status' or aria-live='polite'
  - Message: 'Pricing updated successfully'
  - User doesn't need to find message
  - Toast auto-dismisses or has close button

### 8. Product Details Page Display

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_018: Pricing section has heading

**File:** `tests/accessibility/scrum28-pricing/pricing-section-heading.spec.ts`

**Steps:**
  1. Navigate to Product Details page
  2. Locate 'Pricing Information' section
  3. Verify section has heading
  4. Check heading level appropriate
  5. Use screen reader heading navigation
  6. Verify section accessible

**Expected Results:**
  - Section has heading 'Pricing Information'
  - Heading level H2 or H3
  - Screen reader can navigate to section
  - Heading describes content
  - Section near top of page

#### 8.2. TC_A11Y_019: Single price display accessible

**File:** `tests/accessibility/scrum28-pricing/single-price-display.spec.ts`

**Steps:**
  1. View product with single price
  2. Verify price displays: 'Price: ₹12,000'
  3. Check currency symbol accessible
  4. Verify text has 4.5:1 contrast
  5. Use screen reader to verify announcement

**Expected Results:**
  - Price displays clearly
  - Currency symbol has aria-label
  - Text has 4.5:1 contrast
  - Screen reader: 'Price: Twelve thousand rupees'
  - Format consistent

#### 8.3. TC_A11Y_020: Price range display accessible

**File:** `tests/accessibility/scrum28-pricing/price-range-display.spec.ts`

**Steps:**
  1. View product with price range
  2. Verify displays: 'Price Range: ₹10,000 – ₹15,000'
  3. Check dash/hyphen accessible
  4. Verify screen reader announcement
  5. Check contrast sufficient

**Expected Results:**
  - Range displays clearly
  - Dash character accessible
  - Screen reader: 'Price range: Ten thousand to fifteen thousand rupees'
  - Text has 4.5:1 contrast
  - Format clear

#### 8.4. TC_A11Y_021: Custom label display accessible

**File:** `tests/accessibility/scrum28-pricing/custom-label-display.spec.ts`

**Steps:**
  1. View product with custom label
  2. Verify displays: 'Pricing: Contact for details'
  3. Check text readable
  4. Verify screen reader announcement
  5. Check contrast sufficient

**Expected Results:**
  - Custom label displays clearly
  - Text readable and clear
  - Screen reader announces label
  - Text has 4.5:1 contrast
  - No confusion with other content

#### 8.5. TC_A11Y_022: Hidden section when no price

**File:** `tests/accessibility/scrum28-pricing/no-price-hidden.spec.ts`

**Steps:**
  1. View product without pricing
  2. Verify 'Pricing Information' section not displayed
  3. Check no empty section shown
  4. Use screen reader to verify section absent
  5. Verify page structure valid

**Expected Results:**
  - Section hidden when no price
  - No empty section displayed
  - No placeholder text shown
  - Page structure remains valid
  - Screen reader doesn't announce empty section

### 9. Catalog Card Display

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_023: Catalog card price accessible

**File:** `tests/accessibility/scrum28-pricing/catalog-card-price.spec.ts`

**Steps:**
  1. View catalog listing
  2. Locate product card with price
  3. Verify price displays: 'Starting at ₹10,000'
  4. Check text size readable
  5. Verify contrast sufficient
  6. Use screen reader to verify

**Expected Results:**
  - Price displays on card
  - Text: 'Starting at ₹10,000' or '₹12,000 approx.'
  - Text readable (minimum 12px)
  - Text has 4.5:1 contrast
  - Screen reader announces price

#### 9.2. TC_A11Y_024: Catalog card no empty placeholder

**File:** `tests/accessibility/scrum28-pricing/catalog-card-no-placeholder.spec.ts`

**Steps:**
  1. View catalog listing
  2. Locate product card without price
  3. Verify no price text shown
  4. Check no empty space
  5. Verify card layout clean

**Expected Results:**
  - No price text when blank
  - No empty placeholder
  - Card layout remains clean
  - No visual gap
  - Other card content accessible

### 10. Error Handling

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_025: Invalid numeric error accessible

**File:** `tests/accessibility/scrum28-pricing/invalid-numeric-error.spec.ts`

**Steps:**
  1. Enter invalid value: '12abc'
  2. Trigger validation
  3. Verify error appears
  4. Check aria-invalid='true'
  5. Verify error linked to field
  6. Use screen reader to verify

**Expected Results:**
  - Error: 'Please enter a valid number'
  - aria-invalid='true' on input
  - Error linked with aria-describedby
  - Screen reader announces error
  - Error suggests correction

#### 10.2. TC_A11Y_026: Form submission prevented on error

**File:** `tests/accessibility/scrum28-pricing/form-submission-error.spec.ts`

**Steps:**
  1. Enter invalid data
  2. Click Save button
  3. Verify form doesn't submit
  4. Check error summary appears
  5. Verify focus moves to error
  6. Check all errors listed

**Expected Results:**
  - Form submission prevented
  - Error summary at top
  - Focus moves to error summary
  - All errors listed
  - Links jump to fields with errors

### 11. Keyboard Navigation

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_027: Tab order logical

**File:** `tests/accessibility/scrum28-pricing/tab-order.spec.ts`

**Steps:**
  1. Open Edit Pricing modal
  2. Tab from first field
  3. Verify tab order follows visual layout
  4. Check all fields reachable
  5. Verify no keyboard traps
  6. Tab to Save and Cancel buttons

**Expected Results:**
  - Tab order: Dropdown → Price fields → Save → Cancel
  - Order follows visual layout
  - All interactive elements reachable
  - No keyboard traps
  - Focus visible throughout

#### 11.2. TC_A11Y_028: Focus indicators visible

**File:** `tests/accessibility/scrum28-pricing/focus-indicators.spec.ts`

**Steps:**
  1. Tab through all form elements
  2. Verify focus indicator on each
  3. Check focus has 3:1 contrast
  4. Verify focus not obscured
  5. Check indicator thickness

**Expected Results:**
  - All focusable elements show focus
  - Focus indicators have 3:1 contrast
  - Focus visible and not obscured
  - Indicator thickness adequate (2px minimum)
  - WCAG 2.4.7 satisfied

### 12. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 12.1. TC_A11Y_029: Text contrast meets WCAG AA

**File:** `tests/accessibility/scrum28-pricing/text-contrast.spec.ts`

**Steps:**
  1. Measure contrast for all text
  2. Check labels have 4.5:1
  3. Check help text has 4.5:1
  4. Verify error text has 4.5:1
  5. Check currency symbols

**Expected Results:**
  - Labels have 4.5:1 contrast
  - Help text has 4.5:1 contrast
  - Error text has 4.5:1 contrast
  - Currency symbols have 4.5:1 contrast
  - All text meets WCAG AA

#### 12.2. TC_A11Y_030: Form scales to 200% zoom

**File:** `tests/accessibility/scrum28-pricing/zoom-200.spec.ts`

**Steps:**
  1. Zoom browser to 200%
  2. Open Edit Pricing modal
  3. Verify all fields visible
  4. Check no text truncation
  5. Verify no horizontal scrolling
  6. Check all functionality works

**Expected Results:**
  - All content visible at 200%
  - No text truncation
  - Fields remain usable
  - No horizontal scrolling
  - Functionality preserved

#### 12.3. TC_A11Y_031: Mobile responsive accessible

**File:** `tests/accessibility/scrum28-pricing/mobile-responsive.spec.ts`

**Steps:**
  1. Set viewport to mobile (375x667)
  2. Open Edit Pricing modal
  3. Verify all fields accessible
  4. Check touch targets adequate
  5. Test all functionality

**Expected Results:**
  - Modal accessible on mobile
  - Touch targets 44x44px minimum
  - No horizontal scrolling
  - All fields usable
  - Buttons accessible

### 13. Screen Reader Compatibility

**Seed:** `tests/seed.spec.ts`

#### 13.1. TC_A11Y_032: Form fields announced correctly

**File:** `tests/accessibility/scrum28-pricing/screen-reader-fields.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate through form
  3. Verify all labels announced
  4. Check field types announced
  5. Verify help text announced
  6. Check required fields announced

**Expected Results:**
  - All labels announced
  - Field types announced (textbox, combobox)
  - Help text announced
  - Optional status announced
  - Currency symbols announced

#### 13.2. TC_A11Y_033: Dynamic content announced

**File:** `tests/accessibility/scrum28-pricing/screen-reader-dynamic.spec.ts`

**Steps:**
  1. Change pricing type dropdown
  2. Verify field changes announced
  3. Enter invalid value
  4. Verify error announced
  5. Save changes
  6. Verify success announced

**Expected Results:**
  - Field changes announced via aria-live
  - Errors announced immediately
  - Success message announced
  - Character count updates announced
  - All dynamic content accessible
