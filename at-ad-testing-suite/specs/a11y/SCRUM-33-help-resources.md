# SCRUM-33: Help & Resources - Accessibility Test Plan

## Application Overview

Accessibility test plan for AP Help & Resources section including best practices, FAQs, and knowledge base covering WCAG 2.1 AA compliance

## Test Scenarios

### 1. Navigation and Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Help & Resources tab keyboard accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Login as AP user
  2. Tab to Help & Resources in navigation
  3. Verify focus indicator visible
  4. Press Enter to activate
  5. Verify redirects to Help & Resources page

**Expected Results:**
  - Help & Resources tab visible in navigation
  - Tab keyboard accessible
  - Focus indicator meets contrast requirements
  - WCAG 2.1.1, 2.4.7 compliant

#### 1.2. TC_A11Y_002: Page has proper heading structure

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to Help & Resources page
  2. Verify H1 exists for page title
  3. Verify section headings use H2
  4. Verify subsection headings use H3
  5. Test heading navigation with screen reader

**Expected Results:**
  - Page has H1 heading
  - Heading structure logical (H1, H2, H3)
  - Screen reader can navigate by headings
  - WCAG 1.3.1, 2.4.6 compliant

### 2. Search Bar

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_003: Search bar has proper label

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to Help & Resources page
  2. Locate search input field
  3. Verify label associated with input
  4. Verify placeholder text present
  5. Verify label announced by screen reader

**Expected Results:**
  - Search input has programmatic label
  - Placeholder text: 'Search articles, FAQs, or guides…'
  - Label accessible to screen readers
  - WCAG 3.3.2, 4.1.2 compliant

#### 2.2. TC_A11Y_004: Search bar keyboard accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Tab to search input
  2. Verify focus indicator visible
  3. Type search query
  4. Tab to Search button
  5. Press Enter to submit
  6. Verify results displayed

**Expected Results:**
  - Search input keyboard accessible
  - Search button keyboard accessible
  - Enter key submits search
  - Focus indicator visible
  - WCAG 2.1.1, 2.4.7 compliant

#### 2.3. TC_A11Y_005: Suggested keywords accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Focus on search input
  2. Type partial query
  3. Verify suggestions appear below
  4. Press Down arrow to navigate suggestions
  5. Verify focus moves to suggestions
  6. Press Enter to select suggestion

**Expected Results:**
  - Suggestions appear in accessible list
  - Suggestions keyboard navigable
  - Arrow keys navigate suggestions
  - Enter selects suggestion
  - WCAG 4.1.2, 2.1.1 compliant

### 3. Category Tabs

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_006: Category tabs keyboard navigable

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to Help & Resources page
  2. Tab to Categories tab
  3. Verify focus indicator visible
  4. Tab to FAQs tab
  5. Tab to Contact tab
  6. Verify logical tab order

**Expected Results:**
  - All tabs keyboard accessible
  - Tab order logical (Categories, FAQs, Contact)
  - Focus indicator visible on each tab
  - WCAG 2.1.1, 2.4.3 compliant

#### 3.2. TC_A11Y_007: Tabs have proper ARIA roles

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Inspect tab structure
  2. Verify tablist role present
  3. Verify each tab has role='tab'
  4. Verify aria-selected on active tab
  5. Verify tabpanel role on content area

**Expected Results:**
  - Tabs have role='tablist'
  - Each tab has role='tab'
  - aria-selected reflects active tab
  - Content has role='tabpanel'
  - WCAG 4.1.2, 1.3.1 compliant

#### 3.3. TC_A11Y_008: Arrow key navigation works

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Focus on Categories tab
  2. Press Right arrow
  3. Verify focus moves to FAQs tab
  4. Verify content updates
  5. Press Left arrow
  6. Verify focus returns to Categories tab

**Expected Results:**
  - Arrow keys navigate between tabs
  - Left/Right arrows move focus
  - Tab selection updates content
  - Content change announced to screen readers
  - WCAG 2.1.1, 4.1.3 compliant

### 4. Categories View

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_009: Category cards keyboard accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to Categories tab
  2. Tab through category cards
  3. Verify focus indicator on each card
  4. Press Enter on Best Practices card
  5. Verify articles list expands

**Expected Results:**
  - Category cards keyboard accessible
  - All cards reachable via Tab
  - Focus indicator visible
  - Enter activates card
  - WCAG 2.1.1, 2.4.7 compliant

