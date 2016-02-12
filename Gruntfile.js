module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		wiredep: {
			task: {
			//src: ['CVIP_seriesManagement.html']
			src: ['CVIP_SM-app.html']
			}
		},

		watch: {
			files: ['bower_components/*'],
			tasks: ['wiredep']
		}
	});

	grunt.registerTask('default', ['wiredep', 'watch']);

};