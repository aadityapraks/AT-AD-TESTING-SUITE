# SCRUM-28 Test Plan

## Application Overview

Test plan for validating optional product pricing functionality including single price, price range, custom label, currency formatting, real-time updates, catalog display, validation, and WCAG 2.1 AA compliance.

## Test Scenarios

### 1. Access Pricing Field

**Seed:** `tests/seed/vendor-product-list.spec.ts`

#### 1.1. Access Edit Pricing & Inventory option

**File:** `tests/functional/access-edit-pricing.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Management page
  3. Locate action column
  4. Click "Edit Pricing & Inventory"

**Expected Results:**
  - "Edit Pricing & Inventory" option is visible in action column
  - Option is clickable
  - Popup opens with pricing fields

### 2. Pricing Input Options

**Seed:** `tests/seed/vendor-edit-pricing.spec.ts`

#### 2.1. Select Single Price option

**File:** `tests/functional/select-single-price.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Pricing & Inventory popup
  3. Select "Single Price" from dropdown
  4. Enter amount in rupees
  5. Save

**Expected Results:**
  - Dropdown displays: Single Price, Price Range, Custom label
  - Single numeric field appears for amount
  - Amount is saved successfully
  - Currency format is applied

#### 2.2. Select Price Range option

**File:** `tests/functional/select-price-range.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Pricing & Inventory popup
  3. Select "Price Range" from dropdown
  4. Enter Min and Max values
  5. Save

**Expected Results:**
  - Two fields appear: Min and Max
  - Both fields accept numeric input
  - Range is saved successfully
  - Currency format is applied to both

#### 2.3. Select Custom Label option

**File:** `tests/functional/select-custom-label.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Pricing & Inventory popup
  3. Select "Custom label" from dropdown
  4. Enter text (e.g., "Contact for details")
  5. Save

**Expected Results:**
  - Text input field appears
  - Field accepts short text
  - Custom label is saved successfully
  - Text is displayed as entered

### 3. Currency Format

**Seed:** `tests/seed/vendor-edit-pricing.spec.ts`

#### 3.1. Verify INR currency formatting

**File:** `tests/functional/verify-inr-formatting.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Enter single price: 12000
  3. Save and view product details

**Expected Results:**
  - System applies ₹ symbol automatically
  - Price displays as: ₹12,000
  - Comma separators are formatted correctly
  - Format is consistent across pages

#### 3.2. Verify decimal formatting

**File:** `tests/functional/verify-decimal-formatting.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Enter price with decimals: 12000.50
  3. Save and view product details

**Expected Results:**
  - Decimal separator is formatted correctly
  - Price displays as: ₹12,000.50
  - Format is consistent
  - Precision is maintained

#### 3.3. Verify multi-currency support

**File:** `tests/functional/verify-multi-currency.spec.ts`

**Steps:**
  1. Login as international vendor
  2. Select currency (USD, GBP)
  3. Enter price
  4. Save and view

**Expected Results:**
  - Multi-currency is supported if enabled
  - Correct currency symbol is applied
  - Default is INR
  - Format matches selected currency

### 4. Validation

**Seed:** `tests/seed/vendor-edit-pricing.spec.ts`

#### 4.1. Validate numeric-only input

**File:** `tests/functional/validate-numeric-only.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Select Single Price
  3. Enter non-numeric characters: "12abc"
  4. Attempt to save

**Expected Results:**
  - Validation error appears
  - Error message: "Please enter a valid number or select a text option like 'Contact for Pricing.'"
  - Form does not submit
  - Field is highlighted

#### 4.2. Validate price range both fields required

**File:** `tests/functional/validate-range-both-fields.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Select Price Range
  3. Enter only Min value
  4. Attempt to save

**Expected Results:**
  - Validation error appears
  - Error indicates both Min and Max required
  - Form does not submit
  - Empty field is highlighted

#### 4.3. Validate custom label character limit

