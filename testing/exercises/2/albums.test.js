const { getAlbumNames } = require("./albums");
const spotify = require("./spotify");

jest.mock("./spotify");

test("album names are in alphabetical order", () => {
    spotify.search.mockResolvedValue({
        albums: {
            items: [
                { name: "Who let the dog out!?" },
                { name: "Funky Chicken's time to shine" },
                { name: "How much is the fish?" },
                { name: "Different gear, still coding" }
            ]
        }
    });
    return getAlbumNames("meat loaf").then(albumNames => {
        expect(albumNames).toEqual(albumNames.sort());
    });
});
