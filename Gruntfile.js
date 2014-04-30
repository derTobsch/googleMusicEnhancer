module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            dist: 'dist/'
        },
        concat: {
            options: {
                separator: '\n\n'
            },
            dist: {
                src: ['src/app/*.user.js', 'src/app/classes/*.js'],
                dest: '<%= config.dist %><%= pkg.name %>.user.js'
            }
        },
        'string-replace': {
            dist: {
                files: {
                    '<%= config.dist %>style.css': 'src/app/style/style.css'
                },
                options: {
                    replacements: [{
                        pattern: /\r?\n|\r|\s{2,}/g,
                        replacement: ''
                    }]
                }
            },
            kit: {
                files: {
                    '<%= concat.dist.dest %>': '<%= concat.dist.dest %>'
                },
                options: {
                    replacements: [{
                        pattern: /<!-- @import (.*?) -->/ig,
                        replacement: function (match, p1, offset, string) {
                            return grunt.file.read(grunt.config.get('config.dist') + p1);
                        }
                    }]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= config.dist %><%= pkg.name %>.min.user.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
          files: ['src/app/**/*.js', 'tests/app/**/*.js'],
          options: {
              "maxerr" : 50, // {int} Maximum error before stopping

              // Enforcing
              "bitwise" : false,      // true: Prohibit bitwise operators (&, |, ^, etc.)
              "camelcase" : false,    // true: Identifiers must be in camelCase
              "curly" : true,         // true: Require {} for every new block or scope
              "eqeqeq" : true,        // true: Require triple equals (===) for comparison
              "forin" : true,         // true: Require filtering for..in loops with obj.hasOwnProperty()
              "immed" : false,        // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
              "indent" : 4,           // {int} Number of spaces to use for indentation
              "latedef" : false,      // true: Require variables/functions to be defined before being used
              "newcap" : false,       // true: Require capitalization of all constructor functions e.g. `new F()`
              "noarg" : true,         // true: Prohibit use of `arguments.caller` and `arguments.callee`
              "noempty" : true,       // true: Prohibit use of empty blocks
              "nonew" : false,        // true: Prohibit use of constructors for side-effects (without assignment)
              "plusplus" : false,     // true: Prohibit use of `++` & `--`
              "quotmark" : false,     // Quotation mark consistency:
                                      // false : do nothing (default)
                                      // true : ensure whatever is used is consistent
                                      // "single" : require single quotes
                                      // "double" : require double quotes
              "undef" : false,         // true: Require all non-global variables to be declared (prevents global leaks)
              "unused" : false,        // true: Require all defined variables be used
              "strict" : true,        // true: Requires all functions run in ES5 Strict Mode
              "trailing" : false,     // true: Prohibit trailing whitespaces
              "maxparams" : false,    // {int} Max number of formal params allowed per function
              "maxdepth" : false,     // {int} Max depth of nested blocks (within functions)
              "maxstatements" : false, // {int} Max number statements per function
              "maxcomplexity" : false, // {int} Max cyclomatic complexity per function
              "maxlen" : false,       // {int} Max number of characters per line

              // Relaxing
              "asi" : false,          // true: Tolerate Automatic Semicolon Insertion (no semicolons)
              "boss" : false,         // true: Tolerate assignments where comparisons would be expected
              "debug" : false,        // true: Allow debugger statements e.g. browser breakpoints.
              "eqnull" : false,       // true: Tolerate use of `== null`
              "es5" : false,          // true: Allow ES5 syntax (ex: getters and setters)
              "esnext" : false,       // true: Allow ES.next (ES6) syntax (ex: `const`)
              "moz" : false,          // true: Allow Mozilla specific syntax (extends and overrides esnext features)
                                      // (ex: `for each`, multiple try/catch, function expression…)
              "evil" : false,         // true: Tolerate use of `eval` and `new Function()`
              "expr" : false,         // true: Tolerate `ExpressionStatement` as Programs
              "funcscope" : false,    // true: Tolerate defining variables inside control statements"
              "globalstrict" : false, // true: Allow global "use strict" (also enables 'strict')
              "iterator" : false,     // true: Tolerate using the `__iterator__` property
              "lastsemic" : false,    // true: Tolerate omitting a semicolon for the last statement of a 1-line block
              "laxbreak" : false,     // true: Tolerate possibly unsafe line breakings
              "laxcomma" : false,     // true: Tolerate comma-first style coding
              "loopfunc" : false,     // true: Tolerate functions being defined in loops
              "multistr" : false,     // true: Tolerate multi-line strings
              "proto" : false,        // true: Tolerate using the `__proto__` property
              "scripturl" : false,    // true: Tolerate script-targeted URLs
              "smarttabs" : false,    // true: Tolerate mixed tabs/spaces when used for alignment
              "shadow" : false,       // true: Allows re-define variables later in code e.g. `var x=1; x=2;`
              "sub" : false,          // true: Tolerate using `[]` notation when it can still be expressed in dot notation
              "supernew" : false,     // true: Tolerate `new function () { ... };` and `new Object;`
              "validthis" : false,    // true: Tolerate using this in a non-constructor function

              // Environments
              "browser" : true,         // Web Browser (window, document, etc)
              "couch" : false,          // CouchDB
              "devel" : true,           // Development/debugging (alert, confirm, etc)
              "dojo" : false,           // Dojo Toolkit
              "jquery" : true,          // jQuery
              "mootools" : false,       // MooTools
              "node" : false,           // Node.js
              "nonstandard" : false,    // Widely adopted globals (escape, unescape, etc)
              "prototypejs" : false,    // Prototype and Scriptaculous
              "rhino" : false,          // Rhino
              "worker" : false,         // Web Workers
              "wsh" : false,            // Windows Scripting Host
              "yui" : false,            // Yahoo User Interface

              // Legacy
              "nomen" : false,          // true: Prohibit dangling `_` in variables
              "onevar" : false,         // true: Allow only one `var` statement per function
              "passfail" : false,       // true: Stop on first error
              "white" : false,          // true: Check against strict whitespace and indentation rules

            globals: {
              jQuery: true,
              console: true,
              module: true
            }
          }
        }, jasmine: {
           src: 'src/app/**/*.js',
           options: {
               specs: 'tests/app/**/*.js',
               vendor: 'tests/resources/**/*.js'
           }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jshint', 'jasmine']);

    grunt.registerTask('default', ['jshint', 'concat', 'string-replace']);

};
