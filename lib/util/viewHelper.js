/**
 * External dependencies.
 */

var _      = require('underscore');
var extend = require('extend');

/**
 * Internal dependencies.
 */

var config = require('../../lib/util/configure')();
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
  assetFile: assetFile
};
