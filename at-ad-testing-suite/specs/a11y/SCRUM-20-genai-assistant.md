# SCRUM-20 Accessibility Test Plan

## Application Overview

Comprehensive accessibility test plan for GenAI Assistant feature (SCRUM-20) covering WCAG 2.1 AA compliance for Assist with GenAI buttons, input prompts, generated content display, action buttons (Regenerate/Edit/Accept), conversational interface, disclaimer text, hints, and audit logging indicators.

## Test Scenarios

### 1. GenAI Button Access

**Seed:** `seed.spec.ts`

#### 1.1. TC_A11Y_001: Verify Assist with GenAI button accessibility

**File:** `tests/accessibility/scrum20-genai-button.spec.ts`

**Steps:**
  1. Navigate to product upload/edit form
  2. Tab to Assist with GenAI button next to Short Description
  3. Verify focus indicator visible
  4. Press Enter/Space to activate
  5. Verify GenAI panel opens

**Expected Results:**
  - Assist buttons keyboard accessible
  - Buttons have accessible names: 'Assist with GenAI for Short Description'
  - Focus indicator visible with 3:1 contrast
  - Buttons activate with Enter/Space
  - GenAI panel opens

#### 1.2. TC_A11Y_002: Verify GenAI button screen reader accessibility

**File:** `tests/accessibility/scrum20-genai-button.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Assist buttons
  3. Tab through each button
  4. Verify button name and role announced
  5. Verify field association announced

**Expected Results:**
  - Button role announced
  - Button name announced with field context
  - Button state announced
  - Icon has aria-label if icon-only
  - No empty or generic labels

#### 1.3. TC_A11Y_003: Verify GenAI button visual accessibility

**File:** `tests/accessibility/scrum20-genai-button.spec.ts`

**Steps:**
  1. Inspect button colors
  2. Verify text contrast
  3. Verify background contrast
  4. Test hover/focus states
  5. Measure touch target size

**Expected Results:**
  - Button text has 4.5:1 contrast
  - Button background has 3:1 contrast
  - Icon has 3:1 contrast if present
  - Hover/focus states visible
  - Touch target meets 44x44px

#### 1.4. TC_A11Y_004: Verify GenAI buttons for all fields

**File:** `tests/accessibility/scrum20-genai-button.spec.ts`

**Steps:**
  1. Login as vendor
  2. Navigate to product form
  3. Verify buttons present for all fields
  4. Tab through all GenAI buttons
  5. Verify consistent styling

**Expected Results:**
  - Buttons visible for logged-in vendors only
  - Buttons present for Short Description, Detailed Description, Specifications, ALT Text
  - All buttons keyboard accessible
  - Tab order logical
  - Buttons consistently styled

### 2. GenAI Panel Structure

**Seed:** `seed.spec.ts`

#### 2.1. TC_A11Y_005: Verify GenAI panel structure

**File:** `tests/accessibility/scrum20-genai-panel.spec.ts`

**Steps:**
  1. Open GenAI panel
  2. Check panel role and ARIA attributes
  3. Verify panel title present
  4. Verify focus management
  5. Test keyboard navigation

**Expected Results:**
  - Panel has role='dialog' or role='complementary'
  - Panel has aria-label or aria-labelledby
  - Panel title announced
  - Focus moves to panel on open
  - Panel keyboard accessible

#### 2.2. TC_A11Y_006: Verify panel heading structure

**File:** `tests/accessibility/scrum20-genai-panel.spec.ts`

**Steps:**
  1. Open GenAI panel
  2. Use screen reader heading navigation
  3. Verify panel title heading level
  4. Check section headings
  5. Verify heading hierarchy

**Expected Results:**
  - Panel heading is h2 or h3
  - Section headings properly nested
  - Heading hierarchy logical
  - All headings announced by screen reader
  - No heading levels skipped

#### 2.3. TC_A11Y_007: Verify panel close functionality

**File:** `tests/accessibility/scrum20-genai-panel.spec.ts`

**Steps:**
  1. Open GenAI panel
  2. Tab to close button
  3. Verify focus indicator
  4. Press Escape key
  5. Verify focus returns correctly

**Expected Results:**
  - Close button keyboard accessible
  - Button has accessible name: 'Close GenAI Assistant'
  - Escape key closes panel
  - Focus returns to trigger button
  - No keyboard traps

### 3. Input and Prompt Fields

**Seed:** `seed.spec.ts`

#### 3.1. TC_A11Y_008: Verify input field labels

**File:** `tests/accessibility/scrum20-input-fields.spec.ts`

**Steps:**
  1. Open GenAI panel
  2. Navigate to input fields
  3. Verify each field has label
  4. Check label association
  5. Verify required indicators

**Expected Results:**
  - All input fields have labels
  - Labels: 'Product Name', 'Type or Category', 'Key Features', 'Tone'
  - Labels properly associated with inputs
  - Required fields indicated
  - Placeholder not sole label

#### 3.2. TC_A11Y_009: Verify input field keyboard accessibility

**File:** `tests/accessibility/scrum20-input-fields.spec.ts`

**Steps:**
  1. Tab through input fields
  2. Verify tab order logical
  3. Test focus indicators
  4. Type in text inputs
  5. Navigate dropdown options

**Expected Results:**
  - All inputs keyboard accessible
  - Tab order follows visual layout
  - Focus indicators visible
  - Text inputs accept keyboard input
  - Dropdowns keyboard navigable

#### 3.3. TC_A11Y_010: Verify input field visual accessibility

**File:** `tests/accessibility/scrum20-input-fields.spec.ts`

**Steps:**
  1. Inspect input field colors
  2. Verify label contrast
  3. Verify input text contrast
  4. Check border contrast
  5. Test zoom to 200%

**Expected Results:**
  - Label text has 4.5:1 contrast
  - Input text has 4.5:1 contrast
  - Input borders have 3:1 contrast
  - Placeholder text has 4.5:1 contrast
  - Fields readable at 200% zoom

#### 3.4. TC_A11Y_011: Verify tone guidance dropdown accessibility

**File:** `tests/accessibility/scrum20-input-fields.spec.ts`

**Steps:**
  1. Navigate to tone dropdown
  2. Verify label present
  3. Tab to dropdown
  4. Use arrow keys to navigate
  5. Test with screen reader

**Expected Results:**
  - Tone dropdown has label
  - Dropdown keyboard accessible
  - Options: 'Formal', 'Simple', 'Technical'
  - Selected value announced
  - Arrow keys navigate options

### 4. Generate Button

**Seed:** `seed.spec.ts`

#### 4.1. TC_A11Y_012: Verify Generate button accessibility

**File:** `tests/accessibility/scrum20-generate-button.spec.ts`

**Steps:**
  1. Fill input fields
  2. Tab to Generate button
  3. Verify focus indicator
  4. Press Enter/Space
  5. Verify loading state

**Expected Results:**
  - Generate button keyboard accessible
  - Button has accessible name: 'Generate Content'
  - Focus indicator visible
  - Button activates with Enter/Space
  - Loading state announced

#### 4.2. TC_A11Y_013: Verify Generate button screen reader accessibility

**File:** `tests/accessibility/scrum20-generate-button.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Generate button
  3. Verify button announced
  4. Activate button
  5. Verify loading announced

