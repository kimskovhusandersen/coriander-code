const secrets = require("./secrets");
const https = require("https");
module.exports.getToken = function getToken(callback) {
    // this function gets the bearertoken from twitter
    let creds = `${secrets.consumerKey}:${secrets.consumerSecret}`;
    let encodedCreds = new Buffer(creds).toString("base64");

    const options = {
        host: "api.twitter.com",
        path: "/oauth2/token",
        method: "POST",
        headers: {
            Authorization: `Basic ${encodedCreds}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    };
    const cb = function(response) {
        if (response.statusCode != 200) {
            // Call the callback function and parse the statusCode as value for "err"
            callback(response.statusCode);
            return;
        }

        let body = "";
        response.on("data", function(chunk) {
            body += chunk;
        });

        response.on("end", function() {
            let parsedBody = JSON.parse(body);
            const { access_token } = parsedBody;
            callback(null, access_token);
        });
    };
    const req = https.request(options, cb);
    req.end("grant_type=client_credentials");
};
module.exports.getTweets = function getTweets(token, callback) {
    // this function gets the tweets from twitter
    // this function gets the bearertoken from twitter
    let encodedToken = new Buffer(token).toString("base64");

    const options = {
        host: "api.twitter.com",
        path:
            "/1.1/statuses/user_timeline.json?screen_name=nytimes&tweet_mode=extended",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const cb = function(response) {
        if (response.statusCode != 200) {
            // Call the callback function and parse the statusCode as value for "err"
            callback(response.statusCode);
            return;
        }

        let body = "";
        response.on("data", function(chunk) {
            body += chunk;
        });

        response.on("end", function() {
            let parsedBody = JSON.parse(body);
            // const { access_token } = parsedBody;
            callback(null, parsedBody);
        });
    };
    const req = https.request(options, cb);
    req.end("grant_type=client_credentials");
};
module.exports.filterTweets = function filterTweets(tweets) {
    // this function filters the reponse we get from twitter

    let result = [];
    for (let props in tweets) {
        let text = tweets[props]["full_text"];
        let urls = tweets[props]["entities"]["urls"][0];
        let url = urls ? urls["url"] : tweets[props].user.url;
        let obj = {};
        obj[`${text}`] = url;
        result.push(obj);
    }
    return result;
};
