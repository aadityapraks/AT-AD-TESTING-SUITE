# SCRUM-78 Test Plan

## Application Overview

Test plan for SCRUM-78: PwD - Navigate from Catalog to Product Details Page. This covers navigation via product card and View Details button, URL updates, page load performance, back navigation with filter persistence, and full accessibility compliance.

## Test Scenarios

### 1. Navigation to Product Details

**Seed:** `tests/seed.spec.ts`

#### 1.1. Navigate via product card click

**File:** `tests/functional/scrum78-navigate-via-card.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Click on a product card
  3. Verify Product Details Page opens

**Expected Results:**
  - Product Details Page opens
  - Correct product details are displayed

#### 1.2. Navigate via View Details button

**File:** `tests/functional/scrum78-navigate-via-button.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Click View Details button on a product card
  3. Verify Product Details Page opens

**Expected Results:**
  - Product Details Page opens
  - Correct product details are displayed

### 2. URL and Page Load

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify URL updates dynamically

**File:** `tests/functional/scrum78-url-update.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Click on a product
  3. Verify URL contains product slug

**Expected Results:**
  - URL updates dynamically
  - URL reflects product name or slug (e.g., /catalog/mobility/standassist-lift)

#### 2.2. Verify page load performance

**File:** `tests/functional/scrum78-page-load-time.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Record start time
  3. Click on a product
  4. Measure load time

**Expected Results:**
  - Product Details Page loads within 3 seconds

#### 2.3. Verify product details persist after refresh

**File:** `tests/functional/scrum78-page-refresh.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Refresh the page
  3. Verify product details remain intact

**Expected Results:**
  - Product details persist after refresh
  - Same product is displayed

### 3. Back Navigation

**Seed:** `tests/seed.spec.ts`

#### 3.1. Back button preserves filters and search

**File:** `tests/functional/scrum78-back-with-filters.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Apply filters and search
  3. Click on a product
  4. Click browser Back button
  5. Verify filters and search are preserved

**Expected Results:**
  - User returns to catalog page
  - Previously applied filters are intact
  - Search terms are preserved

### 4. Accessibility - Focus Management

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify focus moves to main heading

**File:** `tests/accessibility/scrum78-focus-on-heading.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Click on a product
  3. Verify focus is on h1 heading

**Expected Results:**
  - Focus moves to h1 product name heading
  - Focus is programmatically set

### 5. Accessibility - Breadcrumbs

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify breadcrumb accessibility

**File:** `tests/accessibility/scrum78-breadcrumb-navigation.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Verify breadcrumb structure
  3. Tab through breadcrumb links
  4. Check aria-labels

**Expected Results:**
  - Breadcrumb displays: Home → Catalog → Mobility → StandAssist Lift
  - All breadcrumb links are keyboard-focusable
  - Breadcrumb links have aria-labels (e.g., 'Go to Catalog')

### 6. Accessibility - Page Structure

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify landmark regions

**File:** `tests/accessibility/scrum78-landmarks.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Check for header, main, footer landmarks
  3. Verify screen reader navigation

**Expected Results:**
  - Header landmark is present
  - Main landmark is present
  - Footer landmark is present
  - Landmarks enable logical screen reader navigation

### 7. Accessibility - Announcements

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify page load announcement

**File:** `tests/accessibility/scrum78-page-load-announcement.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Click on a product
  3. Verify ARIA live region announcement

**Expected Results:**
  - ARIA live region announces 'Product details loaded'
  - Announcement occurs within 3 seconds

### 8. Accessibility - Back Navigation

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify accessible back navigation

**File:** `tests/accessibility/scrum78-back-navigation-a11y.spec.ts`

**Steps:**
  1. Apply filters on catalog
  2. Navigate to product details
  3. Use Back button
  4. Verify filters and focus

**Expected Results:**
  - Back button returns to catalog
  - Filters remain intact
  - Focus is managed appropriately

### 9. Accessibility - Visual

**Seed:** `tests/seed.spec.ts`

#### 9.1. Verify color contrast ratios

**File:** `tests/accessibility/scrum78-contrast-ratios.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Check contrast ratios for all text
  3. Verify interactive element contrast

**Expected Results:**
  - All text meets 4.5:1 contrast ratio
  - Interactive elements meet contrast requirements

#### 9.2. Verify 200% text resize

**File:** `tests/accessibility/scrum78-text-resize.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Increase text size to 200%
  3. Verify layout and readability

**Expected Results:**
  - Text resizes to 200% without overlap
  - Layout remains intact
  - No information loss occurs
