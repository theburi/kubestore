'use strict';

var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , envify = require('gulp-envify')
  , uglify = require('gulp-uglify')
  , sass = require('gulp-sass')
  , rename = require('gulp-rename')
  , autoprefixer = require('gulp-autoprefixer')
  , htmlmin = require('gulp-htmlmin')
  , replace = require('gulp-replace')
  , gutil = require('gulp-util');

var uglifyjs = require('uglify-es'); // can be a git checkout 
                                     // or another module (such as `uglify-es` for ES6 support) 
var composer = require('gulp-uglify/composer');
var minify = composer(uglifyjs, console);


var environment = process.env.NODE_ENV;
if (!environment) environment = 'production'

gulp.task('build', [ 'build-assets', 'build-html']);

gulp.task('build-assets', ['build-js', 'build-css']);

gulp.task('build-js', [
  'build-js-main'
]);

['main'].forEach(function (name) {
  gulp.task('build-js-' + name, _buildJs(name));
});

function _buildJs(name) {
  return function () {
    return gulp.src('./' + name + '/index.js')
      .pipe(browserify())
      .pipe(envify({'NODE_ENV': environment}))
      .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
      .pipe(rename(name + '.js'))
      .pipe(gulp.dest('assets/' + 'production'));
  };
}

// Stylesheets

gulp.task('build-css', [
  'build-css-main',
  'build-css-preload-screen'
]);

['main', 'preload-screen'].forEach(function (name) {
  gulp.task('build-css-' + name, _buildCss(name));
});

function _buildCss(name) {
  return function () {
    return gulp.src('css/' + name + '.scss')
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('assets/' + 'production'));
  };
}

// Html
gulp.task('build-html', [
  'build-html-main'
]);

['main'].forEach(function (name) {
  gulp.task('build-html-' + name, _buildHtml(name));
});

function _buildHtml(name) {
  var now = Date.now();
  return function () {
    return gulp.src('assets/' + name + '.html')
      .pipe(replace(/\/system\/assets\/(.+?)\.(css|js)/g, '/system/assets/$1.$2?' + now))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('assets/' + 'production'))
  }
}

gulp.task('default', [
  'build-js',
  'build-css',
  'build-html'
]);
