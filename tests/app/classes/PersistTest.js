$(function () {
    'use strict';

    var sut = Persist;

    test('Persist persist test with undefined key', 1, function () {
        var isStored = sut.persist(undefined, {lyric: 'lyricBashinat0r'});

        equal(isStored, false, 'Object was not stored with undefined key.');
    });

    test('Persist persist test', 2, function () {
        var storedPair = sut.persist('lyricOne', {lyric: 'lyricBashinat0r'});

        equal(storedPair.key, 'gme:lyricOne', 'The prefix has to be added to the key.');
        equal(storedPair.value, '{\"lyric\":\"lyricBashinat0r\"}', 'The value has to be in json format.');
    });

    test('Persist findBy test with undefined key', 1, function () {
        equal(sut.findBy(undefined), undefined, 'Return has to be undefined.');
    });

    test('Persist findby test', 2, function () {
        var storedPair = sut.findBy('lyricOne');

        equal(storedPair.key, 'gme:lyricOne', 'The prefix has to be added to the key.');
        equal(storedPair.value, 'value', 'The value has to be value (of Mock).');
    });

    test('Persist findBy test with incorrect json format', 1, function () {
        equal(sut.findBy('incorrectJson'), undefined, 'Value has to be undefined.');
    });

    test('Persist remove test with undefined key', 1, function () {
        equal(sut.remove(undefined), undefined, 'Return has to be undefined.');
    });

    test('Persist remove test', 1, function () {
        equal(sut.remove('lyricOne').key, 'gme:lyricOne', 'The prefix has to be added to the key.');
    });
});