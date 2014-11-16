var gulp = require('gulp');

var browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    critical = require('critical'),
    file = require('gulp-file'),
    inlinesource = require('gulp-inline-source'),
    copy = require('gulp-copy'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    stylish = require('jshint-stylish'),
    jshint = require('gulp-jshint');

var reload = browserSync.reload;

gulp.task('default', ['process-js', 'less', 'my-critical', 'images', 'lib'], function () {

  browserSync({
    server: {
      baseDir: './Deploy'
    }
  });

  gulp.watch(['css/**/*.less'], {cwd: 'Code'}, ['less', 'my-critical']);
  gulp.watch(['js/modules/**/*.js', 'js/*.js'], {cwd: 'Code'}, ['process-js']);
  gulp.watch(['*.html'], {cwd: 'Code'}, ['my-critical']);
  gulp.watch(['img/**/*.*'], {cwd: 'Code'}, ['images']);
  gulp.watch(['lib/**/*.*'], {cwd: 'Code'}, ['lib']);

  gulp.watch(['**/*.*'], {cwd: 'Deploy'}, reload);

});

gulp.task('images', function () {
  return gulp.src('Code/img/**/*.*').pipe(gulp.dest('Deploy/img'))
});

gulp.task('lib', function () {
  return gulp.src('Code/lib/**/*.*').pipe(gulp.dest('Deploy/lib'))
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

gulp.task('lint', function () {
  return gulp.src(['Code/js/*.js', 'Code/js/modules/**/*.js' ])
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
});

gulp.task('process-js', ['lint'], function () {
  return gulp.src(['Code/js/define.js', 'Code/js/lib/**/*.*', , 'Code/js/modules/**/*.*', 'Code/js/app.js'])
          .pipe(concat('app.js'))
          .pipe(uglify())
          .pipe(gulp.dest('Deploy/js'));
});