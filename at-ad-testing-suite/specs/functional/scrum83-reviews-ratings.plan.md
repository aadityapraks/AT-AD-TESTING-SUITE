# SCRUM-83 Test Plan

## Application Overview

Test plan for SCRUM-83: PwD - Product Reviews and Ratings. This covers average rating display, reviews list, review submission with 700-character textbox, and comprehensive textbox accessibility compliance.

## Test Scenarios

### 1. Rating Display

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify average rating display

**File:** `tests/functional/scrum83-average-rating.spec.ts`

**Steps:**
  1. Navigate to Product Details Page with reviews
  2. Verify average rating is displayed

**Expected Results:**
  - Average rating is displayed near top of page (e.g., 4.5 stars)

### 2. Reviews List

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify reviews list content

**File:** `tests/functional/scrum83-reviews-list.spec.ts`

**Steps:**
  1. Navigate to Reviews tab
  2. Verify all review elements are present
  3. Verify chronological order

**Expected Results:**
  - Reviewer name is displayed (or anonymous)
  - Rating (1-5 stars) is shown
  - Review text is displayed
  - Date posted is shown
  - Reviews are in reverse chronological order (latest first)

#### 2.2. Verify no reviews placeholder

**File:** `tests/functional/scrum83-no-reviews.spec.ts`

**Steps:**
  1. Navigate to Product Details Page without reviews
  2. Go to Reviews tab
  3. Verify placeholder text

**Expected Results:**
  - Placeholder text displays: 'No reviews yet'

### 3. Review Submission

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify Submit button for logged-in user

**File:** `tests/functional/scrum83-submit-button.spec.ts`

**Steps:**
  1. Log in as user
  2. Navigate to Reviews tab
  3. Verify Submit button is present

**Expected Results:**
  - Submit button is visible
  - Logged-in user can click Submit
  - Review form is accessible

#### 3.2. Submit a review

**File:** `tests/functional/scrum83-submit-review.spec.ts`

**Steps:**
  1. Log in as user
  2. Navigate to Reviews tab
  3. Enter review text (up to 700 characters)
  4. Click Submit
  5. Verify review count updates

**Expected Results:**
  - Textbox accepts up to 700 characters
  - Review is submitted successfully
  - Review count updates automatically

### 4. Rating Accessibility

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify star rating semantic markup

