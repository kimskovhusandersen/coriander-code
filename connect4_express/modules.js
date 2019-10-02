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

module.exports.checkWinH = function checkWinH(board, cTC, player, cell) {
    const { col, row } = cell;
    let i = 1;
    let cc = 0;
    let keepAdd = 1;
    let keepSub = 1;

    let checkConnectH = () => {
        if ((!board[col + i] && !board[col - i]) || (!keepAdd && !keepSub)) {
            return;
        }

        if (board[col + i] && keepAdd) {
            if (board[col + i][row].owner == player) {
                cc++;
            } else {
                keepAdd = 0;
            }
        }
        if (board[col - i] && keepSub) {
            if (board[col - i][row].owner == player) {
                cc++;
            } else {
                keepSub = 0;
            }
        }
        i++;
        checkConnectH();
    };
    checkConnectH();
    return cc;
};

module.exports.checkWinV = function checkWinV(board, cTC, player, cell) {
    const { col, row } = cell;
    let i = 1;
    let cc = 0;
    let keepAdd = 1;
    let keepSub = 1;

    let checkConnectV = () => {
        if (
            (!board[col][row + i] && !board[col][row - i]) ||
            (!keepAdd && !keepSub)
        ) {
            return;
        }

        if (board[col][row + i] && keepAdd) {
            if (board[col][row + i].owner == player) {
                cc++;
            } else {
                keepAdd = 0;
            }
        }
        if (board[col][row - i] && keepSub) {
            if (board[col][row - i].owner == player) {
                cc++;
            } else {
                keepSub = 0;
            }
        }
        i++;
        checkConnectV();
    };
    checkConnectV();
    return cc;
};

module.exports.checkWinDiaR = function checkWinDiaR(board, cTC, player, cell) {
    const { col, row } = cell;
    let i = 1;
    let cc = 0;
    let keepAdd = 1;
    let keepSub = 1;

    let checkWinDiaR = () => {
        if (
            (!board[col + i][row + i] && !board[col - i][row - i]) ||
            (!keepAdd && !keepSub)
        ) {
            return;
        }

        if (board[col + i][row + i] && keepAdd) {
            if (board[col + i][row + i].owner == player) {
                cc++;
            } else {
                keepAdd = 0;
            }
        }
        if (board[col - i][row - i] && keepSub) {
            if (board[col - i][row - i].owner == player) {
                cc++;
            } else {
                keepSub = 0;
            }
        }
        i++;
        checkWinDiaR();
    };
    checkWinDiaR();
    return cc;
};

module.exports.checkWinDiaL = function checkWinDiaL(board, cTC, player, cell) {
    const { col, row } = cell;
    let i = 1;
    let cc = 0;
    let keepAdd = 1;
    let keepSub = 1;

    let checkWinDiaL = () => {
        if (
            (!board[col + i][row - i] && !board[col - i][row + i]) ||
            (!keepAdd && !keepSub)
        ) {
            return;
        }

        if (board[col + i][row - i] && keepAdd) {
            if (board[col + i][row - i].owner == player) {
                cc++;
            } else {
                keepAdd = 0;
            }
        }
        if (board[col - i][row + i] && keepSub) {
            if (board[col - i][row + i].owner == player) {
                cc++;
            } else {
                keepSub = 0;
            }
        }
        i++;
        checkWinDiaL();
    };
    checkWinDiaL();
    return cc;
};
