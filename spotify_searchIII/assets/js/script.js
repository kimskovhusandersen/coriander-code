(function() {
    /////////////////////// DO NOT TOUCH /////////////////////////////////
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    /////////////////////// DO NOT TOUCH /////////////////////////////////

    var userInput = document.getElementById("user-input");
    var submitBtn = document.getElementById("submit-button");
    var moreBtn = document.getElementById("more-button");
    var artistOrAlbum = document.getElementsByClassName("artist-or-album");
    var resultsContainer = document.getElementById("results-container");
    var baseUrl = "https://elegant-croissant.glitch.me/spotify";
    var nextUrl, html, height, scrollHeight, scrollTop;

    // moreBtn.style.visibility = "hidden";



    userInput.addEventListener('keyup', e => {
        if (e.code == "Enter") {
            submitBtn.click();
        }
    });


    try {
        var jsonInput = localStorage.getItem("input");
        userInput.value = JSON.parse(jsonInput);
    } catch (e) {
        // console.log(e);
    }

    submitBtn.addEventListener("click", function() {
        var inputValue = userInput.value;
        var dropdown = artistOrAlbum[0].value;

        try {
            var jsonText = JSON.stringify(inputValue);
            localStorage.setItem("input", jsonText);
        } catch (e) {
            console.log(e);
        }
        // If user input is empty, but user presses submit then show "no result"
        if (inputValue.length == 0) {
            html = `<div class="no-result">No result</div>`;
            resultsContainer.innerHTML = html;
            return;
        }
        $.ajax({
            url: baseUrl,
            method: "GET",
            data: {
                q: inputValue,
                type: dropdown
            },
            success: function(payload) {
                // Empty result container
                resultsContainer.innerHTML = "";
                // Check if the user has select artist or album
                payload = payload.artists || payload.albums;
                // Add a headline for the search result
                payload.headline =
                    payload.items.length === 0 ?
                    "No result" :
                    `Results for "${inputValue}"`;
                // Check if there's a next url
                if (payload.next === null) {
                    moreBtn.style.visibility = "hidden";
                } else {
                    moreBtn.style.visibility = "visible";
                    nextUrl = payload.next.replace(
                        "https://api.spotify.com/v1/search",
                        baseUrl
                    );
                    if (location.search.indexOf("scroll=infinite") == 1) {
                        moreBtn.style.visibility = "hidden";
                        didScrollToBot();
                    }
                }
                resultsContainer.innerHTML = Handlebars.templates.spotifyItems(
                    payload
                );
            },
            error: function() {
                console.log("something went wrong");
            }
        });
    });

    moreBtn.addEventListener("click", function() {
        $.ajax({
            url: nextUrl,
            method: "GET",
            success: function(payload) {
                // Check if the user has select artist or album
                payload = payload.artists || payload.albums;

                // Check if there's a next url
                if (payload.next === null) {
                    moreBtn.style.visibility = "hidden";
                } else {
                    moreBtn.style.visibility = "visible";
                    nextUrl = payload.next.replace(
                        "https://api.spotify.com/v1/search",
                        baseUrl
                    );
                    if (location.search.indexOf("scroll=infinite") == 1) {
                        moreBtn.style.visibility = "hidden";
                        didScrollToBot();
                    }
                }
                resultsContainer.innerHTML += Handlebars.templates.spotifyItems(
                    payload
                );
            },
            error: function() {
                console.log("something went wrong");
            }
        });
    });

    // This function checks whether the user has scrolled down to the bottom of the page.
    // and triggers a click on the "more" button, when the condition is true.
    // If the condition is false, the function gets called 500ms later again.
    function didScrollToBot() {
        height = window.innerHeight;
        scrollHeight = document.body.scrollHeight;
        scrollTop = window.pageYOffset;
        if (height * 1.75 + scrollTop > scrollHeight) {
            moreBtn.click();
        } else {
            setTimeout(didScrollToBot, 500);
        }
    }
})();