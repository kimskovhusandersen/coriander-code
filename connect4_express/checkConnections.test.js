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

const player = 0;
const cell = { col: 3, row: 2, owner: 0 };

test(`There are 5 cells connected diagonally left and right and 1 cell connected horizontally and vertically`, () => {
    expect(checkConnections(board, player, cell)).toEqual([1, 1, 5, 5]);
});
