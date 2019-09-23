const chalk = require("chalk");
const ca = require("chalk-animation");

// STEP 1: IMPORT BUILD-IN MODULE: HTTP
const http = require("http");
const querystring = require("querystring");

const html = `
<!doctype html>
<html>
<title>Colors</title>
<form method="POST">
<input type="text" name="first" placeholder="first" autocomplete="off">
<select name="color">
<option value="red">red</option>
<option value="blue">blue</option>
<option value="green">green</option>
<option value="yellow">yellow</option>
<option value="gray">gray</option>
<option value="magenta">magenta</option>
<option value="cyan">cyan</option>
</select>
<button type="submit">Go</button>
</form>
</html>`;

// STEP 2: CREATE THE SERVER
const server = http.createServer((req, res) => {
    req.on("error", err => console.log("reqest error: ", err));
    res.on("error", err => console.log("response error: ", err));

    if (req.method === "GET") {
        // res.write(``)
        res.end(html);
    } else if (req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });

        // response.write();
        req.on("end", () => {
            let parsed = querystring.parse(body);
            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            res.write(`
<!doctype html>
</html>
<title>${parsed.first}</title>
<a href="/" style="color:${parsed.color}">${parsed.first}</a>
</html>
`);
            res.end();
        });
    }
});

// STEP 3: LISTEN TO THE SERVER
server.listen(8080, () => ca.radar("I'm listening to you!"));

console.log(chalk.blue("This text is blue"));
console.log(chalk.green("This text is green"));
