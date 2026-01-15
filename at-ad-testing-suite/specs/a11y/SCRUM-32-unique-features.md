# Accessibility Test Plan: Unique Features Highlighting (WCAG 2.1 AA)

## Application Overview

Comprehensive accessibility test plan for highlighting product unique features ensuring WCAG 2.1 AA compliance. Tests cover optional field inputs, character limits, GenAI assistance, feature display on product details page, and collapsible sections.

## Test Scenarios

### 1. Form Field Access and Labels

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Unique features field has label

**File:** `tests/accessibility/SCRUM-32/field-label.spec.ts`

**Steps:**
  1. Navigate to Product detail page
  2. Locate 'Highlight Unique Feature(s)' field
  3. Verify visible label present
  4. Check label associated with field
  5. Verify instructional note visible
  6. Check optional status indicated

**Expected Results:**
  - Field has visible label
  - Label programmatically associated
  - Instructional note visible
  - Optional status indicated
  - aria-required='false' or absent

#### 1.2. TC_A11Y_002: Instructional note accessible

**File:** `tests/accessibility/SCRUM-32/help-text.spec.ts`

**Steps:**
  1. Locate instructional note
  2. Verify text visible
  3. Check aria-describedby links to field
  4. Use screen reader to verify announcement
  5. Verify examples provided

**Expected Results:**
  - Help text visible
  - Help text linked with aria-describedby
  - Screen reader announces help text
  - Examples clear and helpful
  - Text remains visible on focus

#### 1.3. TC_A11Y_003: Feature title and description inputs labeled

**File:** `tests/accessibility/SCRUM-32/feature-inputs.spec.ts`

**Steps:**
  1. Add first unique feature
  2. Verify title input has label
  3. Verify description input has label
  4. Check both labels associated
  5. Verify character limit shown (100 chars)
  6. Check tab order logical

**Expected Results:**
  - Title input has label
  - Description input has label
  - Both labels associated correctly
  - Character limit indicated
  - Tab order logical (title then description)

### 2. Adding Multiple Features

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_004: Add feature button accessible

**File:** `tests/accessibility/SCRUM-32/add-feature-button.spec.ts`

**Steps:**
  1. Tab to 'Add Feature' button
  2. Verify focus indicator visible
  3. Check button has accessible name
  4. Press Enter to add feature
  5. Add 3 features total
  6. Verify button disabled after limit

**Expected Results:**
  - Button keyboard accessible
  - Button has accessible name
  - Enter/Space activates button
  - Focus indicator visible
  - Button disabled after 3 features

#### 2.2. TC_A11Y_005: Add button disabled state indicated

**File:** `tests/accessibility/SCRUM-32/button-disabled-state.spec.ts`

**Steps:**
  1. Add 3 unique features
  2. Verify Add button becomes disabled
  3. Check aria-disabled='true'
  4. Verify visual indication
  5. Use screen reader to verify disabled state

**Expected Results:**
  - Disabled state visually indicated
  - aria-disabled='true' present
  - Screen reader announces disabled
  - Tooltip explains limit if present
  - Not in tab order when disabled

#### 2.3. TC_A11Y_006: Multiple features keyboard navigable

**File:** `tests/accessibility/SCRUM-32/multiple-features-nav.spec.ts`

**Steps:**
  1. Add 3 features
  2. Tab through all inputs
  3. Verify logical tab order
  4. Check all fields accessible
  5. Verify remove buttons accessible

**Expected Results:**
  - Each feature independently accessible
  - Tab order logical across features
  - All inputs keyboard accessible
  - Remove buttons accessible
  - Screen reader announces feature count

### 3. Character Limit and Validation

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_007: Character counter accessible

**File:** `tests/accessibility/SCRUM-32/character-counter.spec.ts`

**Steps:**
  1. Type in description field
  2. Verify character count visible
  3. Check count updates dynamically
  4. Verify aria-live announces updates
  5. Type near limit and verify warning

**Expected Results:**
  - Character count visible
  - Count updates dynamically
  - Count announced via aria-live
  - Visual indicator when approaching limit
  - Remaining characters shown