**File:** `tests/accessibility/scrum83-star-rating-aria.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Inspect star ratings
  3. Verify role and aria-label

**Expected Results:**
  - Star ratings have role='img'
  - Star ratings have aria-label (e.g., '4 out of 5 stars')

#### 4.2. Verify no reviews placeholder announcement

**File:** `tests/accessibility/scrum83-no-reviews-announcement.spec.ts`

**Steps:**
  1. Navigate to product without reviews
  2. Verify screen reader announces placeholder

**Expected Results:**
  - Placeholder text is announced by screen readers

#### 4.3. Verify reviews list keyboard operability

**File:** `tests/accessibility/scrum83-reviews-keyboard.spec.ts`

**Steps:**
  1. Navigate to Reviews tab
  2. Use keyboard to interact with elements
  3. Verify all are operable

**Expected Results:**
  - All interactive elements are keyboard-operable

#### 4.4. Verify rating color contrast

**File:** `tests/accessibility/scrum83-rating-contrast.spec.ts`

**Steps:**
  1. Navigate to Reviews tab
  2. Check rating color contrast

**Expected Results:**
  - Rating color indicators meet 4.5:1 contrast ratio

### 5. Textbox Labeling

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify textbox proper labeling

**File:** `tests/accessibility/scrum83-textbox-label.spec.ts`

**Steps:**
  1. Navigate to review form
  2. Verify visible label
  3. Check label association

**Expected Results:**
  - Textbox has visible label (e.g., 'Write your review')
  - Label is programmatically associated via <label for> or aria-label
  - Placeholder is not the only label

### 6. Textbox Instructions

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify textbox instructions and character counter

**File:** `tests/accessibility/scrum83-textbox-instructions.spec.ts`

**Steps:**
  1. Navigate to review form
  2. Verify instructions are present
  3. Type text and verify counter updates

**Expected Results:**
  - Instructions are visible (e.g., 'Maximum 700 characters')
  - Instructions use aria-describedby
  - Character counter updates dynamically
  - Counter announced via aria-live='polite'

### 7. Textbox Keyboard Navigation

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify textbox keyboard navigation

**File:** `tests/accessibility/scrum83-textbox-keyboard.spec.ts`

**Steps:**
  1. Navigate to review form
  2. Tab to textbox
  3. Test keyboard commands
  4. Verify focus indicator

**Expected Results:**
  - Textbox is reachable via Tab
  - Shift+Tab moves out of textbox
  - Standard keyboard commands work (Ctrl/Cmd+A/C/X/V)
  - Focus indicator is clearly visible

### 8. Textbox Focus Management

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify textbox focus management

**File:** `tests/accessibility/scrum83-textbox-focus-management.spec.ts`

**Steps:**
  1. Open review form
  2. Verify focus on textbox
  3. Submit or cancel
  4. Verify focus returns

**Expected Results:**
  - Focus moves to textbox when form opens
  - Focus returns to Write Review button after submit/cancel

### 9. Textbox Validation

**Seed:** `tests/seed.spec.ts`

#### 9.1. Verify textbox error and validation messages

**File:** `tests/accessibility/scrum83-textbox-validation.spec.ts`

**Steps:**
  1. Navigate to review form
  2. Submit empty review
  3. Exceed character limit
  4. Verify error messages and announcements

**Expected Results:**
  - Empty field error is visible
  - Character limit error is visible (e.g., 'Exceeded 700 characters')
  - Errors announced via aria-live='assertive'
  - Errors associated via aria-describedby
  - Error color contrast ≥ 4.5:1

### 10. Textbox Success Feedback

**Seed:** `tests/seed.spec.ts`

#### 10.1. Verify textbox success message

**File:** `tests/accessibility/scrum83-textbox-success.spec.ts`

**Steps:**
  1. Submit valid review
  2. Verify success message appears
  3. Check ARIA attributes

**Expected Results:**
  - Success message appears after submission
  - Message uses role='status' and aria-live='polite'
  - Message includes next-step context

### 11. Textbox Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 11.1. Verify textbox contrast and readability

**File:** `tests/accessibility/scrum83-textbox-contrast-readability.spec.ts`

**Steps:**
  1. Navigate to review form
  2. Check contrast ratios
  3. Increase font size to 200%
  4. Verify no clipping

**Expected Results:**
  - Textbox border, label, text meet 4.5:1 contrast
  - Font size increases to 200% without clipping
  - Line spacing and padding allow comfortable editing

### 12. Textbox Assistive Technology

**Seed:** `tests/seed.spec.ts`

#### 12.1. Verify textbox assistive technology compatibility

**File:** `tests/accessibility/scrum83-textbox-assistive-tech.spec.ts`

**Steps:**
  1. Navigate to review form
  2. Test with screen readers
  3. Verify announcements

**Expected Results:**
  - Textbox works with screen readers (NVDA, JAWS, VoiceOver)
  - Textbox works with speech-to-text tools
  - Screen readers announce label, instructions, cursor position

### 13. Textbox Mobile Accessibility

**Seed:** `tests/seed.spec.ts`

#### 13.1. Verify textbox mobile and touch accessibility

**File:** `tests/accessibility/scrum83-textbox-mobile.spec.ts`

**Steps:**
  1. Set viewport to mobile
  2. Navigate to review form
  3. Verify touch targets
  4. Test on-screen keyboard behavior

**Expected Results:**
  - Touch targets are ≥ 44x44px
  - On-screen keyboard behaves predictably
  - No content overlap or hidden content
  - Multi-line text allows scrolling

### 14. Textbox Disruption Prevention

**Seed:** `tests/seed.spec.ts`

#### 14.1. Verify textbox prevents disruption

**File:** `tests/accessibility/scrum83-textbox-no-disruption.spec.ts`

**Steps:**
  1. Navigate to review form
  2. Type in textbox
  3. Verify no disruptions
  4. Test navigation warning

**Expected Results:**
  - No auto-refresh while typing
  - No pop-ups while typing
  - No focus shifts while typing
  - Unsaved text warning or autosave present
