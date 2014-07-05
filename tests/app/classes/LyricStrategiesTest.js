var LyricsWiki = (function () {
    'use strict';

    var name = 'LyricsWiki';
    var baseLyricsWikiUrl = 'http://lyrics.wikia.com/api.php?fmt=realjson';

    return {
        execute: function (artist, title, success, error) {
            GM_xmlhttpRequest({
                method: 'GET',
                headers : {
                    'Accept': 'application/json'
                },
                url: encodeURI(baseLyricsWikiUrl + '&artist=' + toTitleCase(artist) + '&song=' + toTitleCase(title)),
                onload: function (response) {
                    var songObject = $.parseJSON(response.responseText);

                    if (songObject && songObject.page_id) {
                        GM_xmlhttpRequest({
                            method: 'GET',
                            headers : {
                                'Accept': 'application/xml'
                            },
                            url: songObject.url,
                            onload: function (response) {
                                success(extractLyric(response));
                            }
                        });
                    }
                    else {
                        error(name, songObject.url);
                    }
                }
            });
        }
    };
    function extractLyric(response) {
        var lyricWithComment = $(response.responseText).find('.lyricbox').clone().find('div').remove().end().html();
        return lyricWithComment.substr(0, lyricWithComment.indexOf('<!--'));
    }
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
    }
}());

$(function () {
    'use strict';

    var sut = LyricsWiki;

    var errorMock = function (name, url) {
        return {name: name, url: url};
    };
    var successMock = function (lyric) {
        return {lyric: lyric};
    };

    test('LyricsWiki strategy test ', 3, function () {


        var artist = 'artist';
        var title = 'title';

        sut.execute(artist, title, successMock, errorMock);
    });



});
