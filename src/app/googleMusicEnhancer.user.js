// ==UserScript==
// @name            GoogleMusicEnhancer (GME)
// @version         0.6.0
// @namespace       http://www.tobsch.org/
// @author          Tobias Schneider
// @homepage        http://www.tobsch.org/
// @licence         http://www.opensource.org/licenses/mit-license.php
// @description     Improvements and better usability for google music
//
// @include         https://play.google.com/music/listen*
//
// @require         http://code.jquery.com/jquery-2.1.3.min.js
//
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_info
//
// ==/UserScript==

GM_addStyle('<!-- @import style.css -->');

$(window).load(function () {
    'use strict';

    var persist = new Persist();
    var build = new Build();

    new Update(persist, build)
        .registerUpdateButtonEvent($('.music-banner-icon'))
        .check(false);

    new LyricContainer($('#main'), build)
        .registerToggler()
        .registerEvents();

    new Lyric($('#lyrics-panel'), persist)
        .registerSongChangeListener('#playerSongInfo', '#playerSongTitle', '#player-artist');
});