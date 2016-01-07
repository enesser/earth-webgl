'use strict';

let gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('models', () => {
  gulp.src('./raw/models/**/*')
    .pipe(gulp.dest('./public/models/'))
    .pipe(livereload());
});

gulp.task('sass', () => {
  gulp.src('./raw/scss/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer('last 2 version'))
  .pipe(gulp.dest('./public/css'))
  .pipe(livereload());
});

gulp.task('js', () => {
  gulp.src('./raw/js/**/*.js')
  .pipe(gulp.dest('./public/js'))
  .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch('./raw/models/**/*', ['models']);
  gulp.watch('./raw/scss/**/*', ['sass']);
  gulp.watch('./raw/js/**/*', ['js']);
});

gulp.task('develop', () => {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js handlebars coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'models',
  'sass',
  'js',
  'develop',
  'watch'
  ]);
