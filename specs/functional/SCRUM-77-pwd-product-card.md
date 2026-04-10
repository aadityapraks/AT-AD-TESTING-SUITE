# Functional Test Plan: SCRUM-77 — PwD View Product Card (Preview Summary)

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-18                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-77](https://youth4jobs.atlassian.net//browse/SCRUM-77) |
| Status      | In QA                                        |
| Assignee    | Kamilath Rifka Sameem Ali                    |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?p=f&t=ThxKWawF59kREh5H-0) |

### Scope & Objectives
Validate that a PwD user can quickly understand what each product offers from its card on the catalog landing page. Covers product card elements (thumbnail image, product name, tags, rating, short description, key features, availability badge, price), hover/focus interactions, "View Details" navigation with sign-in modal for unauthenticated users, grid layout, and responsive behavior. This plan covers functional testing only — accessibility testing is out of scope.

### Out of Scope
- Accessibility testing (WCAG 2.1 AA) — to be covered separately
- Product detail page functionality (post-authentication)
- User registration/onboarding flow
- Backend API performance testing
- Filter and sort functionality (covered by SCRUM-74, SCRUM-76)

---

## 2. Requirements Traceability Matrix (34 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                        | Priority |
|------------------------------------------------------------------|-------------------------------------|----------|
| Product card includes thumbnail image                            | TC_SCRUM77_001                      | Highest  |
| Product card includes product name                               | TC_SCRUM77_002                      | Highest  |
| Product card includes tags (disability type / use case)          | TC_SCRUM77_003, TC_SCRUM77_033      | High     |
| Product card includes average rating (stars + review count)      | TC_SCRUM77_004, TC_SCRUM77_005      | High     |
| Product card includes short description (up to 2 lines)          | TC_SCRUM77_006                      | High     |
| Product card includes key features                               | TC_SCRUM77_007                      | High     |
| Product card includes availability badge                         | TC_SCRUM77_008                      | High     |
| Product card includes price                                      | TC_SCRUM77_009                      | High     |
| Product card includes "View Details" link                        | TC_SCRUM77_010, TC_SCRUM77_024      | Highest  |
| All cards on page have required elements                         | TC_SCRUM77_011                      | Highest  |
| View Details opens sign-in modal for unauthenticated user        | TC_SCRUM77_012                      | Highest  |
| Sign-in modal contains Sign In button                            | TC_SCRUM77_013                      | High     |
| Sign-in modal contains Create Account option                     | TC_SCRUM77_014                      | High     |
| Sign-in modal is dismissible                                     | TC_SCRUM77_015                      | High     |
| Create Account link points to QA env, not production (SCRUM-859) | TC_SCRUM77_016                      | Highest  |
| Multiple View Details clicks show consistent modal               | TC_SCRUM77_017                      | Medium   |
| Hovering/focusing highlights the card                            | TC_SCRUM77_022                      | High     |
| Hover does not trigger unexpected navigation                     | TC_SCRUM77_023                      | High     |
| Grid view displays 2 columns on desktop                          | TC_SCRUM77_018                      | High     |
| Single column on mobile                                          | TC_SCRUM77_019                      | High     |
| Consistent card height in same row                               | TC_SCRUM77_020                      | Medium   |
| Correct number of cards per page                                 | TC_SCRUM77_021                      | High     |
| Cards render after sort change                                   | TC_SCRUM77_025                      | High     |
| Cards render after filter change                                 | TC_SCRUM77_026                      | High     |
| Cards visible on page 2 via pagination                           | TC_SCRUM77_027                      | High     |
| No horizontal overflow on mobile                                 | TC_SCRUM77_028                      | Medium   |
| Card content does not overlap                                    | TC_SCRUM77_029                      | Medium   |
| Card has non-zero dimensions                                     | TC_SCRUM77_030                      | Medium   |
| Cards render on tablet viewport                                  | TC_SCRUM77_031                      | High     |
| Rapid scroll does not break layout                               | TC_SCRUM77_032                      | Medium   |
| View Details links are unique per card                           | TC_SCRUM77_034                      | High     |

---

## 3. Test Scenarios

### Feature: Product Card Elements

---

### TC_SCRUM77_001 — Product Card Includes Thumbnail Image
**Priority**: Highest
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify an image (CSS background-image) is present.
**Expected Results**:
- Product card contains a visible thumbnail image.
**Postconditions**: Product image is displayed.

---

### TC_SCRUM77_002 — Product Card Includes Product Name as Heading
**Priority**: Highest
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify an h3 heading with the product name is present.
**Expected Results**:
- Product card contains a heading (h3) with a non-empty product name.
**Postconditions**: Product name is displayed.

