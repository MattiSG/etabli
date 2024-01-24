I describe below a project composed of {{websites.length}} websites and {{repositories.length}} repositories, and I want you to output some information:

1. business use cases of what the project does (not functional things like sending emails), try to reuse those from the provided list `definedBusinessUseCases` when valid, otherwise if it's a new one use simple words to keep it clear (10 words maximum)
2. a description of 100 words maximum of what the project does (business words, not about technical stuff)
3. all tools that are frameworks or services through an API, use your knowledge to match them with those from the provided list `tools` when valid, otherwise use their main commercial name, and skip those that seem tiny libraries, protocol standards, or font libraries
4. to know if yes/no the project checkes those cases:
   - has virtual email inboxes
   - sends emails
   - ability to build a PDF document

You must answer by respecting the following JSON format (adjust values only, and write them in french) and you need to consider websites and repositories as a whole (not distinguishing them when producing the information we asked before):

```json
{{{resultSample}}}
```

{{#each websites as |website|}}

---

{{> websitePartial website=website websiteNumber=(incrementIndex @index)}}

{{#unless @last}}

---

{{/unless}}
{{/each}}

{{#each repositories as |repository|}}

---

{{> repositoryPartial repository=repository repositoryNumber=(incrementIndex @index)}}

{{#unless @last}}

---

{{/unless}}
{{/each}}