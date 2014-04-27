var Build = (function () {
    "use strict";

    return {

        div: function (options) {
            return merge($('<div></div>'), options);
        },

        link: function (options) {
            return merge($('<a></a>'), options);
        },

        blackOut: function (options) {

            var blackCurtain = $('<div></div>')
                .css({
                    'width': $(document).width(),
                    'height': $(document).height(),
                    'top': '0px',
                    'left': '0px',
                    'position': 'absolute',
                    'z-index': '101',
                    'background-color': 'black'
                })
                .fadeTo('slow', 0.7)
                .click(function () {
                    $(this).hide();
                    $(options.classesToHide).hide();
                });

            $('body').prepend(blackCurtain);
        }
    };

    function merge($element, options) {
        if (options.text) {
            $element.html(options.text);
        }
        if (options.attr) {
            $element.attr(options.attr);
        }
        if (options.css) {
            $element.attr(options.css);
        }
        return $element.clone();
    }

}());