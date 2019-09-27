var element = document.querySelector(".element");

function getRandomColorNumber() {
    return Math.floor(Math.random() * 256);
}

function changeBgColor() {
    var r = getRandomColorNumber();
    var g = getRandomColorNumber();
    var b = getRandomColorNumber();
    var randomColor = "rgb(" + r + "," + g + "," + b + ")";
    this.style.backgroundColor = randomColor;
}

element.addEventListener("mouseup", changeBgColor);
element.addEventListener("mousedown", changeBgColor);