**File:** `tests/functional/validate-custom-label-limit.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Select Custom label
  3. Enter text exceeding 25 characters
  4. Attempt to save

**Expected Results:**
  - Character limit is enforced at 25
  - Validation error appears if exceeded
  - Form does not submit
  - Character counter is displayed

### 5. Display on PwD Product Details Page

**Seed:** `tests/seed/pwd-product-details.spec.ts`

#### 5.1. Display single price

**File:** `tests/functional/display-single-price.spec.ts`

**Steps:**
  1. AP adds single price: ₹12,000
  2. Login as PwD user
  3. Navigate to product details page
  4. Locate Pricing Information section

**Expected Results:**
  - "Pricing Information" section is visible
  - Price displays as: "Price: ₹12,000"
  - Format is clear and readable
  - Section is properly positioned

#### 5.2. Display price range

**File:** `tests/functional/display-price-range.spec.ts`

**Steps:**
  1. AP adds price range: ₹10,000 - ₹15,000
  2. Login as PwD user
  3. Navigate to product details page
  4. Locate Pricing Information section

**Expected Results:**
  - Price displays as: "Price Range: ₹10,000 – ₹15,000"
  - Range is clearly formatted
  - Dash separator is used
  - Both values are visible

#### 5.3. Display custom label

**File:** `tests/functional/display-custom-label.spec.ts`

**Steps:**
  1. AP adds custom label: "Contact for details"
  2. Login as PwD user
  3. Navigate to product details page
  4. Locate Pricing Information section

**Expected Results:**
  - Custom label displays as: "Pricing: Contact for details"
  - Text is clearly visible
  - Format is consistent
  - Message is readable

#### 5.4. Hide section when no price provided

**File:** `tests/functional/hide-pricing-section.spec.ts`

**Steps:**
  1. AP does not add pricing
  2. Login as PwD user
  3. Navigate to product details page
  4. Check for Pricing Information section

**Expected Results:**
  - Pricing Information section is hidden
  - No empty placeholder is shown
  - Page displays cleanly
  - Layout is not affected

### 6. Display on Catalog Card

**Seed:** `tests/seed/pwd-catalog.spec.ts`

#### 6.1. Display starting price on catalog card

**File:** `tests/functional/catalog-card-starting-price.spec.ts`

**Steps:**
  1. AP adds single price: ₹10,000
  2. Login as PwD user
  3. Browse catalog
  4. View product card

**Expected Results:**
  - Starting price displays in small text
  - Format: "Starting at ₹10,000" or "₹10,000 approx."
  - Text is clearly visible
  - Placement is appropriate

#### 6.2. Display price range on catalog card

**File:** `tests/functional/catalog-card-price-range.spec.ts`

**Steps:**
  1. AP adds price range: ₹10,000 - ₹15,000
  2. Login as PwD user
  3. Browse catalog
  4. View product card

**Expected Results:**
  - Starting price or range is displayed
  - Format is concise
  - Text is readable
  - Card layout is clean

#### 6.3. No placeholder when price is blank

**File:** `tests/functional/catalog-card-no-placeholder.spec.ts`

**Steps:**
  1. AP does not add pricing
  2. Login as PwD user
  3. Browse catalog
  4. View product card

**Expected Results:**
  - No empty placeholder appears
  - Card displays cleanly without pricing
  - Layout is not affected
  - Other information is visible

### 7. Updating Pricing

**Seed:** `tests/seed/vendor-product-list.spec.ts`

#### 7.1. Update existing price

**File:** `tests/functional/update-existing-price.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Pricing & Inventory for product with price
  3. Change price value
  4. Save changes

**Expected Results:**
  - Price is updated successfully
  - Changes are saved
  - New price is displayed
  - Old price is replaced

#### 7.2. Remove pricing

**File:** `tests/functional/remove-pricing.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Pricing & Inventory for product with price
  3. Clear pricing fields
  4. Save changes

**Expected Results:**
  - Pricing is removed successfully
  - Pricing section is hidden on product page
  - Product remains publishable
  - Removal is logged

#### 7.3. Verify real-time catalog update

**File:** `tests/functional/realtime-catalog-update.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Update product pricing
  3. Save changes
  4. Login as PwD user
  5. View product immediately

**Expected Results:**
  - Updates do not trigger Pending Review status
  - Changes are visible on live catalog in real time
  - No delay in display
  - Price is updated immediately

### 8. Audit Trail

**Seed:** `tests/seed/admin-audit-logs.spec.ts`

