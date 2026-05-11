const {
  findTestCase,
  createTestCase,
  updateTestCase,
  linkIssue
} = require('./jiraService');

const { mapToPayload } = require('./jiraMapper');

async function syncTestCase(tc, storyKey) {
  console.log(`\n🔄 Processing: ${tc.id}`);

  const existing = await findTestCase(tc.id, storyKey);
 

  const payload = mapToPayload(tc);

  if (existing) {
     console.log(`🔍 Found existing: ${existing.id}`);
    console.log(`⚠️ Exists: ${tc.id}`);

    // 🔄 Update
    await updateTestCase(existing.id, payload);
    console.log(`🔄 Updated: ${tc.id}`);

    // 🔗 Ensure link
    await linkIssue(existing.key, storyKey);

    return existing.key;
  }

  // ➕ Create
  const created = await createTestCase(payload);
  console.log(`✅ Created: ${created.key}`);

  // 🔗 Link
  await linkIssue(created.key, storyKey);

  return created.key;
}

module.exports = { syncTestCase };