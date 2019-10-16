module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            app: {
                src: [
                    'src/nognog.js'
                ],
                dest: 'src/nognog.min.js'
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.registerTask('minify', ['uglify']);
};