#### 3.2. TC_A11Y_008: Character limit error accessible

**File:** `tests/accessibility/SCRUM-32/char-limit-error.spec.ts`

**Steps:**
  1. Type more than 100 characters
  2. Trigger validation
  3. Verify error message appears
  4. Check aria-invalid='true'
  5. Verify aria-describedby links error
  6. Use screen reader to verify announcement

**Expected Results:**
  - Error message appears
  - Error linked with aria-describedby
  - aria-invalid='true' on input
  - Error specific and clear
  - Screen reader announces error

#### 3.3. TC_A11Y_009: Feature limit error accessible

**File:** `tests/accessibility/SCRUM-32/feature-limit-error.spec.ts`

**Steps:**
  1. Attempt to add 4th feature
  2. Verify error message appears
  3. Check error text clear
  4. Verify aria-live announces error
  5. Check error suggests limit (3 features max)

**Expected Results:**
  - Error message clear
  - Error linked to field
  - aria-invalid='true' present
  - Suggests correction
  - Screen reader announces error

### 4. GenAI Assistance Button

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_010: GenAI assist button accessible

**File:** `tests/accessibility/SCRUM-32/genai-button.spec.ts`

**Steps:**
  1. Locate 'Assist with GenAI' button
  2. Tab to button
  3. Verify focus indicator visible
  4. Check button has accessible name
  5. Press Enter to activate

**Expected Results:**
  - Button keyboard accessible
  - Button has accessible name
  - Enter/Space activates button
  - Focus indicator visible
  - Button positioned logically

#### 4.2. TC_A11Y_011: GenAI processing state announced

**File:** `tests/accessibility/SCRUM-32/genai-loading.spec.ts`

**Steps:**
  1. Click GenAI assist button
  2. Verify loading indicator appears
  3. Check aria-busy='true' on container
  4. Verify loading announced via aria-live
  5. Check completion announced

**Expected Results:**
  - Loading state announced
  - aria-busy='true' during processing
  - Loading indicator visible
  - Completion announced
  - Focus managed correctly

#### 4.3. TC_A11Y_012: GenAI result accessible

**File:** `tests/accessibility/SCRUM-32/genai-result.spec.ts`

**Steps:**
  1. Use GenAI to generate content
  2. Verify result announced
  3. Check content inserted into field
  4. Verify user can edit
  5. Check focus management

**Expected Results:**
  - Generated content announced
  - Content inserted into field
  - User can edit content
  - aria-live announces insertion
  - Focus returns to field

### 5. Remove Feature Functionality

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_013: Remove feature button accessible

**File:** `tests/accessibility/SCRUM-32/remove-button.spec.ts`

**Steps:**
  1. Add a feature
  2. Tab to remove button
  3. Verify button has accessible name
  4. Check focus indicator visible
  5. Press Enter to remove

**Expected Results:**
  - Remove button has accessible name
  - Button keyboard accessible
  - Enter/Space activates button
  - Focus indicator visible
  - Button clearly labeled

#### 5.2. TC_A11Y_014: Feature removal announced

**File:** `tests/accessibility/SCRUM-32/remove-announcement.spec.ts`

**Steps:**
  1. Add 3 features
  2. Remove one feature
  3. Verify removal announced
  4. Check focus moves appropriately
  5. Verify Add button re-enabled
  6. Check feature count updated

**Expected Results:**
  - Removal announced via aria-live
  - Focus managed after removal
  - Feature count updated
  - Add button re-enabled if was disabled
  - Screen reader announces changes

### 6. Product Details Page Display

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_015: Key Highlights section has heading

**File:** `tests/accessibility/SCRUM-32/highlights-heading.spec.ts`

**Steps:**
  1. Navigate to Product Details page
  2. Locate 'Key Highlights' or 'Unique Accessibility Features' section
  3. Verify section has heading
  4. Check heading level appropriate
  5. Use screen reader heading navigation

