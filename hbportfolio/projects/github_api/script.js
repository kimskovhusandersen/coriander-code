(function() {
    /////////////////////// DO NOT TOUCH /////////////////////////////////
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    /////////////////////// DO NOT TOUCH /////////////////////////////////

    var githubInfo = document.getElementById("github-info");
    var username = document.querySelector("input[name=username]");
    var password = document.querySelector("input[name=password]");
    var userToFind = document.querySelector("input[name=user-to-find]");
    var submit = document.getElementById("submit");
    var jsonUsername, jsonUserToFind;
    var baseUrl = "https://api.github.com";
    var endpoint, encryptedLogin, payload, fullName, target, item;

    getLocalStorage();

    // list commits on a repository
    // /repos/:owner/:repo/commits
    // show max 10 commit messages

    submit.addEventListener("click", function() {
        setLocalStorage(username, userToFind);
        endpoint = `/users/${userToFind.value}/repos`;
        encryptedLogin = btoa(username.value + ":" + password.value);

        $.ajax({
            url: `${baseUrl}${endpoint}`,
            method: "GET",
            headers: {
                Authorization: `Basic ${encryptedLogin}`
            },
            success: function(response) {
                payload = response;
                githubInfo.innerHTML = Handlebars.templates.gits({
                    repos: payload
                });
            },
            error: function() {
                console.log("something went wrong");
            }
        });
    });

    document.addEventListener("click", function(e) {
        target = e.target;
        item = e.path[1];
        if (!target.classList.contains("image-container")) {
            return;
        }
        fullName = target.childNodes[1].value;
        endpoint = `/repos/${fullName}/commits `;

        $.ajax({
            url: `${baseUrl}${endpoint}`,
            method: "GET",
            headers: {
                Authorization: `Basic ${encryptedLogin}`
            },
            success: function(response) {
                for (var property in payload) {
                    if (payload[property].full_name == fullName) {
                        payload[property]["commits"] = response;
                    }
                }

                console.log(payload);
                githubInfo.innerHTML = Handlebars.templates.gits({
                    repos: payload
                });

                fullName = target.classList[1];
                var containers = document.getElementsByClassName(fullName);

                $(containers[0])
                    .parent()
                    .addClass("on");
                containers[0].classList.add("on");
                containers[1].classList.add("on");
                $(containers[1]).on("click.clicked", function() {
                    $(containers[0])
                        .parent()
                        .removeClass("on");
                    containers[0].classList.remove("on");
                    containers[1].classList.remove("on");
                    $(containers[1]).off("click.clicked");
                });
            },
            error: function() {
                console.log("something went wrong");
            }
        });
    });

    function setLocalStorage(username, userToFind) {
        try {
            jsonUsername = JSON.stringify(username.value);
            localStorage.setItem("jsonUsername", jsonUsername);
            jsonUserToFind = JSON.stringify(userToFind.value);
            localStorage.setItem("jsonUserToFind", jsonUserToFind);
        } catch (e) {
            console.log(e);
        }
    }

    function getLocalStorage() {
        try {
            jsonUsername = localStorage.getItem("jsonUsername");
            username.value = JSON.parse(jsonUsername);
            jsonUserToFind = localStorage.getItem("jsonUserToFind");
            userToFind.value = JSON.parse(jsonUserToFind);
        } catch (e) {
            console.log(e);
        }
    }
})();

// $(documents).on("click", ".className", function() {
//     //do stuff
// });
//
// document.addEventListener("click", function(e) {
//     if (e.currentTarget.className === ".className") {
//     }
// });
