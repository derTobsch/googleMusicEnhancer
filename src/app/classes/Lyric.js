function Lyric($panel, persist) {
    'use strict';

    if (typeof $panel === 'undefined' || typeof persist === 'undefined') {
        throw 'Panel and/or persist object undefined';
    }

    var lastSearchParameter;
    var $lyricsPanel = $panel;
    var Persist = persist;

    return {
        search: function (parameter, strategy) {
            if (typeof parameter === 'undefined' || typeof strategy !== 'object') {
                throw 'Wrong parameters or strategy object';
            }

            findBy(strategy, parameter);

            return this;
        },

        registerSongChangeListener: function (changeListenerSelector, titleSelector, artistSelector) {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var myObserver = new MutationObserver(mutationHandler);
            myObserver.observe(document.querySelector(changeListenerSelector), { childList: true });

            function mutationHandler() {
                var searchParameter = {artist: $(artistSelector).text(), title: $(titleSelector).text()};

                if (!lastSearchParameter || (lastSearchParameter && JSON.stringify(lastSearchParameter) !== JSON.stringify(searchParameter))) {
                    try {
                        findBy(new LyricsWiki(new Build()), searchParameter);
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
                    Persist.persist('lyric:' + parameter.artist + '-' + parameter.title, {lyric: lyric});
                    $lyricsPanel.trigger('update', {lyric: lyric});
                },
                function ($object) {
                    $lyricsPanel.trigger('update', {lyric: $object});
                }
            );
        }
    }
}
