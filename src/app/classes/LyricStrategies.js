function LyricsWiki(build) {
    'use strict';

    var name = 'LyricsWiki';
    var baseLyricsWikiUrl = 'https://lyrics.wikia.com/api.php?fmt=realjson';

    var baseGoogleUrl = 'http://www.google.com/';

    if (typeof build === 'undefined') {
        throw 'Build object undefined';
    }

    var Build = build;

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
                    get(songObject.url, function (responseLyric) {
                        success(extractLyric(responseLyric));
                    });
                }
                else {
                    error(getErrorMessage(artist, title, songObject.url));
                }
            });
        }
    };

    function getErrorMessage(artist, title, url) {
        var googleSearchString = encodeURI(baseGoogleUrl + '?q=lyrics+"' + artist +
            ' ' + title + '"#q=lyrics+"' + artist + ' ' + title + '"');

        return $('<div></div>')
            .append(
                Build.div({text: '<b>Oh No. No lyric found.<b>', attr: {class: 'lyrics-not-found-text space-top'}})
            ).append(
                Build.div({text: 'Add one and make this experience a little bit better!',
                    attr: {class: 'lyrics-not-found-text'}})
            ).append(
                Build.div({text: '<b>First</b> search for the correct lyric. YippieYeah!',
                    attr: {class: 'lyrics-not-found-text space-top'}})
            ).append(
                Build.div({attr: {class: 'lyrics-not-found-link'}})
                    .append(Build.link({attr: {href: googleSearchString},
                        text: 'Search for \'' + artist + ' - ' + title + '\''}))
            ).append(
                Build.div({text: '<b>Then</b> add it to ' + name + '. Awesome!',
                    attr: {class: 'lyrics-not-found-text space-top'}})
            ).append(
                Build.div({attr: {class: 'lyrics-not-found-link'}})
                    .append(Build.link({attr: {href: url}, text: 'Add this great song!'}))
            ).append(
                Build.div({text: '<b>At Last</b> refresh to load the lyric you provided',
                    attr: { class: 'lyrics-not-found-text space-top'}})
            );
    }

    function get(url, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: callback
        });
    }

    function extractLyric(response) {
        var lyricWithComment = $(response.responseText).find('.lyricbox').clone().children(':not(br)').remove().end().html();
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
