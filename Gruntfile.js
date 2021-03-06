module.exports = function(grunt) {

	/*grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-watch');*/

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Grunt express - our webserver
		// https://github.com/blai/grunt-express
		express: {
			all: {
				options: {
					//bases: ['C:\\Users\\ljablonski\\Documents\\workingProgress\\CVIP\\CVIP-Series'],
					bases: ['D:\\workingProgress-D\\CVIP\\CVIP-Series'],
					port: 8080,
					hostname: "0.0.0.0",
					livereload: true
				}
			}
		},

		wiredep: {
			task: {
			//src: ['CVIP_seriesManagement.html']
			src: ['CVIP_SM-app.html']
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: ['CVIP_SM-app.html'],
			},
			js: {
				files: ['components/**/*.js'],
				
			},
			files: ['bower_components/*'],
			tasks: ['wiredep']
		},
		// grunt-open will open your browser at the project's URL
		// https://www.npmjs.org/package/grunt-open
		open: {
			all: {
			path: 'http://localhost:8080/CVIP_SM-app.html'
		}
	}
	});

	//grunt.registerTask('default', ['wiredep', 'watch']);

	// Creates the `server` task
	grunt.registerTask('server', [
		'wiredep',
		'express',
		'open',
		'watch'
	]);
};