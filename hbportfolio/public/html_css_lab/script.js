var hamburger = document.getElementById("hamburgerBtn");
var sideNav = document.getElementById("side-nav");
var overlay = document.getElementById("overlay");
var close = document.getElementById("close");

hamburger.addEventListener("click", function() {
    sideNav.classList.add("on");
    sideNav.style.visibility = "visible";
    overlay.style.visibility = "visible";
    console.log(sideNav);
});

close.addEventListener("click", function() {
    sideNav.classList.remove("on");
    overlay.style.visibility = "hidden";
    sideNav.style.visibility = "hidden";
});
overlay.addEventListener("click", function(e) {
    if (e.target == overlay) {
        sideNav.classList.remove("on");
        overlay.style.visibility = "hidden";
        sideNav.style.visibility = "hidden";
    }
});
