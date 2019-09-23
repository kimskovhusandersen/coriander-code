const fs = require("fs");
function getFileSize() {
    let fileSize = new Promise((resolve, reject) => {
        fs.stat(`${__dirname}/request.txt`, function(err, stats) {
            if (err) {
                reject(err);
            } else {
                resolve(stats.size);
                // console.log(size);
            }
        });
    });
    return fileSize;
}
module.exports.getFileSize = getFileSize;
