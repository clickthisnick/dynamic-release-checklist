import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const port = 20000 + Math.floor(Math.random() * 10000);
const debugPort = port + 1;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFor(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is still starting.
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function start(command, args, extra = {}) {
  const child = spawn(command, args, { stdio: "ignore", ...extra });
  return child;
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.next = 1;
    this.pending = new Map();
    this.waiters = [];
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) {
          reject(new Error(JSON.stringify(message.error)));
        } else {
          resolve(message.result);
        }
        return;
      }
      this.waiters = this.waiters.filter((waiter) => {
        if (waiter.method === message.method) {
          waiter.resolve(message.params || {});
          return false;
        }
        return true;
      });
    });
  }

  send(method, params = {}) {
    const id = this.next;
    this.next += 1;
    const promise = new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
    this.ws.send(JSON.stringify({ id, method, params }));
    return promise;
  }

  wait(method) {
    return new Promise((resolve) => {
      this.waiters.push({ method, resolve });
    });
  }
}

async function saveShot(cdp, file) {
  const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
  const fs = await import("node:fs");
  fs.writeFileSync(file, Buffer.from(shot.data, "base64"));
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(JSON.stringify(result.exceptionDetails));
  }
  return result.result.value;
}

function assertCheck(name, value, details) {
  if (!value) {
    throw new Error(`${name} failed: ${details}`);
  }
}

