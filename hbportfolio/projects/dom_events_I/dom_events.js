var element = document.getElementsByClassName("element");
document.addEventListener("mousemove", function(e) {
    var x = e.clientX;
    var y = e.clientY;
    var halfTheSizeOfElement = element[0].offsetWidth * 0.5;
    setTimeout(function() {
        element[0].style.left = x - halfTheSizeOfElement + "px";
        element[0].style.top = y - halfTheSizeOfElement + "px";
    }, 100);
});
