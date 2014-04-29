googleMusicEnhancer
===================

Will enhance your google music experience.

This user script can be used to receive lyrics and show them directly at google music.
It will receive the new lyrics when you:
* open the orange `Lyric` window
* click on next song
* click on previous song
* play a new song
* click on a lyric


![Google Music lyrics](http://tobsch.org/img/GoogleMusicEnhancer/927cf659a1ef.png)


How to 'buid' this project to one user.js file:
====================================================
Clone this repo, install `grunt`:

```sh
git clone git://github.com/derTobsch/googleMusicEnhancer.git
cd googleMusicEnhancer
npm install
```

Run `grunt` to `jshint`, `concat` and `string-replace` release.

```sh
grunt
```

After that the userscript was build in `dist/` with the name `GoogleMusicEnhancer.user.js`


How to run the tests:
====================================================
Follow instructions in `How to 'build' this project...`

Run `grunt` to run `jshint` and `qunit`.

```sh
grunt test
```