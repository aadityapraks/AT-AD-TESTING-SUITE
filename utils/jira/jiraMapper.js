function mapToPayload(tc) {
  return {
    fields: {
      project: { key: "SCRUM" },
      summary: `[${tc.id}] - ${tc.title}`,
      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: `Preconditions: ${tc.preconditions}` }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: `Steps:\n${tc.steps.join('\n')}` }]
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: `Expected:\n${tc.expectedResults.join('\n')}` }]
          }
        ]
      },
      issuetype: { name: "Test Case" },
      priority: { name: tc.priority || "High" },
      customfield_10105: { value: tc.testResult }
    }
  };
}

module.exports = { mapToPayload };