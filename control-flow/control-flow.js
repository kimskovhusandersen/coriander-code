console.log("Exercise 1 - logType:");
// https://spiced.space/coriander/control_flow/

// undefined, null, boolean, number, NaN, string, symbol, object
function logType(arg) {
    if (typeof arg == "undefined") {
        console.log("Undefined!");
    } else if (arg == null) {
        console.log("Null!");
    } else if (typeof arg == "boolean") {
        console.log("Boolean!");
    } else if (Number.isNaN(arg)) {
        console.log("Not a number!");
    } else if (typeof arg == "number") {
        console.log("Number!");
    } else if (typeof arg == "string") {
        console.log("String!");
    } else if (Array.isArray(arg)) {
        console.log("Array!");
    } else if (typeof arg == "function") {
        console.log("Function!");
    } else if (typeof arg == "object") {
        console.log("Object!");
    } else {
        console.log("I have no idea!");
    }
}

logType(undefined);
logType(null);
logType(1 == "1");
logType(1);
logType(NaN);
logType("Hi");
logType([]);
logType(function() {});
logType({});

console.log("---------------------");
console.log("Exercise 2 - Object:");

var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA"
};

var b = {};
for (var prop in a) {
    b[a[prop]] = prop;
}
console.log(b);

console.log("---------------------");
console.log("Exercise 3 - While loop:");

var x = 10;
while (x > 0) {
    console.log(x);
    x--;
}
