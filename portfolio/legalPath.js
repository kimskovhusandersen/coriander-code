const fs = require("fs");
const pathModule = require("path");
function legalPaths(path) {
    const obj = {};
    const legalObj = {};
    let result = writePaths(path, obj, legalObj);
    function writePaths(path, obj, legalObj) {
        try {
            // step1 )
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
                let fullPath = `${path}/${name}`;

                if (files[i].isFile()) {
                    if (pathModule.extname(pathToFile) == ".html") {
                        let arr = pathToFolder.split("/");
                        let [isEmpty, ...newArr] = arr;
                        for (let i = 0; i <= newArr.length + 1; i++) {
                            if (newArr[0]) {
                                let pathToFolder = newArr.join("/");
                                legalObj[`/${pathToFolder}/`] = `${fullPath}`;
                                newArr.pop();
                            }
                        }
                    }
                    legalObj[pathToFile] = `${fullPath}`;
                } else if (files[i].isDirectory()) {
                    obj[`${name}`] = {};
                    let newPath = `${path}/${name}`;
                    writePaths(newPath, obj[`${name}`], legalObj);
                }
            }
        } catch (err) {
            console.log(err);
        }
        fs.writeFileSync(
            `${__dirname}/paths.json`,
            JSON.stringify(legalObj, null, 4)
        );
        return legalObj;
    }
    return result;
}

module.exports.legalPaths = legalPaths;
