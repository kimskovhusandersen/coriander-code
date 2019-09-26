const express = require("express");
// const path = require("path");
const getProjects = require(`${__dirname}/projects.js`).getProjects;
const app = express();
const baseUrl = `${__dirname}/public`;
const projects = getProjects(baseUrl);
// ----------------------------------------------
// Use express' build-in support of handlebars
const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");
// ----------------------------------------------

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
    res.render("welcome", {
        projects
    });
});

app.listen(8080, console.log("I'm listening"));
