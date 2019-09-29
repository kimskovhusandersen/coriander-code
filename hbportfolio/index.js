const express = require("express");
const getProjects = require(`${__dirname}/projects.js`).getProjects;
const app = express();
const baseUrl = `${__dirname}/projects`;
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

app.use(express.static(`${__dirname}/projects`));
app.use(express.static(`${__dirname}/assets`));

app.get("/", (req, res) => {
    res.render("welcome", {
        projects
    });
});

app.get("/projects/:projUrl", (req, res) => {
    const {
        projUrl
    } = req.params;
    const project = projects[projUrl];
    if (!project) {
        return res.sendStatus(404);
    }
    res.render("project", {
        projects,
        project
    });
});

app.listen(8080, console.log("I'm listening"));