var gulp = require('gulp');
var sass = require('gulp-sass');
// var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer')
var rename = require("gulp-rename")
var del = require('del');
var htmlmin = require('gulp-htmlmin')
var jsonlint = require("gulp-jsonlint")
var runSequence = require('run-sequence');

gulp.task('sass', () => {
  return gulp.src('src/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(rename((path) => path.extname = '.wxss'))
    .pipe(gulp.dest('dist'))
});

gulp.task('jsonLint', () => {
  return gulp.src('src/**/*.json')
    .pipe(gulp.dest('dist'))
})
gulp.task('templates', () => {
  return gulp.src('src/**/*.wxml')
    .pipe(gulp.dest('dist'))
})
gulp.task('scripts', () => {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest('dist'))
})

// gulp.task('browserSync', function() {
//   browserSync({
//     server: {
//       baseDir: 'src'
//     }
//   })
// })

gulp.task('watch', function() {
  gulp.watch('src/**/*.wxss', ['sass']);
  gulp.watch('src/**/*.scss', ['sass']);
})


gulp.task('default', function(callback) {
  runSequence(['sass','jsonLint','templates','scripts'], 'watch',
    callback
  )
})