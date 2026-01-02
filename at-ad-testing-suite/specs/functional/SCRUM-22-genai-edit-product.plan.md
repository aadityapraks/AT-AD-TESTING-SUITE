# SCRUM-22 Test Plan

## Application Overview

Test plan for validating GenAI-assisted editing of existing product details including descriptions, specifications, and ALT text with side-by-side comparison, version control, and WCAG 2.1 AA compliance.

## Test Scenarios

### 1. Access Edit Mode

**Seed:** `tests/seed/vendor-product-list.spec.ts`

#### 1.1. Access Edit Product option

**File:** `tests/functional/access-edit-product.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Management
  3. Locate action column for a product
  4. Click Edit Product option

**Expected Results:**
  - Edit Product option is visible in action column
  - Option is clickable
  - Product Edit Form opens
  - All editable sections are displayed

#### 1.2. Verify all editable sections displayed

**File:** `tests/functional/verify-edit-form-sections.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form
  3. Verify all sections are present

**Expected Results:**
  - Short Description field is visible
  - Detailed Description field is visible
  - Specifications field is visible
  - Images and ALT Text section is visible
  - Availability and Quantity fields are visible

### 2. GenAI Button Availability

**Seed:** `tests/seed/vendor-edit-product.spec.ts`

#### 2.1. Verify Enhance with GenAI button presence

**File:** `tests/functional/genai-enhance-button-display.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form with existing content
  3. Locate GenAI buttons next to text fields

**Expected Results:**
  - 'Enhance with GenAI' button visible next to Short Description
  - 'Enhance with GenAI' button visible next to Detailed Description
  - 'Enhance with GenAI' button visible next to Specifications
  - 'Edit with AI' button visible next to ALT Text

#### 2.2. Verify tooltip explanation

**File:** `tests/functional/genai-button-tooltip.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form
  3. Hover over 'Enhance with GenAI' button

**Expected Results:**
  - Tooltip appears on hover
  - Tooltip text: 'Use GenAI to improve clarity, tone, or accessibility of this content.'
  - Tooltip is readable and accessible

#### 2.3. Verify button active only with existing text

**File:** `tests/functional/genai-button-activation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form
  3. Check button state for empty vs filled fields

**Expected Results:**
  - Button is active when text is present
  - Button is disabled or hidden for empty fields
  - Button state changes dynamically

### 3. GenAI Editing Capabilities

**Seed:** `tests/seed/vendor-edit-product.spec.ts`

#### 3.1. Simplify content for readability

**File:** `tests/functional/genai-simplify-content.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form with complex description
  3. Click 'Enhance with GenAI'
  4. Request: 'Simplify for readability'
  5. Review suggestions

**Expected Results:**
  - GenAI generates simplified version
  - Text uses plain language
  - Readability is improved
  - Original meaning is preserved

#### 3.2. Correct grammar and phrasing

**File:** `tests/functional/genai-grammar-correction.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form with grammatical errors
  3. Click 'Enhance with GenAI'
  4. Review grammar corrections

**Expected Results:**
  - Grammar errors are corrected
  - Phrasing is improved
  - Sentence structure is optimized
  - Content flows naturally

#### 3.3. Optimize tone and structure

**File:** `tests/functional/genai-optimize-tone.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form
  3. Click 'Enhance with GenAI'
  4. Request tone optimization
  5. Review suggestions

**Expected Results:**
  - Tone is consistent and appropriate
  - Structure is logical and clear
  - Content is well-organized
  - Professional language is used

#### 3.4. Add accessibility language

**File:** `tests/functional/genai-add-accessibility-language.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form
  3. Click 'Enhance with GenAI'
  4. Request accessibility enhancements
  5. Review suggestions

**Expected Results:**
  - Accessibility features are highlighted
  - Inclusive language is used
  - Usability for PwDs is emphasized
  - Sensory features are described

#### 3.5. Suggest missing product attributes

**File:** `tests/functional/genai-suggest-attributes.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form with incomplete specs
  3. Click 'Enhance with GenAI' on Specifications
  4. Review suggestions

