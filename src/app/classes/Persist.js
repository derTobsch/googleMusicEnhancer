var Persist = (function () {
    "use strict";

    var prefix = 'gme:';

    return {
        persist: function (key, value) {
            key = prefix + '' + key;
            GM_setValue(key, $.toJSON(value));
        },

        findBy: function (key) {
            key = prefix + '' + key;
            var storedObject = GM_getValue(key);
            if (!!storedObject) {
                return $.evalJSON(storedObject);
            }
            return undefined;
        },

        remove: function (key) {
            key = prefix + '' + key;
            return GM_deleteValue(key);
        }
    };

}());