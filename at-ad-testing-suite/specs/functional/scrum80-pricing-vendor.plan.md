# SCRUM-80 Test Plan

## Application Overview

Test plan for SCRUM-80: PwD - View Product Pricing and Vendor Information. This covers pricing display, Contact Vendor popup with vendor details, interest tracking, and comprehensive dialog accessibility compliance.

## Test Scenarios

### 1. Pricing Display

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify product price display

**File:** `tests/functional/scrum80-price-display.spec.ts`

**Steps:**
  1. Navigate to Product Details Page with pricing
  2. Verify price is displayed below product name

**Expected Results:**
  - Price is displayed clearly below product name
  - Currency symbol is shown
  - Price uses semantic markup

#### 1.2. Verify placeholder when price unavailable

**File:** `tests/functional/scrum80-no-price-placeholder.spec.ts`

**Steps:**
  1. Navigate to Product Details Page without pricing
  2. Verify placeholder text is displayed

**Expected Results:**
  - Placeholder text appears: 'Contact vendor for pricing'

### 2. Contact Vendor Popup

**Seed:** `tests/seed.spec.ts`

#### 2.1. Open Contact Vendor popup

**File:** `tests/functional/scrum80-contact-vendor-click.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click Contact Vendor button
  3. Verify popup opens

**Expected Results:**
  - Popup opens with vendor details
  - Click is tracked for analytics

#### 2.2. Verify vendor details in popup

**File:** `tests/functional/scrum80-vendor-details.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Verify all vendor details are present

**Expected Results:**
  - Vendor name is displayed
  - Vendor logo is shown (if available)
  - Phone numbers are displayed
  - Email is displayed
  - Address is displayed
  - Website is displayed

### 3. Popup Interactions

**Seed:** `tests/seed.spec.ts`

#### 3.1. Close popup via close button

**File:** `tests/functional/scrum80-close-popup.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Click close button
  3. Verify popup closes and focus returns

**Expected Results:**
  - Clicking close button closes popup
  - Focus returns to Contact Vendor button

#### 3.2. Close popup via Esc key

**File:** `tests/functional/scrum80-esc-close.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Press Esc key
  3. Verify popup closes and focus returns

**Expected Results:**
  - Pressing Esc closes popup
  - Focus returns to Contact Vendor button

### 4. Pricing Accessibility

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify price semantic markup

**File:** `tests/accessibility/scrum80-price-semantic.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Inspect price element
  3. Verify <data> element usage

**Expected Results:**
  - Price uses <data> element
  - Currency symbol is properly marked up

#### 4.2. Verify info note contrast

**File:** `tests/accessibility/scrum80-info-note-contrast.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Locate info note
  3. Check color contrast

**Expected Results:**
  - Info note has readable color
  - Info note meets 4.5:1 contrast ratio

#### 4.3. Verify vendor logo accessibility

**File:** `tests/accessibility/scrum80-vendor-logo-alt.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Check vendor logo ALT attribute

**Expected Results:**
  - Vendor logo has ALT text
  - Decorative logos have aria-hidden='true'

#### 4.4. Verify keyboard accessibility and tab order

**File:** `tests/accessibility/scrum80-keyboard-tab-order.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Tab through all elements
  3. Verify logical order and visible focus

**Expected Results:**
  - All elements are keyboard reachable
  - Tab order is logical
  - Focus is visible throughout

### 5. Dialog Semantics

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify dialog ARIA attributes

**File:** `tests/accessibility/scrum80-dialog-semantics.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Verify role and aria attributes

**Expected Results:**
  - Dialog has role='dialog'
  - Dialog has aria-modal='true'
  - Dialog has visible title
  - Title is referenced by aria-labelledby

#### 5.2. Verify dialog accessible description

**File:** `tests/accessibility/scrum80-dialog-description.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Check aria-describedby attribute

**Expected Results:**
  - Dialog has aria-describedby
  - Description summarizes dialog content

### 6. Dialog Focus Management

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify initial focus on dialog open

**File:** `tests/accessibility/scrum80-dialog-initial-focus.spec.ts`

**Steps:**
  1. Click Contact Vendor button
  2. Verify focus moves to first control in dialog

**Expected Results:**
  - Focus moves to first focusable control in dialog
  - First control is close button or heading link

#### 6.2. Verify focus trap in dialog

**File:** `tests/accessibility/scrum80-focus-trap.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Tab through all controls
  3. Verify focus stays within dialog

**Expected Results:**
  - Tab cycles through dialog controls only
  - Shift+Tab cycles backward through dialog controls
  - Focus is trapped inside dialog

#### 6.3. Verify focus returns on dialog close

**File:** `tests/accessibility/scrum80-focus-return.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Close dialog
  3. Verify focus returns to trigger button

**Expected Results:**
  - Focus returns to Contact Vendor button
  - Focus is properly restored

### 7. Dialog Keyboard Operability

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify all dialog controls are keyboard operable

**File:** `tests/accessibility/scrum80-dialog-keyboard-controls.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Navigate with keyboard only
  3. Verify all controls are operable

**Expected Results:**
  - All interactive elements are keyboard operable
  - Close, links, buttons are reachable with keyboard

### 8. Dialog Content Structure

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify dialog semantic HTML structure

**File:** `tests/accessibility/scrum80-dialog-semantic-html.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Inspect HTML structure
  3. Verify semantic elements and links

**Expected Results:**
  - Dialog uses semantic HTML (headings, paragraphs, lists, buttons)
  - Phone links use <a href='tel:...'>
  - Email links use <a href='mailto:...'>
  - Content is in meaningful order

### 9. Dialog Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 9.1. Verify dialog contrast and touch targets

**File:** `tests/accessibility/scrum80-dialog-contrast-targets.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Check text contrast
  3. Measure touch target sizes

**Expected Results:**
  - Text meets 4.5:1 contrast ratio
  - Buttons have visible focus indicators
  - Controls meet 44x44px touch target size

#### 9.2. Verify dialog icon accessibility

**File:** `tests/accessibility/scrum80-dialog-icons.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Check icons for accessible labels

**Expected Results:**
  - Contact method icons have visually hidden text or accessible labels

### 10. Dialog Behavior

**Seed:** `tests/seed.spec.ts`

#### 10.1. Verify non-disruptive dialog behavior

**File:** `tests/accessibility/scrum80-dialog-non-disruptive.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Verify no navigation or reload
  3. Verify page content is inert

**Expected Results:**
  - No unexpected navigation occurs
  - No page reload occurs
  - Page content behind modal is inert

#### 10.2. Verify no time-limited content

**File:** `tests/accessibility/scrum80-dialog-timed-content.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Check for timed content
  3. Verify controls if present

**Expected Results:**
  - No time-limited content in dialog
  - Or user controls to extend time are available

### 11. Dialog Mobile Accessibility

**Seed:** `tests/seed.spec.ts`

#### 11.1. Verify dialog mobile usability

**File:** `tests/accessibility/scrum80-dialog-mobile.spec.ts`

**Steps:**
  1. Set viewport to mobile
  2. Open Contact Vendor popup
  3. Verify touch targets and scrolling
  4. Check viewport adaptation

**Expected Results:**
  - Controls are large enough to tap
  - Scrolling works within dialog if content exceeds viewport
  - Close control remains visible
  - Dialog adapts to viewport without clipping
