const connection = require("./connection");

module.exports.checkForWin = function checkForWin(
    board,
    player,
    cell,
    cellsToConnect
) {
    const connectedCells = connection(board, player, cell);
    console.log("CHECKING FOR WIN", connectedCells);
    return connectedCells[0].filter(num => num >= cellsToConnect).length > 0
        ? true
        : false;
};
