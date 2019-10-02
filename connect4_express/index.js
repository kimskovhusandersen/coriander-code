const express = require("express");
const app = express();
const { makeBoard, getLegalCells, selectCellRandomly } = require("./modules");
const {
    checkVertically,
    checkHorizontally,
    checkDiagonallyL,
    checkDiagonallyR
} = require("./checkConnections");

// app.use(express.static("connect4"));

app.get("/", (req, res) => {
    let player = false;
    const cellsToConnect = 4;
    let board, legalCells, cell;
    board = makeBoard(7, 6);

    let turns = 10;
    for (let i = 0; i < turns; i++) {
        legalCells = getLegalCells(board);
        for (let j = 0; j < legalCells.length; j++) {
            let w = [
                checkVertically(board, cellsToConnect, player, legalCells[j]),
                checkHorizontally(board, cellsToConnect, player, legalCells[j]),
                checkDiagonallyL(board, cellsToConnect, player, legalCells[j]),
                checkDiagonallyR(board, cellsToConnect, player, legalCells[j])
            ];
            let l = [
                checkVertically(board, cellsToConnect, !player, legalCells[j]),
                checkHorizontally(
                    board,
                    cellsToConnect,
                    !player,
                    legalCells[j]
                ),
                checkDiagonallyL(board, cellsToConnect, !player, legalCells[j]),
                checkDiagonallyR(board, cellsToConnect, !player, legalCells[j])
            ];
            console.log(l);
        }
        console.log("------------------------");
        selectCellRandomly(board, legalCells, player);
        selectCellRandomly(board, legalCells, !player);
        console.log("BOARD", board);
    }
    res.json(board);
});

app.listen(8080, () => console.log("I'm listening"));
