/*
 * Serve the repository root so the static checklist pages can be opened locally.
 */
const fs = require("fs");
const http = require("http");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

/**
 * @param {string} root
 * @returns {import("http").Server}
 */
function createServer(root) {
  const siteRoot = path.resolve(root);
  return http.createServer(function (request, response) {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) {
      pathname += "index.html";
    }
    const file = path.resolve(siteRoot, "." + pathname);
    if (file !== siteRoot && !file.startsWith(siteRoot + path.sep)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    fs.readFile(file, function (err, data) {
      if (err) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
      response.writeHead(200, {
        "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
      });
      response.end(data);
    });
  });
}

/**
 * @param {string} root
 * @param {number} port
 * @returns {import("http").Server}
 */
function listen(root, port) {
  const server = createServer(root);
  server.listen(port, "127.0.0.1", function () {
    const assigned = server.address();
    const actual = assigned && typeof assigned === "object" ? assigned.port : port;
    console.log("Serving " + path.resolve(root) + " at http://127.0.0.1:" + actual + "/");
  });
  return server;
}

module.exports = {
  createServer: createServer,
  listen: listen,
};

if (require.main === module) {
  listen(ROOT, Number(process.argv[2] || 8000));
}
