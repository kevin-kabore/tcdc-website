var gulp = require('gulp');

var php = require('gulp-connect-php'); // php
var jshint = require("gulp-jshint"); // js lint
var sass = require('gulp-sass'); // sass compiling
var autoprefixer = require('gulp-autoprefixer'); // adding vendor prefixes
var useref = require('gulp-useref'); // read html to determine how to combine files
var uglify = require('gulp-uglify'); // minify javascript
var gulpIf = require('gulp-if'); // allow conditionals in pipes
var concat = require('gulp-concat'); // conctenate files
var cssnano = require('gulp-cssnano'); // minify css
var imagemin = require('gulp-imagemin'); // image optimization
var cache = require('gulp-cache'); // cache already processed images to speed up future jobs
var del = require('del'); // delete existing build folder so old files aren't left behind
var runSequence = require('run-sequence'); // allows a sequence of tasks rather than all tasks simultaneously
var sourcemaps = require('gulp-sourcemaps'); // generates source maps
var plumber = require('gulp-plumber'); // handles pipe errors so watch tasks don't fail on errors
var notify = require('gulp-notify'); // display plumber errors in the terminal
var phplint = require('gulp-phplint'); // Validate php files
var htmlhint = require("gulp-htmlhint"); // validate html files
var sort = require("sort-stream"); // sort streams
var browserSync = require('browser-sync'); // allow the browser to automatically sync with local changes

var reload = browserSync.reload;

var onError = function(error) { // Display error messages in the console in a readable format
	notify.onError({ // Display the error message in the console
		message: error.message
	})(error);
	this.emit('end'); // Allow task to end gracefully without killing watch tasks
};

gulp.task('css', function(){
	return gulp.src('src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({errLogToConsole: true}))
		.pipe(autoprefixer('last 4 version'))
		.pipe(cssnano())
		.pipe(concat('main.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
	gulp.src(['src/js/**/*.js','!src/js/lib/**/*.js','!src/js/**/*.min.js']) // path to your files excluding lib folder and .min files
		.pipe(plumber({errorHandler: onError})) //if the validator crashes, fail gracefully
	    .pipe(jshint('.jshintrc'))
	    .pipe(jshint.reporter('default'));
	
	gulp.src(['src/js/lib/**/*.js','src/js/**/*.js']) // path to your files
		.pipe(sort(function(a, b){	// make sure site.js is loaded last
			aScore = a.path.match(/site.js$/) ? 1 : 0;
			bScore = b.path.match(/site.js$/) ? 1 : 0;
			return aScore - bScore;
		}))
	    .pipe(sourcemaps.init())
	    .pipe(concat('main.min.js'))
		.pipe(plumber({errorHandler: onError})) //if the minifier crashes, fail gracefully
	    .pipe(uglify())
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest('build/js'))
	    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('images', function(){ //optimize all image files
	return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(cache(imagemin({interlaced: true})))
		.pipe(gulp.dest('build/img'))
});

gulp.task('fonts', function() { //copy over fonts, since fonts are already optimized we only need to copy them as is
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('build/fonts'))
});

gulp.task('media', function() { //copy any miscellaneous media files over
	return gulp.src('src/media/**/*')
		.pipe(gulp.dest('build/media'))
});
gulp.task('pages', function (callback) { //validate and copy html and php pages
	return gulp.src('src/**/*.+(php|html)')
		.pipe(plumber({errorHandler: onError})) //if the validator crashes, fail gracefully
		.pipe(phplint())
		.pipe(htmlhint())
		.pipe(gulp.dest('build/'))
});

// Static server
gulp.task('browser-sync', ['php'], function() {
	browserSync({
		proxy: 'localhost:3000',
		port: 8080,
		open: true,
		notify: false
	});
});

gulp.task('php', function() {
  php.server({base: 'build/', port: 3000, keepalive: true});
});

gulp.task('clean:build', function() { //delete the build folder, this is used when preparing a final build to remove any files that are no longer needed
	return del.sync('build/**/*');
});

gulp.task('cache:clear', function (callback) { //clear the cache for imagemin
	return cache.clearAll(callback);
});

gulp.task('build', function (callback) { //do a full build for the site
	runSequence('clean:build', ['css', 'js', 'images', 'fonts', 'media', 'pages'],
		callback
	);
});

gulp.task('watch', ['browser-sync'], function(){ //watch for changes to HTML, CSS, SASS and javascript files and automatically process them
	// gulp.run('browserSync')
	gulp.watch(['src/scss/**/*.scss','src/css/**/*.css']).on('change', function() {
		gulp.start('css');
		browserSync.reload();
	});
	gulp.watch(['src/js/**/*.js']).on('change', function() {
		gulp.start('js');
		browserSync.reload();
	});
	gulp.watch(['src/**/*.+(php|html)']).on('change', function() {
		gulp.start('pages');
		browserSync.reload();
	});
	gulp.watch(['src/img/**/*.+(png|jpg|jpeg|gif|svg)']).on('change', function() {
		gulp.start('images');
		browserSync.reload();
	});
});