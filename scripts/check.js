/*
 * One command for local use and CI: npm run check
 */
const { spawn, spawnSync } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ACTIONLINT_VERSION = "1.7.12";

function generatedPages() {
  const examples = path.join(ROOT, "examples");
  return fs
    .readdirSync(examples)
    .flatMap((name) => {
      const dir = path.join(examples, name);
      if (!fs.statSync(dir).isDirectory()) {
        return [];
      }
      return ["checklist.html", "checklist.txt"].map((file) => path.join(dir, file));
    })
    .filter((file) => fs.existsSync(file))
    .sort();
}

function digest(files) {
  const hash = crypto.createHash("sha256");
  files.forEach((file) => {
    hash.update(file);
    hash.update(fs.readFileSync(file));
  });
  return hash.digest("hex");
}

function run(title, command, args, options = {}) {
  console.log("\n# " + title);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: "inherit",
    ...options,
  });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function actionlintPath() {
  const names = { linux: "linux", darwin: "darwin" };
  const arches = { x64: "amd64", arm64: "arm64" };
  const osName = names[process.platform];
  const arch = arches[process.arch];
  if (!osName || !arch) {
    throw new Error("actionlint has no binary for " + process.platform + " " + process.arch);
  }
  const dir = path.join(ROOT, ".cache");
  const bin = path.join(dir, "actionlint");
  const stamp = path.join(dir, "actionlint.version");
  if (
    fs.existsSync(bin) &&
    fs.existsSync(stamp) &&
    fs.readFileSync(stamp, "utf8").trim() === ACTIONLINT_VERSION
  ) {
    return bin;
  }
  fs.mkdirSync(dir, { recursive: true });
  const asset = "actionlint_" + ACTIONLINT_VERSION + "_" + osName + "_" + arch + ".tar.gz";
  const archive = path.join(os.tmpdir(), asset);
  const url =
    "https://github.com/rhysd/actionlint/releases/download/v" + ACTIONLINT_VERSION + "/" + asset;
  console.log("\n# download actionlint " + ACTIONLINT_VERSION);
  const response = spawnSync("curl", ["-fsSL", "-o", archive, url], { stdio: "inherit" });
  if (response.status !== 0) {
    process.exit(response.status || 1);
  }
  const extracted = spawnSync("tar", ["-xzf", archive, "-C", dir, "actionlint"], {
    stdio: "inherit",
  });
  if (extracted.status !== 0) {
    process.exit(extracted.status || 1);
  }
  fs.chmodSync(bin, 0o755);
  fs.writeFileSync(stamp, ACTIONLINT_VERSION + "\n");
  return bin;
}

run("python tools", "python3", [
  "-m",
  "pip",
  "install",
  "--user",
  "--disable-pip-version-check",
  "--requirement",
  "requirements.txt",
]);

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
run("format", npx, ["prettier", "--check", "."]);
run("eslint", npx, ["eslint", "."]);
run("types", npx, ["tsc", "--noEmit"]);
run("stylelint", npx, ["stylelint", "lib/css/checklist.css"]);
run("html", npx, [
  "html-validate",
  "index.html",
  "src/checklist.template.html",
  "examples/cleaning-checklist/checklist.html",
  "examples/hotel-checkout-checklist/checklist.html",
  "examples/jira-release-checklist/checklist.html",
  "examples/moving-checklist/checklist.html",
  "examples/stretch-checklist/checklist.html",
  "examples/travel-checklist/checklist.html",
]);
process.env.PATH =
  path.join(os.homedir(), ".local", "bin") + path.delimiter + (process.env.PATH || "");
run("codespell", "codespell", []);
run("actionlint", actionlintPath(), ["-color"]);
run("tests", process.execPath, [
  "--test",
  "--experimental-test-coverage",
  "--test-coverage-lines=98",
  "--test-coverage-branches=92",
  "--test-coverage-functions=98",
  "tests/checklist.test.js",
  "tests/build.test.js",
  "tests/page.test.js",
  "tests/serve.test.js",
  "tests/size.test.js",
]);
const generated = generatedPages();
const beforeBuild = digest(generated);
run("build", process.execPath, ["scripts/build.js"]);
if (digest(generatedPages()) !== beforeBuild) {
  console.error(
    "node scripts/build.js changed checklist.html or checklist.txt. Commit the result.",
  );
  spawnSync("git", ["diff", "--", "examples"], { cwd: ROOT, stdio: "inherit" });
  process.exit(1);
}
run("size budget", process.execPath, ["scripts/size-budget.js"]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFor(url) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // The server is still starting.
    }
    await sleep(100);
  }
  throw new Error("Timed out waiting for " + url);
}

async function linksAndBrowser() {
  const port = 18000 + Math.floor(Math.random() * 20000);
  const server = spawn(process.execPath, ["scripts/serve.js", String(port)], {
    cwd: ROOT,
    stdio: "ignore",
  });
  try {
    await waitFor("http://127.0.0.1:" + port + "/");
    console.log("\n# links");
    const linked = spawnSync(
      npx,
      [
        "linkinator",
        "http://127.0.0.1:" + port + "/",
        "--recurse",
        "--silent",
        "--timeout",
        "10000",
        "--skip",
        "127\\.0\\.0\\.1:8000",
      ],
      { cwd: ROOT, stdio: "inherit" },
    );
    if (linked.status !== 0) {
      process.exit(linked.status || 1);
    }
  } finally {
    server.kill("SIGKILL");
  }
  run("browser", process.execPath, ["tests/browser_smoke.mjs"]);
}

linksAndBrowser().catch((error) => {
  console.error(error);
  process.exit(1);
});
