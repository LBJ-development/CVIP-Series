module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		
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
		}
	});

	grunt.registerTask('default', ['wiredep', 'watch']);

};