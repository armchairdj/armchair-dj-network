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

var pjson     = require('../../package.json');

var settings  = require('../../lib/config/settings');

var slugify   = require('../../lib/util/slugify');

/**
 * Methods.
 */

function assetUrl(fileName, fileType) {
  return '/asset/' + settings.asset.root + '/' + fileName + '.' + fileType + '?v=' + pjson.version;
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
