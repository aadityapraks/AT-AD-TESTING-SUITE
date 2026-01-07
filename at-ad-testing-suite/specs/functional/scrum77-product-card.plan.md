# SCRUM-77 Test Plan

## Application Overview

Test plan for SCRUM-77: PwD - View Product Card (Preview Summary). This covers product card elements, hover/focus interactions, View Details authentication flow, user type selection, and full accessibility compliance.

## Test Scenarios

### 1. Product Card Elements

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify product card elements

**File:** `tests/functional/scrum77-card-elements.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Locate a product card
  3. Verify all card elements are present

**Expected Results:**
  - Thumbnail image is displayed with ALT text
  - Product name is visible
  - Tags show disability type/use case
  - Average rating shows numeric value, star icons, and review count
  - Short description is truncated to 2 lines
  - Key features are listed
  - Availability badge displays (e.g., 'In Stock', 'Out of Stock')

### 2. Card Interactions

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify card hover interaction

**File:** `tests/functional/scrum77-card-hover.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Hover over a product card
  3. Verify card is highlighted

**Expected Results:**
  - Card is highlighted on hover
  - Interest tracking is triggered

#### 2.2. Verify card focus interaction

**File:** `tests/functional/scrum77-card-focus.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Tab to focus on a product card
  3. Verify card is highlighted

**Expected Results:**
  - Card is highlighted on keyboard focus
  - Interest tracking is triggered

### 3. View Details - Logged In User

**Seed:** `tests/seed.spec.ts`

#### 3.1. View Details as logged in user

**File:** `tests/functional/scrum77-view-details-logged-in.spec.ts`

**Steps:**
  1. Log in as a valid user
  2. Navigate to the Catalog page
  3. Click View Details button on a product card
  4. Verify Product Details Page opens

**Expected Results:**
  - Clicking View Details opens Product Details Page
  - User is not prompted to sign in

### 4. View Details - Not Logged In

**Seed:** `tests/seed.spec.ts`

#### 4.1. View Details as non-logged in user

**File:** `tests/functional/scrum77-view-details-not-logged-in.spec.ts`

**Steps:**
  1. Ensure user is not logged in
  2. Navigate to the Catalog page
  3. Click View Details button
  4. Verify popup appears

**Expected Results:**
  - Popup appears with Sign In and Create Account options
  - Product Details Page does not open

#### 4.2. Sign in from popup

**File:** `tests/functional/scrum77-signin-from-popup.spec.ts`

**Steps:**
  1. Click View Details as non-logged in user
  2. Click Sign In option in popup
  3. Complete sign in
  4. Verify user is authenticated

**Expected Results:**
  - Sign In form is displayed
  - User can sign in successfully

#### 4.3. Create account - user type selection

**File:** `tests/functional/scrum77-create-account-user-type.spec.ts`

**Steps:**
  1. Click View Details as non-logged in user
  2. Click Create Account option in popup
  3. Verify user type selection prompt

**Expected Results:**
  - User type selection prompt appears
  - Options include: PwD, Caregiver, Employer, Donor, Vendor

#### 4.4. Trigger PwD onboarding flow

**File:** `tests/functional/scrum77-onboarding-pwd.spec.ts`

**Steps:**
  1. Start account creation
  2. Select PwD user type
  3. Verify PwD onboarding flow starts

**Expected Results:**
  - PwD onboarding flow is triggered

#### 4.5. Trigger Caregiver onboarding flow

**File:** `tests/functional/scrum77-onboarding-caregiver.spec.ts`

**Steps:**
  1. Start account creation
  2. Select Caregiver user type
  3. Verify Caregiver onboarding flow starts

**Expected Results:**
  - Caregiver onboarding flow is triggered

#### 4.6. Trigger Employer onboarding flow

**File:** `tests/functional/scrum77-onboarding-employer.spec.ts`

**Steps:**
  1. Start account creation
  2. Select Employer user type
  3. Verify Employer onboarding flow starts

**Expected Results:**
  - Employer onboarding flow is triggered

#### 4.7. Trigger Donor onboarding flow

**File:** `tests/functional/scrum77-onboarding-donor.spec.ts`

**Steps:**
  1. Start account creation
  2. Select Donor user type
  3. Verify Donor onboarding flow starts

**Expected Results:**
  - Donor onboarding flow is triggered

#### 4.8. Trigger Vendor onboarding flow

**File:** `tests/functional/scrum77-onboarding-vendor.spec.ts`

**Steps:**
  1. Start account creation
  2. Select Vendor user type
  3. Verify Vendor onboarding flow starts

**Expected Results:**
  - Vendor onboarding flow is triggered

### 5. Card Accessibility

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify semantic HTML structure

**File:** `tests/accessibility/scrum77-semantic-html.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Inspect product card HTML
  3. Verify semantic elements

**Expected Results:**
  - Image has ALT text
  - Product name uses heading element
  - Key features use list element
  - Semantic HTML is used throughout

#### 5.2. Verify bookmark icon accessibility

**File:** `tests/accessibility/scrum77-bookmark-icon.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Locate bookmark icon
  3. Verify aria-label
  4. Toggle with keyboard

**Expected Results:**
  - Bookmark/Save icon has aria-label='Save this product'
  - Icon is keyboard toggleable
  - Icon state changes on toggle

#### 5.3. Verify card is focusable and activatable

**File:** `tests/accessibility/scrum77-card-focusable.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Tab to focus on card
  3. Press Enter
  4. Verify action triggers

**Expected Results:**
  - Entire card is focusable
  - Pressing Enter opens details page or popup

#### 5.4. Verify focus outline visibility and contrast

**File:** `tests/accessibility/scrum77-focus-outline.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Tab to focus on card
  3. Verify focus outline
  4. Check contrast ratio

**Expected Results:**
  - Focus outline is visible
  - Focus outline meets 3:1 contrast ratio

#### 5.5. Verify screen reader announcements

**File:** `tests/accessibility/scrum77-screen-reader-announcements.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Use screen reader on product card
  3. Verify announcements

**Expected Results:**
  - Screen reader announces product name
  - Screen reader announces rating
  - Screen reader announces availability
  - Screen reader announces link role

#### 5.6. Verify card layout with 200% text resize

**File:** `tests/accessibility/scrum77-text-resize.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Increase text size to 200%
  3. Verify card layout remains intact

**Expected Results:**
  - Card layout adjusts without information loss
  - No text overlap occurs

#### 5.7. Verify no unexpected context changes

**File:** `tests/accessibility/scrum77-no-unexpected-changes.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Hover over card
  3. Focus on card
  4. Verify no automatic navigation

**Expected Results:**
  - Hover does not trigger automatic navigation
  - Focus does not trigger automatic navigation
  - No unexpected context changes occur

#### 5.8. Verify keyboard navigation between cards

**File:** `tests/accessibility/scrum77-keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Tab through multiple cards
  3. Verify linear and predictable navigation

**Expected Results:**
  - Tab order is linear
  - Navigation between cards is predictable
  - No focus traps exist
