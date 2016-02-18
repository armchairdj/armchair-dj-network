/**
 * External dependencies.
 */

var gulp        = require('gulp');

var _           = require('underscore');
var axis        = require('axis');
var browserify  = require('browserify');
var concat      = require('gulp-concat');
var cssnano     = require('gulp-cssnano');
var es          = require('event-stream');
var events      = require('events');
var nib         = require('nib');
var path        = require('path');
var plumber     = require('gulp-plumber');
var source      = require('vinyl-source-stream');
var streamify   = require('gulp-streamify');
var streamqueue = require('streamqueue');
var stylus      = require('gulp-stylus');
var through     = require('through2');
var uglify      = require('gulp-uglify');

/**
 * Internal dependencies.
 */

var config      = require('./lib/util/configure')();

/*
  The following line fixes this problem:
    (node) warning: possible EventEmitter memory leak detected. 11 listeners added.
    Use emitter.setMaxListeners() to increase limit.
*/

events.EventEmitter.prototype._maxListeners = 100;

/*
  Source files.
*/

var assetDestination = {
  development: './public/asset/d',
  production:  './public/asset/p'
};


var sources = {
  js: {
    site: './lib/asset/js/site/adj.js'
  }
};

var sourceFiles = {
  stylesheet: {
    jet: {
      css:  [
        './lib/asset/css/vendor/normalize-3.0.3.css'
      ],
      styl: [
        './lib/asset/css/site/jet.styl'
      ]
    },
  },

  script: {
    modernizr: {
      js: [
        './lib/asset/js/vendor/modernizr.js'
      ]
    },

    site: {
      // js: [
      //   './lib/asset/js/vendor/jquery-2.2.0.js'
      // ],
      br: './lib/asset/js/site/test.js'
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
    .pipe(gulp.dest(assetLocation.development))
    .pipe(cssnano())
    .pipe(gulp.dest(assetLocation.production))
  ;
}

function compileStyles(component) {
  var stream = streamqueue.obj();
  var css    = srcList('stylesheet', component, 'css' );
  var styl   = srcList('stylesheet', component, 'styl');

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
  var scripts = compileScripts(component);

  console.log('compiled');

  var file = scripts.pipe(source(component + '.js'));

  console.log('file');

  var dev = file.pipe(gulp.dest(assetLocation.development));

  console.log('dev');

  var ugly = dev.pipe(uglify({
    mangle: false
  }));

  console.log('ugly');

  var pro = ugly.pipe(gulp.dest(assetLocation.production));

  console.log('pro');

  return pro;
}

function compileScripts(component) {
  var stream = streamqueue.obj();
  var js     = srcList('script', component, 'js');
  var br     = srcList('script', component, 'br');

  if (js) {
    stream.queue(js);
  }

  if (br) {
    stream.queue(compileBrowserify(br));
  }

  console.log('queued');

  return stream.done();
}

function compileBrowserify(src) {
  var compiled = browserify(src).bundle().on('error', handleBrowserifyError);

  console.log('compiled');

  return compiled;
}

/**
 * Functions: Gulp.
 */

function createTask(taskName) {
  var type      = taskName.split('-')[0];
  var component = taskName.split('-')[1];

  var method;

  if (type === 'script') {
    method = concatScripts;
  }
  else if (type === 'stylesheet' ) {
    method = concatStyles;
  }

  gulp.task(taskName, function () {
    console.log('task', component);

    return method(component);
  });
}

function createWatcher(taskName) {
  var type      = taskName.split('-')[0];
  var component = taskName.split('-')[1];

  var files = [];

  if (type === 'script') {
    files.push( fileList('script',      component, 'js'  ) );
  }
  else if (type === 'stylesheet' ) {
    files.push( fileList('stylesheet',  component, 'css' ) );
    files.push( fileList('stylesheet',  component, 'styl') );
  }

  gulp.watch( arrayicize(files), [taskName] );
}

/***** Create actual gulp tasks *****/

var tasks = [
  'stylesheet-jet',
  'script-modernizr',
  'script-site'
];

_.each( tasks, createTask );

gulp.task('watch', function () {
  _.each( tasks, createWatcher );
});

gulp.task('default', tasks);


function handleBrowserifyError(err) {
  console.log('ERR!', err.message, err);

  this.emit('end');
}



gulp.task('browserify', function() {
  return browserify(sources.js.site)
    .bundle()
    .pipe(source('site.js'))
    .pipe(gulp.dest(assetDestination.development))
  ;
});