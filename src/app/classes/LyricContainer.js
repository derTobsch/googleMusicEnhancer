function LyricContainer($parent, build) {
    'use strict';

    var $lyricsClip, $lyricsPanel, $lyricsHeader, $lyricsBody;
    var $overlayLoading;


    if (typeof build === 'undefined') {
        throw 'Build object undefined';
    }

    if (typeof $parent === 'undefined') {
        throw 'Please define a selector';
    }
    var Build = build;

    init($parent);

    return {
        registerToggler: function () {
            if ($lyricsClip) {
                $lyricsClip.on('click', function () {
                    $lyricsPanel.toggleClass('clicked un-clicked');
                });
            }

            return this;
        },

        registerEvents: function () {
            if ($lyricsPanel) {
                $lyricsPanel
                    .on('add-loading-overlay', function () {
                        if ($overlayLoading) {
                            $lyricsBody.append($overlayLoading);
                        }
                    })
                    .on('update', function (event, parameter) {
                        if (parameter) {
                            if (parameter.title && parameter.artist) {
                                $lyricsHeader.html(parameter.artist + ' - ' + parameter.title);
                            }

                            if (parameter.lyric) {
                                $lyricsBody.html(parameter.lyric);
                            }
                        }
                    });
            }

            return this;
        }
    };

    function init(){
        $lyricsPanel = Build.div({attr: {class: 'lyrics-panel un-clicked', id: 'lyrics-panel'}});
        $lyricsClip = Build.div({attr: {class: 'lyrics-clip', id: 'lyrics-clip'}, text: 'Lyric'});
        $lyricsHeader = Build.div({attr: {class: 'lyrics-header', id: 'lyrics-header'}, text: 'Lyrics Panel'});
        $lyricsBody = Build.div({attr: {class: 'lyrics-body', id: 'lyrics-body'}, text: 'I can not hear a sound. Play something loud!' });

        $parent.append($lyricsPanel.append($lyricsClip).append($lyricsHeader).append($lyricsBody));

        $overlayLoading = $('<div id="loading-overlay" data-type="regular-loading-overlay"></div>');
    }
}