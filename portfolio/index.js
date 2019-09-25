const fs = require("fs");
const pathModule = require("path");
const http = require("http");
const legalPaths = require("./legalPath.js").legalPaths;

const exts = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml"
};

http.createServer((req, res) => {
    if (req.method !== "GET") {
        // 405 - method not allowed
        res.statusCode = 405;
        return res.end();
    }
    const path = `${__dirname}/public`;
    const allowedUrls = legalPaths(path);

    let reqUrl;
    if (req.url === "/") {
        let html = "<ul>";
        for (const key of Object.keys(allowedUrls)) {
            if (key.endsWith(".html")) {
                let keyArr = key.split("/");
                html += `<li><a href="${key}">${keyArr[1]}</a></li>`;
            }
        }
        html += "</ul>";
        res.setHeader("content-type", "text/html");
        res.statusCode = 200;
        return res.end(html);
    }
    if (pathModule.extname(req.url)) {
        reqUrl = allowedUrls[req.url];
    } else if (!req.url.endsWith("/")) {
        res.setHeader("Location", `${req.url}/`);
        res.statusCode = 301;
        return res.end();
    } else {
        reqUrl = allowedUrls[req.url];
    }
    if (!reqUrl) {
        res.statusCode = 404;
        return res.end();
    }

    const contentType = exts[pathModule.extname(reqUrl)];
    res.setHeader("Content-Type", contentType);
    const readStream = fs.createReadStream(reqUrl);
    readStream.pipe(res); // this is all. No need to res.end();
    // Error handling:
    readStream.on("error", err => {
        console.log(err);
        res.statusCode = 404;
        res.end();
    });
}).listen(8080, () => console.log(`'I'm listening`));
