## Is your release checklist full of fluff?

### That's why I created the Dynamic Release Checklist.

Only have **_relevant_** items in your checklist.

------

## Demo

- [Jira release checklist](examples/jira-release-checklist/checklist.html)
- [Travel checklist](examples/travel-checklist/checklist.html)
- [All examples](index.html)

Hosted copy: <a href="https://www.clickthisnick.com/dynamic-release-checklist/examples/jira-release-checklist/checklist.html">clickthisnick.com demo</a>

# The Problem

Too many times I see release checklists full of items that **don't apply to this release.**

This teaches and reinforces people to gloss over items, sometimes missing crucial tasks.

Imagine the checklist below with **no downpage**

| Task                   | Needed With This Release?  |
| -------------| :-----:|
| Create Downpage     | *No* |
| Push Code      |    Yes |
| Remove Downpage |     *No* |

You now have two items ( Create Downpage and Remove Downpage ) that are no longer needed on your checklist.

-----

# The Solution

##### Create questions that reduce your release checklist to only the _necessary_ items

Each example is a folder with `questions.json` and `tasks.json`. `node scripts/build.js` writes `checklist.html` and `checklist.txt`. The browser then filters those pages. Python is not used.

```json
[
  {"id": 1, "text": "Is there a downpage?", "default": false}
]
```

`questions.json` may use full-line `//` comments and a trailing comma. The `id` is the value tasks refer to. It is not the row number. `default` is optional and is `false` when omitted.

Push code has no question ids, so that task shows no matter what.

Create Downpage and Remove Downpage show when question 1 is Yes.

```json
[
  {"questionsRequiredYes": [1], "questionsAnyYes": [], "role": "Developer", "type": "Release", "task": "Create Downpage"},
  {"questionsRequiredYes": [], "questionsAnyYes": [], "role": "Developer", "type": "Release", "task": "Push Code"},
  {"questionsRequiredYes": [1], "questionsAnyYes": [], "role": "Developer", "type": "Release", "task": "Remove Downpage"}
]
```

## Further Explanation

- `questionsRequiredYes`: every listed question id must be Yes. An empty list does not by itself show the task.
- `questionsAnyYes`: the task shows when any listed question id is Yes.
- If both lists are non-empty, either condition is enough.
- If both lists are empty, the task always shows.
- `role`: who is responsible. The Roles tab groups the applicable tasks by this value.
- `type`: which section of the checklist the task is in.

The page shows only the applicable tasks, with short labels and Yes or No choices. One safety note stays at the top. The plain-text applicable list is in a collapsed section (`#applicable-checklist-text`) and in `checklist.txt`, for people who want the full wording and for automated agents. Saved answers live in the `answers` URL parameter, keyed by question id. `redirectToTasks=true` opens the Checklist tab.

## Run locally

Node.js 18 or newer:

```bash
node scripts/build.js
node scripts/serve.js 8000
```

Open http://127.0.0.1:8000/

The build writes the same static files the site publishes. It does not run when someone opens a checklist. `src/checklist.template.html` is the page shell.

Tests:

```bash
node --test tests/checklist.test.js tests/build.test.js
```

## Safety

Checklist text is instructions. Items that tell you to turn something off or unplug something say what to leave alone. Do not turn off or unplug smoke alarms or carbon monoxide alarms. See [llms.txt](llms.txt) for notes aimed at automated browser agents.

## More Examples

The examples folder has travel, cleaning, moving, stretch, hotel checkout, and Jira release checklists.

## License

This project is licensed under the [Apache 2.0](LICENSE) license.
