const axios = require('axios');

const auth = Buffer.from(
  `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
).toString('base64');

const jira = axios.create({
  baseURL: process.env.JIRA_BASE_URL,
  headers: {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

module.exports = jira;