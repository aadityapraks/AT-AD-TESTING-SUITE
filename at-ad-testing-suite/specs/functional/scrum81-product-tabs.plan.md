# SCRUM-81 Test Plan

## Application Overview

Test plan for SCRUM-81: PwD - Explore Product Tabs (Features, Reviews Etc). This covers all five product tabs (Features, Technical and Accessibility, Buying Guide, Reviews, Raise a Query), tab switching behavior, and full accessibility compliance.

## Test Scenarios

### 1. Tab Structure

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify all tabs are present

**File:** `tests/functional/scrum81-tabs-present.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Verify all five tabs are visible

**Expected Results:**
  - Features tab is present
  - Technical and Accessibility tab is present
  - Buying Guide tab is present
  - Reviews tab is present
  - Raise a Query tab is present

### 2. Features Tab Content

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify Features tab content

**File:** `tests/functional/scrum81-features-content.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click Features tab
  3. Verify content is displayed

**Expected Results:**
  - Key product features are displayed as bullet points or short text
  - Who is it for section is displayed

### 3. Technical and Accessibility Tab Content

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify Technical and Accessibility tab content

**File:** `tests/functional/scrum81-technical-content.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click Technical and Accessibility tab
  3. Verify content is displayed

**Expected Results:**
  - Technical specifications are displayed
  - Accessibility Features section is displayed
  - Need more help section is displayed

### 4. Buying Guide Tab Content

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify Buying Guide tab content

**File:** `tests/functional/scrum81-buying-guide-content.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click Buying Guide tab
  3. Verify content is displayed

**Expected Results:**
  - Before you Buy section is displayed
  - Alternatives to consider section is displayed

### 5. Reviews Tab Content

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify Reviews tab with reviews

**File:** `tests/functional/scrum81-reviews-with-content.spec.ts`

**Steps:**
  1. Navigate to Product Details Page with reviews
  2. Click Reviews tab
  3. Verify reviews and submission option

**Expected Results:**
  - Review count is displayed in tab header
  - User ratings and reviews are displayed
  - AP replies are shown as threads
  - Option to write and submit review is present

#### 5.2. Verify Reviews tab without reviews

**File:** `tests/functional/scrum81-reviews-empty.spec.ts`

**Steps:**
  1. Navigate to Product Details Page without reviews
  2. Click Reviews tab
  3. Verify empty state message

**Expected Results:**
  - Message displays: 'No reviews yet'

### 6. Raise a Query Tab Content

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify Raise a Query tab content

**File:** `tests/functional/scrum81-raise-query-content.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click Raise a Query tab
  3. Verify all sections are displayed

**Expected Results:**
  - Disclaimer about private communication is displayed
  - Ask the assistive partner section is displayed
  - Previous queries and AP answers are displayed

### 7. Tab Switching Behavior

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify only one tab content visible

**File:** `tests/functional/scrum81-single-tab-visible.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Switch between tabs
  3. Verify only active tab content is visible

**Expected Results:**
  - Only one tab's content is visible at a time

#### 7.2. Verify tab switching without page reload

**File:** `tests/functional/scrum81-no-page-reload.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click different tabs
  3. Verify no page reload

**Expected Results:**
  - Content updates immediately
  - No full page reload occurs

#### 7.3. Verify active tab visual highlight

**File:** `tests/functional/scrum81-active-tab-highlight.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Switch between tabs
  3. Verify active tab is highlighted

**Expected Results:**
  - Active tab is visually highlighted

### 8. Tab Accessibility - ARIA Roles

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify ARIA roles for tabs

**File:** `tests/accessibility/scrum81-aria-roles.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Inspect tab structure
  3. Verify ARIA roles

**Expected Results:**
  - Tab container has role='tablist'
  - Each tab has role='tab'
  - Each content panel has role='tabpanel'

#### 8.2. Verify aria-selected state

**File:** `tests/accessibility/scrum81-aria-selected.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Switch tabs
  3. Verify aria-selected attributes

**Expected Results:**
  - Active tab has aria-selected='true'
  - Inactive tabs have aria-selected='false'
  - Visual indication matches aria-selected state

### 9. Tab Accessibility - Keyboard Navigation

**Seed:** `tests/seed.spec.ts`

#### 9.1. Verify arrow key tab navigation

**File:** `tests/accessibility/scrum81-arrow-key-navigation.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Use arrow keys to navigate tabs
  3. Verify tab switching

**Expected Results:**
  - Arrow keys switch between tabs
  - Left/Right arrows navigate tabs
  - Tab switching works with keyboard

#### 9.2. Verify Enter/Space tab activation

**File:** `tests/accessibility/scrum81-enter-space-activation.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Focus on a tab
  3. Press Enter or Space
  4. Verify tab activates

**Expected Results:**
  - Enter key activates tab
  - Space key activates tab

#### 9.3. Verify focus moves to active panel

**File:** `tests/accessibility/scrum81-focus-to-panel.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Switch tabs
  3. Verify focus moves to panel content

**Expected Results:**
  - Focus moves to active panel after selection

### 10. Tab Accessibility - Content Structure

**Seed:** `tests/seed.spec.ts`

#### 10.1. Verify content heading hierarchy

**File:** `tests/accessibility/scrum81-content-hierarchy.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Switch through all tabs
  3. Verify heading structure in each panel

**Expected Results:**
  - Headings maintain logical hierarchy
  - Paragraph text is properly structured

### 11. Tab Accessibility - Visual

**Seed:** `tests/seed.spec.ts`

#### 11.1. Verify contrast and text resize

**File:** `tests/accessibility/scrum81-contrast-resize.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Check tab contrast ratios
  3. Resize text to 200%
  4. Verify no truncation

**Expected Results:**
  - Tab contrast meets WCAG AA standards
  - Spacing meets WCAG AA standards
  - Text resizes to 200% without truncation

### 12. Tab Accessibility - Announcements

**Seed:** `tests/seed.spec.ts`

#### 12.1. Verify screen reader tab announcements

**File:** `tests/accessibility/scrum81-tab-announcements.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Switch tabs
  3. Verify screen reader announcements

**Expected Results:**
  - Screen readers announce tab changes
  - Announcement includes tab name (e.g., 'Features tab selected')
