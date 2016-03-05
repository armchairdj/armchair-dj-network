/******************************************************************************
Companion module to our /gulpfile.js. Finds the current cache-busted filenames
for each of our packaged JS or CSS files.
******************************************************************************/

/**
 * External dependencies.
 */

var _           = require('underscore');

/**
 * Internal dependencies.
 */

var settings    = require('../../lib/config/settings');

var environment = require('../../lib/util/environment');

/**
 * Setup.
 */

var assetRoot = '/asset/' + settings.asset.subdirectory + '/';
var packages  = {
  'script-modernizr': 'js',
  'script-site'     : 'js',
  'stylesheet-jet'  : 'css'
};

/**
 * Methods.
 */

function assetMiddleware(req, res, next) {
  next();
}



/**
 * Local functions.
 */

function findFiles() {
  var manifests = findManifests();

  return _.reduce(packages, findFile, {});

  function findFile(memo, extension, pkgName) {
    var baseFilename   = [pkgName, extension].join('.');
    var actualFilename = manifests[pkgName][baseFilename];

    memo[pkgName] = assetRoot + actualFilename;

    return memo;
  }
}

function findManifests() {
  return _.reduce(packages, findManifest, {});

  function findManifest(memo, extension, pkgName) {
    memo[pkgName] = require('../../public' + assetRoot + pkgName + '-manifest.json');

    return memo;
  }
}

/**
 * Exports.
 */

module.exports = assetMiddleware;
