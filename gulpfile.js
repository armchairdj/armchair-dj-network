/**
 * External dependencies.
 */

var gulp           = require('gulp');

var _              = require('underscore');
var axis           = require('axis');
var concat         = require('gulp-concat');
var cssnano        = require('gulp-cssnano');
var es             = require('event-stream');
var events         = require('events');
var nib            = require('nib');
var path           = require('path');
var plumber        = require('gulp-plumber');
var source         = require('vinyl-source-stream');
var streamify      = require('gulp-streamify');
var streamqueue    = require('streamqueue');
var stylus         = require('gulp-stylus');
var through        = require('through2');
var uglify         = require('gulp-uglify');

/**
 * Internal dependencies.
 */

var config          = require('./lib/util/configure')();

/*
  The following line fixes this problem:
    (node) warning: possible EventEmitter memory leak detected. 11 listeners added.
    Use emitter.setMaxListeners() to increase limit.
*/

events.EventEmitter.prototype._maxListeners = 100;

/*
  Source files.
*/

var assetLocations = {
  development: './public/asset/d',
  production:  './public/asset/p'
};

var sourceFiles = {
  styles: {
    site: {
      css:  [
        './lib/asset/css/vendor/normalize-3.0.3.css'
      ],
      styl: [
        './lib/asset/css/site/site.styl'
      ]
    },
  },

  scripts: {
    modernizr: {
      js: [
        './lib/asset/js/vendor/modernizr.js'
      ]
    },

    site: {
      js: [
        './lib/asset/js/vendor/jquery-2.2.0.js'
      ]
    }
  }
};

/**
 * Functions: General.
 */


function arrayicize() {
  return _.chain(arguments).toArray().flatten().compact().value();
}

function fileList(type, component, format) {
  var list = arrayicize( sourceFiles[type][component][format] );

  return list && list.length ? list : null;
}

function srcList(type, component, format) {
  var list = fileList(type, component, format);

  return list ? gulp.src(list) : null;
}

/**
 * Functions: CSS.
 */

function concatStyles(component) {
  return compileStyles(component)
    .pipe(concat(component + '.css'))
    .pipe(gulp.dest(assetLocations.development))
    .pipe(cssnano())
    .pipe(gulp.dest(assetLocations.production))
  ;
}

function compileStyles(component) {
  var stream = streamqueue({ objectMode: true });
  var css    = srcList('styles', component, 'css' );
  var styl   = srcList('styles', component, 'styl');

  if (css) {
    stream.queue(css);
  }

  if (styl) {
    stream.queue(compileStylus(styl));
  }

  return stream.done();
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

/**
 * Functions: JS.
 */

function concatScripts(component) {
  return compileScripts(component)
    .pipe(concat(component + '.js'))
    .pipe(gulp.dest(assetLocations.development))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest(assetLocations.production))
  ;
}

function compileScripts(component) {
  var stream = streamqueue({ objectMode: true });

  var js =  srcList('scripts', component, 'js'  );

  if (js) {
    stream.queue(js);
  }

  return stream.done();
}

/**
 * Functions: Gulp.
 */

function createTask(taskName) {
  var type      = taskName.split('-')[0];
  var component = taskName.split('-')[1];

  var method;

  if (type === 'scripts') {
    method = concatScripts;
  }
  else if (type === 'styles' ) {
    method = concatStyles;
  }

  gulp.task(taskName, function () {
    return method(component);
  });
}

function createWatcher(taskName) {
  var type      = taskName.split('-')[0];
  var component = taskName.split('-')[1];

  var files = [];

  if (type === 'scripts') {
    files.push( fileList('scripts', component, 'js'  ) );
  }
  else if (type === 'styles' ) {
    files.push( fileList('styles',  component, 'css' ) );
    files.push( fileList('styles',  component, 'styl') );
  }

  gulp.watch( arrayicize(files), [taskName] );
}

/***** Create actual gulp tasks *****/

var tasks = [
  'styles-site',
  'scripts-modernizr',
  'scripts-site'
];

_.each( tasks, createTask );

gulp.task('watch', function () {
  _.each( tasks, createWatcher );
});

gulp.task( 'default', tasks );