**Expected Results:**
  - Section has descriptive heading
  - Heading level appropriate (H2 or H3)
  - Screen reader can navigate to section
  - Heading describes content
  - Section near top of page

#### 6.2. TC_A11Y_016: Features displayed in semantic list

**File:** `tests/accessibility/SCRUM-32/features-list.spec.ts`

**Steps:**
  1. Locate features display
  2. Verify list structure (<ul> or role='list')
  3. Check each feature is <li> or role='listitem'
  4. Use screen reader to verify list announced
  5. Check item count announced

**Expected Results:**
  - Features in semantic list
  - List uses <ul> or role='list'
  - Each feature is list item
  - Screen reader announces list
  - List count announced

#### 6.3. TC_A11Y_017: Feature icons accessible

**File:** `tests/accessibility/SCRUM-32/feature-icons.spec.ts`

**Steps:**
  1. Locate checkmark or feature icons
  2. Verify icons have aria-hidden='true'
  3. Check text conveys feature without icon
  4. Verify not relying on icon alone
  5. Use screen reader to verify icon ignored

**Expected Results:**
  - Icons have text equivalents
  - Icons have aria-hidden='true'
  - Checkmark meaning conveyed by text
  - Not relying on icon alone
  - Screen reader ignores decorative icons

#### 6.4. TC_A11Y_018: Features have sufficient contrast

**File:** `tests/accessibility/SCRUM-32/features-contrast.spec.ts`

**Steps:**
  1. Measure feature text contrast
  2. Verify 4.5:1 minimum
  3. Check icon/badge contrast (3:1)
  4. Verify all elements meet WCAG AA
  5. Test in different color modes if applicable

**Expected Results:**
  - Feature text has 4.5:1 contrast
  - Icons/badges have 3:1 contrast
  - All text meets WCAG AA
  - Checkmarks distinguishable
  - Background contrast sufficient

#### 6.5. TC_A11Y_019: Section hidden when no features

**File:** `tests/accessibility/SCRUM-32/empty-state-hidden.spec.ts`

**Steps:**
  1. Navigate to product without features
  2. Verify Key Highlights section not displayed
  3. Check no empty section shown
  4. Use screen reader to verify section absent
  5. Verify page structure valid

**Expected Results:**
  - Section hidden when no features
  - No empty section displayed
  - No placeholder text shown
  - Page structure remains valid
  - Screen reader doesn't announce empty section

### 7. Collapsible/Expandable Section

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_020: Collapse toggle accessible

**File:** `tests/accessibility/SCRUM-32/collapse-toggle.spec.ts`

**Steps:**
  1. Locate expand/collapse button
  2. Tab to button
  3. Verify focus indicator visible
  4. Press Enter/Space to toggle
  5. Verify aria-expanded changes
  6. Check content shows/hides

**Expected Results:**
  - Toggle button keyboard accessible
  - Enter/Space toggles section
  - aria-expanded state toggles
  - Button has accessible name
  - Focus indicator visible

#### 7.2. TC_A11Y_021: Collapse state announced

**File:** `tests/accessibility/SCRUM-32/collapse-aria.spec.ts`

**Steps:**
  1. Toggle section open
  2. Verify aria-expanded='true'
  3. Check state announced by screen reader
  4. Toggle section closed
  5. Verify aria-expanded='false'
  6. Check closure announced

**Expected Results:**
  - Expanded state announced
  - Collapsed state announced
  - aria-expanded='true' when open
  - aria-expanded='false' when closed
  - Screen reader announces state changes

#### 7.3. TC_A11Y_022: Collapse button associated with content

**File:** `tests/accessibility/SCRUM-32/collapse-association.spec.ts`

**Steps:**
  1. Inspect collapse button
  2. Verify aria-controls attribute
  3. Check aria-controls points to content ID
  4. Verify content region accessible
  5. Check keyboard navigation works

**Expected Results:**
  - Content region properly associated
  - aria-controls links button to content
  - Content has role='region' if needed
  - Keyboard users can access content
  - Focus management correct

### 8. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_023: Features not identified by color alone

**File:** `tests/accessibility/SCRUM-32/not-color-only.spec.ts`

