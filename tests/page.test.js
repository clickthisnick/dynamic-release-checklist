const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../lib/js/checklist.js");

const sample = {
  title: "Sample checklist",
  questions: [
    { id: 8, text: "Is the house going to be empty?", description: "Includes the garage." },
    { id: 1, text: "Plane?" },
  ],
  tasks: [
    {
      questionsRequiredYes: [],
      questionsAnyYes: [],
      role: "Me",
      type: "Safety",
      task: "Leave alarms on.",
    },
    {
      questionsRequiredYes: [8],
      questionsAnyYes: [],
      role: "Me",
      type: "Day Of",
      task: "Turn off air conditioners and heaters",
      note: "Leave smoke alarms on.",
    },
  ],
};

function element(id) {
  const listeners = {};
  return {
    id: id,
    hidden: false,
    tabIndex: 0,
    textContent: "",
    innerHTML: "",
    dataset: {},
    attributes: {},
    listeners: listeners,
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    getAttribute(name) {
      return Object.prototype.hasOwnProperty.call(this.attributes, name)
        ? this.attributes[name]
        : null;
    },
    addEventListener(type, fn) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(fn);
    },
    dispatch(type, event) {
      (listeners[type] || []).forEach((fn) => fn(event));
    },
    focus() {
      this.focused = true;
    },
  };
}

function page(href, data) {
  const ids = [
    "checklist-data",
    "questions-root",
    "tasks-root",
    "roles-root",
    "question-form",
    "applicable-summary",
    "applicable-checklist-text",
    "status",
    "tab-questions",
    "tab-roles",
    "tab-checklist",
    "panel-questions",
    "panel-roles",
    "panel-checklist",
    "copy-applicable",
  ];
  const byId = {};
  ids.forEach((id) => {
    byId[id] = element(id);
  });
  byId["checklist-data"].textContent = JSON.stringify(data);
  const tablist = element("tablist");
  const doc = {
    body: { dataset: {} },
    location: { href: href },
    copied: "",
    defaultView: {
      history: {
        replaceState(_state, _title, url) {
          doc.location.href = String(url);
        },
      },
      navigator: {
        clipboard: {
          writeText(text) {
            doc.copied = text;
            return Promise.resolve(text);
          },
        },
      },
    },
    getElementById(id) {
      return byId[id] || null;
    },
    querySelector(selector) {
      if (selector === "h1") {
        return { textContent: "Fallback title" };
      }
      if (selector === "[role=tablist]") {
        return tablist;
      }
      return null;
    },
  };
  return { doc: doc, byId: byId, tablist: tablist };
}

function bootSample(href) {
  const fixture = page(href || "http://127.0.0.1/examples/sample/checklist.html", sample);
  app.boot(fixture.doc);
  return fixture;
}

test("boot shows default answers and omits conditional tasks", () => {
  const fixture = bootSample();
  assert.equal(fixture.doc.body.dataset.checklistReady, "true");
  assert.match(fixture.byId["questions-root"].innerHTML, /Includes the garage/);
  assert.match(fixture.byId["tasks-root"].innerHTML, /Leave alarms on/);
  assert.equal(fixture.byId["tasks-root"].innerHTML.includes("Turn off air conditioners"), false);
  assert.match(fixture.byId["applicable-summary"].textContent, /1 of 2 tasks apply/);
  assert.match(fixture.doc.location.href, /answers=/);
  assert.match(fixture.doc.location.href, /view=questions/);
  assert.equal(fixture.byId["panel-checklist"].hidden, true);
  app.boot(fixture.doc);
  fixture.byId["status"].textContent = "still ready";
  app.boot(fixture.doc);
  assert.equal(fixture.byId["status"].textContent, "still ready");
});

test("boot ignores a missing document or a missing data element", () => {
  assert.equal(app.boot(null), undefined);
  assert.equal(app.boot(undefined), undefined);
  const doc = {
    body: { dataset: {} },
    getElementById() {
      return null;
    },
  };
  app.boot(doc);
  assert.equal(doc.body.dataset.checklistReady, undefined);
});

