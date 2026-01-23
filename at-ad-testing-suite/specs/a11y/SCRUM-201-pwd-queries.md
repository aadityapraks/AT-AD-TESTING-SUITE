# SCRUM-201: AP Responding to PwD Queries - Accessibility Test Plan

## Application Overview

Accessibility test plan for Assistive Partner responding to PwD user queries covering WCAG 2.1 AA compliance

## Test Scenarios

### 1. Queries Section Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Queries section keyboard accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Login as AP user
  2. Tab to Queries in navigation
  3. Verify focus indicator visible
  4. Press Enter to activate
  5. Verify redirects to Queries page

**Expected Results:**
  - Queries link visible in navigation
  - Link keyboard accessible
  - Focus indicator meets contrast requirements
  - WCAG 2.1.1, 2.4.7 compliant

#### 1.2. TC_A11Y_002: Page has proper heading structure

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to Queries page
  2. Verify H1 exists for page title
  3. Verify section headings use H2
  4. Test heading navigation with screen reader

**Expected Results:**
  - Page has H1 heading
  - Heading structure logical
  - Screen reader can navigate by headings
  - WCAG 1.3.1, 2.4.6 compliant

### 2. Summary Counts

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_003: Summary counts accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to Queries page
  2. Verify Total Queries count announced
  3. Verify Pending Responses count announced
  4. Verify Responded Queries count announced
  5. Verify each has descriptive label

**Expected Results:**
  - All count widgets accessible
  - Numbers have accessible labels
  - Screen reader announces counts with context
  - WCAG 4.1.2, 1.3.1 compliant

#### 2.2. TC_A11Y_004: Counts not conveyed by color alone

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. View summary counts
  2. Verify text labels present
  3. Verify counts distinguishable without color

**Expected Results:**
  - Count widgets not relying on color alone
  - Text labels present
  - Visual distinction clear
  - WCAG 1.4.1 compliant

### 3. Query Listing

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_005: Query list semantic structure

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to query listing
  2. Verify queries in list structure
  3. Verify each query has accessible structure
  4. Verify product name, user, date, text all accessible

**Expected Results:**
  - Queries displayed in semantic list
  - Each query has proper structure
  - All metadata accessible
  - WCAG 1.3.1, 4.1.2 compliant

#### 3.2. TC_A11Y_006: Product images have alt text

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to query item
  2. Inspect product image
  3. Verify alt attribute present
  4. Verify alt text descriptive

**Expected Results:**
  - Product image has alt text
  - Alt text includes product name
  - Decorative images have empty alt
  - WCAG 1.1.1 compliant

#### 3.3. TC_A11Y_007: Status badges accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. View query with Pending Response status
  2. Verify status has text label
  3. View query with Responded status
  4. Verify status not conveyed by color alone
  5. View query with Admin Response status
  6. Verify all statuses accessible

**Expected Results:**
  - Status badge has text label
  - Not relying on color alone
  - Status announced to screen readers
  - WCAG 1.4.1, 4.1.2 compliant

### 4. Search and Filter

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_008: Search input has proper label

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to Queries page
  2. Locate search input
  3. Verify label associated with input
  4. Verify placeholder text present
  5. Verify label announced by screen reader

**Expected Results:**
  - Search input has programmatic label
  - Placeholder text descriptive
  - Label accessible to screen readers
  - WCAG 3.3.2, 4.1.2 compliant

#### 4.2. TC_A11Y_009: Search keyboard accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Tab to search input
  2. Verify focus indicator visible
  3. Type search query
  4. Press Enter to submit
  5. Verify results update

**Expected Results:**
  - Search input keyboard accessible
  - Search button keyboard accessible
  - Enter key submits search
  - WCAG 2.1.1, 2.4.7 compliant

#### 4.3. TC_A11Y_010: Status filter accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Tab to status filter dropdown
  2. Verify focus indicator visible
  3. Press Enter to open dropdown
  4. Use arrow keys to navigate options
  5. Press Enter to select
  6. Verify selection announced

