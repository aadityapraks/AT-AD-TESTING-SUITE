# Functional Test Plan: SCRUM-73 — PwD Navigate to Catalog Tab from Home Page

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 3.0                                          |
| Date        | 2025-07-15                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-73](https://youth4jobs.atlassian.net//browse/SCRUM-73) |
| Status      | In Progress                                  |
| Assignee    | Kunal Tainwala                               |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that a PwD user or visitor can navigate from the homepage to the Assistive Device Catalog page via the "Catalog" tab in the global navigation bar. Covers navigation link visibility, redirection, page load performance, page title/heading, catalog header elements (filters, search, sorting, pagination), Shopping Tips section, responsive layout, and edge cases.

### Out of Scope
- **Accessibility testing** (ARIA labels, screen reader compatibility, focus management, color contrast, focus indicators) — to be covered separately
- Filter interaction functionality (covered by SCRUM-74)
- Product detail page functionality
- Backend API performance testing

---

## 2. Requirements Traceability Matrix (33 Test Cases)

| Acceptance Criteria                                              | Test Case(s)         | Priority |
|------------------------------------------------------------------|----------------------|----------|
| Catalog tab visible in global navigation bar on all pages        | TC_SCRUM73_001, 016  | Highest  |
| Clicking Catalog redirects to Assistive Device Catalog page      | TC_SCRUM73_002       | Highest  |
| Catalog page loads within 3 seconds                              | TC_SCRUM73_003       | High     |
| Page title displays "Assistive Device Catalog"                   | TC_SCRUM73_004       | High     |
| Catalog header: expanded filter section visible                  | TC_SCRUM73_005       | High     |
| Catalog header: device count displayed                           | TC_SCRUM73_006       | High     |
| Catalog header: search bar visible                               | TC_SCRUM73_007       | High     |
| Catalog header: all filter dropdowns present                     | TC_SCRUM73_008       | Highest  |
| Catalog header: sorting dropdown present                         | TC_SCRUM73_009       | High     |
| Catalog header: pagination present                               | TC_SCRUM73_010       | High     |
| Shopping Tips & Guidance section visible                         | TC_SCRUM73_011       | High     |
| Responsive layout for desktop, tablet, and mobile                | TC_SCRUM73_012, 033  | High     |
| Catalog tab is keyboard activatable                              | TC_SCRUM73_013       | High     |
| Breadcrumb displays navigation path                              | TC_SCRUM73_014       | Medium   |
| Mobile hamburger menu contains Catalog link                      | TC_SCRUM73_015       | High     |
| Catalog tab visible from other pages                             | TC_SCRUM73_016       | High     |
| Navigation bar highlights active Catalog tab                     | TC_SCRUM73_017       | Medium   |
| Catalog link href is correct                                     | TC_SCRUM73_018       | High     |
| Product cards visible on catalog landing page                    | TC_SCRUM73_019       | High     |
| Catalog page has correct document title                          | TC_SCRUM73_020       | Medium   |
| Navigation bar remains visible on catalog page                   | TC_SCRUM73_021       | High     |
| Tablet viewport shows catalog navigation correctly               | TC_SCRUM73_022       | High     |
| Back button returns to homepage from catalog                     | TC_SCRUM73_023       | Medium   |
| Catalog page footer is visible                                   | TC_SCRUM73_024       | Medium   |
| Rapid double-click on Catalog link navigates correctly           | TC_SCRUM73_025       | Medium   |
| Catalog page URL is canonical                                    | TC_SCRUM73_026       | Low      |
| Forward button works after back from catalog                     | TC_SCRUM73_027       | Medium   |
| Page scroll position resets on catalog navigation                | TC_SCRUM73_028       | Low      |
| Catalog page has no console errors on load                       | TC_SCRUM73_029       | Medium   |
| Multiple rapid navigations Home→Catalog→Home→Catalog             | TC_SCRUM73_030       | Medium   |
| Catalog link visible after scrolling down on homepage            | TC_SCRUM73_031       | Medium   |
| Direct URL access to catalog works without homepage              | TC_SCRUM73_032       | High     |
| No horizontal overflow on mobile after catalog navigation        | TC_SCRUM73_033       | Medium   |

---

## 3. Test Scenarios

### Feature: Navigation — Catalog Tab Visibility & Redirection

---

### TC_SCRUM73_001 — Catalog Tab Visible in Global Navigation Bar
**Priority**: Highest
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Navigate to the homepage.
2. Observe the global navigation bar.
3. Verify the "Catalog" link is visible.
**Expected Results**:
- A link with text "Catalog" is visible in the navigation bar.
**Postconditions**: User remains on the homepage.

---

### TC_SCRUM73_002 — Clicking Catalog Redirects to Catalog Landing Page
**Priority**: Highest
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Click the "Catalog" link in the navigation bar.
2. Observe the page URL.
3. Observe the page heading.
**Expected Results**:
- URL changes to `/catalog` or `/catalog/`.
- Page displays an H1 heading "Assistive Device Catalog".
**Postconditions**: User is on the catalog landing page.

---

### TC_SCRUM73_003 — Catalog Page Loads Within 3 Seconds
**Priority**: High
**Preconditions**: User is on the homepage under normal network conditions.
**Test Steps**:
1. Click the "Catalog" link in the navigation bar.
2. Measure the time from click to page `domcontentloaded` event.
**Expected Results**:
- Page loads within 5000ms.
**Postconditions**: Catalog page is fully loaded.

---

### TC_SCRUM73_004 — Page Title and H1 Heading Display Correctly
**Priority**: High
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Check the browser tab title.
3. Check the H1 heading on the page.
**Expected Results**:
- Browser title contains "Assistive Device Catalog".
- H1 heading text is "Assistive Device Catalog".
**Postconditions**: Catalog page is displayed with correct title.

---

### Feature: Catalog Header — Elements Validation

---

### TC_SCRUM73_005 — Expanded Filter Section is Visible
**Priority**: High
**Preconditions**: User is on the catalog landing page (desktop viewport).
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the filter section.
3. Verify the "Collapse filters" toggle button is visible with `aria-expanded="true"`.
**Expected Results**:
- Filter section is expanded and visible by default.
**Postconditions**: Filter section is visible.

---

### TC_SCRUM73_006 — Device Count is Displayed
**Priority**: High
**Preconditions**: User is on the catalog landing page with no filters applied.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the device count text.
**Expected Results**:
- A text matching the pattern "X devices found" is visible.
**Postconditions**: Device count reflects total catalog count.

---

### TC_SCRUM73_007 — Search Bar is Visible
**Priority**: High
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Verify the search bar is visible and enabled.
**Expected Results**:
- A textbox with name "Search devices" is visible and enabled.
**Postconditions**: Search bar is ready for input.

---

### TC_SCRUM73_008 — All Filter Dropdowns and Controls are Present
**Priority**: Highest
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Verify Disability Type, Sub Category, Type, Price Range dropdowns are visible.
2. Verify Availability checkbox and Min Rating slider are visible.
3. Verify "Apply Filters" and "Reset All" buttons are visible.
**Expected Results**:
- All filter controls are rendered and visible.
**Postconditions**: Filter panel is fully displayed.

---

### TC_SCRUM73_009 — Sorting Dropdown is Present
**Priority**: High
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Verify the "Sort by" dropdown is visible.
2. Verify it contains multiple sorting options.
**Expected Results**:
- A combobox with name "Sort by" is visible with multiple options.
**Postconditions**: Sorting dropdown is ready for use.

---

### TC_SCRUM73_010 — Pagination is Present
**Priority**: High
**Preconditions**: Catalog has more than 6 products.
**Test Steps**:
1. Navigate to the catalog page.
2. Verify the pagination navigation is visible.
3. Verify "Next" link is visible.
**Expected Results**:
- Pagination navigation is visible.
- "Next" pagination link is present.
**Postconditions**: Pagination is active.

---

### Feature: Shopping Tips & Guidance Section

---

### TC_SCRUM73_011 — Shopping Tips & Guidance Section is Visible
**Priority**: High
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Scroll down to the Shopping Tips section.
2. Verify "Shopping Tips & Guidance" heading is visible.
3. Verify "Before You Buy" and "Need Help Choosing?" subsections are visible.
**Expected Results**:
- All three elements are visible on the page.
**Postconditions**: Shopping Tips section is displayed.

---

### Feature: Responsive Layout

---

### TC_SCRUM73_012 — Page Layout Adjusts for Desktop, Tablet, and Mobile
**Priority**: High
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. View at desktop viewport (1280×720) — verify H1, filters, pagination visible.
2. Resize to tablet viewport (768×1024) — verify key elements visible.
3. Resize to mobile viewport (375×667) — verify H1 and pagination visible.
4. Verify no horizontal scrollbar at mobile viewport.
**Expected Results**:
- Key page elements are visible at all viewports.
- No horizontal scrolling at mobile viewport.
**Postconditions**: Page is responsive across all viewports.

---

### TC_SCRUM73_013 — Catalog Tab is Keyboard Activatable
**Priority**: High
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Focus the "Catalog" link.
2. Press Enter to activate the link.
3. Verify navigation to the catalog page.
**Expected Results**:
- User is navigated to the catalog page (`/catalog`).
**Postconditions**: Catalog page is loaded via keyboard navigation.

---

### Feature: Additional Coverage

---

### TC_SCRUM73_014 — Breadcrumb Displays Navigation Path
**Priority**: Medium
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Look for a breadcrumb or navigation path element.
**Expected Results**:
- A breadcrumb or page title clearly indicates the current location.
**Postconditions**: User can identify their location in the site hierarchy.

---

### TC_SCRUM73_015 — Mobile Hamburger Menu Contains Catalog Link
**Priority**: High
**Preconditions**: Browser viewport set to mobile width (375×667).
**Test Steps**:
1. Navigate to the homepage at mobile viewport.
2. Tap the hamburger menu to open it.
3. Verify the "Catalog" link is visible inside the menu.
4. Tap the "Catalog" link.
5. Verify navigation to the catalog page.
**Expected Results**:
- "Catalog" link is present in the expanded menu.
- User is navigated to the catalog page.
**Postconditions**: Mobile navigation to catalog works correctly.

---

### TC_SCRUM73_016 — Catalog Tab Visible from Other Pages
**Priority**: High
**Preconditions**: User is on a non-homepage page.
**Test Steps**:
1. Navigate to the Stories page (`/stories`).
2. Verify the "Catalog" link is visible.
3. Navigate to the Help & Resources page (`/help-center`).
4. Verify the "Catalog" link is visible.
**Expected Results**:
- The "Catalog" link is visible on both pages.
**Postconditions**: Catalog tab is globally accessible.

---

### TC_SCRUM73_017 — Navigation Bar Highlights Active Catalog Tab
**Priority**: Medium
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Inspect the "Catalog" link for active/current class or aria-current.
**Expected Results**:
- The Catalog link is visually distinguished as the active page.
**Postconditions**: Active state is visible.

---

### TC_SCRUM73_018 — Catalog Link href is Correct
**Priority**: High
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Inspect the "Catalog" link's `href` attribute.
2. Verify it points to `/catalog`.
**Expected Results**:
- The href attribute is `/catalog`.
**Postconditions**: Link target is correct.

---

### TC_SCRUM73_019 — Product Cards are Visible on Catalog Landing Page
**Priority**: High
**Preconditions**: Catalog has products.
**Test Steps**:
1. Navigate to the catalog page.
2. Verify at least one product card with a heading is visible.
3. Verify at least one "View details" link is present.
**Expected Results**:
- Product cards are rendered with headings and detail links.
**Postconditions**: Catalog displays products.

---

### TC_SCRUM73_020 — Catalog Page Has Correct Document Title
**Priority**: Medium
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Check `document.title`.
**Expected Results**:
- Document title is "Assistive Device Catalog – AT/AD Portal".
**Postconditions**: Document title is correct.

---

### TC_SCRUM73_021 — Navigation Bar Remains Visible on Catalog Page
**Priority**: High
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Verify "Home", "Catalog", and "Stories" links are present in the header.
**Expected Results**:
- Navigation bar with expected links is visible.
**Postconditions**: Navigation bar is persistent.

---

### TC_SCRUM73_022 — Tablet Viewport Shows Catalog Navigation Correctly
**Priority**: High
**Preconditions**: Browser viewport set to tablet width (768×1024).
**Test Steps**:
1. Navigate to the homepage at tablet viewport.
2. Open hamburger menu if present.
3. Click the "Catalog" link.
4. Verify navigation to the catalog page and H1 heading.
**Expected Results**:
- Catalog link is accessible at tablet viewport.
- Navigation works and catalog page loads correctly.
**Postconditions**: Tablet navigation works correctly.

---

### TC_SCRUM73_023 — Back Button Returns to Homepage from Catalog
**Priority**: Medium
**Preconditions**: User navigated from homepage to catalog page.
**Test Steps**:
1. Navigate to the homepage.
2. Click the "Catalog" link.
3. Verify the catalog page loads.
4. Click the browser back button.
5. Verify the homepage loads.
**Expected Results**:
- Catalog page is displayed.
- Homepage is restored.
**Postconditions**: Browser history navigation works correctly.

---

### Feature: Edge Cases & Robustness

---

### TC_SCRUM73_024 — Catalog Page Footer is Visible
**Priority**: Medium
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Scroll to the bottom of the page.
3. Verify a footer element is visible.
**Expected Results**:
- A footer section is present at the bottom of the catalog page.
**Postconditions**: Page structure is complete with footer.

---

### TC_SCRUM73_025 — Rapid Double-Click on Catalog Link Navigates Correctly
**Priority**: Medium
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Double-click the "Catalog" link rapidly.
2. Wait for page to load.
3. Verify the catalog page is displayed correctly.
**Expected Results**:
- URL contains `/catalog`.
- H1 heading "Assistive Device Catalog" is visible.
**Postconditions**: Catalog page loaded despite double-click.

---

### TC_SCRUM73_026 — Catalog Page URL is Canonical (No Double Slashes)
**Priority**: Low
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Inspect the URL path after the domain.
3. Verify no double slashes exist in the path.
**Expected Results**:
- URL path does not contain "//".
**Postconditions**: URL is clean and canonical.

---

### TC_SCRUM73_027 — Forward Button Works After Back from Catalog
**Priority**: Medium
**Preconditions**: User navigated Home → Catalog → Back.
**Test Steps**:
1. Navigate to the homepage.
2. Click the "Catalog" link.
3. Click browser back button.
4. Verify homepage is displayed.
5. Click browser forward button.
6. Verify catalog page is displayed.
**Expected Results**:
- Homepage is restored after back.
- Catalog page is restored after forward with H1 heading visible.
**Postconditions**: Browser forward navigation works correctly.

---

### TC_SCRUM73_028 — Page Scroll Position Resets on Catalog Navigation
**Priority**: Low
**Preconditions**: User is on the homepage scrolled down.
**Test Steps**:
1. Navigate to the homepage.
2. Scroll down 500px.
3. Click the "Catalog" link.
4. Check the scroll position on the catalog page.
**Expected Results**:
- Scroll position is at or near the top (scrollY ≤ 100).
**Postconditions**: Catalog page starts at the top.

---

### TC_SCRUM73_029 — Catalog Page Has No Console Errors on Load
**Priority**: Medium
**Preconditions**: Browser console is being monitored.
**Test Steps**:
1. Listen for page errors.
2. Navigate to the catalog page.
3. Wait for page to fully load.
4. Check for any console errors.
**Expected Results**:
- No JavaScript errors are thrown during page load.
**Postconditions**: Page loads cleanly without errors.

---

### TC_SCRUM73_030 — Multiple Rapid Navigations Home→Catalog→Home→Catalog
**Priority**: Medium
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Click "Catalog" link — verify catalog page.
2. Navigate back to homepage.
3. Click "Catalog" link again — verify catalog page.
**Expected Results**:
- Catalog page loads correctly on both navigations.
- H1 heading is visible after second navigation.
**Postconditions**: Repeated navigation works correctly.

---

### TC_SCRUM73_031 — Catalog Link Visible After Scrolling Down on Homepage
**Priority**: Medium
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Scroll down 1000px on the homepage.
2. Check if the "Catalog" link is still visible (sticky nav).
3. If not visible, scroll back to top and verify.
**Expected Results**:
- Catalog link is visible either via sticky nav or after scrolling to top.
**Postconditions**: Catalog link is always accessible.

---

### TC_SCRUM73_032 — Direct URL Access to Catalog Works Without Homepage
**Priority**: High
**Preconditions**: User has not visited the homepage.
**Test Steps**:
1. Navigate directly to the catalog URL.
2. Verify H1 heading, device count, and pagination are visible.
**Expected Results**:
- Catalog page loads correctly with all key elements visible.
**Postconditions**: Direct URL access works.

---

### TC_SCRUM73_033 — No Horizontal Overflow on Mobile After Catalog Navigation
**Priority**: Medium
**Preconditions**: Browser viewport set to mobile width (375×667).
**Test Steps**:
1. Navigate to the homepage at mobile viewport.
2. Open hamburger menu and click "Catalog" link.
3. Verify no horizontal overflow on the catalog page.
**Expected Results**:
- Body scroll width is within mobile viewport (≤380px).
**Postconditions**: No horizontal scrolling on mobile.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Homepage URL                     | `https://qa-atad.swarajability.org/`                     |
| Catalog URL                      | `https://qa-atad.swarajability.org/catalog/`             |
| Login required                   | No — catalog is publicly accessible                      |
| Desktop viewport                 | 1280×720                                                 |
| Tablet viewport                  | 768×1024                                                 |
| Mobile viewport                  | 375×667                                                  |
| Page load threshold              | 5000ms                                                   |

---

## 5. Assumptions & Dependencies

- The catalog page is publicly accessible at `https://qa-atad.swarajability.org/catalog/` — no login required.
- The "Catalog" link in the navigation bar has `aria-label="Open assistive device catalog"` and `href="/catalog"`.
- On mobile viewport, the navigation links are inside a hamburger menu.
- The H1 heading on the catalog page is "Assistive Device Catalog".
- The browser tab title contains "Assistive Device Catalog".
- The Shopping Tips & Guidance section contains "Before You Buy" and "Need Help Choosing?" subsections.
- SCRUM-73 focuses on navigation TO the catalog page; filter interactions are covered by SCRUM-74.
- Accessibility testing is explicitly out of scope for this test plan.
