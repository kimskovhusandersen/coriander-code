// Solition I: You could use fs.readFile, but the function will have to read the entire file and therefore it will take a while
// Solition II: You could open the file and get enough chunk of it to be able to view the first part, a stream (just like streaming a video),
// and by the time you come to the end of the first part, the next chunks have been parsed.
// The request object used for this is called readStream.

// What we want to do today is to create a readStream out of a file and pipe the data to the response object.

// Error handling: Errors can occur due to bad path or things beyond your control. Nevertheless, we have to handle it.
// When a GET request is made to our server, there are two final outcomes: 1) we send content (or a 301 redirect) or we send a 404.

const fs = require("fs");
const http = require("http");

http.createServer((req, res) => {
    if (req.method !== "GET") {
        res.statusCode = 405;
        return res.end();
    }
    res.setHeader("Content-Type", "image/jpg");
    const readStream = fs.createReadStream(
        `${__dirname}/projects/panes/Parthenon.jpg`
    );
    readStream.pipe(res); // this is all. No need to res.end();
    // Error handling:
    readStream.on("error", err => {
        console.log(err);
        res.statusCode = 404;
        res.end();
    });
}).listen(8080, () => console.log(`'I'm listening`));

// When we send a response, we want to check the content-type.
// To do that, get the filename extension:
// Use the build-in module "path".
// path.parse(`${_dirname}`)
// path.extname(`${_dirname}/filename.extname`) // returns the extension type
// create a function that takes req.url as argument and returns the content-type.
// There is one exception: a url that does not have an extension type, which is "localhost/panes/".
// The files servered should be index.html, so content type should be "text/html".

// Approach 1: build an object of valid urls (similar to the Filesystem project)
// obj = {
// '/panes/' : '/users/Kim/desktop/portfolio/project/index.html',
// '/panes/index.html' : '/users/Kim/desktop/portfolio/project/index.html',
// }

if (validUrls[req.url]) {
    //create stream and pipe
} else {
    res.statusCode = 404;
    res.end();
}

// advantage: you know when you have a file
// disadvantage you have to use asynchrounous code.
// if you write the code synchrounously, you have to put this code up front. If you add files to your project folder,
// you will have to restart the server to get the updated list (obj).
// if url === obj[lkajsdf] + /

// Approach 2:
// When a request comes in, you check if the path exist (exists (depricated) or stat).
//

http.createServer((req, res) => {
    if (req.method !== "GET") {
        res.statusCode = 405;
        return res.end();
    }
    const filePath = `${__dirname}/projects/${req.url}`;
    if (!path.normalize(filePath).startsWith(`${__dirname}/projects`)) {
        console.log("intruder alert");
        res.statusCode = 403;
        return res.end();
    }
    // do synchrounous methods with stat here. Because asynchrounous methods will cause a bottleneck.
    fs.stat(`${__dirname}/projects/${req.url}`, (err, stats) => {
        if (err) {
            res.statusCode = 404;
            res.end();
        } else {
            // is it a file?
            // send a file
            // if it's not a file, then it's a directory?
            // does the url end with a slash or not? ( a filder named "api".
            // The url is referring to a folder, so it's serving the index.html file in that folder)
            // nodejs.org/api -> 301 setHeader('Location', 'nodejs.org/api/')
            // the browser would think about a url that ends without a slash, nodejs.org/api, as a file named api.
            // This will lead to errors on the page, because urls and image are referenced relatively to the path.
            // then we want to show the index.html that is in that folder
        }
    });
}).listen(8080, () => console.log(`I'm listening`));

// Advantage: you can add files and folders live
// Disadvantage: the code isn't separated very much.

// SECURITY RISK:
// /panes../../../../secret/diary.txt
// we need to make sure that we only server things that are in the "projects" folder (or name it "public", so
// that it's clear!).
// path.normalize(`${path/../../diary.txt}`) // tells you the "true" path
// path.normalize().startsWith(`${dirname}/projects`)

// PART II:
// localhost:8080
// list links to all projects index.html files
let html = "<ul>";
for (let i = 0; i < files.length; i++) {
    html += `<li><a href="${files[i]}/">${files[i]}</a>`;
}
html += "</ul>";

// make a module named directoryListing.js, use fs.readDir/fs.readDirSync (if sync, only call this once when the server start).
// export function readDir, build the string in the callback.
exports.getHtml = function(callback)
