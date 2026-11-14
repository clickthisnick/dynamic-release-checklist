/*
 * Generate checklist.html and checklist.txt from each example's JSON.
 * The pages are static. This script uses the same render functions as the browser.
 */
const fs = require("fs");
const path = require("path");
const app = require("../lib/js/checklist.js");

const ROOT = path.resolve(__dirname, "..");
const TOKENS = [
  "___TITLE___",
  "___SUMMARY___",
  "___APPLICABLE_TEXT___",
  "___QUESTIONS_HTML___",
  "___TASKS_HTML___",
  "___ROLES_HTML___",
  "___DATA_JSON___",
];

function stripRelaxedJson(text) {
  const kept = [];
  String(text).split(/\r?\n/).forEach(function (line) {
    if (line.trim().startsWith("//")) {
      return;
    }
    kept.push(line);
  });
  return kept.join("\n").replace(/,(\s*[\]}])/g, "$1");
}

function readJson(filePath) {
  try {
    return JSON.parse(stripRelaxedJson(fs.readFileSync(filePath, "utf8")));
  } catch (err) {
    const wrapped = new Error("Could not read " + filePath);
    wrapped.cause = err;
    throw wrapped;
  }
}

function scriptJson(data) {
  return JSON.stringify(data)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function titleFromSlug(slug) {
  const words = String(slug).replace(/_/g, "-").replace(/-/g, " ").split(/\s+/).filter(Boolean);
  if (!words.length) {
    return "Checklist";
  }
  const head = words[0];
  const rest = words.slice(1);
  return [head.slice(0, 1).toUpperCase() + head.slice(1)].concat(rest).join(" ");
}

function validate(name, questions, tasks) {
  const errors = [];
  if (!Array.isArray(questions)) {
    return [name + ": questions.json must be a list"];
  }
  if (!Array.isArray(tasks)) {
    return [name + ": tasks.json must be a list"];
  }

  const seen = new Map();
  questions.forEach(function (question, index) {
    if (!question || typeof question !== "object" || Array.isArray(question)) {
      errors.push(name + ": question " + index + " is not an object");
      return;
    }
    const text = question.text === undefined || question.text === null ? "" : String(question.text);
    if (!Object.prototype.hasOwnProperty.call(question, "id") || !text.trim()) {
      errors.push(name + ": question " + index + " needs an id and text");
      return;
    }
    if (seen.has(question.id)) {
      errors.push(
        name +
          ": duplicate question id " +
          question.id +
          " (questions " +
          seen.get(question.id) +
          " and " +
          index +
          ")"
      );
    }
    seen.set(question.id, index);
  });

  tasks.forEach(function (task, index) {
    const taskText = task && task.task !== undefined && task.task !== null ? String(task.task) : "";
    if (!task || typeof task !== "object" || Array.isArray(task) || !taskText.trim()) {
      errors.push(name + ": task " + index + " needs task text");
      return;
    }
    ["questionsRequiredYes", "questionsAnyYes"].forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(task, key) || task[key] === null) {
        return;
      }
      const rawIds = task[key];
      if (!Array.isArray(rawIds)) {
        errors.push(name + ": task " + index + " " + key + " must be a list");
        return;
      }
      rawIds.forEach(function (questionId) {
        if (!seen.has(questionId)) {
          errors.push(name + ": task " + index + " references unknown question id " + questionId);
        }
      });
    });
  });
  return errors;
}

function questionLookup(questions) {
  const found = new Map();
  questions.forEach(function (question) {
    if (question && typeof question === "object" && Object.prototype.hasOwnProperty.call(question, "id")) {
      found.set(question.id, question.text || "");
    }
  });
  return found;
}

function describeCondition(task, questions) {
  const lookup = questionLookup(questions);
  let required = task.questionsRequiredYes || [];
  let anyYes = task.questionsAnyYes || [];
  if (!Array.isArray(required)) {
    required = [];
  }
  if (!Array.isArray(anyYes)) {
    anyYes = [];
  }

  function phrase(ids) {
    return ids
      .map(function (questionId) {
        const text = lookup.has(questionId) ? lookup.get(questionId) : "missing question";
        return questionId + ". " + text;
      })
      .join("; ");
  }

  function sentence(text) {
    if (text.endsWith(".") || text.endsWith("!") || text.endsWith("?")) {
      return text;
    }
    return text + ".";
  }

  if (!required.length && !anyYes.length) {
    return "Always show.";
  }
  const chunks = [];
  if (anyYes.length) {
    chunks.push(sentence("Show if any of these answers are Yes: " + phrase(anyYes)));
  }
  if (required.length) {
    chunks.push(sentence("Show if all of these answers are Yes: " + phrase(required)));
  }
  if (anyYes.length && required.length) {
    return chunks.join(" ") + " Either condition is enough.";
  }
  return chunks[0];
}

