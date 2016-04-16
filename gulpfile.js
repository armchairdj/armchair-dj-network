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
 * File mappings.
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
    },

    resume: {
      css:    './lib/asset/css/vendor/normalize-3.0.3.css',
      stylus: './lib/asset/css/site/resume.styl'
    }
  }
};

var dest = {
  'armchair-dj':          'static/armchair-dj',
  'askauiguy':            'static/askauiguy',
  'bcchsclassof1991':     'static/bcchsclassof1991',
  'briandillard':         'static/briandillard',
  'charlieandbrian':      'static/charlieandbrian',
  'nerdswithdaddyissues': 'static/nerdswithdaddyissues',
  'plastikfan':           'static/plastikfan'
};

/**
 * Create tasks.
 */

var defaultTasks = [];

scriptTask(          'armchair-dj',  'script-modernizr',  src.script.modernizr );
scriptTaskBrowserify('armchair-dj',  'script-site',       src.script.site      );
stylesheetTaskStylus('armchair-dj',  'stylesheet-jet',    src.stylesheet.jet   );

stylesheetTaskStylus('briandillard', 'stylesheet-resume', src.stylesheet.resume);

gulp.task('default', defaultTasks);

/**
 * Functions: Task types.
 */

function scriptTask(site, pkgName, sourceFiles) {
  var extension = '.js';

  addTask(site, pkgName, extension, task);

  function task() {
    var filename  = pkgName + extension;
    var transform = uglifier();
    var stream    = gulp.src(sourceFiles)
      .pipe(concat(filename))
    ;

    deploy(site, pkgName, stream, transform);
  }
}

function scriptTaskBrowserify(site, pkgName, sourceFiles) {
  var extension = '.js';

  addTask(site, pkgName, extension, task);

  function task() {
    var filename  = pkgName + extension;
    var transform = uglifier();
    var stream    = browserify(sourceFiles)
      .bundle()
      .pipe(source(filename))
      .pipe(buffer())
    ;

    deploy(site, pkgName, stream, transform);
  }
}

function stylesheetTaskStylus(site, pkgName, sourceFiles) {
  var extension = '.css';

  addTask(site, pkgName, extension, task);

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

    deploy(site, pkgName, stream, transform);
  }
}

/**
 * Functions: Task builders.
 */

function addTask(site, pkgName, extension, task) {
  var cleanerName = [site, 'clean', pkgName].join('-');
  var cleaner     = createCleaner(site, pkgName, extension);

  gulp.task(cleanerName, cleaner);
  defaultTasks.push(cleanerName);

  gulp.task(pkgName, [cleanerName], task);
  defaultTasks.push(pkgName);
}

function createCleaner(site, pkgName, extension) {
  var dir  = path.join(__dirname, dest[site]);
  var glob = dir + '**/' + pkgName + '-*' + extension;

  return function (callback) {
    rimraf(glob, handleClean);

    function handleClean(err) {
      callback(err);
    }
  };
}

/**
 * Functions: Build and save.
 */

function deploy(site, pkgName, stream, transform) {
  var dev = stream.pipe(clone());
  var pro = stream.pipe(clone()).pipe(transform);

  deployTo(site, 'd', pkgName, dev);
  deployTo(site, 'p', pkgName, pro);
}

function deployTo(site, stage, pkgName, stream) {
  var destination      = destinationPath(site, stage);
  var manifestFilename = pkgName + '-manifest.json';

  console.log(destination);

  stream
    .pipe(rev())
    .pipe(gulp.dest(destination))
    .pipe(rev.manifest(manifestFilename))
    .pipe(gulp.dest(destination))
  ;
}

function destinationPath(site, stage) {
  return ['.', dest[site], 'asset', stage].join('/');
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
