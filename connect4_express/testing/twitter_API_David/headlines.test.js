const headlines = require("./headlines");
const twApi = require("./twApi");

// this makes a fake copy of the twApi file.
// the reason we want a fake copy is because wApi includes the "getTweets" function
// "getTweets" makes a HTTPS request to the Twitter API. I don't want to make this reequest, because if Twitter is down, my
// test will fail. I don't want my test to rely on Twitter.

jest.mock("./twApi");

test(`headlines filters out tweets that don't have exactly one link`, () => {
    twApi.getTweets.mockResolvedValue([
        {
            entities: {
                urls: [
                    {
                        url: "https://some-url.com"
                    }
                ]
            },
            full_text: "Some tweet"
        },
        {
            entities: {
                urls: [
                    {
                        url: "https://some-url.com"
                    },
                    {
                        url: "https://some-url.com"
                    }
                ]
            },
            full_text: "Some tweet"
        },
        {
            entities: {
                urls: [
                    {
                        url: "https://some-url.com"
                    },
                    {
                        url: "https://some-url.com"
                    }
                ]
            },
            full_text: "Some tweet"
        }
    ]); // mockResolveValue() only works with promises

    return headlines().then(tweets => {
        expect(tweets.length).toBe(1);
        expect(tweets[0]).toEqual(
            // toEqual is a method for matching objects (and arrays)
            {
                text: "Some tweet",
                href: "https://some-url.com"
            }
        );
    });
});
