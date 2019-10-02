const { getToken, getTweets, filterTweets } = require("./modules");
const express = require("express");
const app = express();

app.use(express.static("./tickerII"));

app.get("/data.json", (req, res) => {
    getToken()
        .then(token => {
            return Promise.all([
                getTweets(token, "weirdnews"),
                getTweets(token, "NewsBeFunny"),
                getTweets(token, "HeadlinesLMAO")
            ]);
        })
        .then(tweets => {
            const [weirdnews, newsBeFunny, headlinesLMAO] = tweets;
            const mergedTweets = weirdnews.concat(newsBeFunny, headlinesLMAO);
            const sortedTweets = mergedTweets.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
            return filterTweets(sortedTweets);
        })
        .then(filteredTweets => {
            res.json(filteredTweets);
        })
        .catch(err => {
            console.log(err);
        });
});

app.listen(8080, () => console.log("I'm listening"));
