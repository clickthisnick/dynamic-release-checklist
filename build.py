#!/usr/bin/env python3
"""Build checklist.html and checklist.txt for each example."""

from __future__ import annotations

import html
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent

TOKENS = (
    "___TITLE___",
    "___SUMMARY___",
    "___APPLICABLE_TEXT___",
    "___QUESTIONS_HTML___",
    "___TASKS_HTML___",
    "___ROLES_HTML___",
    "___DATA_JSON___",
)


def strip_relaxed_json(text: str) -> str:
    """Drop full-line // comments and trailing commas the example files use."""
    kept = []
    for line in text.splitlines():
        if line.strip().startswith("//"):
            continue
        kept.append(line)
    return re.sub(r",(\s*[\]}])", r"\1", "\n".join(kept))


def read_json(path: Path):
    try:
        return json.loads(strip_relaxed_json(path.read_text(encoding="utf-8")))
    except Exception as err:
        raise ValueError(f"Could not read {path}") from err


def script_json(data: object) -> str:
    """JSON safe to embed in an HTML script tag."""
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return (
        payload.replace("&", r"\u0026")
        .replace("<", r"\u003c")
        .replace(">", r"\u003e")
        .replace("\u2028", r"\u2028")
        .replace("\u2029", r"\u2029")
    )


def title_from_slug(slug: str) -> str:
    words = slug.replace("_", "-").replace("-", " ").split()
    if not words:
        return "Checklist"
    head, *rest = words
    return " ".join([head[:1].upper() + head[1:], *rest])


def validate(name: str, questions, tasks) -> list[str]:
    errors = []
    if not isinstance(questions, list):
        return [f"{name}: questions.json must be a list"]
    if not isinstance(tasks, list):
        return [f"{name}: tasks.json must be a list"]

    seen = {}
    for index, question in enumerate(questions):
        if not isinstance(question, dict):
            errors.append(f"{name}: question {index} is not an object")
            continue
        if "id" not in question or not str(question.get("text", "")).strip():
            errors.append(f"{name}: question {index} needs an id and text")
            continue
        question_id = question["id"]
        if question_id in seen:
            errors.append(
                f"{name}: duplicate question id {question_id} "
                f"(questions {seen[question_id]} and {index})"
            )
        seen[question_id] = index

    for index, task in enumerate(tasks):
        if not isinstance(task, dict) or not str(task.get("task", "")).strip():
            errors.append(f"{name}: task {index} needs task text")
            continue
        for key in ("questionsRequiredYes", "questionsAnyYes"):
            raw_ids = task.get(key, [])
            if raw_ids is None:
                continue
            if not isinstance(raw_ids, list):
                errors.append(f"{name}: task {index} {key} must be a list")
                continue
            for question_id in raw_ids:
                if question_id not in seen:
                    errors.append(
                        f"{name}: task {index} references unknown question id {question_id}"
                    )
    return errors


def question_lookup(questions) -> dict:
    found = {}
    for question in questions:
        if isinstance(question, dict) and "id" in question:
            found[question["id"]] = question.get("text", "")
    return found


def describe_condition(task: dict, questions) -> str:
    lookup = question_lookup(questions)
    required = task.get("questionsRequiredYes") or []
    any_yes = task.get("questionsAnyYes") or []
    if not isinstance(required, list):
        required = []
    if not isinstance(any_yes, list):
        any_yes = []

    def phrase(ids) -> str:
        parts = []
        for question_id in ids:
            text = lookup.get(question_id, "missing question")
            parts.append(f"{question_id}. {text}")
        return "; ".join(parts)

    def sentence(text: str) -> str:
        if text.endswith((".", "!", "?")):
            return text
        return text + "."

    if not required and not any_yes:
        return "Always show."
    chunks = []
    if any_yes:
        chunks.append(sentence("Show if any of these answers are Yes: " + phrase(any_yes)))
    if required:
        chunks.append(sentence("Show if all of these answers are Yes: " + phrase(required)))
    if any_yes and required:
        return " ".join(chunks) + " Either condition is enough."
    return chunks[0]


