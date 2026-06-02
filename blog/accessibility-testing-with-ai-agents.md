# How We Used AI Agents and Playwright to Uncover 50+ Accessibility Bugs in a Vendor Portal

*A deep dive into our AI-powered accessibility testing workflow that combined Jira integration, WCAG 2.1 AA compliance testing, and automated Playwright test generation.*

---

## The Challenge

We were tasked with ensuring WCAG 2.1 AA compliance for a multi-role vendor management platform — the **Swarajability Hub** — which serves assistive technology vendors and administrators. The platform includes:

- An **Assistive Partner (AP) Dashboard** with product management, uploads, and notifications
- An **Admin Dashboard** with vendor approvals, partner management, and product oversight
- **GenAI-powered writing assistance** for product descriptions
- **Vendor profile management** and registration flows

With 15+ distinct user stories spanning both roles, manually planning and executing accessibility tests would have taken weeks. We needed a faster, more systematic approach.

---

## Our AI-Powered Testing Stack

We built a testing pipeline using **custom AI agents** integrated with real tools:

| Layer | Tool | Purpose |
|-------|------|---------|
| Test Planning | Custom Kiro Agent + Jira MCP | Fetch user stories, generate WCAG-mapped test plans |
| Test Execution | Playwright + axe-core | Automated browser testing with accessibility audits |
| Test Generation | Playwright MCP + Page Object Model | AI-generated test scripts from plans |
| Bug Reporting | Structured Markdown + Screenshots | Detailed, developer-ready bug reports |
| Mobile Testing | Playwright Device Emulation | Responsive design and touch target validation |

### The Agents

We developed three specialized agents:

1. **Accessibility Test Planner** — Connects to Jira, fetches story details, and generates comprehensive WCAG 2.1 AA test plans covering keyboard navigation, screen reader compatibility, visual contrast, and form accessibility.

2. **Accessibility + Mobile Responsiveness Planner** — Extends the above with mobile-specific WCAG criteria (reflow at 320px, touch targets ≥ 44x44px, orientation lock, pointer gestures).

3. **Playwright Test Generator** — Takes test plans and generates automated Playwright tests following Page Object Model architecture, with JSON-driven test data.

---

## What We Found: The Numbers

Across 15 Jira stories, our testing uncovered **50+ accessibility bugs** spanning every major WCAG category:

| Category | Bugs Found | Severity |
|----------|-----------|----------|
| Missing form labels (`1.3.1`) | 12 | Critical |
| Missing ARIA roles/patterns (`4.1.2`) | 14 | Critical–Medium |
| Color contrast failures (`1.4.3`) | 9 | High–Major |
| Missing landmarks (`1.3.1`) | 4 | High |
| No aria-live regions (`4.1.3`) | 5 | High |
| Focus management issues (`2.4.3`) | 3 | Critical |
| Missing required attributes (`3.3.2`) | 4 | High |
| Missing autocomplete (`1.3.5`) | 2 | Medium |
| Missing skip navigation (`2.4.1`) | 1 | High |
| Missing page language (`3.1.1`) | 1 | High |

---

## The Most Common Patterns

### 1. Form Fields Without Labels — The Silent Killer

The single most prevalent issue. Across the AP Product Upload form, Admin Add Product form, and Admin Add Vendor form, we found **29 input fields** relying solely on placeholder text with no `<label>`, `aria-label`, or `aria-labelledby`.

```html
<!-- What we found -->
<input type="text" name="productName" placeholder="e.g., Ergonomic Wheelchair">

<!-- What it should be -->
<label for="productName">Product Name *</label>
<input id="productName" type="text" name="productName" 
       placeholder="e.g., Ergonomic Wheelchair" aria-required="true">
```

**Impact:** Blind users literally cannot identify what to type in these fields. Placeholder text disappears on focus and isn't reliably announced by screen readers.

### 2. Tab Patterns Without ARIA Roles

Every tabbed interface in the application — AP Dashboard tabs, Product Management status filters, Admin Vendor Lists — was missing the ARIA tabs pattern. No `role="tablist"`, no `role="tab"`, no `aria-selected`.

Screen readers announced these as generic "button" or "link" elements, leaving users unable to understand the navigation structure or know which tab was active.

### 3. Dialogs That Aren't Dialogs

The Notification popup, GenAI Writing Assistant panel, and Vendor Details panel all opened as generic `<div>` elements. No `role="dialog"`, no `aria-modal`, no focus trapping. Keyboard users could tab right through them into background content without realizing it.

### 4. Contrast Failures on Placeholder and Metadata Text

A consistent pattern: light gray text (`#6c757d`, `#6b7280`, `#9ca3af`) on white or near-white backgrounds. These colors look "designed" but fail the 4.5:1 ratio. The worst offender: "No logo uploaded" at just **2.53:1** — barely half the required ratio.

