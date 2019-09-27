const fs = require("fs");
const pathModule = require("path");
function getProjects(path) {
    const obj = {};
    const projectObj = {};
    let result = writeProjects(path, obj, projectObj);
    function writeProjects(path, obj, projectObj) {
        try {
            // step1
            const files = fs.readdirSync(
                path,
                { withFileTypes: true },
                function(err, files) {
                    return err || files;
                }
            );
            // step 2
            for (let i = 0; i < files.length; i++) {
                let name = files[i].name;
                let k = path.indexOf("projects/") + "projects".length;
                let n = path.length;
                let pathToFolder = path.substring(k, n);
                let pathToFile = `${pathToFolder}/${name}`;
                let title, directory, description;
                let arr = pathToFolder.split("/");
                let [isEmpty, baseFolderName, ...theRest] = arr;
                if (files[i].isFile()) {
                    if (pathModule.extname(pathToFile) == ".html") {
                        title = `${baseFolderName}`.split("_").join(" ");
                        directory = baseFolderName;
                        if (projectObj[`${baseFolderName}`]) {
                            projectObj[`${baseFolderName}`].title = title;
                            projectObj[
                                `${baseFolderName}`
                            ].directory = directory;
                        } else {
                            projectObj[`${baseFolderName}`] = {
                                title,
                                directory
                            };
                        }
                    }
                    if (pathModule.extname(pathToFile) == ".md") {
                        description = fs.readFileSync(
                            `${__dirname}/projects/${pathToFile}`,
                            "utf8"
                        );
                        if (projectObj[`${baseFolderName}`]) {
                            projectObj[
                                `${baseFolderName}`
                            ].description = description;
                        } else {
                            projectObj[`${baseFolderName}`] = {
                                description
                            };
                        }
                    }
                } else if (files[i].isDirectory()) {
                    obj[`${name}`] = {};
                    let newPath = `${path}/${name}`;
                    writeProjects(newPath, obj[`${name}`], projectObj);
                }
            }
        } catch (err) {
            console.log(err);
        }
        fs.writeFileSync(
            `${__dirname}/projects.json`,
            JSON.stringify(projectObj, null, 4)
        );
        return projectObj;
    }
    return result;
}

module.exports.getProjects = getProjects;
