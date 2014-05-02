var Update = (function () {
    "use strict";

    var version = GM_info.script.version;
    var updateString = "last-update";

    var name = 'GoogleMusicEnhancer (GME)';
    var linkToNewVersion = 'http://www.tobsch.org/downloads/GoogleMusicEnhancer.user.js';
    var newVersionCheckUrl = 'http://tobsch.org/?site=GoogleMusicEnhancer';

    return {
        check: function (force) {

            var lastUpdateTime = Persist.findBy(updateString);

            if (force === true || lastUpdateTime === undefined ||
                parseInt(lastUpdateTime) + parseInt(24 * 60 * 60 * 1000) < parseInt(String(new Date().getTime()))) {

                var newVersion = this.getNewVersion();

                var actVersionStripped = parseInt(version.replace(/\./g, ''));
                var newVersionStripped = parseInt(newVersion.replace(/\./g, ''));

                if (!!newVersionStripped && newVersionStripped > actVersionStripped) {
                    this.draw({'newVersion': newVersion});
                }
                else {
                    console.log('No new version of the ' + name + ' available ' + newVersion + ' <= ' + version);
                }

                Persist.persist(updateString, String(new Date().getTime()));
            }
        },

        draw: function (options) {

            var newVersionText = 'A new version of the ' + name + ' is available.<br><br>';
            newVersionText += "Your version: " + version + "<br>";
            newVersionText += "Brand new version: " + options.newVersion + "<br><br><br>";

            Build.blackOut({classesToHide: '.update-box'});

            var updateDiv = $('<div></div>')
                .css({
                    left: ($(document).width() / 2) - 250,
                    'z-index': '500'
                })
                .attr({
                    id: 'update-box',
                    class: 'update-box'
                })
                .append($('<div><h2>New version available</h2></div>').addClass("update-header"))
                .append($('<div>' + newVersionText + '</div>')
                    .addClass("update-body")
                    .append(
                        $('<a>' + name + " " + options.newVersion + '</a>')
                            .attr({href: linkToNewVersion, title: name + ' ' + version})
                    )
                );

            $('body').append(updateDiv);
        },

        getNewVersion: function () {
            var response = GM_xmlhttpRequest({
                method: 'GET',
                synchronous: 'true',
                url: newVersionCheckUrl
            });

            if (response.status === 200) {
                return $('#projectVersion', response.responseText).html();
            }

            return undefined;
        }
    };

}());