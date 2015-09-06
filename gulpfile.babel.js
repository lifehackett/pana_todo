import gulp from 'gulp';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
import browserify from 'browserify';
import notify from 'gulp-notify'; //Used in .pipe()
import nodeNotify from 'node-notifier'; //Use not in .pipe()
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';
import merge from 'merge';
import sass from 'gulp-sass';
import babel from 'babelify';
import jadeify from 'jadeify';
import concat from 'gulp-concat';

var bundlerConfig = {
  entries: ['./client/src/js/main.js'], // Only need initial file, browserify finds the deps
  transform: [jadeify, babel], //es6
  debug: true // Gives us sourcemapping
};

gulp.task('dev',['default', 'watch']);

gulp.task('default', ['scripts', 'sass', 'copy']);

gulp.task('lint', ['lint:js', 'lint:jsx'])

gulp.task('scripts', function () {
  var bundler = browserify(bundlerConfig);
  bundle(bundler);
});

gulp.task('sass', function () {
  return gulp.src('./client/src/styles/main.scss')
    .pipe(sass())
    .on('error', handleError('SASS'))
    .pipe(gulp.dest('./client/dist/static/'));
});

gulp.task('copy', function () {
  gulp.src('./client/src/index.html')
    .pipe(gulp.dest('./client/dist'));

  gulp.src('./client/src/fonts/**/*')
    .pipe(gulp.dest('./client/dist/static/fonts/'))
});

gulp.task('watch', function () {
  var bundler;

  merge(bundlerConfig, { cache: {}, packageCache: {} }) // Requirement of watchify
  bundler = watchify(browserify(bundlerConfig));
  bundler.on('update', function () {
    //TODO throw in some duration stuff
    gutil.log('Rebundling');
    bundle(bundler);
  });

  bundle(bundler);

  gulp.watch('client/src/index.html', ['copy']);
  gulp.watch('client/src/styles/**/*.scss', ['sass']);
});

gulp.task('lint:js', function () {
  gulp.src('client/src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', handleError('lint:js'));
});                              

function bundle (bundler) {
  return bundler.bundle()
    .on('error', handleError('Browserify'))
    .pipe(source('bundle.js'))
    // Uglify, jsHint, etc...
    .pipe(gulp.dest('./client/dist/static/'));
}

function handleError (task) {
  return function (err) {
      notify.onError({
        message: task + ' failed, check the logs..',
        sound: 'Basso'
      })(err);
    
    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
}