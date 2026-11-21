const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { createServer, listen } = require("../scripts/serve.js");

/**
 * @param {import("http").Server} server
 * @returns {Promise<number>}
 */
function listenOn(server) {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve(typeof address === "object" && address ? address.port : 0);
    });
  });
}

test("serves the site root and rejects missing or escaped paths", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "checklist-serve-"));
  const outside = path.join(path.dirname(root), "checklist-secret.txt");
  fs.writeFileSync(path.join(root, "index.html"), "<p>home</p>");
  fs.writeFileSync(path.join(root, "note.txt"), "hello");
  fs.writeFileSync(path.join(root, "readme.md"), "# Hi");
  fs.writeFileSync(path.join(root, "data.json"), "{}");
  fs.writeFileSync(path.join(root, "blob.bin"), "bin");
  fs.mkdirSync(path.join(root, "lib", "css"), { recursive: true });
  fs.writeFileSync(path.join(root, "lib", "app.js"), "console.log(1)\n");
  fs.writeFileSync(path.join(root, "lib", "css", "site.css"), "body{}\n");
  fs.writeFileSync(outside, "secret-token");
  const server = createServer(root);
  const port = await listenOn(server);
  try {
    const home = await fetch("http://127.0.0.1:" + port + "/");
    assert.equal(home.status, 200);
    assert.match(home.headers.get("content-type") || "", /text\/html/);
    assert.match(await home.text(), /home/);

    const note = await fetch("http://127.0.0.1:" + port + "/note.txt");
    assert.match(note.headers.get("content-type") || "", /text\/plain/);
    assert.equal(await note.text(), "hello");

    const markdown = await fetch("http://127.0.0.1:" + port + "/readme.md");
    assert.match(markdown.headers.get("content-type") || "", /text\/plain/);

    const json = await fetch("http://127.0.0.1:" + port + "/data.json");
    assert.match(json.headers.get("content-type") || "", /application\/json/);

    const script = await fetch("http://127.0.0.1:" + port + "/lib/app.js");
    assert.match(script.headers.get("content-type") || "", /javascript/);

    const css = await fetch("http://127.0.0.1:" + port + "/lib/css/site.css");
    assert.match(css.headers.get("content-type") || "", /text\/css/);

    const blob = await fetch("http://127.0.0.1:" + port + "/blob.bin");
    assert.match(blob.headers.get("content-type") || "", /octet-stream/);

    const missing = await fetch("http://127.0.0.1:" + port + "/missing");
    assert.equal(missing.status, 404);

    const folder = await fetch("http://127.0.0.1:" + port + "/lib/");
    assert.equal(folder.status, 404);

    const escaped = await fetch("http://127.0.0.1:" + port + "/..%2f..%2fchecklist-secret.txt");
    assert.equal(escaped.status, 403);
    assert.equal(await escaped.text(), "Forbidden");
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(root, { recursive: true, force: true });
    fs.rmSync(outside, { force: true });
  }
});

test("listen prints the local url", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "checklist-listen-"));
  fs.writeFileSync(path.join(root, "index.html"), "ok");
  const server = listen(root, 0);
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  try {
    const response = await fetch("http://127.0.0.1:" + port + "/");
    assert.equal(response.status, 200);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(root, { recursive: true, force: true });
  }
});