async function main() {
  const profile = mkdtempSync(path.join(tmpdir(), "checklist-chrome-"));
  const server = start("node", ["scripts/serve.js", String(port)], { cwd: root });
  const chrome = start("google-chrome", [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1280,900",
    "--remote-debugging-port=" + debugPort,
    "--user-data-dir=" + profile,
    "about:blank",
  ]);

  try {
    await waitFor(`http://127.0.0.1:${port}/examples/travel-checklist/checklist.html`);
    await waitFor(`http://127.0.0.1:${debugPort}/json/version`);
    const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((response) =>
      response.json()
    );
    const page = targets.find((target) => target.type === "page");
    const cdp = new Cdp(new WebSocket(page.webSocketDebuggerUrl));
    await new Promise((resolve) => {
      cdp.ws.addEventListener("open", resolve, { once: true });
    });
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    const loaded = cdp.wait("Page.loadEventFired");
    await cdp.send("Page.navigate", {
      url: `http://127.0.0.1:${port}/examples/travel-checklist/checklist.html`,
    });
    await loaded;

    const initial = await evaluate(cdp, `(() => {
      const pre = document.getElementById("applicable-checklist-text").textContent;
      const task = document.getElementById("task-0");
      const label = document.querySelector("label[for='task-0']");
      return {
        title: document.title,
        h1: document.querySelector("h1").textContent,
        safety: document.getElementById("safety-notice").textContent,
        pre,
        oldAlarm: document.body.innerText.includes("Set Alarm To Wake Up"),
        oldTurnOff: document.body.innerText.includes("Turn Off Air Conditioners"),
        heaterInPre: pre.includes("Turn off air conditioners"),
        safetyInPre: pre.includes("Leave smoke and CO alarms on and plugged in."),
        detailsOpen: document.getElementById("applicable").open,
        phoneAlarm: pre.includes("Set a phone alarm to wake up"),
        labelFor: label ? label.getAttribute("for") : "",
        taskType: task ? task.type : "",
        yesLabel: document.querySelector("label[for='question-8-yes']")?.textContent || "",
        noChecked: document.getElementById("question-8-no")?.checked || false,
        checklistHidden: document.getElementById("panel-checklist").hidden,
        rolesHidden: document.getElementById("panel-roles").hidden,
        status: document.getElementById("status").textContent,
        corporate: pre.includes("Obtain Corporate Card")
      };
    })()`);
    assertCheck("title", initial.title === "Travel checklist", initial.title);
    assertCheck("heading", initial.h1 === "Travel checklist", initial.h1);
    assertCheck("safety banner", initial.safety.includes("Leave smoke and CO alarms"), initial.safety);
    assertCheck("phone alarm in applicable list", initial.phoneAlarm, initial.pre);
    assertCheck("safety item in applicable list", initial.safetyInPre, initial.pre);
    assertCheck("agent list collapsed", initial.detailsOpen === false, String(initial.detailsOpen));
    assertCheck("heater hidden by default", !initial.heaterInPre, initial.pre);
    assertCheck("old alarm wording gone", !initial.oldAlarm, "old text still visible");
    assertCheck("old turn-off wording gone", !initial.oldTurnOff, "old text still visible");
    assertCheck("checkbox label", initial.labelFor === "task-0" && initial.taskType === "checkbox", JSON.stringify(initial));
    assertCheck("question labels", initial.yesLabel === "Yes" && initial.noChecked, JSON.stringify(initial));
    assertCheck("checklist panel hidden", initial.checklistHidden && initial.rolesHidden, JSON.stringify(initial));
    assertCheck("summary loaded", initial.pre.includes("Applicable items ("), initial.pre.slice(0, 180));
    assertCheck("corporate card hidden", !initial.corporate, initial.pre);
    await saveShot(cdp, "/tmp/travel-default.png");

    await evaluate(cdp, `document.querySelector("[data-testid='answer-8-yes']").click()`);
    await sleep(100);
    const afterYes = await evaluate(cdp, `(() => {
      const pre = document.getElementById("applicable-checklist-text").textContent;
      return {
        pre,
        status: document.getElementById("status").textContent,
        heater: pre.includes("Turn off air conditioners and heaters. Leave smoke alarms and carbon monoxide alarms on and plugged in."),
        unplug: pre.includes("Unplug nonessential electronics. Do not unplug smoke alarms, carbon monoxide alarms, or the refrigerator.")
      };
    })()`);
    assertCheck("heater shown with warning", afterYes.heater, afterYes.pre);
    assertCheck("unplug warning", afterYes.unplug, afterYes.pre);
    assertCheck("answer status", afterYes.status.includes("Saved answer. Yes."), afterYes.status);

    await evaluate(cdp, `document.getElementById("tab-checklist").click()`);
    await sleep(50);
    const checked = await evaluate(cdp, `(() => {
      const boxes = [...document.querySelectorAll("#tasks-root input[type=checkbox]")];
      const heater = boxes.find((box) => (box.getAttribute("data-task-text") || "").includes("Turn off air conditioners"));
      const label = heater ? document.querySelector("label[for='" + heater.id + "']") : null;
      heater.click();
      const visible = label ? label.querySelector(".task-text").innerText : "";
      const stateEl = label ? label.querySelector(".task-state") : null;
      const noteEl = label ? label.querySelector(".visually-hidden:not(.task-state)") : null;
      const hiddenBox = (el) => {
        if (!el) return false;
        const box = el.getBoundingClientRect();
        return getComputedStyle(el).position === "absolute" && box.width <= 2 && box.height <= 2;
      };
      return {
        panelHidden: document.getElementById("panel-checklist").hidden,
        visible,
        state: stateEl ? stateEl.textContent : "",
        noteHidden: hiddenBox(noteEl),
        stateHidden: hiddenBox(stateEl),
        status: document.getElementById("status").textContent,
        url: location.search
      };
    })()`);
    assertCheck("checklist visible", !checked.panelHidden, "panel stayed hidden");
    assertCheck("heater label stays short", checked.visible === "Turn off air conditioners and heaters", checked.visible);
    assertCheck(
      "completed text is hidden",
      checked.state === "Completed." && checked.noteHidden && checked.stateHidden,
      JSON.stringify(checked)
    );
    assertCheck("complete status", checked.status.startsWith("Marked complete:"), checked.status);
    assertCheck("url saved", checked.url.includes("redirectToTasks=true") && checked.url.includes("answers="), checked.url);
    await evaluate(
      cdp,
      `document.querySelector("#tasks-root input[data-task-text*='Turn off air conditioners']")?.scrollIntoView({block:"center"})`
    );
    await saveShot(cdp, "/tmp/travel-heater-checked.png");

    const deepLink = cdp.wait("Page.loadEventFired");
    const answers = encodeURIComponent(JSON.stringify({ 8: true, 11: true }));
    await cdp.send("Page.navigate", {
      url: `http://127.0.0.1:${port}/examples/travel-checklist/checklist.html?answers=${answers}&redirectToTasks=true&done=[0]`,
    });
    await deepLink;
    await sleep(100);
    const deep = await evaluate(cdp, `(() => {
      const pre = document.getElementById("applicable-checklist-text").textContent;
      return {
        checklistHidden: document.getElementById("panel-checklist").hidden,
        corporate: pre.includes("Obtain Corporate Card"),
        heater: pre.includes("Turn off air conditioners and heaters. Leave smoke alarms and carbon monoxide alarms on and plugged in."),
        firstChecked: document.getElementById("task-0")?.checked || false,
        houseYes: document.getElementById("question-8-yes")?.checked || false
      };
    })()`);
    assertCheck("deep link opens checklist", !deep.checklistHidden, JSON.stringify(deep));
    assertCheck("deep link corporate card", deep.corporate, "missing corporate card");
    assertCheck("deep link heater warning", deep.heater, "missing heater warning");
    assertCheck("deep link done state", deep.firstChecked, "task 0 was not checked");
    assertCheck("deep link answer", deep.houseYes, "question 8 was not yes");

    await saveShot(cdp, "/tmp/travel-checklist-deeplink.png");
    console.log("browser smoke passed");
  } finally {
    chrome.kill("SIGKILL");
    server.kill("SIGKILL");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
