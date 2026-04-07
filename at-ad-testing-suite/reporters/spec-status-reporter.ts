import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Maps each spec file (by path fragment) to its corresponding JSON spec file
 * and the test title → testCase id mapping.
 */
const SPEC_MAP: Record<string, { specFile: string; titleToId: Record<string, string> }> = {
  'scrum18-ap-dashboard': {
    specFile: 'specs/functional/SCRUM-18-ap-dashboard-homepage.json',
    titleToId: {
      'Approved AP Dashboard Access After Login':                  'TC_DASH_001',
      'Dashboard Welcome Message and Organization Name Display':   'TC_DASH_003',
      'Navigation Buttons Functionality':                          'TC_DASH_004',
      'Summary Widgets Display and Data Accuracy':                 'TC_DASH_005',
      'Horizontal Tab Navigation Functionality':                   'TC_DASH_006',
      'Notification Bell Icon Display and Unread Count':           'TC_DASH_007',
      'Notification Popup Functionality':                          'TC_DASH_008',
      'Detailed Notification Center Navigation and Layout':        'TC_DASH_009',
      'Notification Center Tab Filtering':                         'TC_DASH_010',
      'Responsive Design - Desktop View':                          'TC_DASH_013',
      'Security - Unauthorized Access Prevention':                 'TC_DASH_023',
    },
  },
};

interface PendingUpdate {
  specFilePath: string;
  testCaseId: string;
  status: 'passed' | 'failed' | 'skipped';
}

class SpecStatusReporter implements Reporter {
  private rootDir: string;
  private pending: PendingUpdate[] = [];

  constructor(options: { rootDir?: string } = {}) {
    this.rootDir = options.rootDir ?? process.cwd();
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const specFilePath = test.location?.file ?? '';

    // Find which entry in SPEC_MAP matches this spec file
    const mapKey = Object.keys(SPEC_MAP).find((key) =>
      specFilePath.replace(/\\/g, '/').includes(key)
    );
    if (!mapKey) return;

    const { specFile, titleToId } = SPEC_MAP[mapKey];
    const testCaseId = titleToId[test.title];
    if (!testCaseId) return;

    this.pending.push({
      specFilePath: path.join(this.rootDir, specFile),
      testCaseId,
      status: result.status as 'passed' | 'failed' | 'skipped',
    });
  }

  onEnd(_result: FullResult): void {
    if (this.pending.length === 0) return;

    // Group updates by spec file so we only read/write each file once
    const byFile = new Map<string, PendingUpdate[]>();
    for (const update of this.pending) {
      const list = byFile.get(update.specFilePath) ?? [];
      list.push(update);
      byFile.set(update.specFilePath, list);
    }

    for (const [filePath, updates] of byFile) {
      this.applyUpdates(filePath, updates);
    }
  }

  private applyUpdates(filePath: string, updates: PendingUpdate[]): void {
    if (!fs.existsSync(filePath)) {
      console.warn(`[SpecStatusReporter] Spec file not found: ${filePath}`);
      return;
    }

    let raw: string;
    try {
      raw = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error(`[SpecStatusReporter] Failed to read ${filePath}:`, err);
      return;
    }

    let spec: { testCases: Array<{ id: string; testResult: string; [key: string]: unknown }> };
    try {
      spec = JSON.parse(raw);
    } catch (err) {
      console.error(`[SpecStatusReporter] Failed to parse JSON at ${filePath}:`, err);
      return;
    }

    let changed = false;
    for (const update of updates) {
      const tc = spec.testCases.find((c) => c.id === update.testCaseId);
      if (!tc) {
        console.warn(`[SpecStatusReporter] Test case ${update.testCaseId} not found in ${filePath}`);
        continue;
      }

      const newResult = update.status === 'passed' ? 'PASSED'
                      : update.status === 'failed' ? 'FAILED'
                      : 'SKIPPED';

      if (tc.testResult !== newResult) {
        tc.testResult = newResult;
        changed = true;
        console.log(`[SpecStatusReporter] ${update.testCaseId} → ${newResult}`);
      }
    }

    if (!changed) return;

    try {
      fs.writeFileSync(filePath, JSON.stringify(spec, null, 2) + '\n', 'utf8');
      console.log(`[SpecStatusReporter] Updated ${path.relative(this.rootDir, filePath)}`);
    } catch (err) {
      console.error(`[SpecStatusReporter] Failed to write ${filePath}:`, err);
    }
  }
}

export default SpecStatusReporter;
