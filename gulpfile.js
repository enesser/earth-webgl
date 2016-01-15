'use strict';

/* global require, process, __dirname: true */

require('babel-register');

const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpif = require('gulp-if'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

/**
 * Process favicon
 */
gulp.task('favicon', () => {
    return gulp.src('./raw/favicon.ico')
        .pipe(gulp.dest('./public'))
        .pipe(livereload());
});

/**
 * Process 3D OBJ files including geometry and materials
 */
gulp.task('models', () => {
    return gulp.src('./raw/models/**')
        .pipe(gulp.dest('./public/models/'))
        .pipe(livereload());
});


/**
 * Process Sass files
 */
gulp.task('sass', () => {
    return gulp.src('./raw/scss/**')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

/**
 * Process JavaScript files
 */
gulp.task('js', () => {
    return gulp.src('./raw/js/**')
        .pipe(sourcemaps.init())
        .pipe(gulpif('!vendor/**', babel({
            presets: ['es2015']
        })))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});

/**
 * Watch task
 */
gulp.task('watch', () => {
    gulp.watch('./raw/models/**', ['models']);
    gulp.watch('./raw/scss/**', ['sass']);
    gulp.watch('./raw/js/**', ['js']);
    gulp.watch('./raw/favicon.ico', ['favicon']);
});

/**
 * Development mode
 */
gulp.task('develop', () => {
    livereload.listen();
    nodemon({
        script: 'bin/www',
        ext: 'js handlebars coffee',
        stdout: false
    }).on('readable', function() {
        this.stdout.on('data', function(chunk) {
            if (/^Earth WebGL Demo listening on port/.test(chunk)) {
                livereload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});

/**
 * Default task
 */
gulp.task('default', [
    'favicon',
    'models',
    'sass',
    'js',
    'develop',
    'watch'
]);

/**
 * Install task
 */
gulp.task('install', [
    'favicon',
    'models',
    'sass',
    'js'
]);