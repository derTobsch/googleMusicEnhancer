$(function () {
    'use strict';

    var sut = Build;

    test('Build div test with undefined options', 2, function () {

        strictEqual(String(sut.div(undefined)[0]), String($('<div></div>')[0]), 'Should be a <div> element');
        strictEqual(String(sut.link(undefined)[0]), String($('<a></a>')[0]), 'Should be a <a> element');
    });

    test('Build div test', 7, function () {

        var $div = sut.div({ attr : {class: 'firstClass secondClass', id: 'testId', title: 'testTitle'}, text : 'testText', css : {'background-color': 'rgb(0, 0, 0)'}});

        ok($div, 'Not undefined or null.');
        ok($div.hasClass('firstClass'), 'Class is not set properly.');
        ok($div.hasClass('secondClass'), 'Class is not set properly.');
        strictEqual($div.html(), 'testText', 'Text is not set properly.');
        strictEqual($div.attr('id'), 'testId', 'Id is not set properly.');
        strictEqual($div.attr('title'), 'testTitle', 'Id is not set properly.');
        strictEqual($div.css('background-color'), 'rgb(0, 0, 0)', 'Property is not correct.');
    });

    test('Build link test', 7, function () {

        var $link = sut.link({ attr : {class: 'firstClass secondClass', id: 'testId', title: 'testTitle'}, text : 'testText', css : {'background-color': 'rgb(0, 0, 0)'}});

        ok($link, 'Not undefined or null.');
        ok($link.hasClass('firstClass'), 'Class is not set properly.');
        ok($link.hasClass('secondClass'), 'Class is not set properly.');
        strictEqual($link.html(), 'testText', 'Text is not set properly.');
        strictEqual($link.attr('id'), 'testId', 'Id is not set properly.');
        strictEqual($link.attr('title'), 'testTitle', 'Id is not set properly.');
        strictEqual($link.css('background-color'), 'rgb(0, 0, 0)', 'Property is not correct.');
    });
});