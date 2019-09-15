(function() {
    // Define board and context
    function setDimensions() {
        var margin = 0.02;
        var width =
            window.innerWidth > window.innerHeight
                ? window.innerHeight * (1 - margin)
                : window.innerWidth * (1 - margin); // board width
        var height = (width / 7) * 6; // board height

        var w = width / 7; // cell height
        var h = height / 6; // cell height

        var cw = w * 1.6; // circle width
        var ch = w * 1.6; // cicle height
        var cbr = cw / 2; // circle border radius
        var cb = cw / 12; // cicle border

        (function draw() {
            slots.css({ width: `${w}px`, height: `${h}px` });
            circles.css({
                width: `${cw}px`,
                height: `${ch}px`,
                "border-radius": `${cbr}px`,
                border: `${cb}px solid ${colorBoard}`
            });
        })();
    }

    var grid = [7, 6]; // 7 columns, 6 rows
    var board = $("#board");
    var circles = $(".circle");
    var slots = $(".slot");
    var columns = $(".column");
    var messageBoard = $("#messageBoard");
    var messageInner = $("#message");

    // Define colors
    var colorp0 = getRandomColor();
    var colorp1 = getRandomColor();
    var colorBoard = getRandomColor();

    var message, gameover, gametie, player;

    // Define event listeners
    messageBoard.on("click", newGame);
    $(window).on("resize", setDimensions);

    function getRandomColor() {
        var rand = function() {
            return Math.floor(Math.random() * 256);
        };
        return `rgb(${rand()}, ${rand()}, ${rand()})`;
    }

    // This function takes a cell as a jQuery object as argument
    // and returns its row number as a string
    function getRowNumber(cellObj) {
        var rowNumAsString = cellObj[0].prop("classList")[1];
        var rowNumber = rowNumAsString.replace(/[^0-9]/gi, "");
        return rowNumber;
    }

    // This function takes a column as a jQuery object as argument
    // and returns its column number as a string
    function getColNumber(colObj) {
        // checks to see if a cellObj has been parsed as argument.
        // if yes, then get the colObj for that cell.
        colObj = colObj.hasClass("slot") ? $(colObj[0].parentElement) : colObj;
        return columns.index(colObj);
    }

    // This functions takes a column number and a row number as argument.
    // It finds the one cell that matches the col and row number and
    // returns it as a jQuery object.
    function getCell(colNum, rowNum) {
        var col = columns.eq(colNum);
        var cell = col.find(`.row${rowNum}`);
        return cell.eq(0);
    }

    // This fuction finds all the cells in a diagonal line
    // from left top to right bottom and returns them as a jQuery Object
    function getCellsDiagonallyLeft(colNumber, rowNumber) {
        var sum = colNumber - rowNumber;
        var cells = $([]);
        for (var c = 0; c < grid[0]; c++) {
            for (var r = 0; r < grid[1]; r++) {
                if (c - r == sum) {
                    cells.push(getCell(c, r));
                }
            }
        }
        return cells;
    }

    // This fuction finds all the cells in a diagonal line
    // from right top to left bottom and returns them as a jQuery Object
    function getCellsDiagonallyRight(colNumber, rowNumber) {
        var sum = colNumber + rowNumber;
        var cells = $([]);
        for (var c = sum >= grid[0] - 1 ? grid[0] - 1 : sum; c >= 0; c--) {
            for (var r = 0; r < grid[1]; r++) {
                if (c + r == sum) {
                    cells.push(getCell(c, r));
                }
            }
        }
        return cells;
    }

    // This function takes colNum as argument.
    // It checks the column the first available cell (legal move) and returns it as a jQuery object.
    // If not column number is provided, it checks all columns and returns all legal moves.
    function getAvailableCells(colNum) {
        var columnsToCheck =
            colNum === undefined ? columns : columns.eq(colNum);
        var legalMoves = $([]);
        $.each(columnsToCheck, function(i, col) {
            var cells = $.makeArray($(col).children()).reverse(); // convert to array and reverse the order
            $.each($(cells), function(j, cell) {
                if (!$(cell).hasClass("p0") && !$(cell).hasClass("p1")) {
                    legalMoves.push($(cell));
                    return false; // break out of loop
                }
            });
        });
        return legalMoves;
    }

    // This function takes a columns number as argument.
    // It selects a cell, if a cell is available (legal move)
    function selectCell(colNum) {
        var cell = getAvailableCells(colNum); // object
        if (cell[0] !== undefined) {
            cell[0].addClass(`p${player}`);
            cell[0].removeClass("highlight");
        }
    }

    function addHighlight(connectedCells = []) {
        if (connectedCells.length > 0) {
            $.each(connectedCells, function(i, item) {
                $(item).addClass("highlight");
            });
        } else {
            var colNum = columns.index($(event.currentTarget));
            var cell = getAvailableCells(colNum);
            if (cell[0] !== undefined) {
                cell[0].addClass("highlight");
            }
        }
    }

    function removeHighlight() {
        var colNum = columns.index($(event.currentTarget));
        var cell = getAvailableCells(colNum);
        if (cell[0] !== undefined) {
            cell[0].removeClass("highlight");
        }
    }

    function checkForVictory(colNum, rowNum) {
        var cellsInRow = board.find(`.row${rowNum}`);
        var check = $([
            columns.eq(colNum).children(), // cells in column
            cellsInRow,
            getCellsDiagonallyLeft(colNum, rowNum), // cells diagonally from left to right
            getCellsDiagonallyRight(colNum, rowNum) // cells diagonally from right to left
        ]);
        // console.log(check[0]);
        for (var j = 0; j < check.length; j++) {
            var winner = $([]);
            var cells = $(check[j]);
            $.each(cells, function(i, item) {
                if ($(item).hasClass(`p${player}`)) {
                    winner.push($(item));
                    if (winner.length === 4) {
                        gameover = true;
                        addHighlight(winner);
                    }
                } else {
                    winner = $([]);
                }
            });
        }
        if (gameover) {
            message = `winner winner<br />funky chicken dinner`;
            columns.off("click", loop);
        }
        return gameover;
    }

    function checkForTie() {
        gametie = true;
        for (var i = 0; i < columns.length; i++) {
            var lastCell = getCell(i, 0);
            if (!lastCell.hasClass("p0") && !lastCell.hasClass("p1")) {
                gametie = false;
            }
        }
        if (gametie) {
            message = "It's a draw";
            columns.off("click", loop);
        }

        return gametie;
    }
    function checkForMessage() {
        if (message.length > 0) {
            var color = player ? colorp0 : colorp1;
            messageInner.html(message.toUpperCase());
            messageInner.css({ color: color });
            messageBoard.css({ visibility: "visible" });
        }
    }

    function switchPlayer() {
        player = player ? 0 : 1;
        if (player == 0) {
            columns.on("click", loop);
            columns.on("mouseover", addHighlight);
            columns.on("mouseout", removeHighlight);
        } else {
            columns.off("click", loop);
            columns.off("mouseover", addHighlight);
            columns.off("mouseout", removeHighlight);
            loop();
        }
    }

    function newGame() {
        setDimensions();
        $(".p0").removeClass("p0");
        $(".p1").removeClass("p1");
        $(".highlight").removeClass("highlight");
        messageBoard.css({ visibility: "hidden" });
        message = "";
        gameover = false;
        // player = Math.floor(Math.random() * 2);
        player = 1;
        if (player == 0) {
            columns.on("click", loop);
            columns.on("mouseover", addHighlight);
            columns.on("mouseout", removeHighlight);
        } else {
            columns.off("click", loop);
            columns.off("mouseover", addHighlight);
            columns.off("mouseout", removeHighlight);
            loop();
        }
    }

    function loop() {
        var colNum, rowNum;
        if (player == 0) {
            colNum = getColNumber($(event.currentTarget));
            rowNum = getRowNumber(getAvailableCells(colNum));
            selectCell(colNum);
            checkForVictory(colNum, rowNum);
            checkForTie();
            checkForMessage();
            switchPlayer();
        }
    }

    newGame();
})();
