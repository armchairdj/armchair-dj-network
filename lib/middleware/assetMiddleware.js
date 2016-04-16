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

var sites  = {
  armchairdj: {
    'script-modernizr'  : 'js',
    'script-adj'        : 'js',
    'stylesheet-jet'    : 'css'
  },
  briandillard: {
    'stylesheet-resume' : 'css'
  }
};

/**
 * Methods.
 */

function assetMiddleware(req, res, next) {
  res.locals.assetFiles = resolveFilenames();

  next();
}

/**
 * Helper functions.
 */

function resolveFilenames() {
  var filenames = {};

  _.each(sites, handleSite);

  return filenames;

  function handleSite(packages, siteName) {
    filenames[siteName] = {};

    _.each(packages, _.partial(handlePackage, siteName));
  }

  function handlePackage(siteName, extension, packageName) {
    filenames[siteName][packageName] = resolveFilename(siteName, packageName, extension);
  }
}

function resolveFilename(siteName, packageName, extension) {
  var manifest       = resolveManifest('../../static/' + siteName + settings.asset.root + packageName + '-manifest.json');

  var baseFilename   = [packageName, extension].join('.');

  var actualFilename = manifest[baseFilename];

  return settings.asset.root + actualFilename;
}

function resolveManifest(filepath) {
  if (environment.is('development')) {
    /* Re-resolve the manifest on every request in development. */
    return jsonfile.readFileSync(path.join(__dirname, filepath));
  }

  /* Otherwise, resolve the manifest only once. */
  return require(filepath);
}

/**
 * Exports.
 */

module.exports = assetMiddleware;
