$(function () {
    'use strict';

    var sut;

    var build;

    var artist = 'artist to encode';
    var title = 'title to encode';

    var requestSpy;

    testStart(function () {

        build = new Build();

        sut = new LyricsWiki(build);

        requestSpy = sinon.spy(window, 'GM_xmlhttpRequest');
    });

    testDone(function () {
        requestSpy.restore();
    });

    test('Lyric container init throws exception when no parent defined', 1, function () {
        throws(function () {
            new LyricsWiki();
        }, 'Build object undefined', 'Throws a exception when parent is not defined.');
    });

    test('LyricsWiki execute throws exception on wrong arguments', 4, function () {
        throws(function () {
            sut.execute(artist, title, function () {
            }, undefined);
        }, 'Wrong or undefined arguments', 'Throws a exception on wrong parameter set.');

        throws(function () {
            sut.execute(artist, title, undefined, function () {
            });
        }, 'Wrong or undefined arguments', 'Throws a exception on wrong parameter set.');

        throws(function () {
            sut.execute(artist, undefined, function () {
            }, function () {
            });
        }, 'Wrong or undefined arguments', 'Throws a exception on wrong parameter set.');

        throws(function () {
            sut.execute(undefined, title, function () {
            }, function () {
            });
        }, 'Wrong or undefined arguments', 'Throws a exception on wrong parameter set.');
    });

    test('LyricsWiki strategy test', function () {
        var name, url;

        sut.execute(artist, title,
            function () {
            },
            function (thisName, thisUrl) {
                name = thisName;
                url = thisUrl;
            }
        );

        ok(requestSpy.calledOnce);
        ok(requestSpy.calledWith({
                method: 'GET',
                url: 'https://lyrics.wikia.com/api.php?fmt=realjson&artist=Artist%20To%20Encode&song=Title%20To%20Encode',
                onload: sinon.match.func
            })
        );
    });
});