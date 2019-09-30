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

module.exports.getLegalMoves = function getLegalMoves(board) {
    const legalMoves = [];
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board[col].length; row++) {
            if (board[col][row].owner === null) {
                legalMoves.push(board[col][row]);
                break;
            }
        }
    }
    return legalMoves;
};

module.exports.selectMoveRandomly = function selectMoveRandomly(
    board,
    legalMoves,
    player
) {
    let randomCell = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    randomCell.owner = player;
    return randomCell;
};

module.exports.checkForWin = function checkForWin(
    board,
    cellsToConnect,
    player
) {
    function checkForWinHorizontally(board, cellsToConnect, player, cell) {
        if (cell.owner === player) {
        }
    }
    function checkForWinVertically(board, cellsToConnect, player, cell) {}
    function checkForWinDiagonallyX(board, cellsToConnect, player, cell) {}
    function checkForWinDiagonallyY(board, cellsToConnect, player, cell) {}
};
