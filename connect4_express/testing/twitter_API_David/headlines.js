const twApi = require("./twApi");

module.exports = function() {
    return twApi
        .getTweets(["nytimes", "washingtonpost", "theonion"])
        .then(function(data) {
            return data
                .filter(function(item) {
                    return item.entities.urls && item.entities.urls.length == 1;
                })
                .map(function(item) {
                    let text = item.full_text;
                    if (item.entities.media) {
                        for (let i = 0; i < item.entities.media.length; i++) {
                            text = text
                                .split(item.entities.media[i].url)
                                .join("");
                        }
                    }
                    text = text.split(item.entities.urls[0].url).join("");
                    return {
                        text: text.trim(),
                        href: item.entities.urls[0].url
                    };
                });
        });
};
