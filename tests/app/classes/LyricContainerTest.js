$(function () {
    'use strict';

    var sut;
    var sutChaining;

    var build;

    var $fixture;

    var $main;
    var $panel;
    var $clip;
    var $header;
    var $body;

    QUnit.testStart(function () {
        $fixture = $('#qunit-fixture');
        $fixture.append($('<div id="main"></div>'));

        $main = $('#main');

        build = new Build();

        sut = new LyricContainer($main, build);

        $panel = $main.find('#lyrics-panel');
        $clip = $main.find('#lyrics-panel #lyrics-clip');
        $header = $main.find('#lyrics-panel #lyrics-header');
        $body = $main.find('#lyrics-panel #lyrics-body');
    });

    QUnit.test('Lyric container init throws exception when no parent defined', 1, function () {
        throws(function () {
            new LyricContainer(undefined, build);
        }, 'Please define a selector', 'Throws a exception when parent is not defined.');
    });

    QUnit.test('Lyric container init throws exception when no build defined', 1, function () {
        throws(function () {
            new LyricContainer($main, undefined);
        }, 'Build object undefined', 'Throws a exception when build is not defined.');
    });

    QUnit.test('Lyric container ', 12, function () {
        equal($panel.hasClass('lyrics-panel'), true, 'Panel has class lyrics-panel');
        equal($panel.hasClass('un-clicked'), true, 'Panel is un-clicked');
        equal($panel.attr('id'), 'lyrics-panel', 'Panel has id lyrics-panel');

        equal($clip.hasClass('lyrics-clip'), true, 'Clip has class lyrics-clip');
        equal($clip.text(), 'Lyric', 'Clip has text: Lyric');
        equal($clip.attr('id'), 'lyrics-clip', 'Clip has id lyrics-clip');

        equal($header.hasClass('lyrics-header'), true, 'Header has class lyrics-header');
        equal($header.attr('id'), 'lyrics-header', 'Header has id lyrics-header');
        equal($header.text(), 'Lyrics Panel', 'Header has text: Lyric Panel');

        equal($body.hasClass('lyrics-body'), true, 'Body has class lyrics-body');
        equal($body.attr('id'), 'lyrics-body', 'Body has id lyrics-body');
        equal($body.text(), 'I can not hear a sound. Play something loud!', 'Header has text: I can not hear a sound. Play something loud!');
    });

    QUnit.test('Lyric container register toggler', 3, function () {
        sutChaining = sut.registerToggler();

        strictEqual(sut, sutChaining, 'Chaining is correct.');

        equal($panel.hasClass('un-clicked'), true, 'Panel has not been clicked');

        $clip.click();

        equal($panel.hasClass('clicked'), true, 'Panel has been clicked');
    });

    QUnit.test('Lyric container register event loading overlay', 2, function () {
        sut.registerEvents();

        $panel.trigger('add-loading-overlay');

        var $loadingOverlay = $('#lyrics-body').find('#loading-overlay');

        equal($loadingOverlay.attr('id'), 'loading-overlay', 'Loading-overlay has been added with id');
        equal($loadingOverlay.attr('data-type'), 'regular-loading-overlay', 'Loading-overlay has been added with data-type');
    });

    QUnit.test('Lyric container register event update and trigger with headline change', 2, function () {
        sut.registerEvents();

        $panel.trigger('update', {artist: 'artist', title: 'title'});

        equal($header.html(), 'artist - title', 'Container update has correct header information');
        equal($body.html(), 'I can not hear a sound. Play something loud!', 'Default body text set');
    });

    QUnit.test('Lyric container no scrolling on headline change', 1, function () {
        sut.registerEvents();
        $body.css({height: '10px', overflowY: 'scroll'}).scrollTop(5);

        $panel.trigger('update', {artist: 'artist', title: 'title'});

        equal($body.scrollTop(), '5', 'Container update without lyric that does not reset the scrolling');
    });

    QUnit.test('Lyric container register event update and trigger with lyric change', 3, function () {
        sut.registerEvents();

        $panel.trigger('update', {lyric: 'lyric'});

        equal($header.html(), 'Lyrics Panel', 'Default headline is set');
        equal($body.html(), 'lyric', 'Container update has correct body information');
        equal($body.scrollTop(), '0', 'Container update reset the scrolling');
    });

    QUnit.test('Lyric container register event chaining', 1, function () {
        sutChaining = sut.registerEvents();
        strictEqual(sut, sutChaining, 'Chaining is correct.');
    });
});