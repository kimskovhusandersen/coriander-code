var outer = document.querySelector(".outer");
var inner = document.querySelector(".inner");

function getRandomColorNumber() {
    return Math.floor(Math.random() * 256);
}

function changeBgColor(e) {
    e.stopPropagation();
    var r = getRandomColorNumber();
    var g = getRandomColorNumber();
    var b = getRandomColorNumber();
    var randomColor = "rgb(" + r + "," + g + "," + b + ")";
    this.style.backgroundColor = randomColor;
}
outer.addEventListener("click", changeBgColor);
inner.addEventListener("click", changeBgColor);
