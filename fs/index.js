// ----------------------------------------------------------------
// FILE SYSTEM
// reference: http://nodejs.org/dist/latest-v10.x/docs/api/fs.html
// ----------------------------------------------------------------

// "A file system is like a tree - files are leaves and folders are branches" - David

// In node there are two versions of almost every method:
// method (asynchronously) and methodSync (synchronously)

// Example 1:
// Every time a user is making a request, we want to add a line to a file.
// Synchronously:
// Nothing else can happen, while we are adding a line to that file.
// With hundreds of users, each request will pile up and create a huge delay.
// Asynchronously:
// It might be harder to code

// Example 2:
// You want to compile every js file into a single file before executing it.
// Synchronously:
// This makes sense to do synchronously

// For todays exercise, we are going to need two methods of the FS module:
// readdir for getting the content of a folder
// stat for getting information about a file

(function() {
    const fs = require("fs");
    const path = `${__dirname}/files`;

    // Part 1
    function logSizes(path) {
        fs.readdir(path, { withFileTypes: true }, function(err, files) {
            if (err) {
                console.log(err);
            } else {
                for (let i = 0; i < files.length; i++) {
                    if (files[i].isFile()) {
                        let name = files[i].name;
                        let stats = fs.statSync(`${path}/${files[i].name}`);
                        let size = `${stats.size}`;
                        console.log(`${path}/${name}: ${size}`); // this works!
                    } else if (files[i].isDirectory()) {
                        let newPath = `${path}/${files[i].name}`;
                        logSizes(newPath);
                    }
                }
            }
        });
    }
    logSizes(path);

    // Part 2
    const obj = {};
    function mapSizes(path, obj) {
        try {
            const files = fs.readdirSync(
                path,
                { withFileTypes: true },
                function(err, files) {
                    return err || files;
                }
            );
            for (let i = 0; i < files.length; i++) {
                // if file: add property (key: filename, value: filesize)(use the statSync method)
                // if folder. add property (object)
                if (files[i].isFile()) {
                    let name = files[i].name;
                    let stats = fs.statSync(`${path}/${files[i].name}`);
                    let size = `${stats.size}`;
                    obj[`${name}`] = size;
                    // output += `${path}/${name}: ${size}`; // this works!
                } else if (files[i].isDirectory()) {
                    let name = files[i].name;
                    obj[`${name}`] = {};
                    let newPath = `${path}/${files[i].name}`;
                    mapSizes(newPath, obj[`${name}`]);
                }
            }
        } catch (err) {
            console.log(err);
        }
        return obj;
    }
    const data = mapSizes(path, obj);
    fs.writeFileSync(`${__dirname}/files.json`, JSON.stringify(data, null, 4));
})();

// const leo = {
//     name: "Leonardo",
//     age: 45,
//     buddy: "Toby Macquire"
// };

// Get SIZE (and other information) of a file:
// const stats = fs.statSync(`${__dirname}/files/README.md`);
// console.log(stats);

// Get information about directories and files:
// fs.readdir(
//     `${__dirname}/files`,
//     {
//         withFileTypes: true
//     },
//     function(err, files) {
//         if (err) {
//             console.log(err);
//         } else {
//             for (let i = 0; i < files.length; i++) {
//                 console.log(files[i].name, files[i].isDirectory());
//             }
//         }
//     }
// );

// fs.stat(`${__dirname}/files/README.md`, function(err, stats) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(`The file has a size of ${stats.size}`);
//     }
// });

// write a function called logSizes that takes a path to a directory as argument
// read the directory, which gives you a list of files
// loop through and check whehterh they are file or folder
// if file -> pass stat and log "full path/filename" and size
// if folder -> call function with the new path

// for windows: build a path use "\\" to escape \

// make sure to log the path for each iteration.

// PART II:
// Similar to PART I, but we are going to make it synchronously.
// Add the information to a JSON object

// end-result should follow the pattern below (filename: file size or directory: {})
// let output = {
//     "README.md": 12,
//     part1: {},
//     part2: {}
// };

// if file: add property (key: filename, value: filesize)(use the statSync method)
// if folder. add property (object)
//
// function mapSizes(path) {
//     const obj = {};
//     const files = statSync(path);
//     if (files[i].isFile) {
//         obj[files[i]] =
//     } else {
//         obj[files[i]] =
//     }
//     return obj;
// }

// HOW TO WRITE A FILE:
// then write files to JSON
// fs.writeFileSync(`${__dirname}/funkychicken.txt`, "I <3 marshmallows");
// fs.writeFileSync(`${__dirname}/files.json`, JSON.stringify(obj, null, 4));
// stringify takes a second argument, which is a function.
// stringify takes a third argument, which is a number (the line indent)
