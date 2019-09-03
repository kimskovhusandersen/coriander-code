var x;
var doubleX;
x = Math.floor(Math.random() * 1000);
// x = 454;

function timesTwo(number) {
    return (number *= 2);
}

doubleX = timesTwo(x);

var numbers;
numbers = [x, doubleX];

for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

numbers = {};

numbers["y"] = doubleX;

console.log(numbers["y"]);
