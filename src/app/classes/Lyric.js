var Lyric = (function () {
    "use strict";

    var baseGoogleUrl = 'http://www.google.com/';

    return {
        search: function (parameter, strategy) {
            if (typeof parameter === 'undefined' || typeof strategy !== 'object') {
                throw "Wrong parameters or strategy object";
            }
            findBy(strategy, parameter);
        }
    };

    function findBy(strategy, parameter) {

        $('#lyrics-header')
            .html(parameter.artist + ' - ' + parameter.title)
            .attr('hash', Util.hashCode(parameter.artist,parameter.title));

        var persistLyric = Persist.findBy('lyric:' + parameter.artist + '-' + parameter.title);
        if (persistLyric.lyric) {
            $('#lyrics-body').html(persistLyric.lyric);
        }
        else {
            $('#lyrics-body').append($('#loadingOverlay').clone().show());

            strategy.execute(parameter.artist, parameter.title,
                function (lyric) {
                    $('#lyrics-body').html(lyric);
                    Persist.persist('lyric:' + parameter.artist + '-' + parameter.title, {lyric: lyric});
                },
                function (name, url) {
                    var googleSearchString = encodeURI(baseGoogleUrl + '?q=lyrics+' + parameter.artist +
                        '+"' + parameter.title + '"#q=lyrics+' + parameter.artist + '+"' + parameter.title);

                    $('#lyrics-body').html('')
                        .append(
                            Build.div({text: '<b>Oh No. No lyric found.<b>',
                                attr: {class: 'lyrics-not-found-text space-top'}})
                        ).append(
                            Build.div({text: 'Add one and make this experience a little bit better!',
                                attr: {class: 'lyrics-not-found-text'}})
                        ).append(
                            Build.div({text: '<b>First</b> search for the correct lyric. YippieYeah!',
                                attr: {class: 'lyrics-not-found-text space-top'}})
                        ).append(
                            Build.div({attr: {class: 'lyrics-not-found-link'}})
                                .append(Build.link({attr: {href: googleSearchString},
                                    text: 'Search for \'' + parameter.artist + ' - ' + parameter.title + '\''}))
                        ).append(
                            Build.div({text: '<b>Then</b> add it to ' + name + '. Awesome!',
                                attr: {class: 'lyrics-not-found-text space-top'}})
                        ).append(
                            Build.div({attr: {class: 'lyrics-not-found-link'}})
                                .append(Build.link({attr: {href: url}, text: 'Add this great song!'}))
                        ).append(
                            Build.div({text: '<b>At Last</b> click here to load the lyric you provided',
                                attr: { class: 'lyrics-not-found-text space-top'}})
                        );
                }
            );
        }
    }
}());