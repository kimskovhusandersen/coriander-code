// Exercise 1
function Square(w_and_h) {
    this.width = w_and_h;
    this.height = w_and_h;
}

Square.prototype.getArea = function() {
    return this.width * this.height;
};

function Rectangle(w, h) {
    this.width = w;
    this.height = h;
}

Rectangle.prototype = Object.create(Square.prototype);
Rectangle.prototype.constructor = Rectangle;

var sq = new Square(4);
var rect = new Rectangle(4, 5);

// Test
console.log("Square: " + sq.getArea()); // 16
console.log("Rectangle: " + rect.getArea()); // 20

// Exercise 2

// create a function that takes a string as argument and returns a string. THe strings uppercase characters needs to be lowercase and vice versa.
// you should use String.toUpperCase and String.toLowerCase
function invertCase(str) {
    return typeof str == "string"
        ? str
            .split("")
            .map(function(letter) {
                return letter == letter.toUpperCase()
                    ? letter.toLowerCase()
                    : letter.toUpperCase();
            })
            .join("")
        : false;
}

console.log(invertCase("Hello NEW Potato!")); // hELLO new pOTATO!

// Bonus Exercise
function Countdown(sec) {
    this.sec = sec;
    this.start = function() {
        var self = this;
        setTimeout(function() {
            if (self.sec >= 0) {
                console.log(self.sec);
                self.sec--;
                return self.start();
            }
        }, 1000);
    };
}

var countdown = new Countdown(5);
console.log(countdown.start()); // 5, 4, 3, 2, 1 (with 1 sec pause in between)
