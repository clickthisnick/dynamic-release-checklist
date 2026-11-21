const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { main } = require("../scripts/size-budget.js");

test("shipped pages stay within the size budget", () => {
  const budget = Number(
    fs.readFileSync(path.join(__dirname, "..", "size-budget.txt"), "utf8").trim(),
  );
  const previous = process.exitCode;
  const measured = main();
  assert.notEqual(process.exitCode, 1);
  process.exitCode = previous;
  assert.ok(measured.bytes > 0);
  assert.ok(measured.bytes <= budget);
  assert.ok(measured.gzipBytes < measured.bytes);
});
