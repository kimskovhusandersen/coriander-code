(function() {
    var headlines = document.getElementById("headlines");
    var animId = requestAnimationFrame(moveHeadline);

    headlines.addEventListener("mouseover", function(e) {
        if (e.target.nodeName == "A") {
            cancelAnimationFrame(animId);
        }
    });
    headlines.addEventListener("mouseout", function(e) {
        if (e.target.nodeName == "A") {
            animId = requestAnimationFrame(moveHeadline);
        }
    });

    function getMarginRight(link) {
        return parseInt(getComputedStyle(link)["margin-right"].slice(0, -2));
    }

    function moveHeadline() {
        var left = headlines.offsetLeft;
        var links = headlines.getElementsByTagName("A");
        left--;
        headlines.style.left = left + "px";

        if (left < 0 - links[0].offsetWidth) {
            headlines.style.left =
                left + links[0].offsetWidth + getMarginRight(links[0]) + "px";
            links[0].parentElement.appendChild(links[0]);
        }
        animId = requestAnimationFrame(moveHeadline);
    }
})();

(function() {
    var headlines = document.getElementById("headlines2");
    var animId = requestAnimationFrame(moveHeadline);

    headlines.addEventListener("mouseover", function(e) {
        if (e.target.nodeName == "A") {
            cancelAnimationFrame(animId);
        }
    });
    headlines.addEventListener("mouseout", function(e) {
        if (e.target.nodeName == "A") {
            animId = requestAnimationFrame(moveHeadline);
        }
    });

    function getMarginLeft(link) {
        return parseInt(getComputedStyle(link)["margin-left"].slice(0, -2));
    }

    function moveHeadline() {
        var right = getComputedStyle(headlines)["right"].slice(0, -2);
        var links = headlines.getElementsByTagName("A");
        right--;
        headlines.style.right = right + "px";
        var lastLink = links[links.length - 1];
        if (right < -lastLink.offsetWidth) {
            headlines.style.right =
                right + lastLink.offsetWidth + getMarginLeft(lastLink) + "px";
            lastLink.parentElement.insertBefore(lastLink, links[0]);
        }
        animId = requestAnimationFrame(moveHeadline);
    }
})();