**Expected Results:**
  - Button role announced
  - Button name announced
  - Button state announced (enabled/disabled)
  - Loading state announced: 'Generating content'
  - Completion announced

#### 4.3. TC_A11Y_014: Verify Generate button disabled state

**File:** `tests/accessibility/scrum20-generate-button.spec.ts`

**Steps:**
  1. Open GenAI panel without inputs
  2. Navigate to Generate button
  3. Verify button disabled
  4. Check disabled state announced
  5. Test tooltip if present

**Expected Results:**
  - Button disabled if inputs empty
  - Disabled state has aria-disabled='true'
  - Disabled state announced
  - Visual indicator shows disabled
  - Tooltip explains why disabled

### 5. Generated Content Display

**Seed:** `seed.spec.ts`

#### 5.1. TC_A11Y_015: Verify generated content accessibility

**File:** `tests/accessibility/scrum20-generated-content.spec.ts`

**Steps:**
  1. Generate content
  2. Verify content area structure
  3. Check ARIA attributes
  4. Test with screen reader
  5. Verify text contrast

**Expected Results:**
  - Content area has role='region' or semantic element
  - Content area has accessible name
  - Generated text announced by screen reader
  - Content has 4.5:1 contrast
  - Content readable at 200% zoom

#### 5.2. TC_A11Y_016: Verify content generation announcement

