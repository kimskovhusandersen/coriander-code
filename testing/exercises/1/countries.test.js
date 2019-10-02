const countries = require("./countries");

test(`"find" returns an empty array, when it is passed an empty string`, () => {
    expect(countries.find("")).toEqual([]);
});

test(`"find" returns an array with a maximum length of four`, () => {
    expect(countries.find("a")).toHaveLength(4);
});

test(`"find" is case-insensitive, so it returns the same result whether the it's uppercase or lowercase`, () => {
    expect(countries.find("oman")).toEqual(["Oman"]) &&
        expect(countries.find("OMAN")).toEqual(["Oman"]);
});

test(`"find" returns an empty array, when no matching countries are found`, () => {
    expect(countries.find("asdfölkjaösdflk")).toEqual([]);
});
