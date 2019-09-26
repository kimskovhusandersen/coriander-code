const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const basicAuth = require("basic-auth");

// MIDDLEWARE functions;
var auth = function(req, res, next) {
    var creds = basicAuth(req);
    if (!creds || creds.name != "hello" || creds.pass != "hi") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};

// app.use(auth);

// The json and urlencoded middleware are both part of bodyParser.
// to get form data
app.use(
    express.urlencoded({
        extended: false
    })
);

app.get("/spotify_search", auth);

app.use(cookieParser());

app.use((req, res, next) => {
    // console.log("middleware running: ");
    if (req.url != "/cookie") {
        if (path.extname(req.url) == ".html" || !path.extname(req.url)) {
            res.cookie("requrl", req.url, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            });
        }
        return req.cookies.cookiesAccepted != "accepted"
            ? res.redirect(`/cookie`)
            : next();
    }
    next();
});

// EXPRESS.STATIC...
app.use(express.static(`${__dirname}/public`));

// Cookie parser

app.get("/", (req, res) => {
    // console.log(`a GET request to "/" route happened!`);

    // this is how to read cookies
    // console.log("Cookies: ", req.cookies);

    // this is how to set cookies:
    res.cookie(`name`, `Kim`);

    // our old friends
    // console.log(req.url, req.method, req.headers);
    // Lets send a response....
    res.send(`
<h1>Hi there, Express</h1>
`);
});

app.get("/about", (req, res) => {
    // console.log(`a GET request to "/about" route happened`);

    // Send back html:
    // res.send()

    // Send back file:
    res.sendFile(`${__dirname}/index.html`);

    // Send back JSON:
    // res.json();
});

// making a route dynamically... we use ":variable"
app.get("/about/:name", (req, res) => {
    // console.log(`GET request to "/about/:name occured"`);
    // console.log(`req.params`, req.params);
    res.send(`
<h1>Hello there ${req.params.name}</h1>
`);
});

app.get("/add-cute-animal", (req, res) => {
    res.send(`
        <form method="POST">
            <input type="text" value="" name="animal">
            <input type="number" value="" name="cuteness-score">
            <button>Submit</button>
        </form>
        `);
});

app.post("/add-cute-animal", (req, res) => {
    // console.log(`POST request happened!`);
    // console.log(`req.body`, req.body.animal, req.body["cuteness-score"]);
});

app.get("/supersecret", (req, res) => {
    // console.log("cookies in the super secret route", req.cookies);
    if (req.cookies.name) {
        res.send(`
        <h1>Super secret service and stuff</h1>
        `);
    } else {
        res.redirect("/about");
    }
});

app.get("/cookie", (req, res) => {
    res.send(`
        <p>We respect your concerns about privacy and value the relationship that we have with you.

        Please take a moment to familiarise yourself with our cookie practices and let us know if you have any questions by sending us an <a href="javascript://">e-mail</a> or submitting a request
        through the 'Contact Us' for on our website.

        We have tried to keep this notice as simple as possible, but if you're not familiar with terms, such as cookies, then read about these <a href="javascript://">key terms</a> first.

        <form method="POST">
            <label>I Accept</label>
            <input type="checkbox" value="accepted" name="cookiesAccepted">
            <button>Continue to page</button>
        </form>
        `);
});

app.post("/cookie", (req, res) => {
    if (req.body.cookiesAccepted == "accepted") {
        res.cookie(`cookiesAccepted`, "accepted");
        res.redirect(req.cookies.requrl);
    } else {
        res.redirect("/cookie");
    }
});

app.listen(8080, console.log("I'm listening"));
