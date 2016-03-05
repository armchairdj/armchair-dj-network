/******************************************************************************
Third- and first-party methods to be exposed to the Jade template engine.
******************************************************************************/

/**
 * External dependencies.
 */

var _              = require('underscore');
var moment         = require('moment');
var pluralize      = require('pluralize');

/**
 * Internal dependencies.
 */

/**
 * Setup.
 */

/**
 * Methods.
 */

function tokens(items, separator) {
  return _.chain(items).flatten().compact().value().join(separator);
}

/**
 * Exports.
 */

module.exports = {
  /* Third-party methods */

  moment:     moment,
  pluralize:  pluralize,

  /* First-party methods */
  tokens:     tokens
};
