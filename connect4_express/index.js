(function() {
    const express = require("express");
    const app = express();
    const board = require("./board");
    const ai = require("./ai");
    const { checkForWin } = require("./game");
    // ----------------------------------------------
    // Use express' build-in support of handlebars
    const hb = require("express-handlebars");
    app.engine("handlebars", hb());
    app.set("view engine", "handlebars");
    // ----------------------------------------------

    const CELLS_TO_CONNECT = 4;
    const COLS = 7;
    const ROWS = 6;

    let player = true;
    let turns = 10;
    let cell, winner;

    app.use(express.static(`${__dirname}/assets`));

    app.get("/game", (req, res) => {
        let b = board.makeBoard(COLS, ROWS);

        for (let i = 0; i <= turns; i++) {
            player = !player;
            cell = ai.selectCell(b, player);
            winner = checkForWin(b, player, cell, CELLS_TO_CONNECT);
            console.log(
                winner
                    ? `PLAYER ${player} WON (turns: ${i})!`
                    : "no winner yet!"
            );
            if (winner) {
                break;
            }
        }
        res.render("game", {
            b
        });
    });

    app.get("/", (req, res) => {
        let b = board.makeBoard(COLS, ROWS);

        res.json(b);
    });

    app.listen(8080, () => console.log("I'm listening"));
})();
