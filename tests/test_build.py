import json
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import build


class BuildTests(unittest.TestCase):
    def test_relaxed_json_accepts_comments_and_trailing_commas(self):
        text = """
        [
          // note
          {"id": 1, "text": "Hello",},
        ]
        """
        self.assertEqual(
            json.loads(build.strip_relaxed_json(text)),
            [{"id": 1, "text": "Hello"}],
        )

    def test_script_json_cannot_break_out_of_a_script_tag(self):
        payload = build.script_json(
            {"task": '</script><script>alert(1)</script>', "and": "a & b"}
        )
        self.assertNotIn("<", payload)
        self.assertNotIn(">", payload)
        self.assertIn(r"\u003c/script\u003e", payload)

    def test_duplicate_question_ids_fail_validation(self):
        errors = build.validate(
            "cleaning",
            [
                {"id": 10, "text": "Is the litterbox clean?"},
                {"id": 10, "text": "Does the sofa need vacuuming?"},
            ],
            [{"task": "Clean litterbox", "questionsRequiredYes": [10]}],
        )
        self.assertTrue(any("duplicate question id 10" in error for error in errors))

    def test_unknown_question_id_fails_validation(self):
        errors = build.validate(
            "sample",
            [{"id": 1, "text": "Yes?"}],
            [{"task": "Do it", "questionsRequiredYes": [9]}],
        )
        self.assertTrue(any("unknown question id 9" in error for error in errors))

    def test_invalid_example_does_not_replace_an_existing_page(self):
        with tempfile.TemporaryDirectory() as tmp:
            example = Path(tmp) / "examples" / "broken"
            example.mkdir(parents=True)
            (example / "questions.json").write_text(
                '[{"id": 1, "text": "A"}, {"id": 1, "text": "B"}]',
                encoding="utf-8",
            )
            (example / "tasks.json").write_text(
                '[{"task": "Always", "questionsRequiredYes": [], "questionsAnyYes": []}]',
                encoding="utf-8",
            )
            page = example / "checklist.html"
            page.write_text("keep", encoding="utf-8")
            errors = build.build_all(
                Path(tmp) / "examples", ROOT / "template_checklist.html", ROOT
            )
            self.assertTrue(errors)
            self.assertEqual(page.read_text(encoding="utf-8"), "keep")

    def test_rules_text_spells_out_conditions(self):
        text = build.rules_text(
            "Sample checklist",
            [{"id": 8, "text": "Is the house going to be empty?"}],
            [
                {
                    "questionsRequiredYes": [8],
                    "questionsAnyYes": [],
                    "role": "Me",
                    "type": "Day Of",
                    "task": "Turn off air conditioners and heaters. Leave smoke alarms and carbon monoxide alarms on and plugged in.",
                }
            ],
        )
        self.assertIn("not a flat todo list", text)
        self.assertIn("Is the house going to be empty?", text)
        self.assertIn(
            "Show if all of these answers are Yes: 8. Is the house going to be empty?",
            text,
        )
        self.assertNotIn("empty?.", text)
        self.assertIn("Leave smoke alarms and carbon monoxide alarms on and plugged in.", text)

    def test_real_examples_build_a_safe_travel_page(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest = Path(tmp) / "examples"
            shutil.copytree(ROOT / "examples", dest)
            errors = build.build_all(dest, ROOT / "template_checklist.html", ROOT)
            self.assertEqual(errors, [])
            page = (dest / "travel-checklist" / "checklist.html").read_text(encoding="utf-8")
            rules = (dest / "travel-checklist" / "checklist.txt").read_text(encoding="utf-8")
            pre_start = page.index('id="applicable-checklist-text"')
            pre = page[pre_start : page.index("</pre>", pre_start)]
            self.assertIn("<title>Travel checklist</title>", page)
            self.assertIn("Is this a business trip?", page)
            self.assertIn("Leave every smoke alarm", pre)
            self.assertIn("Set a phone alarm to wake up", pre)
            self.assertNotIn("Turn off air conditioners", pre)
            self.assertNotIn("Set Alarm To Wake Up", page)
            self.assertNotIn("Turn Off Air Conditioners / Heaters", page)
            self.assertNotIn("Unplug Electronics", page)
            self.assertIn('type="application/json"', page)
            self.assertIn("Machine-readable rules", page)
            self.assertIn("Obtain Corporate Card", rules)
            self.assertIn("Leave smoke alarms and carbon monoxide alarms on and plugged in.", rules)
            self.assertNotIn("<script>", (dest / "travel-checklist" / "checklist.txt").read_text())
            cleaning = json.loads(
                build.strip_relaxed_json(
                    (dest / "cleaning-checklist" / "questions.json").read_text(encoding="utf-8")
                )
            )
            ids = [question["id"] for question in cleaning]
            self.assertEqual(len(ids), len(set(ids)))
            self.assertIn(14, ids)


if __name__ == "__main__":
    unittest.main()
