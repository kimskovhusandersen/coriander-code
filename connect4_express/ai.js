const getConnections = require("./connection");
const getScore = require("./score");
const cell = require("./cell");

module.exports.selectCell = function selectCell(board, player) {
    console.log("BOARD", board);
    const legalCells = cell.getLegalCells(board);
    console.log("LEGAL CELL", legalCells);
    const connections = getConnections(board, player, legalCells);
    console.log("CONNECTIONS TO CELL", connections);
    const score = getScore(board, player, connections);
    console.log("SCORE", score);
    const highestScore = Math.max.apply(null, score);
    console.log("HIGHEST SCORE", highestScore);
    const indexArr = score.map(function(s, index) {
        if (s == highestScore) {
            return index;
        }
    });
    console.log("ARRAY OF INDECES", indexArr);
    const filteredCells = legalCells.filter(function(c, index) {
        if (indexArr.indexOf(index) != -1) {
            return c;
        }
    });
    console.log("FILTERED CELLS", filteredCells);
    let c = filteredCells[Math.floor(Math.random() * filteredCells.length)];
    console.log("CELL TO SELECT", c);
    cell.selectCell(c, player).then(cell, () => {
        console.log("CELL SELECTED!", c);
    });
    return c;
};
