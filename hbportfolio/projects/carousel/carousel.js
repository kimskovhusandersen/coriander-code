// (function moveKitty() {
//     var k = document.getElementsByClassName("kitty");
//     setTimeout(function() {
//         k[0].classList.remove("onscreen");
//         k[0].classList.add("exit");
//         k[1].classList.add("onscreen");
//         setTimeout(function() {
//             k[0].parentElement.appendChild(k[0]);
//             k[k.length - 1].classList.remove("exit");
//             moveKitty();
//         }, 1000);
//     }, 5000);
// })();

(function() {
    var k = document.getElementsByClassName("kitty");
    var d = document.getElementsByClassName("dot");
    var current = 0;
    var time = 5000;
    var timer;
    var inTransition;

    timer = setTimeout(moveKitties, time);

    document.addEventListener("transitionend", function(e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit");
            timer = setTimeout(moveKitties, time);
            inTransition = false;
        }
    });

    for (var i = 0; i < d.length; i++) {
        d[i].addEventListener("click", getClickHandler(i));
    }

    function getClickHandler(n) {
        return function() {
            if (n == current || inTransition) {
                return;
            }
            clearTimeout(timer);
            moveKitties(n);
        };
    }

    function moveKitties(next) {
        inTransition = true;
        k[current].classList.remove("onscreen");
        k[current].classList.add("exit");
        d[current].classList.remove("highlight");
        if (typeof next != "undefined") {
            current = next;
        } else {
            current++;
            if (current >= k.length) {
                current = 0;
            }
        }
        k[current].classList.add("onscreen");
        d[current].classList.add("highlight");
    }
})();
