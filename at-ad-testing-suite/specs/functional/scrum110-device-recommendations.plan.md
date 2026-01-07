# SCRUM-110 Test Plan

## Application Overview

Test plan for SCRUM-110: PwD - Access to Device recommendations and functionality. This covers navigation to recommendations, personalized recommendations generation based on profile data, toggle for recommended devices, data persistence, error handling, UI consistency, accessibility, and performance.

## Test Scenarios

### 1. Navigation and Page Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. Navigate to Get Recommendation

**File:** `tests/functional/scrum110-get-recommendations-navigation.spec.ts`

**Steps:**
  1. Click Get Recommendation from Home page
  2. Verify navigation to Catalog page
  3. Verify title, subtitle, toggle, and count

**Expected Results:**
  - User navigates to Catalog page
  - Title displays: 'Personalized for You'
  - Subtitle displays: 'Your Personalized Device Recommendations'
  - Toggle for showing only recommended devices is present
  - Device count is displayed

### 2. Recommendation Generation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Generate personalized recommendations

**File:** `tests/functional/scrum110-generate-recommendations.spec.ts`

**Steps:**
  1. Click Get Recommendations
  2. Verify system captures profile data
  3. Verify recommendations are generated

**Expected Results:**
  - System captures profile details
  - System combines with Swarajability disability/skills profile
  - Personalized device recommendations are generated

#### 2.2. Generate recommendations without Swarajability data

**File:** `tests/functional/scrum110-recommendations-without-swarajability.spec.ts`

**Steps:**
  1. Ensure Swarajability profile data is unavailable
  2. Click Get Recommendations
  3. Verify recommendations are generated using questionnaire only

**Expected Results:**
  - System uses only questionnaire responses
  - Recommendations are still generated

### 3. Recommended Devices Toggle

**Seed:** `tests/seed.spec.ts`

#### 3.1. Toggle recommended devices filter

**File:** `tests/functional/scrum110-toggle-recommended-devices.spec.ts`

**Steps:**
  1. Navigate to recommendations page
  2. Toggle recommended devices filter
  3. Verify only recommended devices are shown
  4. Verify count updates

**Expected Results:**
  - Toggle shows only recommended devices
  - Device count updates to show recommended count

### 4. Data Persistence

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify data persistence on navigation

**File:** `tests/functional/scrum110-data-persistence.spec.ts`

**Steps:**
  1. Make selections on recommendations page
  2. Navigate away
  3. Navigate back
  4. Verify selections remain highlighted

**Expected Results:**
  - Previously selected answers remain highlighted
  - User selections are preserved

### 5. Error Handling

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify error message on network failure

**File:** `tests/functional/scrum110-network-error.spec.ts`

**Steps:**
  1. Simulate network or backend failure
  2. Click Get Recommendations
  3. Verify error message displays

**Expected Results:**
  - Non-technical error message displays: 'Unable to load recommendations. Please try again.'

### 6. UI Design Consistency

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify UI design consistency

**File:** `tests/functional/scrum110-ui-consistency.spec.ts`

**Steps:**
  1. Navigate to recommendations page
  2. Verify all UI elements match design specs

**Expected Results:**
  - Card layout matches UI
  - Shadows and borders match UI
  - Radio selection indicator matches UI
  - Typography and spacing match UI
  - Progress bar behavior matches UI

### 7. Responsive Design

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify desktop responsive design

**File:** `tests/functional/scrum110-responsive-desktop.spec.ts`

**Steps:**
  1. Set viewport to desktop
  2. Navigate to recommendations page
  3. Verify responsive layout

**Expected Results:**
  - Page is responsive on desktop

#### 7.2. Verify tablet responsive design

**File:** `tests/functional/scrum110-responsive-tablet.spec.ts`

**Steps:**
  1. Set viewport to tablet
  2. Navigate to recommendations page
  3. Verify responsive layout

**Expected Results:**
  - Page is responsive on tablet

#### 7.3. Verify mobile responsive design

**File:** `tests/functional/scrum110-responsive-mobile.spec.ts`

**Steps:**
  1. Set viewport to mobile
  2. Navigate to recommendations page
  3. Verify responsive layout

**Expected Results:**
  - Page is responsive on mobile

### 8. Accessibility - Keyboard

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify option cards keyboard accessibility

**File:** `tests/accessibility/scrum110-keyboard-accessible.spec.ts`

**Steps:**
  1. Navigate to recommendations page
  2. Use keyboard to navigate cards
  3. Verify full keyboard accessibility

**Expected Results:**
  - Option cards are fully keyboard accessible
  - Tab navigates through cards
  - Enter/Space selects cards

### 9. Accessibility - Screen Reader

**Seed:** `tests/seed.spec.ts`

#### 9.1. Verify screen reader labels

**File:** `tests/accessibility/scrum110-screen-reader-labels.spec.ts`

**Steps:**
  1. Navigate to recommendations page
  2. Use screen reader on cards
  3. Verify labels are announced

**Expected Results:**
  - Screen reader labels are defined for all selectable cards
  - Cards are properly announced

### 10. Accessibility - Buttons

**Seed:** `tests/seed.spec.ts`

#### 10.1. Verify button contrast and size

**File:** `tests/accessibility/scrum110-button-requirements.spec.ts`

**Steps:**
  1. Navigate to recommendations page
  2. Check button contrast ratios
  3. Measure button sizes

**Expected Results:**
  - Buttons meet contrast requirements
  - Buttons meet size requirements suitable for PwD users

### 11. Accessibility - WCAG Compliance

**Seed:** `tests/seed.spec.ts`

#### 11.1. Verify WCAG 2.1 AA compliance

**File:** `tests/accessibility/scrum110-wcag-compliance.spec.ts`

**Steps:**
  1. Navigate to recommendations page
  2. Run accessibility scan
  3. Verify WCAG compliance

**Expected Results:**
  - All elements follow WCAG 2.1 AA standards
  - Proper alt text is implemented
  - Focus indicators are present
  - ARIA labels are implemented

### 12. Performance

**Seed:** `tests/seed.spec.ts`

#### 12.1. Verify page load performance

**File:** `tests/functional/scrum110-page-load-performance.spec.ts`

**Steps:**
  1. Measure page load time
  2. Navigate to recommendations page
  3. Verify loads within 3 seconds

**Expected Results:**
  - Key content loads within 3 seconds

### 13. Session Timeout

**Seed:** `tests/seed.spec.ts`

#### 13.1. Verify session timeout

**File:** `tests/functional/scrum110-session-timeout.spec.ts`

**Steps:**
  1. Log in as PwD user
  2. Wait for 30 minutes of inactivity
  3. Verify session times out

**Expected Results:**
  - Session auto-times out after 30 minutes of inactivity
