const fs = require("fs");
const http = require("http");
const getFileSize = require("./fileSize").getFileSize;
const html = `
<!doctype html>
<html>
<title>Hello World!</title>
<p>Hello World!
</html>
`;

const server = http.createServer(function(request, response) {
    request.on("error", err => console.log("request error: ", err));
    response.on("error", err => console.log("response error: ", err));
    console.log(request.url, request.headers, request.method);
    let reqArr = [];
    reqArr.push(
        new Date(),
        request.method,
        request.url,
        request.headers["user-agent"],
        "\n"
    );
    let reqStr = reqArr.join("\t");
    fs.appendFile("request.txt", reqStr, err => {
        if (err) throw err;
    });

    if (request.method === "GET") {
        if (request.url.indexOf("/requests.txt") >= 0) {
            const promise = getFileSize();
            promise.then(function(size) {
                const readableStream = fs.createReadStream("request.txt", {
                    start: 0,
                    end: size
                });

                var data = "";
                var chunk;

                readableStream.on("readable", function() {
                    while ((chunk = readableStream.read()) != null) {
                        data += chunk;
                    }
                });

                readableStream.on("end", () => {
                    response.setHeader("content-type", "text/htmls");
                    response.statusCode = 200;
                    response.end(data);
                });
            });
        } else {
            response.setHeader("content-type", "text/html");
            response.statusCode = 200;
            response.end(html);
        }
    } else if (request.method === "HEAD") {
        response.setHeader("content-type", "text/html");
        response.statusCode = 200;
        response.end();
    } else if (request.method === "POST") {
        let data = "";
        request.on("data", chunk => {
            data += chunk;
        });
        // response.write();
        request.on("end", () => {
            console.log(data);
            response.setHeader("Location", "/");
            response.statusCode = 302;
            response.end();
        });
    } else {
        response.statusCode = 405;
        response.end();
    }
});

server.listen(8080, () => {});
