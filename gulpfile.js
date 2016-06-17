'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const postcss    = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpif = require('gulp-if');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

gulp.task('style', function () {
  const syntax = require('postcss-scss');
  return gulp.src('postcss/**/*.css')
    .pipe( debug())
    .pipe(sourcemaps.init() )
    .pipe( postcss([ require('autoprefixer'), require('precss')]))
    .pipe(concat('main.css'))
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('css/') );

});

gulp.task('js', function () {
  return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
		.pipe(babel())
    .pipe(concat('main.js'))
    .pipe( gulp.dest('js/'));
})

gulp.task('watch', function () {
  gulp.watch('postcss/**/*.css', gulp.series('style'));
});
