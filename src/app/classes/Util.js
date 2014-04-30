var Util = (function () {
    "use strict";

    return {
        hashCode: function (artist, title) {
            var s = artist.concat(title);
            return s.split("").reduce(function (a, b) {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
            }, 0);
        }
    };
}());