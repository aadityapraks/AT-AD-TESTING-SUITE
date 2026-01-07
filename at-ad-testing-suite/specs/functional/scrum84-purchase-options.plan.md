# SCRUM-84 Test Plan

## Application Overview

Test plan for SCRUM-84: PwD - View Available Purchase Options. This covers Buy online section in Contact Vendor popup, marketplace links (Amazon, Flipkart, etc.), link validation, new tab behavior, and responsive layout.

## Test Scenarios

### 1. Contact Vendor Popup with Purchase Options

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Buy online section in popup

**File:** `tests/functional/scrum84-popup-buy-section.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click Contact Vendor button
  3. Verify popup opens with Buy online section

**Expected Results:**
  - Contact Vendor button opens popup
  - Buy online section is visible in popup

### 2. Purchase Options Display

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify purchase options list

**File:** `tests/functional/scrum84-purchase-options-list.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Verify all purchase options are displayed
  3. Check consistent styling

**Expected Results:**
  - Buy on Amazon option is displayed
  - Buy on Flipkart option is displayed
  - Other AP-added links are displayed
  - Options are displayed as buttons or links
  - Style is consistent across options

### 3. Link Validation

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify only valid links are displayed

**File:** `tests/functional/scrum84-valid-links-only.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Verify all displayed links are valid
  3. Confirm broken links are hidden

**Expected Results:**
  - Only valid, active links are displayed
  - Broken or inactive links are hidden automatically

### 4. Link Behavior

**Seed:** `tests/seed.spec.ts`

#### 4.1. Open Amazon link in new tab

**File:** `tests/functional/scrum84-amazon-new-tab.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Click Buy on Amazon
  3. Verify new tab opens
  4. Verify original tab remains

**Expected Results:**
  - Clicking Amazon link opens product page in new tab
  - Original tab remains open

#### 4.2. Open Flipkart link in new tab

**File:** `tests/functional/scrum84-flipkart-new-tab.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Click Buy on Flipkart
  3. Verify new tab opens
  4. Verify original tab remains

**Expected Results:**
  - Clicking Flipkart link opens product page in new tab
  - Original tab remains open

#### 4.3. Open other AP link in new tab

**File:** `tests/functional/scrum84-other-link-new-tab.spec.ts`

**Steps:**
  1. Open Contact Vendor popup
  2. Click other AP-added link
  3. Verify new tab opens

**Expected Results:**
  - Clicking other AP link opens in new tab
  - Original tab remains open

### 5. No Purchase Options

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify no purchase options message

**File:** `tests/functional/scrum84-no-options-message.spec.ts`

**Steps:**
  1. Navigate to product without purchase options
  2. Open Contact Vendor popup
  3. Verify message is displayed

**Expected Results:**
  - Message displays: 'No online purchase options currently available.'

### 6. Responsive Layout

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify mobile responsive layout

**File:** `tests/functional/scrum84-mobile-responsive.spec.ts`

**Steps:**
  1. Set viewport to mobile
  2. Open Contact Vendor popup
  3. Verify responsive layout

**Expected Results:**
  - Layout is responsive on mobile
  - Purchase options are accessible
  - Buttons/links are properly sized

#### 6.2. Verify tablet responsive layout

**File:** `tests/functional/scrum84-tablet-responsive.spec.ts`

**Steps:**
  1. Set viewport to tablet
  2. Open Contact Vendor popup
  3. Verify responsive layout

**Expected Results:**
  - Layout is responsive on tablet
  - Purchase options are accessible
  - Buttons/links are properly sized
