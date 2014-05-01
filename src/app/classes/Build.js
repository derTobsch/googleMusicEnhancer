var Build = (function () {
    "use strict";

    return {

        div: function (options) {
            return merge($('<div></div>'), options);
        },

        link: function (options) {
            return merge($('<a></a>'),options);
        },

        blackOut: function (options) {

            var blackCurtain = this.div(
                {
                    css : {
                        'width': $(document).width(),
                        'height': $(document).height(),
                        'top': '0',
                        'left': '0',
                        'position': 'absolute',
                        'z-index': '499',
                        'background-color': 'black'
                    },
                    attr : {
                        id : 'black-curtain'
                    }
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
        if (typeof options === 'undefined') {
            return $element.clone();
        }

        if (options.text) {
            $element.html(options.text);
        }
        if (options.attr) {
            $element.attr(options.attr);
        }
        if (options.css) {
            $element.css(options.css);
        }
        return $element.clone();
    }

}());