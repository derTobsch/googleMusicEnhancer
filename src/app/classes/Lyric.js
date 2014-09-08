function Lyric($panel, persist, build) {
    'use strict';

    if (typeof $panel === 'undefined' || typeof persist === 'undefined' || typeof build === 'undefined') {
        throw 'Panel, build and/or persist object undefined';
    }

    var baseGoogleUrl = 'http://www.google.com/';
    var lastSearchParameter;

    var $lyricsPanel = $panel;
    var Persist = persist;
    var Build = build;

    return {
        search: function (parameter, strategy) {
            if (typeof parameter === 'undefined' || typeof strategy !== 'object') {
                throw 'Wrong parameters or strategy object';
            }

            findBy(strategy, parameter);

            return this;
        },

        registerSongChangeListener: function (changeListenerSelector, titleSelector, artistSelector) {
            var myObserver = new MutationObserver(mutationHandler);
            myObserver.observe(document.querySelector(changeListenerSelector), { childList: true });

            function mutationHandler() {
                var searchParameter = {artist: $(artistSelector).text(), title: $(titleSelector).text()};

                if (!!lastSearchParameter || JSON.stringify(lastSearchParameter) !== JSON.stringify(searchParameter)) {
                    try {
                        findBy(new LyricsWiki(), searchParameter);
                        lastSearchParameter = searchParameter;
                    } catch (e) {
                        console.log('GME: ' + e.message);
                    }
                }
            }

            return this;
        }
    };

    function findBy(strategy, parameter) {
        if (typeof parameter === 'undefined' || !parameter.artist || !parameter.title || typeof strategy !== 'object') {
            throw 'Wrong parameters or strategy object';
        }

        $lyricsPanel.trigger('update', {artist: parameter.artist, title: parameter.title});

        var persistLyric = Persist.findBy('lyric:' + parameter.artist + '-' + parameter.title);
        if (persistLyric && persistLyric.lyric) {
            $lyricsPanel.trigger('update', {lyric: persistLyric.lyric});
        }
        else {
            $lyricsPanel.trigger('add-loading-overlay');

            strategy.execute(parameter.artist, parameter.title,
                function (lyric) {
                    $lyricsPanel.trigger('update', {lyric: lyric});
                    Persist.persist('lyric:' + parameter.artist + '-' + parameter.title, {lyric: lyric});
                },
                function (name, url) {
                    var googleSearchString = encodeURI(baseGoogleUrl + '?q=lyrics+' + parameter.artist +
                        '' + parameter.title + '#q=lyrics+' + parameter.artist + '' + parameter.title);

                    $('#lyrics-body')
                        .html('')
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
}