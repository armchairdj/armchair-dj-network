/**
 * External dependencies.
 */

var _         = require('underscore');
var extend    = require('extend');
var marked    = require('marked');
var pluralize = require('pluralize');

/**
 * Internal dependencies.
 */

var config = require('../../lib/config/settings');

var pjson  = require('../../package.json');

/**
 * Methods.
 */

function assetFile(fileName, fileType) {
  return '/asset/' + config.asset.root + '/' + fileName + '.' + fileType + '?v=' + pjson.version;
}

/**
 * Exports.
 */

module.exports = {
  assetFile: assetFile,
  marked:    marked,
  pluralize: pluralize
};
