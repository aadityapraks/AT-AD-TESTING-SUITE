require('dotenv').config();
const fs = require('fs');
const { syncTestCase } = require('./syncEngine');

(async () => {
  const data = JSON.parse(
    fs.readFileSync('./specs/functional/SCRUM-481-admin-reject-vendor.json', 'utf-8')
  );

  for (const tc of data.testCases) {

      await syncTestCase(tc, data.jiraStory);    
    
  }
})();