**Steps:**
  1. Review feature styling
  2. Verify checkmarks or text present
  3. Check not relying on color alone
  4. Test in grayscale mode
  5. Verify features distinguishable

**Expected Results:**
  - Features not identified by color alone
  - Checkmarks or text indicators present
  - Visual distinction clear
  - WCAG 1.4.1 Use of Color satisfied
  - Grayscale mode distinguishable

#### 8.2. TC_A11Y_024: Features readable at 200% zoom

**File:** `tests/accessibility/SCRUM-32/zoom-200.spec.ts`

**Steps:**
  1. Zoom browser to 200%
  2. Verify all features visible
  3. Check no text truncation
  4. Verify no horizontal scrolling
  5. Check all functionality works

**Expected Results:**
  - All content visible at 200%
  - No text truncation
  - Features remain readable
  - No horizontal scrolling
  - Functionality preserved

#### 8.3. TC_A11Y_025: Features accessible on mobile

**File:** `tests/accessibility/SCRUM-32/mobile-responsive.spec.ts`

**Steps:**
  1. Set viewport to mobile (375x667)
  2. Navigate to Product Details
  3. Verify features section accessible
  4. Check touch targets adequate
  5. Test collapse/expand on mobile

**Expected Results:**
  - Section accessible on mobile
  - Touch targets 44x44px minimum
  - No horizontal scrolling
  - All features readable
  - Collapse/expand works on touch

### 9. Form Submission and Updates

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_026: Save features accessible

**File:** `tests/accessibility/SCRUM-32/form-save.spec.ts`

**Steps:**
  1. Add features
  2. Tab to Save button
  3. Press Enter to submit
  4. Verify validation runs
  5. Check success/error announced
  6. Verify focus management

**Expected Results:**
  - Save button accessible
  - Validation runs on submit
  - Success announced
  - Errors announced if any
  - Focus managed appropriately

#### 9.2. TC_A11Y_027: Edit features accessible

**File:** `tests/accessibility/SCRUM-32/edit-features.spec.ts`

**Steps:**
  1. Navigate to Edit Product
  2. Locate existing features
  3. Verify fields editable
  4. Make changes
  5. Check changes announced
  6. Verify save/cancel accessible

**Expected Results:**
  - Edit mode accessible
  - All fields editable
  - Changes announced
  - Save/Cancel buttons accessible
  - Focus management correct

### 10. Admin Review Interface

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_028: Admin review interface accessible

**File:** `tests/accessibility/SCRUM-32/admin-review.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to product review
  3. Locate unique features section
  4. Verify features displayed
  5. Check edit/approve/reject controls accessible
  6. Verify feedback field accessible

**Expected Results:**
  - Features visible in admin review
  - Edit controls accessible
  - Approve/Reject buttons accessible
  - Feedback field accessible
  - All actions keyboard operable

### 11. Tooltips and Help

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_029: Phrasing example tooltips accessible

**File:** `tests/accessibility/SCRUM-32/tooltip-accessible.spec.ts`

**Steps:**
  1. Locate help icon or tooltip trigger
  2. Tab to trigger
  3. Verify tooltip appears on focus
  4. Check tooltip has role='tooltip'
  5. Verify aria-describedby present
  6. Press Escape to dismiss

**Expected Results:**
  - Tooltip accessible via keyboard
  - Tooltip appears on focus
  - Tooltip has role='tooltip'
  - aria-describedby links to tooltip
  - Escape dismisses tooltip

#### 11.2. TC_A11Y_030: Phrasing examples accessible

**File:** `tests/accessibility/SCRUM-32/phrasing-examples.spec.ts`

**Steps:**
  1. Locate phrasing examples
  2. Verify examples visible
  3. Check examples clear
  4. Verify inclusive language used
  5. Use screen reader to verify announcement
  6. Check contrast sufficient

**Expected Results:**
  - Examples clear and helpful
  - Examples use inclusive language
  - Screen reader announces examples
  - Examples visible and readable
  - Contrast meets WCAG AA
