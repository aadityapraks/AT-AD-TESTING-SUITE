require('dotenv').config();
const fs = require('fs');
const { syncTestCase } = require('./syncEngine');

(async () => {
  const data = JSON.parse(
    fs.readFileSync('./specs/test-cases/pwd/scrum73-navigate-catalog.json', 'utf-8')
  );

  for (const tc of data.testCases) {

      await syncTestCase(tc, data.jiraStory);    
    
  }
})();