const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../lib/js/checklist.js");

const travelLike = {
  questions: [
    { id: 8, text: "Is the house going to be empty?", default: false },
    { id: 1, text: "Are you taking a plane?" },
  ],
  tasks: [
    {
      questionsRequiredYes: [],
      questionsAnyYes: [],
      role: "Me",
      type: "Safety",
      task: "Leave every smoke alarm and carbon monoxide alarm turned on and plugged in.",
    },
    {
      questionsRequiredYes: [],
      questionsAnyYes: [],
      role: "Me",
      type: "Night Before",
      task: "Set a phone alarm to wake up",
    },
    {
      questionsRequiredYes: [8],
      questionsAnyYes: [],
      role: "Me",
      type: "Day Of",
      task: "Turn off air conditioners and heaters",
      note: "Leave smoke alarms and carbon monoxide alarms on and plugged in.",
    },
    {
      questionsRequiredYes: [8],
      questionsAnyYes: [],
      role: "Me",
      type: "Day Of",
      task: "Unplug nonessential electronics",
      note: "Do not unplug smoke alarms, carbon monoxide alarms, or the refrigerator.",
    },
  ],
};

test("default answers omit empty-house tasks and keep the safety line", () => {
  const answers = app.defaultAnswers(travelLike.questions);
  const text = app.formatApplicableText(
    "Travel checklist",
    travelLike.questions,
    travelLike.tasks,
    answers,
  );
  const html = app.renderTasks(travelLike.tasks, answers, {});
  assert.match(text, /Leave every smoke alarm and carbon monoxide alarm turned on/);
  assert.match(text, /Set a phone alarm to wake up/);
  assert.equal(text.includes("Turn off air conditioners"), false);
  assert.equal(html.includes("Turn off air conditioners"), false);
  assert.equal(html.includes("visibility:hidden"), false);
  assert.match(html, /<span class="task-text">Leave every smoke alarm/);
  assert.match(html, /id="task-0"/);
});

test("answering the house question shows the heater item with the alarm warning", () => {
  const answers = app.resolveAnswers(travelLike.questions, { 8: true });
  const text = app.formatApplicableText(
    "Travel checklist",
    travelLike.questions,
    travelLike.tasks,
    answers,
  );
  const html = app.renderTasks(travelLike.tasks, answers, {});
  assert.match(
    text,
    /Turn off air conditioners and heaters\. Leave smoke alarms and carbon monoxide alarms on and plugged in\./,
  );
  assert.match(html, /<span class="task-text">Turn off air conditioners and heaters<\/span>/);
  assert.match(
    html,
    /class="visually-hidden"> Leave smoke alarms and carbon monoxide alarms on and plugged in\./,
  );
  assert.match(
    html,
    /class="visually-hidden"> Do not unplug smoke alarms, carbon monoxide alarms, or the refrigerator\./,
  );
});

test("question ids are not array positions", () => {
  const questions = [
    { id: 6, text: "Are there dirty dishes?" },
    { id: 1, text: "Are the dishes in the dishwasher clean?" },
  ];
  const tasks = [
    { questionsRequiredYes: [6], questionsAnyYes: [], task: "Brush off everything" },
    { questionsRequiredYes: [1], questionsAnyYes: [], task: "Put away the clean dishes" },
  ];
  const answers = { 6: true, 1: false };
  const names = app.applicableTasks(tasks, answers).map((item) => item.task.task);
  assert.deepEqual(names, ["Brush off everything"]);
  const html = app.renderQuestions(questions, answers);
  assert.match(html, /data-testid="answer-6-yes"/);
  assert.match(html, /id="question-6-yes"[^>]*checked/);
  assert.match(html, /<label for="question-6-yes">Yes<\/label>/);
});

test("any-yes, all-required, always, and missing fields", () => {
  assert.equal(
    app.taskApplies(
      { questionsRequiredYes: [], questionsAnyYes: [1, 2], task: "Check in" },
      { 1: false, 2: true },
    ),
    true,
  );
  assert.equal(
    app.taskApplies(
      { questionsRequiredYes: [], questionsAnyYes: [1, 2], task: "Check in" },
      { 1: false, 2: false },
    ),
    false,
  );
  assert.equal(
    app.taskApplies(
      { questionsRequiredYes: [1, 2], questionsAnyYes: [], task: "Both" },
      { 1: true, 2: true },
    ),
    true,
  );
  assert.equal(
    app.taskApplies(
      { questionsRequiredYes: [1, 2], questionsAnyYes: [], task: "Both" },
      { 1: true, 2: false },
    ),
    false,
  );
  assert.equal(app.taskApplies({ task: "Always" }, {}), true);
  assert.equal(
    app.taskApplies(
      { questionsRequiredYes: [1], questionsAnyYes: [2], task: "Either group" },
      { 1: false, 2: true },
    ),
    true,
  );
});

