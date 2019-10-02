const secrets = require("./secrets");
const https = require("https");
const util = require("util");

// This function gets the bearertoken from twitter
module.exports.getToken = function getToken() {
    return new Promise((resolve, reject) => {
        let creds = `${secrets.consumerKey}:${secrets.consumerSecret}`;
        let encodedCreds = new Buffer(creds).toString("base64");

        const options = {
            host: "api.twitter.com",
            path: "/oauth2/token",
            method: "POST",
            headers: {
                Authorization: `Basic ${encodedCreds}`,
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8"
            }
        };
        const cb = function(response) {
            if (response.statusCode != 200) {
                // Call the callback function and parse the statusCode as value for "err"
                reject(response.statusCode);
                return;
            }

            let body = "";
            response.on("data", function(chunk) {
                body += chunk;
            });

            response.on("end", function() {
                let parsedBody = JSON.parse(body);
                const { access_token } = parsedBody;
                resolve(access_token);
            });
        };
        const req = https.request(options, cb);
        req.end("grant_type=client_credentials");
    });
};

// this function gets the tweets from twitter
// this function gets the bearertoken from twitter
module.exports.getTweets = function getTweets(token, screen_name) {
    return new Promise((resolve, reject) => {
        const options = {
            host: "api.twitter.com",
            path: `/1.1/statuses/user_timeline.json?screen_name=${screen_name}&tweet_mode=extended`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const cb = function(response) {
            if (response.statusCode != 200) {
                // Call the callback function and parse the statusCode as value for "err"
                reject(response.statusCode);
                return;
            }

            let body = "";
            response.on("data", function(chunk) {
                body += chunk;
            });

            response.on("end", function() {
                let parsedBody = JSON.parse(body);
                // const { access_token } = parsedBody;
                resolve(parsedBody);
            });
        };
        const req = https.request(options, cb);
        req.end("grant_type=client_credentials");
    });
};

// This function filters the reponse we get from twitter
module.exports.filterTweets = function filterTweets(tweets) {
    return new Promise((resolve, reject) => {
        let result = [];
        for (let props in tweets) {
            let textArr = tweets[props]["full_text"].split("https://");
            let url = `https://${textArr.pop()}`;
            let text = textArr.join(" ");
            // let urls = tweets[props]["entities"]["urls"][0];
            // let url = urls ? urls["url"] : tweets[props].user.url;
            let obj = {};
            obj[`${text}`] = url;
            result.push(obj);
        }
        if (!result) {
            return reject(new Error("Could not filter tweets"));
        }
        resolve(result);
    });
};
