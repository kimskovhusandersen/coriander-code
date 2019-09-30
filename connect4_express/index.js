const express = require("express");
const app = express();
const {
    makeBoard,
    getLegalMoves,
    selectMoveRandomly,
    checkForWin
} = require("./modules");

// app.use(express.static("connect4"));

app.get("/", (req, res) => {
    let player = 0;
    const cellsToConnect = 4;
    const board = makeBoard(7, 6);
    let legalMoves = getLegalMoves(board);
    let cell = selectMoveRandomly(board, legalMoves, player);
    checkForWin(board, cellsToConnect, player, cell);

    console.log(board);
});

app.listen(8080, () => console.log("I'm listening"));