#### 8.1. Log price addition

**File:** `tests/functional/audit-log-price-addition.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Add pricing to product
  3. Save changes
  4. Login as admin
  5. View audit logs

**Expected Results:**
  - Price addition is logged
  - Log includes Vendor ID and Product ID
  - Log includes date and time of change
  - Old value (null) and new value are recorded

#### 8.2. Log price update

**File:** `tests/functional/audit-log-price-update.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Update existing price
  3. Save changes
  4. Login as admin
  5. View audit logs

**Expected Results:**
  - Price update is logged
  - Log includes old value and new value
  - Timestamp is recorded
  - Change is traceable

#### 8.3. Export pricing change logs

**File:** `tests/functional/export-pricing-logs.spec.ts`

**Steps:**
  1. Multiple APs update pricing
  2. Login as admin
  3. Export pricing change logs

**Expected Results:**
  - Admin can export pricing logs
  - Export includes all changes
  - Data is accurate and complete
  - Export format is usable

### 9. Accessibility and UI Standards

**Seed:** `tests/seed/vendor-edit-pricing.spec.ts`

#### 9.1. Verify clear field labels

**File:** `tests/functional/verify-field-labels.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Pricing & Inventory popup
  3. Check all field labels

**Expected Results:**
  - All input fields have clear labels
  - Labels are descriptive
  - Labels are accessible to screen readers
  - WCAG 2.1 AA compliance

#### 9.2. Verify currency symbols and spacing

**File:** `tests/functional/verify-currency-spacing.spec.ts`

**Steps:**
  1. Login as PwD user
  2. View product with pricing
  3. Check currency symbol display

**Expected Results:**
  - Currency symbols are properly displayed
  - Text spacing is appropriate
  - Format is readable
  - Visual presentation is clean

#### 9.3. Verify accessible tooltips

**File:** `tests/functional/verify-pricing-tooltips.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Pricing & Inventory popup
  3. Hover over help icons

**Expected Results:**
  - Tooltip displays: "Price is optional. Provide approximate or range if available."
  - Tooltips are accessible
  - Help text is clear
  - Guidance is actionable

#### 9.4. Verify keyboard navigation

**File:** `tests/functional/pricing-keyboard-navigation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Pricing & Inventory popup
  3. Navigate using Tab key
  4. Enter values and save using keyboard

**Expected Results:**
  - All fields are navigable via keyboard
  - Tab order is logical
  - Enter/Space activates controls
  - Focus indicators are visible

#### 9.5. Verify assistive technology compatibility

**File:** `tests/functional/pricing-assistive-tech.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Use screen reader to navigate pricing form
  3. Test all fields and controls

**Expected Results:**
  - All fields are compatible with assistive technologies
  - Screen reader announces labels and values
  - ARIA attributes are present
  - Navigation is intuitive

### 10. Error Handling

**Seed:** `tests/seed/vendor-edit-pricing.spec.ts`

#### 10.1. Handle invalid numeric input

**File:** `tests/functional/handle-invalid-numeric.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Enter invalid value: "12abc"
  3. Attempt to save

**Expected Results:**
  - Error message appears
  - Message: "Please enter a valid number or select a text option like 'Contact for Pricing.'"
  - Form prevents submission
  - Invalid value is highlighted

#### 10.2. Prevent submission with errors

**File:** `tests/functional/prevent-submission-errors.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Enter invalid data in pricing fields
  3. Attempt to save

**Expected Results:**
  - Form does not submit
  - Validation errors are displayed
  - User can correct errors
  - Save is blocked until valid

### 11. Optional Field Behavior

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 11.1. Publish product without pricing

**File:** `tests/functional/publish-without-pricing.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Create product without pricing
  3. Submit for approval
  4. Admin approves

**Expected Results:**
  - Product is fully publishable without pricing
  - No validation error for missing price
  - Product is discoverable in catalog
  - Pricing is truly optional

#### 11.2. Verify no missing field error

**File:** `tests/functional/no-missing-price-error.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Leave pricing field blank
  3. Save product

**Expected Results:**
  - No "missing field" validation appears
  - No error for blank pricing
  - Product saves successfully
  - Field is treated as optional