**Expected Results:**
  - Missing attributes are identified
  - Relevant specifications are suggested
  - Suggestions are contextually appropriate
  - Format is consistent

### 4. ALT Text Generation and Editing

**Seed:** `tests/seed/vendor-edit-product-images.spec.ts`

#### 4.1. Generate ALT text for image

**File:** `tests/functional/genai-generate-alt-text.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Edit Form with images
  3. Click 'Add/Improve ALT Text with GenAI'
  4. Review generated ALT text

**Expected Results:**
  - GenAI analyzes image context
  - ALT text is clear and neutral
  - Description is relevant to PwD users
  - Avoids redundant phrases like 'image of'

#### 4.2. Verify ALT text character limit

**File:** `tests/functional/alt-text-character-limit.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate ALT text using GenAI
  3. Check character count

**Expected Results:**
  - ALT text is limited to ~125 characters
  - Character counter is displayed
  - Optimal for screen-reader performance
  - Content is concise yet descriptive

#### 4.3. Edit generated ALT text

**File:** `tests/functional/edit-generated-alt-text.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate ALT text using GenAI
  3. Manually edit the suggested text
  4. Save changes

**Expected Results:**
  - ALT text is fully editable
  - Manual edits are preserved
  - Changes are saved successfully
  - AP retains full control

### 5. Side-by-Side Comparison

**Seed:** `tests/seed/vendor-edit-product.spec.ts`

#### 5.1. View original vs AI-suggested text

**File:** `tests/functional/side-by-side-comparison.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click 'Enhance with GenAI'
  3. View comparison interface

**Expected Results:**
  - Original text displayed on one side
  - AI-suggested text displayed on other side
  - Both versions are clearly visible
  - Visual distinction is clear

#### 5.2. Accept all AI suggestions

**File:** `tests/functional/accept-all-suggestions.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate AI suggestions
  3. Click 'Accept All' button
  4. Verify changes

**Expected Results:**
  - All suggestions are accepted
  - Original text is replaced
  - Changes are applied to form
  - Action is reversible

#### 5.3. Edit and merge suggestions manually

**File:** `tests/functional/merge-suggestions-manually.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate AI suggestions
  3. Manually select and merge parts
  4. Save combined version

**Expected Results:**
  - AP can select specific parts
  - Manual edits are possible
  - Original and AI text can be merged
  - Final version reflects AP choices

#### 5.4. Reject and retain original content

**File:** `tests/functional/reject-ai-suggestions.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate AI suggestions
  3. Click 'Reject' or close without accepting
  4. Verify original content

**Expected Results:**
  - Original content is retained
  - No changes are applied
  - AP maintains full control
  - Form state is unchanged

### 6. Accessibility Compliance Focus

**Seed:** `tests/seed/vendor-edit-product.spec.ts`

#### 6.1. Verify Grade 7-8 readability level

**File:** `tests/functional/verify-readability-level.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate improved text using GenAI
  3. Analyze readability level

**Expected Results:**
  - Text is readable at Grade 7-8 level
  - Simple vocabulary is used
  - Sentences are short and clear
  - Content is accessible to diverse audiences

#### 6.2. Verify person-first language

**File:** `tests/functional/verify-person-first-language.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate improved text using GenAI
  3. Review language usage

**Expected Results:**
  - Person-first language is used
  - Respectful terminology is applied
  - Avoids medicalized terms
  - Inclusive phrasing is prioritized

#### 6.3. Verify sensory feature descriptions

**File:** `tests/functional/verify-sensory-features.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate improved text using GenAI
  3. Check for sensory cues

**Expected Results:**
  - Sensory features are described (textured grip, audible alert)
  - Physical features are mentioned (lightweight design)
  - Usability cues are included
  - Relevant to PwD users

### 7. Version Control and Saving

**Seed:** `tests/seed/vendor-edit-product.spec.ts`

#### 7.1. Save changes with version control

**File:** `tests/functional/save-with-version-control.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Edit product details using GenAI
  3. Click 'Save Changes'
  4. Verify version storage

**Expected Results:**
  - Updated details are saved as new version
  - Previous version is preserved
  - Version history is maintained
  - Rollback is possible

#### 7.2. Verify product status changes to Pending Review

**File:** `tests/functional/status-pending-review.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Edit and save product details
  3. Check product status

