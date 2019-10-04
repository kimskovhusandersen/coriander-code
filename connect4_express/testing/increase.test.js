const { increase } = require("./increase");

test(`passing NaN returns the string "error"`, () => {
    // the actual value you want to check should be passed to "expect"
    expect(increase(NaN)).toBe("error");
});

test(`passing a negative number returns the string "error"`, () => {
    // the actual value you want to check should be passed to "expect"
    expect(increase(-5)).toBe("error");
});

test(`passing a number greater than zero and less than a million returns that number multiplied
    by 10 until its greater than a million`, () => {
    // the actual value you want to check should be passed to "expect"
    expect(increase(10)).toBe(1000000);
});

test(`passing a number greater than a million returns that number`, () => {
    // the actual value you want to check should be passed to "expect"
    expect(increase(1000001)).toBe(1000001);
});
