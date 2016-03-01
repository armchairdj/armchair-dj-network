/**
 * External dependencies.
 */

var _         = require('underscore');
var _s        = require('underscore.string');
var extend    = require('extend');
var moment    = require('moment');
var pluralize = require('pluralize');

/**
 * Internal dependencies.
 */

var settings  = require('../../lib/config/settings');

var slugify   = require('../../lib/util/slugify');

/**
 * Setup.
 */

var assetRoot      = '/asset/' + settings.asset.root + '/';
var assetLocations = {
  'script-modernizr': require('../../public' + assetRoot + 'script-modernizr-manifest.json'),
  'script-site'     : require('../../public' + assetRoot + 'script-site-manifest.json'),
  'stylesheet-jet'  : require('../../public' + assetRoot + 'stylesheet-jet-manifest.json')
};

console.log(assetLocations);

/**
 * Methods.
 */

function assetUrl(fileName, fileType) {
  var baseFilename   = [fileName, fileType].join('.');
  var actualFilename = assetLocations[fileName][baseFilename];

  return assetRoot + actualFilename;
}

/**
 * Exports.
 */

module.exports = {
  /* Third-party methods */

  moment:         moment,
  pluralize:      pluralize,

  /* First-party methods */

  assetUrl:       assetUrl,
  slugify:        slugify
};
