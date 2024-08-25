import sys
import os
import shutil
import json

file_path = os.path.realpath(__file__)

head, tail = os.path.split(file_path)

example_path = os.path.join(head, "examples")
checklist_html_path = os.path.join(head, "template_checklist.html")

checklists = os.listdir(example_path)

def readFile(path_):
    try:
        # Read the .json files (questions, tasks) and strip out comment lines
        datas = []
        with open(path_, "r") as f:
            datas = f.readlines()

        json_str_data = ""
        for data in datas:
            # Skip comments
            if data.strip().startswith("//"):
                continue
            json_str_data += data
        return json.loads(json_str_data)
    except Exception as err:
        raise ValueError(path_) from err

def getHtmlTemplate(path_):
    with open(path_, "r") as f:
        return f.read()

html_template = getHtmlTemplate(checklist_html_path)

for checklist in checklists:
    checklist_html_file = os.path.join(example_path, checklist, "checklist.html")

    try:
        os.remove(checklist_html_file)
    except Exception:
        pass

    questions_json = readFile(os.path.join(example_path, checklist, "questions.json"))
    tasks_json = readFile(os.path.join(example_path, checklist, "tasks.json"))

    html_split = html_template.split("<script>")

    if len(html_split) != 2 and len(html_split) != 1:
        sys.exit("Found not 1 or 2 <script> in index")

    html = html_split[0] + "<script>" + """
    """ + "const questions=" + json.dumps(questions_json) + """
    """ + "const tasks=" + json.dumps(tasks_json) + html_split[1]

    with open(checklist_html_file, "w") as f:
        f.write(html)

