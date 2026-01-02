# SCRUM-33 Test Plan

## Application Overview

Test plan for validating Help & Resources section including navigation, search functionality, category tabs, FAQs, contact information, notifications, feedback, admin management, and WCAG 2.1 AA compliance.

## Test Scenarios

### 1. Navigation and Access

**Seed:** `tests/seed/vendor-dashboard.spec.ts`

#### 1.1. Verify Help & Resources tab visibility

**File:** `tests/functional/help-tab-visibility.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Check top navigation bar

**Expected Results:**
  - "Help & Resources" tab is visible in global navigation
  - Tab is clearly labeled
  - Tab is accessible

#### 1.2. Navigate to Help & Resources page

**File:** `tests/functional/navigate-help-resources.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click Help & Resources tab

**Expected Results:**
  - AP is redirected to Help & Resources landing page
  - Page loads without errors
  - Content is displayed

### 2. Search Bar Functionality

**Seed:** `tests/seed/help-resources.spec.ts`

#### 2.1. Display search bar with placeholder

**File:** `tests/functional/display-search-bar.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Help & Resources
  3. Locate search bar

**Expected Results:**
  - Search bar appears at top of page
  - Placeholder text: "Search articles, FAQs, or guides…"
  - Search bar is functional

#### 2.2. Search with keywords

**File:** `tests/functional/search-with-keywords.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Help & Resources
  3. Type search keywords in search bar
  4. Click Search button

**Expected Results:**
  - User can type search keywords
  - Search button triggers filtered results
  - Results match the query
  - Search is functional

#### 2.3. Display suggested keywords

**File:** `tests/functional/display-suggested-keywords.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Help & Resources
  3. Click or focus on search bar

**Expected Results:**
  - Suggested keywords appear below search input
  - Examples: "product upload", "GenAI features", "accessibility compliance"
  - Suggestions are clickable
  - Suggestions are helpful

### 3. Category Tabs Navigation

**Seed:** `tests/seed/help-resources.spec.ts`

#### 3.1. Display category tabs

**File:** `tests/functional/display-category-tabs.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Help & Resources
  3. Check available tabs

**Expected Results:**
  - Categories tab is visible
  - FAQs tab is visible
  - Contact tab is visible
  - Tabs are clearly labeled

#### 3.2. Switch between tabs

**File:** `tests/functional/switch-between-tabs.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Help & Resources
  3. Click each tab sequentially

**Expected Results:**
  - Selecting a tab updates content area
  - No page reload occurs
  - Content changes smoothly
  - Active tab is highlighted

### 4. Categories View

**Seed:** `tests/seed/help-categories.spec.ts`

#### 4.1. Display category cards

**File:** `tests/functional/display-category-cards.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Help & Resources
  3. Click Categories tab

**Expected Results:**
  - Best Practices card is displayed
  - Product Management card is displayed
  - GenAI Features card is displayed
  - Compliance & Approvals card is displayed

#### 4.2. Display category card elements

**File:** `tests/functional/display-card-elements.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View Categories tab
  3. Check category card details

**Expected Results:**
  - Category icon is shown
  - Category name is displayed
  - Count of articles is visible
  - All elements are clear

#### 4.3. Expand category to show articles

**File:** `tests/functional/expand-category-articles.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View Categories tab
  3. Click a category card

**Expected Results:**
  - Category opens list of articles
  - Articles appear in expandable container below cards
  - Expansion is smooth
  - Articles are visible

#### 4.4. Display article card details

**File:** `tests/functional/display-article-card.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Expand a category
  3. View article cards

**Expected Results:**
  - Article card shows title
  - Summary is displayed
  - Publish date is shown
  - Estimated read time is visible

#### 4.5. Open full article page

**File:** `tests/functional/open-full-article.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Expand a category
  3. Click an article card

**Expected Results:**
  - Article card is clickable
  - Link to full article page exists
  - Navigation is functional
  - Article opens correctly

### 5. FAQs View

**Seed:** `tests/seed/help-faqs.spec.ts`

#### 5.1. Display FAQ categories

