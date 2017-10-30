'use strict;'

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			build: './build'
		},
		browserify: {
			dev: {
				options: {
					watch: true,
					browserifyOptions: {
						debug: true,
					}
				},
				files: [{
					expand: true,
					cwd: './src/pages',
					src: '**/*.js',
					dest: './build/js'
				}]
			}
		},
		uglify: {
		    options: {
		      mangle: true
		    },
		    dist: {
		    	files: [{
					expand: true,
					cwd: './build/js',
					src: '**/*.js',
					dest: './build/js'
				}]
		    }
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean',
		'browserify:dev'
	]);
}