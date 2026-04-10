const {
  findTestCase,
  createTestCase,
  updateTestCase,
  linkIssue
} = require('./jiraService');

const { mapToPayload } = require('./jiraMapper');

async function syncTestCase(tc, storyKey) {
  console.log(`\n🔄 Processing: ${tc.id}`);

  try {
    const existing = await findTestCase(tc.id, storyKey);
    const payload = mapToPayload(tc);

    if (existing) {
      console.log(`🔍 Found existing: ${existing.key}`);
      await updateTestCase(existing.key, payload);
      console.log(`🔄 Updated: ${tc.id}`);
      await linkIssue(existing.key, storyKey);
      return existing.key;
    }

    const created = await createTestCase(payload);
    console.log(`✅ Created: ${created.key}`);
    await linkIssue(created.key, storyKey);
    return created.key;
  } catch (err) {
    const msg = err.response?.data || err.message;
    console.error(`❌ Failed ${tc.id}:`, JSON.stringify(msg, null, 2));
    throw err;
  }
}

module.exports = { syncTestCase };