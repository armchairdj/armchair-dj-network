var gulp           = require('gulp');

var axis           = require('axis-css');
var concat         = require('gulp-concat');
var cssmin         = require('gulp-minify-css');
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
var _              = require('underscore');

/*
  The following line fixes this problem:
    (node) warning: possible EventEmitter memory leak detected. 11 listeners added.
    Use emitter.setMaxListeners() to increase limit.
*/
events.EventEmitter.prototype._maxListeners = 100;

/***** File locations *****/

var assetLocations = {
  dev: 'public/assets/d',
  pro: 'public/assets/p'
};

/*
  Structured hash of source files.
  Hash structure determines which tasks will be created.
  As you add components here, add a task to the 'tasks' array below.
*/
var sourceFiles = {
  styles: {
    site: {
      css:  [],
      styl: []
    },
  },

  scripts: {
    modernizr: {
      js: [
        'lib/assets/js/vendor/modernizr.js',
      ]
    },

    site: {
      js: [
        'lib/assets/js/vendor/jquery/jquery-2.0.2.js',
      ]
    }
  }
};

/***** Helpers: Source hash lookup *****/

function arrayicize() {
  return _.chain(arguments).toArray().flatten().compact().value();
}

/* Pluck a raw array of files from the tree - or null */
function fileList(type, component, format) {
  var list = arrayicize( sourceFiles[type][component][format] );

  return list && list.length ? list : null;
}

/* Pluck a gul.src list of files from the tree - or null */
function srcList(type, component, format) {
  var list = fileList(type, component, format);

  return list ? gulp.src(list) : null;
}

/***** CSS concatenation & compilation *****/

/* Build dev and prod version of a CSS component from .css and .styl files */
function concatStyles(component) {
  return compileStyles(component)
    .pipe(concat(component + '.css'))
    .pipe(gulp.dest(assetLocations.dev))
    .pipe(cssmin())
    .pipe(gulp.dest(assetLocations.pro))
  ;
}

/* Prepare a CSS component for concatenation and minification */
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

/***** Stylus compilation *****/

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

/***** JS concatenation & compilation *****/

/* Build dev and prod version of a JS component from .js files */
function concatScripts(component) {
  return compileScripts(component)
    .pipe(concat(component + '.js'))
    .pipe(gulp.dest(assetLocations.dev))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest(assetLocations.pro))
  ;
}

/* Prepare a JS component for concatenation and minification */
function compileScripts(component) {
  var stream = streamqueue({ objectMode: true });

  var js =  srcList('scripts', component, 'js'  );

  if (js) {
    stream.queue(js);
  }

  return stream.done();
}

/***** Helpers for creating default and watch tasks *****/

/* Create a task to create a JS or CSS component via our sourceFiles naming conventions */
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

/* Create a watcher via our sourceFiles naming conventions */
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
