# SCRUM-31: AP Responds to Reviews - Accessibility Test Plan

## Application Overview

Accessibility test plan for Assistive Partner Responds to Reviews and Questions feature covering WCAG 2.1 AA compliance

## Test Scenarios

### 1. Reviews & Ratings Section Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Reviews & Ratings section keyboard accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Login as AP user
  2. Navigate to Reviews & Ratings section
  3. Tab through all interactive elements
  4. Verify focus indicators visible on each element
  5. Verify logical tab order

**Expected Results:**
  - All elements reachable via keyboard
  - Focus indicators meet 3:1 contrast ratio
  - Tab order follows visual layout
  - WCAG 2.1.1, 2.4.3, 2.4.7 compliant

#### 1.2. TC_A11Y_002: Review entries have proper semantic structure

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to Reviews & Ratings section
  2. Inspect review entry structure with screen reader
  3. Verify Product Name is heading
  4. Verify star rating has accessible label
  5. Verify status badge has text alternative

**Expected Results:**
  - Reviews displayed in semantic list
  - Each review has proper ARIA labels
  - Star rating announced correctly
  - Status (Approved/Pending/Flagged) announced
  - WCAG 4.1.2, 1.3.1 compliant

#### 1.3. TC_A11Y_003: Review metadata accessible to screen readers

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to review entry
  2. Verify Product Name announced
  3. Verify Star Rating announced with value
  4. Verify Submission Date announced
  5. Verify Anonymous User Tag announced
  6. Verify Status announced

**Expected Results:**
  - All metadata has accessible labels
  - Screen reader announces complete information
  - Date format is clear
  - WCAG 4.1.2, 1.3.1 compliant

### 2. Respond to Review Button

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_004: Respond to Review button keyboard accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Tab to Respond to Review button
  2. Verify focus indicator visible
  3. Press Enter to activate
  4. Verify response form opens
  5. Press Escape to close

**Expected Results:**
  - Button reachable via Tab
  - Focus indicator meets contrast requirements
  - Enter/Space activates button
  - Button has accessible name
  - WCAG 2.1.1, 2.4.7 compliant

#### 2.2. TC_A11Y_005: Respond button has clear accessible name

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Inspect Respond to Review button
  2. Verify accessible name present
  3. Verify name describes action clearly

**Expected Results:**
  - Button has accessible name 'Respond to Review'
  - Name is descriptive and clear
  - WCAG 4.1.2 compliant

### 3. Response Form

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_006: Response textarea has proper label

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Click Respond to Review button
  2. Inspect response textarea
  3. Verify label associated with textarea
  4. Verify character limit (500) announced
  5. Verify moderation notice visible

**Expected Results:**
  - Textarea has programmatic label
  - Character limit announced to screen readers
  - Moderation notice: 'Your response will be visible publicly after admin approval'
  - WCAG 3.3.2, 4.1.2 compliant

#### 3.2. TC_A11Y_007: Character counter accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Type text in response textarea
  2. Verify character counter updates
  3. Verify counter announced to screen readers
  4. Type beyond limit
  5. Verify error message announced

**Expected Results:**
  - Character counter has aria-live region
  - Updates announced dynamically
  - Exceeding limit triggers accessible error
  - WCAG 4.1.3, 3.3.1 compliant

#### 3.3. TC_A11Y_008: Submit response button accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Tab to Submit button
  2. Verify focus indicator visible
  3. Verify accessible name
  4. Press Enter to submit
  5. Verify success message announced

**Expected Results:**
  - Submit button keyboard accessible
  - Has clear accessible name
  - Success message in aria-live region
  - WCAG 2.1.1, 4.1.3 compliant

#### 3.4. TC_A11Y_009: Form validation errors accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Submit empty response
  2. Verify error message displayed
  3. Verify error announced to screen readers
  4. Verify focus moved to error or field
  5. Verify error linked to textarea

**Expected Results:**
  - Error message visible and announced
  - Error has aria-describedby link
  - Focus management appropriate
  - WCAG 3.3.1, 3.3.3, 4.1.3 compliant

