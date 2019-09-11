(function() {
    var textarea = document.getElementById("textarea");
    try {
        var jsonStoredText = localStorage.getItem("text");
        var storedText = JSON.parse(jsonStoredText);
    } catch (e) {
        console.log(`Error in parsing JSON from localStorage. ${e}`);
    }

    if (storedText) {
        textarea.value = storedText;
    }

    textarea.addEventListener("keyup", function() {
        var text = textarea.value;
        try {
            var jsonText = JSON.stringify(text);
            localStorage.setItem("text", jsonText);
        } catch (e) {
            console.log(`Error in stringify and localStorage. ${e}`);
        }
    });
})();

localStorage.removeItem("name");
