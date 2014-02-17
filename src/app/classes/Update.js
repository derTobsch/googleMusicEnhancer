var Update = (function () {
    "use strict";

    var version = GM_info.script.version;
    var updateString = "last-update";

    var name = 'GoogleMusicEnhancer (GME)';
    var linkToNewVersion = 'http://files.cplusplus.tobsch.org/download/comunio_c.user.js';
    var newVersionCheckUrl = 'http://tobsch.org/?site=gme';

    return {
        check: function () {

            var lastUpdate = Persist.findBy(updateString);

            if (!!lastUpdate ||
                parseInt(lastUpdate) + parseInt(24 * 60 * 60 * 1000) < parseInt(String(new Date().getTime()))) {

                var newVersion = this.getNewVersion();

                var actVersionStripped = version.replace(/\./g, '');
                var newVersionStripped = newVersion.replace(/\./g, '');

                if (!!newVersionStripped && newVersionStripped > actVersionStripped) {
                    this.draw({'newVersion': newVersion});
                }
                else {
                    console.log('No new version of the ' + name + ' available. Yours:' + newVersion + ' Server:' + version);
                }
            }
        },

        draw: function (options) {

            var newVersionText = 'A new version of the ' + name + ' is available.<br><br>';
            newVersionText += "Your version: " + version + "<br>";
            newVersionText += "Brand new version: " + options.newVersion + "<br><br><br>";

            Build.blackOut({classesToHide: '.update-box'});

            var updateDiv = jQuery('<div></div>')
                .css({
                    left: (jQuery(document).width() / 2) - 250
                })
                .attr({
                    id: 'update-box',
                    class: 'update-box'
                })
                .append(jQuery('<div><h2>New version available</h2></div>').addClass("update-header"))
                .append(jQuery('<div>' + newVersionText + '</div>')
                    .addClass("update-body")
                    .append(
                        jQuery('<a>' + name + " " + options.newVersion + '</a>')
                            .attr({href: linkToNewVersion,title: name + ' ' + version})
                    )
                );

            jQuery('body').append(updateDiv);

            Persist.persist(updateString, String(new Date().getTime()));
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