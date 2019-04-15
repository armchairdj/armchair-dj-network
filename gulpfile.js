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
  armchairdj: {
    script: {
      adj:       './lib/asset/js/adj/adj.js',
      modernizr: './lib/asset/js/vendor/modernizr.js'
    },
    stylesheet: {
      jet: {
        css:    './lib/asset/css/vendor/normalize-3.0.3.css',
        stylus: './lib/asset/css/site/armchairdj/jet.styl'
      }
    }
  },

  askauiguy: {
    stylesheet: {
      askauiguy: {
        css:    './lib/asset/css/vendor/normalize-3.0.3.css',
        stylus: './lib/asset/css/site/askauiguy/askauiguy.styl'
      }
    }
  },

  bcchsclassof1991: {
    stylesheet: {
      bcchsclassof1991: {
        css:    './lib/asset/css/vendor/normalize-3.0.3.css',
        stylus: './lib/asset/css/site/bcchsclassof1991/bcchsclassof1991.styl'
      }
    }
  },

  briandillard: {
    stylesheet: {
      briandillard: {
        css:    './lib/asset/css/vendor/normalize-3.0.3.css',
        stylus: './lib/asset/css/site/briandillard/briandillard.styl'
      },

      resume: {
        css:    './lib/asset/css/vendor/normalize-3.0.3.css',
        stylus: './lib/asset/css/site/resume/resume.styl'
      }
    }
  },

  charlieandbrian: {
    stylesheet: {
      charlieandbrian: {
        css:    './lib/asset/css/vendor/normalize-3.0.3.css',
        stylus: './lib/asset/css/site/charlieandbrian/charlieandbrian.styl'
      }
    }
  },

  nerdswithdaddyissues: {
    stylesheet: {
      nerdswithdaddyissues: {
        css:    './lib/asset/css/vendor/normalize-3.0.3.css',
        stylus: './lib/asset/css/site/nerdswithdaddyissues/nerdswithdaddyissues.styl'
      }
    }
  },

  plastikfan: {
    stylesheet: {
      plastikfan: {
        css:    './lib/asset/css/vendor/normalize-3.0.3.css',
        stylus: './lib/asset/css/site/plastikfan/plastikfan.styl'
      }
    }
  }
};

/**
 * Create tasks.
 */

var defaultTasks = [];

jsTaskPlain(     'armchairdj',            'script-modernizr',                src.armchairdj.script.modernizr                         );
jsTaskBrowserify('armchairdj',            'script-adj',                      src.armchairdj.script.adj                               );
cssTaskStylus(   'armchairdj',            'stylesheet-jet',                  src.armchairdj.stylesheet.jet                           );

cssTaskStylus(   'briandillard',          'stylesheet-resume',               src.briandillard.stylesheet.resume                      );
cssTaskStylus(   'briandillard',          'stylesheet-briandillard',         src.briandillard.stylesheet.briandillard                );

cssTaskStylus(   'askauiguy',             'stylesheet-askauiguy',            src.askauiguy.stylesheet.askauiguy                      );

cssTaskStylus(   'bcchsclassof1991',      'stylesheet-bcchsclassof1991',     src.bcchsclassof1991.stylesheet.bcchsclassof1991        );

cssTaskStylus(   'charlieandbrian',       'stylesheet-charlieandbrian',      src.charlieandbrian.stylesheet.charlieandbrian          );

cssTaskStylus(   'nerdswithdaddyissues',  'stylesheet-nerdswithdaddyissues', src.nerdswithdaddyissues.stylesheet.nerdswithdaddyissues);

cssTaskStylus(   'plastikfan',            'stylesheet-plastikfan',           src.plastikfan.stylesheet.plastikfan                    );

gulp.task('default', defaultTasks);

/**
 * Functions: Task types.
 */

function jsTaskPlain(site, pkgName, sourceFiles) {
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

function jsTaskBrowserify(site, pkgName, sourceFiles) {
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

function cssTaskStylus(site, pkgName, sourceFiles) {
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
  var dir  = path.join(__dirname, 'static', site);
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

  stream
    .pipe(rev())
    .pipe(gulp.dest(destination))
    .pipe(rev.manifest(manifestFilename))
    .pipe(gulp.dest(destination))
  ;
}

function destinationPath(site, stage) {
  return ['.', 'static', site, 'asset', stage].join('/');
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
