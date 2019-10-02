module.exports.makeBoard = function makeBoard(cols, rows) {
    let board = [];
    for (let col = 0; col < cols; col++) {
        let column = [];
        for (let row = 0; row < rows; row++) {
            column.push(makeCell(col, row));
        }
        board.push(column);
    }
    return board;
};

function makeCell(col, row) {
    const cell = {
        col,
        row,
        owner: null
    };
    return cell;
}

module.exports.getLegalCells = function getLegalCells(board) {
    const legalCells = [];
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board[col].length; row++) {
            if (board[col][row].owner === null) {
                legalCells.push(board[col][row]);
                break;
            }
        }
    }
    return legalCells;
};

module.exports.selectCellRandomly = function selectCellRandomly(
    board,
    legalCell,
    player
) {
    let randomCell = legalCell[Math.floor(Math.random() * legalCell.length)];
    randomCell.owner = player;
    return randomCell;
};

module.exports.selectCell = function selectCell(board, cell, player) {
    cell.owner = player;
    return cell;
};
