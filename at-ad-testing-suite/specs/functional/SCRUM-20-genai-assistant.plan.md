# SCRUM-20 Test Plan

## Application Overview

Test plan for validating GenAI Assistant functionality that helps Assistive Partners generate accessibility-compliant product information including short descriptions, detailed descriptions, specifications, and ALT text with inclusive language and WCAG compliance.

## Test Scenarios

### 1. GenAI Button Access

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 1.1. Verify GenAI button presence on form fields

**File:** `tests/functional/genai-button-display.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Locate Short Description field
  4. Locate Detailed Description field
  5. Locate Specifications field

**Expected Results:**
  - 'Assist with GenAI' button visible next to Short Description
  - 'Assist with GenAI' button visible next to Detailed Description
  - 'Assist with GenAI' button visible next to Specifications
  - Buttons are clickable and properly labeled

#### 1.2. Verify GenAI button only visible to logged-in vendors

**File:** `tests/functional/genai-vendor-only-access.spec.ts`

**Steps:**
  1. Logout from portal
  2. Attempt to access product form
  3. Login as approved AP
  4. Navigate to Product Upload Form

**Expected Results:**
  - GenAI buttons not visible when logged out
  - GenAI buttons appear after vendor login
  - Buttons visible only in add/edit product context

### 2. Short Description Generation

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 2.1. Generate short description with minimal input

**File:** `tests/functional/generate-short-description.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Enter product name: 'Foldable Wheelchair'
  4. Enter category: 'Mobility Aids'
  5. Click 'Assist with GenAI' for Short Description

**Expected Results:**
  - GenAI panel or popup opens
  - Generated text is 150-200 characters
  - Content is suitable for catalog cards
  - Text uses inclusive language

#### 2.2. Verify character limit compliance

**File:** `tests/functional/short-description-character-limit.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate short description using GenAI
  3. Check character count of generated text

**Expected Results:**
  - Generated text is between 150-200 characters
  - Character counter displays current count
  - Text fits catalog card requirements

### 3. Detailed Description Generation

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 3.1. Generate detailed description with key features

**File:** `tests/functional/generate-detailed-description.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Enter product name and key features
  4. Click 'Assist with GenAI' for Detailed Description
  5. Review generated content

**Expected Results:**
  - Generated text includes usage information
  - Content highlights accessibility benefits
  - Unique features are mentioned
  - Language is clear and inclusive

#### 3.2. Verify accessibility-friendly language

**File:** `tests/functional/verify-inclusive-language.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate detailed description using GenAI
  3. Review generated text for language compliance

**Expected Results:**
  - No jargon or technical terms without explanation
  - Avoids terms like 'normal' or 'abnormal'
  - Uses respectful, inclusive language
  - Describes functionality in neutral terms

### 4. Specifications Generation

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 4.1. Generate specifications as bullet points

**File:** `tests/functional/generate-specifications.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Enter product details
  4. Click 'Assist with GenAI' for Specifications
  5. Review generated format

**Expected Results:**
  - Specifications formatted as bullet points or key-value pairs
  - Content is structured and organized
  - Technical details are clear
  - Format is consistent

### 5. ALT Text Generation

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 5.1. Generate ALT text for product images

**File:** `tests/functional/generate-alt-text.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Upload Form
  3. Upload product image
  4. Click 'Assist with GenAI' for ALT text
  5. Review generated ALT text

**Expected Results:**
  - ALT text describes image content accurately
  - Text is concise and descriptive
  - Follows accessibility best practices
  - Avoids redundant phrases like 'image of'

### 6. Tone and Language Guidance

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 6.1. Generate content with formal tone

**File:** `tests/functional/genai-formal-tone.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open GenAI assistant
  3. Select tone: 'Formal'
  4. Generate description
  5. Review tone of generated text

**Expected Results:**
  - Generated text uses formal language
  - Professional terminology is used appropriately
  - Tone is consistent throughout

#### 6.2. Generate content with simple language

**File:** `tests/functional/genai-simple-language.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open GenAI assistant
  3. Select tone: 'Simple'
  4. Generate description
  5. Review language complexity

**Expected Results:**
  - Generated text uses plain language
  - Short sentences are used
  - Easy to read and understand
  - Avoids complex terminology

### 7. Editing and Customization

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 7.1. Edit GenAI-generated content

**File:** `tests/functional/edit-generated-content.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate description using GenAI
  3. Click 'Edit' button
  4. Modify generated text
  5. Save changes

**Expected Results:**
  - Edit button is functional
  - Text is fully editable
  - Changes are saved in draft state
  - Modified content replaces original

#### 7.2. Regenerate content with new prompt

**File:** `tests/functional/regenerate-content.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate initial description
  3. Click 'Regenerate' button
  4. Provide additional context
  5. Review new generated content

**Expected Results:**
  - Regenerate button is functional
  - New content is generated
  - Previous content is replaced
  - New prompt is considered

#### 7.3. Accept and insert generated content

**File:** `tests/functional/accept-generated-content.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate description using GenAI
  3. Review generated text
  4. Click 'Accept' button

