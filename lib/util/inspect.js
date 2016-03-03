/******************************************************************************
Debugging utility. Pretty-prints deeply nested objects.
******************************************************************************/

/**
 * External dependencies.
 */

var util = require('util');

/**
 * Internal dependencies.
 */

/**
 * Methods.
 */

function inspect(obj, label) {
  label = label || '';

  console.log(label, util.inspect(obj, {
    showHidden: false,
    depth:      null
  }));
}

/**
 * Exports.
 */

module.exports = inspect;
