// Require Url module
const url = require("url");

function urlDescribe(urlToParse) {
    let urlParsed = url.parse(urlToParse);
    const querystring = require("querystring");
    let query = querystring.parse(urlParsed.query);
    let strForQuery = "";
    for (let [key, value] of Object.entries(query)) {
        strForQuery += `The value of the ${key} parameter is ${value}\n`;
    }

    console.log(
        `The protocol is ${urlParsed.protocol}
    The host is ${urlParsed.host}
    The hostname is ${urlParsed.hostname}
    The port is ${urlParsed.port}
    The pathname is ${urlParsed.pathname}
    The query is ${urlParsed.query}
    ${strForQuery}`
    );
}

// Export function
module.exports.urlDescribe = urlDescribe;
