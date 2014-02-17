var Build = (function () {
    "use strict";

    return {

        div: function (options) {
            var div = $('<div></div>');

            if (!!options.text) {
                div.html(options.text);
            }
            if (!!options.id) {
                div.attr({id: options.id});
            }
            if (!!options.class) {
                div.addClass(options.class);
            }
            return div;
        },

        link: function (options) {
            var link = $('<a></a>');

            if (!!options.text) {
                link.html(options.text);
            }
            if (!!options.id) {
                link.attr({id: options.id});
            }
            if (!!options.class) {
                link.addClass(options.class);
            }
            if (!!options.href) {
                link.attr({href: options.href});
            }
            return link;
        },

        blackOut: function (options) {

            var blackCurtain = jQuery('<div></div>')
                .css({
                    'width': jQuery(document).width(),
                    'height': jQuery(document).height(),
                    'top': '0px',
                    'left': '0px',
                    'position': 'absolute',
                    'z-index': '101',
                    'background-color': 'black'
                })
                .fadeTo('slow', 0.7)
                .click(function () {
                    jQuery(this).hide();
                    jQuery(options.classesToHide).hide();
                });

            jQuery('body').prepend(blackCurtain);
        }
    };

}());