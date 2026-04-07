require('dotenv').config();
const fs = require('fs');
const { syncTestCase } = require('./syncEngine');

(async () => {
  const data = JSON.parse(
    fs.readFileSync('./specs/functional/SCRUM-363-caregiver-view-manage-pwds.json', 'utf-8')
  );

  for (const tc of data.testCases) {

      await syncTestCase(tc, data.jiraStory);    
    
  }
})();