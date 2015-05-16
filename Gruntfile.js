module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

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
                    replacements: [
                        {
                            pattern: /\r?\n|\r|\s{2,}/g,
                            replacement: ''
                        },
                        {
                            pattern: /'/g,
                            replacement: '\"'
                        }
                    ]
                }
            },
            kit: {
                files: {
                    '<%= concat.dist.dest %>': '<%= concat.dist.dest %>'
                },
                options: {
                    replacements: [
                        {
                            pattern: /<!-- @import (.*?) -->/ig,
                            replacement: function (match, p1) {
                                return grunt.file.read(grunt.config.get('config.dist') + p1);
                            }
                        }
                    ]
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
        eslint: {
            options: {
                configFile: 'eslint.json'
            },
            target: [
                'src/*.js',
                'tests/*.js',
                'Gruntfile.js'
            ]
        },
        qunit: {
            all: [ 'tests/**/*.html' ]
        }
    });

    grunt.registerTask('test', [
        'eslint',
        'qunit'
    ]);

    grunt.registerTask('default', [
        'test',
        'concat',
        'string-replace'
    ]);
};
