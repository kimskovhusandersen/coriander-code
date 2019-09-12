(function() {
    // var result = document.getElementById("result");
    translateNumberToGerman();

    function askForNumber() {
        var num = prompt("Please enter a number between 1 and 10");
        if (num >= 1 && num <= 10 && num == parseInt(num)) {
            return num;
        }
        throw new Error("Bad number");
    }

    function translateNumberToGerman() {
        var translation = [
            null, // just used as a placeholder to match index with number given by the user
            "eins",
            "zwei",
            "drei",
            "vier",
            "fünf",
            "sechs",
            "sieben",
            "acht",
            "neun",
            "zehn"
        ];
        try {
            var num = askForNumber();
            return translation[num];
        } catch (e) {
            console.log(`You should enter a number between 1-10. ${e}`);
            return translateNumberToGerman();
        }
    }
})();
