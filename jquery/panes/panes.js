(function() {
    var containerWidth = $("#container").width();
    var slider = $("#slider");
    var topImg = $("#top-image");
    var sliderWidth = slider.css("width").slice(0, -2);
    // var botImg = $("#buttom-image");
    function moveSlider() {
        event.preventDefault();
        var mouseX = event.pageX - slider.parent().offset().left;
        if (mouseX >= sliderWidth && mouseX <= containerWidth) {
            topImg.css({ width: mouseX + "px" });
            slider.css({ left: mouseX - sliderWidth + "px" });
        }
    }

    slider.mousedown(function() {
        $(document).mousemove(moveSlider);
    });
    $(document).mouseup(function() {
        if (slider.position().left < 25) {
            topImg.animate({ width: 0 + "px" }, 500);
            slider.animate({ left: 0 + "px" }, 500);
        }
        if (slider.position().left > 575 - sliderWidth) {
            topImg.animate({ width: containerWidth - sliderWidth + "px" }, 500);
            slider.animate({ left: containerWidth - sliderWidth + "px" }, 500);
        }
        $(document).off("mousemove", moveSlider);
    });
})();
