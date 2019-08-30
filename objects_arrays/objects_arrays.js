// Exercise 1
function each(objOrArr, callback) {
    if (Array.isArray(objOrArr)) {
        for (var i = 0; i < objOrArr.length; i++) {
            callback(objOrArr[i], i);
        }
    } else if (typeof objOrArr == "object") {
        for (i in objOrArr) {
            callback(objOrArr[i], i);
        }
    }
}

// test
each(
    {
        a: 1,
        b: 2
    },
    function(val, name) {
        console.log("The value of " + name + " is " + val);
    }
); // logs 'the value of a is 1' and 'the value of b is 2'

each(["a", "b"], function(val, idx) {
    console.log("The value of item " + idx + " is " + val);
}); // logs 'the value of item 0 is a' and 'the value of item 1 is b'

// Exercise 2
function reverseArray(arr) {
    if (Array.isArray(arr)) {
        var newArr = [];
        for (var i = arr.length - 1; i >= 0; i--) {
            newArr.push(arr[i]);
        }
        return newArr;
    }
}

// Test
reverseArray([1, 2, -1, -90, 10]); // returns [10, -90, -1, 2, 1]

// Exercise 3
function getLessThanZero(arr) {
    if (Array.isArray(arr)) {
        return arr.filter(function(i) {
            return i < 0;
        });
    }
}

// Test
getLessThanZero([1, 2, -1, -90, 10]); // returns [-1, -90]
getLessThanZero([1, 2]); // returns []