### 4. Queries Section

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_010: Queries section keyboard navigable

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to Queries section
  2. Tab through all query entries
  3. Verify focus indicators visible
  4. Verify logical tab order

**Expected Results:**
  - All queries keyboard accessible
  - Focus indicators meet contrast requirements
  - Tab order logical
  - WCAG 2.1.1, 2.4.3 compliant

#### 4.2. TC_A11Y_011: Query metadata accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to query entry
  2. Verify Question Text announced
  3. Verify Timestamp announced
  4. Verify Context announced

**Expected Results:**
  - All query metadata has accessible labels
  - Screen reader announces complete information
  - Context label clear (e.g., 'Asked about Product Availability')
  - WCAG 4.1.2, 1.3.1 compliant

### 5. Moderation Status

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_012: Pending status badge accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Submit response
  2. Verify Pending Moderation status displayed
  3. Verify status has text label
  4. Verify status not conveyed by color alone
  5. Verify timestamp visible

**Expected Results:**
  - Status badge has text 'Pending Moderation'
  - Not relying on color alone
  - Icon has text alternative if present
  - WCAG 1.4.1, 4.1.2 compliant

#### 5.2. TC_A11Y_013: Status changes announced

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Monitor response status
  2. Verify status change announced dynamically
  3. Verify aria-live region present

**Expected Results:**
  - Status changes announced to screen readers
  - aria-live region configured properly
  - WCAG 4.1.3 compliant

### 6. Notifications

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_014: Notification panel keyboard accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to notification panel
  2. Tab through notifications
  3. Verify focus indicators visible
  4. Press Enter to open notification

**Expected Results:**
  - All notifications keyboard accessible
  - Focus indicators visible
  - Enter/Space activates notification
  - WCAG 2.1.1, 2.4.7 compliant

#### 6.2. TC_A11Y_015: Notification content accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Receive notification for new review
  2. Verify notification text announced
  3. Receive approval notification
  4. Verify approval message announced
  5. Receive rejection notification
  6. Verify rejection reason announced

**Expected Results:**
  - All notification types announced
  - Content clear and descriptive
  - Example: 'Your response to Smart Hearing Aid X has been approved and published'
  - WCAG 4.1.2, 4.1.3 compliant

#### 6.3. TC_A11Y_016: New notification alerts accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Receive new notification
  2. Verify alert announced to screen readers
  3. Verify notification badge visible
  4. Verify badge has accessible label

**Expected Results:**
  - New notifications announced via aria-live
  - Badge has accessible name with count
  - Visual indicator meets contrast requirements
  - WCAG 4.1.3, 1.4.3 compliant

### 7. Edit Response

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_017: Edit button keyboard accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to submitted response
  2. Tab to Edit button
  3. Verify focus indicator visible
  4. Press Enter to activate
  5. Verify edit form opens

**Expected Results:**
  - Edit button keyboard accessible
  - Has clear accessible name 'Edit'
  - Focus indicator visible
  - WCAG 2.1.1, 4.1.2 compliant

#### 7.2. TC_A11Y_018: Edit form pre-populated correctly

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Click Edit button
  2. Verify textarea contains existing response
  3. Verify cursor position announced
  4. Verify character count reflects existing text

**Expected Results:**
  - Existing text loaded in textarea
  - Screen reader announces pre-filled content
  - Character counter accurate
  - WCAG 4.1.2 compliant

#### 7.3. TC_A11Y_019: Re-moderation notice accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Edit approved response
  2. Verify re-moderation notice displayed
  3. Verify notice announced to screen readers

**Expected Results:**
  - Notice visible: 'Edited responses re-enter admin moderation queue'
  - Notice announced to screen readers
  - WCAG 3.3.2 compliant

### 8. Withdraw Response

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_020: Withdraw button keyboard accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to response
  2. Tab to Withdraw button
  3. Verify focus indicator visible
  4. Press Enter to activate
  5. Verify confirmation dialog opens