#### 4.2. TC_A11Y_010: Category card content accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to category card
  2. Verify icon has alt text or aria-label
  3. Verify category name announced
  4. Verify article count announced
  5. Verify complete card information accessible

**Expected Results:**
  - Icons have text alternatives
  - Category name announced
  - Article count announced
  - Screen reader provides complete information
  - WCAG 1.1.1, 4.1.2 compliant

#### 4.3. TC_A11Y_011: Article list semantic structure

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Expand category to show articles
  2. Verify articles in list structure
  3. Verify article title is heading or link
  4. Verify summary text accessible
  5. Verify publish date and read time accessible

**Expected Results:**
  - Articles displayed in semantic list
  - Each article has proper structure
  - Title, summary, date, read time all accessible
  - WCAG 1.3.1, 4.1.2 compliant

#### 4.4. TC_A11Y_012: Article expansion accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Tab to category card
  2. Verify aria-expanded='false' initially
  3. Press Enter to expand
  4. Verify aria-expanded='true'
  5. Verify expansion announced to screen readers
  6. Press Enter to collapse

**Expected Results:**
  - Expand/collapse button keyboard accessible
  - aria-expanded reflects state
  - State change announced
  - WCAG 4.1.2, 4.1.3 compliant

### 5. FAQs View

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_013: FAQ items keyboard navigable

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to FAQs tab
  2. Tab through FAQ categories
  3. Verify focus indicator on each item
  4. Verify logical tab order

**Expected Results:**
  - All FAQ items keyboard accessible
  - Tab order follows visual layout
  - Focus indicator visible
  - WCAG 2.1.1, 2.4.3 compliant

#### 5.2. TC_A11Y_014: FAQ accordion structure proper

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Inspect FAQ item structure
  2. Verify button role on question
  3. Verify aria-expanded attribute
  4. Verify aria-controls links to answer
  5. Verify answer has aria-labelledby

**Expected Results:**
  - FAQ items use accordion pattern
  - Each item has button with aria-expanded
  - Content has aria-labelledby
  - WCAG 4.1.2, 1.3.1 compliant

#### 5.3. TC_A11Y_015: FAQ expand/collapse accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Tab to FAQ item
  2. Verify aria-expanded='false'
  3. Press Enter to expand
  4. Verify aria-expanded='true'
  5. Verify answer content visible
  6. Verify expansion announced

**Expected Results:**
  - Enter/Space expands FAQ item
  - aria-expanded updates correctly
  - Expansion announced to screen readers
  - WCAG 2.1.1, 4.1.3 compliant

#### 5.4. TC_A11Y_016: FAQ categories accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to FAQs tab
  2. Verify Account & Registration category
  3. Verify Product Listings category
  4. Verify GenAI Assistance category
  5. Verify Review and Ratings category
  6. Verify Technical Support category

**Expected Results:**
  - All FAQ categories accessible
  - Categories properly labeled
  - Screen reader announces category names
  - WCAG 4.1.2 compliant

### 6. Contact View

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_017: Contact options keyboard accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to Contact tab
  2. Tab through contact options
  3. Verify Email Support link accessible
  4. Verify Phone Support link accessible
  5. Verify focus indicators visible

**Expected Results:**
  - All contact options keyboard accessible
  - Email and phone links functional
  - Focus indicator visible
  - WCAG 2.1.1, 2.4.7 compliant

#### 6.2. TC_A11Y_018: Email support link accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to Email Support
  2. Verify email address is link
  3. Verify link has accessible name
  4. Verify mailto: protocol used
  5. Press Enter to activate link

**Expected Results:**
  - Email address has mailto link
  - Link has descriptive text
  - Screen reader announces link purpose
  - WCAG 2.4.4, 4.1.2 compliant

#### 6.3. TC_A11Y_019: Phone support accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to Phone Support
  2. Verify phone number is link
  3. Verify tel: protocol used
  4. Verify working hours displayed
  5. Verify all information announced

**Expected Results:**
  - Phone number has tel link
  - Working hours clearly displayed
  - All information accessible to screen readers
  - WCAG 2.4.4, 4.1.2 compliant

### 7. Search Results

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_020: Search results semantic structure

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Perform search query
  2. Verify results in list structure
  3. Verify result count announced
  4. Verify each result has title and category

