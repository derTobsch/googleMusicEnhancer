$(function () {
    "use strict";

    var sut = Build;

    test("Build div test with undefined options", function () {

        strictEqual(String(sut.div(undefined)[0]), String($('<div></div>')[0]), 'Should be a <div> element');
        strictEqual(String(sut.link(undefined)[0]), String($('<a></a>')[0]), 'Should be a <a> element');
    });

    test("Build div test", function () {

        var $div = sut.div({ attr : {class: 'firstClass secondClass', id: 'testId', title: 'testTitle'}, text : 'testText', css : {'background-color': 'black'}});

        ok($div, 'Not undefined or null.');
        ok($div.hasClass('firstClass'), 'Class is not set properly.');
        ok($div.hasClass('secondClass'), 'Class is not set properly.');
        strictEqual($div.html(), 'testText', 'Text is not set properly.');
        strictEqual($div.attr('id'), 'testId', 'Id is not set properly.');
        strictEqual($div.attr('title'), 'testTitle', 'Id is not set properly.');
        strictEqual($div.css('background-color'), 'black', 'Property is not correct.');
    });

    test("Build link test", function () {

        var $link = sut.link({ attr : {class: 'firstClass secondClass', id: 'testId', title: 'testTitle'}, text : 'testText', css : {'background-color': 'black'}});

        ok($link, 'Not undefined or null.');
        ok($link.hasClass('firstClass'), 'Class is not set properly.');
        ok($link.hasClass('secondClass'), 'Class is not set properly.');
        strictEqual($link.html(), 'testText', 'Text is not set properly.');
        strictEqual($link.attr('id'), 'testId', 'Id is not set properly.');
        strictEqual($link.attr('title'), 'testTitle', 'Id is not set properly.');
        strictEqual($link.css('background-color'), 'black', 'Property is not correct.');
    });

    test("Build black curtain test", function () {

        sut.blackOut({classesToHide: '.hideMe'});

        var $blackCurtain = $('#black-curtain');

        ok($blackCurtain, 'Not undefined or null.');
        ok(parseInt($blackCurtain.css('width')) > 200, 'Width is not set properly.');
        ok(parseInt($blackCurtain.css('height')) > 200,'Height is not set properly.');
        strictEqual($blackCurtain.css('top'), '0px', 'top is not set properly.');
        strictEqual($blackCurtain.css('left'), '0px', 'Left is not set properly.');
        strictEqual($blackCurtain.css('position'), 'absolute', 'Position is not set properly.');
        strictEqual($blackCurtain.css('z-index'), '499', 'zIndex is not set properly.');
        strictEqual($blackCurtain.css('background-color'), 'rgb(0, 0, 0)', 'Background color is not set properly.');
        ok($blackCurtain.is(':visible'), 'Black curtain is visible.');
    });

});