---

### TC_SCRUM77_003 — Product Card Includes Tags (Disability Type / Category)
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify at least one tag/badge is displayed.
**Expected Results**:
- At least one tag matching a known disability type or category is visible.
**Postconditions**: Tags are displayed.

---

### TC_SCRUM77_004 — Product Card Includes Star Rating Element
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify a star rating element is present.
**Expected Results**:
- Star rating element (class containing 'star' or 'rating') is visible.
**Postconditions**: Rating is displayed.

---

### TC_SCRUM77_005 — Product Card Includes Review Count
**Priority**: Medium
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify a review count in parentheses is displayed.
**Expected Results**:
- Review count matching pattern (N) is visible on the card.
**Postconditions**: Review count is displayed.

---

### TC_SCRUM77_006 — Product Card Includes Short Description
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify a short description text is present beyond the heading.
**Expected Results**:
- Card text content is significantly longer than just the heading, indicating a description.
**Postconditions**: Description is displayed.

---

### TC_SCRUM77_007 — Product Card Includes Key Features Section
**Priority**: Medium
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify "Key Features" text is present.
**Expected Results**:
- "Key Features" text is visible on the product card.
**Postconditions**: Key features are displayed.

---

### TC_SCRUM77_008 — Product Card Includes Availability Badge
**Priority**: Medium
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify an availability badge is present.
**Expected Results**:
- Availability badge ("In Stock" or "Out of Stock") is visible.
**Postconditions**: Availability badge is displayed.

---

### TC_SCRUM77_009 — Product Card Includes Price
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify a price in ₹ format is displayed.
**Expected Results**:
- Price text matching ₹X,XXX pattern is visible.
**Postconditions**: Price is displayed.

---

### TC_SCRUM77_010 — Product Card View Details Link is Present
**Priority**: Highest
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Observe the first product card.
3. Verify a "View Details" link is visible.
4. Verify the link href contains "/product/".
**Expected Results**:
- "View Details" link is visible with a valid product URL.
**Postconditions**: View Details link is present.

---

### TC_SCRUM77_011 — All Product Cards on Page Have Required Elements
**Priority**: Highest
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. For each product card on the page, verify: heading, price, View Details link.
**Expected Results**:
- Every product card has a heading, price, and View Details link.
**Postconditions**: All cards validated.

---

### Feature: View Details & Authentication

---

### TC_SCRUM77_012 — View Details Opens Sign-In Modal for Unauthenticated User
**Priority**: Highest
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is NOT logged in; on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page (not logged in).
2. Click "View Details" on the first product card.
3. Observe the page behavior.
**Expected Results**:
- A sign-in modal/popup appears OR user is redirected to sign-in page.
**Postconditions**: Sign-in flow is triggered.

---

### TC_SCRUM77_013 — Sign-In Modal Contains Sign In Button
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: Sign-in modal is visible.
**Test Steps**:
1. Click "View Details" to trigger sign-in modal.
2. Observe the modal content.
3. Verify a "Sign In" button is present.
**Expected Results**:
- Sign-in modal contains a Sign In button.
**Postconditions**: Sign In button is visible.

---

### TC_SCRUM77_014 — Sign-In Modal Contains Create Account Option
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: Sign-in modal is visible.
**Test Steps**:
1. Click "View Details" to trigger sign-in modal.
2. Observe the modal content.
3. Verify a "Create Account" or "Register" option is present.
**Expected Results**:
- Modal contains a create account / register option.
**Postconditions**: Create account option is visible.

---

### TC_SCRUM77_015 — Sign-In Modal is Dismissible
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: Sign-in modal is visible.
**Test Steps**:
1. Click "View Details" to trigger sign-in modal.
2. Close the modal via close button or Escape key.
3. Verify the catalog page is still visible.
**Expected Results**:
- Modal closes; user remains on the catalog page.
**Postconditions**: Catalog page is restored.

---

### TC_SCRUM77_016 — Create Account Link Points to QA Environment Not Production
**Priority**: Highest
**Related Jira Issue**: SCRUM-77, SCRUM-859
**Preconditions**: User is NOT logged in; on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page (not logged in).
2. Click "View Details" on the first product card.
3. Locate the "Create" or "Register" link.
4. Inspect the href attribute.
5. Verify it does NOT contain `portal.swarajability.org` (production).
6. Verify it contains `ui-qa.swarajability.org` (QA).
**Expected Results**:
- Create/Register link points to QA environment (`ui-qa.swarajability.org`), NOT production (`portal.swarajability.org`).
**Postconditions**: Registration link validated.

