/******************************************************************************
[DESCRIPTION]
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

var manifests;

if (!environment.is('development')) {
  manifests = findManifests();
}

/**
 * Local functions.
 */

function findManifests() {
  return _.reduce(packages, findManifest, {});

  function findManifest(memo, extension, pkgName) {
    memo[pkgName] = require('../../public' + assetRoot + pkgName + '-manifest.json');

    return memo;
  }
}

function findFiles() {
  return _.reduce(packages, findFile, {});

  function findFile(memo, extension, pkgName) {
    var filename = [pkgName, extension].join('.');

    if (!environment.is('development')) {
      filename = manifests[pkgName][filename];
    }

    memo[pkgName] = assetRoot + filename;

    return memo;
  }
}

/**
 * Exports.
 */

module.exports = findFiles;
