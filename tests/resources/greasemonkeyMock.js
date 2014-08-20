var GM_info = {script: {version: '1.0'}};

var GM_addStyle = function (style) {
    return 'addStyle';
};

var GM_getValue = function (key) {
    if (key.indexOf('incorrectJson') > 0) {
        return "{key : \"" + key + "\", value : value}";
    }
    if (key.indexOf('noLyric') > 0) {
        return "{\"key\" : \"" + key + "\", \"value\" : \"value\"}";
    }
    return "{\"key\" : \"" + key + "\", \"value\" : \"value\", \"lyric\" : \"lyric\"}";
};
var GM_setValue = function (key, value) {
    return {key: key, value: value};
};
var GM_deleteValue = function (key) {
    return {key: key};
};
var GM_xmlhttpRequest = function (options) {
};