**Expected Results:**
  - Accept button is functional
  - Generated text is inserted into field
  - GenAI panel closes
  - Content is saved in form

#### 7.4. Discard generated content

**File:** `tests/functional/discard-generated-content.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate description using GenAI
  3. Close GenAI panel without accepting
  4. Check form field

**Expected Results:**
  - Original field content remains unchanged
  - Generated text is discarded
  - Vendor retains full control

### 8. Conversational Refinement

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 8.1. Refine content with additional instructions

**File:** `tests/functional/refine-with-instructions.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate initial description
  3. Type instruction: 'make it simpler'
  4. Review refined content

**Expected Results:**
  - Conversational interface accepts instructions
  - Content is refined based on instruction
  - Simpler language is used
  - Interaction is intuitive

#### 8.2. Add specific information to generated content

**File:** `tests/functional/add-safety-information.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate initial description
  3. Type instruction: 'add safety information'
  4. Review updated content

**Expected Results:**
  - Safety information is added
  - Content remains coherent
  - Additional details are relevant
  - Original content is preserved where appropriate

### 9. Accessibility Hints and Guidance

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 9.1. Display accessibility hints during generation

**File:** `tests/functional/display-accessibility-hints.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open GenAI assistant
  3. Start generating content
  4. Observe hints displayed

**Expected Results:**
  - Hint displays: 'Avoid medicalized language'
  - Hint displays: 'Include sensory features like sound or touch'
  - Hints are contextually relevant
  - Guidance is clear and actionable

#### 9.2. Verify plain language compliance

**File:** `tests/functional/verify-plain-language.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate description using GenAI
  3. Analyze sentence structure and vocabulary

**Expected Results:**
  - Short sentences are used
  - Plain language is prioritized
  - Easy to read for diverse audiences
  - Readability score meets standards

### 10. UI Integration and Experience

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 10.1. Verify GenAI panel display

**File:** `tests/functional/genai-panel-display.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click 'Assist with GenAI' button
  3. Observe panel appearance

**Expected Results:**
  - Panel appears as right-side panel or popup
  - Panel is properly positioned
  - Interface is clean and intuitive
  - Panel does not obstruct form fields

#### 10.2. Verify disclaimer visibility

**File:** `tests/functional/genai-disclaimer.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open GenAI assistant
  3. Locate disclaimer text

**Expected Results:**
  - Disclaimer states content is AI-generated
  - Message advises vendor review before publishing
  - Disclaimer is clearly visible
  - Text is easy to read

### 11. Data Privacy and Security

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 11.1. Verify session-only data storage

**File:** `tests/functional/session-data-storage.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Generate content using GenAI
  3. Logout and login again
  4. Check if prompts are stored

**Expected Results:**
  - Prompts stored only in session context
  - Data is cleared after session ends
  - No persistent storage of prompts
  - Privacy is maintained

#### 11.2. Verify no external data sharing

**File:** `tests/functional/no-external-sharing.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Enter confidential product information
  3. Use GenAI assistant
  4. Verify data handling

**Expected Results:**
  - No confidential AP information shared externally
  - Data remains within secure system
  - Privacy policy is enforced
  - Vendor data is protected

### 12. Audit and Traceability

**Seed:** `tests/seed/admin-audit-logs.spec.ts`

#### 12.1. Log GenAI usage in product record

**File:** `tests/functional/audit-log-genai-usage.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Use GenAI to generate description
  3. Accept and save content
  4. Login as admin
  5. View product audit logs

**Expected Results:**
  - Audit log records GenAI usage
  - Log includes timestamp
  - Entry states: 'Description generated with AI on [date/time]'
  - Product ID and AP ID are logged

#### 12.2. Admin views AI-assisted indicator

**File:** `tests/functional/admin-view-ai-indicator.spec.ts`

**Steps:**
  1. AP creates product using GenAI
  2. Login as admin
  3. Review product in admin panel
  4. Check for AI-assisted indicator

**Expected Results:**
  - Admin can see AI-assisted indicator
  - Indicator shows which fields used GenAI
  - Information is clear and accessible
  - Admin can make informed review decisions

### 13. Error Handling

**Seed:** `tests/seed/vendor-product-form.spec.ts`

#### 13.1. Handle GenAI service unavailability

**File:** `tests/functional/genai-service-error.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click 'Assist with GenAI' when service is down
  3. Observe error handling

**Expected Results:**
  - Error message displays gracefully
  - Message explains service is temporarily unavailable
  - Vendor can continue manual entry
  - Form functionality is not affected

#### 13.2. Handle insufficient input for generation

**File:** `tests/functional/insufficient-input-error.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click 'Assist with GenAI' without providing product details
  3. Observe validation

**Expected Results:**
  - Validation message requests more information
  - Guidance on required inputs is provided
  - User can add details and retry
  - Error is clear and actionable
