var Persist = (function () {
    "use strict";

    var prefix = 'gme:';

    return {
        persist: function (key, value) {
            if(typeof key === 'undefined') {
                return false;
            }

            key = prefix + '' + key;
            return GM_setValue(key, $.toJSON(value));
        },

        findBy: function (key) {
            if(typeof key === 'undefined') {
                return undefined;
            }

            key = prefix + '' + key;
            var storedObject = GM_getValue(key);
            if (storedObject) {
                try {
                    return $.evalJSON(storedObject);
                } catch(e) {
                    return undefined;
                }
            }
            return undefined;
        },

        remove: function (key) {
            if(typeof key === 'undefined') {
                return undefined;
            }

            key = prefix + '' + key;
            return GM_deleteValue(key);
        }
    };

}());