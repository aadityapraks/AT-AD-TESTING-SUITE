# SCRUM-85 Test Plan

## Application Overview

Test plan for SCRUM-85: PwD - Accessibility for Purchase Links. This covers semantic heading structure, accessible labels with destination and new tab indication, keyboard operability, focus management, contrast ratios, link states, and mobile touch targets.

## Test Scenarios

### 1. Semantic Structure

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Buy Online heading semantics

**File:** `tests/accessibility/scrum85-buy-online-heading.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Inspect Buy Online heading
  3. Verify h2 or h3 element

**Expected Results:**
  - Buy Online heading is semantic (h2 or h3)
  - Screen readers can navigate to heading

### 2. Accessible Labels

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify Amazon link accessible label

**File:** `tests/accessibility/scrum85-amazon-aria-label.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Inspect Amazon link
  3. Verify aria-label content

**Expected Results:**
  - Amazon link has aria-label describing action and destination
  - Label includes 'opens in new tab' indication
  - Example: 'Buy SmartWheelchair Pro X on Amazon – opens in new tab'

#### 2.2. Verify Flipkart link accessible label

**File:** `tests/accessibility/scrum85-flipkart-aria-label.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Inspect Flipkart link
  3. Verify aria-label content

**Expected Results:**
  - Flipkart link has aria-label describing action and destination
  - Label includes 'opens in new tab' indication
  - Example: 'Buy SmartWheelchair Pro X on Flipkart – opens in new tab'

#### 2.3. Verify external link icon accessibility

**File:** `tests/accessibility/scrum85-external-link-icons.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Inspect external link icons
  3. Verify hidden text or ARIA label

**Expected Results:**
  - External link icons have hidden text or ARIA label
  - Indication includes 'opens in new tab'

### 3. Keyboard Operability

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify purchase links keyboard operability

**File:** `tests/accessibility/scrum85-keyboard-operable.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Tab to purchase links
  3. Activate with Enter and Space keys

**Expected Results:**
  - All purchase links are reachable via Tab
  - Enter key activates links
  - Space key activates links

### 4. Focus Management

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify logical focus order

**File:** `tests/accessibility/scrum85-focus-order.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Tab through elements
  3. Verify focus order

**Expected Results:**
  - Focus order flows logically
  - Purchase links appear after price section
  - Purchase links appear before reviews or next section

#### 4.2. Verify focus indicator visibility and contrast

**File:** `tests/accessibility/scrum85-focus-indicators.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Tab to purchase links
  3. Verify focus indicators
  4. Check contrast ratio

**Expected Results:**
  - Focus indicators are clearly visible
  - Focus indicators meet 3:1 contrast ratio

### 5. Visual Contrast and States

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify link color contrast

**File:** `tests/accessibility/scrum85-link-contrast.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Check link color contrast ratios

**Expected Results:**
  - Links meet 4.5:1 contrast ratio against background

#### 5.2. Verify link states are visually distinct

**File:** `tests/accessibility/scrum85-link-states.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Test all link states
  3. Verify visual distinction

**Expected Results:**
  - Default state is visually distinct
  - Hover state is visually distinct
  - Focus state is visually distinct
  - Visited state is visually distinct

### 6. Disabled Links

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify disabled links are programmatically hidden

**File:** `tests/accessibility/scrum85-disabled-links-hidden.spec.ts`

**Steps:**
  1. Open Contact Vendor popup with disabled links
  2. Verify links are hidden from DOM or have aria-hidden
  3. Confirm not just grayed out

**Expected Results:**
  - Disabled links are programmatically hidden
  - Not just visually grayed out

### 7. Screen Reader Announcements

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify screen reader announcements

**File:** `tests/accessibility/scrum85-screen-reader-announcement.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Use screen reader on purchase links
  3. Verify announcements

**Expected Results:**
  - Screen reader announces link purpose
  - Screen reader announces context
  - Example: 'Buy on Amazon, link, opens in new tab'

### 8. Mobile Touch Targets

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify mobile touch target sizes

**File:** `tests/accessibility/scrum85-mobile-touch-targets.spec.ts`

**Steps:**
  1. Set viewport to mobile
  2. Open Contact Vendor popup
  3. Measure button target areas

**Expected Results:**
  - Button target areas are ≥ 44x44px on mobile
  - All purchase links meet touch target size

### 9. Navigation Behavior

**Seed:** `tests/seed.spec.ts`

#### 9.1. Verify no unexpected navigation or focus loss

**File:** `tests/accessibility/scrum85-no-unexpected-navigation.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Click purchase link
  3. Verify no unexpected behavior

**Expected Results:**
  - No unexpected navigation occurs
  - No focus loss occurs after clicking link
