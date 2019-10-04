module.exports.makeCell = function makeCell(col, row) {
    const cell = {
        col,
        row,
        owner: null
    };
    if (cell == undefined) {
        throw new Error("Could not make a new cell");
    }
    return cell;
};

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

module.exports.selectCell = function(cell, player) {
    return new Promise((resolve, reject) => {
        if (cell && player) {
            cell.owner = player;
        }
        if (cell.owner !== player) {
            return reject(new Error("Could not select cell"));
        }
        resolve(cell);
    });
};