**Expected Results:**
  - Filter controls keyboard accessible
  - Dropdown has accessible name
  - Options keyboard navigable
  - Selection announced
  - WCAG 2.1.1, 4.1.2, 4.1.3 compliant

### 5. Response Input

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_011: Response textarea has proper label

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to query with Pending Response
  2. Locate response textarea
  3. Verify label associated with textarea
  4. Verify word count requirement announced

**Expected Results:**
  - Textarea has programmatic label
  - Label describes purpose
  - Minimum word count requirement announced
  - WCAG 3.3.2, 4.1.2 compliant

#### 5.2. TC_A11Y_012: Response textarea keyboard accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Tab to response textarea
  2. Verify focus indicator visible
  3. Type response text
  4. Verify text appears
  5. Tab to next element

**Expected Results:**
  - Textarea keyboard accessible
  - Can type and edit text
  - Tab moves to next element
  - WCAG 2.1.1 compliant

#### 5.3. TC_A11Y_013: Word counter accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Type text in response textarea
  2. Verify word counter updates
  3. Verify counter announced to screen readers
  4. Verify minimum requirement indicated

**Expected Results:**
  - Word counter has aria-live region
  - Updates announced dynamically
  - Minimum requirement clear
  - WCAG 4.1.3, 3.3.1 compliant

#### 5.4. TC_A11Y_014: Disabled state accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to query with Responded status
  2. Verify textarea disabled
  3. Verify disabled state announced
  4. Verify visual indication present

**Expected Results:**
  - Textarea disabled when status not Pending Response
  - Disabled state announced
  - Visual indication of disabled state
  - WCAG 4.1.2, 1.4.1 compliant

### 6. Submit Response

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_015: Submit button keyboard accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Tab to Submit button
  2. Verify focus indicator visible
  3. Verify accessible name
  4. Press Enter to submit

**Expected Results:**
  - Submit button keyboard accessible
  - Has clear accessible name
  - Focus indicator visible
  - WCAG 2.1.1, 4.1.2, 2.4.7 compliant

#### 6.2. TC_A11Y_016: Submit button disabled state accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Type insufficient text
  2. Verify Submit button disabled
  3. Verify disabled state announced
  4. Verify reason indicated

**Expected Results:**
  - Button disabled when word count not met
  - Disabled state announced
  - Reason for disabled state clear
  - WCAG 4.1.2, 3.3.1 compliant

#### 6.3. TC_A11Y_017: Submission success accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Submit valid response
  2. Verify success message displayed
  3. Verify message announced
  4. Verify status updates to Pending Admin Approval

**Expected Results:**
  - Success message announced via aria-live
  - Message: 'Response marked as Pending Admin Approval'
  - Status update visible
  - WCAG 4.1.3, 3.3.4 compliant

#### 6.4. TC_A11Y_018: Validation errors accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Submit response below word count
  2. Verify error message displayed
  3. Verify error announced
  4. Verify error linked to textarea
  5. Verify error has sufficient contrast

**Expected Results:**
  - Error message visible and announced
  - Error has aria-describedby link
  - Error meets contrast requirements
  - WCAG 3.3.1, 4.1.3, 1.4.3 compliant

### 7. Response Status Labels

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_019: Pending approval label accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Submit response
  2. Verify Pending Admin Approval label visible
  3. Verify label announced to screen readers

**Expected Results:**
  - Label: 'Pending Admin Approval' accessible
  - Label clearly visible
  - Screen reader announces label
  - WCAG 4.1.2, 1.3.1 compliant

#### 7.2. TC_A11Y_020: Approved response label accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to approved response
  2. Verify 'Your Response (Approved)' label visible
  3. Verify response content accessible
  4. Verify label announced

**Expected Results:**
  - Label: 'Your Response (Approved)' accessible
  - Approved response content visible
  - Status clear to screen readers
  - WCAG 4.1.2, 1.3.1 compliant

