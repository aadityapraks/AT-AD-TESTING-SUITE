# Mobile Responsiveness & Accessibility Testing Reference

This document serves as a standalone reference for mobile responsiveness and touch accessibility testing criteria integrated into the accessibility test planner agent.

## WCAG 2.1 AA Criteria Covered

| WCAG Criterion | Title | What to Test |
|---|---|---|
| 1.3.4 | Orientation | Page is not locked to portrait or landscape only |
| 1.4.4 | Resize Text | Pinch-to-zoom not disabled; text resizable to 200% |
| 1.4.10 | Reflow | Content reflows at 320px width without horizontal scroll |
| 1.4.13 | Content on Hover or Focus | No hover-only interactions; touch alternatives exist |
| 2.5.1 | Pointer Gestures | Complex gestures have single-pointer alternatives |
| 2.5.5 | Target Size | Touch targets are at least 44x44 CSS pixels |

## Test Categories

### Content Reflow (1.4.10)
- Set viewport to 320px width
- Verify no horizontal scrollbar appears
- Verify all content is visible without horizontal scrolling
- Verify text wraps properly and is readable
- Verify images scale or reflow within the viewport

### Orientation (1.3.4)
- Rotate device/viewport to landscape
- Verify content is fully usable in both orientations
- Verify no functionality is lost when orientation changes

### Viewport Meta / Zoom (1.4.4)
- Inspect `<meta name="viewport">` tag
- Verify `user-scalable` is NOT set to `no`
- Verify `maximum-scale` is NOT set to `1` (or less)
- Verify pinch-to-zoom works on mobile devices

### Touch Target Size (2.5.5)
- Measure interactive element bounding boxes
- Verify all buttons, links, and form controls are at least 44x44px
- Pay special attention to inline links, icon buttons, and close buttons

### Pointer Gestures (2.5.1)
- Identify any swipe, pinch, or multi-finger gestures
- Verify each has a single-tap/click alternative
- Verify carousels have prev/next buttons (not swipe-only)
- Verify maps have zoom buttons (not pinch-only)

### Hover Alternatives (1.4.13)
- Identify any content revealed on hover (tooltips, dropdowns)
- Verify the same content is accessible via tap/click on touch devices
- Verify hover content is dismissible and persistent

### Mobile Screen Reader Compatibility
- Test with VoiceOver (iOS Safari)
- Test with TalkBack (Android Chrome)
- Verify all interactive elements are reachable via swipe gestures
- Verify focus order is logical on mobile
- Verify custom components announce roles and states correctly

## Responsive Breakpoints to Test

| Breakpoint | Device Example | Viewport Width |
|---|---|---|
| Small mobile | iPhone SE | 320px |
| Standard mobile | iPhone 13 / Pixel 5 | 375px - 393px |
| Large mobile | iPhone 14 Pro Max | 414px - 430px |
| Tablet portrait | iPad Mini | 768px |
| Tablet landscape | iPad | 1024px |

## Playwright Automation Coverage

### What CAN be automated:
- Viewport resizing and reflow assertions (`page.setViewportSize()`)
- Touch target size validation (query bounding boxes, assert >= 44x44)
- Viewport meta tag inspection (parse HTML for zoom restrictions)
- Responsive layout checks (element visibility, stacking at breakpoints)
- Device emulation via Playwright device descriptors

### Playwright config example:
```typescript
// Add to playwright.config.ts projects array
{
  name: 'Mobile Chrome',
  use: { ...devices['Pixel 5'] },
},
{
  name: 'Mobile Safari',
  use: { ...devices['iPhone 13'] },
},
```

### What requires manual/real-device testing:
- Actual VoiceOver and TalkBack screen reader behavior
- Real touch interactions and haptic feedback
- Native gesture feel and responsiveness
- Performance on actual mobile hardware
- Real-world mobile network conditions

## Recommendation

Use Playwright device emulation for automated regression coverage of reflow, target sizes, and viewport meta. Supplement with real-device manual testing (or BrowserStack/Sauce Labs) for screen reader and gesture validation.
