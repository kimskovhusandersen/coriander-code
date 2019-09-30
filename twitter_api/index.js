const { getToken, getTweets, filterTweets } = require("./modules");
const express = require("express");
const app = express();
// function logToken(token) {
//     console.log("I need the token to do something");
// }
// getToken(logToken);

app.use(express.static("./tickerII"));

app.get("/data.json", (req, res) => {
    // 1. get a token (bearertoken) from twitter
    getToken(function(err, token) {
        if (err) {
            console.log("Error in getToken", err);
            return;
        }

        // 2. when we have a token, we need to make a request for tweets
        getTweets(token, function(err, tweets) {
            if (err) {
                console.log("Error in getTweets", err);
                return;
            }
            // 3. We need to filter the tweets
            let filteredTweets = filterTweets(tweets);

            // 4. We want to send back filtered tweets as json, for example, res.json (filteredtwweets)
            res.send(filteredTweets);
        });
    });
});

app.listen(8080, () => console.log("I'm listening"));
