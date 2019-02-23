'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const postcss = require('gulp-postcss');
const pxtoviewport = require('postcss-px-to-viewport');
const concat = require('gulp-concat');
const del = require('del');

gulp.task('clean', function (cb) {
  return del(['./lib'], cb);
});

gulp.task('compile', ['clean'], function() {
  var processors = [
    pxtoviewport({
      viewportWidth: 750, // 视窗的宽度
      viewportHeight: 1334, // 视窗的高度
      unitPrecision: 3, //  小数点位数
      minPixelValue: 1, // 小于或等于`1px`不转换
      mediaQuery: false // 允许在媒体查询中转换`px`
    })
  ];
  return gulp.src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    // .pipe(concat('index.css'))
    .pipe(postcss(processors))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'));
});

gulp.task('build', ['clean', 'compile']);
