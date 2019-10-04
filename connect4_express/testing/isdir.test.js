const { isdir } = require("./isdir");

test("isdir logs false if passed a file", () => {
    isdir(__dirname, function(err, file) {
        expect(file).toBe(false);
    });
});
