// ==UserScript==
// @name            GoogleMusicEnhancer (GME)
// @version         0.1.0
// @namespace       http://www.tobsch.org/
// @author			Tobias Schneider
// @homepage		http://www.tobsch.org
// @licence			http://creativecommons.org/licenses/by-nc-sa/3.0/de/
// @description     Improvements and better usability for google music
//
// @include			http://music.google.com/music/listen*
// @include			https://music.google.com/music/listen*
// @include			http://play.google.com/music/listen*
// @include			https://play.google.com/music/listen*
//
// @require         http://code.jquery.com/jquery-2.1.0.min.js
// @require         https://jquery-json.googlecode.com/files/jquery.json-2.4.min.js
//
// grant            GM_addStyle
// grant            GM_xmlhttpRequest
// grant            GM_setValue
// grant            GM_getValue
// grant            GM_deleteValue
// grant            GM_listValues
// grant            GM_info
// ==/UserScript==

/***************************************************************************************************************************************************************************************************************************
 *
 * Copyright notice
 *
 * (c) 2011-Present Tobias Schneider
 *
 * http://tobsch.org
 *
 * All rights reserved.
 *
 *
 * THIS SOFTWARE IS PROVIDED BY TOBIAS SCHNEIDER ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL TOBIAS SCHNEIDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * This script is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * This copyright notice MUST APPEAR in all copies of this script
 *
 *
 * License: Creative Commons Version 3.0 - http://creativecommons.org/licenses/by-nc-sa/3.0/de/
 **************************************************************************************************************************************************************************************************************************/

GM_addStyle("<!-- @import style.css -->");

$(function () {
    "use strict";

    Update.check();

    $('.music-banner-icon').on('click', function () {
        Update.check(true);
    });

    $('#main')
        .append(
            Build.div({attr:{class: 'lyrics-panel un-clicked', id: 'lyrics-panel', title: 'Hit to reload lyric'}})
                .append(
                    Build.div({attr: {class: 'lyrics-clip', id: 'lyrics-clip'}, text: 'Lyric'}).on('click', function () {
                        $(this).parent('div.lyrics-panel').toggleClass("clicked un-clicked");
                    })
                )
                .append(
                    Build.div({attr:{class: 'lyrics-header', id: 'lyrics-header'}, text: 'Lyrics Panel'})
                )
                .append(
                    Build.div({attr:{class: 'lyrics-body', id: 'lyrics-body'}, text: 'I can not hear a sound. Play something loud!' })
                )
        ).on('click', 'div.hover-button[data-id="play"]', function () {
            window.setTimeout(collectAndSearch, 500);
        });

    $('div#lyrics-panel').on('click', function () {
        window.setTimeout(collectAndSearch, 500);
    });
    $('div.player-middle').on('click', 'button[data-id="rewind"], button[data-id="forward"]',function () {
        window.setTimeout(collectAndSearch, 500);
    }).on('click', 'button[data-id="play-pause"]:not(".playing")', function () {
        window.setTimeout(collectAndSearch, 500);
    });

/*    var title = $('#playerSongTitle').text();
    setInterval(function () {
        var $songTitle = $('#playerSongTitle');
        if ($songTitle.text() !== title) {
            collectAndSearch();
            title = $songTitle.html();
        }
    }, 20000);*/

    function collectAndSearch() {
        if ($('#lyrics-panel').hasClass("clicked")) {
            var title = $('#playerSongTitle').text();
            var artist = $('#player-artist').text();

            if (!!title && !!artist) {
                Lyric.search({artist: artist, title: title}, LyricsWiki);
            }
        } else {
            console.log("Lyrics panel closed. Lyric will be get later.");
        }
    }


}); // Ready Function