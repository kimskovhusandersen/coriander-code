(function() {
    var textarea = document.getElementById("textarea");
    var validate = document.getElementById("validate");

    validate.addEventListener("click", function() {
        var text = textarea.value;
        try {
            JSON.parse(text);
            alert("Congratualations, this is valid JSON");
        } catch (e) {
            alert("Unfortunately, this is not valid JSON");
        }
    });
})();