**Expected Results:**
  - Product status changes to 'Pending Review'
  - Status is visible to AP
  - Product awaits admin approval
  - Status change is logged

### 8. System Feedback and Confirmation

**Seed:** `tests/seed/vendor-edit-product.spec.ts`

#### 8.1. Display save confirmation message

**File:** `tests/functional/save-confirmation-message.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Edit and save product details
  3. Observe confirmation message

**Expected Results:**
  - Confirmation message appears
  - Message states: 'Your product details have been updated and submitted for review.'
  - Message is clearly visible
  - Message auto-dismisses or can be closed

#### 8.2. Handle GenAI service unavailability

**File:** `tests/functional/genai-service-unavailable.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click 'Enhance with GenAI' when service is down
  3. Observe error message

**Expected Results:**
  - Error message appears
  - Message states: 'AI assistant is temporarily offline. Please try again later.'
  - Manual editing remains available
  - Form functionality is not affected

### 9. Audit and Transparency

**Seed:** `tests/seed/admin-audit-logs.spec.ts`

#### 9.1. Log AI-assisted edits

**File:** `tests/functional/audit-log-ai-edits.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Edit product using GenAI
  3. Save changes
  4. Login as admin
  5. View audit logs

**Expected Results:**
  - AI-assisted edits are logged
  - Log includes timestamp and user ID
  - ALT text generation is logged
  - Edit type is recorded

#### 9.2. Admin views AI modification indicator

**File:** `tests/functional/admin-view-ai-indicator.spec.ts`

**Steps:**
  1. AP edits product using GenAI
  2. Login as admin
  3. Review product in admin panel
  4. Check for AI modification indicator

**Expected Results:**
  - Admin can see AI modification indicator
  - Indicator shows which fields used GenAI
  - Information is clear and accessible
  - Admin can make informed decisions

#### 9.3. Display GenAI disclaimer

**File:** `tests/functional/genai-disclaimer-display.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open GenAI editing panel
  3. Locate disclaimer

**Expected Results:**
  - Disclaimer is visible on GenAI panel
  - Text states: 'AI-generated content must be reviewed by the vendor before publishing.'
  - Disclaimer is clearly readable
  - Positioned prominently

### 10. GenAI Interface Accessibility

**Seed:** `tests/seed/vendor-edit-product.spec.ts`

#### 10.1. Verify keyboard navigation support

**File:** `tests/functional/genai-keyboard-navigation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open GenAI editing interface
  3. Use Tab key to navigate
  4. Use Enter/Space to activate controls

**Expected Results:**
  - All controls are keyboard accessible
  - Tab order is logical
  - Focus indicators are visible
  - Keyboard shortcuts work properly

#### 10.2. Verify screen reader compatibility

**File:** `tests/functional/genai-screen-reader.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open GenAI editing interface
  3. Use screen reader to navigate
  4. Test all interactive elements

**Expected Results:**
  - Screen reader announces all elements
  - ARIA labels are present
  - Instructions are accessible
  - Content is properly structured

#### 10.3. Verify color contrast and focus states

**File:** `tests/functional/genai-color-contrast.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open GenAI editing interface
  3. Check color contrast ratios
  4. Test focus states

**Expected Results:**
  - Color contrast meets WCAG 2.1 AA
  - Focus states are clearly visible
  - Text is readable
  - Visual distinction is clear

#### 10.4. Verify original vs AI text distinction

**File:** `tests/functional/text-visual-distinction.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate AI suggestions
  3. View side-by-side comparison
  4. Check visual differentiation

**Expected Results:**
  - Original text is visually distinct from AI text
  - Different background colors or borders used
  - Labels clearly identify each version
  - Distinction is accessible to all users

#### 10.5. Verify help icons and tips

**File:** `tests/functional/genai-help-tips.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open GenAI editing interface
  3. Locate help icons
  4. Review tips and guidance

**Expected Results:**
  - Help icons are visible
  - Tips explain accessibility-compliant writing
  - Guidance is clear and actionable
  - Icons are accessible
