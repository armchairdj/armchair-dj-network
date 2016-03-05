/******************************************************************************
For a given context object, get the value of one of its keys even if that key
is a method. Can be called for single keys, or collection of keys
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
