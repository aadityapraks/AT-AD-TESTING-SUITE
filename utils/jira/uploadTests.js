require('dotenv').config();
const fs = require('fs');
const { syncTestCase } = require('./syncEngine');

(async () => {
  const data = JSON.parse(
    fs.readFileSync('./specs/test-cases/scrum86-handle-missing-unsafe-links.json', 'utf-8')
  );

  for (const tc of data.testCases) {

      await syncTestCase(tc, data.jiraStory);    
    
  }
})();