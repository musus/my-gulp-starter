var gulp = require("gulp");
var sass = require("gulp-sass");
var ap	 = require("gulp-autoprefixer");
var browser   = require("browser-sync");
var plumber = require("gulp-plumber");
var cssmin = require("gulp-minify-css");
var imagemin = require("gulp-imagemin");
var glob = require('gulp-sass-glob');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var notify = require( 'gulp-notify' );


// js
gulp.task('js', function() {
	gulp.src(['assets/js/**/*.js'])
		.pipe(uglify())
		.pipe( gulp.dest('assets/js'));
	});


// jade
gulp.task('jade', function() {
	return gulp
		.src('src/jade/**/*.jade')
		.pipe(plumber())
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('./'))
	});


gulp.task('sass', function () {
    return gulp
        .src('src/sass/*.scss')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(glob())
        .pipe(sass())
        .pipe(ap())
        .pipe(cssmin())
        .pipe(gulp.dest('assets/css'));
});

// browser
gulp.task("browser-sync", function () {
    browser({
        server: {
        	baseDir: "./",
        	index: "index.html"
        }
    });
});

gulp.task("bs-reload", function () {
    browser.reload();
});

// watch
gulp.task("watch",["browser-sync"], function() {
		gulp.watch("src/sass/**/*.scss",["sass","bs-reload"]);
		gulp.watch("src/jade/**/*.jade",["jade","bs-reload"]);
		gulp.watch("*.php", ["bs-reload"]);
		gulp.watch("assets/css/*.css", ["bs-reload"]);
		gulp.watch("src/js/**/*.js",["js","bs-reload"]);
	});

// imagemin
gulp.task("imagemin", function(){
	gulp.src("src/img/*.{png,jpg,gif,svg}")
		.pipe(imagemin())
		.pipe(gulp.dest("assets/img"));
	});

// build
gulp.task("build",["sass","imagemin","jade","js"]);

gulp.task('default', ['sass', 'imagemin','jade','js'], function() {
  console.log('done');
});