function Build() {
    'use strict';

    return {
        div: function (options) {
            return merge($('<div></div>'), options);
        },
        link: function (options) {
            return merge($('<a></a>'), options);
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
}