#### 7.3. TC_A11Y_021: Admin response label accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to query with admin response
  2. Verify 'Admin Response (on your behalf)' label visible
  3. Verify label announced
  4. Verify response content accessible

**Expected Results:**
  - Label: 'Admin Response (on your behalf)' accessible
  - Admin response clearly distinguished
  - Screen reader announces label
  - WCAG 4.1.2, 1.3.1 compliant

### 8. Rejection Handling

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_022: Rejection reason accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to rejected response
  2. Verify rejection reason displayed
  3. Verify reason announced
  4. Verify reason has sufficient contrast

**Expected Results:**
  - Rejection reason visible
  - Reason announced to screen readers
  - Reason meets contrast requirements
  - WCAG 4.1.2, 1.4.3 compliant

#### 8.2. TC_A11Y_023: Re-submission accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. View rejected response
  2. Verify status changed to Pending Response
  3. Verify status change announced
  4. Verify textarea enabled for re-submission

**Expected Results:**
  - Query returns to Pending Response status
  - Status change announced
  - Response input re-enabled
  - WCAG 4.1.3, 4.1.2 compliant

### 9. Notifications

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_024: New query notification accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Receive new query
  2. Verify notification announced
  3. Verify notification count updates
  4. Verify count badge accessible

**Expected Results:**
  - New query notification announced
  - Notification has aria-live region
  - Notification count updates
  - WCAG 4.1.3 compliant

#### 9.2. TC_A11Y_025: Approval notification accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Receive approval notification
  2. Verify notification announced
  3. Verify notification text clear
  4. Tab to notification link
  5. Press Enter to open query

**Expected Results:**
  - Approval notification announced
  - Notification content clear
  - Link to query accessible
  - WCAG 4.1.3, 2.4.4 compliant

#### 9.3. TC_A11Y_026: Rejection notification accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Receive rejection notification
  2. Verify notification announced
  3. Verify rejection reason included
  4. Tab to notification link
  5. Press Enter to open query

**Expected Results:**
  - Rejection notification announced
  - Rejection reason included
  - Link to query accessible
  - WCAG 4.1.3, 2.4.4 compliant

#### 9.4. TC_A11Y_027: Notification badge accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. View notification badge
  2. Verify badge has accessible label
  3. Verify count announced
  4. Verify badge has sufficient contrast

**Expected Results:**
  - Notification badge has accessible name
  - Badge count announced
  - Badge meets contrast requirements
  - WCAG 4.1.2, 1.4.3 compliant

### 10. Visual Indicators

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_028: Pending approval indicator accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. View response pending approval
  2. Verify visual indicator present
  3. Verify indicator not color-only
  4. Verify text label present

**Expected Results:**
  - Pending approval indicator visible
  - Not relying on color alone
  - Text label present
  - WCAG 1.4.1, 4.1.2 compliant

#### 10.2. TC_A11Y_029: Approved indicator accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. View approved response
  2. Verify visual indicator present
  3. Verify indicator not color-only
  4. Verify text label present

**Expected Results:**
  - Approved indicator visible
  - Not relying on color alone
  - Text label present
  - WCAG 1.4.1, 4.1.2 compliant

#### 10.3. TC_A11Y_030: Rejected indicator accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. View rejected response
  2. Verify visual indicator present
  3. Verify indicator not color-only
  4. Verify text label present

**Expected Results:**
  - Rejected indicator visible
  - Not relying on color alone
  - Text label present
  - WCAG 1.4.1, 4.1.2 compliant

### 11. Keyboard Navigation

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_031: Complete workflow keyboard only

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Navigate to Queries using keyboard
  2. Tab through query list
  3. Select query using keyboard
  4. Type response using keyboard
  5. Submit response using keyboard
  6. Verify success without mouse

**Expected Results:**
  - Entire workflow completable via keyboard
  - No keyboard traps
  - Focus indicators always visible
  - WCAG 2.1.1, 2.1.2 compliant

