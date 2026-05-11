const jira = require('./jiraClient');

// 🔍 Find existing test case linked to story
async function findTestCase(tcId, storyKey) {
  const jql = `
    project = SCRUM
    AND issue in linkedIssues("${storyKey}")
    AND summary ~ "${tcId}"
  `;

  const res = await jira.get('/rest/api/3/search/jql', {
    params: { jql, maxResults: 1 }
  });

  return res.data.issues.length ? res.data.issues[0] : null;
}

// ➕ Create
async function createTestCase(payload) {
  const res = await jira.post('/rest/api/3/issue', payload);
  return res.data;
}

// 🔄 Update
async function updateTestCase(issueKey, payload) {
  await jira.put(`/rest/api/3/issue/${issueKey}`, payload);
}

// 🔗 Link
async function linkIssue(testKey, storyKey) {
  try {
    await jira.post('/rest/api/3/issueLink', {
      type: { name: "Test Case" },
      inwardIssue: { key: testKey },
      outwardIssue: { key: storyKey }
    });
  } catch (err) {
    // ignore if already linked
  }
}

module.exports = {
  findTestCase,
  createTestCase,
  updateTestCase,
  linkIssue
};