**File:** `tests/accessibility/scrum20-generated-content.spec.ts`

**Steps:**
  1. Trigger content generation
  2. Verify aria-live announcement
  3. Check completion message
  4. Test with screen reader
  5. Verify focus management

**Expected Results:**
  - Content generation has aria-live region
  - Completion announced: 'Content generated successfully'
  - Generated text announced
  - Focus doesn't move unexpectedly
  - Visual indicator shows completion

#### 5.3. TC_A11Y_017: Verify content type labels

**File:** `tests/accessibility/scrum20-generated-content.spec.ts`

**Steps:**
  1. Generate different content types
  2. Verify each has clear label
  3. Check character limits indicated
  4. Test with screen reader
  5. Verify visual distinction

**Expected Results:**
  - Short Description labeled: '150-200 characters'
  - Detailed Description labeled clearly
  - Specifications labeled: 'Bullet points or key-value pairs'
  - ALT Text labeled: 'Image description'
  - All sections distinguishable

### 6. Action Buttons

**Seed:** `seed.spec.ts`

#### 6.1. TC_A11Y_018: Verify action buttons keyboard accessibility

**File:** `tests/accessibility/scrum20-action-buttons.spec.ts`

**Steps:**
  1. Generate content
  2. Tab through action buttons
  3. Verify focus indicators
  4. Test button activation
  5. Verify tab order

**Expected Results:**
  - All action buttons keyboard accessible
  - Buttons: Regenerate, Edit, Accept
  - Focus indicators visible
  - Buttons activate with Enter/Space
  - Tab order logical

#### 6.2. TC_A11Y_019: Verify action buttons screen reader accessibility

**File:** `tests/accessibility/scrum20-action-buttons.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to action buttons
  3. Verify button names announced
  4. Activate each button
  5. Verify action results announced

**Expected Results:**
  - Button roles announced
  - Button names announced: 'Regenerate', 'Edit', 'Accept'
  - Button states announced
  - Action results announced
  - No empty or generic labels

#### 6.3. TC_A11Y_020: Verify action buttons visual accessibility

**File:** `tests/accessibility/scrum20-action-buttons.spec.ts`

**Steps:**
  1. Inspect button colors
  2. Verify text contrast
  3. Verify background contrast
  4. Test hover/focus states
  5. Measure touch targets

**Expected Results:**
  - Button text has 4.5:1 contrast
  - Button backgrounds have 3:1 contrast
  - Hover/focus states visible
  - Buttons distinguishable from each other
  - Touch targets meet 44x44px

#### 6.4. TC_A11Y_021: Verify Accept button functionality

**File:** `tests/accessibility/scrum20-action-buttons.spec.ts`

**Steps:**
  1. Generate content
  2. Activate Accept button
  3. Verify text inserted
  4. Check announcement
  5. Verify focus management

**Expected Results:**
  - Accept action inserts text to form field
  - Insertion announced: 'Content accepted and inserted'
  - Focus moves to form field
  - Inserted text keyboard accessible
  - Panel closes or remains open as expected

### 7. Edit Mode

**Seed:** `seed.spec.ts`

#### 7.1. TC_A11Y_022: Verify edit mode accessibility

**File:** `tests/accessibility/scrum20-edit-mode.spec.ts`

**Steps:**
  1. Generate content
  2. Activate Edit button
  3. Verify textarea appears
  4. Test keyboard editing
  5. Verify focus indicator

**Expected Results:**
  - Edit mode activates textarea
  - Textarea has label
  - Textarea keyboard accessible
  - Text editable with keyboard
  - Focus indicator visible

#### 7.2. TC_A11Y_023: Verify edit mode screen reader accessibility

**File:** `tests/accessibility/scrum20-edit-mode.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Activate Edit button
  3. Verify textarea announced
  4. Type edits
  5. Test character count

