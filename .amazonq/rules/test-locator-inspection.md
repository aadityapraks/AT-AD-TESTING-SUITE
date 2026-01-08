# Test Locator Inspection Rule

## CRITICAL: Always Inspect DOM Before Writing Tests

When creating or modifying any test code:

1. **ALWAYS use browser_snapshot first** to inspect the actual DOM structure before writing any locators
2. **NEVER use generic locators** like getByRole('button') without verifying the actual accessible name from the snapshot
3. **Extract exact ref values** from the snapshot for precise element targeting
4. **Verify element hierarchy** to ensure locators are stable and specific

## Workflow

1. Navigate to the page (if needed)
2. Call browser_snapshot to get the actual DOM structure
3. Identify the exact elements with their roles, accessible names, and refs
4. Write test steps using the verified locators from the snapshot
5. Only then proceed with interactions (click, type, verify, etc.)

## Example

❌ BAD - Generic locator without inspection:
```
browser_click with element="Submit button" and generic ref
```

✅ GOOD - Inspect first, then use actual locators:
```
1. browser_snapshot - inspect the page
2. browser_click with exact ref from snapshot like "ref=123" and actual accessible name
```
