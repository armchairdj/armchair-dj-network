/**
 * External dependencies.
 */

var _      = require('underscore');
var extend = require('extend');

/**
 * Internal dependencies.
 */

var config = require('../../app/util/configure')();
var pjson  = require('../../package.json');

/**
 * Methods.
 */

function assetFile(fileName, fileType) {
  return '/assets/' + config.assetRoot + '/' + fileName + '.' + fileType + '?v=' + pjson.version;
}

/**
 * Exports.
 */

module.exports = {
  assetFile: assetFile
};
