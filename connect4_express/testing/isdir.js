const fs = require("fs");

module.exports.isdir = (path, callback) => {
    fs.readdir(path, { withFileTypes: true }, (err, files) => {
        return callback(err, files[0].isDirectory());
    });
};
//
// isdir(__dirname, function(err, isDirectory) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(isDirectory);
// });
