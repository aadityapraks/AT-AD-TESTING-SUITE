# SCRUM-86 Test Plan

## Application Overview

Test plan for SCRUM-86: PwD - Handle Missing, Unsafe, or Disabled Links. This covers automatic hiding of missing links, placeholder messages for unsafe/expired links, admin logging, Contact Vendor fallback, and accessibility compliance for error states.

## Test Scenarios

### 1. Missing Link Handling

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify missing link is hidden

**File:** `tests/functional/scrum86-missing-link-hidden.spec.ts`

**Steps:**
  1. Navigate to product with missing purchase link
  2. Open Contact Vendor popup
  3. Verify button is not displayed

**Expected Results:**
  - Button for missing link is automatically hidden
  - No blank or dead link appears

### 2. Unsafe or Expired Link Handling

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify unsafe link placeholder message

**File:** `tests/functional/scrum86-unsafe-link-placeholder.spec.ts`

**Steps:**
  1. Navigate to product with unsafe/flagged link
  2. Open Contact Vendor popup
  3. Verify placeholder message displays

**Expected Results:**
  - Placeholder message appears: 'Link temporarily unavailable. Please check with vendor.'
  - Unsafe link is not clickable

#### 2.2. Verify expired link placeholder message

**File:** `tests/functional/scrum86-expired-link-placeholder.spec.ts`

**Steps:**
  1. Navigate to product with expired link
  2. Open Contact Vendor popup
  3. Verify placeholder message displays

**Expected Results:**
  - Placeholder message appears: 'Link temporarily unavailable. Please check with vendor.'
  - Expired link is not clickable

### 3. Admin Logging

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify admin dashboard logs flagged/disabled URLs

**File:** `tests/functional/scrum86-admin-logging.spec.ts`

**Steps:**
  1. Flag or disable a purchase link
  2. Access admin dashboard
  3. Verify URL is logged

**Expected Results:**
  - Flagged URLs are logged in admin dashboard
  - Disabled URLs are logged in admin dashboard

### 4. Contact Vendor Fallback

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify Contact Vendor fallback availability

**File:** `tests/functional/scrum86-contact-vendor-fallback.spec.ts`

**Steps:**
  1. Navigate to product with missing/unsafe links
  2. Verify Contact Vendor button is available
  3. Click Contact Vendor
  4. Verify popup opens

**Expected Results:**
  - Contact Vendor option remains available
  - Users can still contact vendor when links are unavailable

### 5. No Dead Links

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify no blank or dead links on interface

**File:** `tests/functional/scrum86-no-dead-links.spec.ts`

**Steps:**
  1. Navigate through multiple products
  2. Open Contact Vendor popups
  3. Verify all displayed links are valid

**Expected Results:**
  - No blank links appear on interface
  - No dead links appear on interface
  - All displayed links are valid

### 6. Placeholder Message Accessibility

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify placeholder message accessibility

**File:** `tests/accessibility/scrum86-placeholder-announcement.spec.ts`

**Steps:**
  1. Navigate to product with unsafe/expired link
  2. Open Contact Vendor popup
  3. Verify message visibility and role='alert'
  4. Check screen reader announcement

**Expected Results:**
  - Placeholder message is visible
  - Placeholder message has role='alert'
  - Message is announced by assistive technologies

### 7. Error State Visual Indicators

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify error states use non-color cues

**File:** `tests/accessibility/scrum86-non-color-cues.spec.ts`

**Steps:**
  1. Navigate to product with link issues
  2. Open Contact Vendor popup
  3. Verify icons or text indicators are present
  4. Confirm not relying on color alone

**Expected Results:**
  - Error states use non-color cues (icons or text)
  - Not color alone to indicate issues

### 8. Message Contrast

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify message color contrast

**File:** `tests/accessibility/scrum86-message-contrast.spec.ts`

**Steps:**
  1. Navigate to product with link issues
  2. Open Contact Vendor popup
  3. Check placeholder message contrast ratio

**Expected Results:**
  - Placeholder messages meet 4.5:1 contrast ratio
