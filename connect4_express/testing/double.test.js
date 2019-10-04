const { double } = require("./double");

test("double returns argument times 2", () => {
    return double(2).then(num => {
        expect(num).toBe(4);
    });
});

test("double returns an error, when parsed a string", () => {
    return double("Hi there").catch(err => {
        expect(err.message).toBe("not a number");
    });
});
