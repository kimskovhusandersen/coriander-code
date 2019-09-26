const fs = require("fs");
const pathModule = require("path");
function getProjects(path) {
    const obj = {};
    const projectArr = [];
    let result = writeProjects(path, obj, projectArr);
    function writeProjects(path, obj, projectArr) {
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
                let k = path.indexOf("public/") + 6;
                let n = path.length;
                let pathToFolder = path.substring(k, n);
                let pathToFile = `${pathToFolder}/${name}`;

                if (files[i].isFile()) {
                    if (pathModule.extname(pathToFile) == ".html") {
                        let arr = pathToFolder.split("/");
                        let [isEmpty, baseFolderName, ...theRest] = arr;
                        let title = `${baseFolderName}`.split("_").join(" ");
                        projectArr.push({
                            title,
                            directory: `${baseFolderName}`
                        });
                    }
                } else if (files[i].isDirectory()) {
                    obj[`${name}`] = {};
                    let newPath = `${path}/${name}`;
                    writeProjects(newPath, obj[`${name}`], projectArr);
                }
            }
        } catch (err) {
            console.log(err);
        }
        fs.writeFileSync(
            `${__dirname}/projects.json`,
            JSON.stringify(projectArr, null, 4)
        );
        return projectArr;
    }
    return result;
}

module.exports.getProjects = getProjects;
