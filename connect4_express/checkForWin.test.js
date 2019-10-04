const checkForWin = require("./checkForWin");

test(`Connect four cells to win, but there are not four cells connected in any direction`, () => {
    expect(checkForWin([3, 3, 3, 3], 4)).toBe(false);
});

test(`Connect 4 cells to win, and there is exactly four cells connected in one direction`, () => {
    expect(checkForWin([0, 0, 4, 0], 4)).toBe(true);
});

test(`Connect 4 cells to win, and there are more than four cells connected in at least one direction`, () => {
    expect(checkForWin([6, 6, 0, 0], 4)).toBe(true);
});
