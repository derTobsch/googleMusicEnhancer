var Update = (function () {
    'use strict';

    var version = GM_info.script.version;
    var updateString = 'last-update';

    var name = 'GoogleMusicEnhancer (GME)';
    var linkToNewVersion = 'http://www.tobsch.org/downloads/GoogleMusicEnhancer.user.js';
    var newVersionCheckUrl = 'http://tobsch.org/?site=GoogleMusicEnhancer';

    var Persist;

    return {
        init: function ($updateButton, persist) {
            if (typeof $updateButton === 'undefined' || typeof persist === 'undefined') {
                throw 'Update button and/or persist object undefined';
            }
            Persist = persist;

            if ($updateButton) {
                var that = this;
                $updateButton.on('click', function () {
                    that.check(true);
                });
            }

            return this;
        },

        check: function (force) {
            var lastUpdateTime = Persist.findBy(updateString);

            if (force === true || lastUpdateTime === undefined ||
                parseInt(lastUpdateTime) + parseInt(24 * 60 * 60 * 1000) < parseInt(String(new Date().getTime()))) {

                var newVersion = this.getNewVersion();

                if (newVersion) {
                    var actVersionStripped = parseInt(version.replace(/\./g, ''));
                    var newVersionStripped = parseInt(newVersion.replace(/\./g, ''));

                    if (!!newVersionStripped && newVersionStripped > actVersionStripped) {
                        draw({'newVersion': newVersion});
                    }
                    else {
                        console.log('No new version of the ' + name + ' available ' + newVersion + ' <= ' + version);
                    }

                    Persist.persist(updateString, String(new Date().getTime()));
                }
            }

            return this;
        },

        getNewVersion: function() {
            var response = GM_xmlhttpRequest({
                method: 'GET',
                synchronous: 'true',
                url: newVersionCheckUrl
            });

            if (response.status === 200) {
                return $(response.responseText).find('#projectVersion').text();
            }
            return undefined;
        }
    };

    function draw(options) {

        var newVersionText = 'A new version of the ' + name + ' is available.<br><br>';
        newVersionText += 'Your version: ' + version + '<br>';
        newVersionText += 'Brand new version: ' + options.newVersion + '<br><br><br>';

        blackOut({classesToHide: '.update-box'});

        var updateDiv = $('<div></div>')
            .css({
                left: ($(document).width() / 2) - 250,
                'z-index': '500'
            })
            .attr({
                id: 'update-box',
                class: 'update-box'
            })
            .append($('<div><h2>New version available</h2></div>').addClass('update-header'))
            .append($('<div>' + newVersionText + '</div>')
                .addClass('update-body')
                .append(
                $('<a>' + name + ' ' + options.newVersion + '</a>')
                    .attr({href: linkToNewVersion, title: name + ' ' + version})
            )
        );

        $('body').append(updateDiv);
    }

    function blackOut(options) {
        var blackCurtain = Build.div(
            {
                css: {
                    'width': $(document).width(),
                    'height': $(document).height(),
                    'top': '0',
                    'left': '0',
                    'position': 'absolute',
                    'z-index': '499',
                    'background-color': 'rgb(0, 0, 0)'
                },
                attr: {
                    id: 'black-curtain'
                }
            })
            .fadeTo('slow', 0.7)
            .click(function () {
                $(this).hide();
                $(options.classesToHide).hide();
            });

        $('body').prepend(blackCurtain);
    }

}());