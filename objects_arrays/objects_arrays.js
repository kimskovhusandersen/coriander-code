// Exercise 1
function each(obj_or_arr, callback) {
    if (Array.isArray(obj_or_arr) == true) {
        for (var i = 0; i < obj_or_arr.length; i++) {
            callback(obj_or_arr[i], i);
        }
    } else if (typeof obj_or_arr == "object") {
        for (i in obj_or_arr) {
            callback(obj_or_arr[i], i);
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
    if (Array.isArray(arr) == true) {
        var newArr = [];
        for (let i = arr.length - 1; i > 0; i--) {
            newArr.push(arr[i]);
        }
        return newArr;
    }
} // don't use reverse or slice

// Test
reverseArray([1, 2, -1, -90, 10]);

function getLessThanZero(arr) {
    return Array.isArray(arr) == true ? arr.filter(i => i < 0) : false;
}
// Test
getLessThanZero([1, 2, -1, -90, 10]); //[-1, -90]
getLessThanZero([1, 2]); //[]
