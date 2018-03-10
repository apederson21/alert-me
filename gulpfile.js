// include required modules
var connect = require('gulp-connect'),
    del = require('del'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence')
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

// tasks to run, i.e. "gulp build" via command line
gulp.task("build", ["clean"], function(callback) {
  runSequence("copyHTML", "copyCSS", "jshint", "bundle", "uglifyjs", "reload", callback);
});
gulp.task("watch",["watchJS", "watchCSS", "watchHTML", "startServer"]);
gulp.task("server",["startServer"]);
gulp.task("dev", function(callback) {
  runSequence("build", "watch", callback);
});

// clean out build directory
gulp.task("clean", function() {
  del('./build/*')
});

// copy html files
gulp.task("copyHTML", function() {
    return gulp.src("./app/html/*.*")
    .pipe(gulp.dest("./build"));
});

// copy css files
gulp.task("copyCSS", function() {
    return gulp.src("./app/css/*.*")
    .pipe(gulp.dest("./build"));
});

// configure the jshint task
gulp.task("jshint", function() {
  return gulp.src('.app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watchJS', function() {
  gulp.watch('app/**/*.js', ['build']);
});
gulp.task('watchCSS', function() {
  gulp.watch('app/**/*.css', ['build']);
});
gulp.task('watchHTML', function() {
  gulp.watch('app/**/*.html', ['build']);
});

// convert ES6 code in all js files in app/js folder and copy to
// build folder as alertMe.js
gulp.task("bundle", function() {
    return browserify({
        entries: [
          "./app/js/index.js",
          "./app/js/dom.js",
          "./app/js/config/get.js",
          "./app/js/config/update.js"
        ]
    })
    // .transform(babelify.configure({
    //     presets : ["env"]
    // }))
    .transform('babelify', {presets: ['env']})
    .bundle()
    .pipe(source("alertMe.js"))
    .pipe(gulp.dest("./build"));
});

// uglify alertMe.js and output .min version
gulp.task('uglifyjs', function () {
  pump([
        gulp.src("./build/alertMe.js"),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest("./build")
  ]);
});

// start a test server with doc root at build folder and
// listening to 3000 port. Home page = http://localhost:3000
gulp.task('startServer', function() {
  browserSync.init({
    server: {
      baseDir: 'build',
      port: 3000
    },
  });
})
gulp.task('reload', function() {
  console.log('going to reload');
  browserSync.reload();
});
