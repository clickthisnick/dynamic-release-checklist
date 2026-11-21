/*
 * Fail when the published pages and assets grow past the checked-in budget.
 * The budget is the current shipped size plus a small margin.
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.resolve(__dirname, "..");
const SHIPPED = ["index.html", "llms.txt", "README.md", "lib", "examples"];

/**
 * @param {string} relative
 * @returns {string[]}
 */
function filesIn(relative) {
  const full = path.join(ROOT, relative);
  const stat = fs.statSync(full);
  if (stat.isFile()) {
    return [full];
  }
  return fs.readdirSync(full).flatMap((name) => filesIn(path.join(relative, name)));
}

function measure() {
  const files = SHIPPED.flatMap((entry) => filesIn(entry));
  let bytes = 0;
  let gzipBytes = 0;
  files.forEach((file) => {
    const data = fs.readFileSync(file);
    bytes += data.length;
    gzipBytes += zlib.gzipSync(data).length;
  });
  return { bytes: bytes, gzipBytes: gzipBytes, files: files.length };
}

function main() {
  const budget = Number(fs.readFileSync(path.join(ROOT, "size-budget.txt"), "utf8").trim());
  const measured = measure();
  console.log(
    "Shipped " +
      measured.bytes +
      " bytes (" +
      measured.gzipBytes +
      " gzip) across " +
      measured.files +
      " files. Budget " +
      budget +
      ".",
  );
  if (!Number.isFinite(budget) || measured.bytes > budget) {
    console.error("Shipped bytes exceed size-budget.txt");
    process.exitCode = 1;
  }
  return measured;
}

module.exports = { measure: measure, main: main };

if (require.main === module) {
  main();
}