def rules_text(title: str, questions, tasks) -> str:
    lines = [
        title,
        "",
        "This file lists every conditional rule. It is not a flat todo list.",
        "Do only the items whose conditions match the answers.",
        "Never turn off, unplug, or disable smoke alarms or carbon monoxide alarms.",
        "On the checklist page, follow only the Applicable items section",
        "(#applicable-checklist-text). Tasks that do not apply are omitted there.",
        "",
        "Questions:",
    ]
    for question in questions:
        default = "Yes" if question.get("default") is True else "No"
        lines.append(f"{question.get('id')}. {question.get('text', '')}")
        lines.append(f"   Default answer: {default}")
    lines.append("")
    lines.append("Tasks:")
    for index, task in enumerate(tasks, start=1):
        lines.append(f"{index}. {describe_condition(task, questions)}")
        lines.append(f"   Section: {task.get('type') or 'Tasks'}")
        lines.append(f"   Role: {task.get('role') or 'Unassigned'}")
        lines.append(f"   {task.get('task', '')}")
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def render_static(repo_root: Path, title: str, questions, tasks) -> dict:
    payload = json.dumps(
        {"title": title, "questions": questions, "tasks": tasks},
        ensure_ascii=False,
    )
    script = r"""
const app = require("./lib/js/checklist.js");
let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  raw += chunk;
});
process.stdin.on("end", () => {
  const input = JSON.parse(raw);
  const answers = app.defaultAnswers(input.questions);
  process.stdout.write(JSON.stringify({
    text: app.formatApplicableText(input.title, input.questions, input.tasks, answers),
    summary: app.summaryText(input.tasks, answers),
    questionsHtml: app.renderQuestions(input.questions, answers),
    tasksHtml: app.renderTasks(input.tasks, answers, {}),
    rolesHtml: app.renderRoles(input.tasks, answers)
  }));
});
"""
    try:
        proc = subprocess.run(
            ["node", "-e", script],
            input=payload,
            text=True,
            capture_output=True,
            cwd=repo_root,
            check=False,
        )
    except FileNotFoundError as err:
        raise RuntimeError(
            "Node.js is required to build checklists. Install Node.js 18 or newer."
        ) from err
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or "Node failed while rendering a checklist")
    return json.loads(proc.stdout)


def fill_template(template: str, replacements: dict[str, str]) -> str:
    page = template
    for token, value in replacements.items():
        if token in value:
            raise ValueError(f"Generated content contains the placeholder {token}")
        page = page.replace(token, value)
    missing = [token for token in TOKENS if token in page]
    if missing:
        raise ValueError("Template still has placeholders: " + ", ".join(missing))
    return page


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(text, encoding="utf-8")
    temporary.replace(path)


def example_dirs(examples_dir: Path) -> list[Path]:
    dirs = []
    for path in sorted(examples_dir.iterdir(), key=lambda item: item.name):
        if path.name.startswith(".") or not path.is_dir():
            continue
        dirs.append(path)
    return dirs


def build_all(examples_dir: Path, template_path: Path, repo_root: Path) -> list[str]:
    template = template_path.read_text(encoding="utf-8")
    loaded = []
    errors = []
    for directory in example_dirs(examples_dir):
        questions_path = directory / "questions.json"
        tasks_path = directory / "tasks.json"
        if not questions_path.is_file() or not tasks_path.is_file():
            errors.append(f"{directory.name}: needs questions.json and tasks.json")
            continue
        try:
            questions = read_json(questions_path)
            tasks = read_json(tasks_path)
        except ValueError as err:
            errors.append(str(err))
            continue
        errors.extend(validate(directory.name, questions, tasks))
        loaded.append((directory, questions, tasks))

    if errors:
        return errors

    for directory, questions, tasks in loaded:
        title = title_from_slug(directory.name)
        rendered = render_static(repo_root, title, questions, tasks)
        for key in ("questionsHtml", "tasksHtml", "rolesHtml", "text", "summary"):
            if "___" in rendered[key]:
                return [f"{directory.name}: rendered {key} contains a template placeholder"]
        data = script_json({"title": title, "questions": questions, "tasks": tasks})
        page = fill_template(
            template,
            {
                "___TITLE___": html.escape(title),
                "___SUMMARY___": html.escape(rendered["summary"]),
                "___APPLICABLE_TEXT___": html.escape(rendered["text"]),
                "___QUESTIONS_HTML___": rendered["questionsHtml"],
                "___TASKS_HTML___": rendered["tasksHtml"],
                "___ROLES_HTML___": rendered["rolesHtml"],
                "___DATA_JSON___": data,
            },
        )
        write_text(directory / "checklist.html", page)
        write_text(directory / "checklist.txt", rules_text(title, questions, tasks))
    return []


def main() -> int:
    errors = build_all(ROOT / "examples", ROOT / "template_checklist.html", ROOT)
    if errors:
        for error in errors:
            print(error, file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
