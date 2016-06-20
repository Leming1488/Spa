'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const postcss    = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpif = require('gulp-if');

const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const named = require('vinyl-named');

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
    .pipe(concat('index.css'))
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('css/') );

});

gulp.task('js', function () {
  let options = {
    entry: "./js/spa",
    output: {
      filename: "index.js",
      library: "SpaShell"
    },
    devtool: "source-map",

    // watch: NODE_ENV == 'development',
    // watchOptions: {
    //   aggregateTimeout: 100
    // },
    // devtool: NODE_ENV == 'development' ? 'source-map' : null,

    // plugins: [
    //   new webpack.EnvironmentPlugin('NODE_ENV', 'USER')
    // ]

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
          }
        }
      ]
    }
  };

  return gulp.src('js/**/*.js')
    // .pipe(named())
    .pipe(webpackStream(options))
    .pipe( gulp.dest('js/'));
})

gulp.task('watch', function () {
  gulp.watch('postcss/**/*.css', gulp.series('style'));
  gulp.watch('js/**/*.js', gulp.series('js'));
});
