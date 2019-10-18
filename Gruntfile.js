module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            app: {
                src: [
                    'src/vendor/axios.min.js',
                    'src/vendor/fingerprint2.min.js',
                    'src/vendor/jsrsasign-all-min.js',
                    'src/nognog.js',
                ],
                dest: 'src/nognog.min.js'
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.registerTask('minify', ['uglify']);
};