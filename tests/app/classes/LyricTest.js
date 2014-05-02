$(function () {
    "use strict";

    var sut = Lyric;

    test("Lyric search throws exception on wrong parameters", 3, function () {
        throws(function () {
            sut.search(undefined, LyricStrategyMockSuccess);
        }, "Wrong parameters or strategy object", "Throws a exception on wrong parameter set.");

        throws(function () {
            sut.search({}, undefined);
        }, "Wrong parameters or strategy object", "Throws a exception on wrong parameter set.");

        throws(function () {
            sut.search(undefined, undefined);
        }, "Wrong parameters or strategy object", "Throws a exception on wrong parameter set.");
    });


    test("Lyric search from local storage ", 3, function () {

        var artist = 'artist';
        var title= 'title';

        sut.search({artist: artist, title : title}, LyricStrategyMockSuccess);

        var header = $('#lyrics-header');
        var body = $('#lyrics-body');

        strictEqual(header.html(), artist + ' - ' + title , 'Header contains artist and title');
        strictEqual(header.attr('hash'), '-1918060687' , 'Header attribute contains artist and title hash code');
        strictEqual(body.html(), 'lyric', 'Body contains lyric');
    });

    test("Lyric search via the web", 4, function () {

        var artist = 'noLyric';
        var title= 'title';

        sut.search({artist: artist, title : title}, LyricStrategyMockSuccess);

        var header = $('#lyrics-header');
        var body = $('#lyrics-body');

        strictEqual(header.html(), artist + ' - ' + title , 'Header contains artist and title');
        strictEqual(header.attr('hash'), '467455482' , 'Header attribute contains artist and title hash code');
        strictEqual(body.html(), 'lyric', 'Body contains lyric');
        strictEqual(Persist.findBy('lyric:' + artist + '-' + title).key, 'gme:lyric:noLyric-title', 'New lyric was saved');
    });

    test("Lyric search via the web", 3, function () {

        var artist = 'noLyric';
        var title= 'title';

        sut.search({artist: artist, title : title}, LyricStrategyMockError);

        var header = $('#lyrics-header');
        var body = $('#lyrics-body');

        ok(body.html().indexOf('Oh No. No lyric found') > 0, 'Body contains no lyric found message');
        strictEqual(header.html(), artist + ' - ' + title , 'Header contains artist and title');
        strictEqual(header.attr('hash'), '467455482' , 'Header attribute contains artist and title hash code');
    });

});

var LyricStrategyMockSuccess = (function () {
    "use strict";
    return {
        execute: function (artist, title, success, error) {
            success('lyric');
            return {artist: artist, title: title};
        }
    };
}());
var LyricStrategyMockError = (function () {
    "use strict";
    return {
        execute: function (artist, title, success, error) {
            error('lyric', 'url');
            return {artist: artist, title: title};
        }
    };
}());