**Expected Results:**
  - Textarea role announced
  - Label announced
  - Current text announced
  - Edits announced as typed
  - Character count announced if present

#### 7.3. TC_A11Y_024: Verify edit mode action buttons

**File:** `tests/accessibility/scrum20-edit-mode.spec.ts`

**Steps:**
  1. Enter edit mode
  2. Tab to Save/Cancel buttons
  3. Verify focus indicators
  4. Test button activation
  5. Check auto-save announcement

**Expected Results:**
  - Save and Cancel buttons keyboard accessible
  - Buttons have clear labels
  - Focus indicators visible
  - Buttons activate with Enter/Space
  - Auto-save announced if enabled

### 8. Conversational Interface

**Seed:** `seed.spec.ts`

#### 8.1. TC_A11Y_025: Verify refinement input accessibility

**File:** `tests/accessibility/scrum20-conversational.spec.ts`

**Steps:**
  1. Generate initial content
  2. Navigate to refinement input
  3. Verify label present
  4. Type refinement instruction
  5. Test submit button

**Expected Results:**
  - Refinement input has label
  - Label: 'Refine content' or 'Additional instructions'
  - Input keyboard accessible
  - Text input accepts keyboard
  - Submit button keyboard accessible

#### 8.2. TC_A11Y_026: Verify refinement examples accessibility

**File:** `tests/accessibility/scrum20-conversational.spec.ts`

**Steps:**
  1. Navigate to refinement section
  2. Verify examples present
  3. Tab to example buttons
  4. Activate example
  5. Verify input filled

**Expected Results:**
  - Refinement examples provided
  - Examples: 'make it simpler', 'add safety information'
  - Examples keyboard accessible
  - Clicking example fills input
  - Action announced

#### 8.3. TC_A11Y_027: Verify conversation history accessibility

**File:** `tests/accessibility/scrum20-conversational.spec.ts`

**Steps:**
  1. Make multiple refinements
  2. Verify conversation history
  3. Check semantic structure
  4. Test with screen reader
  5. Test keyboard scrolling

**Expected Results:**
  - Conversation history has semantic structure
  - Each exchange has clear labels
  - User prompts and AI responses distinguishable
  - History announced by screen reader
  - History scrollable with keyboard

### 9. Hints and Guidance

**Seed:** `seed.spec.ts`

#### 9.1. TC_A11Y_028: Verify accessibility hints display

**File:** `tests/accessibility/scrum20-hints.spec.ts`

**Steps:**
  1. Generate content
  2. Verify hints appear
  3. Check hint announcements
  4. Test with screen reader
  5. Test hint dismissal

**Expected Results:**
  - Hints have role='status' or aria-live
  - Hints announced by screen reader
  - Examples: 'Avoid medicalized language', 'Include sensory features'
  - Hints have 4.5:1 contrast
  - Hints dismissible with keyboard

#### 9.2. TC_A11Y_029: Verify hint icon accessibility

**File:** `tests/accessibility/scrum20-hints.spec.ts`

**Steps:**
  1. Navigate to hint icons
  2. Tab to hint icon
  3. Verify tooltip appears
  4. Test with screen reader
  5. Press Escape to dismiss

**Expected Results:**
  - Hint icon keyboard accessible
  - Icon has accessible name: 'Accessibility tip'
  - Tooltip triggered by focus and hover
  - Tooltip content announced
  - Escape dismisses tooltip

#### 9.3. TC_A11Y_030: Verify hints visual accessibility

**File:** `tests/accessibility/scrum20-hints.spec.ts`