---

### TC_SCRUM77_017 — Multiple View Details Clicks Show Consistent Modal
**Priority**: Low
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is NOT logged in; on the catalog landing page.
**Test Steps**:
1. Click "View Details" on the first card — observe modal.
2. Close the modal.
3. Click "View Details" on the second card — observe modal.
**Expected Results**:
- Sign-in modal appears consistently for each View Details click.
**Postconditions**: Consistent behavior verified.

---

### Feature: Card Layout & Grid

---

### TC_SCRUM77_018 — Product Cards Display in Grid Layout (2 Columns on Desktop)
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page at desktop viewport.
**Test Steps**:
1. Navigate to the catalog page at desktop viewport.
2. Observe the product grid.
3. Verify first two cards are side by side.
**Expected Results**:
- First two product cards are in the same row (2-column grid).
**Postconditions**: Grid layout verified.

---

### TC_SCRUM77_019 — Product Cards Stack in Single Column on Mobile
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: Browser viewport set to mobile width (375×667).
**Test Steps**:
1. Set viewport to mobile (375×667).
2. Navigate to the catalog page.
3. Verify product cards stack vertically.
**Expected Results**:
- Second card's Y position is below the first card (single column).
**Postconditions**: Mobile layout verified.

---

### TC_SCRUM77_020 — Product Cards Have Consistent Height in Same Row
**Priority**: Low
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page with at least 2 cards.
**Test Steps**:
1. Navigate to the catalog page.
2. Compare bounding box heights of first two cards.
**Expected Results**:
- Cards in the same row have similar height (within 20px tolerance).
**Postconditions**: Consistent height verified.

---

### TC_SCRUM77_021 — Correct Number of Cards Per Page
**Priority**: Medium
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Count the product cards on the page.
**Expected Results**:
- Page displays up to 9 product cards.
**Postconditions**: Card count verified.

---

### Feature: Card Interactions

---

### TC_SCRUM77_022 — Card Hover Changes Visual State
**Priority**: Medium
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Note the card's box-shadow and transform before hover.
3. Hover over the first product card.
4. Check for visual change (box-shadow, transform, or background change).
**Expected Results**:
- Card visual state changes on hover (e.g., shadow, scale, or background).
**Postconditions**: Hover effect verified.

---

### TC_SCRUM77_023 — Hover Does Not Trigger Unexpected Navigation
**Priority**: Medium
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Note the current URL.
3. Hover over the first product card.
4. Verify the URL does not change.
**Expected Results**:
- URL remains on /catalog; no automatic navigation occurs.
**Postconditions**: No unexpected navigation.

---

### TC_SCRUM77_024 — View Details Link href Points to Product Detail Page
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Inspect the href of the first "View Details" link.
3. Verify it contains "/product/".
**Expected Results**:
- href contains "/product/" indicating a valid product detail URL.
**Postconditions**: Link target verified.

---

### TC_SCRUM77_025 — Product Cards Render After Sort Change
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Note the card count.
3. Change sort to "Name: A to Z".
4. Verify card count remains the same.
**Expected Results**:
- Product cards re-render after sort; count unchanged.
**Postconditions**: Cards visible after sort.

---

### TC_SCRUM77_026 — Product Cards Render After Filter Change
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Apply a filter (Type = "Device").
3. Verify product cards are still visible.
**Expected Results**:
- Product cards render correctly after filtering.
**Postconditions**: Cards visible after filter.

---

### TC_SCRUM77_027 — Product Cards Visible on Page 2 via Pagination
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: Catalog has more than 9 products.
**Test Steps**:
1. Navigate to the catalog page.
2. Click "Next" in pagination.
3. Verify product cards are visible on page 2.
**Expected Results**:
- Product cards are rendered on page 2 with headings visible.
**Postconditions**: Page 2 cards visible.

---

### Feature: Edge Cases & Robustness

---

### TC_SCRUM77_028 — No Horizontal Overflow on Mobile with Product Cards
**Priority**: Low
**Related Jira Issue**: SCRUM-77
**Preconditions**: Browser viewport set to mobile width (375×667).
**Test Steps**:
1. Set viewport to mobile (375×667).
2. Navigate to the catalog page.
3. Check body scroll width.
**Expected Results**:
- Body scroll width does not exceed mobile viewport width.
**Postconditions**: No overflow.

---

