// const util = require("util");
const events = require("events");

function Countdown(timeLeft) {
    this.timeLeft = timeLeft;
}

Countdown.prototype = Object.create(events.EventEmitter.prototype);
Countdown.prototype.constructor = Countdown;

// Export Countdown
module.exports.Countdown = Countdown;
