# SCRUM-109 Test Plan

## Application Overview

Test plan for SCRUM-109: PwD - Accessing Stories section. This covers Stories listing page navigation, story cards display, Like/Share interactions, story details page layout, comparison badges, device card navigation, back navigation, responsive design, accessibility, and performance.

## Test Scenarios

### 1. Stories Page Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Navigate to Stories page

**File:** `tests/functional/scrum109-stories-navigation.spec.ts`

**Steps:**
  1. Click Stories from top navigation bar
  2. Verify Stories listing page opens
  3. Verify heading and subtitle

**Expected Results:**
  - Stories listing page opens
  - Heading displays: 'Success Stories'
  - Subtitle displays: 'Real experiences from the community.'

### 2. Story Cards Display

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify story card elements

**File:** `tests/functional/scrum109-story-card-elements.spec.ts`

**Steps:**
  1. Navigate to Stories page
  2. Inspect story cards
  3. Verify all card elements are present

**Expected Results:**
  - Cover image is displayed
  - Category tag is shown (e.g., Featured Story, Independent Living)
  - Story title is displayed
  - Author name + profile avatar initial is shown
  - Published date is displayed
  - Story summary text (up to 2 lines) is shown
  - Read Story CTA button is present
  - Like and Share icons are visible
  - Card spacing, elevation, padding match UI

### 3. Number of Stories

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify stories count and pagination

**File:** `tests/functional/scrum109-stories-count.spec.ts`

**Steps:**
  1. Navigate to Stories page
  2. Count displayed stories
  3. Verify pagination/infinite scroll if applicable

**Expected Results:**
  - At least 6 stories load by default
  - Pagination or infinite scroll is supported if more stories exist

### 4. Like and Share Interactions

**Seed:** `tests/seed.spec.ts`

#### 4.1. Like a story

**File:** `tests/functional/scrum109-like-story.spec.ts`

**Steps:**
  1. Navigate to Stories page
  2. Click Like icon on a story card
  3. Verify count increments and icon changes

**Expected Results:**
  - Like count increments
  - Icon state changes to filled

#### 4.2. Unlike a story

**File:** `tests/functional/scrum109-unlike-story.spec.ts`

**Steps:**
  1. Like a story
  2. Click Like icon again
  3. Verify count decrements and icon changes

**Expected Results:**
  - Like count decrements
  - Icon state changes to outlined

#### 4.3. Share a story

**File:** `tests/functional/scrum109-share-story.spec.ts`

**Steps:**
  1. Navigate to Stories page
  2. Click Share icon
  3. Verify share modal or options appear

**Expected Results:**
  - Browser-native share modal opens
  - Or share options display (copy link, social share)

### 5. Navigation to Story Details

**Seed:** `tests/seed.spec.ts`

#### 5.1. Navigate via Read Story button

**File:** `tests/functional/scrum109-read-story-button.spec.ts`

**Steps:**
  1. Navigate to Stories page
  2. Click Read Story button
  3. Verify Story Details page opens

**Expected Results:**
  - Story Details page opens for that story

#### 5.2. Navigate via card click

**File:** `tests/functional/scrum109-card-click.spec.ts`

**Steps:**
  1. Navigate to Stories page
  2. Click anywhere on story card
  3. Verify Story Details page opens

**Expected Results:**
  - Story Details page opens for that story

### 6. Story Details Page Layout

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify story details page layout

**File:** `tests/functional/scrum109-story-details-layout.spec.ts`

**Steps:**
  1. Navigate to Story Details page
  2. Verify all layout elements are present

**Expected Results:**
  - Cover image is displayed
  - Story title is shown
  - Author name + avatar + published date are displayed
  - Like & Share buttons are present
  - My Journey heading is shown
  - Story narrative text is displayed
  - Before Using Device vs After Using Device comparison badges are shown
  - The Impact section with text is displayed
  - Device Featured box with image, name, vendor, rating, View Device Details CTA is present
  - Back to Stories CTA is on top
  - Read More Success Stories / View All Stories CTA is present

### 7. Comparison Badges

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify comparison badges behavior

**File:** `tests/functional/scrum109-comparison-badges.spec.ts`

**Steps:**
  1. Navigate to Story Details page
  2. Inspect Before and After badges
  3. Verify visibility, colors, icons, and text wrapping

**Expected Results:**
  - Before and After labels are fully visible
  - Badge colors and icons match UI
  - Text wraps correctly without truncation

### 8. Device Card Navigation

**Seed:** `tests/seed.spec.ts`

#### 8.1. Navigate to device details

**File:** `tests/functional/scrum109-device-details-navigation.spec.ts`

**Steps:**
  1. Navigate to Story Details page
  2. Click View Device Details
  3. Verify device detail page opens

**Expected Results:**
  - Device detail page opens in catalog section

### 9. Back Navigation

**Seed:** `tests/seed.spec.ts`

#### 9.1. Navigate back to Stories list

**File:** `tests/functional/scrum109-back-to-stories.spec.ts`

**Steps:**
  1. Navigate to Story Details page
  2. Click View All Stories
  3. Verify Stories list page opens

**Expected Results:**
  - Stories list page opens

### 10. Responsive Design

**Seed:** `tests/seed.spec.ts`

#### 10.1. Verify desktop responsive design

**File:** `tests/functional/scrum109-responsive-desktop.spec.ts`

**Steps:**
  1. Set viewport to desktop
  2. Navigate to Stories page and details
  3. Verify responsive layout

**Expected Results:**
  - Page is responsive on desktop
  - All elements are properly displayed

#### 10.2. Verify tablet responsive design

**File:** `tests/functional/scrum109-responsive-tablet.spec.ts`

**Steps:**
  1. Set viewport to tablet
  2. Navigate to Stories page and details
  3. Verify responsive layout

**Expected Results:**
  - Page is responsive on tablet
  - All elements are properly displayed

#### 10.3. Verify mobile responsive design

**File:** `tests/functional/scrum109-responsive-mobile.spec.ts`

**Steps:**
  1. Set viewport to mobile
  2. Navigate to Stories page and details
  3. Verify responsive layout

**Expected Results:**
  - Page is responsive on mobile
  - All elements are properly displayed

### 11. Accessibility

**Seed:** `tests/seed.spec.ts`

#### 11.1. Verify WCAG 2.1 AA compliance

**File:** `tests/accessibility/scrum109-wcag-compliance.spec.ts`

**Steps:**
  1. Navigate to Stories page and details
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

**File:** `tests/functional/scrum109-page-load-performance.spec.ts`

**Steps:**
  1. Measure page load time
  2. Navigate to Stories page
  3. Verify loads within 3 seconds

**Expected Results:**
  - Key content loads within 3 seconds

### 13. Error Handling

**Seed:** `tests/seed.spec.ts`

#### 13.1. Verify error messages for downtime

**File:** `tests/functional/scrum109-error-messages.spec.ts`

**Steps:**
  1. Simulate downtime or data retrieval error
  2. Navigate to Stories page
  3. Verify clear error message appears

**Expected Results:**
  - Clear error message appears

### 14. Session Timeout

**Seed:** `tests/seed.spec.ts`

#### 14.1. Verify session timeout

**File:** `tests/functional/scrum109-session-timeout.spec.ts`

**Steps:**
  1. Log in as PwD user
  2. Wait for 30 minutes of inactivity
  3. Verify session times out

**Expected Results:**
  - Session auto-times out after 30 minutes of inactivity
