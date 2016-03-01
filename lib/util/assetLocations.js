/**
 * External dependencies.
 */

var _         = require('underscore');

/**
 * Internal dependencies.
 */

var settings  = require('../../lib/config/settings');

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

module.exports = findFiles();
