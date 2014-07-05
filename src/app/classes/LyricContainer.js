var LyricContainer = (function () {
    'use strict';

    var $lyricsClip, $lyricsPanel, $lyricsHeader, $lyricsBody;


    return {
        init: function (selector) {
            if (!selector) {
                return this;
            }

            $lyricsClip = Build.div({attr: {class: 'lyrics-clip', id: 'lyrics-clip'}, text: 'Lyric'});
            $lyricsPanel = Build.div({attr: {class: 'lyrics-panel un-clicked', id: 'lyrics-panel', title: 'Hit to reload lyric'}});
            $lyricsHeader = Build.div({attr: {class: 'lyrics-header', id: 'lyrics-header'}, text: 'Lyrics Panel'});
            $lyricsBody = Build.div({attr: {class: 'lyrics-body', id: 'lyrics-body'}, text: 'I can not hear a sound. Play something loud!' });

            $(selector).append($lyricsPanel.append($lyricsClip).append($lyricsHeader).append($lyricsBody));

            return this;
        },

        registerToggler: function () {
            if ($lyricsClip) {
                $lyricsClip.on('click', function () {
                    $lyricsPanel.toggleClass('clicked un-clicked');
                });
            }

            return this;
        },

        registerSongChangeListener: function (changeListenerSelector, titleSelector, artistSelector) {
            var myObserver = new window.MutationObserver(mutationHandler);
            myObserver.observe(document.querySelector(changeListenerSelector), { childList: true });

            function mutationHandler() {
                var title = $(titleSelector).text();
                var artist = $(artistSelector).text();

                if (title && artist && parseInt($lyricsHeader.attr('hash')) !== Util.hashCode(artist, title)) {
                    try {
                        Lyric.search({artist: artist, title: title}, LyricsWiki);
                    } catch (e) {
                        console.log('GME: ' + e.message);
                    }
                }
            }

            return this;
        }
    };

}());