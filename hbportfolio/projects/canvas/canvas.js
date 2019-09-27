var pageWidth = document.documentElement.offsetWidth;
var pageHeight = document.documentElement.offsetHeight;
var outerCanvas = document.getElementById("outerCanvas");
var innerCanvas = document.getElementById("innerCanvas");
var outerW = (outerCanvas.width = window.innerWidth - 25);
var outerH = (outerCanvas.height = window.innerHeight - 25);
var h = (innerCanvas.height = 300);
var headHeight = h / 8;
var headWidth = headHeight * 0.8;
var w = (innerCanvas.width = (h / 8) * 3);
var center = w / 2;
var c = outerCanvas.getContext("2d");
var i = innerCanvas.getContext("2d");

// Drawing head
i.strokeStyle = "black";
i.lineWidth = 2;
i.beginPath();
i.ellipse(
    center,
    headHeight / 2 + 2,
    headWidth / 2,
    headHeight / 2 - 2,
    Math.PI / 90,
    0,
    2 * Math.PI
);
i.fillStyle = "MistyRose";
i.fill();
i.stroke();

// drawing left eye
i.beginPath();
i.moveTo(center * 0.85, headHeight * 0.4);
i.bezierCurveTo(
    center * 0.85,
    headHeight * 0.4,
    center * 0.9,
    headHeight * 0.3,
    center * 0.95,
    headHeight * 0.4
);
i.stroke();

// drawing right eye
i.beginPath();
i.moveTo(center * 1.05, headHeight * 0.4);
i.bezierCurveTo(
    center * 1.05,
    headHeight * 0.4,
    center * 1.1,
    headHeight * 0.3,
    center * 1.15,
    headHeight * 0.4
);
i.stroke();

// Drawing mouth
i.beginPath();
i.moveTo(center * 0.85, headHeight * 0.75);
i.bezierCurveTo(
    center * 0.85,
    headHeight * 0.75,
    center,
    headHeight * 0.9,
    center * 1.15,
    headHeight * 0.75
);
i.stroke();

// Drawing the body
i.beginPath();
i.moveTo(center, headHeight);
i.lineTo(center, headHeight * 4);
i.closePath();
i.stroke();

// Drawing arms
i.beginPath();
i.moveTo(center, headHeight * 1.5);
i.bezierCurveTo(
    center,
    headHeight * 1.5,
    center * 0.5,
    headHeight * 2,
    center * 0.75,
    headHeight * 5
);
i.moveTo(center, headHeight * 1.5);
i.bezierCurveTo(
    center,
    headHeight * 1.5,
    center * 1.5,
    headHeight * 2,
    center * 1.25,
    headHeight * 5
);

i.stroke();

// Drawing legs
i.beginPath();
i.strokeStyle = "black";
i.moveTo(center, headHeight * 4);
i.lineTo(center * 0.75, headHeight * 8);
i.moveTo(center, headHeight * 4);
i.lineTo(center * 1.25, headHeight * 8);

i.stroke();

document.addEventListener("keydown", function(e) {
    var left = innerCanvas.offsetLeft;
    var top = innerCanvas.offsetTop;
    // move right
    if (e.keyCode === 39 && left <= pageWidth + pageWidth - outerW - w * 0.5) {
        left += 10;
        innerCanvas.style.left = left + "px";
    }
    // move left
    if (e.keyCode === 37 && left + w * 0.5 >= pageWidth - outerW + w * 0.5) {
        left -= 10;
        innerCanvas.style.left = left + "px";
    }
    // move up
    if (e.keyCode === 38 && top >= pageHeight + h * 0.5) {
        top -= 10;
        innerCanvas.style.top = top + "px";
    }
    // move down
    if (e.keyCode === 40 && top <= pageHeight + outerH - h * 0.5) {
        top += 10;
        innerCanvas.style.top = top + "px";
    }
});
