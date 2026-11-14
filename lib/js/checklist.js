/*
 * Checklist behavior shared by the browser page and the Node tests.
 * Task text is rendered as text, never interpreted as HTML.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  if (typeof document !== "undefined") {
    const start = function () {
      api.boot(document);
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
  }
  root.ChecklistApp = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function answerIsYes(answers, questionId) {
    if (!answers || typeof answers !== "object") {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(answers, questionId)) {
      return answers[questionId] === true;
    }
    const key = String(questionId);
    if (Object.prototype.hasOwnProperty.call(answers, key)) {
      return answers[key] === true;
    }
    return false;
  }

  function taskApplies(task, answers) {
    if (!task || typeof task !== "object") {
      return false;
    }
    const required = asArray(task.questionsRequiredYes);
    const anyYes = asArray(task.questionsAnyYes);
    if (required.length === 0 && anyYes.length === 0) {
      return true;
    }
    for (let i = 0; i < anyYes.length; i += 1) {
      if (answerIsYes(answers, anyYes[i])) {
        return true;
      }
    }
    if (required.length === 0) {
      return false;
    }
    for (let i = 0; i < required.length; i += 1) {
      if (!answerIsYes(answers, required[i])) {
        return false;
      }
    }
    return true;
  }

  function applicableTasks(tasks, answers) {
    const items = [];
    asArray(tasks).forEach(function (task, index) {
      if (taskApplies(task, answers)) {
        items.push({ task: task, index: index });
      }
    });
    return items;
  }

  function defaultAnswers(questions) {
    const answers = {};
    asArray(questions).forEach(function (question) {
      if (!question || question.id === undefined || question.id === null) {
        return;
      }
      answers[question.id] = question.default === true;
    });
    return answers;
  }

  function maybeDecode(raw) {
    if (typeof raw !== "string") {
      return raw;
    }
    if (raw.indexOf("%") === -1 && raw.indexOf("+") === -1) {
      return raw;
    }
    try {
      return decodeURIComponent(raw.replace(/\+/g, " "));
    } catch (err) {
      return raw;
    }
  }

  function parseAnswersParam(raw) {
    if (raw === null || raw === undefined || raw === "") {
      return null;
    }
    let parsed;
    try {
      parsed = JSON.parse(maybeDecode(String(raw)));
    } catch (err) {
      return { error: "Could not read saved answers. Showing default answers." };
    }
    if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
      return { error: "Saved answers were not a JSON object. Showing default answers." };
    }
    return { value: parsed };
  }

  function parseDoneParam(raw) {
    if (raw === null || raw === undefined || raw === "") {
      return {};
    }
    let parsed;
    try {
      parsed = JSON.parse(maybeDecode(String(raw)));
    } catch (err) {
      return { error: "Could not read saved completed items." };
    }
    if (!Array.isArray(parsed)) {
      return { error: "Saved completed items were not a list." };
    }
    const done = {};
    parsed.forEach(function (value) {
      if (typeof value === "number" && Number.isInteger(value) && value >= 0) {
        done[value] = true;
      }
    });
    return { value: done };
  }

  function resolveAnswers(questions, parsed) {
    const answers = defaultAnswers(questions);
    if (!parsed) {
      return answers;
    }
    asArray(questions).forEach(function (question) {
      if (!question || question.id === undefined || question.id === null) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(parsed, question.id)) {
        answers[question.id] = parsed[question.id] === true;
      } else if (Object.prototype.hasOwnProperty.call(parsed, String(question.id))) {
        answers[question.id] = parsed[String(question.id)] === true;
      }
    });
    return answers;
  }

  function finishSentence(value) {
    const text = String(value || "");
    if (!text || /[.!?]$/.test(text)) {
      return text;
    }
    return text + ".";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function summaryText(tasks, answers) {
    const items = applicableTasks(tasks, answers);
    const total = asArray(tasks).length;
    const hidden = total - items.length;
    return (
      items.length +
      " of " +
      total +
      " tasks apply. " +
      hidden +
      " tasks are hidden because their conditions are not met."
    );
  }

  function formatApplicableText(title, questions, tasks, answers) {
    const items = applicableTasks(tasks, answers);
    const lines = [
      String(title || "Checklist"),
      "Follow only the applicable items below. Items that do not apply are omitted from this list.",
      "Do not turn off, unplug, or disable smoke alarms or carbon monoxide alarms.",
      "",
      "Answers:",
    ];
    asArray(questions).forEach(function (question) {
      if (!question) {
        return;
      }
      const yes = answerIsYes(answers, question.id);
      lines.push("- " + (yes ? "Yes" : "No") + ". " + (question.text || ""));
    });
    lines.push("");
    lines.push(
      "Applicable items (" + items.length + " of " + asArray(tasks).length + "):"
    );
    if (!items.length) {
      lines.push("(none)");
    } else {
      items.forEach(function (item, position) {
        const section = item.task.type ? item.task.type : "Tasks";
        const role = item.task.role ? " Role: " + item.task.role + "." : "";
        lines.push(
          position + 1 + ". " + section + ". " + finishSentence(item.task.task) + role
        );
      });
    }
    return lines.join("\n") + "\n";
  }

  function renderQuestions(questions, answers) {
    const list = asArray(questions).filter(function (question) {
      return question && question.id !== undefined && question.id !== null;
    });
    if (!list.length) {
      return "<p>There are no questions. Every task applies.</p>";
    }
    return list
      .map(function (question) {
        const id = String(question.id);
        const yes = answerIsYes(answers, question.id);
        const yesId = "question-" + id + "-yes";
        const noId = "question-" + id + "-no";
        const description = question.description
          ? '<p class="question-description">' +
            escapeHtml(question.description) +
            "</p>"
          : "";
        return (
          '<fieldset class="question" data-testid="question-' +
          escapeHtml(id) +
          '"><legend>' +
          escapeHtml(question.text || "") +
          "</legend>" +
          description +
          '<div class="answer-choices">' +
          '<input type="radio" autocomplete="off" name="question-' +
          escapeHtml(id) +
          '" id="' +
          escapeHtml(yesId) +
          '" data-testid="answer-' +
          escapeHtml(id) +
          '-yes" data-question-id="' +
          escapeHtml(id) +
          '" value="yes"' +
          (yes ? " checked" : "") +
          ">" +
          '<label for="' +
          escapeHtml(yesId) +
          '">Yes</label>' +
          '<input type="radio" autocomplete="off" name="question-' +
          escapeHtml(id) +
          '" id="' +
          escapeHtml(noId) +
          '" data-testid="answer-' +
          escapeHtml(id) +
          '-no" data-question-id="' +
          escapeHtml(id) +
          '" value="no"' +
          (yes ? "" : " checked") +
          ">" +
          '<label for="' +
          escapeHtml(noId) +
          '">No</label></div></fieldset>'
        );
      })
      .join("");
  }

  function renderTasks(tasks, answers, done) {
    const items = applicableTasks(tasks, answers);
    if (!items.length) {
      return '<p data-testid="no-tasks">No tasks apply to these answers.</p>';
    }
    const groups = new Map();
    items.forEach(function (item) {
      const section = item.task.type ? String(item.task.type) : "Tasks";
      if (!groups.has(section)) {
        groups.set(section, []);
      }
      groups.get(section).push(item);
    });
    let html = "";
    groups.forEach(function (group, section) {
      html +=
        '<section class="task-group"><h3>' +
        escapeHtml(section) +
        '</h3><ul class="task-list">';
      group.forEach(function (item) {
        const id = "task-" + item.index;
        const checked = done && done[item.index] ? " checked" : "";
        const role = item.task.role
          ? ' <span class="task-role">Role: ' + escapeHtml(item.task.role) + ".</span>"
          : "";
        html +=
          '<li data-task-index="' +
          escapeHtml(item.index) +
          '"><input type="checkbox" id="' +
          id +
          '" data-testid="' +
          id +
          '" data-task-index="' +
          escapeHtml(item.index) +
          '" data-task-text="' +
          escapeHtml(item.task.task) +
          '"' +
          checked +
          '><label for="' +
          id +
          '">' +
          escapeHtml(item.task.task) +
          role +
          "</label></li>";
      });
      html += "</ul></section>";
    });
    return html;
  }

  function renderRoles(tasks, answers) {
    const items = applicableTasks(tasks, answers);
    if (!items.length) {
      return "<p>No applicable tasks to group by role.</p>";
    }
    const groups = new Map();
    items.forEach(function (item) {
      const role = item.task.role ? String(item.task.role) : "Unassigned";
      if (!groups.has(role)) {
        groups.set(role, []);
      }
      groups.get(role).push(item);
    });
    let html = "";
    groups.forEach(function (group, role) {
      const headingId = "role-" + slug(role);
      html +=
        '<section aria-labelledby="' +
        headingId +
        '"><h3 id="' +
        headingId +
        '">' +
        escapeHtml(role) +
        "</h3><ul>";
      group.forEach(function (item) {
        const section = item.task.type ? escapeHtml(item.task.type) + ". " : "";
        html += "<li>" + section + escapeHtml(item.task.task) + "</li>";
      });
      html += "</ul></section>";
    });
    return html;
  }

  function slug(value) {
    const text = String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return text || "item";
  }

  function answersForUrl(questions, answers) {
    const out = {};
    asArray(questions).forEach(function (question) {
      if (!question || question.id === undefined || question.id === null) {
        return;
      }
      out[question.id] = answerIsYes(answers, question.id);
    });
    return out;
  }

  function boot(doc) {
    if (!doc || doc.body.dataset.checklistReady === "true") {
      return;
    }
    const dataEl = doc.getElementById("checklist-data");
    if (!dataEl) {
      return;
    }
    doc.body.dataset.checklistReady = "true";

    let data;
    try {
      data = JSON.parse(dataEl.textContent);
    } catch (err) {
      setStatus(doc, "Could not read the checklist data on this page.");
      return;
    }

    const questions = asArray(data.questions);
    const tasks = asArray(data.tasks);
    const title =
      data.title ||
      (doc.querySelector("h1") ? doc.querySelector("h1").textContent : "Checklist");
    const params = new URL(doc.location.href).searchParams;
    const parsedAnswers = parseAnswersParam(params.get("answers"));
    const parsedDone = parseDoneParam(params.get("done"));
    const state = {
      questions: questions,
      tasks: tasks,
      title: title,
      answers: resolveAnswers(
        questions,
        parsedAnswers && parsedAnswers.value ? parsedAnswers.value : null
      ),
      done: parsedDone && parsedDone.value ? parsedDone.value : {},
      view: initialView(params),
    };

    const questionsRoot = doc.getElementById("questions-root");
    const tasksRoot = doc.getElementById("tasks-root");
    const rolesRoot = doc.getElementById("roles-root");
    const questionForm = doc.getElementById("question-form");

    function paint() {
      if (questionsRoot) {
        questionsRoot.innerHTML = renderQuestions(state.questions, state.answers);
      }
      if (tasksRoot) {
        tasksRoot.innerHTML = renderTasks(state.tasks, state.answers, state.done);
      }
      if (rolesRoot) {
        rolesRoot.innerHTML = renderRoles(state.tasks, state.answers);
      }
      const summary = doc.getElementById("applicable-summary");
      if (summary) {
        summary.textContent = summaryText(state.tasks, state.answers);
      }
      const pre = doc.getElementById("applicable-checklist-text");
      if (pre) {
        pre.textContent = formatApplicableText(
          state.title,
          state.questions,
          state.tasks,
          state.answers
        );
      }
    }

    function writeUrl() {
      const url = new URL(doc.location.href);
      url.searchParams.set(
        "answers",
        JSON.stringify(answersForUrl(state.questions, state.answers))
      );
      url.searchParams.set("view", state.view);
      if (state.view === "checklist") {
        url.searchParams.set("redirectToTasks", "true");
      } else {
        url.searchParams.delete("redirectToTasks");
      }
      const doneIds = Object.keys(state.done)
        .filter(function (key) {
          return state.done[key];
        })
        .map(function (key) {
          return Number(key);
        })
        .filter(function (value) {
          return Number.isInteger(value);
        })
        .sort(function (a, b) {
          return a - b;
        });
      if (doneIds.length) {
        url.searchParams.set("done", JSON.stringify(doneIds));
      } else {
        url.searchParams.delete("done");
      }
      doc.defaultView.history.replaceState(null, "", url);
    }

    function showView(view, announce) {
      state.view = view;
      ["questions", "roles", "checklist"].forEach(function (name) {
        const panel = doc.getElementById("panel-" + name);
        const tab = doc.getElementById("tab-" + name);
        const selected = name === view;
        if (panel) {
          panel.hidden = !selected;
        }
        if (tab) {
          tab.setAttribute("aria-selected", selected ? "true" : "false");
          tab.tabIndex = selected ? 0 : -1;
        }
      });
      if (announce) {
        const message =
          view === "checklist"
            ? "Showing the checklist."
            : view === "roles"
              ? "Showing tasks grouped by role."
              : "Showing questions.";
        setStatus(doc, message);
      }
    }

    paint();
    showView(state.view, false);
    const notes = [];
    if (parsedAnswers && parsedAnswers.error) {
      notes.push(parsedAnswers.error);
    }
    if (parsedDone && parsedDone.error) {
      notes.push(parsedDone.error);
    }
    notes.push("Loaded " + title + ". " + summaryText(state.tasks, state.answers));
    setStatus(doc, notes.join(" "));
    writeUrl();

    if (questionForm) {
      questionForm.addEventListener("submit", function (event) {
        event.preventDefault();
      });
      questionForm.addEventListener("change", function (event) {
        const input = event.target;
        if (!input.matches || !input.matches("input[data-question-id]")) {
          return;
        }
        const id = input.getAttribute("data-question-id");
        const question = state.questions.find(function (item) {
          return String(item.id) === id;
        });
        if (!question) {
          return;
        }
        state.answers[question.id] = input.value === "yes";
        if (tasksRoot) {
          tasksRoot.innerHTML = renderTasks(state.tasks, state.answers, state.done);
        }
        if (rolesRoot) {
          rolesRoot.innerHTML = renderRoles(state.tasks, state.answers);
        }
        const summary = doc.getElementById("applicable-summary");
        if (summary) {
          summary.textContent = summaryText(state.tasks, state.answers);
        }
        const pre = doc.getElementById("applicable-checklist-text");
        if (pre) {
          pre.textContent = formatApplicableText(
            state.title,
            state.questions,
            state.tasks,
            state.answers
          );
        }
        const answerWord = state.answers[question.id] ? "Yes" : "No";
        setStatus(
          doc,
          "Saved answer. " +
            answerWord +
            ". " +
            question.text +
            " " +
            summaryText(state.tasks, state.answers)
        );
        writeUrl();
      });
    }

    if (tasksRoot) {
      tasksRoot.addEventListener("change", function (event) {
        const input = event.target;
        if (!input.matches || !input.matches("input[type=checkbox][data-task-index]")) {
          return;
        }
        const index = Number(input.getAttribute("data-task-index"));
        state.done[index] = input.checked;
        const taskText = input.getAttribute("data-task-text") || "item";
        setStatus(
          doc,
          (input.checked ? "Marked complete: " : "Marked not complete: ") + taskText
        );
        writeUrl();
      });
    }

    ["questions", "roles", "checklist"].forEach(function (name) {
      const tab = doc.getElementById("tab-" + name);
      if (!tab) {
        return;
      }
      tab.addEventListener("click", function () {
        showView(name, true);
        writeUrl();
      });
    });

    const tablist = doc.querySelector("[role=tablist]");
    if (tablist) {
      tablist.addEventListener("keydown", function (event) {
        const tabs = ["questions", "roles", "checklist"];
        const current = tabs.indexOf(state.view);
        let next = null;
        if (event.key === "ArrowRight") {
          next = tabs[(current + 1) % tabs.length];
        } else if (event.key === "ArrowLeft") {
          next = tabs[(current + tabs.length - 1) % tabs.length];
        }
        if (!next) {
          return;
        }
        event.preventDefault();
        showView(next, true);
        writeUrl();
        const tab = doc.getElementById("tab-" + next);
        if (tab) {
          tab.focus();
        }
      });
    }

    const copyButton = doc.getElementById("copy-applicable");
    if (copyButton) {
      copyButton.addEventListener("click", function () {
        const pre = doc.getElementById("applicable-checklist-text");
        const text = pre ? pre.textContent : "";
        const clipboard =
          doc.defaultView.navigator && doc.defaultView.navigator.clipboard;
        if (!clipboard || !clipboard.writeText) {
          setStatus(
            doc,
            "Could not copy automatically. The applicable items are in the text box on this page."
          );
          return;
        }
        clipboard.writeText(text).then(
          function () {
            setStatus(doc, "Copied the applicable items.");
          },
          function () {
            setStatus(
              doc,
              "Could not copy automatically. The applicable items are in the text box on this page."
            );
          }
        );
      });
    }
  }

  function initialView(params) {
    const redirect = params.get("redirectToTasks");
    if (redirect && redirect !== "false" && redirect !== "0") {
      return "checklist";
    }
    const view = params.get("view");
    if (view === "roles" || view === "checklist" || view === "questions") {
      return view;
    }
    return "questions";
  }

  function setStatus(doc, message) {
    const status = doc.getElementById("status");
    if (status) {
      status.textContent = message;
    }
  }

  return {
    answerIsYes: answerIsYes,
    taskApplies: taskApplies,
    applicableTasks: applicableTasks,
    defaultAnswers: defaultAnswers,
    parseAnswersParam: parseAnswersParam,
    parseDoneParam: parseDoneParam,
    resolveAnswers: resolveAnswers,
    escapeHtml: escapeHtml,
    summaryText: summaryText,
    formatApplicableText: formatApplicableText,
    renderQuestions: renderQuestions,
    renderTasks: renderTasks,
    renderRoles: renderRoles,
    answersForUrl: answersForUrl,
    boot: boot,
  };
});
