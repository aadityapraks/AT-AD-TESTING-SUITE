# Functional Test Plan: SCRUM-78 — PwD Navigate from Catalog to Product Details Page

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-18                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-78](https://youth4jobs.atlassian.net//browse/SCRUM-78) |
| Status      | In QA                                        |
| Assignee    | Kamilath Rifka Sameem Ali                    |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that a PwD user can click on a product card or "View Details" button to navigate to the Product Details Page. Covers navigation, dynamic URL updates with product slug, page load performance, browser Back/Forward navigation with filter/search/sort/pagination state preservation, product detail persistence after page refresh, and responsive behavior. This plan covers functional testing only — accessibility testing is out of scope.

### Out of Scope
- Accessibility testing (WCAG 2.1 AA) — to be covered separately
- Product detail page content validation (covered by separate story)
- User registration/onboarding flow
- Backend API performance testing
- Filter, sort, and search functionality (covered by SCRUM-74, SCRUM-75, SCRUM-76)

---

## 2. Requirements Traceability Matrix (33 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                                | Priority |
|------------------------------------------------------------------|---------------------------------------------|----------|
| Clicking product card/View Details opens Product Details Page    | TC_SCRUM78_001, TC_SCRUM78_006              | Highest  |
| URL updates dynamically with product slug                        | TC_SCRUM78_002, TC_SCRUM78_009, TC_SCRUM78_012 | High  |
| Product Details Page loads within acceptable time                | TC_SCRUM78_003                              | High     |
| Product name heading visible on details page                     | TC_SCRUM78_004                              | Highest  |
| Breadcrumb navigation present                                    | TC_SCRUM78_005                              | High     |
| Main content area visible                                        | TC_SCRUM78_007                              | High     |
| Direct URL access works                                          | TC_SCRUM78_008, TC_SCRUM78_014              | High     |
| URL is clean and canonical                                       | TC_SCRUM78_010                              | Medium   |
| Different products have different URLs                           | TC_SCRUM78_011                              | High     |
| Invalid product URL handled gracefully                           | TC_SCRUM78_013                              | Medium   |
| Browser Back returns to catalog                                  | TC_SCRUM78_015, TC_SCRUM78_021              | Highest  |
| Back preserves filters                                           | TC_SCRUM78_016                              | Highest  |
| Back preserves search term                                       | TC_SCRUM78_017                              | High     |
| Back preserves sort selection                                    | TC_SCRUM78_018                              | High     |
| Back preserves pagination position                               | TC_SCRUM78_019                              | High     |
| Forward returns to product details                               | TC_SCRUM78_020                              | High     |
| Product details persist after refresh                            | TC_SCRUM78_022, TC_SCRUM78_024              | Highest  |
| URL persists after refresh                                       | TC_SCRUM78_023                              | High     |
| Refresh does not redirect to login                               | TC_SCRUM78_025                              | High     |
| Main content visible after refresh                               | TC_SCRUM78_026                              | Medium   |
| Multiple product navigations work                                | TC_SCRUM78_027                              | High     |
| Rapid back/forward does not break navigation                     | TC_SCRUM78_028                              | Medium   |
| Mobile viewport rendering                                        | TC_SCRUM78_029, TC_SCRUM78_032              | High     |
| Tablet viewport rendering                                        | TC_SCRUM78_030                              | High     |
| Scroll resets to top on navigation                               | TC_SCRUM78_031                              | Medium   |
| Footer visible on product details page                           | TC_SCRUM78_033                              | Medium   |

---

## 3. Test Scenarios

### Feature: Navigation to Product Details

---

### TC_SCRUM78_001 — View Details Click Navigates to Product Details Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is logged in as PwD; on the catalog landing page.
**Test Steps**:
1. Log in as PwD user.
2. Navigate to the catalog page.
3. Click "View Details" on the first product card.
4. Verify the page navigates away from the catalog.
**Expected Results**:
- User is navigated to a product details page (URL changes from /catalog/).
**Postconditions**: User is on product details page.

---

### TC_SCRUM78_002 — Product Details Page URL Contains /product/ Path
**Priority**: Highest
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is logged in; on the catalog page.
**Test Steps**:
1. Click "View Details" on a product card.
2. Inspect the URL.
**Expected Results**:
- URL contains "/product/" indicating a valid product detail route.
**Postconditions**: URL validated.

---

### TC_SCRUM78_003 — Product Details Page Loads Within Acceptable Time
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is logged in; on the catalog page.
**Test Steps**:
1. Record timestamp before clicking "View Details".
2. Click "View Details".
3. Record timestamp after page loads.
4. Calculate load time.
**Expected Results**:
- Product details page loads within 5000ms.
**Postconditions**: Load time validated.

---

### TC_SCRUM78_004 — Product Name Heading is Visible on Details Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify a heading (h1 or h2) is visible with the product name.
**Expected Results**:
- Product name heading is visible with non-empty text.
**Postconditions**: Heading validated.

---

### TC_SCRUM78_005 — Breadcrumb Navigation is Present on Product Details Page
**Priority**: Medium
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Look for breadcrumb navigation.
**Expected Results**:
- Breadcrumb navigation is visible.
**Postconditions**: Breadcrumb validated.

---

### TC_SCRUM78_006 — Correct Product is Loaded Based on Card Clicked
**Priority**: Highest
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is logged in; on the catalog page.
**Test Steps**:
1. Note the product name on the first card.
2. Click "View Details" on that card.
3. Compare the heading on the details page with the card name.
**Expected Results**:
- Product details page heading matches the product name from the catalog card.
**Postconditions**: Correct product loaded.

---

### TC_SCRUM78_007 — Product Details Page Has Main Content Area
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify the main content area is visible with content.
**Expected Results**:
- Main content area is visible with non-empty content.
**Postconditions**: Content validated.

---

### TC_SCRUM78_008 — Direct URL Access to Product Details Page Works
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is logged in.
**Test Steps**:
1. Navigate to a product details page to get the URL.
2. Navigate directly to that URL.
3. Verify the page loads correctly.
**Expected Results**:
- Product details page loads correctly via direct URL access.
**Postconditions**: Direct access validated.

---

### Feature: URL & Routing

---

### TC_SCRUM78_009 — URL Updates Dynamically with Product Slug
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Inspect the URL for a product slug after /product/.
**Expected Results**:
- URL contains a product-specific slug (not just /product/).
**Postconditions**: Slug validated.

---

### TC_SCRUM78_010 — Product URL is Clean and Canonical
**Priority**: Low
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Inspect the URL for double slashes or trailing artifacts.
**Expected Results**:
- URL is clean — no double slashes (except https://), no trailing query artifacts.
**Postconditions**: URL validated.

---

### TC_SCRUM78_011 — Different Products Have Different URLs
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is logged in; catalog has at least 2 products.
**Test Steps**:
1. Click "View Details" on product 1 — note URL.
2. Go back to catalog.
3. Click "View Details" on product 2 — note URL.
4. Compare URLs.
**Expected Results**:
- Each product has a unique URL.
**Postconditions**: Unique URLs validated.

---

### TC_SCRUM78_012 — Product URL Contains Readable Slug Not Just ID
**Priority**: Low
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Inspect the URL path after /product/.
**Expected Results**:
- URL path contains a readable slug (letters/hyphens), not just a numeric ID.
**Postconditions**: Slug format validated.

---

### TC_SCRUM78_013 — Invalid Product URL Shows Error or Redirects
**Priority**: Medium
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is logged in.
**Test Steps**:
1. Navigate to a non-existent product URL (e.g., /product/nonexistent-xyz-999).
2. Observe the page behavior.
**Expected Results**:
- Page shows a 404 error, "not found" message, or redirects to catalog.
**Postconditions**: Error handling validated.

---

### TC_SCRUM78_014 — Product URL Works After Copy-Paste in New Tab
**Priority**: Medium
**Related Jira Issue**: SCRUM-78
**Preconditions**: User has a product details URL.
**Test Steps**:
1. Navigate to a product details page.
2. Copy the URL.
3. Open a new browser context and navigate to the copied URL.
**Expected Results**:
- Product details page loads correctly (or redirects to auth if session not shared).
**Postconditions**: URL portability validated.

---

### Feature: Back Navigation & State

---

### TC_SCRUM78_015 — Browser Back Returns to Catalog Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-78
**Preconditions**: User navigated from catalog to product details.
**Test Steps**:
1. Click "View Details" on a product.
2. Click browser Back button.
3. Verify the catalog page is displayed.
**Expected Results**:
- User returns to the catalog page with URL containing /catalog.
**Postconditions**: Back navigation validated.

---

### TC_SCRUM78_016 — Browser Back Preserves Applied Filters
**Priority**: Highest
**Related Jira Issue**: SCRUM-78
**Preconditions**: User applied filters on catalog before navigating to product.
**Test Steps**:
1. Apply a filter (Type = "Device").
2. Note the device count.
3. Click "View Details" on a product.
4. Click browser Back.
5. Verify the filter is still applied and device count matches.
**Expected Results**:
- Filter selection and device count are preserved after back navigation.
**Postconditions**: Filter state preserved.

---

### TC_SCRUM78_017 — Browser Back Preserves Search Term
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User entered a search term before navigating to product.
**Test Steps**:
1. Enter a search term in the search bar.
2. Click "View Details" on a product.
3. Click browser Back.
4. Verify the search term is still in the search bar.
**Expected Results**:
- Search term persists in the search bar after back navigation.
**Postconditions**: Search state preserved.

---

### TC_SCRUM78_018 — Browser Back Preserves Sort Selection
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User changed sort order before navigating to product.
**Test Steps**:
1. Change sort to "Name: A to Z".
2. Click "View Details" on a product.
3. Click browser Back.
4. Verify the sort selection is preserved.
**Expected Results**:
- Sort dropdown still shows "Name: A to Z" after back navigation.
**Postconditions**: Sort state preserved.

---

### TC_SCRUM78_019 — Browser Back Preserves Pagination Position
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User navigated to page 2 before clicking View Details.
**Test Steps**:
1. Navigate to page 2 of the catalog.
2. Click "View Details" on a product.
3. Click browser Back.
4. Verify the user is on page 2.
**Expected Results**:
- User returns to page 2 of the catalog after back navigation.
**Postconditions**: Pagination state preserved.

---

### TC_SCRUM78_020 — Browser Forward Returns to Product Details After Back
**Priority**: Medium
**Related Jira Issue**: SCRUM-78
**Preconditions**: User navigated back from product details to catalog.
**Test Steps**:
1. Navigate to a product details page.
2. Click browser Back to return to catalog.
3. Click browser Forward.
4. Verify the product details page is displayed again.
**Expected Results**:
- Product details page is restored via forward navigation.
**Postconditions**: Forward navigation validated.

---

### TC_SCRUM78_021 — Back Navigation URL Contains /catalog
**Priority**: Medium
**Related Jira Issue**: SCRUM-78
**Preconditions**: User navigated from catalog to product details.
**Test Steps**:
1. Navigate to a product details page.
2. Click browser Back.
3. Inspect the URL.
**Expected Results**:
- URL contains "/catalog" after back navigation.
**Postconditions**: URL validated.

---

### Feature: Page Refresh & Persistence

---

### TC_SCRUM78_022 — Product Details Persist After Page Refresh
**Priority**: Highest
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Note the product heading.
2. Refresh the page.
3. Verify the product heading is still the same.
**Expected Results**:
- Product heading is identical before and after refresh.
**Postconditions**: Persistence validated.

---

### TC_SCRUM78_023 — Product URL Persists After Page Refresh
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Note the URL.
2. Refresh the page.
3. Compare the URL.
**Expected Results**:
- URL is identical before and after refresh.
**Postconditions**: URL persistence validated.

---

### TC_SCRUM78_024 — Product Price Persists After Page Refresh
**Priority**: Medium
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page with a visible price.
**Test Steps**:
1. Note the price.
2. Refresh the page.
3. Compare the price.
**Expected Results**:
- Price is identical before and after refresh.
**Postconditions**: Price persistence validated.

---

### TC_SCRUM78_025 — Page Refresh Does Not Redirect to Login
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is logged in; on a product details page.
**Test Steps**:
1. Refresh the page.
2. Verify the user is still on the product details page.
**Expected Results**:
- User remains on the product details page after refresh — no auth redirect.
**Postconditions**: Session persistence validated.

---

### TC_SCRUM78_026 — Main Content is Visible After Refresh
**Priority**: Medium
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Refresh the page.
2. Verify main content area is visible.
**Expected Results**:
- Main content area is visible after refresh.
**Postconditions**: Content validated.

---

### Feature: Edge Cases & Robustness

---

### TC_SCRUM78_027 — Multiple Product Navigations Work Correctly
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is logged in; catalog has at least 2 products.
**Test Steps**:
1. Click View Details on product 1 — verify page loads.
2. Go back to catalog.
3. Click View Details on product 2 — verify page loads.
**Expected Results**:
- Both product detail pages load correctly with different content.
**Postconditions**: Multiple navigations validated.

---

### TC_SCRUM78_028 — Rapid Back/Forward Does Not Break Navigation
**Priority**: Low
**Related Jira Issue**: SCRUM-78
**Preconditions**: User navigated to a product details page.
**Test Steps**:
1. Rapidly click Back then Forward multiple times.
2. Verify the page is still functional.
**Expected Results**:
- Page remains functional after rapid back/forward — no blank page or crash.
**Postconditions**: Stability validated.

---

### TC_SCRUM78_029 — Product Details Page Renders on Mobile Viewport
**Priority**: High
**Related Jira Issue**: SCRUM-78
**Preconditions**: Browser viewport set to mobile (375×667).
**Test Steps**:
1. Set viewport to mobile.
2. Navigate to a product details page.
3. Verify the product heading is visible.
**Expected Results**:
- Product details page renders correctly on mobile viewport.
**Postconditions**: Mobile rendering validated.

---

### TC_SCRUM78_030 — Product Details Page Renders on Tablet Viewport
**Priority**: Medium
**Related Jira Issue**: SCRUM-78
**Preconditions**: Browser viewport set to tablet (768×1024).
**Test Steps**:
1. Set viewport to tablet.
2. Navigate to a product details page.
3. Verify the product heading is visible.
**Expected Results**:
- Product details page renders correctly on tablet viewport.
**Postconditions**: Tablet rendering validated.

---

### TC_SCRUM78_031 — Page Scroll Resets to Top on Product Navigation
**Priority**: Low
**Related Jira Issue**: SCRUM-78
**Preconditions**: User scrolled down on the catalog page.
**Test Steps**:
1. Scroll down on the catalog page.
2. Click "View Details".
3. Check the scroll position on the product details page.
**Expected Results**:
- Scroll position is at or near the top of the product details page.
**Postconditions**: Scroll position validated.

---

### TC_SCRUM78_032 — No Horizontal Overflow on Product Details Page
**Priority**: Lowest
**Related Jira Issue**: SCRUM-78
**Preconditions**: Browser viewport set to mobile (375×667).
**Test Steps**:
1. Set viewport to mobile.
2. Navigate to a product details page.
3. Check body scroll width.
**Expected Results**:
- Body scroll width does not exceed mobile viewport width.
**Postconditions**: No overflow.

---

### TC_SCRUM78_033 — Product Details Page Has Footer
**Priority**: Lowest
**Related Jira Issue**: SCRUM-78
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Scroll to the bottom of the page.
2. Verify the footer is visible.
**Expected Results**:
- Footer is visible at the bottom of the product details page.
**Postconditions**: Footer validated.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Catalog URL                      | `https://qa-atad.swarajability.org/catalog/`             |
| Login required                   | Yes — View Details requires authentication               |
| Credentials                      | PwD test user via Keycloak                               |
| Product path pattern             | `/product/`                                              |
| Page load threshold              | 5000ms                                                   |
| Desktop viewport                 | 1280×720                                                 |
| Tablet viewport                  | 768×1024                                                 |
| Mobile viewport                  | 375×667                                                  |
| Filter for back test             | Type = "Device"                                          |
| Search term for back test        | "wheelchair"                                             |

---

## 5. Assumptions & Dependencies

- User must be authenticated (logged in as PwD) to access product details pages — View Details redirects to auth when not logged in.
- Product details pages are accessible at URLs containing `/product/` with a product-specific slug.
- The catalog page is at `https://qa-atad.swarajability.org/catalog/`.
- Authentication is handled via Keycloak at `auth-d.swarajability.org`.
- Browser Back/Forward navigation should preserve catalog state (filters, search, sort, pagination).
- Product details should persist after page refresh without requiring re-authentication.
- Breadcrumb navigation follows the pattern: Home → Catalog → Category → Product Name.
- Accessibility testing is explicitly out of scope for this test plan.
- **Dependencies**: SCRUM-73 (catalog navigation), SCRUM-74 (filters), SCRUM-75 (search), SCRUM-76 (sort), SCRUM-77 (product card).

---

## 6. Open Questions / Clarifications Needed

1. **Product card click vs View Details**: AC says "clicking on a product card or View Details button" — does clicking anywhere on the card navigate, or only the View Details link?
2. **URL slug format**: AC example shows `/catalog/mobility/standassist-lift` but actual URLs may use `/product/slug`. Which format is correct?
3. **Back button filter preservation**: Does the app use URL query params or session storage to preserve filter state?
4. **Page load time**: AC says 3 seconds, but we use 5000ms threshold to account for QA environment latency. Should this be tightened?
5. **Breadcrumb format**: AC mentions "Home → Catalog → Mobility → StandAssist Lift" — is this the exact breadcrumb format?
