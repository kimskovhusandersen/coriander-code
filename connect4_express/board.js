const cell = require("./cell");
const fs = require("fs");

module.exports.makeBoard = function makeBoard(cols, rows) {
    let board = [];
    for (let r = rows - 1; r > -1; r--) {
        let row = [];
        for (let col = 0; col < cols; col++) {
            row.push(cell.makeCell(r, col));
        }
        board.push(row);
    }
    if (board == undefined) {
        throw new Error("Could not create a board");
    }
    board;
    fs.writeFileSync(`${__dirname}/board.json`, JSON.stringify(board, null, 4));
    return board;
};

module.exports.drawBoard = function drawBoard(board) {
    let row, cell;
    for (let i = 0; i < board.length; i++) {
        row = board[i];
        for (let j = 0; j < row.length; j++) {
            cell = row[j];
            console.log(cell);
        }
    }
};
