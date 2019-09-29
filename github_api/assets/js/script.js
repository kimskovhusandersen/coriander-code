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

    var submit = document.getElementById("submit");

    var githubInfo = document.getElementById("github-info");
    var username = document.querySelector("input[name=username]");
    var password = document.querySelector("input[name=password]");
    var userToFind = document.querySelector("input[name=user-to-find]");
    var jsonUsername, jsonUserToFind;
    var baseUrl = "https://api.github.com";
    var endpoint, encryptedLogin, responseObj, jsonResponseObj, parsedResponseObj, fullName, target, responseObjUpToDate;

    getLocalStorage();

    // list commits on a repository
    // /repos/:owner/:repo/commits
    // show max 10 commit messages

    submit.addEventListener("click", function() {
        setLocalStorage(username, userToFind, responseObj);
        endpoint = `/users/${userToFind.value}/repos`;
        encryptedLogin = btoa(username.value + ":" + password.value);

        $.ajax({
            url: `${baseUrl}${endpoint}`,
            method: "GET",
            headers: {
                Authorization: `Basic ${encryptedLogin}`
            },
            success: function(repos) {
                responseObj = repos;
                setLocalStorage(username, userToFind, responseObj);
                githubInfo.innerHTML = Handlebars.templates.gits({
                    repos
                });
            },
            error: function() {
                console.log("something went wrong");
            }
        });
    });

    document.addEventListener("click", function(e) {
        // reset status upon new request
        responseObjUpToDate = false;

        getLocalStorage();
        let parent = e.target.parentElement.parentElement;


        fullName = e.target.classList.contains("icon") ?
            e.target.parentElement.childNodes[3].innerHTML : e.target.innerHTML;

        // Check if localStorage is up to date
        for (let props in parsedResponseObj) {
            if (parsedResponseObj[props].full_name == fullName && parsedResponseObj[props].hasOwnProperty('commits')) {
                responseObjUpToDate = true;
            } else if (parsedResponseObj[props].full_name != fullName && parsedResponseObj[props].hasOwnProperty('commits')) {
                delete parsedResponseObj[props].commits;
                responseObj = parsedResponseObj;
            }
        }

        if (responseObjUpToDate) {
            if (parent.classList.contains("on")) {
                console.log(parent, "<ul> commits is showing - removing on");
                parent.classList.remove("on");
            } else {
                console.log(parent, "<ul> commits is hidden - adding on!");
                parent.classList.add("on");
            }
            return; // no need make new request for commits
        }

        endpoint = `/repos/${fullName}/commits `;
        $.ajax({
            url: `${baseUrl}${endpoint}`,
            method: "GET",
            headers: {
                Authorization: `Basic ${encryptedLogin}`
            },
            success: function(response) {

                console.log(parent.classList);
                for (var property in responseObj) {
                    if (responseObj[property].full_name == fullName) {
                        responseObj[property]["commits"] = response;
                    }
                }


                setLocalStorage(username, userToFind, responseObj);
                githubInfo.innerHTML = Handlebars.templates.gits({
                    repos: responseObj
                });
            },
            error: function() {
                console.log("something went wrong");
            },
            complete: function() {
                parent.classList.add("on");
            }
        });
    });

    function setLocalStorage(username, userToFind, responseObj) {
        try {
            jsonUsername = JSON.stringify(username.value);
            localStorage.setItem("jsonUsername", jsonUsername);
            jsonUserToFind = JSON.stringify(userToFind.value);
            localStorage.setItem("jsonUserToFind", jsonUserToFind);
            jsonResponseObj = JSON.stringify(responseObj);
            localStorage.setItem("jsonResponseObj", jsonResponseObj);
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
            jsonResponseObj = localStorage.getItem("jsonResponseObj");
            // console.log(jsonResponseObj);
            parsedResponseObj = JSON.parse(jsonResponseObj);
            // console.log(parsedResponseObj);
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