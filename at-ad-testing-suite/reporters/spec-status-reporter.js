// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Maps each spec file (by path fragment) to its JSON spec file and
 * the test title → testCase id mapping.
 *
 * To support additional spec files, add a new entry here following the same pattern.
 */
const SPEC_MAP = {
  'scrum18-ap-dashboard': {
    specFile: 'specs/functional/SCRUM-18-ap-dashboard-homepage.json',
    titleToId: {
      'Approved AP Dashboard Access After Login':                 'TC_DASH_001',
      'Dashboard Welcome Message and Organization Name Display':  'TC_DASH_003',
      'Navigation Buttons Functionality':                         'TC_DASH_004',
      'Summary Widgets Display and Data Accuracy':                'TC_DASH_005',
      'Horizontal Tab Navigation Functionality':                  'TC_DASH_006',
      'Notification Bell Icon Display and Unread Count':          'TC_DASH_007',
      'Notification Popup Functionality':                         'TC_DASH_008',
      'Detailed Notification Center Navigation and Layout':       'TC_DASH_009',
      'Notification Center Tab Filtering':                        'TC_DASH_010',
      'Responsive Design - Desktop View':                         'TC_DASH_013',
      'Security - Unauthorized Access Prevention':                'TC_DASH_023',
    },
  },
};

class SpecStatusReporter {
  constructor(options = {}) {
    this._rootDir = process.cwd();
    /** @type {Array<{specFilePath: string, testCaseId: string, status: string}>} */
    this._pending = [];
  }

  onBegin(config) {
    if (config && config.rootDir) this._rootDir = config.rootDir;
  }

  onTestEnd(test, result) {
    const specFilePath = test.location && test.location.file ? test.location.file : '';

    // Find the matching SPEC_MAP entry by checking if the spec file path contains the key
    const mapKey = Object.keys(SPEC_MAP).find((key) =>
      specFilePath.replace(/\\/g, '/').includes(key)
    );
    if (!mapKey) return;

    const { specFile, titleToId } = SPEC_MAP[mapKey];
    const testCaseId = titleToId[test.title];
    if (!testCaseId) return;

    this._pending.push({
      specFilePath: path.join(this._rootDir, specFile),
      testCaseId,
      status: result.status, // 'passed' | 'failed' | 'skipped' | 'timedOut'
    });
  }

  onEnd(_result) {
    if (this._pending.length === 0) return;

    // Group updates by spec file so each file is read/written only once
    /** @type {Map<string, Array<{testCaseId: string, status: string}>>} */
    const byFile = new Map();
    for (const update of this._pending) {
      const list = byFile.get(update.specFilePath) || [];
      list.push({ testCaseId: update.testCaseId, status: update.status });
      byFile.set(update.specFilePath, list);
    }

    for (const [filePath, updates] of byFile) {
      this._applyUpdates(filePath, updates);
    }
  }

  _applyUpdates(filePath, updates) {
    if (!fs.existsSync(filePath)) {
      console.warn(`[SpecStatusReporter] Spec file not found: ${filePath}`);
      return;
    }

    let raw;
    try {
      raw = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error(`[SpecStatusReporter] Failed to read ${filePath}:`, err);
      return;
    }

    let spec;
    try {
      spec = JSON.parse(raw);
    } catch (err) {
      console.error(`[SpecStatusReporter] Failed to parse JSON at ${filePath}:`, err);
      return;
    }

    let changed = false;
    for (const { testCaseId, status } of updates) {
      const tc = spec.testCases.find((c) => c.id === testCaseId);
      if (!tc) {
        console.warn(`[SpecStatusReporter] Test case ${testCaseId} not found in ${path.basename(filePath)}`);
        continue;
      }

      const newResult =
        status === 'passed'   ? 'PASSED'  :
        status === 'failed'   ? 'FAILED'  :
        status === 'timedOut' ? 'FAILED'  :
                                'SKIPPED';

      if (tc.testResult !== newResult) {
        tc.testResult = newResult;
        changed = true;
        console.log(`[SpecStatusReporter] ${testCaseId} → ${newResult}`);
      }
    }

    if (!changed) return;

    try {
      fs.writeFileSync(filePath, JSON.stringify(spec, null, 2) + '\n', 'utf8');
      console.log(`[SpecStatusReporter] Saved ${path.relative(this._rootDir, filePath)}`);
    } catch (err) {
      console.error(`[SpecStatusReporter] Failed to write ${filePath}:`, err);
    }
  }
}

module.exports = SpecStatusReporter;