**Expected Results:**
  - Withdraw button keyboard accessible
  - Has clear accessible name 'Withdraw' or 'Delete'
  - Focus indicator visible
  - WCAG 2.1.1, 4.1.2 compliant

#### 8.2. TC_A11Y_021: Confirmation dialog accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Click Withdraw button
  2. Verify dialog has aria-modal=true
  3. Verify focus trapped in dialog
  4. Tab through dialog elements
  5. Press Escape to close
  6. Verify focus returns to trigger button

**Expected Results:**
  - Dialog has role='dialog' or 'alertdialog'
  - Focus trapped within dialog
  - Escape closes dialog
  - Focus returns to Withdraw button
  - WCAG 2.1.2, 2.4.3 compliant

#### 8.3. TC_A11Y_022: Confirmation message clear

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Open withdraw confirmation
  2. Verify message text clear
  3. Verify Confirm and Cancel buttons labeled
  4. Verify buttons keyboard accessible

**Expected Results:**
  - Message: 'Are you sure you want to withdraw this response?'
  - Confirm and Cancel buttons clearly labeled
  - Both buttons keyboard accessible
  - WCAG 3.3.4, 4.1.2 compliant

### 9. Response Visibility on Portal

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_023: AP response visually distinguished

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. View approved response on product page
  2. Verify visual distinction (shaded background, indentation)
  3. Verify distinction not by color alone
  4. Verify label 'Response from Assistive Partner' present

**Expected Results:**
  - Response visually distinguished from user posts
  - Not relying on color alone
  - Label provides context
  - WCAG 1.4.1, 1.3.1 compliant

#### 9.2. TC_A11Y_024: Response metadata accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to AP response
  2. Verify timestamp announced
  3. Verify organization name announced
  4. Verify label 'Response from Assistive Partner' announced

**Expected Results:**
  - All metadata accessible to screen readers
  - Organization name clear
  - Timestamp in accessible format
  - WCAG 4.1.2 compliant

#### 9.3. TC_A11Y_025: Expand/collapse responses accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to long response
  2. Tab to expand/collapse button
  3. Verify button has accessible name
  4. Verify aria-expanded state
  5. Press Enter to toggle
  6. Verify state change announced

**Expected Results:**
  - Expand/collapse button keyboard accessible
  - aria-expanded reflects state
  - State changes announced
  - WCAG 4.1.2, 4.1.3 compliant

### 10. Content Guidelines Reference

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_026: Guidelines link accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to response form
  2. Locate content guidelines link
  3. Verify link keyboard accessible
  4. Verify link has descriptive text
  5. Press Enter to open guidelines

**Expected Results:**
  - Link keyboard accessible
  - Link text descriptive (not 'click here')
  - Opens in new tab with warning
  - WCAG 2.4.4, 3.2.5 compliant

### 11. Error Handling

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_027: Save failure error accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Simulate network failure
  2. Submit response
  3. Verify error message displayed
  4. Verify error announced to screen readers
  5. Verify error has sufficient contrast

**Expected Results:**
  - Error message: 'Unable to save your response at this time. Please try again later.'
  - Error announced via aria-live
  - Error meets contrast requirements
  - WCAG 3.3.1, 4.1.3, 1.4.3 compliant

#### 11.2. TC_A11Y_028: Pending status timeout accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. View response in Pending status
  2. Verify timestamp visible
  3. Verify status remains clear over time

**Expected Results:**
  - Pending status clearly labeled
  - Timestamp shows submission time
  - Status accessible to screen readers
  - WCAG 4.1.2 compliant

### 12. Keyboard Navigation

**Seed:** `tests/seed.spec.ts`

#### 12.1. TC_A11Y_029: Complete workflow keyboard only

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Navigate to Reviews & Ratings using keyboard only
  2. Tab to review entry
  3. Tab to Respond button and activate
  4. Tab to textarea and type response
  5. Tab to Submit button and activate
  6. Verify success without mouse

**Expected Results:**
  - Entire workflow completable via keyboard
  - No keyboard traps
  - Focus indicators always visible
  - WCAG 2.1.1, 2.1.2 compliant

