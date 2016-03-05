/******************************************************************************
[DESCRIPTION]
******************************************************************************/

/**
 * External dependencies.
 */

var gulp        = require('gulp');

var _           = require('underscore');
var axis        = require('axis');
var browserify  = require('browserify');
var buffer      = require('vinyl-buffer');
var clone       = require('gulp-clone');
var concat      = require('gulp-concat');
var cssnano     = require('gulp-cssnano');
var events      = require('events');
var nib         = require('nib');
var plumber     = require('gulp-plumber');
var rev         = require('gulp-rev');
var source      = require('vinyl-source-stream');
var streamqueue = require('streamqueue');
var stylus      = require('gulp-stylus');
var uglify      = require('gulp-uglify');

/**
 * Internal dependencies.
 */

/**
 * Setup.
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
 * Create tasks
 */

var defaultTasks = [];

scriptTask(          'script-modernizr', src.javascript.modernizr);
scriptTaskBrowserify('script-site',      src.javascript.site     );
stylesheetTaskStylus('stylesheet-jet',   src.stylesheet.jet      );

gulp.task('default', defaultTasks);

/**
 * Functions: Task builders.
 */

function addTask(pkgName, task) {
  gulp.task(pkgName, task);

  defaultTasks.push(pkgName);
}

function scriptTask(pkgName, sourceFiles) {
  addTask(pkgName, task);

  function task() {
    var filename  = pkgName + '.js';
    var transform = uglifier();
    var stream    = gulp.src(sourceFiles)
      .pipe(concat(filename))
    ;

    deploy(pkgName, stream, transform);
  }
}

function scriptTaskBrowserify(pkgName, sourceFiles) {
  addTask(pkgName, task);

  function task() {
    var filename  = pkgName + '.js';
    var transform = uglifier();
    var stream    = browserify(sourceFiles)
      .bundle()
      .pipe(source(filename))
      .pipe(buffer())
    ;

    deploy(pkgName, stream, transform);
  }
}

function stylesheetTaskStylus(pkgName, sourceFiles) {
  addTask(pkgName, task);

  function task () {
    var filename   = pkgName + '.css';
    var transform  = cssnano();
    var stream     = streamqueue
      .obj()
      .queue(              gulp.src(sourceFiles.css    ))
      .queue(compileStylus(gulp.src(sourceFiles.stylus)))
      .done()
      .pipe(concat(filename))
    ;

    deploy(pkgName, stream, transform);
  }
}

/**
 * Functions: Asset pipeline.
 */

function deploy(pkgName, stream, transform) {
  var dev = stream.pipe(clone());
  var pro = stream.pipe(clone()).pipe(transform);

  deployToDevelopment(dev);
  deployToProduction(pro, pkgName);
}

function deployToDevelopment(stream) {
  stream.pipe(gulp.dest(dest.development));
}

function deployToProduction(stream, pkgName) {
  var destination      = dest.production;
  var manifestFilename = pkgName + '-manifest.json';

  stream
    .pipe(rev())
    .pipe(gulp.dest(destination))
    .pipe(rev.manifest(manifestFilename))
    .pipe(gulp.dest(destination))
  ;
}

/**
 * Functions: Asset wrangling.
 */

function uglifier() {
  return uglify({ mangle: false }).on('error', handleError)

  function handleError(err) {
    console.log(err);
  }
}

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
