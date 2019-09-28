(function() {
    const nav = document.getElementById("nav");
    const navBtn = document.getElementById("burger-menu-btn");

    navBtn.addEventListener("click", e => {
        navBtn.classList.contains("on")
            ? navBtn.classList.remove("on")
            : navBtn.classList.add("on");
        nav.classList.contains("on")
            ? nav.classList.remove("on")
            : nav.classList.add("on");
    });

    const items = document.getElementsByClassName("item");

    for (let i = 0; i < items.length; i++) {
        if (items[i].parentNode.classList.contains("inner-main")) {
            items[i].addEventListener("mouseenter", function(e) {
                console.log(e.target);
                e.target.classList.add("on");
            });
            items[i].addEventListener("mouseleave", function(e) {
                console.log(e.target);
                e.target.classList.remove("on");
            });
        }
    }

    const heroTitle = document.getElementById("hero-title");
})();
