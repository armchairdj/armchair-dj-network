/******************************************************************************
Companion module to our /gulpfile.js. Finds the current cache-busted filenames
for each of our packaged JS or CSS files.
******************************************************************************/

/**
 * External dependencies.
 */

var _        = require('underscore');
var jsonfile = require('jsonfile');
var path     = require('path');



/**
 * Internal dependencies.
 */

var settings    = require('../../lib/config/settings');

var environment = require('../../lib/util/environment');

/**
 * Setup.
 */

var packages  = {
  'script-modernizr'  : 'js',
  'script-site'       : 'js',
  'stylesheet-jet'    : 'css',
  'stylesheet-resume' : 'css'
};

/**
 * Methods.
 */

function assetMiddleware(req, res, next) {
  var manifests = resolveManifests();

  var filenames = resolveFilenames(manifests);

  res.locals.assetFiles = filenames;

  next();
}

/**
 * Local functions.
 */

function resolveManifests() {
  return _.reduce(packages, findManifest, {});

  function findManifest(memo, extension, pkgName) {
    var filepath = '../../static' + settings.asset.root + pkgName + '-manifest.json';

    var resolved = resolveManifest(filepath);

    memo[pkgName] = resolved;

    return memo;
  }
}

function resolveManifest(filepath) {
  if (environment.is('development')) {
    return jsonfile.readFileSync(path.join(__dirname, filepath));
  }

  return require(filepath);
}

function resolveFilenames(manifests) {
  return _.reduce(packages, findFile, {});

  function findFile(memo, extension, pkgName) {
    var baseFilename   = [pkgName, extension].join('.');
    var actualFilename = manifests[pkgName][baseFilename];

    memo[pkgName] = settings.asset.root + actualFilename;

    return memo;
  }
}

/**
 * Exports.
 */

module.exports = assetMiddleware;
