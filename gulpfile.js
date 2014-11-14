var gulp = require('gulp');

var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var critical = require('critical');

var reload = browserSync.reload;
var runLess = ['less', 'my-critical'];

gulp.task('default', function() {

	gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js', 'img/**/*.*'], {cwd: 'Deploy'}, reload);
  	gulp.watch(['css/**/*.less'], {cwd: 'Code'}, runLess);

  	gulp.start('less', 'serve', 'my-critical');
});

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'Deploy'
    }
  });
});

gulp.task('less', function () {
	gulp.src('Code/css/main.less')
  	.pipe(sourcemaps.init())
  	.pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
 	 	.pipe(minifyCSS())
  	.pipe(sourcemaps.write('maps', {sourceRoot: '/Deploy'}))
  	.pipe(gulp.dest('Deploy/css'))  
});

gulp.task('my-critical', function () {
  critical.generate({
    base: 'Deploy/',
    src: 'index.html',
    dest: 'css/critical.css',
    minify: true,
    width: 1024,
    height: 760
  });
});