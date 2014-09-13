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
                    replacements: [
                        {
                            pattern: /\r?\n|\r|\s{2,}/g,
                            replacement: ''
                        },
                        {
                            pattern: /'/g,
                            replacement: "\""
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
                            replacement: function (match, p1, offset, string) {
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
        jshint: {
            files: ['src/app/**/*.js', 'tests/app/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        qunit: {
            files: [ "tests/**/*.html" ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'string-replace']);

};
