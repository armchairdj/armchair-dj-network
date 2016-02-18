/**
 * External dependencies.
 */

var gulp        = require('gulp');

var _           = require('underscore');
var axis        = require('axis');
var browserify  = require('browserify');
var buffer      = require('vinyl-buffer');
var concat      = require('gulp-concat');
var cssnano     = require('gulp-cssnano');
var events      = require('events');
var nib         = require('nib');
var plumber     = require('gulp-plumber');
var source      = require('vinyl-source-stream');
var streamqueue = require('streamqueue');
var stylus      = require('gulp-stylus');
var uglify      = require('gulp-uglify');

/**
 * Internal dependencies.
 */

/*
  The following line fixes this problem:
    (node) warning: possible EventEmitter memory leak detected. 11 listeners added.
    Use emitter.setMaxListeners() to increase limit.
*/
events.EventEmitter.prototype._maxListeners = 100;

/**
 * File locations.
 */

var src = {
  javascript: {
    site:      './lib/asset/js/site/adj.js',
    modernizr: './lib/asset/js/vendor/modernizr.js'
  },
  stylesheet: {
    jet: {
      css:    './lib/asset/css/vendor/normalize-3.0.3.css',
      stylus: './lib/asset/css/site/jet.styl'
    }
  }
};

var dest = {
  development: './public/asset/d',
  production:  './public/asset/p'
};

/**
 * Tasks.
 */

gulp.task('script-modernizr', function() {
  return gulp.src(src.javascript.modernizr)
    .pipe(concat('modernizr.js'))
    .pipe(gulp.dest(dest.development))
    .pipe(uglify({ mangle: false }).on('error', handleError))
    .pipe(gulp.dest(dest.production))
  ;
});

gulp.task('script-site', function() {
  return browserify(src.javascript.site).bundle()
    .pipe(source('site.js'))
    .pipe(gulp.dest(dest.development))
    .pipe(buffer())
    .pipe(uglify({ mangle: false }).on('error', handleError))
    .pipe(gulp.dest(dest.production))
  ;
});

gulp.task('stylesheet-jet', function () {
  var stream = streamqueue.obj();

  stream.queue(              gulp.src(src.stylesheet.jet.css    ));
  stream.queue(compileStylus(gulp.src(src.stylesheet.jet.stylus)));

  stream.done()
    .pipe(concat('jet.css'))
    .pipe(gulp.dest(dest.development))
    .pipe(cssnano())
    .pipe(gulp.dest(dest.production))
  ;
});

gulp.task('default', [
  'script-modernizr',
  'script-site',
  'stylesheet-jet'
]);

/**
 * Helper functions.
 */

function compileStylus(src) {
  return src
    .pipe(plumber())
    .pipe(stylus({
      compress:      false,
      'include css': true,
      use:           [axis(), nib()]
    }))
  ;
}

function handleError(err) {
  console.log(err);
}
