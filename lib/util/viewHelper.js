/**
 * External dependencies.
 */

var _         = require('underscore');
var _s        = require('underscore.string');
var extend    = require('extend');
var marked    = require('marked');
var pluralize = require('pluralize');

/**
 * Internal dependencies.
 */

var settings  = require('../../lib/config/settings');

var pjson     = require('../../package.json');

/**
 * Methods.
 */

function assetFile(fileName, fileType) {
  return '/asset/' + settings.asset.root + '/' + fileName + '.' + fileType + '?v=' + pjson.version;
}

/**
 * Exports.
 */

module.exports = {
  /* Third-party methods */

  _:         _,
  _s:        _s,
  marked:    marked,
  pluralize: pluralize,

  /* First-party methods */

  assetFile: assetFile
};
