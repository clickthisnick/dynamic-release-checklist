const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const build = require("../scripts/build.js");

const ROOT = path.resolve(__dirname, "..");
const TEMPLATE = path.join(ROOT, "src", "checklist.template.html");

test("relaxed json accepts comments and trailing commas", () => {
  const text = `
        [
          // note
          {"id": 1, "text": "Hello",},
        ]
        `;
  assert.deepEqual(JSON.parse(build.stripRelaxedJson(text)), [{ id: 1, text: "Hello" }]);
});

test("script json cannot break out of a script tag", () => {
  const payload = build.scriptJson({
    task: "</script><script>alert(1)</script>",
    and: "a & b",
  });
  assert.equal(payload.includes("<"), false);
  assert.equal(payload.includes(">"), false);
  assert.equal(payload.includes("\\u003c/script\\u003e"), true);
});

test("duplicate question ids fail validation", () => {
  const errors = build.validate(
    "cleaning",
    [
      { id: 10, text: "Is the litterbox clean?" },
      { id: 10, text: "Does the sofa need vacuuming?" },
    ],
    [{ task: "Clean litterbox", questionsRequiredYes: [10] }]
  );
  assert.equal(
    errors.some(function (error) {
      return error.includes("duplicate question id 10");
    }),
    true
  );
});

test("unknown question id fails validation", () => {
  const errors = build.validate(
    "sample",
    [{ id: 1, text: "Yes?" }],
    [{ task: "Do it", questionsRequiredYes: [9] }]
  );
  assert.equal(
    errors.some(function (error) {
      return error.includes("unknown question id 9");
    }),
    true
  );
});

test("invalid example does not replace an existing page", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "checklist-build-"));
  const example = path.join(tmp, "examples", "broken");
  fs.mkdirSync(example, { recursive: true });
  fs.writeFileSync(
    path.join(example, "questions.json"),
    '[{"id": 1, "text": "A"}, {"id": 1, "text": "B"}]',
    "utf8"
  );
  fs.writeFileSync(
    path.join(example, "tasks.json"),
    '[{"task": "Always", "questionsRequiredYes": [], "questionsAnyYes": []}]',
    "utf8"
  );
  const page = path.join(example, "checklist.html");
  fs.writeFileSync(page, "keep", "utf8");
  const errors = build.buildAll(path.join(tmp, "examples"), TEMPLATE);
  assert.ok(errors.length);
  assert.equal(fs.readFileSync(page, "utf8"), "keep");
});

test("rules text spells out conditions", () => {
  const text = build.rulesText(
    "Sample checklist",
    [{ id: 8, text: "Is the house going to be empty?" }],
    [
      {
        questionsRequiredYes: [8],
        questionsAnyYes: [],
        role: "Me",
        type: "Day Of",
        task: "Turn off air conditioners and heaters. Leave smoke alarms and carbon monoxide alarms on and plugged in.",
      },
    ]
  );
  assert.equal(text.includes("not a flat todo list"), true);
  assert.equal(text.includes("Is the house going to be empty?"), true);
  assert.equal(
    text.includes("Show if all of these answers are Yes: 8. Is the house going to be empty?"),
    true
  );
  assert.equal(text.includes("empty?."), false);
  assert.equal(
    text.includes("Leave smoke alarms and carbon monoxide alarms on and plugged in."),
    true
  );
});

test("real examples build a safe travel page", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "checklist-examples-"));
  const dest = path.join(tmp, "examples");
  fs.cpSync(path.join(ROOT, "examples"), dest, { recursive: true });
  const errors = build.buildAll(dest, TEMPLATE);
  assert.deepEqual(errors, []);
  const page = fs.readFileSync(path.join(dest, "travel-checklist", "checklist.html"), "utf8");
  const rules = fs.readFileSync(path.join(dest, "travel-checklist", "checklist.txt"), "utf8");
  const preStart = page.indexOf('id="applicable-checklist-text"');
  const pre = page.slice(preStart, page.indexOf("</pre>", preStart));
  assert.equal(page.includes("<title>Travel checklist</title>"), true);
  assert.equal(page.includes("Is this a business trip?"), true);
  assert.equal(pre.includes("Leave every smoke alarm"), true);
  assert.equal(pre.includes("Set a phone alarm to wake up"), true);
  assert.equal(pre.includes("Turn off air conditioners"), false);
  assert.equal(page.includes("Set Alarm To Wake Up"), false);
  assert.equal(page.includes("Turn Off Air Conditioners / Heaters"), false);
  assert.equal(page.includes("Unplug Electronics"), false);
  assert.equal(page.includes('type="application/json"'), true);
  assert.equal(page.includes("Machine-readable rules"), true);
  assert.equal(rules.includes("Obtain Corporate Card"), true);
  assert.equal(rules.includes("Leave smoke alarms and carbon monoxide alarms on and plugged in."), true);
  assert.equal(rules.includes("<script>"), false);
  const cleaning = JSON.parse(
    build.stripRelaxedJson(fs.readFileSync(path.join(dest, "cleaning-checklist", "questions.json"), "utf8"))
  );
  const ids = cleaning.map(function (question) {
    return question.id;
  });
  assert.equal(ids.length, new Set(ids).size);
  assert.equal(ids.includes(14), true);
  const committed = fs.readFileSync(path.join(ROOT, "examples", "travel-checklist", "checklist.html"), "utf8");
  const committedRules = fs.readFileSync(path.join(ROOT, "examples", "travel-checklist", "checklist.txt"), "utf8");
  assert.equal(page, committed);
  assert.equal(rules, committedRules);
});
