(function() {
    const { readdir, stat } = require("fs").promises;
    const path = `${__dirname}/files`;

    // Part 1
    function getFiles(path) {
        return readdir(path, { withFileTypes: true }).then(files => {
            let arr = [];
            // console.log("getFiles returned files");
            for (let i = 0; i < files.length; i++) {
                let newPath = `${path}/${files[i].name}`;
                if (files[i].isDirectory()) {
                    // console.log(files[i].name, "is a directory!");
                    arr.push(getFiles(newPath));
                } else if (files[i].isFile()) {
                    // console.log(files[i].name, "is a file!");
                    arr.push(
                        stat(`${newPath}`).then(stats => {
                            console.log(`${newPath}: ${stats.size}`);
                        })
                    );
                }
            }
            return Promise.all(arr);
        });
    }
    getFiles(path).then(() => console.log("Done!"));
})();
