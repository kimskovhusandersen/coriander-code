(function() {
    var hamburger = $("#hamburgerBtn");
    var sideNav = $("#side-nav");
    var overlay = $("#overlay");
    var closeButtons = $(".closeButton");
    var dialogOverlay = $("#dialog-overlay");
    var dialog = $("#dialog");

    setTimeout(function() {
        dialogOverlay.css({ visibility: "visible" });
        dialog.css({ visibility: "visible" });
    }, 1000);

    hamburger.click(function() {
        sideNav.addClass("on");
        sideNav.css({ visibility: "visible" });
        overlay.css({ visibility: "visible" });
    });
    closeButtons.click(function() {
        sideNav.removeClass("on");
        dialog.css({ visibility: "hidden" });
        dialogOverlay.css({ visibility: "hidden" });
        overlay.css({ visibility: "hidden" });
        sideNav.css({ visibility: "hidden" });
    });

    overlay.click(function(e) {
        if (e.target.id == "overlay") {
            sideNav.removeClass("on");
            overlay.css({ visibility: "hidden" });
            sideNav.css({ visibility: "hidden" });
        }
    });
})();
