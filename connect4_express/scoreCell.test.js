const scoreCell = require("./scoreCell");

test("We need to connect 4 cells to win. There is no cell connected to this cell", () => {
    expect(scoreCell([0, 0, 0, 0], 4)).toBe(0);
});

test("We need to connect 4 cells to win. There is one cell connected to this cell", () => {
    expect(scoreCell([0, 1, 0, 0], 4)).toBe(2);
});

test("We need to connect 4 cells to win. There are two connected cells linked to this cell", () => {
    expect(scoreCell([0, 0, 0, 2], 4)).toBe(5);
});

test("There are three connected cells linked to this cell", () => {
    expect(scoreCell([3, 0, 0, 0], 4)).toBe(1000);
});

test("We need to connect 4 cells to win. There is one cell connected to this cell in two directions ", () => {
    expect(scoreCell([0, 1, 0, 1], 4)).toBe(4);
});

test("We need to connect 4 cells to win. There are two connected cells linked to this cell in three directions", () => {
    expect(scoreCell([2, 0, 2, 2], 4)).toBe(15);
});

test(`We need to connect 4 cells to win. There are two connected cells linked to this cell in three directions
    and one cell connected in one directions`, () => {
    expect(scoreCell([2, 1, 2, 2], 4)).toBe(17);
});

test("We need to connect 6 cells to win. There are three connected cells linked to this cell in three directions", () => {
    expect(scoreCell([3, 0, 3, 3], 6)).toBe(6);
});
