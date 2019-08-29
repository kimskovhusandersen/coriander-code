console.log("Exercise 1 - Sum");

function sum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return Number.isNaN(sum) != true && typeof sum == "number" ? sum : NaN;
}
console.log(sum(1, 5, 2, 8434.343));
console.log(sum("hihi"));

console.log("-------------------------------");
console.log("Exercise 2 - waitThenRun");
function waitThenRun(callback) {
    setTimeout(callback, 1500);
}

// Test:
waitThenRun(function() {
    console.log("Hello!");
}); // logs 'Hello!' 1.5 seconds later

waitThenRun(function() {
    console.log("Goodbye!");
}); // logs 'Goodbye!' 1.5 seconds later

console.log("-------------------------------");
console.log("Exercise 3 - theMillionNumberFunction");

function theMillionNumberFunction(number) {
    if (
        number <= 0 ||
        (Number.isNaN(number) == false && typeof number != "number")
    ) {
        return "ERROR";
    } else if (number < 1000000) {
        return keepMultiplying(number);
        function keepMultiplying(number) {
            if (number < 1000000) {
                number *= 10;
                return keepMultiplying(number);
            }
            return number;
        }
        // multiply by 10 until number >= 1000000
    } else {
        return number;
    }
}

console.log(theMillionNumberFunction("Gotcha!"));
console.log(theMillionNumberFunction(null));
console.log(theMillionNumberFunction(NaN));
console.log(theMillionNumberFunction(-1));
console.log(theMillionNumberFunction(0));
console.log(theMillionNumberFunction(3.49));
console.log(theMillionNumberFunction(3434));
console.log(theMillionNumberFunction(1000000));

console.log("-------------------------------");
console.log("Exercise 4 - Bonus Exercise");

function getTotaler() {
    var sum = 0;
    return function fn2(num) {
        sum += num;
        return sum;
    };
}

var totaler = getTotaler();
console.log(totaler(1)); //1
console.log(totaler(2)); //3
console.log(totaler(5)); //8
