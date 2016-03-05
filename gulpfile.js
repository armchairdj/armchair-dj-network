/******************************************************************************
Build CSS and JS assets using Stylus and various Gulp plugins.
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
var path        = require('path');
var nib         = require('nib');
var plumber     = require('gulp-plumber');
var rev         = require('gulp-rev');
var rimraf      = require('rimraf');
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
  script: {
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
  root:        './public/asset/',
  development: './public/asset/d',
  production:  './public/asset/p'
};

/**
 * Create tasks
 */

var defaultTasks = [];

scriptTask(          'script-modernizr', src.script.modernizr);
scriptTaskBrowserify('script-site',      src.script.site     );
stylesheetTaskStylus('stylesheet-jet',   src.stylesheet.jet  );

gulp.task('default', defaultTasks);

/**
 * Functions: Task builders.
 */

function addTask(pkgName, extension, task) {
  var cleanerName = 'clean-' + pkgName;
  var cleaner     = createCleaner(pkgName, extension);

  gulp.task(cleanerName, cleaner);
  defaultTasks.push(cleanerName);

  gulp.task(pkgName, [cleanerName], task);
  defaultTasks.push(pkgName);
}

function createCleaner(pkgName, extension) {
  var dir  = path.join(__dirname, dest.root);
  var glob = dir + '**/' + pkgName + '-*' + extension;

  return function (callback) {
    rimraf(glob, handleClean);

    function handleClean(err) {
      callback(err);
    }
  };
}

function scriptTask(pkgName, sourceFiles) {
  var extension = '.js';

  addTask(pkgName, extension, task);

  function task() {
    var filename  = pkgName + extension;
    var transform = uglifier();
    var stream    = gulp.src(sourceFiles)
      .pipe(concat(filename))
    ;

    deploy(pkgName, stream, transform);
  }
}

function scriptTaskBrowserify(pkgName, sourceFiles) {
  var extension = '.js';

  addTask(pkgName, extension, task);

  function task() {
    var filename  = pkgName + extension;
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
  var extension = '.css';

  addTask(pkgName, extension, task);

  function task () {
    var filename   = pkgName + extension;
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

  deployTo(dest.development, pkgName, dev);
  deployTo(dest.production,  pkgName, pro);
}

function deployTo(destination, pkgName, stream) {
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
