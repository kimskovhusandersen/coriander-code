// use http-server
// make ajax to assets/data.json
// insert the links into the page
// start animation when success is called
// make sure to handle errors
// make sure to consider cache issues (reload hard: ctrl + shift + r) or run "http-server . -c-0" (tells the server not to use cache)

// var links = $("a");
// var myHtml = "";
// myHtml += `<a href="item[i]" tag="">alkjlksjafd</a>`;

(function() {
    // Define context
    var headlines = $("#headlines");
    var animId;

    $.ajax({
        url: "/assets/data.json",
        method: "GET",
        success: function(data) {
            var links = makeLinks(data);
            headlines.html(links);
            animId = requestAnimationFrame(moveHeadline);
        },
        error: function() {
            console.log("something went wrong");
        }
    });

    // Event listeners
    headlines.mouseover(function(e) {
        if (e.target.nodeName == "A") {
            cancelAnimationFrame(animId);
        }
    });

    headlines.mouseout(function(e) {
        if (e.target.nodeName == "A") {
            animId = requestAnimationFrame(moveHeadline);
        }
    });

    function makeLinks(data) {
        var output = "";
        for (var element of data) {
            for (var [title, url] of Object.entries(element)) {
                output += `<a href="${url}" tag="${title}">${title}</a>`;
            }
        }
        return output;
    }
    function getMarginRight(link) {
        return parseInt(link.css("margin-right").slice(0, -2));
    }

    function moveHeadline() {
        var left = headlines.offset().left;
        var links = headlines.find("A");
        left--;
        headlines.css({ left: left + "px" });

        if (left < 0 - links.eq(0).width()) {
            headlines.css({
                left:
                    left +
                    links.eq(0).width() +
                    getMarginRight(links.eq(0)) +
                    "px"
            });

            links
                .eq(0)
                .parent()
                .append(links.eq(0));
        }
        animId = requestAnimationFrame(moveHeadline);
    }
})();

(function() {
    var headlines2 = $("#headlines2");

    var animId;

    $.ajax({
        url: "/assets/data.json",
        method: "GET",
        success: function(data) {
            var links = makeLinks(data);
            headlines2.html(links);
            animId = requestAnimationFrame(moveHeadline);
        },
        error: function() {
            console.log("something went wrong");
        }
    });

    // Event listeners
    headlines2.mouseover(function(e) {
        if (e.target.nodeName == "A") {
            cancelAnimationFrame(animId);
        }
    });
    headlines2.mouseout(function(e) {
        if (e.target.nodeName == "A") {
            animId = requestAnimationFrame(moveHeadline);
        }
    });

    function makeLinks(data) {
        var output = "";
        for (var element of data) {
            for (var [title, url] of Object.entries(element)) {
                output += `<a href="${url}" tag="${title}">${title}</a>`;
            }
        }
        return output;
    }

    function getMarginLeft(link) {
        return parseInt(link.css("margin-left").slice(0, -2));
    }

    function moveHeadline() {
        var right = headlines2.css("right").slice(0, -2);
        var links = $("#headlines2").find("a");
        var lastLink = links.eq(links.length - 1);
        right--;
        $("#headlines2").css({ right: right + "px" });

        if (right < -lastLink.width()) {
            $("#headlines2").css({
                right: right + lastLink.width() + getMarginLeft(lastLink) + "px"
            });
            lastLink.insertBefore(links.eq(0));
        }
        animId = requestAnimationFrame(moveHeadline);
    }
})();

// offsetLeft = offset().left
// offsetWidth = width();
