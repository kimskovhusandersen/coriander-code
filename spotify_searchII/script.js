// To get the query string:

// Method 1
// location.href (returns the full query string)
// location.protocol (returns the protocol, fx http or https)
// location.search.indexOf('scroll=infinite') // returns 1 if true and 0 if false
// this solution is fine for our purpose, but in real life, it's to risky,
// because "https://something.com?scroll=infinitebutnotreally" also returns 1

// Method 2 (not safe in all browsers yet):
// var usp = new URLSearchParams(location.search)
// usp.get('scroll') // returns "infinitebutnotreally"

// THE TASK: Part II
// 1) Detect if the user has scrolled to the bottom of the page
// * Three numbers needed:
// ** scroll height: $(document).height() or document.body.scrollHeight
// ** height: $(window).height or window.innerHeight
// ** scroll top (part of the page that has been scrolled): $(window).scrollTop() or window.pageYOffset

// var didScroll = false;
//
//
// // put this inside the click success function
// $(window).scroll(function() {
//     didScroll = true;
// });
// didUserScrollToBottom();
//
//
// function didUserScrollToBottom(){
// if(didScroll && scroll top + height * 0.5 == scroll height){
//     didScroll = false;
//     // trigger click
// } else {
//     setTimeout(didUserScrollToBottom, 500);
// }
// }

(function() {
    var userInput = document.getElementById("user-input");
    var submitBtn = document.getElementById("submit-button");
    var moreBtn = document.getElementById("more-button");
    var artistOrAlbum = document.getElementsByClassName("artist-or-album");
    var resultsContainer = document.getElementById("results-container");
    var baseUrl = "https://elegant-croissant.glitch.me/spotify";
    var nextUrl, html, height, scrollHeight, scrollTop;
    // var isScrolling = false;

    try {
        var jsonInput = localStorage.getItem("input");
        userInput.value = JSON.parse(jsonInput);
    } catch (e) {
        console.log(e);
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
                // Empty result container and reset the html string
                resultsContainer.innerHTML = "";
                var html = "";
                // Add a headline for the search result
                html += `<h2>Results for "${inputValue}"</h2>`;
                // Get all items and generate the html
                html = generateHtml(payload, html);
                // Append the html to the results container
                resultsContainer.innerHTML += html;
                // Check if "scroll=infinite" is in the query string
                if (location.search.indexOf("scroll=infinite") == 1) {
                    moreBtn.style.visibility = "hidden";
                    didScrollToBot();
                } else {
                    moreBtn.style.visibility = "visible";
                }
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
                // Reset the html string
                var html = "";
                // Get all items and generate the html
                html = generateHtml(payload, html);
                // Append the html to the results container
                resultsContainer.innerHTML += html;

                if (location.search.indexOf("scroll=infinite") == 1) {
                    moreBtn.style.visibility = "hidden";
                    didScrollToBot();
                } else {
                    moreBtn.style.visibility = "visible";
                }
            },
            error: function() {
                console.log("something went wrong");
            }
        });
    });

    // This function takes a ajax object from Spotify and an string variable named html
    // It loops through the object and appends the html to the html variable
    // and returns the html as a string.
    function generateHtml(payload, html) {
        // Check if the user has select artist or album
        payload = payload.artists || payload.albums;
        // Check if there's a next url
        if (payload.next) {
            nextUrl = payload.next.replace(
                "https://api.spotify.com/v1/search",
                baseUrl
            );
        } else {
            moreBtn.style.visibility = "hidden";
        }

        // Check if there's a result
        var items = payload.items;
        if (items.length === 0) {
            html = `<div class="no-result">No result</div>`;
        } else {
            // Loop through each item
            for (var i = 0; i < items.length; i++) {
                if (
                    items[i].name &&
                    items[i].external_urls.spotify &&
                    items[i].images
                ) {
                    var name = items[i].name; // returns name of artist/album as string
                    var images = items[i].images;
                    var image;
                    if (images.length > 0) {
                        for (var j = 0; j < images.length; j++) {
                            if (images[j]["url"]) {
                                image = images[j]["url"];
                                break;
                            }
                        }
                    } else {
                        image = "/assets/spotify-logo.png";
                    }
                    var extUrl = items[i].external_urls.spotify; // returns an object with external_urls
                    if (!extUrl) {
                        extUrl = "https://spotify.com/404";
                    }
                }

                html += `<a href="${extUrl}">
            <div class="item">
                <div class="image-container">
                    <img src="${image}" alt="${name}" />
                </div>
                <div class="name">
                    <p>${name}</p>
                </div>
            </div>
        </a>`;
            }
        }

        return html;
    }

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
