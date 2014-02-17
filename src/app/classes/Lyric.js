var Lyric = (function () {
    "use strict";

    var baseGoogleUrl = 'http://www.google.com/';
    var parameter;

    return {

        search: function (parameter, strategy) {
            if (typeof parameter === 'undefined' || typeof strategy !== 'object') {
                return;
            }

            this.parameter(parameter);
            this.findBy(strategy);

        },

        findBy: function (strategy) {
            var par = this.parameter();
            if ( par === undefined || typeof strategy !== 'object') {
                return;
            }

            $('#lyrics-header').html(par.artist + ' - ' + par.title);

            var persistLyric = Persist.findBy('lyric:' + par.artist + '-' + par.title);

            if (!!persistLyric) {
                $('#lyrics-body').html(persistLyric.lyric);
            }
            else {
                $('#lyrics-body').append($('#loadingOverlay').clone().show());

                var that = this;
                strategy.execute(par.artist, par.title,
                    function (lyric) {
                        var par = that.parameter();

                        $('#lyrics-body').html(lyric);
                        Persist.persist('lyric:' + par.artist + '-' + par.title, {lyric: lyric});
                    },
                    function (name,url) {
                        var par = that.parameter();
                        var googleSearchString = encodeURI(baseGoogleUrl + '?q=lyrics+' + par.artist + '+"' + par.title + '"#q=lyrics+' + par.artist + '+"' + par.title);

                        $('#lyrics-body').html('')
                            .append(
                                Build.div({text: '<b>Oh No. No lyric found.<b>', class: 'lyrics-not-found-text space-top'})
                            ).append(
                                Build.div({text: 'Add one and make this experience a little bit better!', class: 'lyrics-not-found-text'})
                            ).append(
                                Build.div({text: '<b>First</b> search for the correct lyric. YippieYeah!', class: 'lyrics-not-found-text space-top'})
                            ).append(
                                Build.div({class: 'lyrics-not-found-link'}).append(Build.link({href: googleSearchString, text: 'Search for \'' + par.artist + ' - ' + par.title + '\''}))
                            ).append(
                                Build.div({text: '<b>Then</b> add it to ' + name + '. Awesome!', class: 'lyrics-not-found-text space-top'})
                            ).append(
                                Build.div({class: 'lyrics-not-found-link'}).append(Build.link({href: url, text: 'Add this great song!'}))
                            ).append(
                                Build.div({text: '<b>At Last</b> click here to load the lyric you provided', class: 'lyrics-not-found-text space-top'})
                            );
                    });
            }

        },
        parameter: function(par){
            if (typeof par !== 'undefined') {
                parameter = par;
            }
            return parameter;
        }

    };

}());