**Steps:**
  1. Inspect hint colors
  2. Verify text contrast
  3. Verify icon contrast
  4. Test zoom to 200%
  5. Check for color-only info

**Expected Results:**
  - Hint text has 4.5:1 contrast
  - Hint icon has 3:1 contrast
  - Hints readable at 200% zoom
  - Hints not color-only
  - Visual indicator accompanies color

### 10. Disclaimer Text

**Seed:** `seed.spec.ts`

#### 10.1. TC_A11Y_031: Verify disclaimer accessibility

**File:** `tests/accessibility/scrum20-disclaimer.spec.ts`

**Steps:**
  1. Open GenAI panel
  2. Locate disclaimer text
  3. Verify text content
  4. Check text contrast
  5. Test with screen reader

**Expected Results:**
  - Disclaimer visible below GenAI section
  - Text: 'Content is AI-generated and should be reviewed'
  - Disclaimer has 4.5:1 contrast
  - Disclaimer announced by screen reader
  - Disclaimer has semantic markup

#### 10.2. TC_A11Y_032: Verify disclaimer structure

**File:** `tests/accessibility/scrum20-disclaimer.spec.ts`

**Steps:**
  1. Inspect disclaimer markup
  2. Check ARIA attributes
  3. Verify semantic structure
  4. Test zoom to 200%
  5. Verify layout

**Expected Results:**
  - Disclaimer has role='note' or <aside>
  - Disclaimer has aria-label if needed
  - Text clearly associated with GenAI feature
  - Disclaimer readable at 200% zoom
  - Disclaimer doesn't block content

### 11. Loading States

**Seed:** `seed.spec.ts`

#### 11.1. TC_A11Y_033: Verify loading state accessibility

**File:** `tests/accessibility/scrum20-loading.spec.ts`

**Steps:**
  1. Trigger content generation
  2. Verify loading indicator appears
  3. Check loading announcement
  4. Test focus management
  5. Verify completion announcement

**Expected Results:**
  - Loading indicator has role='status' or aria-live
  - Loading announced: 'Generating content, please wait'
  - Loading indicator visible
  - Loading doesn't trap focus
  - Completion announced

#### 11.2. TC_A11Y_034: Verify loading indicator details

**File:** `tests/accessibility/scrum20-loading.spec.ts`

**Steps:**
  1. Observe loading indicator
  2. Check spinner accessibility
  3. Verify animation safety
  4. Test progress announcements
  5. Test cancel button if present

**Expected Results:**
  - Loading spinner has accessible name
  - Spinner has aria-label: 'Loading'
  - Spinner animation doesn't cause seizures
  - Progress percentage announced if available
  - Cancel button keyboard accessible

### 12. Error Handling

**Seed:** `seed.spec.ts`

#### 12.1. TC_A11Y_035: Verify error message accessibility

**File:** `tests/accessibility/scrum20-errors.spec.ts`

**Steps:**
  1. Trigger generation error
  2. Verify error message appears
  3. Check error announcement
  4. Verify error contrast
  5. Check error icon

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Error announced immediately
  - Error message clear and specific
  - Error has 4.5:1 contrast
  - Error icon has 3:1 contrast

#### 12.2. TC_A11Y_036: Verify error keyboard handling

**File:** `tests/accessibility/scrum20-errors.spec.ts`

**Steps:**
  1. Trigger error
  2. Verify focus management
  3. Tab to dismiss button
  4. Test Escape key
  5. Test retry option

**Expected Results:**
  - Error doesn't trap focus
  - Dismiss button keyboard accessible
  - Escape key dismisses error
  - Focus returns appropriately
  - Retry option keyboard accessible

#### 12.3. TC_A11Y_037: Verify input validation errors

**File:** `tests/accessibility/scrum20-errors.spec.ts`

**Steps:**
  1. Submit without required inputs
  2. Verify validation errors
  3. Check error announcements
  4. Verify error-input association
  5. Test error navigation

