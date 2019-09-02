(function() {
    var headlines = document.getElementById("headlines");

    requestAnimationFrame(moveHeadline);

    function moveHeadline() {
        var left = headlines.offsetLeft;
        left--;
        headlines.style.left = left + "px";
        var links = document.getElementsByTagName("A");
        if (left < 0 - links[0].offsetWidth) {
            headlines.style.left = left + links[0].offsetWidth + "px";
            links[0].parentElement.appendChild(links[0]);
        }

        requestAnimationFrame(moveHeadline);
    }
})();