**Expected Results:**
  - Results displayed in semantic list
  - Each result has proper structure
  - Result count announced
  - WCAG 1.3.1, 4.1.2 compliant

#### 7.2. TC_A11Y_021: Result categories accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Perform search
  2. Verify results grouped by category
  3. Verify category headings present
  4. Verify categories announced

**Expected Results:**
  - Results categorized as FAQs, Guides, Articles
  - Categories clearly labeled
  - Screen reader announces categories
  - WCAG 1.3.1, 4.1.2 compliant

#### 7.3. TC_A11Y_022: Search filters accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. View search results
  2. Tab to filter controls
  3. Verify filters keyboard accessible
  4. Apply filter
  5. Verify results update announced

**Expected Results:**
  - Filter controls keyboard accessible
  - Sort options keyboard accessible
  - Changes announced to screen readers
  - WCAG 2.1.1, 4.1.3 compliant

### 8. Notifications

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_023: New content notifications accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Receive new guide notification
  2. Verify notification announced
  3. Verify notification text clear
  4. Tab to notification link
  5. Press Enter to open new guide

**Expected Results:**
  - New content notifications announced
  - Notification has aria-live region
  - Link to new resource accessible
  - WCAG 4.1.3 compliant

#### 8.2. TC_A11Y_024: Notification links functional

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to notification
  2. Tab to notification link
  3. Verify link accessible name
  4. Press Enter to activate
  5. Verify correct resource opens

**Expected Results:**
  - Notification link keyboard accessible
  - Link has descriptive text
  - Opens correct resource
  - WCAG 2.4.4, 2.1.1 compliant

### 9. Feedback Buttons

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_025: Feedback buttons accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to article or FAQ
  2. Tab to Helpful button
  3. Verify accessible name (not just emoji)
  4. Tab to Needs Improvement button
  5. Verify accessible name
  6. Press Enter to submit feedback

**Expected Results:**
  - Helpful and Needs Improvement buttons keyboard accessible
  - Buttons have accessible names
  - Not relying on emoji alone
  - WCAG 2.1.1, 4.1.2, 1.4.1 compliant

#### 9.2. TC_A11Y_026: Feedback submission accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Click Helpful button
  2. Verify submission announced
  3. Verify success message displayed
  4. Verify button state reflects submission

**Expected Results:**
  - Feedback submission announced
  - Success message in aria-live region
  - Button state updates appropriately
  - WCAG 4.1.3 compliant

### 10. Error Handling

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_027: No results error accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Search for non-existent term
  2. Verify no results message displayed
  3. Verify message announced
  4. Verify contact support link present
  5. Verify link keyboard accessible

**Expected Results:**
  - No results message: 'No results found. Please try a different keyword or contact support.'
  - Message announced to screen readers
  - Contact support link accessible
  - WCAG 3.3.1, 4.1.3 compliant

#### 10.2. TC_A11Y_028: System error accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Simulate system failure
  2. Verify error message displayed
  3. Verify error announced
  4. Verify error has sufficient contrast

**Expected Results:**
  - Error message: 'Help Center is temporarily unavailable. Please check back later.'
  - Error announced via aria-live
  - Error meets contrast requirements
  - WCAG 3.3.1, 4.1.3, 1.4.3 compliant

### 11. Images and Media

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_029: Images have alt text

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate through articles
  2. Inspect all images
  3. Verify alt attributes present
  4. Verify alt text descriptive
  5. Verify decorative images have alt=''

**Expected Results:**
  - All images have alt text
  - Alt text descriptive and meaningful
  - Decorative images have empty alt
  - WCAG 1.1.1 compliant

#### 11.2. TC_A11Y_030: Diagrams accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to article with diagram
  2. Verify diagram has alt text
  3. Verify detailed description available
  4. Verify description accessible to screen readers

**Expected Results:**
  - Diagrams have detailed alt text or longdesc
  - Complex images have text alternative
  - Screen reader can access full description
  - WCAG 1.1.1 compliant

#### 11.3. TC_A11Y_031: Videos accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to article with video
  2. Verify captions available
  3. Verify transcript link present
  4. Tab to video controls
  5. Verify controls keyboard accessible

**Expected Results:**
  - Videos have captions
  - Transcripts available
  - Video controls keyboard accessible
  - WCAG 1.2.2, 2.1.1 compliant

### 12. Keyboard Navigation

**Seed:** `tests/seed.spec.ts`

