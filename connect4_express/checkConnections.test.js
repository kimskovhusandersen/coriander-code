const checkConnections = require("./checkConnections");

const board = [
    [
        { col: 0, row: 0, owner: null },
        { col: 0, row: 1, owner: null },
        { col: 0, row: 2, owner: null },
        { col: 0, row: 3, owner: null },
        { col: 0, row: 4, owner: null },
        { col: 0, row: 5, owner: 0 }
    ],
    [
        { col: 1, row: 0, owner: 0 },
        { col: 1, row: 1, owner: null },
        { col: 1, row: 2, owner: null },
        { col: 1, row: 3, owner: null },
        { col: 1, row: 4, owner: 0 },
        { col: 1, row: 5, owner: null }
    ],
    [
        { col: 2, row: 0, owner: null },
        { col: 2, row: 1, owner: 0 },
        { col: 2, row: 2, owner: null },
        { col: 2, row: 3, owner: 0 },
        { col: 2, row: 4, owner: null },
        { col: 2, row: 5, owner: null }
    ],
    [
        { col: 3, row: 0, owner: null },
        { col: 3, row: 1, owner: null },
        { col: 3, row: 2, owner: 0 },
        { col: 3, row: 3, owner: 0 },
        { col: 3, row: 4, owner: null },
        { col: 3, row: 5, owner: null }
    ],
    [
        { col: 4, row: 0, owner: null },
        { col: 4, row: 1, owner: 0 },
        { col: 4, row: 2, owner: 0 },
        { col: 4, row: 3, owner: 0 },
        { col: 4, row: 4, owner: null },
        { col: 4, row: 5, owner: null }
    ],
    [
        { col: 5, row: 0, owner: 0 },
        { col: 5, row: 1, owner: null },
        { col: 5, row: 2, owner: null },
        { col: 5, row: 3, owner: null },
        { col: 5, row: 4, owner: 0 },
        { col: 5, row: 5, owner: null }
    ],
    [
        { col: 6, row: 0, owner: null },
        { col: 6, row: 1, owner: null },
        { col: 6, row: 2, owner: 0 },
        { col: 6, row: 3, owner: null },
        { col: 6, row: 4, owner: null },
        { col: 6, row: 5, owner: 0 }
    ]
];

const cTC = 4;
const player = 0;
const cell = { col: 3, row: 2, owner: 0 };

test(`checkConnections takes 4 arguments: a board state, a cell, a player and number of cells to connect.
    It checks how many cells that are connected to the cell passed (excluded) horizontally
    and returns the number of cells connected`, () => {
    expect(checkConnections.checkHorizontally(board, cTC, player, cell)).toBe(
        1
    );
});

test(`checkConnections takes 4 arguments: a board state, a cell, a player and number of cells to connect.
    It checks how many cells that are connected to the cell passed (excluded) vertically
    and returns the number of cells connected`, () => {
    expect(checkConnections.checkVertically(board, cTC, player, cell)).toBe(1);
});

test(`checkConnections takes 4 arguments: a board state, a cell, a player and number of cells to connect.
    It checks how many cells that are connected to the cell passed (excluded) diagonally from top, right to bottom, left
    and returns the number of cells connected`, () => {
    expect(checkConnections.checkDiagonallyR(board, cTC, player, cell)).toBe(5);
});

test(`checkConnections takes 4 arguments: a board state, a cell, a player and number of cells to connect.
    It checks how many cells that are connected to the cell passed (excluded) diagonally from top, left to bottom, right
    and returns the number of cells connected`, () => {
    expect(checkConnections.checkDiagonallyL(board, cTC, player, cell)).toBe(5);
});
