module.exports = (board, player, connection) => {
    let score = [];
    for (let i = 0; i < connection.length; i++) {
        score.push(calculateScore(connection[i], 4));
    }
    return score;
};

function calculateScore(connection, cellsToConnect) {
    let score;
    if (connection.filter(num => num == cellsToConnect - 1).length > 0) {
        return (score = 1000);
    } else {
        score = 0;
        if (connection.filter(num => num == cellsToConnect - 2).length > 0) {
            score +=
                connection.filter(num => num == cellsToConnect - 2).length * 5;
        }
        if (connection.filter(num => num == cellsToConnect - 3).length > 0) {
            score +=
                connection.filter(num => num == cellsToConnect - 3).length * 2;
        }
        if (connection.filter(num => num == cellsToConnect - 4).length > 0) {
            score +=
                connection.filter(num => num == cellsToConnect - 4).length * 1;
        }
    }
    return score;
}