#### 12.1. TC_A11Y_032: Complete workflow keyboard only

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Navigate to Help & Resources using keyboard
  2. Tab through all interactive elements
  3. Verify no keyboard traps
  4. Complete search using keyboard
  5. Navigate tabs using keyboard
  6. Expand/collapse items using keyboard

**Expected Results:**
  - Entire page keyboard navigable
  - No keyboard traps
  - Focus indicators always visible
  - WCAG 2.1.1, 2.1.2 compliant

#### 12.2. TC_A11Y_033: Skip links functional

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Tab from page top
  2. Verify skip link appears
  3. Activate skip link
  4. Verify focus moves to main content

**Expected Results:**
  - Skip link visible on focus
  - Skip link bypasses navigation
  - Focus moves to main content
  - WCAG 2.4.1 compliant

### 13. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 13.1. TC_A11Y_034: Color contrast sufficient

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Check text contrast throughout page
  2. Check button contrast
  3. Check tab contrast
  4. Check link contrast
  5. Verify all meet requirements

**Expected Results:**
  - All text meets 4.5:1 contrast
  - Large text meets 3:1 contrast
  - UI components meet 3:1 contrast
  - WCAG 1.4.3, 1.4.11 compliant

#### 13.2. TC_A11Y_035: Page usable at 200% zoom

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Set browser zoom to 200%
  2. Navigate Help & Resources page
  3. Verify all content visible
  4. Verify no horizontal scrolling
  5. Verify all features usable

**Expected Results:**
  - All content readable at 200% zoom
  - No content cut off
  - No horizontal scrolling
  - WCAG 1.4.4, 1.4.10 compliant

#### 13.3. TC_A11Y_036: Not relying on color alone

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Review all visual indicators
  2. Verify icons have text labels
  3. Verify status uses text
  4. Verify links distinguishable without color

**Expected Results:**
  - Information not conveyed by color alone
  - Icons have text labels
  - Status uses text and color
  - WCAG 1.4.1 compliant

### 14. Mobile Responsive

**Seed:** `tests/seed.spec.ts`

#### 14.1. TC_A11Y_037: Touch targets adequate size

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. View on mobile viewport (375x667)
  2. Measure tab button sizes
  3. Measure category card sizes
  4. Measure FAQ item sizes
  5. Verify all at least 44x44 CSS pixels

**Expected Results:**
  - All touch targets at least 44x44px
  - Adequate spacing between targets
  - WCAG 2.5.5 compliant

#### 14.2. TC_A11Y_038: Mobile layout accessible

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. View on mobile viewport
  2. Verify search bar usable
  3. Verify tabs accessible
  4. Verify content readable
  5. Verify no horizontal scroll required

**Expected Results:**
  - Layout adapts to mobile
  - All features accessible on mobile
  - No horizontal scrolling
  - WCAG 1.4.10 compliant

### 15. Screen Reader Compatibility

**Seed:** `tests/seed.spec.ts`

#### 15.1. TC_A11Y_039: NVDA navigation successful

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Enable NVDA screen reader
  2. Navigate to Help & Resources
  3. Use heading navigation (H key)
  4. Use button navigation (B key)
  5. Use landmark navigation
  6. Verify all content announced

**Expected Results:**
  - All content accessible via NVDA
  - Headings, forms, buttons announced
  - Navigation landmarks work
  - WCAG 4.1.2, 1.3.1 compliant

#### 15.2. TC_A11Y_040: JAWS navigation successful

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Enable JAWS screen reader
  2. Navigate Help & Resources page
  3. Use virtual cursor
  4. Navigate tabs
  5. Expand/collapse items
  6. Verify all interactions accessible

**Expected Results:**
  - All content accessible via JAWS
  - Tab navigation works correctly
  - Dynamic updates announced
  - WCAG 4.1.2, 4.1.3 compliant

#### 15.3. TC_A11Y_041: VoiceOver navigation successful

**File:** `tests/accessibility/scrum33-help-resources.spec.ts`

**Steps:**
  1. Enable VoiceOver on macOS/iOS
  2. Navigate Help & Resources page
  3. Use rotor to navigate headings
  4. Use rotor to navigate links
  5. Verify all content announced

**Expected Results:**
  - All content accessible via VoiceOver
  - Rotor navigation works
  - Touch gestures work on iOS
  - WCAG 4.1.2 compliant
