$(function () {
    'use strict';

    var sut = Lyric;

    var sutChaining;

    var lyricsPanelSpy;
    var strategyStub;
    var persistFindByStub;
    var persistPersistStub;

    var $lyricsPanel = $('#lyrics-panel');
    var artist = 'artist';
    var title = 'title';
    var lyric = 'lyric';

    var thisPersist;
    var thisStrategy;

    testStart(function () {
        thisPersist = jQuery.extend({}, Persist);
        thisStrategy = jQuery.extend({}, LyricsWiki);

        lyricsPanelSpy = sinon.spy($lyricsPanel, 'trigger');
        strategyStub = sinon.stub(thisStrategy, 'execute', function(artist, title, success){
            success(lyric);
        });
        persistFindByStub = sinon.stub(thisPersist, 'findBy');
        persistPersistStub = sinon.stub(thisPersist, 'persist');

        sut.init($lyricsPanel, thisPersist);
    });

    testDone(function () {
        lyricsPanelSpy.restore();
        strategyStub.restore();
        persistFindByStub.restore();
        persistPersistStub.restore();
    });

    test('Lyric search throws exception on wrong parameters', 3, function () {
        throws(function () {
            sut.search(undefined, thisStrategy);
        }, 'Wrong parameters or strategy object', 'Throws a exception on wrong parameter set.');

        throws(function () {
            sut.search({}, undefined);
        }, 'Wrong parameters or strategy object', 'Throws a exception on wrong parameter set.');

        throws(function () {
            sut.search(undefined, undefined);
        }, 'Wrong parameters or strategy object', 'Throws a exception on wrong parameter set.');
    });


    test('Lyric search from local storage ', 4, function () {
        persistFindByStub.returns({lyric: lyric});

        sutChaining = sut.search({artist: artist, title : title}, thisStrategy);

        ok(lyricsPanelSpy.neverCalledWith('add-loading-overlay'));
        ok(lyricsPanelSpy.calledWith('update', {artist: artist, title: title}));
        ok(lyricsPanelSpy.calledWith('update', {lyric: lyric}));
        strictEqual(sut, sutChaining, 'Chaining is correct.');
    });

    test('Lyric search via the web with success', 6, function () {
        strategyStub.restore();
        strategyStub = sinon.stub(thisStrategy, 'execute', function(artist, title, success){
            success(lyric);
        });

        persistFindByStub.returns(undefined);

        sutChaining = sut.search({artist: artist, title : title}, thisStrategy);

        ok(lyricsPanelSpy.calledWith('update', {artist: artist, title: title}));
        ok(lyricsPanelSpy.calledWith('add-loading-overlay'));
        ok(lyricsPanelSpy.calledWith('update', {lyric: lyric}));
        ok(persistPersistStub.calledWith('lyric:' + artist + '-' + title, {lyric: lyric}));
        ok(lyricsPanelSpy.calledBefore(persistPersistStub));
        strictEqual(sut, sutChaining, 'Chaining is correct.');
    });

    test('Lyric search via the web with error', 3, function () {
        strategyStub.restore();
        strategyStub = sinon.stub(thisStrategy, 'execute', function(artist, title, success, error){
            error();
        });
        persistFindByStub.returns(undefined);

        sutChaining = sut.search({artist: artist, title : title}, thisStrategy);

        ok(lyricsPanelSpy.calledWith('update', {artist: artist, title: title}));
        ok(lyricsPanelSpy.calledWith('add-loading-overlay'));
        strictEqual(sut, sutChaining, 'Chaining is correct.');
    });
});