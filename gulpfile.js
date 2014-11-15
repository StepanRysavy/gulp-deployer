var gulp = require('gulp');

var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var critical = require('critical');
var file = require('gulp-file');
var inlinesource = require('gulp-inline-source');
var copy = require('gulp-copy');
var debug = require('gulp-debug');

var reload = browserSync.reload;

gulp.task('default', function() {

	gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js', 'img/**/*.*'], {cwd: 'Deploy'}, reload);
  gulp.watch(['css/**/*.less'], {cwd: 'Code'}, ['less', 'my-critical']);
  gulp.watch(['*.html'], {cwd: 'Code'}, ['my-critical']);

  gulp.start('serve', 'less', 'my-critical');
});

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './Deploy'
    }
  });
});

gulp.task('less', function () {
	return gulp.src('Code/css/main.less')
  	.pipe(sourcemaps.init())
  	.pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
 	 	.pipe(minifyCSS())
  	.pipe(sourcemaps.write('maps', {sourceRoot: 'Deploy'}))
  	.pipe(gulp.dest('Deploy/css'));
});

gulp.task('my-critical', ['less'], function () {

  critical.generate({
    base: 'Deploy',
    src: 'index.html',
    css: 'Deploy/css/main.css',
    dest: 'css/critical.css',
    minify: true,
    width: 1024,
    height: 760
  }, function (err, o) {
    gulp.start('inlinesource');
  });

});

gulp.task('copy-html', function () {
  return gulp.src('Code/*.html')
             .pipe(gulp.dest('Deploy'));
});

gulp.task('inlinesource', ['copy-html'], function () {
    return gulp.src('Deploy/*.html')
        .pipe(inlinesource({rootpath: 'Deploy'}))
        .pipe(gulp.dest('Deploy'));
});

gulp.task('reload', function () {
  reload();
});