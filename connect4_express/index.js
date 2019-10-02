const express = require("express");
const app = express();
const {
    makeBoard,
    getLegalMoves,
    selectMoveRandomly,
    checkWinH,
    checkWinV,
    checkWinDiaL,
    checkWinDiaR
} = require("./modules");

// app.use(express.static("connect4"));

app.get("/", (req, res) => {
    let player = 0;
    const cellsToConnect = 4;
    let board, legalMoves, cell;
    board = makeBoard(7, 6);

    let turns = 10;
    for (let i = 0; i < turns; i++) {
        legalMoves = getLegalMoves(board);
        cell = selectMoveRandomly(board, legalMoves, player);
        let w = [
            checkWinH(board, cellsToConnect, player, cell),
            checkWinV(board, cellsToConnect, player, cell),
            checkWinDiaL(board, cellsToConnect, player, cell),
            checkWinDiaR(board, cellsToConnect, player, cell)
        ];
        console.log(w);
    }

    res.json(board);
});

app.listen(8080, () => console.log("I'm listening"));
