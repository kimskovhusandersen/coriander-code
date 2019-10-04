const score = require("./score");

const board = [
    [
        { col: 0, row: 0, owner: null },
        { col: 0, row: 1, owner: null },
        { col: 0, row: 2, owner: null },
        { col: 0, row: 3, owner: null },
        { col: 0, row: 4, owner: null },
        { col: 0, row: 5, owner: null }
    ],
    [
        { col: 1, row: 0, owner: null },
        { col: 1, row: 1, owner: null },
        { col: 1, row: 2, owner: null },
        { col: 1, row: 3, owner: null },
        { col: 1, row: 4, owner: null },
        { col: 1, row: 5, owner: null }
    ],
    [
        { col: 2, row: 0, owner: false },
        { col: 2, row: 1, owner: null },
        { col: 2, row: 2, owner: null },
        { col: 2, row: 3, owner: null },
        { col: 2, row: 4, owner: null },
        { col: 2, row: 5, owner: null }
    ],
    [
        { col: 3, row: 0, owner: false },
        { col: 3, row: 1, owner: null },
        { col: 3, row: 2, owner: null },
        { col: 3, row: 3, owner: null },
        { col: 3, row: 4, owner: null },
        { col: 3, row: 5, owner: null }
    ],
    [
        { col: 4, row: 0, owner: true },
        { col: 4, row: 1, owner: null },
        { col: 4, row: 2, owner: null },
        { col: 4, row: 3, owner: null },
        { col: 4, row: 4, owner: null },
        { col: 4, row: 5, owner: null }
    ],
    [
        { col: 5, row: 0, owner: null },
        { col: 5, row: 1, owner: null },
        { col: 5, row: 2, owner: null },
        { col: 5, row: 3, owner: null },
        { col: 5, row: 4, owner: null },
        { col: 5, row: 5, owner: null }
    ],
    [
        { col: 6, row: 0, owner: null },
        { col: 6, row: 1, owner: null },
        { col: 6, row: 2, owner: null },
        { col: 6, row: 3, owner: null },
        { col: 6, row: 4, owner: null },
        { col: 6, row: 5, owner: null }
    ]
];

const player = false;
const legalCells = [
    { col: 0, row: 0, owner: null },
    { col: 1, row: 0, owner: null },
    { col: 2, row: 1, owner: null },
    { col: 3, row: 1, owner: null },
    { col: 4, row: 1, owner: null },
    { col: 5, row: 0, owner: null },
    { col: 6, row: 0, owner: null }
];

test(``, () => {
    expect(score(board, player, legalCells)).toEqual([0, 0, 0, 0, 0, 0, 0]);
});
