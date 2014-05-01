$(function () {
    "use strict";

    var sut = Util;

    test( "Util hashCode test", function() {

        var artist = 'Herby';
        var title = 'Cleeveland';

        var hashCode = sut.hashCode(artist, title);

        equal( hashCode, 277501007, "The hash code is not correct." );
    });

    test( "Util hashCode with undefined parameters", function() {

        equal( sut.hashCode(), undefined, "The hash code should be undefined with undefined parameters." );
        equal( sut.hashCode(undefined,undefined), undefined, "The hash code should be undefined with undefined parameters." );
        equal( sut.hashCode('artist', undefined), undefined, "The hash code should be undefined with undefined parameters." );
        equal( sut.hashCode(undefined,'title'), undefined, "The hash code should be undefined with undefined parameters." );
    });
});

