$(function () {
    'use strict';

    var sut;

    var sutChaining;

    var thisPersist;
    var thisBuild;

    var sutSpy;
    var sutStub;

    var $fixture;
    var $updateButton;

    testStart(function () {
        $fixture = $( '#qunit-fixture' );
        $updateButton = $('<div id="update"></div>');
        $fixture.append($updateButton);

        thisPersist = new Persist();
        thisBuild = new Build();

        sut = new Update(thisPersist, thisBuild);

        sutStub = sinon.stub(sut, 'getNewVersion');
    });

    testDone(function () {
        sutStub.restore();
    });

    test('create Update throws exception on wrong arguments', 2, function () {
        throws(function () {
            sut = new Update(undefined, thisBuild);
        }, 'Persist object undefined', 'Throws a exception on wrong parameter set.');

        throws(function () {
            sut = new Update(thisPersist, undefined);
        }, 'Build object undefined', 'Throws a exception on wrong parameter set.');
    });

    test('Update registerUpdateButtonEvent throws exception on wrong arguments', 1, function () {
        throws(function () {
            sut.registerUpdateButtonEvent(undefined);
        }, 'Update button object undefined', 'Throws a exception on wrong parameter set.');
    });

    test('Update registerUpdateButtonEvent', 2, function () {
        sutSpy = sinon.spy(sut, 'check');

        sutChaining = sut.registerUpdateButtonEvent($updateButton);

        $updateButton.click();

        ok(sutSpy.calledWith(true));
        strictEqual(sut, sutChaining, 'Chaining is correct.');
    });

    test('Update with no new update', 2, function () {
        var persistFindByStub = sinon.stub(thisPersist, 'findBy');
        persistFindByStub.returns(String(new Date().getTime()));

        sutChaining = sut.check();

        ok(sutStub.neverCalledWith('last-update'));
        strictEqual(sut, sutChaining, 'Chaining is correct.');
    });

    test('Update check test with new update', 13, function () {
        var persistPersistStub = sinon.stub(thisPersist, 'persist');
        var persistFindByStub = sinon.stub(thisPersist, 'findBy');
        persistFindByStub.returns(undefined);

        sutStub.returns('2.0');

        sutChaining = sut.check();

        ok(persistFindByStub.calledWith('last-update'));
        ok(persistPersistStub.calledWith('last-update', sinon.match.string));
        ok(persistFindByStub.calledBefore(persistPersistStub));
        strictEqual(sut, sutChaining, 'Chaining is correct.');

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

        $blackCurtain.hide();
    });
});