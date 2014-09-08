function LyricsWiki() {
    'use strict';

    var name = 'LyricsWiki';
    var baseLyricsWikiUrl = 'https://lyrics.wikia.com/api.php?fmt=realjson';

    return {
        execute: function (artist, title, success, error) {
            if (typeof artist === 'undefined' || typeof title === 'undefined' ||
                typeof success !== 'function' || typeof error !== 'function') {
                throw 'Wrong or undefined arguments';
            }

            var songObject;
            get(prepareUrl(artist, title), function (response) {
                songObject = JSON.parse(response.responseText);

                if (songObject && songObject.lyrics !== 'Not found' && songObject.url) {
                    get(songObject.url, function (response) {
                        success(extractLyric(response));
                    });
                }
                else {
                    error(name, songObject.url);
                }
            });
        }
    };

    function get(url, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: callback
        });
    }

    function extractLyric(response) {
        var lyricWithComment = $(response.responseText).find('.lyricbox').clone().find('div').remove().end().html();
        return lyricWithComment.substr(0, lyricWithComment.indexOf('<!--'));
    }

    function prepareUrl(artist, title) {
        return encodeURI(baseLyricsWikiUrl + '&artist=' + toTitleCase(artist) + '&song=' + toTitleCase(title));
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
    }
}