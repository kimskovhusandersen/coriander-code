(function() {
    var search = $("#search");
    var result = $("#result");
    var self = this;
    self.output = null;

    function requestResult() {
        var searchStr = search.val().toLowerCase();

        $.ajax({
            url: "https:/flame-egg.glitch.me/",
            method: "GET",
            data: {
                q: searchStr
            },
            success: function(searchResult) {
                if (searchStr === search.val().toLowerCase()) {
                    createResult(searchResult, searchStr);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function createResult(searchResult, searchStr) {
        var output = "";
        if (searchResult.length == 0) {
            output = "<div>No results</div>";
        } else {
            for (var j = 0; j < searchResult.length; j++) {
                output += `<p class="country">${searchResult[j]}</p>`;
            }
        }
        if (searchStr.length == 0) {
            output = null;
        }
        self.output = output;
        result.html(self.output);
    }

    search.on({
        input: $.throttle(250, requestResult),
        paste: $.throttle(250, requestResult),
        keyup: function(e) {
            var children = $(result.get(0).children);
            var hasHighlight = result.find("p.highlight").index();
            //  down
            if (e.keyCode == 40) {
                if (hasHighlight == -1) {
                    children.eq(0).addClass("highlight");
                }
                if (hasHighlight > -1 && hasHighlight < children.length - 1) {
                    children.eq(hasHighlight).removeClass("highlight");
                    children
                        .eq(hasHighlight)
                        .next()
                        .addClass("highlight");
                }
            }
            // up
            if (e.keyCode == 38) {
                if (hasHighlight == -1) {
                    children.eq(children.length - 1).addClass("highlight");
                }
                if (hasHighlight < children.length && hasHighlight > 0) {
                    children.eq(hasHighlight).removeClass("highlight");
                    children
                        .eq(hasHighlight)
                        .prev()
                        .addClass("highlight");
                }
            }
            if (e.keyCode == 13) {
                if (hasHighlight > -1) {
                    var val = children.eq(hasHighlight).html();
                    search.val(val);
                    self.output = val;
                    result.html(null);
                }
            }
        },
        blur: function() {
            result.html(null);
        },
        focus: function() {
            result.html(self.output);
        }
    });
    result.on({
        mouseover: function(e) {
            var target = $(e.target);
            if (target.get(0).nodeName === "P") {
                target.addClass("highlight");
            }
        },
        mouseout: function(e) {
            var target = $(e.target);
            if (target.get(0).nodeName === "P") {
                target.removeClass("highlight");
            }
        },
        mousedown: function(e) {
            var target = $(e.target);
            var val = target.html();
            if (target.hasClass("country")) {
                search.val(val);
                self.output = val;
                result.html(null);
            }
        }
    });
})();