test("boot reports unreadable checklist data and saved answers", () => {
  const broken = page("http://127.0.0.1/checklist.html", sample);
  broken.byId["checklist-data"].textContent = "{";
  app.boot(broken.doc);
  assert.match(broken.byId["status"].textContent, /Could not read the checklist data/);

  const saved = page("http://127.0.0.1/checklist.html?answers=nope&done=nope", sample);
  app.boot(saved.doc);
  assert.match(saved.byId["status"].textContent, /Could not read saved answers/);
  assert.match(saved.byId["status"].textContent, /Could not read saved completed items/);
});

test("saved view and redirect open the requested tab", () => {
  const roles = bootSample("http://127.0.0.1/checklist.html?view=roles");
  assert.equal(roles.byId["panel-roles"].hidden, false);
  assert.equal(roles.byId["tab-roles"].attributes["aria-selected"], "true");

  const checklist = bootSample("http://127.0.0.1/checklist.html?redirectToTasks=true&done=[0]");
  assert.equal(checklist.byId["panel-checklist"].hidden, false);
  assert.match(checklist.byId["tasks-root"].innerHTML, /checked/);

  const unknown = bootSample("http://127.0.0.1/checklist.html?view=nope&redirectToTasks=0");
  assert.equal(unknown.byId["panel-questions"].hidden, false);
});

test("answering a question updates the applicable list and the url", () => {
  const fixture = bootSample();
  fixture.byId["question-form"].dispatch("submit", {
    preventDefault() {
      fixture.prevented = true;
    },
  });
  assert.equal(fixture.prevented, true);
  fixture.byId["question-form"].dispatch("change", { target: { matches: () => false } });
  fixture.byId["question-form"].dispatch("change", {
    target: {
      value: "yes",
      matches: (selector) => selector === "input[data-question-id]",
      getAttribute: () => "99",
    },
  });
  assert.equal(fixture.byId["tasks-root"].innerHTML.includes("Turn off air conditioners"), false);

  fixture.byId["question-form"].dispatch("change", {
    target: {
      value: "yes",
      matches: (selector) => selector === "input[data-question-id]",
      getAttribute: (name) => (name === "data-question-id" ? "8" : null),
    },
  });
  assert.match(
    fixture.byId["applicable-checklist-text"].textContent,
    /Turn off air conditioners and heaters/,
  );
  assert.match(fixture.byId["roles-root"].innerHTML, /Turn off air conditioners/);
  assert.match(fixture.byId["status"].textContent, /Saved answer\. Yes\./);
  assert.match(fixture.doc.location.href, /%228%22%3Atrue|"8":true/);
});

test("checking an item stores done indexes and a hidden completed label", () => {
  const fixture = bootSample();
  const label = { textContent: "" };
  const box = {
    checked: true,
    matches: (selector) => selector === "input[type=checkbox][data-task-index]",
    getAttribute(name) {
      if (name === "data-task-index") return "0";
      if (name === "data-task-text") return "Leave alarms on.";
      return null;
    },
    closest() {
      return {
        querySelector() {
          return label;
        },
      };
    },
  };
  fixture.byId["tasks-root"].dispatch("change", { target: { matches: () => false } });
  const second = {
    checked: true,
    matches: box.matches,
    getAttribute(name) {
      if (name === "data-task-index") return "2";
      if (name === "data-task-text") return "Later";
      return null;
    },
    closest() {
      return null;
    },
  };
  fixture.byId["tasks-root"].dispatch("change", { target: second });
  fixture.byId["tasks-root"].dispatch("change", { target: box });
  assert.equal(label.textContent, "Completed.");
  assert.match(fixture.byId["status"].textContent, /Marked complete: Leave alarms on/);
  assert.match(fixture.doc.location.href, /done=/);

  box.checked = false;
  fixture.byId["tasks-root"].dispatch("change", { target: box });
  assert.equal(label.textContent, "");
  assert.match(fixture.byId["status"].textContent, /Marked not complete/);
  assert.match(fixture.doc.location.href, /done=/);
  second.checked = false;
  fixture.byId["tasks-root"].dispatch("change", { target: second });
  assert.equal(fixture.doc.location.href.includes("done="), false);
});

