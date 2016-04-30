/**
 * External dependencies.
 */

var $ = require('jquery');
var _ = require('underscore');

/**
 * Internal dependencies.
 */

/**
 * Methods.
 */

/**
 * Local functions.
 */

function touch() {
  return $('html').hasClass('touch');
}

/**
 * Exports.
 */

module.exports = _.memoize(function () {
  return touch() ? 'touchend' : 'click';
});