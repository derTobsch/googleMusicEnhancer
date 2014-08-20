// ==UserScript==
// @name            GoogleMusicEnhancer (GME)
// @version         0.4.0
// @namespace       http://www.tobsch.org/
// @author          Tobias Schneider
// @homepage        http://www.tobsch.org
// @licence         http://www.opensource.org/licenses/mit-license.php
// @description     Improvements and better usability for google music
//
// @include         https://play.google.com/music/listen*
//
// @require         http://code.jquery.com/jquery-2.1.1.min.js
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

    Update
        .init($('.music-banner-icon'), Persist)
        .check(false);

    LyricContainer
        .init($('#main'))
        .registerToggler()
        .registerEvents();

    Lyric
        .init($('#lyrics-panel'), Persist)
        .registerSongChangeListener('#playerSongInfo', '#playerSongTitle', '#player-artist');
});