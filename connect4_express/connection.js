module.exports = (board, player, cell) => {
    let connectedCells = [];
    if (Array.isArray(cell)) {
        for (let i = 0; i < cell.length; i++) {
            connectedCells.push([
                checkHorizontally(board, player, cell[i]),
                checkVertically(board, player, cell[i]),
                checkDiagonallyR(board, player, cell[i]),
                checkDiagonallyL(board, player, cell[i])
            ]);
        }
    } else {
        connectedCells.push([
            checkHorizontally(board, player, cell),
            checkVertically(board, player, cell),
            checkDiagonallyR(board, player, cell),
            checkDiagonallyL(board, player, cell)
        ]);
    }
    return connectedCells;
};

function checkHorizontally(board, player, cell) {
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
}

function checkVertically(board, player, cell) {
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
}

function checkDiagonallyR(board, player, cell) {
    const { col, row } = cell;
    let i = 1;
    let cc = 0;

    function checkUp() {
        if (board[col + i] === undefined) {
            return;
        }
        if (board[col + i][row + i] === undefined) {
            return;
        }
        if (board[col + i][row + i].owner !== player) {
            return;
        }
        if (board[col + i][row + i].owner === player) {
            cc++;
            i++;
            checkUp();
        }
    }
    checkUp();
    i = 1;
    function checkDown() {
        if (board[col - i] === undefined) {
            return;
        }
        if (board[col - i][row - i] === undefined) {
            return;
        }
        if (board[col - i][row - i].owner !== player) {
            return;
        }
        if (board[col - i][row - i].owner === player) {
            cc++;
            i++;
            checkDown();
        }
    }
    checkDown();
    return cc;
}

function checkDiagonallyL(board, player, cell) {
    const { col, row } = cell;
    let i = 1;
    let cc = 0;

    function checkUp() {
        if (board[col + i] === undefined) {
            return;
        }
        if (board[col + i][row - i] === undefined) {
            return;
        }
        if (board[col + i][row - i].owner !== player) {
            return;
        }
        if (board[col + i][row - i].owner === player) {
            cc++;
            i++;
            checkUp();
        }
    }
    checkUp();
    i = 1;
    function checkDown() {
        if (board[col - i] === undefined) {
            return;
        }
        if (board[col - i][row + i] === undefined) {
            return;
        }
        if (board[col - i][row + i].owner !== player) {
            return;
        }
        if (board[col - i][row + i].owner === player) {
            cc++;
            i++;
            checkDown();
        }
    }
    checkDown();
    return cc;
}
