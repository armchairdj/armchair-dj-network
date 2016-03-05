/******************************************************************************
For a given context object, get the value or return value of its keys.
Can be called for one key or an array of keys.
******************************************************************************/

/**
 * External dependencies.
 */

var _ = require('underscore');

/**
 * Methods.
 */

/*
  Return a value from an object:
    If the key is a property, return the value directly.
    If the key is a method, return the value of invoking it.
*/
function single(context, key) {
  var val = context[key];

  return (typeof val === 'function' ? val.apply(context) : val);
}

function multiple(context, keys) {
  return _.map(keys, _.partial(single, context));
}

/**
 * Exports.
 */

module.exports = {
  key:  single,
  keys: multiple
};