function rulesText(title, questions, tasks) {
  const lines = [
    title,
    "",
    "This file lists every conditional rule. It is not a flat todo list.",
    "Do only the items whose conditions match the answers.",
    "Never turn off, unplug, or disable smoke alarms or carbon monoxide alarms.",
    "A phone alarm is a reminder on a phone, not a smoke or carbon monoxide alarm.",
    "On the checklist page, follow only the Applicable items section",
    "(#applicable-checklist-text). Tasks that do not apply are omitted there.",
    "",
    "Questions:",
  ];
  questions.forEach(function (question) {
    const answer = question.default === true ? "Yes" : "No";
    lines.push(question.id + ". " + (question.text || ""));
    lines.push("   Default answer: " + answer);
  });
  lines.push("");
  lines.push("Tasks:");
  tasks.forEach(function (task, index) {
    lines.push(index + 1 + ". " + describeCondition(task, questions));
    lines.push("   Section: " + (task.type || "Tasks"));
    lines.push("   Role: " + (task.role || "Unassigned"));
    lines.push("   " + (task.task || ""));
    if (task.note) {
      lines.push("   Note: " + task.note);
    }
    lines.push("");
  });
  return lines.join("\n").replace(/\s+$/g, "") + "\n";
}

function escapeHtmlStatic(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function renderStatic(title, questions, tasks) {
  const answers = app.defaultAnswers(questions);
  return {
    text: app.formatApplicableText(title, questions, tasks, answers),
    summary: app.summaryText(tasks, answers),
    questionsHtml: app.renderQuestions(questions, answers),
    tasksHtml: app.renderTasks(tasks, answers, {}),
    rolesHtml: app.renderRoles(tasks, answers),
  };
}

function fillTemplate(template, replacements) {
  let page = template;
  TOKENS.forEach(function (token) {
    const value = replacements[token];
    if (value.indexOf(token) !== -1) {
      throw new Error("Generated content contains the placeholder " + token);
    }
    page = page.split(token).join(value);
  });
  const missing = TOKENS.filter(function (token) {
    return page.indexOf(token) !== -1;
  });
  if (missing.length) {
    throw new Error("Template still has placeholders: " + missing.join(", "));
  }
  return page;
}

function writeText(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporary = filePath + ".tmp";
  fs.writeFileSync(temporary, text, "utf8");
  fs.renameSync(temporary, filePath);
}

function exampleDirs(examplesDir) {
  return fs
    .readdirSync(examplesDir)
    .sort()
    .map(function (name) {
      return path.join(examplesDir, name);
    })
    .filter(function (directory) {
      const name = path.basename(directory);
      return !name.startsWith(".") && fs.statSync(directory).isDirectory();
    });
}

function buildAll(examplesDir, templatePath) {
  const template = fs.readFileSync(templatePath, "utf8");
  const loaded = [];
  const errors = [];
  exampleDirs(examplesDir).forEach(function (directory) {
    const name = path.basename(directory);
    const questionsPath = path.join(directory, "questions.json");
    const tasksPath = path.join(directory, "tasks.json");
    if (!fs.existsSync(questionsPath) || !fs.existsSync(tasksPath)) {
      errors.push(name + ": needs questions.json and tasks.json");
      return;
    }
    let questions;
    let tasks;
    try {
      questions = readJson(questionsPath);
      tasks = readJson(tasksPath);
    } catch (err) {
      errors.push(err.message);
      return;
    }
    validate(name, questions, tasks).forEach(function (error) {
      errors.push(error);
    });
    loaded.push({ directory: directory, questions: questions, tasks: tasks });
  });

  if (errors.length) {
    return errors;
  }

  for (let i = 0; i < loaded.length; i += 1) {
    const directory = loaded[i].directory;
    const questions = loaded[i].questions;
    const tasks = loaded[i].tasks;
    const name = path.basename(directory);
    const title = titleFromSlug(name);
    const rendered = renderStatic(title, questions, tasks);
    const pieces = ["questionsHtml", "tasksHtml", "rolesHtml", "text", "summary"];
    for (let piece = 0; piece < pieces.length; piece += 1) {
      if (rendered[pieces[piece]].indexOf("___") !== -1) {
        return [name + ": rendered " + pieces[piece] + " contains a template placeholder"];
      }
    }
    const page = fillTemplate(template, {
      "___TITLE___": escapeHtmlStatic(title),
      "___SUMMARY___": escapeHtmlStatic(rendered.summary),
      "___APPLICABLE_TEXT___": escapeHtmlStatic(rendered.text),
      "___QUESTIONS_HTML___": rendered.questionsHtml,
      "___TASKS_HTML___": rendered.tasksHtml,
      "___ROLES_HTML___": rendered.rolesHtml,
      "___DATA_JSON___": scriptJson({ title: title, questions: questions, tasks: tasks }),
    });
    writeText(path.join(directory, "checklist.html"), page);
    writeText(path.join(directory, "checklist.txt"), rulesText(title, questions, tasks));
  }
  return [];
}

function main() {
  const errors = buildAll(path.join(ROOT, "examples"), path.join(ROOT, "src", "checklist.template.html"));
  if (errors.length) {
    errors.forEach(function (error) {
      console.error(error);
    });
    process.exitCode = 1;
  }
}

module.exports = {
  stripRelaxedJson: stripRelaxedJson,
  scriptJson: scriptJson,
  validate: validate,
  rulesText: rulesText,
  buildAll: buildAll,
  titleFromSlug: titleFromSlug,
};

if (require.main === module) {
  main();
}
