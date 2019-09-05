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
    var current = 0;
    var timer = 2000;

    setTimeout(moveKitties, timer);

    document.addEventListener("transitionend", function(e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit");
            setTimeout(moveKitties, timer);
        }
    });

    function moveKitties() {
        console.log("current is " + current);
        k[current].classList.remove("onscreen");
        k[current].classList.add("exit");
        current++;
        if (current >= k.length) {
            current = 0;
        }
        k[current].classList.add("onscreen");

        console.log("NEW current is " + current);
    }
})();
