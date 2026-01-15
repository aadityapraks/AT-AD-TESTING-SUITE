# SCRUM-19 Accessibility Test Plan

## Application Overview

Comprehensive accessibility test plan for Assistive Partner Product Upload Form (SCRUM-19) covering WCAG 2.1 AA compliance for multi-section form with text inputs, dropdowns, file uploads, image management, and GenAI assistance features.

## Test Scenarios

### 1. Form Navigation and Structure

**Seed:** `seed.spec.ts`

#### 1.1. TC_A11Y_001: Verify keyboard navigation through entire form

**File:** `tests/accessibility/scrum19-form-navigation.spec.ts`

**Steps:**
  1. Navigate to Product Upload form
  2. Press Tab through all form sections
  3. Verify tab order: Basic Info → Features → Images → Video → Specs → Geography → Quantity → Additional Info
  4. Verify focus indicator on each field
  5. Test Shift+Tab for reverse navigation

**Expected Results:**
  - All form fields keyboard accessible
  - Tab order follows visual layout
  - Focus indicator visible (3:1 contrast)
  - No keyboard traps
  - Form sections navigable in logical order

#### 1.2. TC_A11Y_002: Verify form structure and landmarks

**File:** `tests/accessibility/scrum19-form-navigation.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to form
  3. Verify form heading announced
  4. Navigate by headings (H key)
  5. Verify section headings follow hierarchy

**Expected Results:**
  - Form has descriptive heading (h1)
  - Sections have heading hierarchy (h2, h3)
  - Form has role='form' or <form> element
  - Required fields indicated with aria-required='true'
  - Form instructions announced by screen reader

#### 1.3. TC_A11Y_003: Verify help icons accessibility

**File:** `tests/accessibility/scrum19-form-navigation.spec.ts`

**Steps:**
  1. Navigate to field with help icon
  2. Activate help icon with keyboard
  3. Verify help text is accessible
  4. Test screen reader announcement
  5. Close help with Escape key

**Expected Results:**
  - Help icons have role='button'
  - Help icon accessible name: 'Help for [field name]'
  - Help text appears in accessible manner
  - Help content announced by screen reader
  - Escape closes help tooltip

### 2. Text Input Fields Accessibility

**Seed:** `seed.spec.ts`

#### 2.1. TC_A11Y_004: Verify text input labels and associations

**File:** `tests/accessibility/scrum19-text-inputs.spec.ts`

**Steps:**
  1. Inspect Product Name field
  2. Verify label is programmatically associated
  3. Check Short Description character limit announcement
  4. Test Detailed Description field
  5. Verify all text inputs have labels

**Expected Results:**
  - All inputs have associated labels
  - Labels use <label> with for attribute or aria-labelledby
  - Required fields have aria-required='true'
  - Character limit announced (e.g., '200 characters maximum')
  - Placeholder text has 4.5:1 contrast

#### 2.2. TC_A11Y_005: Verify text input validation errors

**File:** `tests/accessibility/scrum19-text-inputs.spec.ts`

**Steps:**
  1. Submit form with empty required fields
  2. Verify error messages appear
  3. Test screen reader announcement
  4. Verify error linked to field
  5. Check error message contrast

**Expected Results:**
  - Error message has role='alert'
  - Error announced immediately
  - Error linked to field (aria-describedby)
  - Error text has 4.5:1 contrast
  - Error icon has alt text

#### 2.3. TC_A11Y_006: Verify character counter accessibility

**File:** `tests/accessibility/scrum19-text-inputs.spec.ts`

**Steps:**
  1. Type in Short Description field
  2. Verify character count updates
  3. Test screen reader announcement
  4. Approach character limit
  5. Verify warning announcement

**Expected Results:**
  - Character count announced dynamically
  - Count has aria-live='polite'
  - Warning at 90% announced
  - Exceeding limit announced
  - Visual indicator has 3:1 contrast

### 3. Dropdown and Select Fields

**Seed:** `seed.spec.ts`

#### 3.1. TC_A11Y_007: Verify dropdown accessibility (Product Type, Disability Type)

**File:** `tests/accessibility/scrum19-dropdowns.spec.ts`

**Steps:**
  1. Navigate to Product Type dropdown
  2. Activate with Enter/Space
  3. Use arrow keys to navigate options
  4. Verify screen reader announces options
  5. Select option and verify announcement

**Expected Results:**
  - Dropdown has role='combobox' or native <select>
  - Label associated with dropdown
  - Options announced by screen reader
  - Selected option announced
  - Arrow keys navigate options

#### 3.2. TC_A11Y_008: Verify multi-select dropdown (Disability Type)

**File:** `tests/accessibility/scrum19-dropdowns.spec.ts`

**Steps:**
  1. Navigate to Disability Type multi-select
  2. Select multiple options
  3. Verify each selection announced
  4. Test removing selections
  5. Verify selection count

**Expected Results:**
  - Multi-select has appropriate ARIA attributes
  - Selected items announced
  - Checkbox pattern or listbox pattern used
  - Remove selection is keyboard accessible
  - Selection count announced

#### 3.3. TC_A11Y_009: Verify cascading dropdowns (Geography - State/District)

**File:** `tests/accessibility/scrum19-dropdowns.spec.ts`

**Steps:**
  1. Select 'Specific Areas' in Geography
  2. Verify state dropdown becomes available
  3. Select state
  4. Verify district dropdown updates
  5. Test screen reader announcements

**Expected Results:**
  - Cascading dropdown relationship clear
  - Parent selection triggers child update
  - Child dropdown state announced
  - Loading state announced if applicable
  - Focus management during cascade

### 4. GenAI Assist Button Accessibility

**Seed:** `seed.spec.ts`

#### 4.1. TC_A11Y_010: Verify GenAI assist button accessibility

**File:** `tests/accessibility/scrum19-genai.spec.ts`

**Steps:**
  1. Navigate to 'Assist with GenAI' button
  2. Verify button accessible name
  3. Activate button with keyboard
  4. Verify loading state announced
  5. Verify generated content announced

**Expected Results:**
  - Button has clear accessible name
  - Button keyboard accessible
  - Loading state announced
  - Generated content announced
  - Button disabled state accessible

#### 4.2. TC_A11Y_011: Verify GenAI modal accessibility

**File:** `tests/accessibility/scrum19-genai.spec.ts`

**Steps:**
  1. Activate GenAI assist
  2. Verify modal opens
  3. Test keyboard navigation in modal
  4. Test Escape to close
  5. Verify focus returns to trigger

**Expected Results:**
  - Modal has role='dialog'
  - Modal has aria-modal='true'
  - Focus trapped in modal
  - Escape closes modal
  - Generated content is editable

### 5. Image Upload Accessibility

**Seed:** `seed.spec.ts`

#### 5.1. TC_A11Y_012: Verify image upload button accessibility

**File:** `tests/accessibility/scrum19-image-upload.spec.ts`

**Steps:**
  1. Navigate to primary image upload
  2. Verify upload button accessible
  3. Check file input label
  4. Verify format/size info announced
  5. Test keyboard activation

**Expected Results:**
  - Upload button keyboard accessible
  - File input has accessible label
  - Accepted formats announced
  - File size limit announced
  - Upload button has clear name

#### 5.2. TC_A11Y_013: Verify upload progress indicator accessibility

**File:** `tests/accessibility/scrum19-image-upload.spec.ts`

**Steps:**
  1. Upload an image
  2. Verify progress bar appears
  3. Test screen reader announcement
  4. Verify progress updates announced
  5. Verify completion announcement

**Expected Results:**
  - Progress bar has role='progressbar'
  - Progress percentage announced
  - aria-valuenow updates during upload
  - aria-valuemin='0' and aria-valuemax='100'
  - Completion announced

#### 5.3. TC_A11Y_014: Verify image preview and removal accessibility

**File:** `tests/accessibility/scrum19-image-upload.spec.ts`

**Steps:**
  1. Upload image
  2. Verify thumbnail is accessible
  3. Navigate to remove button
  4. Test keyboard removal
  5. Verify removal announced

**Expected Results:**
  - Thumbnail has alt text or aria-label
  - Remove button keyboard accessible
  - Remove button has clear name: 'Remove [image name]'
  - Removal confirmed to screen reader
  - Focus management after removal

#### 5.4. TC_A11Y_015: Verify alt text input accessibility

**File:** `tests/accessibility/scrum19-image-upload.spec.ts`

**Steps:**
  1. Upload image
  2. Navigate to alt text field
  3. Verify field has label
  4. Enter alt text
  5. Verify association with image

**Expected Results:**
  - Alt text field has label
  - Alt text field associated with image
  - Required indicator if mandatory
  - Character limit announced
  - Alt text saved with image

#### 5.5. TC_A11Y_016: Verify image upload error handling

**File:** `tests/accessibility/scrum19-image-upload.spec.ts`

**Steps:**
  1. Upload invalid file type
  2. Verify error message appears
  3. Test screen reader announcement
  4. Check error message contrast
  5. Test retry functionality

**Expected Results:**
  - Error has role='alert'
  - Error announced immediately
  - Error message clear and actionable
  - Error text has 4.5:1 contrast
  - Retry option accessible

### 6. Video Upload Accessibility

**Seed:** `seed.spec.ts`

#### 6.1. TC_A11Y_017: Verify video upload option selection (File vs Link)

**File:** `tests/accessibility/scrum19-video-upload.spec.ts`

**Steps:**
  1. Navigate to video upload section
  2. Verify radio button group
  3. Use arrow keys to select option
  4. Verify selection announced
  5. Test keyboard activation

**Expected Results:**
  - Radio buttons have role='radio'
  - Radio group has role='radiogroup'
  - Group label announced
  - Selected option announced
  - Arrow keys navigate options

#### 6.2. TC_A11Y_018: Verify video link input accessibility

**File:** `tests/accessibility/scrum19-video-upload.spec.ts`

**Steps:**
  1. Select 'Embed Link' option
  2. Navigate to URL input
  3. Enter invalid URL
  4. Verify error announcement
  5. Test valid URL

**Expected Results:**
  - URL input has label
  - URL validation announced
  - Invalid URL error accessible
  - Placeholder has 4.5:1 contrast
  - YouTube/Vimeo format help available

#### 6.3. TC_A11Y_019: Verify video preview accessibility

**File:** `tests/accessibility/scrum19-video-upload.spec.ts`

**Steps:**
  1. Upload or embed video
  2. Verify preview appears
  3. Test video controls
  4. Check play button accessibility
  5. Test remove functionality

**Expected Results:**
  - Video preview has accessible name
  - Play button keyboard accessible
  - Video controls accessible
  - Captions/subtitles support mentioned
  - Remove video button accessible

### 7. Specifications Section Accessibility

**Seed:** `seed.spec.ts`

#### 7.1. TC_A11Y_020: Verify specifications key-value fields

**File:** `tests/accessibility/scrum19-specifications.spec.ts`

**Steps:**
  1. Navigate to specifications section
  2. Verify field labels
  3. Add new specification field
  4. Verify addition announced
  5. Remove field and verify announcement

**Expected Results:**
  - Each spec field has label
  - Key-value pairs clearly associated
  - Add/Remove buttons keyboard accessible
  - Dynamic field addition announced
  - Field removal announced

#### 7.2. TC_A11Y_021: Verify GenAI specifications generation

**File:** `tests/accessibility/scrum19-specifications.spec.ts`

**Steps:**
  1. Navigate to 'Generate Specifications' button
  2. Activate button
  3. Verify loading announced
  4. Verify generated content announced
  5. Test editing generated specs

**Expected Results:**
  - Button keyboard accessible
  - Loading state announced
  - Generated specs announced
  - Edit capability accessible
  - Accept/Reject options accessible

### 8. Geography and Quantity Fields

**Seed:** `seed.spec.ts`

#### 8.1. TC_A11Y_022: Verify geographical availability radio buttons

**File:** `tests/accessibility/scrum19-geography.spec.ts`

**Steps:**
  1. Navigate to geography section
  2. Test Pan-India radio button
  3. Test Specific Areas radio button
  4. Verify conditional fields appear
  5. Test screen reader announcements

**Expected Results:**
  - Radio buttons accessible
  - Pan-India vs Specific Areas clear
  - Selection announced
  - Conditional fields appear accessibly
  - State announced when enabled

#### 8.2. TC_A11Y_023: Verify geography search and selection

**File:** `tests/accessibility/scrum19-geography.spec.ts`

**Steps:**
  1. Select 'Specific Areas'
  2. Navigate to search field
  3. Type to search locations
  4. Use arrow keys in results
  5. Select multiple locations

**Expected Results:**
  - Search input has label
  - Autocomplete results announced
  - Arrow keys navigate results
  - Selected location announced
  - Multiple selections managed accessibly

#### 8.3. TC_A11Y_024: Verify product quantity input

**File:** `tests/accessibility/scrum19-geography.spec.ts`

**Steps:**
  1. Navigate to quantity field
  2. Verify field label
  3. Enter numeric value
  4. Test invalid input
  5. Verify error announcement

**Expected Results:**
  - Numeric input has label
  - Input type='number' or inputmode='numeric'
  - Min/max values announced
  - Invalid input error announced
  - Spinner buttons accessible

#### 8.4. TC_A11Y_025: Verify 'Made to Order' toggle accessibility

**File:** `tests/accessibility/scrum19-geography.spec.ts`

**Steps:**
  1. Navigate to Made to Order toggle
  2. Verify toggle role
  3. Activate with keyboard
  4. Verify state announced
  5. Toggle multiple times

**Expected Results:**
  - Toggle has role='switch'
  - Toggle state announced: 'on' or 'off'
  - Label associated with toggle
  - Space/Enter toggles state
  - State change announced

### 9. Additional Information Fields

**Seed:** `seed.spec.ts`

#### 9.1. TC_A11Y_026: Verify URL input fields (Amazon, Website, Other Links)

**File:** `tests/accessibility/scrum19-additional-info.spec.ts`

**Steps:**
  1. Navigate to Amazon Buy Link
  2. Verify field label
  3. Enter invalid URL
  4. Verify error announcement
  5. Test Product Website Link

**Expected Results:**
  - URL inputs have labels
  - URL validation accessible
  - Invalid URL errors announced
  - Placeholder text has contrast
  - Optional status clear

#### 9.2. TC_A11Y_027: Verify price range dropdown and inputs

**File:** `tests/accessibility/scrum19-additional-info.spec.ts`

**Steps:**
  1. Navigate to Price Range dropdown
  2. Select 'Single Price'
  3. Verify price input appears
  4. Select 'Price Range'
  5. Verify Min/Max fields appear

**Expected Results:**
  - Dropdown accessible
  - Options announced
  - Selected option clear
  - Conditional fields appear accessibly
  - Price inputs have labels

#### 9.3. TC_A11Y_028: Verify support helpline input

**File:** `tests/accessibility/scrum19-additional-info.spec.ts`

**Steps:**
  1. Navigate to support helpline field
  2. Verify field label
  3. Enter phone number
  4. Test invalid format
  5. Verify error announcement

**Expected Results:**
  - Phone input has label
  - Input format announced
  - Invalid format error accessible
  - Country code handling clear
  - Validation announced

#### 9.4. TC_A11Y_029: Verify tags/metadata input

**File:** `tests/accessibility/scrum19-additional-info.spec.ts`

**Steps:**
  1. Navigate to tags field
  2. Add multiple tags
  3. Verify each tag announced
  4. Remove a tag
  5. Verify removal announced

**Expected Results:**
  - Tag input accessible
  - Added tags announced
  - Remove tag button accessible
  - Tag list has role='list'
  - Tag count announced

### 10. Form Submission and Draft

**Seed:** `seed.spec.ts`

#### 10.1. TC_A11Y_030: Verify Save as Draft and Submit buttons

**File:** `tests/accessibility/scrum19-submission.spec.ts`

**Steps:**
  1. Navigate to form buttons
  2. Verify 'Save as Draft' button accessible
  3. Verify 'Upload Product' button accessible
  4. Test disabled state
  5. Test keyboard activation

**Expected Results:**
  - Both buttons keyboard accessible
  - Button states clear (enabled/disabled)
  - Disabled state announced
  - Button labels descriptive
  - Focus indicator visible

#### 10.2. TC_A11Y_031: Verify form validation on submission

**File:** `tests/accessibility/scrum19-submission.spec.ts`

**Steps:**
  1. Submit incomplete form
  2. Verify validation errors appear
  3. Test focus management
  4. Verify error summary
  5. Test screen reader announcements

**Expected Results:**
  - Validation errors announced
  - Focus moves to first error
  - Error summary provided
  - Each error linked to field
  - Errors have role='alert'

#### 10.3. TC_A11Y_032: Verify success confirmation message

**File:** `tests/accessibility/scrum19-submission.spec.ts`

**Steps:**
  1. Submit valid form
  2. Verify success message appears
  3. Test screen reader announcement
  4. Check message contrast
  5. Verify next action clear

**Expected Results:**
  - Success message has role='status' or 'alert'
  - Message announced automatically
  - Message text has 4.5:1 contrast
  - Next steps clear
  - Focus management appropriate

#### 10.4. TC_A11Y_033: Verify draft save confirmation

**File:** `tests/accessibility/scrum19-submission.spec.ts`

**Steps:**
  1. Save form as draft
  2. Verify confirmation message
  3. Navigate to product management
  4. Verify draft status visible
  5. Test editing draft

**Expected Results:**
  - Draft saved confirmation announced
  - Draft status clear
  - Return to draft accessible
  - Draft indicator visible
  - Edit draft accessible

### 11. Error States and Messages

**Seed:** `seed.spec.ts`

#### 11.1. TC_A11Y_034: Verify error summary accessibility

**File:** `tests/accessibility/scrum19-errors.spec.ts`

**Steps:**
  1. Submit form with multiple errors
  2. Verify error summary appears
  3. Test keyboard navigation to errors
  4. Verify error links work
  5. Test screen reader announcement

**Expected Results:**
  - Error summary at top of form
  - Summary has role='alert'
  - Each error is a link to field
  - Error count announced
  - Summary keyboard accessible

#### 11.2. TC_A11Y_035: Verify inline field errors

**File:** `tests/accessibility/scrum19-errors.spec.ts`

**Steps:**
  1. Trigger field validation error
  2. Verify inline error appears
  3. Test screen reader announcement
  4. Check error-field association
  5. Fix error and verify clearance

**Expected Results:**
  - Inline error has role='alert'
  - Error linked to field (aria-describedby)
  - Error icon has alt text
  - Error text has 4.5:1 contrast
  - Error clears when fixed

#### 11.3. TC_A11Y_036: Verify network/system error handling

**File:** `tests/accessibility/scrum19-errors.spec.ts`

**Steps:**
  1. Simulate network error
  2. Verify error message appears
  3. Test screen reader announcement
  4. Test retry functionality
  5. Verify error recovery

**Expected Results:**
  - Network error announced
  - Error message actionable
  - Retry button accessible
  - Error doesn't trap focus
  - Error text has contrast

### 12. Responsive and Mobile Accessibility

**Seed:** `seed.spec.ts`

#### 12.1. TC_A11Y_037: Verify mobile form accessibility

**File:** `tests/accessibility/scrum19-responsive.spec.ts`

**Steps:**
  1. Resize to mobile viewport (375px)
  2. Verify all fields accessible
  3. Test touch target sizes
  4. Verify no horizontal scroll
  5. Test form submission

**Expected Results:**
  - All fields accessible on mobile
  - Touch targets 44x44px minimum
  - No horizontal scrolling
  - Form sections collapsible if needed
  - Keyboard still works on mobile

#### 12.2. TC_A11Y_038: Verify form at 200% zoom

**File:** `tests/accessibility/scrum19-responsive.spec.ts`

**Steps:**
  1. Zoom browser to 200%
  2. Navigate through form
  3. Verify all content visible
  4. Test form submission
  5. Check focus indicators

**Expected Results:**
  - Form readable at 200% zoom
  - No content loss
  - No horizontal scrolling
  - All functionality available
  - Focus indicators visible

### 13. Color and Contrast

**Seed:** `seed.spec.ts`

#### 13.1. TC_A11Y_039: Verify text contrast ratios

**File:** `tests/accessibility/scrum19-contrast.spec.ts`

**Steps:**
  1. Inspect all form labels
  2. Check placeholder text contrast
  3. Verify error message contrast
  4. Check help text contrast
  5. Measure with contrast analyzer

**Expected Results:**
  - All text has 4.5:1 contrast
  - Labels have 4.5:1 contrast
  - Placeholder text has 4.5:1 contrast
  - Error text has 4.5:1 contrast
  - Help text has 4.5:1 contrast

#### 13.2. TC_A11Y_040: Verify non-text contrast

**File:** `tests/accessibility/scrum19-contrast.spec.ts`

**Steps:**
  1. Inspect form field borders
  2. Check focus indicator contrast
  3. Verify button contrast
  4. Check icon contrast
  5. Measure required field indicators

**Expected Results:**
  - Field borders have 3:1 contrast
  - Focus indicators have 3:1 contrast
  - Button borders have 3:1 contrast
  - Icons have 3:1 contrast
  - Required indicators have 3:1 contrast

#### 13.3. TC_A11Y_041: Verify information not conveyed by color alone

**File:** `tests/accessibility/scrum19-contrast.spec.ts`

**Steps:**
  1. Review required field indicators
  2. Check error indicators
  3. Test in grayscale mode
  4. Verify field states
  5. Check validation indicators

**Expected Results:**
  - Required fields use asterisk + aria-required
  - Errors use icon + text + color
  - Field states use multiple indicators
  - Information not color-only
  - Form distinguishable in grayscale

### 14. Screen Reader Compatibility

**Seed:** `seed.spec.ts`

#### 14.1. TC_A11Y_042: Verify NVDA compatibility

**File:** `tests/accessibility/scrum19-screen-reader.spec.ts`

**Steps:**
  1. Enable NVDA
  2. Navigate through entire form
  3. Fill out all sections
  4. Trigger validation errors
  5. Submit form

**Expected Results:**
  - All fields announced correctly
  - Labels and instructions clear
  - Errors announced
  - Dynamic content updates announced
  - Form navigation smooth

#### 14.2. TC_A11Y_043: Verify JAWS compatibility

**File:** `tests/accessibility/scrum19-screen-reader.spec.ts`

**Steps:**
  1. Enable JAWS
  2. Navigate through form
  3. Test all interactive elements
  4. Verify ARIA announcements
  5. Complete form submission

**Expected Results:**
  - All ARIA attributes work
  - Live regions function
  - Form mode works correctly
  - Complex widgets accessible
  - No JAWS-specific issues

### 15. Focus Management

**Seed:** `seed.spec.ts`

#### 15.1. TC_A11Y_044: Verify focus order throughout form

**File:** `tests/accessibility/scrum19-focus.spec.ts`

**Steps:**
  1. Start at form beginning
  2. Tab through entire form
  3. Document focus order
  4. Verify order matches layout
  5. Check for focus issues

**Expected Results:**
  - Focus order logical
  - Tab order matches visual layout
  - No unexpected focus jumps
  - All interactive elements in tab order
  - Skip links available if needed

#### 15.2. TC_A11Y_045: Verify focus visibility

**File:** `tests/accessibility/scrum19-focus.spec.ts`

**Steps:**
  1. Tab through all form elements
  2. Verify focus indicator on each
  3. Measure focus indicator contrast
  4. Check focus indicator size
  5. Verify focus not hidden

**Expected Results:**
  - Focus visible on all elements
  - Focus indicator 3:1 contrast
  - Focus not obscured
  - Custom focus styles meet standards
  - Focus indicator at least 2px

#### 15.3. TC_A11Y_046: Verify no keyboard traps

**File:** `tests/accessibility/scrum19-focus.spec.ts`

**Steps:**
  1. Navigate through entire form
  2. Test all modals and dropdowns
  3. Verify Escape key works
  4. Test all interactive components
  5. Verify no infinite loops

**Expected Results:**
  - No keyboard traps
  - Can exit all components
  - Modals closable with Escape
  - Dropdowns closable
  - Focus never stuck