test("tabs and arrow keys switch sections", () => {
  const fixture = bootSample();
  fixture.byId["tab-checklist"].dispatch("click", {});
  assert.equal(fixture.byId["panel-checklist"].hidden, false);
  assert.equal(fixture.byId["panel-questions"].hidden, true);
  assert.match(fixture.byId["status"].textContent, /Showing the checklist/);
  assert.match(fixture.doc.location.href, /redirectToTasks=true/);

  let prevented = false;
  fixture.tablist.dispatch("keydown", {
    key: "ArrowRight",
    preventDefault() {
      prevented = true;
    },
  });
  assert.equal(prevented, true);
  assert.equal(fixture.byId["panel-questions"].hidden, false);
  assert.match(fixture.byId["status"].textContent, /Showing questions/);

  prevented = false;
  fixture.tablist.dispatch("keydown", {
    key: "ArrowLeft",
    preventDefault() {
      prevented = true;
    },
  });
  assert.equal(prevented, true);
  assert.equal(fixture.byId["panel-checklist"].hidden, false);
  assert.equal(fixture.byId["tab-checklist"].focused, true);

  fixture.byId["tab-roles"].dispatch("click", {});
  assert.equal(fixture.byId["panel-roles"].hidden, false);
  assert.match(fixture.byId["status"].textContent, /Showing tasks grouped by role/);

  prevented = false;
  fixture.tablist.dispatch("keydown", {
    key: "Enter",
    preventDefault() {
      prevented = true;
    },
  });
  assert.equal(prevented, false);

  fixture.byId["tab-questions"].dispatch("click", {});
  assert.match(fixture.byId["status"].textContent, /Showing questions/);
  assert.equal(fixture.doc.location.href.includes("redirectToTasks="), false);
});

test("copy reports success, failure, and a missing clipboard", async () => {
  const fixture = bootSample();
  fixture.byId["copy-applicable"].dispatch("click", {});
  await Promise.resolve();
  assert.match(fixture.doc.copied, /Sample checklist/);
  assert.match(fixture.byId["status"].textContent, /Copied the applicable items/);

  fixture.doc.defaultView.navigator.clipboard.writeText = () => Promise.reject(new Error("denied"));
  fixture.byId["copy-applicable"].dispatch("click", {});
  await Promise.resolve();
  await Promise.resolve();
  assert.match(fixture.byId["status"].textContent, /Could not copy automatically/);

  fixture.doc.defaultView.navigator.clipboard = {
    writeText: undefined,
  };
  fixture.byId["copy-applicable"].dispatch("click", {});
  assert.match(fixture.byId["status"].textContent, /Could not copy automatically/);
});

test("start waits for DOMContentLoaded and boots a ready document", () => {
  const waiting = {
    readyState: "loading",
    events: {},
    addEventListener(type, fn) {
      this.events[type] = fn;
    },
    body: { dataset: {} },
    getElementById() {
      return null;
    },
  };
  app.start(waiting);
  assert.equal(waiting.body.dataset.checklistReady, undefined);
  waiting.events.DOMContentLoaded();
  assert.equal(waiting.body.dataset.checklistReady, undefined);

  const ready = page("http://127.0.0.1/checklist.html", sample);
  ready.doc.readyState = "complete";
  app.start(ready.doc);
  assert.equal(ready.doc.body.dataset.checklistReady, "true");
  app.start(null);
});

test("a page with only checklist data still boots", () => {
  const doc = {
    body: { dataset: {} },
    location: { href: "http://127.0.0.1/checklist.html" },
    defaultView: {
      history: {
        replaceState(_state, _title, url) {
          doc.location.href = String(url);
        },
      },
      navigator: {},
    },
    getElementById(id) {
      if (id === "checklist-data") {
        return { textContent: JSON.stringify({ questions: [], tasks: [] }) };
      }
      return null;
    },
    querySelector(selector) {
      return selector === "h1" ? { textContent: "Fallback title" } : null;
    },
  };
  app.boot(doc);
  assert.equal(doc.body.dataset.checklistReady, "true");
  assert.match(doc.location.href, /Fallback%20title|view=questions/);
});
