GoogleMusicEnhancer
===================

Will enhance your google music experience.

This user script can be used to receive lyrics and show them directly at google music.
It will receive the new lyrics when a new song is played.

Download latest release at
http://tobsch.org/?site=GoogleMusicEnhancer

![Google Music lyrics](http://tobsch.org/img/GoogleMusicEnhancer/927cf659a1ef.png)


How to 'build' this project:
====================================================
Clone this repo, install `grunt`:

```sh
git clone git://github.com/derTobsch/googleMusicEnhancer.git
cd googleMusicEnhancer
npm install
```

Run `grunt` to `jshint`, `qunit`,  `concat` and `string-replace` release.

```sh
grunt
```

After that, the userscript was build in `dist/` with the name `GoogleMusicEnhancer.user.js`


How to run the tests:
====================================================
Follow instructions in `How to 'build' this project...`

Run `grunt` to run `jshint` and `qunit`.

```sh
grunt test
```
