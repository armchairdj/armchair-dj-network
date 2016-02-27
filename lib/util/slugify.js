/**
 * External dependencies.
 */

var _  = require('underscore');
var _s = require('underscore.string');

/**
 * Internal dependencies.
 */

/**
 * Methods.
 */

function slugify() {
  var str = _.toArray(arguments).join('-');

  return _s.slugify(str);
}

/**
 * Exports.
 */

module.exports = slugify;
