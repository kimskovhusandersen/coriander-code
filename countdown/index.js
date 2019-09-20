const Countdown = require("./countdown").Countdown;

const countdown = new Countdown(10);

countdown.on("secondElapsed", function(timeLeft) {
    if (timeLeft > 0) {
        console.log(timeLeft);
    } else {
        console.log("lift off!");
    }
});

while (countdown.timeLeft >= 0) {
    countdown.emit("secondElapsed", countdown.timeLeft);
    countdown.timeLeft--;
}