test("URL answers override defaults and reject bad payloads", () => {
  const questions = [{ id: 1, text: "First?", default: true }];
  assert.equal(app.defaultAnswers(questions)[1], true);
  assert.equal(app.resolveAnswers(questions, null)[1], true);
  assert.equal(app.resolveAnswers(questions, { 1: false })[1], false);
  assert.deepEqual(app.parseAnswersParam(null), null);
  assert.deepEqual(app.parseAnswersParam(""), null);
  assert.deepEqual(app.parseAnswersParam('{"8":true}').value, { 8: true });
  assert.equal(app.parseAnswersParam("%7B%228%22%3Atrue%7D").value["8"], true);
  assert.ok(app.parseAnswersParam("[]").error);
  assert.ok(app.parseAnswersParam("null").error);
  assert.ok(app.parseAnswersParam("{bad").error);
  assert.deepEqual(app.parseDoneParam("[0,2]").value, { 0: true, 2: true });
  assert.ok(app.parseDoneParam('{"0":true}').error);
});

test("question and task text cannot inject HTML", () => {
  const questions = [{ id: 1, text: '<img src=x onerror="alert(1)">' }];
  const tasks = [
    {
      questionsRequiredYes: [],
      questionsAnyYes: [],
      task: "</script><script>alert(1)</script>",
      role: "<b>Me</b>",
      type: "Day",
    },
  ];
  const questionsHtml = app.renderQuestions(questions, { 1: false });
  const tasksHtml = app.renderTasks(tasks, { 1: false }, {});
  assert.equal(questionsHtml.includes("<img"), false);
  assert.match(questionsHtml, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.equal(tasksHtml.includes("<script>"), false);
  assert.match(tasksHtml, /&lt;\/script&gt;&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(tasksHtml, /class="task-role">&lt;b&gt;Me&lt;\/b&gt;<\/span>/);
});

test("summary counts hidden tasks", () => {
  const answers = app.defaultAnswers(travelLike.questions);
  assert.equal(
    app.summaryText(travelLike.tasks, answers),
    "2 of 4 tasks apply. 2 tasks are hidden because their conditions are not met.",
  );
});

test("answer lookup ignores bad values and accepts string keys", () => {
  assert.equal(app.answerIsYes(null, 1), false);
  assert.equal(app.answerIsYes([], 1), false);
  assert.equal(app.answerIsYes({ 1: "yes" }, 1), false);
  assert.equal(app.answerIsYes({ 8: true }, "8"), true);
  assert.equal(app.taskApplies(null, {}), false);
  assert.equal(app.taskApplies("nope", {}), false);
  assert.deepEqual(app.defaultAnswers([null, { text: "Missing id" }, { id: 3, default: true }]), {
    3: true,
  });
  assert.equal(app.resolveAnswers([{ id: 4, default: false }], { 4: "no" })[4], false);
  assert.equal(app.resolveAnswers([null, { id: null }, { id: 4 }], { 4: true })[4], true);
  assert.equal(app.parseAnswersParam("%").error.includes("Could not read"), true);
  assert.deepEqual(app.parseDoneParam(null), {});
  assert.deepEqual(app.parseDoneParam(""), {});
  assert.deepEqual(app.parseDoneParam('[0,-1,1.5,"2"]').value, { 0: true });
  assert.equal(app.parseDoneParam("%").error.includes("Could not read"), true);
  assert.deepEqual(app.answersForUrl([null, { id: 2 }], { 2: true }), { 2: true });
});

test("empty questions, tasks, and roles have plain empty states", () => {
  assert.match(app.renderQuestions([], {}), /There are no questions/);
  assert.match(app.renderQuestions([{ text: "No id" }, null], {}), /There are no questions/);
  const described = app.renderQuestions(
    [{ id: 1, text: "<b>Go?</b>", description: "<i>more</i>" }],
    { 1: false },
  );
  assert.match(described, /question-description/);
  assert.equal(described.includes("<i>"), false);
  assert.match(app.renderTasks([], {}, {}), /No tasks apply/);
  assert.match(app.renderTasks(null, {}, {}), /No tasks apply/);
  const unlabeled = app.renderTasks(
    [{ questionsRequiredYes: [], questionsAnyYes: [], task: "Just do it" }],
    {},
    {},
  );
  assert.equal(unlabeled.includes("task-role"), false);
  assert.match(unlabeled, /<h3>Tasks<\/h3>/);
  assert.match(app.renderRoles([], {}), /No applicable tasks/);
  const roles = app.renderRoles(
    [{ questionsRequiredYes: [], questionsAnyYes: [], task: "Just do it", type: "Day" }],
    {},
  );
  assert.match(roles, /id="role-unassigned"/);
  assert.match(roles, /Day\. Just do it/);
  const text = app.formatApplicableText("Sample", [null, { id: 1 }], [], {});
  assert.match(text, /\(none\)/);
  assert.match(text, /No\. \n/);
});