### TC_SCRUM77_029 — Product Card Content Does Not Overlap
**Priority**: Lowest
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page with at least 2 cards.
**Test Steps**:
1. Navigate to the catalog page.
2. Verify the first card's bounding box does not overlap with the second card.
**Expected Results**:
- Cards do not overlap — second card starts after first card ends.
**Postconditions**: No overlap.

---

### TC_SCRUM77_030 — Product Card Image Area Has Non-Zero Dimensions
**Priority**: Lowest
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Get the bounding box of the first product card.
3. Verify it has non-zero width and height.
**Expected Results**:
- Product card has positive width and height.
**Postconditions**: Dimensions verified.

---

### TC_SCRUM77_031 — Product Cards Render on Tablet Viewport
**Priority**: Medium
**Related Jira Issue**: SCRUM-77
**Preconditions**: Browser viewport set to tablet width (768×1024).
**Test Steps**:
1. Set viewport to tablet (768×1024).
2. Navigate to the catalog page.
3. Verify product cards are visible.
**Expected Results**:
- Product cards render correctly on tablet viewport.
**Postconditions**: Tablet layout verified.

---

### TC_SCRUM77_032 — Rapid Scroll Through Product Cards Does Not Break Layout
**Priority**: Low
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Rapidly scroll to the bottom and back to top multiple times.
3. Verify product cards are still visible.
**Expected Results**:
- Product cards remain intact after rapid scrolling.
**Postconditions**: Layout intact.

---

### TC_SCRUM77_033 — Product Card Tags Are Not Empty Strings
**Priority**: Medium
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog page.
2. Extract text from the first product card.
3. Verify at least one known tag pattern is present with non-empty text.
**Expected Results**:
- Tags contain meaningful text, not empty strings.
**Postconditions**: Tags validated.

---

### TC_SCRUM77_034 — View Details Links Are Unique Per Product Card
**Priority**: High
**Related Jira Issue**: SCRUM-77
**Preconditions**: User is on the catalog landing page with at least 2 cards.
**Test Steps**:
1. Navigate to the catalog page.
2. Extract href from the first two "View Details" links.
3. Compare the hrefs.
**Expected Results**:
- Each View Details link points to a different product URL.
**Postconditions**: Unique links verified.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Catalog URL                      | `https://qa-atad.swarajability.org/catalog/`             |
| Login required                   | No — catalog is publicly accessible; View Details requires auth |
| Cards per page                   | 9                                                        |
| Desktop viewport                 | 1280×720                                                 |
| Tablet viewport                  | 768×1024                                                 |
| Mobile viewport                  | 375×667                                                  |
| Known tag patterns               | Physical, Cognitive, Mobility, Auditory, Visual, Speech, Amputation, Hearing, Locomotor, Device, Technology |
| Availability badges              | "In Stock", "Out of Stock"                               |
| User types (create account)      | PwD, Caregiver, Employer, Donor, Vendor                  |

| QA registration domain             | `ui-qa.swarajability.org`                                |
| Production registration domain     | `portal.swarajability.org` (should NOT be used in QA)    |

---

## 5. Assumptions & Dependencies

- The catalog landing page is publicly accessible at `https://qa-atad.swarajability.org/catalog/` — no login required to view product cards.
- Product card images are rendered as CSS `background-image`, NOT `<img>` tags.
- Product cards are rendered inside a semantic list (`role="list"`) with `<STYLE>` tags as direct children — cards are selected via `> *:not(style)`.
- Product names are rendered as `<h3>` headings.
- "View Details" links contain `/product/` in their href.
- Clicking "View Details" when not logged in triggers a sign-in modal/popup or redirects to an auth page.
- The sign-in modal contains options to Sign In or Create Account.
- 9 product cards are displayed per page.
- Grid layout is 2 columns on desktop, 1 column on mobile.
- Accessibility testing is explicitly out of scope for this test plan.
- **Dependencies**: SCRUM-74 (filter panel), SCRUM-76 (sort dropdown), SCRUM-73 (catalog navigation).

---

## 6. Open Questions / Clarifications Needed

1. **Hover tracking**: AC mentions "track the interest based on hovering" — is there an analytics event fired on hover? How should this be validated?
2. **Create Account flow**: AC mentions user type selection (PwD, Caregiver, Employer, Donor, Vendor) on Create — is this a separate modal or a redirect to a registration page?
3. **Logged-in behavior**: When a logged-in user clicks "View Details", does it navigate directly to the product detail page or open a modal?
4. **Bookmark/Save icon**: AC mentions a "Bookmark/Save" icon with `aria-label="Save this product"` — is this currently implemented on the product card?
5. **Short description truncation**: AC says "up to 2 lines of text" — is there a CSS `line-clamp` or character limit?
