$(function () {
    'use strict';

    var sut;

    QUnit.testStart(function () {
        sut = new Persist();
    });

    QUnit.test('Persist persist test with undefined key', 1, function () {
        var isStored = sut.persist(undefined, {lyric: 'lyricBashinat0r'});

        equal(isStored, false, 'Object was not stored with undefined key.');
    });

    QUnit.test('Persist persist test', 2, function () {
        var storedPair = sut.persist('lyricOne', {lyric: 'lyricBashinat0r'});

        equal(storedPair.key, 'gme:lyricOne', 'The prefix has to be added to the key.');
        equal(storedPair.value, '{\"lyric\":\"lyricBashinat0r\"}', 'The value has to be in json format.');
    });

    QUnit.test('Persist findBy test with undefined key', 1, function () {
        equal(sut.findBy(undefined), undefined, 'Return has to be undefined.');
    });

    QUnit.test('Persist findby test', 2, function () {
        var storedPair = sut.findBy('lyricOne');

        equal(storedPair.key, 'gme:lyricOne', 'The prefix has to be added to the key.');
        equal(storedPair.value, 'value', 'The value has to be value (of Mock).');
    });

    QUnit.test('Persist findBy test with incorrect json format', 1, function () {
        equal(sut.findBy('incorrectJson'), undefined, 'Value has to be undefined.');
    });

    QUnit.test('Persist remove test with undefined key', 1, function () {
        equal(sut.remove(undefined), undefined, 'Return has to be undefined.');
    });

    QUnit.test('Persist remove test', 1, function () {
        equal(sut.remove('lyricOne').key, 'gme:lyricOne', 'The prefix has to be added to the key.');
    });
});