#### 12.2. TC_A11Y_030: Skip links available

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Tab from page top
  2. Verify skip link appears
  3. Activate skip link
  4. Verify focus moves to main content

**Expected Results:**
  - Skip link visible on focus
  - Skip link functional
  - Bypasses repetitive navigation
  - WCAG 2.4.1 compliant

### 13. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 13.1. TC_A11Y_031: Color contrast sufficient

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Check text contrast in Reviews section
  2. Check button contrast
  3. Check status badge contrast
  4. Check notification badge contrast
  5. Verify all meet 4.5:1 (text) or 3:1 (large text, UI components)

**Expected Results:**
  - All text meets 4.5:1 contrast ratio
  - Large text meets 3:1 contrast ratio
  - UI components meet 3:1 contrast ratio
  - WCAG 1.4.3, 1.4.11 compliant

#### 13.2. TC_A11Y_032: Page usable at 200% zoom

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Set browser zoom to 200%
  2. Navigate Reviews & Ratings section
  3. Verify all content visible
  4. Verify no horizontal scrolling required
  5. Verify response form usable

**Expected Results:**
  - All content readable at 200% zoom
  - No content cut off
  - No horizontal scrolling on desktop
  - WCAG 1.4.4, 1.4.10 compliant

#### 13.3. TC_A11Y_033: Focus indicators visible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Tab through all interactive elements
  2. Verify focus indicator on each element
  3. Measure focus indicator contrast
  4. Verify indicator at least 2px thick or equivalent

**Expected Results:**
  - Focus indicators visible on all elements
  - Indicators meet 3:1 contrast ratio
  - Indicators clearly visible
  - WCAG 2.4.7, 2.4.11 compliant

### 14. Mobile Responsive

**Seed:** `tests/seed.spec.ts`

#### 14.1. TC_A11Y_034: Touch targets adequate size

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. View on mobile viewport (375x667)
  2. Measure Respond button size
  3. Measure Edit/Withdraw button sizes
  4. Measure notification tap targets
  5. Verify all at least 44x44 CSS pixels

**Expected Results:**
  - All touch targets at least 44x44px
  - Adequate spacing between targets
  - WCAG 2.5.5 compliant

#### 14.2. TC_A11Y_035: Mobile layout accessible

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. View on mobile viewport
  2. Verify response form usable
  3. Verify no content requires horizontal scroll
  4. Verify all features accessible

**Expected Results:**
  - Layout adapts to mobile
  - All features accessible on mobile
  - No horizontal scrolling required
  - WCAG 1.4.10 compliant

### 15. Screen Reader Compatibility

**Seed:** `tests/seed.spec.ts`

#### 15.1. TC_A11Y_036: NVDA navigation successful

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Enable NVDA screen reader
  2. Navigate to Reviews & Ratings
  3. Use heading navigation (H key)
  4. Use form navigation (F key)
  5. Use button navigation (B key)
  6. Verify all content announced correctly

**Expected Results:**
  - All headings announced with level
  - All forms and fields announced
  - All buttons announced with name
  - Navigation landmarks work
  - WCAG 4.1.2, 1.3.1 compliant

#### 15.2. TC_A11Y_037: JAWS navigation successful

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Enable JAWS screen reader
  2. Navigate Reviews & Ratings section
  3. Use virtual cursor
  4. Navigate forms mode
  5. Verify all interactive elements accessible

**Expected Results:**
  - All content accessible via JAWS
  - Forms mode works correctly
  - Dynamic updates announced
  - WCAG 4.1.2, 4.1.3 compliant

#### 15.3. TC_A11Y_038: VoiceOver navigation successful

**File:** `tests/accessibility/scrum31-ap-responds-reviews.spec.ts`

**Steps:**
  1. Enable VoiceOver on macOS/iOS
  2. Navigate Reviews & Ratings section
  3. Use rotor to navigate headings
  4. Use rotor to navigate forms
  5. Verify all content announced

**Expected Results:**
  - All content accessible via VoiceOver
  - Rotor navigation works
  - Touch gestures work on iOS
  - WCAG 4.1.2 compliant