**File:** `tests/functional/display-faq-categories.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Help & Resources
  3. Click FAQs tab

**Expected Results:**
  - Account & Registration category is listed
  - Product Listings category is listed
  - GenAI Assistance category is listed
  - Review and Ratings category is listed
  - Technical Support category is listed

#### 5.2. Verify FAQ default collapsed state

**File:** `tests/functional/faq-default-collapsed.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View FAQs tab
  3. Check FAQ items state

**Expected Results:**
  - Each FAQ item is collapsible/expandable
  - Default state is collapsed
  - Items are clearly marked as expandable
  - UI is consistent

#### 5.3. Expand FAQ item

**File:** `tests/functional/expand-faq-item.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View FAQs tab
  3. Click an FAQ item

**Expected Results:**
  - Clicking item expands it
  - Answer is shown
  - Expansion is smooth
  - Content is readable

#### 5.4. Expand multiple FAQ items

**File:** `tests/functional/expand-multiple-faqs.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View FAQs tab
  3. Click multiple FAQ items

**Expected Results:**
  - Multiple items can be expanded at once
  - UI is consistent with design
  - All expanded items remain visible
  - Navigation is intuitive

### 6. Contact View

**Seed:** `tests/seed/help-resources.spec.ts`

#### 6.1. Display contact support options

**File:** `tests/functional/display-contact-options.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Help & Resources
  3. Click Contact tab

**Expected Results:**
  - Email Support option is displayed with email address
  - Phone Support option is displayed with working hours and number
  - All contact information is clearly visible
  - Information is accurate

### 7. Search and Filter Capabilities

**Seed:** `tests/seed/help-resources.spec.ts`

#### 7.1. Search across all resources

**File:** `tests/functional/search-all-resources.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Use unified search bar
  3. Enter search query
  4. View results

**Expected Results:**
  - Vendors can search across all help resources
  - Unified search bar is functional
  - Results are comprehensive
  - Search is accurate

#### 7.2. Categorize search results

**File:** `tests/functional/categorize-search-results.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Perform search
  3. View search results

**Expected Results:**
  - Results are categorized as "FAQs," "Guides," or "Articles"
  - Categories are clearly labeled
  - Results are organized
  - Navigation is easy

#### 7.3. Filter by topic

**File:** `tests/functional/filter-by-topic.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Perform search
  3. Apply topic filter
  4. View filtered results

**Expected Results:**
  - Filters allow sorting by topic
  - Filter is functional
  - Results update accordingly
  - Filter is intuitive

#### 7.4. Filter by last updated date

**File:** `tests/functional/filter-by-date.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Perform search
  3. Apply date filter
  4. View filtered results

**Expected Results:**
  - Filters allow sorting by last updated date
  - Filter is functional
  - Results are sorted correctly
  - Most recent items appear first

### 8. Notifications for Updates

**Seed:** `tests/seed/vendor-notifications.spec.ts`

#### 8.1. Receive notification for new content

**File:** `tests/functional/notify-new-content.spec.ts`

**Steps:**
  1. Admin adds new FAQ or guide
  2. Login as AP
  3. Check notifications

**Expected Results:**
  - Vendor receives notification
  - Example: "New guide available — How to write accessibility-compliant product descriptions."
  - Notification appears in dashboard
  - Notification is clear

#### 8.2. Link notification to resource

**File:** `tests/functional/link-notification-resource.spec.ts`

**Steps:**
  1. AP receives notification for new content
  2. Click notification
  3. Observe navigation

**Expected Results:**
  - Notification links directly to new resource
  - Navigation is seamless
  - Correct resource is displayed
  - Link is functional

### 9. Feedback and Support

**Seed:** `tests/seed/help-resources.spec.ts`

#### 9.1. Provide feedback on FAQ

**File:** `tests/functional/feedback-on-faq.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View FAQ item
  3. Locate feedback option
  4. Click "Helpful" or "Needs Improvement"

**Expected Results:**
  - Each FAQ includes quick feedback option
  - 👍 "Helpful" button is available
  - 👎 "Needs Improvement" button is available
  - Feedback is recorded

#### 9.2. Provide feedback on article

**File:** `tests/functional/feedback-on-article.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View article
  3. Locate feedback option
  4. Provide feedback

**Expected Results:**
  - Each article includes quick feedback option
  - Feedback buttons are functional
  - Feedback is recorded
  - User receives confirmation

### 10. Admin Management

**Seed:** `tests/seed/admin-knowledge-base.spec.ts`

#### 10.1. Add new article

**File:** `tests/functional/admin-add-article.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to knowledge base management
  3. Add new article
  4. Publish article

