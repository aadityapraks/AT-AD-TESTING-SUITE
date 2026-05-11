require('dotenv').config();
const fs = require('fs');
const { syncTestCase } = require('./syncEngine');

(async () => {
  const data = JSON.parse(
    fs.readFileSync('./specs/a11y/SCRUM-514-admin-add-new-product.json', 'utf-8')
  );

  for (const tc of data.testCases) {
    await syncTestCase(tc, data.jiraStory);
  }
})();