---

## How the AI Agent Workflow Operated

### Step 1: Story Ingestion

The agent fetched the Jira story via MCP (Model Context Protocol), extracting acceptance criteria, UI components, and linked issues:

```
Input: SCRUM-18 (AP Dashboard)
→ Agent fetches story details, identifies: notification bell, navigation buttons, 
  tab navigation, notification popup, dashboard metrics
```

### Step 2: Systematic Test Design

For each UI component, the agent generated test cases across four dimensions:
- **Keyboard:** Tab order, focus indicators, activation keys, escape behavior
- **Screen Reader:** Accessible names, ARIA roles, state announcements, live regions
- **Visual:** Contrast ratios, focus visibility, zoom behavior
- **Forms:** Label association, required indicators, error linking, autocomplete

### Step 3: Automated Execution

Using Playwright with axe-core integration, tests ran against the live QA environment:

```typescript
import AxeBuilder from '@axe-core/playwright';

const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa'])
  .analyze();
```

### Step 4: Structured Bug Reporting

Each bug was documented with:
- WCAG criterion reference
- Exact steps to reproduce
- Current HTML vs. expected HTML
- Screenshot evidence
- Suggested fix with code

---

## Mobile Responsiveness Testing

Beyond traditional accessibility, we extended our testing to cover mobile-specific WCAG criteria:

- **Content Reflow (1.4.10):** Verified layouts at 320px viewport width
- **Touch Targets (2.5.5):** Validated all interactive elements ≥ 44x44 CSS pixels
- **Viewport Meta (1.4.4):** Checked that pinch-to-zoom wasn't disabled
- **Orientation (1.3.4):** Confirmed no orientation lock
- **Pointer Gestures (2.5.1):** Ensured single-pointer alternatives for complex gestures

Playwright's device emulation made this automatable:

```typescript
// playwright.config.ts
{
  name: 'Mobile Chrome',
  use: { ...devices['Pixel 5'] },
},
{
  name: 'Mobile Safari',
  use: { ...devices['iPhone 13'] },
},
```

---

## Key Takeaways

### 1. AI Agents Excel at Systematic Coverage

Human testers might check a few fields for labels. The AI agent checked *every single input* on *every form* across the entire application. That's how we caught all 29 unlabeled fields — not just the obvious ones.

### 2. Jira Integration Creates Traceability

Every bug maps back to a user story. Every test case maps to a WCAG criterion. This traceability makes prioritization straightforward and gives developers clear context for fixes.

### 3. Page Object Model Keeps Tests Maintainable

Generated tests follow strict POM architecture — no raw `page.click()` calls in spec files. When the UI changes, only the page object needs updating.

### 4. Screenshots Are Non-Negotiable

Every bug report includes a screenshot. This eliminates "works on my machine" debates and helps developers see exactly what the tester saw.

### 5. The 80/20 of Accessibility Fixes

Five fix patterns would resolve ~80% of the bugs we found:
1. Add `<label>` elements to all form inputs
2. Implement ARIA tabs pattern on tabbed interfaces
3. Add `role="dialog"` + focus management to popups/panels
4. Darken gray text colors to meet 4.5:1 contrast
5. Add `aria-live="polite"` regions for dynamic content updates

---

## Tools and Technologies

- **Playwright** v1.57 — Browser automation and device emulation
- **axe-core** v4.10 — Automated WCAG rule engine
- **@axe-core/playwright** — Playwright integration for axe
- **Kiro AI Agents** — Custom agents for test planning and generation
- **MCP (Model Context Protocol)** — Jira and Playwright tool integration
- **Page Object Model** — Test architecture pattern
- **TypeScript** — Test language

---

## What's Next

- **Automated regression suite** — Run accessibility tests on every PR
- **Real-device testing** — VoiceOver (iOS) and TalkBack (Android) validation
- **Keyboard-only user journey tests** — Full flow testing without a mouse
- **ARIA live region monitoring** — Continuous validation of dynamic announcements
- **Contrast theme testing** — High contrast and dark mode validation

---

## Conclusion

AI-powered accessibility testing isn't about replacing human judgment — it's about ensuring nothing gets missed. Our agents systematically covered every component, every WCAG criterion, and every user role. The result: 50+ bugs found, documented, and ready for developers to fix, in a fraction of the time manual testing would have taken.

The platform serves people with disabilities. Making it accessible isn't optional — it's the entire point. And with AI agents handling the systematic coverage, human testers can focus on what they do best: understanding the lived experience of users with disabilities and testing the nuances that no automation can catch.

---

*Testing performed against the Swarajability Hub QA environment. All bugs documented with WCAG 2.1 AA criterion references and developer-ready fix suggestions.*