**Expected Results:**
  - Admin can add new articles
  - Article creation interface is functional
  - Article is published successfully
  - Article appears in knowledge base

#### 10.2. Update existing article

**File:** `tests/functional/admin-update-article.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to knowledge base management
  3. Edit existing article
  4. Save changes

**Expected Results:**
  - Admin can update articles
  - Changes are saved successfully
  - Updated content is displayed
  - Version is tracked

#### 10.3. Retire article

**File:** `tests/functional/admin-retire-article.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to knowledge base management
  3. Retire outdated article

**Expected Results:**
  - Admin can retire articles
  - Retired articles are removed from view
  - Action is logged
  - Content is archived

#### 10.4. Categorize content by tags

**File:** `tests/functional/admin-categorize-content.spec.ts`

**Steps:**
  1. Login as admin
  2. Add or edit article
  3. Assign tags (Accessibility, Media, GenAI, etc.)
  4. Save

**Expected Results:**
  - Admin can categorize content by tags
  - Tags are applied successfully
  - Content is organized by tags
  - Filtering by tags works

#### 10.5. Track engagement metrics

**File:** `tests/functional/admin-track-metrics.spec.ts`

**Steps:**
  1. Vendors view articles
  2. Login as admin
  3. View engagement metrics

**Expected Results:**
  - Admin can track vendor engagement metrics
  - Top-viewed articles are shown
  - Common searches are tracked
  - Data is accurate and exportable

### 11. Accessibility and Usability

**Seed:** `tests/seed/help-resources.spec.ts`

#### 11.1. Verify keyboard navigation

**File:** `tests/functional/help-keyboard-navigation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate Help & Resources using keyboard
  3. Test all interactive elements

**Expected Results:**
  - Keyboard accessible navigation
  - Tab order is logical
  - All controls work via keyboard
  - Focus indicators are visible

#### 11.2. Verify screen reader compatibility

**File:** `tests/functional/help-screen-reader.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Use screen reader to navigate Help & Resources
  3. Test all content

**Expected Results:**
  - Screen-reader accessible navigation
  - All content is announced
  - ARIA labels are present
  - Navigation is intuitive

#### 11.3. Verify high-contrast text

**File:** `tests/functional/help-high-contrast.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View Help & Resources
  3. Check color contrast

**Expected Results:**
  - High-contrast text and buttons
  - Color contrast meets WCAG 2.1 AA
  - Text is readable
  - Visual elements are clear

#### 11.4. Verify ALT text for images

**File:** `tests/functional/help-alt-text.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View articles with images
  3. Check ALT text

**Expected Results:**
  - All images include descriptive ALT text
  - Diagrams have ALT text
  - ALT text is meaningful
  - Accessibility is maintained

#### 11.5. Verify video captions

**File:** `tests/functional/help-video-captions.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View articles with videos
  3. Check captions

**Expected Results:**
  - Videos include captions or text transcripts
  - Captions are accurate
  - Transcripts are available
  - Accessibility is maintained

#### 11.6. Verify clear language

**File:** `tests/functional/help-clear-language.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Read help content
  3. Assess language clarity

**Expected Results:**
  - Language is clear, plain, and inclusive
  - Content supports diverse vendor profiles
  - Technical jargon is explained
  - Content is accessible

### 12. Error Handling

**Seed:** `tests/seed/help-resources.spec.ts`

#### 12.1. Handle no search results

**File:** `tests/functional/handle-no-results.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Search with query that has no results
  3. Observe message

**Expected Results:**
  - Message appears: "No results found. Please try a different keyword or contact support."
  - Message is clearly visible
  - User can try different search
  - Support contact is suggested

#### 12.2. Handle knowledge base unavailable

**File:** `tests/functional/handle-kb-unavailable.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Help & Resources
  3. Simulate system issue
  4. Observe error message

**Expected Results:**
  - Error message displays: "Help Center is temporarily unavailable. Please check back later."
  - Message is clearly visible
  - User can retry later
  - Error is handled gracefully