#### 11.2. TC_A11Y_032: Skip links functional

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Tab from page top
  2. Verify skip link appears
  3. Activate skip link
  4. Verify focus moves to query list

**Expected Results:**
  - Skip link visible on focus
  - Skip link bypasses navigation
  - Focus moves to main content
  - WCAG 2.4.1 compliant

### 12. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 12.1. TC_A11Y_033: Color contrast sufficient

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Check text contrast throughout page
  2. Check button contrast
  3. Check status badge contrast
  4. Check notification badge contrast
  5. Verify all meet requirements

**Expected Results:**
  - All text meets 4.5:1 contrast
  - Large text meets 3:1 contrast
  - UI components meet 3:1 contrast
  - WCAG 1.4.3, 1.4.11 compliant

#### 12.2. TC_A11Y_034: Page usable at 200% zoom

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Set browser zoom to 200%
  2. Navigate Queries page
  3. Verify all content visible
  4. Verify no horizontal scrolling
  5. Verify response form usable

**Expected Results:**
  - All content readable at 200% zoom
  - No content cut off
  - No horizontal scrolling
  - WCAG 1.4.4, 1.4.10 compliant

#### 12.3. TC_A11Y_035: Focus indicators visible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Tab through all interactive elements
  2. Verify focus indicator on each element
  3. Measure focus indicator contrast
  4. Verify indicator at least 2px thick

**Expected Results:**
  - Focus indicators visible on all elements
  - Indicators meet 3:1 contrast ratio
  - Indicators clearly visible
  - WCAG 2.4.7, 2.4.11 compliant

### 13. Mobile Responsive

**Seed:** `tests/seed.spec.ts`

#### 13.1. TC_A11Y_036: Touch targets adequate size

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. View on mobile viewport (375x667)
  2. Measure query item tap targets
  3. Measure Submit button size
  4. Measure filter controls size
  5. Verify all at least 44x44 CSS pixels

**Expected Results:**
  - All touch targets at least 44x44px
  - Adequate spacing between targets
  - WCAG 2.5.5 compliant

#### 13.2. TC_A11Y_037: Mobile layout accessible

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. View on mobile viewport
  2. Verify query list usable
  3. Verify response form usable
  4. Verify no horizontal scroll required

**Expected Results:**
  - Layout adapts to mobile
  - All features accessible on mobile
  - No horizontal scrolling
  - WCAG 1.4.10 compliant

### 14. Screen Reader Compatibility

**Seed:** `tests/seed.spec.ts`

#### 14.1. TC_A11Y_038: NVDA navigation successful

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Enable NVDA screen reader
  2. Navigate to Queries page
  3. Use heading navigation (H key)
  4. Use form navigation (F key)
  5. Use button navigation (B key)
  6. Verify all content announced

**Expected Results:**
  - All content accessible via NVDA
  - Headings, forms, buttons announced
  - Navigation landmarks work
  - WCAG 4.1.2, 1.3.1 compliant

#### 14.2. TC_A11Y_039: JAWS navigation successful

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Enable JAWS screen reader
  2. Navigate Queries page
  3. Use virtual cursor
  4. Navigate forms mode
  5. Submit response
  6. Verify all interactions accessible

**Expected Results:**
  - All content accessible via JAWS
  - Forms mode works correctly
  - Dynamic updates announced
  - WCAG 4.1.2, 4.1.3 compliant

#### 14.3. TC_A11Y_040: VoiceOver navigation successful

**File:** `tests/accessibility/scrum201-pwd-queries.spec.ts`

**Steps:**
  1. Enable VoiceOver on macOS/iOS
  2. Navigate Queries page
  3. Use rotor to navigate headings
  4. Use rotor to navigate forms
  5. Verify all content announced

**Expected Results:**
  - All content accessible via VoiceOver
  - Rotor navigation works
  - Touch gestures work on iOS
  - WCAG 4.1.2 compliant