**Expected Results:**
  - Input validation errors announced
  - Errors linked to inputs with aria-describedby
  - Required field errors clear
  - Error summary provided if multiple
  - Errors keyboard accessible

### 13. Audit Indicator

**Seed:** `seed.spec.ts`

#### 13.1. TC_A11Y_038: Verify AI-assisted indicator accessibility

**File:** `tests/accessibility/scrum20-audit.spec.ts`

**Steps:**
  1. Accept AI-generated content
  2. Verify indicator appears on form
  3. Check indicator text
  4. Test with screen reader
  5. Verify text contrast

**Expected Results:**
  - AI-assisted indicator visible on form
  - Indicator text: 'Description generated with AI on [date/time]'
  - Indicator has 4.5:1 contrast
  - Indicator announced by screen reader
  - Indicator has semantic markup

#### 13.2. TC_A11Y_039: Verify audit indicator details

**File:** `tests/accessibility/scrum20-audit.spec.ts`

**Steps:**
  1. Locate AI-assisted indicator
  2. Check icon accessibility
  3. Test tooltip if present
  4. Verify layout
  5. Test zoom to 200%

**Expected Results:**
  - Indicator icon keyboard accessible if interactive
  - Icon has accessible name
  - Tooltip provides details
  - Indicator doesn't block content
  - Indicator readable at 200% zoom

### 14. Overall Interface Accessibility

**Seed:** `seed.spec.ts`

#### 14.1. TC_A11Y_040: Verify complete keyboard navigation

**File:** `tests/accessibility/scrum20-overall-interface.spec.ts`

**Steps:**
  1. Navigate entire GenAI workflow
  2. Tab through all elements
  3. Verify tab order logical
  4. Test all interactive elements
  5. Verify no keyboard traps

**Expected Results:**
  - All interactive elements keyboard accessible
  - Tab order follows visual layout
  - Focus indicators visible on all elements
  - No keyboard traps exist
  - All actions completable with keyboard

#### 14.2. TC_A11Y_041: Verify complete screen reader accessibility

**File:** `tests/accessibility/scrum20-overall-interface.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate entire workflow
  3. Verify all elements announced
  4. Check state changes
  5. Test dynamic content

**Expected Results:**
  - All elements have accessible names
  - All state changes announced
  - Dynamic content has aria-live
  - Form labels properly associated
  - No visual-only information

#### 14.3. TC_A11Y_042: Verify color and contrast compliance

**File:** `tests/accessibility/scrum20-overall-interface.spec.ts`

**Steps:**
  1. Inspect all text elements
  2. Verify text contrast ratios
  3. Check UI component contrast
  4. Verify focus indicators
  5. Test high contrast mode

**Expected Results:**
  - All text meets 4.5:1 contrast (WCAG 1.4.3)
  - Large text meets 3:1 contrast
  - UI components meet 3:1 contrast (WCAG 1.4.11)
  - Focus indicators meet 3:1 contrast
  - No color-only information (WCAG 1.4.1)

#### 14.4. TC_A11Y_043: Verify responsive design accessibility

**File:** `tests/accessibility/scrum20-overall-interface.spec.ts`

**Steps:**
  1. Test at various viewport sizes
  2. Zoom to 200%
  3. Verify content reflows
  4. Measure touch targets
  5. Test on mobile viewport

**Expected Results:**
  - Content reflows without horizontal scroll (WCAG 1.4.10)
  - All content accessible at 200% zoom (WCAG 1.4.4)
  - Touch targets meet 44x44px minimum
  - Panel adapts to viewport
  - No content loss at zoom

#### 14.5. TC_A11Y_044: Verify panel layout accessibility

**File:** `tests/accessibility/scrum20-overall-interface.spec.ts`

**Steps:**
  1. Open GenAI panel
  2. Verify panel positioning
  3. Test panel on small viewport
  4. Verify scrolling behavior
  5. Test close button access

**Expected Results:**
  - Panel position doesn't obscure form
  - Panel resizable or scrollable
  - Panel doesn't cause horizontal scroll
  - Panel accessible on small screens
  - Panel close button always accessible
