[![Build Status](https://travis-ci.org/derTobsch/googleMusicEnhancer.svg?branch=master)](https://travis-ci.org/derTobsch/googleMusicEnhancer) [![devDependency Status](https://david-dm.org/derTobsch/googleMusicEnhancer/dev-status.svg)](https://david-dm.org/derTobsch/googleMusicEnhancer#info=devDependencies)

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

License
====================================================
The MIT License (MIT)

Copyright (c) 2014 Tobias Schneider

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

