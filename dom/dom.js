// Exercise 1:

function changeStyles(selector) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontWeight = "bold";
        elements[i].style.fontStyle = "italic";
        elements[i].style.textDecoration = "underline";
    }
}

// Exercise 2:

function classesAsArray(className) {
    // return Array.from(document.getElementsByClassName(className)); // only workds in newer browsers
    return Array.prototype.slice.call(
        document.getElementsByClassName(className)
    );
}

// Exercise 3:
function insertElement() {
    var element = document.createElement("p");
    element.innerText = "AWESOME";
    element.style.position = "fixed";
    element.style.top = "100px";
    element.style.left = "20px";
    element.style.fontSize = "200px";
    element.style.zIndex = "2147483647";
    document.body.appendChild(element);
}

// Bonus Exercise:
function classesAsArray2(className) {
    var root = document.documentElement;
    var classesArray = [];
    keepSearching(root);
    function keepSearching(root) {
        for (var i = 0; i < root.children.length; i++) {
            if (
                (" " + root.children[i].className + " ").indexOf(
                    " " + className + " "
                ) > -1
            ) {
                classesArray.push(root.children[i]);
            }
            keepSearching(root.children[i]);
        }
    }
    return classesArray;
}
